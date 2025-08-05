import React, { useState } from 'react';
import { useI18n } from '../../../context/I18nContext.jsx';
import Input from '../Input';
import './styles.css';

const SearchBar = ({
    onSearch,
    placeholder,
    className = '',
    size = 'medium',
    ...props
}) => {
    const { t } = useI18n();
    const [searchTerm, setSearchTerm] = useState('');

    // Use provided placeholder or default translation
    const searchPlaceholder = placeholder || t('searchPlaceholder');

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
                placeholder={searchPlaceholder}
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