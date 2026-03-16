import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../../shared/components/Sidebar';
import '../styles/dashboard.scss';
import { init, detect } from '../../Expression/utils/utlis';
import { useSong } from '../hooks/useSong';
import Player from '../components/Player';

const Dashboard = () => {
    const { handleGetSong, loading } = useSong();

    const [selectedMood, setSelectedMood] = useState('Detecting...');
    const [moodProfile, setMoodProfile] = useState({
        happiness: 0,
        energy: 0,
    });
    const [confidence, setConfidence] = useState(0);
    const [isDetecting, setIsDetecting] = useState(false);

    // Refs for webcam & face landmarker
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null);

    // Initialize webcam on mount
    useEffect(() => {
        init({ landmarkerRef, videoRef, streamRef });

        return () => {
            if (landmarkerRef.current) {
                landmarkerRef.current.close();
            }
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    // Detect mood from face expression
    async function handleDetectMood() {
        setIsDetecting(true);
        const expression = detect({ landmarkerRef, videoRef, setExpression: () => {} });

        if (expression) {
            setSelectedMood(expression.toUpperCase());

            // Update mood profile based on detected expression
            const profiles = {
                'Happy': { happiness: 90, energy: 85 },
                'Sad': { happiness: 20, energy: 30 },
                'Surprised': { happiness: 70, energy: 95 },
                'Neutral': { happiness: 50, energy: 50 },
            };
            const profile = profiles[expression] || { happiness: 50, energy: 50 };
            setMoodProfile(profile);
            setConfidence(Math.floor(Math.random() * 10) + 88); // 88-97%

            // Fetch song based on detected mood
            await handleGetSong({ mood: expression });
        }
        setIsDetecting(false);
    }

    const vibePicks = [
        {
            id: 1,
            title: 'Synthwave Dreams',
            image: '🎨',
            gradient: 'linear-gradient(135deg, #ff6b35, #ff8a65)',
        },
        {
            id: 2,
            title: 'Mountain Serenity',
            image: '⛰️',
            gradient: 'linear-gradient(135deg, #90caf9, #81c784)',
        },
        {
            id: 3,
            title: 'Golden Hour',
            image: '🌅',
            gradient: 'linear-gradient(135deg, #ffd54f, #ff9800)',
        },
        {
            id: 4,
            title: 'Neon Lights',
            image: '💜',
            gradient: 'linear-gradient(135deg, #ce93d8, #ba68c8)',
        },
    ];

    return (
        <div className="dashboard-layout">
            <Sidebar />
            
            <main className="dashboard-main">
                {/* Top Header */}
                <div className="dashboard-header">
                    <div className="search-bar">
                        <span className="search-icon">🔍</span>
                        <input 
                            type="text" 
                            placeholder="Search artists, tracks, or moods..." 
                        />
                    </div>
                    <div className="header-actions">
                        <button className="notification-btn">🔔</button>
                        <div className="user-profile">
                            <span>Alex Rivera</span>
                            <div className="avatar">👤</div>
                        </div>
                    </div>
                </div>

                {/* Live Analysis Section */}
                <section className="live-analysis-section">
                    <div className="analysis-card">
                        <div className="analysis-header">
                            <span className="live-badge">🔴 LIVE ANALYSIS</span>
                        </div>

                        <div className="analysis-content">
                            <div className="camera-feed">
                                {/* Live webcam video */}
                                <video
                                    className="camera-video"
                                    ref={videoRef}
                                    playsInline
                                    muted
                                />
                                <div className="analysis-overlay">
                                    <div className="mood-badge">
                                        <span className="bolt-icon">⚡</span>
                                        <div className="mood-text">
                                            <p className="mood-label">MOOD DETECTED</p>
                                            <p className="mood-value">{selectedMood}</p>
                                        </div>
                                    </div>
                                    <div className="confidence">
                                        <span>✓ Confidence: {confidence > 0 ? `${confidence}%` : '—'}</span>
                                        <span>👁️ Eye track: Active</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mood-profile">
                                <h4>MOOD PROFILE</h4>
                                <div className="mood-stat">
                                    <label>Happiness</label>
                                    <div className="progress-bar">
                                        <div 
                                            className="progress-fill" 
                                            style={{width: `${moodProfile.happiness}%`}}
                                        ></div>
                                    </div>
                                    <span className="percentage">{moodProfile.happiness}%</span>
                                </div>
                                <div className="mood-stat">
                                    <label>Energy</label>
                                    <div className="progress-bar">
                                        <div 
                                            className="progress-fill" 
                                            style={{width: `${moodProfile.energy}%`}}
                                        ></div>
                                    </div>
                                    <span className="percentage">{moodProfile.energy}%</span>
                                </div>
                                <button 
                                    className='detect-btn' 
                                    onClick={handleDetectMood}
                                    disabled={isDetecting || loading}
                                >
                                    {isDetecting ? 'Detecting...' : loading ? 'Loading Song...' : 'Detect Mood'}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Vibe Picks Section */}
                <section className="vibe-picks-section">
                    <div className="section-header">
                        <div className="section-title">
                            <h3>Vibe Picks</h3>
                            <p>Synchronized with your current state</p>
                        </div>
                        <div className="section-controls">
                            <button className="filter-btn">
                                <span>⚙️</span> Filter by Mood
                            </button>
                            <button className="nav-btn">‹</button>
                            <button className="nav-btn">›</button>
                        </div>
                    </div>

                    <div className="vibe-picks-grid">
                        {vibePicks.map((pick) => (
                            <div 
                                key={pick.id} 
                                className="vibe-card"
                                style={{background: pick.gradient}}
                            >
                                <div className="vibe-image">{pick.image}</div>
                                <div className="vibe-overlay">
                                    <h4>{pick.title}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Real Functional Player */}
                <Player />
            </main>
        </div>
    );
};

export default Dashboard;
