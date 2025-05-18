import React from 'react';

function TextAreaWithSubmit({ onSubmit }) {
  console.log('TextAreaWithSubmit rendered');

  return (
    <div style={{ position: 'absolute', top: '120px', left: '50px', zIndex: 1000 }}>
      <button
        onClick={onSubmit}
        style={{
          marginTop: '120px',
          marginLeft: '180px',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        提交
      </button>
    </div>
  );
}

export default TextAreaWithSubmit;
