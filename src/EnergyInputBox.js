import React from 'react';

function EnergyInputBox({ value, onChange, style }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder="请输入抗体序列"
      style={{
        padding: '10px',
        fontSize: '18px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '280px',
        height: '150px',
        resize: 'none',
        textAlign: 'left',
        verticalAlign: 'top',
        boxSizing: 'border-box',
        ...style
      }}
    />
  );
}

export default EnergyInputBox;