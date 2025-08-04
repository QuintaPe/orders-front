import React from 'react';
import './styles.css';

const Badge = ({
    children,
    variant = 'default',
    size = 'medium',
    dot = false,
    className = '',
    ...props
}) => {
    const baseClasses = 'badge';
    const variantClasses = {
        default: 'badge--default',
        primary: 'badge--primary',
        success: 'badge--success',
        warning: 'badge--warning',
        danger: 'badge--danger',
        info: 'badge--info'
    };
    const sizeClasses = {
        small: 'badge--small',
        medium: 'badge--medium',
        large: 'badge--large'
    };

    const classes = [
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        dot && 'badge--dot',
        className
    ].filter(Boolean).join(' ');

    return (
        <span className={classes} {...props}>
            {dot && <span className="badge-dot" />}
            {children}
        </span>
    );
};

export default Badge; 