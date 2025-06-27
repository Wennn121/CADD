import React, { useState, useEffect } from 'react';
import scriptTemplates from './R_templates';
import styles from './RScriptExecutor.module.css';

function RScriptExecutor() {
  const [loading, setLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('boxplot');
  const [parameters, setParameters] = useState({ param1: '', param2: '' });
  const [rCode, setRCode] = useState('');


  useEffect(() => {
    const templateFunc = scriptTemplates[selectedTemplate];
    if (typeof templateFunc === 'function') {
      if (selectedTemplate === 'cdr3_length_stat') {
        setRCode(templateFunc("${input}", "${output}"));
      } else {
        setRCode(templateFunc(parameters.param1, parameters.param2));
      }
    } else {
      setRCode('');
    }
  }, [selectedTemplate, parameters]);

  const [dataInputType, setDataInputType] = useState('db');
  const [dbData, setDbData] = useState('');
  const [fileData, setFileData] = useState(null);
  const [sequenceData, setSequenceData] = useState('');

  const handleDataInputTypeChange = (e) => {
    setDataInputType(e.target.value);
    setDbData('');
    setFileData(null);
    setSequenceData('');
  };

  const handleFileChange = (e) => {
    setFileData(e.target.files[0]);
  };

  const handleDbDataChange = (e) => {
    setDbData(e.target.value);
  };

  const handleSequenceDataChange = (e) => {
    setSequenceData(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResultUrl("");

    if (dataInputType === 'db' && !dbData) {
      alert("请输入数据库数据！");
      setLoading(false);
      return;
    }
    if (dataInputType === 'fileOrSeq' && !fileData && !sequenceData) {
      alert("请上传文件或输入序列数据！");
      setLoading(false);
      return;
    }

  
    let finalCode = rCode;


    const filename = `output_${Date.now()}.png`;
    finalCode = finalCode.replace(/output\.png/g, filename);

    const formData = new FormData();
    formData.append("code", finalCode);
    formData.append("parameters", JSON.stringify(parameters));
    formData.append("dataInputType", dataInputType);

    if (dataInputType === 'db') {
      formData.append("dbData", dbData);
    } else if (dataInputType === 'fileOrSeq') {
      if (fileData) formData.append("fileData", fileData);
      if (sequenceData) formData.append("sequenceData", sequenceData);
    }

    try {
      const response = await fetch("http://127.0.0.1:5009/DB", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.filename) {
        setResultUrl(`http://127.0.0.1:5009/static/${data.filename}`);
      } else {
        alert(data.error || "执行失败");
      }
    } catch (error) {
      console.error("执行出错:", error);
    } finally {
      setLoading(false);
    }
    console.log("提交前 rCode 内容：", rCode);
  };

  const handleParameterChange = (e) => {
    const { name, value } = e.target;
    setParameters((prev) => ({ ...prev, [name]: value }));
  };

  const handleTemplateChange = (e) => {
    setSelectedTemplate(e.target.value);
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>R 绘图平台</h1>

      <div className={styles.content}>
        <form onSubmit={handleSubmit} className={styles.leftPanel}>
          <label className={styles.label}>数据输入方式</label>
          <div className={styles.flexCol2}>
            <label>
              <input
                type="radio"
                name="dataInputType"
                value="db"
                checked={dataInputType === 'db'}
                onChange={handleDataInputTypeChange}
              /> 数据库数据
            </label>
            <label>
              <input
                type="radio"
                name="dataInputType"
                value="fileOrSeq"
                checked={dataInputType === 'fileOrSeq'}
                onChange={handleDataInputTypeChange}
              /> 上传文件
            </label>
          </div>

          {dataInputType === 'db' && (
            <input
              type="text"
              placeholder="请输入数据库表名或ID"
              value={dbData}
              onChange={handleDbDataChange}
              className={styles.input}
            />
          )}

          {dataInputType === 'fileOrSeq' && (
            <div style={{ border: 'none', background: 'none', boxShadow: 'none', padding: 0 }}>
              <textarea
                placeholder="请输入序列数据"
                value={sequenceData}
                onChange={handleSequenceDataChange}
                className={styles.textarea}
              />
              <input
                type="file"
                accept=".csv,.txt,.xlsx"
                onChange={handleFileChange}
                className={styles.input}
                style={{ marginTop: '12px' }}
              />
            </div>
          )}

          <label className={styles.label}>选择模板</label>
          <select value={selectedTemplate} onChange={handleTemplateChange} className={styles.select}>
            {Object.keys(scriptTemplates).map((key) => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>

          <label className={styles.label}>R 脚本</label>
          <textarea
            rows={10}
            value={rCode}
            readOnly
            className={styles.textarea}
          />

          <label className={styles.label}>参数 1（可选）</label>
          <input
            type="text"
            name="param1"
            value={parameters.param1}
            onChange={handleParameterChange}
            placeholder="如 10，可留空"
            className={styles.input}
          />
          <p className={styles.tip}>如不填写，将使用 R 脚本中的默认值</p>

          <label className={styles.label}>参数 2（可选）</label>
          <input
            type="text"
            name="param2"
            value={parameters.param2}
            onChange={handleParameterChange}
            placeholder="如 5，可留空"
            className={styles.input}
          />
          <p className={styles.tip}>如不填写，将使用 R 脚本中的默认值</p>

          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? "处理中..." : "提交"}
          </button>
        </form>

        <div className={styles.rightPanel}>
          <h2 className={styles.resultTitle}>结果</h2>
          {resultUrl ? (
            <img src={resultUrl} alt="R 图像结果" className={styles.resultImage} />
          ) : (
            <p className={styles.noResult}>暂无结果，请运行脚本。</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default RScriptExecutor;
