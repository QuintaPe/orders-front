import React from 'react';
import './styles.css';

const Tag = ({
    children,
    variant = 'default',
    size = 'medium',
    removable = false,
    onRemove,
    className = '',
    ...props
}) => {
    const baseClasses = 'tag';
    const variantClasses = {
        default: 'tag--default',
        primary: 'tag--primary',
        success: 'tag--success',
        warning: 'tag--warning',
        danger: 'tag--danger',
        info: 'tag--info'
    };
    const sizeClasses = {
        small: 'tag--small',
        medium: 'tag--medium',
        large: 'tag--large'
    };

    const classes = [
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        removable && 'tag--removable',
        className
    ].filter(Boolean).join(' ');

    const handleRemove = (e) => {
        e.stopPropagation();
        if (onRemove) {
            onRemove();
        }
    };

    return (
        <span className={classes} {...props}>
            {children}
            {removable && (
                <button
                    className="tag-remove"
                    onClick={handleRemove}
                    aria-label="Remove tag"
                >
                    ×
                </button>
            )}
        </span>
    );
};

export default Tag; 