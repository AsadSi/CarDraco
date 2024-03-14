import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Carapidisplay from './components/Carapidisplay';
import Sellcar from './components/Sellcar.js';
import './App.css';
import Login from './components/Login.js';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cars" element={<Carapidisplay />} />
        <Route path="/sellcar" element={<Sellcar />} />
      </Routes>
    </Router>
  );
}

export default App;
