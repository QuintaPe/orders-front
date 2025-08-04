import React, { useState } from 'react';
import Input from '../Input';
import './styles.css';

const SearchBar = ({
    onSearch,
    placeholder = "Find your food here...",
    className = '',
    size = 'medium',
    ...props
}) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (onSearch) {
            onSearch(value);
        }
    };

    return (
        <div className={`search-container ${className}`}>
            <Input
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={handleSearch}
                icon="🔍"
                iconPosition="left"
                size={size}
                fullWidth
                {...props}
            />
        </div>
    );
};

export default SearchBar; 