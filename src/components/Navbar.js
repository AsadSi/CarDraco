import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style/navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
    navigate('/');
  };

  return (
    <nav>
      <ul className={showMenu ? 'menu-active' : ''}>
        <li><Link to="/cars">Our Cars</Link></li>
        <li><Link to="/sellcar">Sell Your Car</Link></li>
        <li><Link to="/mycars">My Cars</Link></li>
        <li><button onClick={handleLogout}>Logout</button></li>
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
