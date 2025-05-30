import React from 'react';

function InputBox({ value, onChange, style }) {
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
        ...style // 合并外部传入的样式
      }}
    />
  );
}

export default InputBox;
