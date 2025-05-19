import React, { useState } from 'react';
import EnergyInputBox from '../EnergyInputBox'; // 用新的输入框组件

function EnergyScore() {
  const [energyValue, setEnergyValue] = useState(''); // 独立的输入内容

  const handleInputChange = (event) => {
    setEnergyValue(event.target.value);
  };

  const handleSubmit = () => {
    alert(`提交的内容是: ${energyValue}`);
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
    }}>
      <h2 style={{
        position: 'absolute',
        top: '50px',
        left: '20px',
        color: '#000',
        fontSize: '24px',
      }}>
        能量分数评分页面
      </h2>
      <EnergyInputBox
        value={energyValue}
        onChange={handleInputChange}
        style={{
          position: 'absolute',
          top: '120px',
          left: '20px',
        }}
      />
      <button
        onClick={handleSubmit}
        style={{
          position: 'absolute',
          top: '280px',
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

export default EnergyScore;