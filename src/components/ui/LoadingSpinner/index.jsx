import React from 'react';
import './styles.css';

const LoadingSpinner = ({
    size = 'medium',
    text = 'Loading...',
    className = '',
    color = '#ff6b6b',
    ...props
}) => {
    const sizeMap = {
        small: '24px',
        medium: '40px',
        large: '60px'
    };

    const spinnerSize = sizeMap[size];

    return (
        <div
            className={`loading-spinner ${className}`}
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '200px',
                flexDirection: 'column',
                gap: '16px'
            }}
            {...props}
        >
            <div
                className="loading-spinner__spinner"
                style={{
                    width: spinnerSize,
                    height: spinnerSize,
                    border: `4px solid #f3f3f3`,
                    borderTop: `4px solid ${color}`,
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }}
            />
            {text && (
                <p className="loading-spinner__text" style={{ color: '#666', fontSize: '16px' }}>
                    {text}
                </p>
            )}
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default LoadingSpinner; 