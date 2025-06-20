import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // 导入 useNavigate 用于页面跳转
import { useAuth } from '../contrl/AuthContext'; // 引入 AuthContext
import SubNavBar from './SubNavBar'; // 子菜单组件
import logo from './图片1.svg'; // 根据实际路径导入 logo 图片

function Navbar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth(); // 获取登录状态和登出方法
  const timerRef = useRef();

  // -------------------- 导航菜单项 --------------------
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
      { name: '理化性质', link: 'https://web.expasy.org/cgi-bin/protparam/protparam' }, // 修复单引号
      { name: '可变区分析', link: 'https://wwwv.imgt.org/IMGT_vguest/input' },
      { name: 'CDR区划分', link: 'https://www.imgt.org/3Dstructure-DB/cgi/DomainGapAlign.cgi' },
      { name: '结合表位分析', link: 'http://tools.iedb.org/main/bcell/' },
      { name: 'AlphaFold3', link: 'https://alphafoldserver.com/' },
      { name: 'Swiss-Model', link: 'https://swissmodel.expasy.org/interactive' },
      { name: 'IMGT标注', link: 'https://www.imgt.org/3Dstructure-DB/cgi/Collier-de-Perles.cgi' }] },

  ];

  // -------------------- 菜单点击处理 --------------------
  const handleMenuClick = (item, event) => {
    console.log('点击的菜单项:', item);  // 查看菜单项内容

    event.preventDefault(); // 阻止默认行为

    // 如果用户没有登录，跳转到登录页面
    if (!isLoggedIn) {
      navigate('/login'); // 跳转到登录页面
      return; // 结束函数，防止继续执行跳转操作
    }

    // 如果该菜单项有链接，就跳转到该链接
    if (item.link) {
      console.log('跳转到:', item.link);  // 打印跳转链接

      // 如果是外部链接
      if (item.link.startsWith('http')) {
        console.log('外部链接，跳转到:', item.link); // 调试信息
        window.location.href = item.link; // 外部链接直接跳转
      } else {
        console.log('内部链接，跳转到:', item.link); // 调试信息
        navigate(item.link); // 内部链接使用 react-router 跳转
      }
    } else {
      console.log('没有有效的链接');  // 如果没有链接，输出调试信息
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
        justifyContent: 'space-between', // 修改为两端对齐
        boxSizing: 'border-box', 
        padding: '0 20px',
        borderRadius: '0 0 10px 10px', // 上方直角，下方圆角
      }}>
        {/* Logo 和标题 */}
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
              onClick={(event) => handleMenuClick(item, event)} // 添加事件阻止
            >
              {item.name}
              <SubNavBar
                subItems={item.subItems}
                isVisible={activeMenu === item.name}
                onMouseEnter={() => handleMenuEnter(item.name)}
                onMouseLeave={handleMenuLeave}
                onClick={(subItem, event) => handleMenuClick(subItem, event)} // 确保传递子项
              />
            </div>
          ))}
        </div>

        {/* 用户信息或登录/注册按钮 */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {isLoggedIn ? (
            <>
              <div style={{ color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
                用户名: x9y111
              </div>
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
                onClick={logout} // 调用登出方法
              >
                退出登录
              </button>
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