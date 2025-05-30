import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 新增
import logo from './图片1.svg'; // 确保路径正确
import SubNavBar from './SubNavBar'; // 引入子菜单组件

// 主导航栏
function Navbar() {
  const [activeMenu, setActiveMenu] = useState(null); // 当前激活的菜单
  const navigate = useNavigate(); // 新增

  const navItems = [
    { 
      name: '抗体一维序列分析', 
      subItems: [
        '多序列比对', 
        { name: '蛋白信息分析', link: 'https://www.expasy.org/resources/uniprot-blast' },
        { name: '核酸-蛋白质', link: 'https://www.expasy.org/resources/translate' },
        { name: '蛋白质-核酸', link: 'https://www.bioinformatics.org/sms2/rev_trans.html' },
        { name: '可变区分析', link: 'https://wwwv.imgt.org/IMGT_vguest/input' },
        { name: '人源化', link: 'http://www.abysis.org/abysis/sequence_input/key_annotation/key_annotation.cgi' }, // 为CDR区划分添加外部链接
        { name: '理化性质', link: 'https://web.expasy.org/cgi-bin/protparam/protparam' },
        { name: '可变区分析', link: 'https://wwwv.imgt.org/IMGT_vguest/input' },
         { name: 'CDR区划分', link: 'https://www.imgt.org/3Dstructure-DB/cgi/DomainGapAlign.cgi' },
        
      ] 
    },
    { name: '抗体二维序列分析', subItems: [{ name: 'IMGT标注', link: 'https://www.imgt.org/3Dstructure-DB/cgi/Collier-de-Perles.cgi' }, ] },
    { name: '抗体三维序列分析', subItems: [{ name: 'Swiss-Model', link: 'https://swissmodel.expasy.org/interactive' },
                                          { name: 'AlphaFold3', link: 'https://alphafoldserver.com/' },
    ] },
    { name: '抗体结合分析', subItems: [{ name: '结合表位分析', link: 'http://tools.iedb.org/main/bcell/' },
      { name: 'AlphaFold3', link: 'https://alphafoldserver.com/' },] },
  ];

  return (
    <>
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        width: '100%', 
        zIndex: 1000, 
        backgroundColor: 'rgba(27, 63, 161, 0.78)', 
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
            onClick={() => navigate('/')} // 修改为跳转首页
          />
          <h1
            style={{ color: 'white', fontSize: '20px', margin: 0, cursor: 'pointer' }} // 添加鼠标指针样式
            onClick={() => navigate('/')} // 修改为跳转首页
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
