import React from 'react';
import Button from '../Button';
import './styles.css';

const EmptyState = ({
    icon = '📦',
    title = 'No hay elementos',
    description = 'No se encontraron elementos para mostrar.',
    actionText = null,
    onAction = null,
    className = ''
}) => {
    return (
        <div className={`empty-state ${className}`}>
            <div className="empty-state-icon">{icon}</div>
            <h3 className="empty-state-title">{title}</h3>
            <p className="empty-state-description">{description}</p>
            {actionText && onAction && (
                <Button
                    onClick={onAction}
                    variant="primary"
                    size="medium"
                    className="empty-state-action"
                >
                    {actionText}
                </Button>
            )}
        </div>
    );
};

export default EmptyState; 