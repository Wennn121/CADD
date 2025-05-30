import React, { useState } from 'react'; // 移除 useEffect
import { useNavigate } from 'react-router-dom';
import styles from './MultiSequenceAlignment.module.css';

function MultiSequenceAlignment() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [sequence, setSequence] = useState('');
  
  // Pairwise Alignment Parameters
  const [kTupleSize, setKTupleSize] = useState(1);
  const [windowSize, setWindowSize] = useState(5);
  const [gapPenalty, setGapPenalty] = useState(3);
  const [numberOfTopDiagonals, setNumberOfTopDiagonals] = useState(5);
  const [scoringMethod, setScoringMethod] = useState('PERCENT');

  // Multiple Alignment Parameters
  const [gapOpenPenalty, setGapOpenPenalty] = useState(10.0);
  const [gapExtensionPenalty, setGapExtensionPenalty] = useState(0.1);
  const [matrix, setMatrix] = useState('BLOSUM');
  const [weightTransition, setWeightTransition] = useState(false);
  const [hydrophilicGaps, setHydrophilicGaps] = useState(true);
  const [additionalOptions, setAdditionalOptions] = useState('');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSequenceChange = (event) => {
    setSequence(event.target.value);
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
        formData.append('file', file);
      } else {
        formData.append('sequence', sequence);
      }

      // Pairwise Alignment Parameters
      formData.append('k_tuple_size', kTupleSize);
      formData.append('window_size', windowSize);
      formData.append('gap_penalty', gapPenalty);
      formData.append('number_of_top_diagonals', numberOfTopDiagonals);
      formData.append('scoring_method', scoringMethod);

      // Multiple Alignment Parameters
      formData.append('gap_open_penalty', gapOpenPenalty);
      formData.append('gap_extension_penalty', gapExtensionPenalty);
      formData.append('matrix', matrix);
      formData.append('weight_transition', weightTransition);
      formData.append('hydrophilic_gaps', hydrophilicGaps);
      formData.append('additional_options', additionalOptions);

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
            .split('\n')
            .map(line => line.trim())
            .join('\n');
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
      <h2 className={styles.title}>Multi-Sequence Alignment</h2>

      {/* 跳转到帮助页面的按钮 */}
      <button
        className={styles.helpButton}
        onClick={() => navigate('/help')}
      >
        View Help
      </button>

      <div className={styles.inputSection}>
        <textarea
          className={styles.textarea}
          placeholder="Enter sequence here (FASTA format)"
          value={sequence}
          onChange={handleSequenceChange}
        />
        <input
          type="file"
          className={styles.fileInput}
          accept=".fasta,.txt"
          onChange={handleFileChange}
        />
      </div>

      {/* Pairwise Alignment Parameters */}
      <div className={styles.settingsSection}>
        <h3 className={styles.sectionTitle}>Pairwise Alignment Parameters</h3>

        {/* For FAST/APPROXIMATE */}
        <h4 className={styles.subSectionTitle}>For FAST/APPROXIMATE:</h4>
        <div className={styles.penaltySettings}>
          <div className={styles.penaltySetting}>
            <label>K-tuple Size:</label>
            <input
              type="number"
              value={kTupleSize}
              onChange={(e) => setKTupleSize(e.target.value)}
            />
          </div>
          <div className={styles.penaltySetting}>
            <label>Window Size:</label>
            <input
              type="number"
              value={windowSize}
              onChange={(e) => setWindowSize(e.target.value)}
            />
          </div>
          <div className={styles.penaltySetting}>
            <label>Gap Penalty:</label>
            <input
              type="number"
              value={gapPenalty}
              onChange={(e) => setGapPenalty(e.target.value)}
            />
          </div>
          <div className={styles.penaltySetting}>
            <label>Number of Top Diagonals:</label>
            <input
              type="number"
              value={numberOfTopDiagonals}
              onChange={(e) => setNumberOfTopDiagonals(e.target.value)}
            />
          </div>
          <div className={styles.penaltySetting}>
            <label>Scoring Method:</label>
            <select value={scoringMethod} onChange={(e) => setScoringMethod(e.target.value)}>
              <option value="PERCENT">PERCENT</option>
              <option value="SCORE">SCORE</option>
            </select>
          </div>
        </div>

        {/* For SLOW/ACCURATE */}
        <h4 className={styles.subSectionTitle}>For SLOW/ACCURATE:</h4>
        <div className={styles.penaltySettings}>
          <div className={styles.penaltySetting}>
            <label>Gap Open Penalty:</label>
            <input
              type="number"
              value={gapOpenPenalty}
              onChange={(e) => setGapOpenPenalty(e.target.value)}
              step="0.1"
            />
          </div>
          <div className={styles.penaltySetting}>
            <label>Gap Extension Penalty:</label>
            <input
              type="number"
              value={gapExtensionPenalty}
              onChange={(e) => setGapExtensionPenalty(e.target.value)}
              step="0.01"
            />
          </div>
          <div className={styles.penaltySetting}>
            <label>Weight Matrix:</label>
            <select value={matrix} onChange={(e) => setMatrix(e.target.value)}>
              <option value="BLOSUM">BLOSUM (for PROTEIN)</option>
              <option value="PAM">PAM (for PROTEIN)</option>
              <option value="GONNET">GONNET (for PROTEIN)</option>
              <option value="ID">ID (for PROTEIN)</option>
              <option value="IUB">IUB (for DNA)</option>
              <option value="CLUSTALW">CLUSTALW (for DNA)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Multiple Alignment Parameters */}
      <div className={styles.settingsSection}>
        <h3 className={styles.sectionTitle}>Multiple Alignment Parameters</h3>
        <div className={styles.penaltySettings}>
          <div className={styles.penaltySetting}>
            <label>Gap Open Penalty:</label>
            <input
              type="number"
              value={gapOpenPenalty}
              onChange={(e) => setGapOpenPenalty(e.target.value)}
            />
          </div>
          <div className={styles.penaltySetting}>
            <label>Gap Extension Penalty:</label>
            <input
              type="number"
              value={gapExtensionPenalty}
              onChange={(e) => setGapExtensionPenalty(e.target.value)}
            />
          </div>
          <div className={styles.penaltySetting}>
            <label>Weight Transition:</label>
            <input
              type="radio"
              name="weightTransition"
              checked={weightTransition}
              onChange={() => setWeightTransition(true)}
            />
            YES
            <input
              type="radio"
              name="weightTransition"
              checked={!weightTransition}
              onChange={() => setWeightTransition(false)}
            />
            NO
          </div>
          <div className={styles.penaltySetting}>
            <label>Hydrophilic Residues for Proteins:</label>
            <input
              type="text"
              value={additionalOptions}
              onChange={(e) => setAdditionalOptions(e.target.value)}
              placeholder="GPSNDQERK"
            />
          </div>
          <div className={styles.penaltySetting}>
            <label>Hydrophilic Gaps:</label>
            <input
              type="radio"
              name="hydrophilicGaps"
              checked={hydrophilicGaps}
              onChange={() => setHydrophilicGaps(true)}
            />
            YES
            <input
              type="radio"
              name="hydrophilicGaps"
              checked={!hydrophilicGaps}
              onChange={() => setHydrophilicGaps(false)}
            />
            NO
          </div>
          <div className={styles.penaltySetting}>
  <label>Weight Matrix:</label>
  <select value={matrix} onChange={(e) => setMatrix(e.target.value)}>
    <option value="BLOSUM">BLOSUM (for PROTEIN)</option>
    <option value="PAM">PAM (for PROTEIN)</option>
    <option value="GONNET">GONNET (for PROTEIN)</option>
    <option value="ID">ID (for PROTEIN)</option>
    <option value="IUB">IUB (for DNA)</option>
    <option value="CLUSTALW">CLUSTALW (for DNA)</option>
  </select>
</div>
        </div>
      </div>

      <button
        className={styles.button}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Submit'}
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
