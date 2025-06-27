import React, { useEffect, useRef, useState } from 'react';
import styles from './PDBViewer.module.css';
import StructureTree from './StructureTree';
import SequenceView from './SequenceView';

function extractSequenceFromPDB(pdbText) {
  if (!pdbText) return '';
  const lines = pdbText.split('\n');
  const residues = [];
  let lastResSeq = null, lastChain = null;
  lines.forEach(line => {
    if (line.startsWith('ATOM')) {
      const chainID = line[21];
      const resName = line.substr(17, 3).trim();
      const resSeq = parseInt(line.substr(22, 4));
      if (resSeq !== lastResSeq || chainID !== lastChain) {
        residues.push(resName);
        lastResSeq = resSeq;
        lastChain = chainID;
      }
    }
  });

  const aaMap = {
    ALA:'A', ARG:'R', ASN:'N', ASP:'D', CYS:'C', GLN:'Q', GLU:'E', GLY:'G', HIS:'H', ILE:'I',
    LEU:'L', LYS:'K', MET:'M', PHE:'F', PRO:'P', SER:'S', THR:'T', TRP:'W', TYR:'Y', VAL:'V'
  };
  return residues.map(res => aaMap[res] || 'X').join('');
}

const PDBViewer = ({ pdbUrl, pdbData }) => {
  const viewerRef = useRef(null);
  const viewerObj = useRef(null);
  const [localPdbData, setLocalPdbData] = useState(null);
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'tree'
  const [fileName, setFileName] = useState('');

  // 工具栏按钮
  const toolTabs = [
    { key: 'upload', icon: <svg width="20" height="20"><rect x="4" y="4" width="12" height="12" rx="2" fill="#1976d2"/></svg>, label: '上传' },
    { key: 'tree', icon: <svg width="20" height="20"><rect x="3" y="9" width="14" height="2" rx="1" fill="#1976d2"/><rect x="7" y="5" width="2" height="10" rx="1" fill="#1976d2"/></svg>, label: '结构树' },
  ];

  // 上传文件处理
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith('.pdb')) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        setLocalPdbData(evt.target.result);
        setActiveTab('tree'); // 上传后自动切换到结构树
      };
      reader.readAsText(file);
      setFileName(file.name);
    } else {
      alert('Please upload a .pdb file.');
    }
  };

  useEffect(() => {
    if (!window.$3Dmol) return;
    if (localPdbData || pdbUrl) {
      const element = viewerRef.current;
      element.innerHTML = '';
      const config = { backgroundColor: 'white' };
      const viewer = window.$3Dmol.createViewer(element, config);

      if (localPdbData) {
        viewer.addModel(localPdbData, 'pdb');
        viewer.setStyle({}, { cartoon: { color: 'spectrum' } });
        viewer.zoomTo();
        viewer.render();
      } else if (pdbUrl) {
        window.$3Dmol.download(pdbUrl, viewer, {}, function() {
          viewer.setStyle({}, { cartoon: { color: 'spectrum' } });
          viewer.zoomTo();
          viewer.render();
        });
      }
      viewerObj.current = viewer;

      setTimeout(() => {
        viewer.resize();
      }, 0);
    }
  }, [pdbUrl, localPdbData]);

  // 工具栏点击
  const handleToolTabClick = (key) => {
    if (key === 'tree' && !localPdbData) return; // 没有数据不能切到结构树
    setActiveTab(key);
  };

  // 3D结构区工具栏
  const handleZoomIn = () => viewerObj.current && viewerObj.current.zoom(1.2);
  const handleZoomOut = () => viewerObj.current && viewerObj.current.zoom(0.8);
  const handleReset = () => viewerObj.current && viewerObj.current.zoomTo();
  const handleScreenshot = () => {
    if (viewerObj.current) {
      const img = viewerObj.current.pngURI();
      const link = document.createElement('a');
      link.href = img;
      link.download = 'structure.png';
      link.click();
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#f6f9fc', paddingTop: 64 }}>
      {/* 左侧竖直工具栏 */}
      <div style={{ width: 48, background: '#fff', borderRight: '1.5px solid #e0e7ef', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 8 }}>
        {toolTabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => handleToolTabClick(tab.key)}
            style={{
              width: 40, height: 40, margin: '6px 0', border: 'none', background: activeTab === tab.key ? '#e3f3ff' : 'none',
              borderRadius: 8, cursor: (tab.key === 'tree' && !localPdbData) ? 'not-allowed' : 'pointer'
            }}
            disabled={tab.key === 'tree' && !localPdbData}
            title={tab.label}
          >
            {tab.icon}
          </button>
        ))}
      </div>
      {/* 左侧控制栏内容 */}
      <div style={{ width: 270, background: '#f8fbff', borderRight: '1.5px solid #e0e7ef', display: 'flex', flexDirection: 'column' }}>
        {/* Tab 内容 */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 12 }}>
          {activeTab === 'upload' && (
            <div>
              <input
                type="file"
                accept=".pdb"
                onChange={handleFileChange}
                style={{ marginBottom: 12 }}
              />
              <div style={{ fontWeight: 700, fontSize: 16, color: '#222', wordBreak: 'break-all' }}>
                {fileName || '未选择文件'}
              </div>
            </div>
          )}
          {activeTab === 'tree' && (
            <StructureTree
  pdbText={localPdbData}
  fileName={fileName}
  onChainClick={chainID => {
    // 这里 viewerObj.current 是 3Dmol 的 viewer 实例
    if (viewerObj.current) {
      viewerObj.current.setStyle({}, { cartoon: { color: 'grey' } }); 
      viewerObj.current.setStyle({ chain: chainID }, { cartoon: { color: 'red' } }); // 高亮选中链
      viewerObj.current.zoomTo({ chain: chainID });
      viewerObj.current.render();
    }
  }}
          />
          )}
        </div>
      </div>
      {/* 右侧主内容区 */}
      <div className={styles.mainPanel}>
        <div className={styles.sequencePanel}>
          <SequenceView sequence={localPdbData ? extractSequenceFromPDB(localPdbData) : ''} />
        </div>
        <div className={styles.structurePanel}>
          <div className={styles.card}>
            <div className={styles.toolbar}>
              <span className={styles.title}>Structure</span>
              <button className={styles.iconBtn} title="Zoom In" onClick={handleZoomIn}>
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="9" cy="9" r="7" stroke="#1976d2" strokeWidth="2"/><path d="M9 6v6M6 9h6" stroke="#1976d2" strokeWidth="2" strokeLinecap="round"/><path d="M15 15l3 3" stroke="#1976d2" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
              <button className={styles.iconBtn} title="Zoom Out" onClick={handleZoomOut}>
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="9" cy="9" r="7" stroke="#1976d2" strokeWidth="2"/><path d="M6 9h6" stroke="#1976d2" strokeWidth="2" strokeLinecap="round"/><path d="M15 15l3 3" stroke="#1976d2" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
              <button className={styles.iconBtn} title="Reset View" onClick={handleReset}>
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M3 10a7 7 0 1 1 2.05 4.95" stroke="#1976d2" strokeWidth="2" strokeLinecap="round"/><path d="M3 14v-4h4" stroke="#1976d2" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
              <button className={styles.iconBtn} title="Screenshot" onClick={handleScreenshot}>
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect x="3" y="5" width="14" height="10" rx="2" stroke="#1976d2" strokeWidth="2"/><circle cx="10" cy="10" r="2" stroke="#1976d2" strokeWidth="2"/></svg>
              </button>
            </div>
            <div className={styles.viewerContainer} ref={viewerRef} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDBViewer;