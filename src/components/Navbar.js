import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style/navbar.css';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
        window.location.reload();
    };

    return (
        <nav className="navbar">
            <h1 className="logo">MySite</h1>
            <button className="nav-toggle" onClick={toggleMenu}>
                &#9776;
            </button>
            <ul className={`nav-links ${isOpen ? "show-nav" : ""}`}>
                <li><Link to="/cars">Our Cars</Link></li>
                <li><Link to="/sellcar">Sell Your Car</Link></li>
                <li><Link to="/mycars">My Cars</Link></li>
                <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
        </nav>
    );
}

export default Navbar;
