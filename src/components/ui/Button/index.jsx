import React from 'react';
import './styles.css';

const Button = ({
    children,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    onClick,
    className = '',
    type = 'button',
    fullWidth = false,
    icon,
    loading = false,
    ...props
}) => {
    const baseClasses = 'button';
    const variantClasses = {
        primary: 'button--primary',
        secondary: 'button--secondary',
        outline: 'button--outline',
        ghost: 'button--ghost',
        danger: 'button--danger'
    };
    const sizeClasses = {
        small: 'button--small',
        medium: 'button--medium',
        large: 'button--large'
    };

    const classes = [
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'button--full-width',
        disabled && 'button--disabled',
        loading && 'button--loading',
        icon && 'button--with-icon',
        className
    ].filter(Boolean).join(' ');

    return (
        <button
            type={type}
            className={classes}
            onClick={onClick}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <div className="button-loading-spinner"></div>
            ) : (
                <>
                    {icon && <span className="button-icon">{icon}</span>}
                    {children}
                </>
            )}
        </button>
    );
};

export default Button; 