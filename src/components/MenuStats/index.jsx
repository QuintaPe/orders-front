import React from 'react';
import { useI18n } from '../../context/I18nContext.jsx';
import { Package, DollarSign, Star, Clock } from 'lucide-react';
import './styles.css';

function MenuStats({
    totalProducts,
    averagePrice,
    categoriesCount,
    featuredProducts = 0
}) {
    const { t } = useI18n();

    const formatPrice = (price) => {
        return typeof price === 'number' ? `$${price.toFixed(2)}` : '$0.00';
    };

    const stats = [
        {
            icon: <Package size={20} />,
            label: t('totalProducts'),
            value: totalProducts,
            color: 'var(--primary-color)'
        },
        {
            icon: <DollarSign size={20} />,
            label: t('averagePrice'),
            value: formatPrice(averagePrice),
            color: 'var(--success-color)'
        },
        {
            icon: <Star size={20} />,
            label: t('categories'),
            value: categoriesCount,
            color: 'var(--warning-color)'
        },
        {
            icon: <Clock size={20} />,
            label: t('featured'),
            value: featuredProducts,
            color: 'var(--info-color)'
        }
    ];

    return (
        <div className="menu-stats">
            {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                    <div
                        className="stat-icon"
                        style={{ backgroundColor: stat.color }}
                    >
                        {stat.icon}
                    </div>
                    <div className="stat-content">
                        <div className="stat-value">{stat.value}</div>
                        <div className="stat-label">{stat.label}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MenuStats; 