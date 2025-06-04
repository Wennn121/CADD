import React, { memo, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // 新增

const SubSubNavBar = memo(() => {
  return (
    <div>
      {/* SubSubNavBar 内容 */}
    </div>
  );
});

function SubNavBar({ subItems, isVisible, onMouseEnter, onMouseLeave, style }) {
  const [hoverIndex, setHoverIndex] = useState(null);
  const timerRef = useRef();

  if (!isVisible) return null;

  // 延迟关闭
  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      if (onMouseLeave) onMouseLeave();
      setHoverIndex(null);
    }, 1000); // 200ms延迟
  };

  // 鼠标移入时清除延迟
  const handleMouseEnter = () => {
    clearTimeout(timerRef.current);
    if (onMouseEnter) onMouseEnter();
  };

  return (
    <div
      style={{
        position: 'relative', // 只负责relative
      }}
    >
      <div
        style={{
          display: isVisible ? 'block' : 'none',
          position: 'absolute',
          top: style?.top || '100%',
          left: style?.left || '0',
          backgroundColor: '#3b5bdb',
          borderRadius: '10px',
          padding: '10px 0',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          minWidth: '120px',
          textAlign: 'center',
          zIndex: 1001,
          ...style, // 只在内容层合并style
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
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
              position: 'relative',
            }}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
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
            {/* 如果有子菜单，递归渲染 */}
            {subItem.subItems && (
              <SubNavBar
                subItems={subItem.subItems}
                isVisible={hoverIndex === index}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
                style={{
                  top: '-20px',
                  left: '110%', // 让三级菜单右移
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubNavBar;
