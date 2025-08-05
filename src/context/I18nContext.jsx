import React, { createContext, useContext, useState, useEffect } from 'react';
import { LANGUAGES, getInitialLanguage, interpolate } from '../i18n/index.js';

const I18nContext = createContext();

export const useI18n = () => {
    const context = useContext(I18nContext);
    if (!context) {
        throw new Error('useI18n must be used within an I18nProvider');
    }
    return context;
};

export const I18nProvider = ({ children }) => {
    const [currentLanguage, setCurrentLanguage] = useState(getInitialLanguage);
    const [translations, setTranslations] = useState(LANGUAGES[currentLanguage].translations);

    // Update translations when language changes
    useEffect(() => {
        setTranslations(LANGUAGES[currentLanguage].translations);
        localStorage.setItem('language', currentLanguage);
        document.documentElement.lang = currentLanguage;
    }, [currentLanguage]);

    // Translation function
    const t = (key, values = {}) => {
        const translation = translations[key];
        if (!translation) {
            console.warn(`Translation key "${key}" not found for language "${currentLanguage}"`);
            return key;
        }
        return interpolate(translation, values);
    };

    // Change language function
    const changeLanguage = (language) => {
        if (LANGUAGES[language]) {
            setCurrentLanguage(language);
        } else {
            console.warn(`Language "${language}" is not supported`);
        }
    };

    // Get available languages
    const getAvailableLanguages = () => {
        return Object.entries(LANGUAGES).map(([code, lang]) => ({
            code,
            name: lang.name,
            flag: lang.flag
        }));
    };

    const value = {
        currentLanguage,
        translations,
        t,
        changeLanguage,
        getAvailableLanguages,
        languages: LANGUAGES
    };

    return (
        <I18nContext.Provider value={value}>
            {children}
        </I18nContext.Provider>
    );
}; 