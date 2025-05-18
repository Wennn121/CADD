import React, { useState } from 'react';
import './App.css'; // 确保 CSS 文件被正确导入
import Navbar from './Navbar/Navbar.js';
import InputBox from './InputBox';
import TextAreaWithSubmit from './TextAreaWithSubmit';

function App() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => setInputValue(event.target.value);
  const handleSubmit = () => alert('提交成功！');

  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
          <InputBox value={inputValue} onChange={handleInputChange} />
        </div>
        {/* 确保这里只渲染一次 */}
        <TextAreaWithSubmit onSubmit={handleSubmit} />
      </header>
    </div>
  );
}

export default App;
