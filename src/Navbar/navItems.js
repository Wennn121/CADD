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
      { name: 'SAbDab数据库',link:'/Search'  }] },
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
      {name: 'R', link: '/RScriptExecutor' },
      {name: 'PDB可视化', link: '/PDB' },] },

  ];
  export default navItems;