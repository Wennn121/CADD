from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import subprocess
import time
import logging
from werkzeug.utils import secure_filename
from Bio import AlignIO
from Bio import SeqIO
from Bio.Seq import Seq
from Bio.SeqRecord import SeqRecord
from Bio import pairwise2

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = r"D:\Antibody\MultiSequenceAlignment\Upload"
RESULT_FOLDER = r"D:\Antibody\MultiSequenceAlignment\Result"
DB_FASTA_PATH = r"D:\Antibody\MultiSequenceAlignment\Data\antibody_db.fasta"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(RESULT_FOLDER, exist_ok=True)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['RESULT_FOLDER'] = RESULT_FOLDER

LOG_FILE = "error.log"
logging.basicConfig(
    filename=LOG_FILE,
    level=logging.ERROR,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

def make_unique_ids(records):
    unique_ids = set()
    new_records = []
    for i, record in enumerate(records):
        original_id = record.id
        if original_id in unique_ids:
            record.id = f"{original_id}_{i}"
        record.name = record.id
        record.description = ""
        unique_ids.add(record.id)
        new_records.append(record)
    return new_records

def format_alignment_block(text):
    lines = text.strip().split('\n')
    blocks = []
    block = []
    for line in lines:
        if line.strip() == '' and block:
            blocks.append(block)
            block = []
        else:
            block.append(line)
    if block:
        blocks.append(block)

    formatted = []
    for blk in blocks:
        max_len = max((len(line.split()[0]) for line in blk if len(line.split()) >= 2), default=0)
        for line in blk:
            parts = line.split()
            if len(parts) == 2:
                name, seq = parts
                formatted.append(f"{name.ljust(max_len)}   {seq}")
            elif len(parts) == 1:
                formatted.append(' ' * (max_len + 3) + parts[0])
            else:
                formatted.append(line)
        formatted.append('')
    return '\n'.join(formatted)

@app.route('/')
def home():
    return '欢迎使用抗体设计平台'

@app.route('/upload', methods=['POST'])
def upload_file():
    try:
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
            if not sequence.startswith('>'):
                sequence = f">UserInput\n{sequence}"
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], 'input_sequence.fasta')
            with open(file_path, 'w') as f:
                f.write(sequence)
        else:
            return jsonify({'error': '未提供输入'}), 400

        user_seq = list(SeqIO.parse(file_path, "fasta"))[0]
        db_records = list(SeqIO.parse(DB_FASTA_PATH, "fasta"))

        scores = []
        for record in db_records:
            score = pairwise2.align.globalxx(user_seq.seq, record.seq, one_alignment_only=True, score_only=True)
            scores.append((score, record))
        scores.sort(reverse=True, key=lambda x: x[0])
        top_20_percent = int(len(scores) * 0.2) or 1

        user_seq_in_db = any(str(user_seq.seq) == str(r.seq) for r in db_records)

        if user_seq_in_db:
            note = "上传序列已存在于数据库，已保留并重新命名。"
            selected_records = [user_seq] + [r for _, r in scores[:top_20_percent]]
        else:
            note = "上传序列不在数据库中，正常加入比对。"
            selected_records = [user_seq] + [r for _, r in scores[:top_20_percent]]

        renamed_records = make_unique_ids(selected_records)
        merged_fasta = os.path.join(app.config['UPLOAD_FOLDER'], f"merged_{int(time.time())}.fasta")
        SeqIO.write(renamed_records, merged_fasta, "fasta")

        timestamp = time.strftime("%Y%m%d%H%M%S")
        result_file = os.path.join(app.config['RESULT_FOLDER'], f"aligned_result_{timestamp}.aln")

        try:
            subprocess.run(
                ["D:\\Program Files (x86)\\ClustalW2\\clustalw2.exe", "-INFILE=" + merged_fasta, "-OUTFILE=" + result_file, "-OUTPUT=CLUSTAL"],
                check=True
            )
        except subprocess.CalledProcessError as e:
            logging.error(f"ClustalW 执行失败: {str(e)}")
            return jsonify({'error': 'ClustalW 执行失败，请检查输入文件格式'}), 500

        with open(result_file, "r") as f:
            alignment_str = format_alignment_block(f.read())

        return jsonify({
            'message': '比对成功（前20%相似序列）',
            'note': note,
            'alignment': alignment_str,
            'download_url': f"/download/{os.path.basename(result_file)}"
        })
    except Exception as e:
        logging.exception(f"发生错误: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/download/<filename>', methods=['GET'])
def download_file(filename):
    try:
        return send_from_directory(app.config['RESULT_FOLDER'], filename, as_attachment=True)
    except Exception as e:
        logging.error(f"文件下载失败: {str(e)}")
        return jsonify({'error': '文件下载失败'}), 500

if __name__ == '__main__':
    host = '127.0.0.1'
    port = 5005
    print(f"服务已启动，请访问：http://{host}:{port}")
    app.run(debug=True, host=host, port=port)
