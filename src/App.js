import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './contrl/AuthContext'; // 先引入 AuthProvider
import Navbar from './Navbar/Navbar.js';
import Home from './module/Home';
import EnergyScore from './module/EnergyScore';
import MultiSequenceAlignment from './module/MultiSequenceAlignment.js';
import HelpPage from './module/Clustalw-HelpPage.js';
import Login from './contrl/Login'; // 引入 Login 组件
import Register from './contrl/Register'; // 引入 Register 组件
import Dashboard from './contrl/Dashboard'; // 引入 Dashboard 组件

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught in ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

function App() {
  return (
    <AuthProvider>
      <ErrorBoundary>
        
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/energy-score" element={<EnergyScore />} />
            <Route path="/multi-sequence-alignment" element={<MultiSequenceAlignment />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/login" element={<Login />} /> {/* 添加 Login 路由 */}
            <Route path="/register" element={<Register />} /> {/* 添加 Register 路由 */}
            <Route path="/dashboard" element={<Dashboard />} /> {/* 添加 Dashboard 路由 */}
          </Routes>
        
      </ErrorBoundary>
    </AuthProvider>
  );
}

export default App;
