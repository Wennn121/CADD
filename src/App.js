import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar/Navbar.js';
import Home from './module/Home';
import EnergyScore from './module/EnergyScore';

function App() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/energy-score" element={<EnergyScore />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
