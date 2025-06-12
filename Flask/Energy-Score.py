from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import time
import threading
import logging
import paramiko
import urllib.parse
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

# ---------------- 配置路径 ----------------
UPLOAD_FOLDER = r"D:\桌面\Energy后端文件夹\Upload"
RESULT_FOLDER = "results"
ENERGY_SCORE_FOLDER = r"D:\桌面\Energy后端文件夹\Downld\Result"
REMOTE_HOST = 'xh5.hpccube.com'
REMOTE_PORT = 65061
USERNAME = 'x9y111'
PRIVATE_KEY_PATH = r'D:\桌面\x9y111曙光云秘钥.txt'
REMOTE_UPLOAD_DIR = '/work/home/x9y111/1.energy_score/Energy-Folder/Upload'
REMOTE_RESULT_DIR = '/work/home/x9y111/1.energy_score/Energy-Folder/Result'
SYNC_INTERVAL = 30

# ---------------- 初始化 ----------------
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(RESULT_FOLDER, exist_ok=True)
os.makedirs(ENERGY_SCORE_FOLDER, exist_ok=True)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['RESULT_FOLDER'] = RESULT_FOLDER
app.config['ENERGY_SCORE_FOLDER'] = ENERGY_SCORE_FOLDER

LOG_FILE = "error.log"
logging.basicConfig(filename=LOG_FILE, level=logging.ERROR, format="%(asctime)s - %(levelname)s - %(message)s")
already_downloaded = set(os.listdir(ENERGY_SCORE_FOLDER))

# ---------------- 文件同步线程 ----------------
def sync_from_remote():
    first_run = True
    while True:
        try:
            print("[SYNC] 正在连接曙光云服务器...")
            key = paramiko.RSAKey.from_private_key_file(PRIVATE_KEY_PATH)
            transport = paramiko.Transport((REMOTE_HOST, REMOTE_PORT))
            transport.connect(username=USERNAME, pkey=key)
            print("[SYNC] ✅ 成功连接到曙光云服务器")

            sftp = paramiko.SFTPClient.from_transport(transport)
            remote_files = sftp.listdir(REMOTE_RESULT_DIR)
            print(f"[SYNC] 📦 远程文件数量: {len(remote_files)}")

            for file in remote_files:
                if file not in already_downloaded:
                    remote_path = f"{REMOTE_RESULT_DIR.rstrip('/')}/{file}"
                    local_path = os.path.join(ENERGY_SCORE_FOLDER, file)
                    print(f"[SYNC] 正在下载文件: {remote_path} 到本地 {local_path}")
                    sftp.get(remote_path, local_path)
                    already_downloaded.add(file)
                    print(f"[SYNC] ✅ 下载完成: {file}")

            sftp.close()
            transport.close()
        except Exception as e:
            print(f"[SYNC ERROR] 错误: {str(e)}")
            logging.error(f"[SYNC ERROR] 错误: {str(e)}")

        time.sleep(SYNC_INTERVAL)


# ---------------- 路由 ----------------
@app.route('/')
def home():
    return 'Energy Score Server Running'

@app.route('/upload-energy-score', methods=['POST'])
def upload_energy_score_file():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400

        file = request.files['file']
        if file.filename == '' or not file.filename.endswith('.pdb'):
            return jsonify({'error': 'Only .pdb files are supported'}), 400

        filename = secure_filename(file.filename)
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(file_path)
        print(f"[UPLOAD] 本地保存: {file_path}")

        key = paramiko.RSAKey.from_private_key_file(PRIVATE_KEY_PATH)
        transport = paramiko.Transport((REMOTE_HOST, REMOTE_PORT))
        transport.connect(username=USERNAME, pkey=key)
        sftp = paramiko.SFTPClient.from_transport(transport)

        remote_path = f"{REMOTE_UPLOAD_DIR.rstrip('/')}/{filename}"
        sftp.put(file_path, remote_path)
        print(f"[UPLOAD] 上传到曙光云: {remote_path}")

        sftp.close()
        transport.close()

        return jsonify({'message': 'Upload successful and synced to HPC', 'file_path': file_path})
    except Exception as e:
        logging.error(str(e))
        return jsonify({'error': str(e)}), 500

@app.route('/check-energy-score-status/<filename>', methods=['GET'])
def check_energy_score_status(filename):
    try:
        base = os.path.splitext(filename)[0].lower()
        files = [f for f in os.listdir(ENERGY_SCORE_FOLDER) if base in f.lower() and f.endswith(('.csv', '.pdb'))]

        if not files:
            return jsonify({'status': 'pending', 'message': 'Calculation not finished'}), 200

        links = [{'filename': f, 'download_url': f"/download-energy-file/{urllib.parse.quote(f)}"} for f in files]
        return jsonify({'status': 'completed', 'message': 'Results ready', 'files': links}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/download-energy-file/<path:filename>', methods=['GET'])
def download_energy_file(filename):
    try:
        safe_name = os.path.basename(filename)
        full_path = os.path.join(ENERGY_SCORE_FOLDER, safe_name)
        if not os.path.exists(full_path):
            return jsonify({'error': 'File not found'}), 404

        resp = send_from_directory(ENERGY_SCORE_FOLDER, safe_name, as_attachment=True)
        encoded_name = urllib.parse.quote(safe_name.encode('utf-8'))
        resp.headers["Content-Disposition"] = f"attachment; filename*=UTF-8''{encoded_name}"
        return resp
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ---------------- 主程序 ----------------
if __name__ == '__main__':
    threading.Thread(target=sync_from_remote, daemon=True).start()
    print("http://127.0.0.1:5000 服务启动...")
    app.run(debug=True, host='127.0.0.1', port=5000)
