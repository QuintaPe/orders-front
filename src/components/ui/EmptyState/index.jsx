import React from 'react';
import { useI18n } from '../../../context/I18nContext.jsx';
import Button from '../Button';
import './styles.css';

const EmptyState = ({
    icon = '📦',
    title,
    description,
    actionText = null,
    onAction = null,
    className = ''
}) => {
    const { t } = useI18n();
    const defaultTitle = title || t('noResults');
    const defaultDescription = description || t('searchFor');
    return (
        <div className={`empty-state ${className}`}>
            <div className="empty-state-icon">{icon}</div>
            <h3 className="empty-state-title">{defaultTitle}</h3>
            <p className="empty-state-description">{defaultDescription}</p>
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