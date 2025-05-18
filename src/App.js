// 导入 logo 图像和 App 样式表
import logo from './logo.svg';
import './App.css';

// App 组件
function App() {
  return (
    <div className="App"> {/* 根容器 div，使用 "App" 类名来应用样式 */}
      <header className="App-header"> {/* 应用的头部部分，使用 "App-header" 类名 */}
        
        {/* 显示 logo 图像 */}
        <img src={logo} className="App-logo" alt="logo" />
        
        {/* 显示说明文本 */}
        <p>
          Edit <code>src/App.js</code> and save to reload. {/* 引导用户编辑 App.js 文件 */}
        </p>
        
        {/* 提供一个指向 React 官方网站的超链接 */}
        <a
          className="App-link"  {/* 为链接应用 App-link 样式 */}
          href="https://reactjs.org"  {/* 超链接的目标地址 */}
          target="_blank"  {/* 在新标签页中打开链接 */}
          rel="noopener noreferrer"  {/* 提供安全性，防止页面之间的安全漏洞 */}
        >
          Learn React  {/* 链接文本，点击后将引导用户到 React 官网 */}
        </a>
      </header>
    </div>
  );
}

export default App;  {/* 导出 App 组件 */}
