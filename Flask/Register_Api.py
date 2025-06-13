from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from flask_bcrypt import Bcrypt  # 用于密码加密

app = Flask(__name__)
CORS(app)  # 允许跨域请求
bcrypt = Bcrypt(app)  # 初始化 bcrypt

# 连接 MongoDB
try:
    client = MongoClient("mongodb://localhost:27017/")  # MongoDB 连接字符串
    db = client["CADD"]  # 数据库名称
    users_collection = db["users"]  # 集合名称
    # 检查数据库连接是否成功
    client.admin.command('ping')  # 通过 ping 命令测试是否连接成功
    print("MongoDB 连接成功！")
except Exception as e:
    print("MongoDB 连接失败:", e)
    raise Exception("无法连接到 MongoDB 数据库")  # 如果连接失败，抛出异常并停止应用程序

# 用户注册路由
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    print("接收到的数据:", data)  # 打印接收到的数据

    username = data.get('username')  # 用户名可以是邮箱、手机号或账户名
    password = data.get('password')
    role = 'user'  # 强制所有注册用户为普通用户

    if not username or not password:
        return jsonify({"error": "账户名/手机号/邮箱和密码均为必填"}), 400

    # 检查输入内容类型
    if "@" in username:  # 判断是否是邮箱
        field = "email"
    elif username.isdigit():  # 判断是否是手机号
        field = "phone"
    else:  # 默认是账户名
        field = "username"

    # 检查是否已存在
    if users_collection.find_one({field: username}):
        # 用中文提示
        if field == "username":
            return jsonify({"error": "用户名已存在"}), 400
        elif field == "email":
            return jsonify({"error": "邮箱已存在"}), 400
        elif field == "phone":
            return jsonify({"error": "手机号已存在"}), 400

    # 对密码进行加密
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    # 插入用户数据
    user = {
        "username": username if field == "username" else None,
        "email": username if field == "email" else None,
        "phone": username if field == "phone" else None,
        "password": hashed_password,
        "role": role
    }
    # 移除为 None 的字段
    user = {k: v for k, v in user.items() if v is not None}
    print(f"准备插入的数据: {user}")  # 在插入前打印数据

    try:
        result = users_collection.insert_one(user)
        print(f"插入结果: {result.inserted_id}")  # 打印插入结果
    except Exception as e:
        print(f"插入失败: {e}")
        return jsonify({"error": "数据库插入失败"}), 500

    return jsonify({"message": "注册成功"}), 201

# 用户登录路由
@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        print("接收到的登录数据:", data)  # 打印接收到的数据

        username = data.get('username')  # 用户名可以是邮箱、手机号或账户名
        password = data.get('password')
        is_admin_login = data.get('isAdmin', False)  # 新增

        # 检查用户是否存在
        user = users_collection.find_one({"$or": [{"username": username}, {"email": username}, {"phone": username}]})
        print("查询到的用户数据:", user)  # 打印查询结果

        if not user:
            print("用户不存在")
            return jsonify({"error": "用户名、邮箱或手机号错误"}), 400

        # 验证密码
        print("数据库密码哈希:", user['password'])
        print("登录输入密码:", password)
        if not bcrypt.check_password_hash(user['password'], password):
            print("密码验证失败")
            return jsonify({"error": "密码错误"}), 400

        # 新增：管理员身份校验
        user_role = user.get('role', 'user')
        if is_admin_login and user_role != 'admin':
            print("非管理员账号尝试管理员登录")
            return jsonify({"error": "该账号不是管理员，无法以管理员身份登录"}), 403

        # 登录成功，返回管理员标识
        return jsonify({
            "message": "登录成功",
            "role": user_role,
            "isAdmin": user_role == 'admin'  # 返回是否为管理员
        }), 200
    except Exception as e:
        print(f"后端错误: {e}")  # 打印异常信息
        return jsonify({"error": "服务器内部错误"}), 500

if __name__ == '__main__':
    host = '127.0.0.1'
    port = 5008
    print(f"服务已启动，请访问：http://{host}:{port}")
    app.run(debug=True, host=host, port=port)
