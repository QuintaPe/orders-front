import en from './locales/en.js';
import it from './locales/it.js';
import de from './locales/de.js';
import es from './locales/es.js';

// Available languages
export const LANGUAGES = {
    en: { name: 'English', flag: '🇺🇸', translations: en },
    it: { name: 'Italiano', flag: '🇮🇹', translations: it },
    de: { name: 'Deutsch', flag: '🇩🇪', translations: de },
    es: { name: 'Español', flag: '🇪🇸', translations: es }
};

// Default language
export const DEFAULT_LANGUAGE = 'en';

// Get language from localStorage or browser preference
export const getInitialLanguage = () => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && LANGUAGES[savedLanguage]) {
        return savedLanguage;
    }

    // Try to detect browser language
    const browserLanguage = navigator.language.split('-')[0];
    if (LANGUAGES[browserLanguage]) {
        return browserLanguage;
    }

    return DEFAULT_LANGUAGE;
};

// Interpolation function to replace placeholders like {{count}}
export const interpolate = (text, values = {}) => {
    if (typeof text !== 'string') return text;

    return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
        return values[key] !== undefined ? values[key] : match;
    });
};

// Pluralization function (basic implementation)
export const pluralize = (count, singular, plural) => {
    return count === 1 ? singular : plural;
};

// Date formatting
export const formatDate = (date, locale = 'en') => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString(locale);
};

// Number formatting
export const formatNumber = (number, locale = 'en') => {
    return new Intl.NumberFormat(locale).format(number);
};

// Currency formatting
export const formatCurrency = (amount, locale = 'en', currency = 'USD') => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency
    }).format(amount);
}; 