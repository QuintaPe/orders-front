import React, { useState, useEffect, useRef } from 'react';
import { useI18n } from '../../context/I18nContext.jsx';
import { Filter, Grid, List, SlidersHorizontal, Search, ChevronDown } from 'lucide-react';
import './styles.css';

function AdvancedFilters({
    onPriceRangeChange,
    onSortChange,
    onViewChange,
    onSearchChange,
    onCategoryChange,
    viewMode = 'grid',
    priceRange = { min: 0, max: 100 },
    sortBy = 'name',
    searchQuery = '',
    selectedCategory = 'all',
    categories = []
}) {
    const { t } = useI18n();
    const [isExpanded, setIsExpanded] = useState(false);
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const categoryDropdownRef = useRef(null);

    const sortOptions = [
        { value: 'name', label: t('sortByName') },
        { value: 'price-asc', label: t('sortByPriceAsc') },
        { value: 'price-desc', label: t('sortByPriceDesc') },
        { value: 'popular', label: t('sortByPopular') }
    ];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
                setIsCategoryDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handlePriceChange = (type, value) => {
        const newRange = { ...priceRange, [type]: parseFloat(value) || 0 };
        onPriceRangeChange(newRange);
    };

    const handleSearchChange = (e) => {
        onSearchChange(e.target.value);
    };

    const handleCategorySelect = (category) => {
        onCategoryChange(category);
        setIsCategoryDropdownOpen(false);
    };

    const getCategoryLabel = (categoryValue) => {
        if (categoryValue === 'all') return t('allCategories');
        const category = categories.find(cat => cat.value === categoryValue);
        return category ? category.label : t('allCategories');
    };

    return (
        <div className="advanced-filters">
            <div className="filters-header">
                {/* Search Bar */}
                <div className="search-container">
                    <div className="search-input-wrapper">
                        <Search size={18} className="search-icon" />
                        <input
                            type="text"
                            placeholder={t('searchProducts')}
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="search-input"
                        />
                    </div>
                </div>

                <div className="filters-controls">
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

                    {/* Category Dropdown */}
                    <div className="category-dropdown" ref={categoryDropdownRef}>
                        <button
                            className="category-dropdown-btn"
                            onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                            aria-label={t('selectCategory')}
                        >
                            <span>{getCategoryLabel(selectedCategory)}</span>
                            <ChevronDown size={16} className={`dropdown-icon ${isCategoryDropdownOpen ? 'dropdown-icon--open' : ''}`} />
                        </button>

                        {isCategoryDropdownOpen && (
                            <div className="category-dropdown-menu">
                                <div className="category-dropdown-header">
                                    <h4>{t('categories')}</h4>
                                </div>
                                <div className="category-options">
                                    <button
                                        className={`category-option ${selectedCategory === 'all' ? 'category-option--active' : ''}`}
                                        onClick={() => handleCategorySelect('all')}
                                    >
                                        {t('allCategories')}
                                    </button>
                                    {categories.map(category => (
                                        <button
                                            key={category.value}
                                            className={`category-option ${selectedCategory === category.value ? 'category-option--active' : ''}`}
                                            onClick={() => handleCategorySelect(category.value)}
                                        >
                                            {category.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        className="expand-btn"
                        onClick={() => setIsExpanded(!isExpanded)}
                        aria-label={t('toggleFilters')}
                    >
                        <SlidersHorizontal size={18} />
                    </button>
                </div>
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