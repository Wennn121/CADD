import React, { memo, useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext, useAuth } from '../contrl/AuthContext'; // AuthContext 提供登录状态

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
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth(); // 使用 useAuth 获取登录状态

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

  // 处理菜单点击
  const handleMenuClick = (subItem, event) => {
    event.stopPropagation(); // 阻止事件冒泡
    console.log('Menu item clicked:', subItem); // 调试信息

    // 检查用户是否登录
    if (!isLoggedIn) {
      console.log('用户未登录，跳转到登录页面');
      navigate('/login'); // 跳转到登录页面
      return; // 结束函数，防止继续执行跳转操作
    }

    if (subItem.link) {
      if (subItem.link.startsWith('http')) {
        // 外部链接
        console.log('跳转到外部链接:', subItem.link);
        window.location.href = subItem.link;
      } else {
        // 内部链接
        console.log('跳转到内部链接:', subItem.link);
        navigate(subItem.link);
      }
    } else {
      console.log('没有有效的链接');
    }
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
              <div
                key={subItem.name}
                style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}
                onClick={(event) => handleMenuClick(subItem, event)} // 调用 handleMenuClick
              >
                {subItem.name}
              </div>
            )}
            {/* 子菜单，递归渲染 */}
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
