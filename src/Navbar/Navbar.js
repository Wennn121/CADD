import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; 
import logo from './图片1.svg'; 
import SubNavBar from './SubNavBar'; // 引入子菜单组件

// 主导航栏
function Navbar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const navigate = useNavigate(); // 新增
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
                { name: ' IgG亚类', subItems: [ { name: 'IgG、M、A、D、E', },      
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
      subItems: [{ name: 'SwissProt',  },{ name: 'Protein Family',  },{ name: 'Dail',  },{ name: 'Domain/Motif',  },] },
    { name: '基本分析软件', 
     subItems: [{ name: '胞内',  },{ name: '跨膜',  },{ name: '胞外',  }, { name: '胞内',  },{ name: '信号肽预测',  },]},] },




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
            { name: 'CDC提升/降低', },  {name: 'CDC提升/降低',  }  ,  
             {name: 'ADCD提升/降低',   }  ,  {name: '体内半衰期延长',   }  ,{name: '杵臼结构',   }  ,
          ]
        },
          { 
          name: '抗体亲和力成熟', 
           subItems: [
            { name: '抗原-抗体相互作用位置识别', },
            { name: '抗体优化', },  {name: 'CDC提升/降低',  }  ,  
             {name: 'ADCD提升/降低',   }  ,  {name: '体内半衰期延长',   }  ,{name: '杵臼结构',   }  ,
          ]
        },
          { 
          name: '抗体成药性优化', 
           subItems: [
            { name: '稳定性改造', },
            { name: '修饰位点分析', },  {name: '表达量优化',  }  ,  
             ]
        },
      ]
    },
    
  { name: '靶向虚拟抗体库设计及高内涵虚拟筛选', subItems: [{ name: '抗体可变区结构评估',  },{ name: '抗体关键位点参与识别抗原表位模式分析',  },{ name: '虚拟抗体库设计',  },{ name: '高内涵虚拟筛选',  },] },
   { name: '抗体数据库', subItems: [{ name: 'OAS数据库',  },{ name: 'uniprot数据库',  }] },
  //  { name: 'AIDD', subItems: [{ name: 'IMGT标注', link: 'https://www.imgt.org/3Dstructure-DB/cgi/Collier-de-Perles.cgi' }] },
   
  //   { name: '抗体二维序列分析', subItems: [] },
    
  //   { name: '抗体三维序列分析', subItems: [] },
  //   { name: '抗体结合分析', subItems: [] },
     
      { name: '网址链接', subItems: [{name: '多序列比对',link: '/multi-sequence-alignment'},
      { name: '蛋白信息分析', link: 'https://www.expasy.org/resources/uniprot-blast' },
            { name: '核酸-蛋白质', link: 'https://www.expasy.org/resources/translate' },
            { name: '蛋白质-核酸', link: 'https://www.bioinformatics.org/sms2/rev_trans.html' },
            { name: '人源化', link: 'http://www.abysis.org/abysis/sequence_input/key_annotation/key_annotation.cgi' },
            { name: '理化性质', link: 'https://web.expasy.org/cgi-bin/protparam/protparam' },
            { name: '可变区分析', link: 'https://wwwv.imgt.org/IMGT_vguest/input' },
            { name: 'CDR区划分', link: 'https://www.imgt.org/3Dstructure-DB/cgi/DomainGapAlign.cgi' },
            {name:'能量分数评分',link:'/energy-score' },
            { name: '结合表位分析', link: 'http://tools.iedb.org/main/bcell/' },
            { name: 'AlphaFold3', link: 'https://alphafoldserver.com/' },
            { name: 'Swiss-Model', link: 'https://swissmodel.expasy.org/interactive' },
            { name: 'AlphaFold3', link: 'https://alphafoldserver.com/' },
          { name: 'IMGT标注', link: 'https://www.imgt.org/3Dstructure-DB/cgi/Collier-de-Perles.cgi' }] },
  ];

  // 鼠标进入时清除关闭定时器
  const handleMenuEnter = (name) => {
    clearTimeout(timerRef.current);
    setActiveMenu(name);
  };

  // 鼠标离开时延迟关闭
  const handleMenuLeave = () => {
    timerRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 200); // 200ms延迟
  };

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
                position: 'relative',
              }}
              onMouseEnter={() => handleMenuEnter(item.name)}
              onMouseLeave={handleMenuLeave}
            >
              {item.name}
              <SubNavBar
                subItems={item.subItems}
                isVisible={activeMenu === item.name}
                onMouseEnter={() => handleMenuEnter(item.name)}
                onMouseLeave={handleMenuLeave}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Navbar;
