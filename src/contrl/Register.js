import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register submitted', username, password);

    // 注册成功
    navigate('/login'); // 注册成功后跳转到登录页面
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