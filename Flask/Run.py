import subprocess
import sys
from concurrent.futures import ProcessPoolExecutor
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # 允许所有跨域请求

def run_script(script_name):
    try:
        # 使用 subprocess.run 来启动每个 Python 脚本，捕获输出与错误
        result = subprocess.run(f"python {script_name}", shell=True, text=True, capture_output=True)

        # 如果脚本执行失败，捕获错误并返回
        if result.returncode != 0:
            return f"Error while running {script_name}: {result.stderr}"
        return f"{script_name} executed successfully: {result.stdout}"
    except Exception as e:
        return f"Exception while running {script_name}: {e}"

if __name__ == "__main__":
    # 并发执行的脚本列表
    scripts = [
        "Energy-Score.py",
        "MultiSequenceAlignment.py",
        "R_templates.py",
        "Register_Api.py"
    ]
    
    with ProcessPoolExecutor() as executor:
        # 并发执行所有脚本
        results = executor.map(run_script, scripts)

    # 输出每个脚本的执行结果
    for result in results:
        print(result)

    print("All scripts have been executed.")
