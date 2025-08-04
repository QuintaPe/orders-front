import React from 'react';
import Button from '../ui/Button/index.jsx';
import './styles.css';

function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
    const handleCategorySelect = (category) => {
        onSelectCategory(category);
    };

    return (
        <div className="category-buttons">
            <Button
                variant={!selectedCategory ? 'primary' : 'outline'}
                size="small"
                onClick={() => handleCategorySelect(null)}
            >
                All
            </Button>
            {categories.map(cat => (
                <Button
                    key={cat.id}
                    variant={selectedCategory?.id === cat.id ? 'primary' : 'outline'}
                    size="small"
                    onClick={() => handleCategorySelect(cat)}
                >
                    {cat.name}
                </Button>
            ))}
        </div>
    );
}

export default CategoryFilter; 