import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Carapidisplay from './components/Carapidisplay';
import Sellcar from './components/Sellcar';
import Login from './components/Login';
import Signup from './components/Signup';
import UserCars from './components/UserCars.js';
import ProtectedRoute from './components/ProtectedRoute'; 
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/cars"
          element={<ProtectedRoute element={<Carapidisplay />} path="/cars" isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/sellcar"
          element={<ProtectedRoute element={<Sellcar />} path="/sellcar" isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/mycars"
          element={<ProtectedRoute element={<UserCars />} path="/mycars" isAuthenticated={isAuthenticated} />} // Add a protected route for UserCars
        />
      </Routes>
    </Router>
  );
};

export default App;
