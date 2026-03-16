import React, { useState } from 'react';
import { Link } from 'react-router';
import { useTheme } from '../context/theme.context';
import '../styles/navbar.scss';

const Navbar = ({ showNavLinks = true }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <span className="logo-icon">🎵</span>
                    <span className="logo-text">Modily</span>
                </Link>

                {showNavLinks && (
                    <>
                        <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
                            <li className="nav-item">
                                <a href="#home" className="nav-link">Home</a>
                            </li>
                            <li className="nav-item">
                                <a href="#features" className="nav-link">Features</a>
                            </li>
                            <li className="nav-item">
                                <a href="#about" className="nav-link">About</a>
                            </li>
                            <li className="nav-item">
                                <a href="#support" className="nav-link">Support</a>
                            </li>
                        </ul>
                        <div className="nav-actions">
                            <button 
                                className="theme-toggle-btn" 
                                onClick={toggleTheme}
                                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                            >
                                {theme === 'light' ? '🌙' : '☀️'}
                            </button>
                            <button className="get-started-btn" onClick={() => window.location.href = '/login'}>
                                Get Started
                            </button>
                            <button className="hamburger" onClick={toggleMobileMenu}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>
                        </div>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
