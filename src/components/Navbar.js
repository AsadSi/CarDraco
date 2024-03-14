import React, { useState } from 'react';
import './style/navbar.css';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <h1 className="logo">MySite</h1>
            <button className="nav-toggle" onClick={toggleMenu}>
                &#9776;
            </button>
            <ul className={`nav-links ${isOpen ? "show-nav" : ""}`}>
                <li><a href="/cars">Our Cars</a></li>
                <li><a href="/Sellcar">Sell Your Car</a></li>
                <li><a href="/">Logout</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;
