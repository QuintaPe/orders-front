import React from 'react';
import './styles.css';

function HeroSection() {
    return (
        <div className="hero-section">
            <div className="hero-overlay"></div>
            <div style={{
                position: 'relative',
                zIndex: 1,
                textAlign: 'center',
                color: 'white',
                padding: '20px'
            }}>
                <h1 style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    marginBottom: '10px',
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}>
                    Delicious Food
                </h1>
                <p style={{
                    fontSize: '16px',
                    opacity: 0.9,
                    textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                }}>
                    Fresh ingredients, amazing taste
                </p>
            </div>
        </div>
    );
}

export default HeroSection; 