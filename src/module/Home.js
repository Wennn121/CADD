import React, { useState } from 'react';
import InputBox from '../InputBox';
import TextAreaWithSubmit from '../TextAreaWithSubmit';

function Home() {
  const [inputValue, setInputValue] = useState(''); // 定义状态来存储输入框内容

  const handleInputChange = (event) => {
    setInputValue(event.target.value); // 更新输入框内容
  };

  const handleSubmit = () => {
    alert(`提交的内容是: ${inputValue}`); // 提交时弹出输入框内容
  };

  return (
    <div style={{
      position: 'relative', // 设置父容器为相对定位
      width: '100%',
      height: '100vh', // 让父容器占满整个视口高度
    }}>
      <h2 style={{
        position: 'absolute', // 绝对定位
        top: '50px', // 距离顶部 50px
        left: '20px', // 距离左侧 20px
        color: '#000', // 设置字体颜色为黑色
        fontSize: '24px', // 可根据需要调整字体大小
      }}>
        首页
      </h2>
      <InputBox
        value={inputValue} // 绑定输入框的值
        onChange={handleInputChange} // 绑定输入框的变化事件
        style={{
          position: 'absolute', // 绝对定位
          top: '120px', // 距离顶部 120px
          left: '20px', // 距离左侧 20px
        }}
      />
      <button
        onClick={handleSubmit} // 点击按钮时触发提交事件
        style={{
          position: 'absolute',
          top: '280px', // 按钮位置
          left: '235px',
          padding: '10px 20px',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        提交
      </button>
    </div>
  );
}

export default Home;