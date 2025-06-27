import React, { useMemo, useState } from 'react';
import './rcTreeCustom.css';

const CHAIN_COLORS = [
  '#43b884', '#ff9800', '#1976d2', '#e53935', '#8e24aa', '#00897b',
];

// 解析PDB链信息
function parseChainsFromPDB(pdbText) {
  const chains = {};
  const lines = pdbText.split('\n');
  lines.forEach(line => {
    if (line.startsWith('ATOM')) {
      const chainID = line[21];
      const resName = line.substr(17, 3).trim();
      const resSeq = parseInt(line.substr(22, 4));
      if (!chains[chainID]) {
        chains[chainID] = { residues: new Set(), resNames: {} };
      }
      chains[chainID].residues.add(resSeq);
      chains[chainID].resNames[resSeq] = resName;
    }
  });
  return chains;
}

// 统计氨基酸数
function countAminoAcids(resNames) {
  const aaSet = new Set([
    'ALA','ARG','ASN','ASP','CYS','GLN','GLU','GLY','HIS','ILE',
    'LEU','LYS','MET','PHE','PRO','SER','THR','TRP','TYR','VAL'
  ]);
  let count = 0;
  Object.values(resNames).forEach(name => {
    if (aaSet.has(name)) count++;
  });
  return count;
}

const StructureTree = ({ pdbText, fileName = '未选择文件', onChainClick }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [expandedChains, setExpandedChains] = useState({});
  const [visibleChains, setVisibleChains] = useState({});
  const [selectedChain, setSelectedChain] = useState(null);

  const chains = useMemo(() => pdbText ? parseChainsFromPDB(pdbText) : {}, [pdbText]);
  const chainIDs = Object.keys(chains);

  // 切换链展开
  const toggleChainExpand = (chainID) => {
    setExpandedChains(prev => ({ ...prev, [chainID]: !prev[chainID] }));
  };

  // 切换链可见
  const toggleChainVisible = (chainID) => {
    setVisibleChains(prev => ({ ...prev, [chainID]: !prev[chainID] }));
  };

  // 选中链
  const handleSelectChain = (chainID) => {
    setSelectedChain(chainID);
    if (onChainClick) onChainClick(chainID);
  };

  return (
    <div style={{ padding: 0 }}>
      {/* 文件名折叠区 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '8px 0 8px 8px',
          background: '#f8fbff',
          borderRadius: 10,
          marginBottom: 8,
          cursor: 'pointer',
          userSelect: 'none'
        }}
        onClick={() => setCollapsed(c => !c)}
      >
        <svg
          width="16"
          height="16"
          style={{
            marginRight: 4,
            transform: collapsed ? 'rotate(-90deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s'
          }}
          viewBox="0 0 20 20"
        >
          <polyline
            points="7,8 10,12 13,8"
            fill="none"
            stroke="#1976d2"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span style={{
          fontWeight: 700,
          fontSize: 16,
          color: '#222',
          wordBreak: 'break-all'
        }}>
          {fileName}
        </span>
      </div>

      {!collapsed && (
        <div>
          {chainIDs.length === 0 && (
            <div style={{ color: '#bbb', padding: '16px 0', textAlign: 'center' }}>暂无链信息</div>
          )}
          {chainIDs.map((chainID, idx) => {
            const info = chains[chainID];
            const color = CHAIN_COLORS[idx % CHAIN_COLORS.length];
            const resCount = info.residues.size;
            const aaCount = countAminoAcids(info.resNames);
            const expanded = expandedChains[chainID];
            const visible = visibleChains[chainID] !== false;
            const selected = selectedChain === chainID;
            return (
              <div key={chainID}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: selected ? '#e3f3ff' : '#fff',
                    borderRadius: 8,
                    marginBottom: 4,
                    boxShadow: '0 1px 4px #e0e7ef55',
                    padding: '0 8px 0 0',
                    minHeight: 36,
                    position: 'relative',
                    cursor: 'pointer',
                    border: selected ? `1.5px solid #1976d2` : '1.5px solid transparent'
                  }}
                  onMouseEnter={() => setSelectedChain(chainID)}
                >
                  {/* 展开/收起箭头 */}
                  <svg
                    width="16"
                    height="16"
                    style={{
                      marginLeft: 2,
                      marginRight: 2,
                      transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s'
                    }}
                    viewBox="0 0 20 20"
                    onClick={e => { e.stopPropagation(); toggleChainExpand(chainID); }}
                  >
                    <polyline
                      points="7,8 10,12 13,8"
                      fill="none"
                      stroke="#1976d2"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {/* 彩色竖条 */}
                  <div style={{
                    width: 4,
                    height: 28,
                    background: color,
                    borderRadius: 3,
                    marginRight: 10,
                    marginLeft: 2
                  }} />
                  {/* 链名（只在这里点击才触发onChainClick） */}
                  <span
                    style={{
                      fontWeight: 600,
                      color,
                      fontSize: 15,
                      marginRight: 8,
                      cursor: 'pointer'
                    }}
                    onClick={e => {
                      e.stopPropagation();
                      handleSelectChain(chainID);
                    }}
                  >
                    Chain {chainID}
                  </span>
                  {/* 残基数/AA数 */}
                  <span style={{
                    color: '#888',
                    fontSize: 13,
                    marginRight: 8
                  }}>
                    {resCount} res, {aaCount} AA
                  </span>
                  {/* 眼睛按钮 */}
                  <button
                    title={visible ? "隐藏" : "显示"}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: visible ? '#1976d2' : '#bbb',
                      marginLeft: 'auto',
                      marginRight: 6,
                      outline: 'none'
                    }}
                    onClick={e => { e.stopPropagation(); toggleChainVisible(chainID); }}
                  >
                    {visible ? (
                      <svg width="18" height="18" fill="none" viewBox="0 0 20 20">
                        <path d="M1 10s3-6 9-6 9 6 9 6-3 6-9 6-9-6-9-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    ) : (
                      <svg width="18" height="18" fill="none" viewBox="0 0 20 20">
                        <path d="M1 10s3-6 9-6 9 6 9 6-3 6-9 6-9-6-9-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4 4l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    )}
                  </button>
                </div>
                {/* 子项展开区（模仿图片结构） */}
                {expanded && (
                  <div style={{ marginLeft: 32, marginTop: 2, marginBottom: 4 }}>
                    {/* Polymer */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      background: '#fff',
                      borderRadius: 6,
                      padding: '0 8px',
                      fontSize: 14,
                      marginBottom: 2,
                      minHeight: 32,
                      boxShadow: '0 1px 2px #e0e7ef22'
                    }}>
                      <svg width="16" height="16" style={{marginRight: 4}} fill="none" viewBox="0 0 20 20">
                        <rect x="3" y="7" width="14" height="6" rx="2" fill="#1976d2"/>
                      </svg>
                      <span style={{fontWeight:500, color:'#1976d2', marginRight:6}}>Polymer</span>
                      <span style={{color:'#888'}}>2046 elements</span>
                      <span style={{marginLeft:'auto', display:'flex', gap:6}}>
                        <button style={btnStyle}><svg width="18" height="18" fill="none" viewBox="0 0 20 20"><path d="M1 10s3-6 9-6 9 6 9 6-3 6-9 6-9-6-9-6z" stroke="currentColor" strokeWidth="2"/></svg></button>
                        <button style={btnStyle}><svg width="18" height="18" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2"/><path d="M6 10h8" stroke="currentColor" strokeWidth="2"/></svg></button>
                        <button style={btnStyle}><svg width="18" height="18" fill="none" viewBox="0 0 20 20"><rect x="5" y="5" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="2"/></svg></button>
                      </span>
                    </div>
                    {/* Cartoon */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      background: '#fff',
                      borderRadius: 6,
                      padding: '0 8px',
                      fontSize: 14,
                      marginBottom: 2,
                      minHeight: 32,
                      boxShadow: '0 1px 2px #e0e7ef22'
                    }}>
                      <svg width="16" height="16" style={{marginRight: 4}} fill="none" viewBox="0 0 20 20">
                        <path d="M10 2a8 8 0 100 16 8 8 0 000-16z" fill="#e3f2fd"/>
                        <path d="M10 4v8l6 3.6" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span style={{fontWeight:500, color:'#1976d2', marginRight:6}}>Cartoon</span>
                      <span style={{color:'#888'}}>2046 elements</span>
                      <span style={{marginLeft:'auto', display:'flex', gap:6}}>
                        <button style={btnStyle}><svg width="18" height="18" fill="none" viewBox="0 0 20 20"><path d="M1 10s3-6 9-6 9 6 9 6-3 6-9 6-9-6-9-6z" stroke="currentColor" strokeWidth="2"/></svg></button>
                        <button style={btnStyle}><svg width="18" height="18" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2"/><path d="M6 10h8" stroke="currentColor" strokeWidth="2"/></svg></button>
                        <button style={btnStyle}><svg width="18" height="18" fill="none" viewBox="0 0 20 20"><rect x="5" y="5" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="2"/></svg></button>
                      </span>
                    </div>
                    {/* Surface */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      background: '#fff',
                      borderRadius: 6,
                      padding: '0 8px',
                      fontSize: 14,
                      marginBottom: 2,
                      minHeight: 32,
                      boxShadow: '0 1px 2px #e0e7ef22'
                    }}>
                      <svg width="16" height="16" style={{marginRight: 4}} fill="none" viewBox="0 0 20 20">
                        <path d="M10 2a8 8 0 100 16 8 8 0 000-16z" fill="#e3f2fd"/>
                        <path d="M10 4v8l6 3.6" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span style={{fontWeight:500, color:'#1976d2', marginRight:6}}>Surface</span>
                      <span style={{color:'#888'}}>2046 elements</span>
                      <span style={{marginLeft:'auto', display:'flex', gap:6}}>
                        <button style={btnStyle}><svg width="18" height="18" fill="none" viewBox="0 0 20 20"><path d="M1 10s3-6 9-6 9 6 9 6-3 6-9 6-9-6-9-6z" stroke="currentColor" strokeWidth="2"/></svg></button>
                        <button style={btnStyle}><svg width="18" height="18" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2"/><path d="M6 10h8" stroke="currentColor" strokeWidth="2"/></svg></button>
                        <button style={btnStyle}><svg width="18" height="18" fill="none" viewBox="0 0 20 20"><rect x="5" y="5" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="2"/></svg></button>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const btnStyle = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: '#1976d2'
};

export default StructureTree;
