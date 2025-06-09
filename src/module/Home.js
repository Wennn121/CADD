import React from 'react';

function Home() {
  return (
    <div>
      {/* 首页部分 */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          background: 'linear-gradient(45deg, #85c6ff, #ffcccb)', // 渐变背景色
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          transition: 'transform 1s ease-out', // 页面切换过渡效果
        }}
      >
        <h2
          style={{
            color: '#333',
            fontSize: '48px',
            fontWeight: 'bold',
            marginBottom: '20px',
            animation: 'fadeIn 2s ease-out',
            textShadow: '2px 2px 10px rgba(0, 0, 0, 0.2)', // 文字阴影
          }}
        >
          欢迎来到抗体设计平台
        </h2>

        <p
          style={{
            fontSize: '20px',
            color: '#555',
            marginBottom: '40px',
            animation: 'fadeIn 2s 0.5s ease-out',
            textAlign: 'center',
            textShadow: '1px 1px 8px rgba(0, 0, 0, 0.1)', // 文字阴影
          }}
        >
          提交您的抗体序列进行比对，开始您的设计工作
        </p>

        {/* 修改后的向下滑动按钮 */}
        <p
          style={{
            fontSize: '18px',
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginTop: '40px',
            padding: '12px 24px',
            borderRadius: '20px',
            backgroundColor: '#007BFF',
            transition: 'all 0.3s ease-in-out',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            textDecoration: 'none',
          }}
          onClick={() => {
            const targetElement = document.querySelector('.target-section'); // 获取目标元素
            const offsetTop = targetElement.offsetTop - 80; // 减去导航栏高度（假设导航栏高度为 80px）
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth',
            });
          }}
        >
          向下滑动了解更多
        </p>
      </div>

      {/* 背景介绍页 */}
      <div
        style={{
          width: '100%',
          height: '100vh',
          backgroundColor: '#f0f0f0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          transition: 'transform 1s ease-out',
        }}
      >
        <h3 className="target-section" style={{ fontSize: '36px', color: '#333', marginBottom: '20px' }}>
          我们的目标
        </h3>
        <p
          style={{
            fontSize: '18px',
            color: '#555',
            marginBottom: '80px',
            textAlign: 'justify',
            maxWidth: '1200px',
          }}
        >
          我们的目标是通过提供先进的抗体设计平台，推动生物制药和免疫学研究的发展。我们致力于为全球科研人员、制药公司和医学研究机构提供创新的工具， 帮助他们高效、精确地设计和优化抗体，以应对复杂的疾病挑战。
          在这个平台上，用户可以提交自己的抗体序列，进行高效的序列比对和分析，获得最佳设计方案，
          并优化抗体的效能、稳定性和特异性。
          
      
          <p>
          通过集成先进的计算生物学技术和人工智能算法，我们不仅可以提高抗体的设计速度，还能大幅提升其精准度，
          推动抗体药物的研发和临床应用。
        我们平台的设计原则是智能、高效、开放和可扩展，为科研人员提供直观易用的界面、
          精准的计算结果，并支持多种研究需求的灵活定制。我们不断更新和优化平台功能，确保用户能够在最新的技术背景下进行科学探索与实验验证。
        </p>
        </p>
                  <img 
            src={require('./图片2.png')} 
            alt="背景图像" 
            style={{
              width: '50%',
              height: 'auto',
              borderRadius: '10px',
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
            }} 
          />

      </div>
    </div>
  );
}

export default Home;
