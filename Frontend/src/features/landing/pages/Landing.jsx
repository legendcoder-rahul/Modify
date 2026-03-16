import Navbar from '../../shared/components/Navbar';
import Footer from '../../shared/components/Footer';
import music from '../../../assets/music.png'
import '../styles/landing.scss';

const Landing = () => {
    return (
        <div className="landing">
            <Navbar showNavLinks={true} />

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-container">
                    <div className="hero-content">
                        <div className="new-release-badge">
                            <span className="badge-icon">⭐</span>
                            <span className="badge-text">NEW RELEASE</span>
                        </div>
                        
                        <h1 className="hero-title">
                            Music for every <span className="highlight">mood</span>
                        </h1>
                        
                        <p className="hero-subtitle">
                            Discover millions of tracks tailored to your unique vibe. Stream high-fidelity audio anytime, anywhere on the world's most intuitive music platform.
                        </p>
                        
                        <div className="hero-buttons">
                            <button className="btn btn-primary">Start Listening</button>
                            <button className="btn btn-secondary">Explore Plans</button>
                        </div>
                    </div>
                    
                    <div className="hero-illustration">
                        <div className="illustration-card">
                            <img src={music} alt="Music illustration" />
                            
                            <div className="headphones">
                                <div className="headphone-left"></div>
                                <div className="headphone-band"></div>
                                <div className="headphone-right"></div>
                            </div>
                            
                            <div className="now-playing">
                                <div className="np-play-btn">▶</div>
                                <div className="np-info">
                                    <div className="np-title">Midnight City</div>
                                    <div className="np-subtitle">Currently Trending</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Landing;
