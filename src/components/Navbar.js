import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark fixed-top">
      <div className="container-fluid">
        <button 
          className="navbar-toggler text-white navbar-light" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
          onClick={() => setShowMenu(!showMenu)}
          >
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${showMenu ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-primary">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/cars">Our Cars</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/sellcar">Sell Your Car</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/mycars">My Cars</Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-link nav-link text-white" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
