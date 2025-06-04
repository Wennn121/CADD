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
UPLOAD_FOLDER = r"D:\桌面\Energy后端文件夹\Upload"  # 修改上传文件夹路径
RESULT_FOLDER = "results"
ENERGY_SCORE_FOLDER = r"D:\桌面\Energy后端文件夹\Downld\Result"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(RESULT_FOLDER, exist_ok=True)
os.makedirs(ENERGY_SCORE_FOLDER, exist_ok=True)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['RESULT_FOLDER'] = RESULT_FOLDER
app.config['ENERGY_SCORE_FOLDER'] = ENERGY_SCORE_FOLDER

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

@app.route('/upload-energy-score', methods=['POST'])
def upload_energy_score_file():
    try:
        # 检查是否有文件上传
        if 'file' not in request.files:
            return jsonify({'error': '未提供文件'}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': '未选择文件'}), 400

        # 检查文件类型是否为 .pdb
        if not file.filename.endswith('.pdb'):
            return jsonify({'error': '文件类型无效，仅支持 .pdb 文件'}), 400

        # 保存文件到指定目录
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(file.filename))
        file.save(file_path)

        # 添加日志记录
        logging.info(f"文件已保存到: {file_path}")

        # 返回成功信息
        return jsonify({
            'message': '文件上传成功',
            'file_path': file_path
        })
    except Exception as e:
        logging.error(f"能量分数评分文件上传失败: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/energy-score-results/<filename>', methods=['GET'])
def get_energy_score_results(filename):
    """
    根据上传的文件名获取对应的结果文件列表
    """
    try:
        # 获取能量分数评分文件夹中的所有文件
        files = os.listdir(app.config['ENERGY_SCORE_FOLDER'])

        # 使用完整匹配逻辑，确保文件名处理正确
        base_filename = os.path.splitext(filename)[0]  # 去掉文件扩展名
        result_files = [
            file for file in files if base_filename in file
        ]

        if not result_files:
            return jsonify({'error': '没有找到对应的结果文件'}), 404

        # 构造文件下载链接
        file_links = [
            {
                'filename': result_file,
                'download_url': f"/download-energy-file/{result_file}"
            }
            for result_file in result_files
        ]

        return jsonify({
            'message': '能量分数评分结果文件列表',
            'files': file_links
        })
    except Exception as e:
        logging.error(f"获取能量分数评分结果文件失败: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/download-energy-file/<filename>', methods=['GET'])
def download_energy_file(filename):
    """
    提供能量分数评分结果文件的下载
    """
    try:
        return send_from_directory(app.config['ENERGY_SCORE_FOLDER'], filename, as_attachment=True)
    except Exception as e:
        logging.error(f"文件下载失败: {str(e)}")
        return jsonify({'error': '文件下载失败'}), 500

@app.route('/check-energy-score-status/<filename>', methods=['GET'])
def check_energy_score_status(filename):
    """
    检查计算状态并返回结果文件的下载链接
    """
    try:
        # 获取能量分数评分文件夹中的所有文件
        files = os.listdir(app.config['ENERGY_SCORE_FOLDER'])

        # 使用严格匹配逻辑，确保文件名处理正确
        base_filename = os.path.splitext(filename)[0]  # 去掉文件扩展名
        result_files = [
            file for file in files if file.startswith(base_filename) and file.endswith(('.csv', '.pdb'))
        ]

        if not result_files:
            return jsonify({'status': 'pending', 'message': '计算尚未完成'}), 200

        # 构造文件下载链接
        file_links = [
            {
                'filename': result_file,
                'download_url': f"/download-energy-file/{result_file}"
            }
            for result_file in result_files
        ]

        return jsonify({
            'status': 'completed',
            'message': '计算完成',
            'files': file_links
        }), 200
    except Exception as e:
        logging.error(f"检查计算状态失败: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    host = '127.0.0.1'  # 本地地址
    port = 5000         # 默认端口
    print(f"服务已启动，请访问：http://{host}:{port}")
    app.run(debug=True, host=host, port=port)
