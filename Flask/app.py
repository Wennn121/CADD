from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from Bio import AlignIO
from Bio.Seq import Seq
from Bio.SeqRecord import SeqRecord
import os
from werkzeug.utils import secure_filename
import logging
import subprocess
import time  # 导入 time 模块

app = Flask(__name__)
CORS(app)  # 启用跨域支持

# 配置上传和结果文件夹
UPLOAD_FOLDER = "uploads"
RESULT_FOLDER = "results"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(RESULT_FOLDER, exist_ok=True)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['RESULT_FOLDER'] = RESULT_FOLDER

# 配置日志记录
LOG_FILE = "error.log"
logging.basicConfig(
    filename=LOG_FILE,
    level=logging.ERROR,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

@app.route('/')
def home():
    return '欢迎使用抗体设计平台'

@app.route('/upload', methods=['POST'])
def upload_file():
    try:
        # 检查是否有文件或序列输入
        file_path = None
        if 'file' in request.files:
            file = request.files['file']
            if file.filename == '':
                return jsonify({'error': '未选择文件'}), 400
            if not file.filename.endswith('.fasta'):
                return jsonify({'error': '文件类型无效，仅支持 .fasta 文件'}), 400
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(file.filename))
            file.save(file_path)
        elif 'sequence' in request.form:
            sequence = request.form['sequence']
            if not sequence.strip():
                return jsonify({'error': '未提供序列'}), 400
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], 'input_sequence.fasta')
            with open(file_path, 'w') as f:
                f.write(sequence)
        else:
            return jsonify({'error': '未提供输入'}), 400

        # 定义输出结果文件名
        timestamp = time.strftime("%Y%m%d%H%M%S")  # 获取当前时间戳
        result_file = os.path.join(
            app.config['RESULT_FOLDER'],
            f"aligned_result_{timestamp}.aln"  # 动态生成文件名
        )

        # 调用 ClustalW 进行多序列比对
        try:
            subprocess.run(
                ["D:\\Program Files (x86)\\ClustalW2\\clustalw2.exe", "-INFILE=" + file_path, "-OUTFILE=" + result_file, "-OUTPUT=CLUSTAL"],
                check=True
            )
        except subprocess.CalledProcessError as e:
            logging.error(f"ClustalW 执行失败: {str(e)}")
            return jsonify({'error': 'ClustalW 执行失败，请检查输入文件格式'}), 500

        # 读取比对结果
        with open(result_file, "r") as f:
            alignment_str = f.read()

        # 返回比对结果的下载链接和比对内容
        return jsonify({
            'message': '比对成功',
            'alignment': alignment_str,
            'download_url': f"/download/{os.path.basename(result_file)}"
        })
    except Exception as e:
        # 记录错误信息到日志文件
        logging.error(f"发生错误: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/download/<filename>', methods=['GET'])
def download_file(filename):
    # 提供比对结果文件的下载
    try:
        return send_from_directory(app.config['RESULT_FOLDER'], filename, as_attachment=True)
    except Exception as e:
        logging.error(f"文件下载失败: {str(e)}")
        return jsonify({'error': '文件下载失败'}), 500

if __name__ == '__main__':
    app.run(debug=True)
