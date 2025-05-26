import React, { useState } from 'react';

function MultiSequenceAlignment() { // 修改组件名称
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) {
      setResult('请先选择序列文件');
      return;
    }

    setLoading(true);
    setResult('');
    try {
      const formData = new FormData();
      formData.append('sequence', file);

      const response = await fetch('http://223.113.240.10:1116/upload-sequence', {
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
      <input
        type="file"
        accept=".fasta,.txt"
        onChange={handleFileChange}
        style={{ position: 'absolute', top: '120px', left: '20px' }}
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          position: 'absolute',
          top: '180px',
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
        <div style={{ position: 'absolute', top: '240px', left: '20px', color: '#333', whiteSpace: 'pre-line' }}>
          {result}
        </div>
      )}
    </div>
  );
}

export default MultiSequenceAlignment; // 修改导出名称
