import React from 'react';

function InputBox({ value, onChange }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder="请输入"
      style={{
        padding: '10px',
        fontSize: '18px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '260px',
        height: '130px',
        resize: 'none',
        textAlign: 'left',
        verticalAlign: 'top',
        marginTop: '60px', // 新增：下移输入框
      }}
    />
  );
}

export default InputBox;
