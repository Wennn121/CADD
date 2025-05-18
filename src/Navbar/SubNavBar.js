import React, { memo } from 'react';

const SubSubNavBar = memo(() => {
  return (
    <div>
      {/* SubSubNavBar 内容 */}
    </div>
  );
});

function SubNavBar({ subItems, isVisible, onMouseEnter, onMouseLeave }) {
  if (!isVisible) return null; // 如果不可见，返回 null

  return (
    <div
      style={{
        position: 'absolute',
        top: '100%', // 子菜单显示在主菜单下方
        left: '50%', // 子菜单容器的左边缘在主菜单项的中间
        transform: 'translateX(-50%)', // 将子菜单容器水平居中
        backgroundColor: 'rgba(151, 48, 48, 0.9)',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
        textAlign: 'center', // 子菜单项文字居中
      }}
      onMouseEnter={onMouseEnter} // 鼠标进入保持显示
      onMouseLeave={onMouseLeave} // 鼠标离开隐藏
    >
      {subItems.map((subItem, index) => (
        <div
          key={index}
          style={{
            color: 'white',
            padding: '5px 10px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(200, 50, 50, 0.8)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
          }}
          onClick={() => console.log(`Clicked on ${subItem}`)} // 点击子菜单的处理逻辑
        >
          {subItem}
          {/* 启用每个二级菜单项的三级菜单 */}
          <SubSubNavBar />
        </div>
      ))}
    </div>
  );
}

export default SubNavBar;
