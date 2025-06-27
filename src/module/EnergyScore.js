import React, { useState } from 'react';

function EnergyScore() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [downloadLinks, setDownloadLinks] = useState([]); // 存储下载链接

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && !selectedFile.name.endsWith('.pdb')) {
      setResult('仅支持上传 .pdb 文件');
      setFile(null);
      return;
    }
    setFile(selectedFile);
  };

  const handleSubmit = async () => {
    if (!file) {
      setResult('请先选择 .pdb 文件');
      return;
    }

    setLoading(true);
    setResult('');
    setDownloadLinks([]); // 清空之前的下载链接
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://127.0.0.1:5000/upload-energy-score', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        setResult('上传失败：HTTP ' + response.status);
        setLoading(false);
        return;
      }

      const data = await response.json();
      if (data.error) {
        setResult('上传失败: ' + data.error);
      } else {
        setResult('上传成功: ' + data.message);

        // 开始轮询检查计算状态
        pollForResults(file.name);
      }
    } catch (error) {
      setResult(`上传失败: ${error.message}`);
    }
    setLoading(false);
  };

  const pollForResults = (uploadedFileName) => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/check-energy-score-status/${uploadedFileName}`);
        const data = await response.json();

        if (data.status === 'completed') {
          clearInterval(interval); // 停止轮询
          setResult(data.message);
          setDownloadLinks(data.files); // 设置下载链接
        } else {
          setResult(data.message); // 显示计算状态
        }
      } catch (error) {
        clearInterval(interval); // 停止轮询
        setResult(`检查状态失败: ${error.message}`);
      }
    }, 5000); // 每5秒检查一次
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
        disabled={loading || !file}
        style={{
          position: 'absolute',
          top: '180px',
          left: '20px',
          padding: '10px 20px',
          backgroundColor: loading || !file ? '#ccc' : '#007BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: loading || !file ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? '上传中...' : '提交'}
      </button>
      {result && (
        <div style={{ position: 'absolute', top: '240px', left: '20px', color: '#333', whiteSpace: 'pre-line' }}>
          {result}
        </div>
      )}
      {downloadLinks.length > 0 && (
        <div style={{ position: 'absolute', top: '300px', left: '20px', color: '#333' }}>
          <h3>下载结果文件：</h3>
          <ul>
            {downloadLinks.map((link, index) => (
              <li key={index}>
                <a href={`http://127.0.0.1:5000${link.download_url}`} download style={{ color: '#007BFF', textDecoration: 'none' }}>
                  {link.filename}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default EnergyScore;
