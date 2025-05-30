import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar/Navbar.js';
import Home from './module/Home';
import EnergyScore from './module/EnergyScore';
import MultiSequenceAlignment from './module/MultiSequenceAlignment.js';
import HelpPage from './module/Clustalw-HelpPage.js';

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
    <ErrorBoundary>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/energy-score" element={<EnergyScore />} />
          <Route path="/multi-sequence-alignment" element={<MultiSequenceAlignment />} />
          <Route path="/help" element={<HelpPage />} />
        </Routes>
      </div>
    </ErrorBoundary>
  );
}

export default App;
