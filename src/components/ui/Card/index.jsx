import React from 'react';
import './styles.css';

const Card = ({
    children,
    className = '',
    onClick,
    hoverable = false,
    padding = 'medium',
    shadow = 'medium',
    ...props
}) => {
    const baseClasses = 'card';
    const paddingClasses = {
        none: 'card--padding-none',
        small: 'card--padding-small',
        medium: 'card--padding-medium',
        large: 'card--padding-large'
    };
    const shadowClasses = {
        none: 'card--shadow-none',
        small: 'card--shadow-small',
        medium: 'card--shadow-medium',
        large: 'card--shadow-large'
    };

    const classes = [
        baseClasses,
        paddingClasses[padding],
        shadowClasses[shadow],
        hoverable && 'card--hoverable',
        onClick && 'card--clickable',
        className
    ].filter(Boolean).join(' ');

    return (
        <div
            className={classes}
            onClick={onClick}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card; 