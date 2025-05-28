import React, { useState } from 'react';
import styles from './MultiSequenceAlignment.module.css';

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
        const formatAlignmentResult = (result) => {
          return result
            .split('\n') // 按行分割
            .map(line => line.trim()) // 去除每行的多余空格
            .join('\n'); // 再拼接成字符串
        };

        setResult('比对成功: ' + data.message + '\n结果:\n' + formatAlignmentResult(data.alignment));
      } else {
        setResult('未知错误');
      }
    } catch (error) {
      setResult('调用失败: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>多序列比对页面</h2>
      <textarea
        className={styles.textarea}
        placeholder="在此输入序列（FASTA 格式）"
        value={sequence}
        onChange={handleSequenceChange}
      />
      <input
        type="file"
        className={styles.fileInput}
        accept=".fasta,.txt"
        onChange={handleFileChange}
      />
      <button
        className={styles.button}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? '比对中...' : '提交'}
      </button>
      {result && (
        <div className={styles.resultBox}>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
}

export default MultiSequenceAlignment;
