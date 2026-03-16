import React from 'react';
import { Link, useLocation } from 'react-router';
import '../styles/sidebar.scss';

const Sidebar = () => {
    const location = useLocation();

    const menuItems = [
        { icon: '📊', label: 'Dashboard', path: '/home' },
        { icon: '📜', label: 'Mood History', path: '/mood-history' },
        { icon: '📚', label: 'My Libraries', path: '/libraries' },
        { icon: '⚙️', label: 'Settings', path: '/settings' },
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="logo">
                    <span className="logo-icon">🎵</span>
                    <div className="logo-text">
                        <h2>Modily</h2>
                        <p>Mood Sync Active</p>
                    </div>
                </div>
            </div>

            <nav className="sidebar-nav">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                    >
                        <span className="nav-icon">{item.icon}</span>
                        <span className="nav-label">{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div className="sidebar-bottom">
                <div className="current-session">
                    <h4>CURRENT SESSION</h4>
                    <div className="session-song">
                        <span className="song-icon">🎵</span>
                        <div className="song-info">
                            <p className="song-name">Midnight City</p>
                            <p className="artist-name">M83</p>
                        </div>
                    </div>
                </div>
                <button className="generate-mix-btn">Generate New Mix</button>
            </div>
        </aside>
    );
};

export default Sidebar;
