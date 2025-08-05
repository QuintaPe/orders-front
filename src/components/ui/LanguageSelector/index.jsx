import React, { useState, useRef, useEffect } from 'react';
import { useI18n } from '../../../context/I18nContext.jsx';
import './styles.css';

const LanguageSelector = ({ className = '', size = 'medium' }) => {
    const { currentLanguage, changeLanguage, getAvailableLanguages, t } = useI18n();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const languages = getAvailableLanguages();
    const currentLang = languages.find(lang => lang.code === currentLanguage);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLanguageChange = (languageCode) => {
        changeLanguage(languageCode);
        setIsOpen(false);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`language-selector ${className} ${size}`} ref={dropdownRef}>
            <button
                className="language-selector__button"
                onClick={toggleDropdown}
                aria-label={t('language')}
                aria-expanded={isOpen}
            >
                <span className="language-selector__flag">{currentLang?.flag}</span>
                <span className="language-selector__text">{currentLang?.name}</span>
                <span className={`language-selector__arrow ${isOpen ? 'open' : ''}`}>
                    ▼
                </span>
            </button>

            {isOpen && (
                <div className="language-selector__dropdown">
                    {languages.map((language) => (
                        <button
                            key={language.code}
                            className={`language-selector__option ${language.code === currentLanguage ? 'active' : ''
                                }`}
                            onClick={() => handleLanguageChange(language.code)}
                        >
                            <span className="language-selector__flag">{language.flag}</span>
                            <span className="language-selector__text">{language.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSelector; 