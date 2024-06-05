import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style/navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false); 
    navigate('/');
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <nav>
      <ul className={showMenu ? 'menu-active' : ''}>
        <li><Link to="/cars">Our Cars</Link></li>
        <li><Link to="/sellcar">Sell Your Car</Link></li>
        <li><Link to="/mycars">My Cars</Link></li>
        {isAuthenticated && (
          <li><button onClick={handleLogout}>Logout</button></li>
        )}
      </ul>
      <div className="menu-icon" onClick={() => setShowMenu(!showMenu)}>
        <div className="menu-line"></div>
        <div className="menu-line"></div>
        <div className="menu-line"></div>
      </div>
    </nav>
  );
};

export default Navbar;
