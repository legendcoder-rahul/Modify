import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../../shared/components/Navbar';
import Footer from '../../shared/components/Footer';
import '../styles/auth.scss';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { handleRegister } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        setLoading(true);

        try {
            await handleRegister({ username, email, password });
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <Navbar showNavLinks={false} />
            
            <div className="auth-container">
                <div className="auth-content">
                    <div className="auth-form-section">
                        <div className="auth-header">
                            <h1>Join the Music</h1>
                            <p>Create your account to start exploring</p>
                        </div>

                        <form className="auth-form" onSubmit={handleSubmit}>
                            {error && <div className="error-message">{error}</div>}

                            <div className="form-group">
                                <label htmlFor="username" className="form-label">Full Name</label>
                                <input
                                    id="username"
                                    type="text"
                                    className="form-input"
                                    placeholder="John Doe"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email" className="form-label">Email Address</label>
                                <input
                                    id="email"
                                    type="email"
                                    className="form-input"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    className="form-input"
                                    placeholder="Create a strong password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    className="form-input"
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className="terms-checkbox">
                                <label>
                                    <input type="checkbox" required disabled={loading} />
                                    <span>I agree to the <a href="#">Terms and Conditions</a></span>
                                </label>
                            </div>

                            <button 
                                type="submit" 
                                className="auth-button"
                                disabled={loading}
                            >
                                {loading ? 'Creating account...' : 'Create Account'}
                            </button>
                        </form>

                        <div className="auth-divider">
                            <span>Or sign up with</span>
                        </div>

                        <div className="social-login">
                            <button className="social-button google">
                                <span>🔍</span> Google
                            </button>
                            <button className="social-button github">
                                <span>🐱</span> GitHub
                            </button>
                        </div>

                        <div className="auth-footer-text">
                            Already have an account? <Link to="/login" className="auth-link">Sign in</Link>
                        </div>
                    </div>

                    <div className="auth-illustration">
                        <div className="illustration-card">
                            <div className="music-wave">
                                <div className="wave wave1"></div>
                                <div className="wave wave2"></div>
                                <div className="wave wave3"></div>
                                <div className="wave wave4"></div>
                                <div className="wave wave5"></div>
                            </div>
                            <div className="music-note">🎵</div>
                            <h3>Your Music Journey Starts Here</h3>
                            <p>Create your account and discover unlimited music</p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Register;