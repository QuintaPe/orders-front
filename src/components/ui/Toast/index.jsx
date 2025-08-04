import React, { useState, useEffect, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import './styles.css';

const ToastContext = createContext();

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

const Toast = ({ message, type = 'info', duration = 5000, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300); // Wait for animation to complete
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const getIcon = () => {
        switch (type) {
            case 'success': return '✅';
            case 'error': return '❌';
            case 'warning': return '⚠️';
            case 'info': return 'ℹ️';
            default: return 'ℹ️';
        }
    };

    return (
        <div className={`toast toast--${type} ${isVisible ? 'toast--visible' : ''}`}>
            <div className="toast-icon">{getIcon()}</div>
            <div className="toast-content">
                <p className="toast-message">{message}</p>
            </div>
            <button className="toast-close" onClick={() => {
                setIsVisible(false);
                setTimeout(onClose, 300);
            }}>
                ×
            </button>
        </div>
    );
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = (message, type = 'info', duration = 5000) => {
        const id = Date.now() + Math.random();
        const newToast = { id, message, type, duration };
        setToasts(prev => [...prev, newToast]);
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    const showSuccess = (message, duration) => addToast(message, 'success', duration);
    const showError = (message, duration) => addToast(message, 'error', duration);
    const showWarning = (message, duration) => addToast(message, 'warning', duration);
    const showInfo = (message, duration) => addToast(message, 'info', duration);

    return (
        <ToastContext.Provider value={{ addToast, showSuccess, showError, showWarning, showInfo }}>
            {children}
            {createPortal(
                <div className="toast-container">
                    {toasts.map(toast => (
                        <Toast
                            key={toast.id}
                            message={toast.message}
                            type={toast.type}
                            duration={toast.duration}
                            onClose={() => removeToast(toast.id)}
                        />
                    ))}
                </div>,
                document.body
            )}
        </ToastContext.Provider>
    );
};

export default Toast; 