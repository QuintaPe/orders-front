import React from 'react';
import './styles.css';

const Input = ({
    type = 'text',
    placeholder = '',
    value = '',
    onChange,
    onFocus,
    onBlur,
    className = '',
    disabled = false,
    error = false,
    size = 'medium',
    fullWidth = false,
    icon,
    iconPosition = 'left',
    ...props
}) => {
    const baseClasses = 'input';
    const sizeClasses = {
        small: 'input--small',
        medium: 'input--medium',
        large: 'input--large'
    };

    const classes = [
        baseClasses,
        sizeClasses[size],
        fullWidth && 'input--full-width',
        disabled && 'input--disabled',
        error && 'input--error',
        icon && `input--with-icon input--icon-${iconPosition}`,
        className
    ].filter(Boolean).join(' ');

    return (
        <div className="input-wrapper">
            {icon && iconPosition === 'left' && (
                <span className="input-icon input-icon--left">{icon}</span>
            )}
            <input
                type={type}
                className={classes}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                disabled={disabled}
                {...props}
            />
            {icon && iconPosition === 'right' && (
                <span className="input-icon input-icon--right">{icon}</span>
            )}
        </div>
    );
};

export default Input; 