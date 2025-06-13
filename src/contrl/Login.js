import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // 是否管理员登录模式

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 根据 isAdmin 的值发送请求
      const response = await fetch('http://127.0.0.1:5008/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, isAdmin }), // 发送 isAdmin 标识
      });

      const data = await response.json();

      if (response.ok) {
        alert('登录成功');
        login(); // 更新登录状态
        // 根据 isAdmin 的值跳转到不同页面
        if (isAdmin) {
          navigate('/admin-dashboard'); // 跳转到管理员界面
        } else {
          navigate('/dashboard'); // 跳转到普通用户界面
        }
      } else {
        alert(data.error || '登录失败');
      }
    } catch (error) {
      console.error('登录请求失败:', error);
      alert('登录请求失败，请稍后再试');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f4f8',
    }}>
      <div style={{
        width: '400px',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'white',
      }}>
        <h2 style={{
          textAlign: 'center',
          color: '#1b3fa1',
          marginBottom: '20px',
        }}>{isAdmin ? '管理员登录' : '登录'}</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <label style={{ fontWeight: 'bold', color: '#333' }}>用户名:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '16px',
            }}
          />
          <label style={{ fontWeight: 'bold', color: '#333' }}>密码:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '16px',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: '#1b3fa1',
              color: 'white',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#16327d'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#1b3fa1'}
          >
            {isAdmin ? '管理员登录' : '登录'}
          </button>
        </form>
        <p style={{
          textAlign: 'center',
          marginTop: '15px',
          color: '#666',
        }}>
          还没有账号？ <span
            style={{
              color: '#1b3fa1',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
            onClick={() => navigate('/register')}
          >
            注册
          </span>
        </p>
        <p style={{
          textAlign: 'center',
          marginTop: '10px',
        }}>
          <button
            style={{
              background: 'none',
              border: 'none',
              color: '#1b3fa1',
              cursor: 'pointer',
              textDecoration: 'underline',
              fontSize: '15px',
              padding: 0,
            }}
            onClick={() => setIsAdmin(!isAdmin)} // 切换管理员登录模式
            type="button"
          >
            {isAdmin ? '用户登录' : '管理员登录'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;