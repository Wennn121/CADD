from flask import Flask, request, jsonify, session
from flask_cors import CORS
from pymongo import MongoClient
from flask_bcrypt import Bcrypt
import secrets

app = Flask(__name__)
app.secret_key = 'b2d8f3e1c4a7e9b6d5f2a1c3e4b7d8f9'
CORS(app, supports_credentials=True, origins=["http://localhost:3000"])
bcrypt = Bcrypt(app)

try:
    client = MongoClient("mongodb://localhost:27017/")
    db = client["CADD"]
    users_collection = db["users"]
    client.admin.command('ping')
    print("MongoDB 连接成功！")
except Exception as e:
    print("MongoDB 连接失败:", e)
    raise Exception("无法连接到 MongoDB 数据库")

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    print("接收到的数据:", data)

    username = data.get('username')
    password = data.get('password')
    role = 'user'

    if not username or not password:
        return jsonify({"error": "账户名/手机号/邮箱和密码均为必填"}), 400

    if "@" in username:
        field = "email"
    elif username.isdigit():
        field = "phone"
    else:
        field = "username"

    if users_collection.find_one({field: username}):
        if field == "username":
            return jsonify({"error": "用户名已存在"}), 400
        elif field == "email":
            return jsonify({"error": "邮箱已存在"}), 400
        elif field == "phone":
            return jsonify({"error": "手机号已存在"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    user = {
        "username": username if field == "username" else None,
        "email": username if field == "email" else None,
        "phone": username if field == "phone" else None,
        "password": hashed_password,
        "role": role
    }
    user = {k: v for k, v in user.items() if v is not None}
    print(f"准备插入的数据: {user}")

    try:
        result = users_collection.insert_one(user)
        print(f"插入结果: {result.inserted_id}")
    except Exception as e:
        print(f"插入失败: {e}")
        return jsonify({"error": "数据库插入失败"}), 500

    return jsonify({"message": "注册成功"}), 201

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        username = data.get('username')
        password = data.get('password')

        user = users_collection.find_one({"username": username})
        if not user:
            return jsonify({"error": "用户名错误"}), 400

        if not bcrypt.check_password_hash(user['password'], password):
            return jsonify({"error": "密码错误"}), 400

        session['username'] = user.get('username')
        print(f"写入会话的用户名: {session['username']}")
        return jsonify({"message": "登录成功", "username": user.get('username')}), 200
    except Exception as e:
        print(f"登录失败: {e}")
        return jsonify({"error": "服务器内部错误"}), 500

@app.route('/current-user', methods=['GET'])
def get_current_user():
    try:
        username = request.headers.get('X-Username')
        if not username:
            return jsonify({"error": "未提供用户标识"}), 400

        user = users_collection.find_one({"username": username})
        print(f"请求头中的用户名: {username}")
        print(f"查询到的用户信息: {user}")
        if not user:
            return jsonify({"error": "用户不存在"}), 404

        return jsonify({
            "username": user.get("username"),
            "email": user.get("email"),
            "role": user.get("role", "user")
        }), 200
    except Exception as e:
        print(f"获取用户信息失败: {e}")
        return jsonify({"error": "服务器内部错误"}), 500

@app.route('/session-user', methods=['GET'])
def session_user():
    print("收到 /session-user 请求")
    username = session.get("username", "")
    print(f"当前会话中的用户名: {username}")
    response = jsonify({"username": username})
    response.headers["Content-Type"] = "application/json"
    print('返回给前端的内容:', {'username': username})
    print("请求携带的 cookies:", request.cookies)
    return response

if __name__ == '__main__':
    host = '127.0.0.1'
    port = 5008
    print(f"服务已启动，请访问：http://{host}:{port}")
    app.run(debug=True, host=host, port=port)
