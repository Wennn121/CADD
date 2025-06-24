import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contrl/AuthContext';
import SubNavBar from './SubNavBar';
import logo from './图片1.svg';
import userAvatar from './user-avatar.svg'; // 用户头像图片路径

function Navbar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isUserMenuVisible, setIsUserMenuVisible] = useState(false); // 控制用户菜单显示
  const navigate = useNavigate();
  const { isLoggedIn, logout, user, setUser } = useAuth(); // 获取登录状态、登出方法和用户信息
  const timerRef = useRef();

  const navItems = [
    { 
      name: '基础信息分析', 
      subItems: [
        { 
          name: '抗体可变区', 
          subItems: [
            { name: '序列信息',
              subItems: [
               { name: '种属', },      
                { name: '类别', },            
                { name: '域', },               
                { name: 'Cys分布', },
                { name: 'MW/PI/其他',  },
                { name: '鼠源抗体',  },
                { name: '人源抗体',  },
              ]
              },
            
              { name: '结构信息',    
              subItems: [
               { name: '二级结构', },      
                { name: '三级结构', },            
                { name: '空间构象特点', },               
                { name: '分子原子间作用', },
                { name: '能量计算',  },
                { name: '拓扑结构',  },
              ]},
            
          ]
        },
        
        { 
          name: '抗体恒定区', 
           subItems: [
            { name: '序列信息',
              subItems: [
               { name: '种属', },      
                { name: '类别', },            
                { name: '域', },               

                { name: ' IgG亚类',
                 subItems: [ { name: 'IgG、M、A、D、E', },      
                { name: 'IgK、λ', },  ]},
                { name: 'IgG重链恒定区',  },
                { name: 'IgG轻链恒定区',  },
                            ]
              },
            { name: '结构信息',    
              subItems: [
                { name: '类别构象', },      
                { name: 'IG亚类', },            
                { name: 'IG-FCrR作用', },               
                { name: 'ADQ', },
                { name: 'CDC',  },
                  { name: '半衰期',  },
              ]},
          ]
        }
      ]
    },
  
    { name: '蛋白质资源分析软件', 
    subItems: [
    { name: '基本数据库',  
      subItems: [{ name: 'SwissProt',  },
        { name: 'Protein Family',  },
        { name: 'Dail',  },
        { name: 'Domain/Motif',  },] },

    { name: '基本分析软件', 
     subItems: [
      { name: '胞内',  },
      { name: '跨膜',  },
      { name: '胞外',  }, 
      { name: '胞内',  },
      { name: '信号肽预测',  },]},] },

   
      { 
      name: 'CADD抗体优化', 
      subItems: [
        { 
          name: '抗体可变区优化', 
          subItems: [
            { name: '抗体人源化',
              subItems: [
            { name: 'CDR移植', },      
            { name: 'SDR移植', },            
            { name: 'FR移植', },               
            { name: '表面重塑', },
            { name: '人源化程度计算', },]
             },
                                 ]
        },
        { 
          name: '抗体恒定区定向优化', 
           subItems: [
            { name: 'ADCC提升/降低', },
            { name: 'CDC提升/降低', },  
            {name: 'CDC提升/降低',  }  ,  
            {name: 'ADCD提升/降低',   }  ,  
            {name: '体内半衰期延长',   }  ,
            {name: '杵臼结构',   }  ,
          ]
        },
          { 
          name: '抗体亲和力成熟', 
           subItems: [
            { name: '抗原-抗体相互作用位置识别', },
            { name: '抗体优化', }, 
            {name: 'CDC提升/降低', } ,  
            {name: 'ADCD提升/降低',  } ,  
            {name: '体内半衰期延长', } ,
            {name: '杵臼结构',   } ,
          ]
        },
       
        { 
          name: '抗体成药性优化', 
           subItems: [
            { name: '稳定性改造', },
            { name: '修饰位点分析', },  
            {name: '表达量优化',  } ,  
             ]
        },

        { name: '靶向虚拟抗体库设计及高内涵虚拟筛选', 
          subItems: [{ name: '抗体可变区结构评估',  },
          { name: '抗体关键位点参与识别抗原表位模式分析',  },
          { name: '虚拟抗体库设计',  },
          { name: '高内涵虚拟筛选',  },] },
          
      ]
    },
    
  
   { name: '抗体数据库', 
    subItems: [{ name: 'OAS数据库',  },
      { name: 'uniprot数据库',  }] },
   { name: '网址链接', 
    subItems: [
      {name: '多序列比对',link: '/multi-sequence-alignment'}, 
      {name:'能量分数评分',link:'/energy-score' },
      { name: '蛋白信息分析', link: 'https://www.expasy.org/resources/uniprot-blast' }, 
      { name: '核酸-蛋白质', link: 'https://www.expasy.org/resources/translate' }, 
      { name: '蛋白质-核酸', link: 'https://www.bioinformatics.org/sms2/rev_trans.html' },
      { name: '人源化', link: 'http://www.abysis.org/abysis/sequence_input/key_annotation/key_annotation.cgi' },
      { name: '理化性质', link: 'https://web.expasy.org/cgi-bin/protparam/protparam' },
      { name: '可变区分析', link: 'https://wwwv.imgt.org/IMGT_vguest/input' },
      { name: 'CDR区划分', link: 'https://www.imgt.org/3Dstructure-DB/cgi/DomainGapAlign.cgi' },
      { name: '结合表位分析', link: 'http://tools.iedb.org/main/bcell/' },
      { name: 'AlphaFold3', link: 'https://alphafoldserver.com/' },
      { name: 'Swiss-Model', link: 'https://swissmodel.expasy.org/interactive' },
      { name: 'IMGT标注', link: 'https://www.imgt.org/3Dstructure-DB/cgi/Collier-de-Perles.cgi' },
      {name: 'R', link: '/RScriptExecutor' }] },

  ];

  // -------------------- 菜单点击处理 --------------------
  const handleMenuClick = (item, event) => {
    console.log('点击的菜单项:', item);
    event.preventDefault();

    // 如果用户没有登录，跳转到登录页面
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    // 如果该菜单项有下拉子菜单，点击时显示/隐藏下拉菜单
    if (item.subItems && item.subItems.length > 0) {
      setActiveMenu(activeMenu === item.name ? null : item.name);
      return;
    }

    // 如果该菜单项有链接，就跳转到该链接
    if (item.link) {
      if (item.link.startsWith('http')) {
        window.location.href = item.link;
      } else {
        navigate(item.link);
      }
    } else {
      console.log('没有有效的链接');
    }
  };

  // -------------------- 鼠标事件处理 --------------------
  const handleMenuEnter = (name) => {
    clearTimeout(timerRef.current);
    setActiveMenu(name);
  };

  const handleMenuLeave = () => {
    timerRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 200); // 200ms延迟
  };

  const toggleUserMenu = () => {
    setIsUserMenuVisible((prev) => !prev);
  };

  // 从后端获取当前登录用户信息
useEffect(() => {
  console.log('useEffect 被触发'); // 调试信息
  fetch('http://127.0.0.1:5008/session-user', {
    method: 'GET',
    credentials: 'include' // 确保携带 Cookie
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('网络请求失败');
      }
      return response.json();
    })
    .then(data => {
      console.log('用户数据:', data); // 调试信息
    })
    .catch(error => {
      console.error('获取用户信息失败:', error);
    });
}, [setUser]);


  // -------------------- 渲染导航栏 --------------------
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
        justifyContent: 'space-between',
        boxSizing: 'border-box',
        padding: '0 20px',
        borderRadius: '0 0 10px 10px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      }}>
        {/* Logo 和标题 */}
        <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
          <img
            src={logo}
            alt="logo"
            style={{ width: '40px', marginRight: '10px', cursor: 'pointer' }}
            onClick={() => navigate('/')}
          />
          <h1
            style={{ color: 'white', fontSize: '20px', margin: 0, cursor: 'pointer', fontWeight: 'bold' }}
            onClick={() => navigate('/')}
          >
            CADD抗体分析平台
          </h1>
        </div>

        {/* 导航菜单 */}
        <div style={{ display: 'flex', gap: '20px', position: 'relative' }}>
          {navItems.map((item) => (
            <div
              key={item.name}
              style={{
                color: 'white',
                cursor: 'pointer',
                padding: '10px',
                transition: 'background-color 0.3s, font-weight 0.3s, border-radius 0.3s',
                position: 'relative',
              }}
              onMouseEnter={() => handleMenuEnter(item.name)}
              onMouseLeave={handleMenuLeave}
              onClick={(event) => handleMenuClick(item, event)} // 保持不变
            >
              {item.name}
              <SubNavBar
                subItems={item.subItems}
                isVisible={activeMenu === item.name}
                onMouseEnter={() => handleMenuEnter(item.name)}
                onMouseLeave={handleMenuLeave}
                onClick={(subItem, event) => handleMenuClick(subItem, event)}
              />
            </div>
          ))}
        </div>

        {/* 用户信息或登录/注册按钮 */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', position: 'relative' }}>
          {isLoggedIn ? (
            <>
              <img
                src={userAvatar}
                alt="用户头像"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  border: '2px solid white',
                }}
                onClick={toggleUserMenu}
              />
              {isUserMenuVisible && (
                <div style={{
                  position: 'absolute',
                  top: '60px',
                  right: 0,
                  backgroundColor: 'white',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  zIndex: 1200,
                  width: '200px',
                }}>
                  <ul style={{
                    listStyle: 'none',
                    margin: 0,
                    padding: '10px',
                    textAlign: 'left',
                  }}>
                    <li style={{
                      padding: '10px',
                      cursor: 'pointer',
                      borderBottom: '1px solid #f0f0f0',
                      fontSize: '14px',
                      color: '#333',
                      transition: 'background-color 0.3s',
                    }}
                      onClick={() => navigate('/resources')}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#f9f9f9'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                    >
                      资源中心
                    </li>
                    <li style={{
                      padding: '10px',
                      cursor: 'pointer',
                      borderBottom: '1px solid #f0f0f0',
                      fontSize: '14px',
                      color: '#333',
                      transition: 'background-color 0.3s',
                    }}
                      onClick={() => navigate('/profile')}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#f9f9f9'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                    >
                      个人中心
                    </li>
                    <li style={{
                      padding: '10px',
                      cursor: 'pointer',
                      borderBottom: '1px solid #f0f0f0',
                      fontSize: '14px',
                      color: '#333',
                      transition: 'background-color 0.3s',
                    }}
                      onClick={() => navigate('/settings')}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#f9f9f9'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                    >
                      偏好设置
                    </li>
                    <li style={{
                      padding: '10px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      color: '#333',
                      transition: 'background-color 0.3s',
                    }}
                      onClick={logout}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#f9f9f9'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                    >
                      退出登录
                    </li>
                  </ul>
                </div>
              )}
              <div style={{
                color: 'white',
                fontWeight: 'bold',
                marginLeft: '10px',
                fontSize: '16px',
              }}>
                {user?.username || '未知用户'} {/* 动态显示当前登录的用户名 */}
              </div>
            </>
          ) : (
            <>
              <button
                style={{
                  backgroundColor: 'white',
                  color: 'rgba(27, 63, 161, 0.78)',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '5px 10px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
                onClick={() => navigate('/login')}
              >
                登录
              </button>
              <button
                style={{
                  backgroundColor: 'white',
                  color: 'rgba(27, 63, 161, 0.78)',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '5px 10px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
                onClick={() => navigate('/register')}
              >
                注册
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;


