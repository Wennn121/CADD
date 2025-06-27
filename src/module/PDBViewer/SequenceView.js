import React from 'react';

const SequenceView = ({ sequence }) => (
  <div style={{
    display: 'flex',
    alignItems: 'flex-start', 
    minHeight: 30,
    padding: '2px 0 8px 0'    
  }}>
    <span style={{
      fontWeight: 600,
      color: '#1976d2',
      marginRight: 15,
      fontSize: 15,
      marginTop: 2        
    }}>Sequence</span>
    {sequence
      ? <span style={{
          color: '#222',
          fontFamily: 'Consolas, monospace',
          wordBreak: 'break-all',
          marginTop: 2       
        }}>{sequence}</span>
      : <span style={{ color: '#bbb', fontStyle: 'italic', marginTop: 2 }}>暂无序列</span>}
  </div>
);

export default SequenceView;
