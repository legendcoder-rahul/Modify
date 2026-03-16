import React from 'react';
import '../styles/footer.scss';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-left">
                    <span className="footer-logo">🎵 Modily</span>
                </div>
                <p className="footer-text">© 2024 Modily Streaming Inc. All rights reserved.</p>
                <div className="footer-icons">
                    <a href="#" className="footer-icon" title="Notifications">🔔</a>
                    <a href="#" className="footer-icon" title="Language">🌐</a>
                    <a href="#" className="footer-icon" title="Share">↗</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
