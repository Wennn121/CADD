import React, { useState } from 'react';

function EnergyScore() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // 假设这是后续功能模块
  const runEnergyScore = async (filename) => {
    setResult(prev => prev + '\n能量打分模块已运行（示例）');
  };

  const handleSubmit = async () => {
    if (!file) {
      setResult('请先选择pdb文件');
      return;
    }

    setLoading(true);
    setResult('');
    try {
      const formData = new FormData();
      formData.append('pdb', file);

      const response = await fetch('http://223.113.240.10:1116/upload-pdb', {
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
      } else if (data.message && data.filename) {
        setResult('上传成功: ' + data.message);
        await runEnergyScore(data.filename);
      } else {
        setResult('未知错误');
      }
    } catch (error) {
      // 网络错误或其他错误
      setResult('调用失败: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <h2 style={{ position: 'absolute', top: '50px', left: '20px', color: '#000', fontSize: '24px' }}>
        能量分数评分页面
      </h2>
      <input
        type="file"
        accept=".pdb"
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
        {loading ? '计算中...' : '提交'}
      </button>
      {result && (
        <div style={{ position: 'absolute', top: '240px', left: '20px', color: '#333', whiteSpace: 'pre-line' }}>
          {result}
        </div>
      )}
    </div>
  );
}

export default EnergyScore;
