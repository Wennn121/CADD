import React, { useState } from 'react';

function MultiSequenceAlignment() {
  const [file, setFile] = useState(null); // 用于存储上传的文件
  const [sequence, setSequence] = useState(''); // 用于存储用户输入的序列
  const [loading, setLoading] = useState(false); // 用于显示加载状态
  const [result, setResult] = useState(''); // 用于显示结果

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // 更新文件
  };

  const handleSequenceChange = (event) => {
    setSequence(event.target.value); // 更新用户输入的序列
  };

  const handleSubmit = async () => {
    if (!file && !sequence.trim()) {
      setResult('请先选择序列文件或输入序列');
      return;
    }

    setLoading(true);
    setResult('');
    try {
      const formData = new FormData();
      if (file) {
        formData.append('file', file); // 如果有文件，上传文件
      } else {
        formData.append('sequence', sequence); // 如果有序列，上传序列
      }

      const response = await fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        setResult('调用失败：HTTP ' + response.status);
        setLoading(false);
        return;
      }

      const data = await response.json();

      if (data.error) {
        setResult('上传失败: ' + data.error);
      } else if (data.message) {
        setResult('比对成功: ' + data.message + '\n结果:\n' + data.alignment);
      } else {
        setResult('未知错误');
      }
    } catch (error) {
      setResult('调用失败: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <h2 style={{ position: 'absolute', top: '50px', left: '20px', color: '#000', fontSize: '24px' }}>
        多序列比对页面
      </h2>
      <textarea
        placeholder="在此输入序列（FASTA 格式）"
        value={sequence}
        onChange={handleSequenceChange}
        style={{
          position: 'absolute',
          top: '120px',
          left: '20px',
          width: '300px',
          height: '100px',
          resize: 'none',
        }}
      />
      <input
        type="file"
        accept=".fasta,.txt"
        onChange={handleFileChange}
        style={{ position: 'absolute', top: '230px', left: '20px' }}
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          position: 'absolute',
          top: '265px',
          left: '20px',
          padding: '10px 20px',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? '比对中...' : '提交'}
      </button>
      {result && (
        <div style={{ position: 'absolute', top: '320px', left: '20px', color: '#333', whiteSpace: 'pre-line' }}>
          {result}
        </div>
      )}
    </div>
  );
}

export default MultiSequenceAlignment;
