import React, { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 新增

const SubSubNavBar = memo(() => {
  return (
    <div>
      {/* SubSubNavBar 内容 */}
    </div>
  );
});

function SubNavBar({ subItems, isVisible, onMouseEnter, onMouseLeave }) {
  const [hoverIndex, setHoverIndex] = useState(null);
  const navigate = useNavigate(); // 新增

  if (!isVisible) return null;

  // 点击处理
  const handleClick = (subItem) => {
    if (subItem === '能量分数评分') {
      navigate('/energy-score'); // 跳转到能量分数评分页面
    } else if (subItem === '多序列比对') {
      navigate('/multi-sequence-alignment'); // 跳转到多序列比对页面
    }
  };

  return (
    <div
      style={{
        display: isVisible ? 'block' : 'none',
        position: 'absolute',
        top: '100%',
        left: 0,
        backgroundColor: '#3b5bdb',
        borderRadius: '10px',
        padding: '10px 0',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        minWidth: '120px',
        textAlign: 'center',
        zIndex: 1001,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {subItems.map((subItem, index) => (
        <div
          key={index}
          style={{
            color: 'white',
            padding: '8px 16px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            fontSize: '16px',
            transition: 'background 0.2s',
            background: hoverIndex === index ? '#1a237e' : 'transparent',
            borderRadius: '6px',
            fontWeight: hoverIndex === index ? 'bold' : 'normal',
            boxShadow: hoverIndex === index ? '0 2px 8px rgba(0,0,0,0.12)' : 'none',
          }}
          onMouseEnter={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(null)}
          onClick={() => handleClick(subItem)} // 新增
        >
          {typeof subItem === 'string' ? subItem : (
            <a
              key={subItem.name}
              href={subItem.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              {subItem.name}
            </a>
          )}
          <SubSubNavBar />
        </div>
      ))}
    </div>
  );
}

export default SubNavBar;
