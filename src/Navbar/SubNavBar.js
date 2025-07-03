import React, { memo, useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext, useAuth } from '../contrl/AuthContext'; // AuthContext 提供登录状态
import styles from './Navbar.module.css';

const SubSubNavBar = memo(() => {
  return (
    <div>
      {/* SubSubNavBar 内容 */}
    </div>
  );
});

function SubNavBar({ subItems, isVisible, style }) {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth(); // 使用 useAuth 获取登录状态

  if (!isVisible) return null;

  // 处理菜单点击
  const handleMenuClick = (subItem, index, event) => {
    event.stopPropagation(); // 阻止事件冒泡
    // 有子菜单则展开/收起
    if (subItem.subItems) {
      setOpenIndex(openIndex === index ? null : index);
      return;
    }
    // 跳转逻辑
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
        position: 'absolute',
        top: style?.top || '100%',
        left: style?.left || '0',
        backgroundColor: '#3b5bdb',
        borderRadius: '10px',
        padding: '10px 0',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        minWidth: '180px',
        textAlign: 'center',
        zIndex: 1001,
        ...style,
      }}
    >
      {subItems.map((subItem, index) => (
        <div
          key={subItem.name || index}
          className={styles.subNavBarItem}
          style={{
            color: 'white',
            padding: '8px 16px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            fontSize: '16px',
            transition: 'background 0.2s',
            background: openIndex === index ? '#1a237e' : 'transparent',
            borderRadius: '6px',
            fontWeight: openIndex === index ? 'bold' : 'normal',
            position: 'relative',
            userSelect: 'none'
          }}
          onClick={e => handleMenuClick(subItem, index, e)}
        >
          {subItem.name}
          {/* 子菜单递归渲染 */}
          {subItem.subItems && openIndex === index && (
            <SubNavBar
              subItems={subItem.subItems}
              isVisible={true}
              style={{
                top: 0,
                left: '100%',
                minWidth: '180px'
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default SubNavBar;
