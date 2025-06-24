from flask import Flask, request, jsonify, send_from_directory
import os, tempfile, subprocess, uuid
from werkzeug.utils import secure_filename
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'uploads')
STATIC_FOLDER = os.path.join(os.path.dirname(__file__), 'static')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(STATIC_FOLDER, exist_ok=True)

table_header = "sequence_id_heavy\tv_call_heavy\td_call_heavy\tj_call_heavy\tsequence_alignment_aa_heavy\tfwr1_aa_heavy\tcdr1_aa_heavy\tfwr2_aa_heavy\tcdr2_aa_heavy\tfwr3_aa_heavy\tcdr3_aa_heavy\tfwr4_aa_heavy\tsequence_id_light\tv_call_light\tj_call_light\tsequence_alignment_aa_light\tfwr1_aa_light\tcdr1_aa_light\tfwr2_aa_light\tcdr2_aa_light\tfwr3_aa_light\tcdr3_aa_light\tfwr4_aa_light\tID"

@app.route('/DB', methods=['POST'])
def DB():
    try:
        code = request.form.get('code')
        print("收到的R脚本内容：\n", code)
        code = code.replace('\r\n', '\n').replace('\r', '\n')
        print("R脚本repr:", repr(code))
        print("R 脚本最终内容：\n", code)

        # 输出文件路径
        output_png = f"output_{uuid.uuid4().hex}.png"
        output_path = os.path.abspath(os.path.join(STATIC_FOLDER, output_png)).replace("\\", "/")
        code = code.replace("${output}", output_path)

        # 处理输入数据
        file = request.files.get('fileData')
        sequence_data = request.form.get('sequenceData')
        input_file_path = None

        if file:
            # 用户上传了文件
            filename = secure_filename(file.filename)
            input_file_path = os.path.join(UPLOAD_FOLDER, filename)
            file.save(input_file_path)
        elif sequence_data and sequence_data.strip():
            # 生成临时文件
            with tempfile.NamedTemporaryFile('w', suffix='.csv', delete=False, encoding='utf-8') as f:
                # 写入表头
                f.write(table_header + '\n')
                # 写入每一行（假设用户每行输入一个cdr3_aa_heavy，其他字段留空）
                for idx, line in enumerate(sequence_data.strip().split('\n')):
                    # 只填cdr3_aa_heavy，其它字段空，ID用序号
                    row = [''] * 23
                    row[10] = line.strip()  # cdr3_aa_heavy
                    row[22] = str(idx + 1)  # ID
                    f.write('\t'.join(row) + '\n')
                input_file_path = f.name
        else:
            return jsonify({'error': '请上传文件或输入序列数据'}), 400

        if not input_file_path or not os.path.exists(input_file_path):
            return jsonify({'error': f'输入文件未生成或不存在: {input_file_path}'}), 400

        # 替换R脚本中的${output}
        code = code.replace("${output}", output_path)
        # 替换R脚本中的${input}
        code = code.replace("${input}", input_file_path.replace("\\", "/"))

        print("最终写入R脚本内容：\n", code)

        with tempfile.NamedTemporaryFile('w', suffix='.R', delete=False, encoding='utf-8') as rfile:
            rfile.write(code)
            r_script_path = rfile.name

        # 执行 R 脚本
        result = subprocess.run(
            [r'D:\\Program Files\\R\\R-4.4.1\\bin\\x64\\Rscript.exe', r_script_path],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            timeout=60
        )

        print("Rscript STDOUT:\n", result.stdout.decode())
        print("Rscript STDERR:\n", result.stderr.decode())

        if os.path.exists(output_path):
            return jsonify({
                'filename': output_png,
                'stdout': result.stdout.decode(),
                'stderr': result.stderr.decode()
            })
        else:
            return jsonify({
                'error': 'R 脚本执行成功，但未生成图片文件',
                'stdout': result.stdout.decode(),
                'stderr': result.stderr.decode()
            }), 500

    except subprocess.CalledProcessError as e:
        return jsonify({
            'error': e.stderr.decode(),
            'stdout': e.stdout.decode() if hasattr(e, 'stdout') else ''
        }), 500
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500
    finally:
        if 'r_script_path' in locals() and os.path.exists(r_script_path):
            os.remove(r_script_path)
        if 'input_file_path' in locals() and input_file_path and os.path.exists(input_file_path) and (not file):
            # 只删除临时生成的粘贴序列文件，上传的文件不删
            os.remove(input_file_path)

@app.route('/static/<filename>')
def serve_static(filename):
    return send_from_directory(STATIC_FOLDER, filename)

if __name__ == '__main__':
    host = '127.0.0.1'
    port = 5009
    app.run(debug=True, host=host, port=port)
