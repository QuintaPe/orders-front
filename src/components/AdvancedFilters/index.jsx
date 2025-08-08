import React, { useState } from 'react';
import { useI18n } from '../../context/I18nContext.jsx';
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import './styles.css';

function AdvancedFilters({
    onPriceRangeChange,
    onSortChange,
    onViewChange,
    viewMode = 'grid',
    priceRange = { min: 0, max: 100 },
    sortBy = 'name'
}) {
    const { t } = useI18n();
    const [isExpanded, setIsExpanded] = useState(false);

    const sortOptions = [
        { value: 'name', label: t('sortByName') },
        { value: 'price-asc', label: t('sortByPriceAsc') },
        { value: 'price-desc', label: t('sortByPriceDesc') },
        { value: 'popular', label: t('sortByPopular') }
    ];

    const handlePriceChange = (type, value) => {
        const newRange = { ...priceRange, [type]: parseFloat(value) || 0 };
        onPriceRangeChange(newRange);
    };

    return (
        <div className="advanced-filters">
            <div className="filters-header">
                <div className="filters-title">
                    <Filter size={20} />
                    <span>{t('filters')}</span>
                </div>
                <div className="view-controls">
                    <button
                        className={`view-btn ${viewMode === 'grid' ? 'view-btn--active' : ''}`}
                        onClick={() => onViewChange('grid')}
                        aria-label={t('gridView')}
                    >
                        <Grid size={18} />
                    </button>
                    <button
                        className={`view-btn ${viewMode === 'list' ? 'view-btn--active' : ''}`}
                        onClick={() => onViewChange('list')}
                        aria-label={t('listView')}
                    >
                        <List size={18} />
                    </button>
                </div>
                <button
                    className="expand-btn"
                    onClick={() => setIsExpanded(!isExpanded)}
                    aria-label={t('toggleFilters')}
                >
                    <SlidersHorizontal size={18} />
                </button>
            </div>

            {isExpanded && (
                <div className="filters-content">
                    <div className="filter-section">
                        <h4 className="filter-title">{t('priceRange')}</h4>
                        <div className="price-inputs">
                            <div className="price-input">
                                <label>{t('minPrice')}</label>
                                <input
                                    type="number"
                                    value={priceRange.min}
                                    onChange={(e) => handlePriceChange('min', e.target.value)}
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                            <div className="price-input">
                                <label>{t('maxPrice')}</label>
                                <input
                                    type="number"
                                    value={priceRange.max}
                                    onChange={(e) => handlePriceChange('max', e.target.value)}
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="filter-section">
                        <h4 className="filter-title">{t('sortBy')}</h4>
                        <select
                            value={sortBy}
                            onChange={(e) => onSortChange(e.target.value)}
                            className="sort-select"
                        >
                            {sortOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdvancedFilters; 