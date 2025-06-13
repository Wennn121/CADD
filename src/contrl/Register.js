import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // 错误提示
  const [success, setSuccess] = useState(''); // 成功提示
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://127.0.0.1:5008/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('注册成功！即将跳转到登录页面...');
        setTimeout(() => navigate('/login'), 2000); // 2秒后跳转到登录页面
      } else {
        setError(data.error || '注册失败');
      }
    } catch (error) {
      console.error('注册请求失败:', error);
      setError('注册请求失败，请稍后再试');
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
        }}>注册</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <label style={{ fontWeight: 'bold', color: '#333' }}>账户名/手机号/邮箱:</label>
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
          {/* 错误提示 */}
          {error && (
            <div style={{
              color: 'red',
              background: '#fff0f0',
              border: '1px solid #ffcccc',
              borderRadius: '5px',
              padding: '8px 12px',
              marginBottom: '10px',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}
          {/* 成功提示 */}
          {success && (
            <div style={{
              color: 'green',
              background: '#f0fff0',
              border: '1px solid #ccffcc',
              borderRadius: '5px',
              padding: '8px 12px',
              marginBottom: '10px',
              textAlign: 'center'
            }}>
              {success}
            </div>
          )}
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
            注册
          </button>
        </form>
        <p style={{
          textAlign: 'center',
          marginTop: '15px',
          color: '#666',
        }}>
          已有账号？ <span
            style={{
              color: '#1b3fa1',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
            onClick={() => navigate('/login')}
          >
            登录
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;