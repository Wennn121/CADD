import React, { useState } from 'react';
import logo from './图片1.svg'; // 确保路径正确
import SubNavBar from './SubNavBar'; // 引入子菜单组件

// 主导航栏
function Navbar() {
  const [activeMenu, setActiveMenu] = useState(null); // 当前激活的菜单

  const navItems = [
    { name: '抗体一维序列分析', subItems: ['子栏目1', '子栏目2'] },
    { name: '抗体二维序列分析', subItems: ['子栏目3', '子栏目4'] },
    { name: '抗体三维序列分析', subItems: ['子栏目5', '子栏目6'] },
    { name: '抗体结合分析', subItems: ['子栏目7', '子栏目8'] },
  ];

  return (
    <>
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        width: '100%', 
        zIndex: 1000, 
        backgroundColor: 'rgba(151, 48, 48, 0.78)', 
        height: '60px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'flex-start', // 内容靠左对齐
        boxSizing: 'border-box', 
        padding: '0 20px',
        borderRadius: '0 0 10px 10px', // 上方直角，下方圆角
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
          <img
            src={logo}
            alt="logo"
            style={{ width: '40px', marginRight: '10px', cursor: 'pointer' }} // 添加鼠标指针样式
            onClick={() => window.location.reload()} // 点击图标刷新页面
          />
          <h1
            style={{ color: 'white', fontSize: '20px', margin: 0, cursor: 'pointer' }} // 添加鼠标指针样式
            onClick={() => window.location.reload()} // 点击标题刷新页面
          >
            CADD抗体分析平台
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '20px', position: 'relative' }}>
          {navItems.map((item) => (
            <div
              key={item.name}
              style={{
                color: 'white',
                cursor: 'pointer',
                padding: '10px',
                transition: 'background-color 0.3s, font-weight 0.3s, border-radius 0.3s',
                position: 'relative', // 为子菜单定位
              }}
              onMouseEnter={() => setActiveMenu(item.name)} // 鼠标进入显示子菜单
              onMouseLeave={() => setActiveMenu(null)} // 鼠标离开隐藏子菜单
            >
              {item.name}
              <SubNavBar
                subItems={item.subItems}
                isVisible={activeMenu === item.name}
                onMouseEnter={() => setActiveMenu(item.name)} // 鼠标进入保持显示
                onMouseLeave={() => setActiveMenu(null)} // 鼠标离开隐藏
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Navbar;
