import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../../shared/components/Navbar';
import Footer from '../../shared/components/Footer';
import '../styles/auth.scss';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { handleLogin } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await handleLogin({ email, password });
            navigate('/home');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
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
                            <h1>Welcome Back</h1>
                            <p>Sign in to your account to continue</p>
                        </div>

                        <form className="auth-form" onSubmit={handleSubmit}>
                            {error && <div className="error-message">{error}</div>}

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
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-footer">
                                <label className="remember-me">
                                    <input type="checkbox" defaultChecked />
                                    <span>Remember me</span>
                                </label>
                                <a href="#" className="forgot-password">Forgot password?</a>
                            </div>

                            <button 
                                type="submit" 
                                className="auth-button"
                                disabled={loading}
                            >
                                {loading ? 'Signing in...' : 'Sign In'}
                            </button>
                        </form>

                        <div className="auth-divider">
                            <span>Or continue with</span>
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
                            Don't have an account? <Link to="/register" className="auth-link">Sign up</Link>
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
                            <h3>Your Music Journey</h3>
                            <p>Discover millions of songs tailored to your mood</p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Login;