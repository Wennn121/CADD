import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar/Navbar.js';
import Home from './module/Home';
import EnergyScore from './module/EnergyScore';
import MultiSequenceAlignment from './module/MultiSequenceAlignment.js';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/energy-score" element={<EnergyScore />} />
        <Route path="/multi-sequence-alignment" element={<MultiSequenceAlignment />} />
      </Routes>
    </div>
  );
}

export default App;
