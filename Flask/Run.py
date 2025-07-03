import subprocess
import sys
from concurrent.futures import ProcessPoolExecutor
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def run_script(script_name):
    try:
        result = subprocess.run(f"python {script_name}", shell=True, text=True, capture_output=True)

        if result.returncode != 0:
            return f"Error while running {script_name}: {result.stderr}"
        return f"{script_name} executed successfully: {result.stdout}"
    except Exception as e:
        return f"Exception while running {script_name}: {e}"

if __name__ == "__main__":
    scripts = [
        "Energy-Score.py",
        "MultiSequenceAlignment.py",
        "R_templates.py",
        "Register_Api.py"
    ]
    
    with ProcessPoolExecutor() as executor:
        results = executor.map(run_script, scripts)

    for result in results:
        print(result)

    print("All scripts have been executed.")
