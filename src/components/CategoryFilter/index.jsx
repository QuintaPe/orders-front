import React from 'react';
import { useI18n } from '../../context/I18nContext.jsx';
import './styles.css';

function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
    const { t } = useI18n();

    const handleCategorySelect = (category) => {
        onSelectCategory(category);
    };

    const getCategoryIcon = (categoryName) => {
        const icons = {
            'Bebidas': '🥤',
            'Postres': '🍰',
            'Entradas': '🥗',
            'Platos Principales': '🍽️',
            'Aperitivos': '🍟',
            'default': '🍕'
        };
        return icons[categoryName] || icons.default;
    };

    return (
        <div className="category-filter">
            <div className="category-filter-container">
                <button
                    className={`category-chip ${!selectedCategory ? 'category-chip--active' : ''}`}
                    onClick={() => handleCategorySelect(null)}
                >
                    <span className="category-icon">🍽️</span>
                    <span className="category-name">{t('allCategories')}</span>
                </button>
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        className={`category-chip ${selectedCategory?.id === cat.id ? 'category-chip--active' : ''}`}
                        onClick={() => handleCategorySelect(cat)}
                    >
                        <span className="category-icon">{getCategoryIcon(cat.name)}</span>
                        <span className="category-name">{cat.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default CategoryFilter; 