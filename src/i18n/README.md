# Internationalization (i18n) System

This project includes a custom internationalization system that supports English, Italian, German, and Spanish without external dependencies.

## Features

- 🌍 **Multi-language support**: English, Italian, German, and Spanish
- 🔄 **Dynamic language switching**: Change language on the fly
- 💾 **Persistent language selection**: Remembers user's language preference
- 🎯 **Browser language detection**: Automatically detects user's preferred language
- 📝 **Interpolation support**: Replace placeholders like `{{count}}` with dynamic values
- 🎨 **Language selector component**: Beautiful dropdown for language switching

## Usage

### Basic Translation

```jsx
import { useI18n } from '../context/I18nContext';

function MyComponent() {
  const { t } = useI18n();
  
  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('heroSubtitle')}</p>
    </div>
  );
}
```

### Translation with Interpolation

```jsx
function CartComponent() {
  const { t } = useI18n();
  const itemCount = 5;
  
  return (
    <div>
      <p>{t('cartCount', { count: itemCount })}</p>
      {/* Output: "5 items in cart" (English) */}
    </div>
  );
}
```

### Language Selector Component

```jsx
import { LanguageSelector } from '../components/ui';

function Header() {
  return (
    <header>
      <LanguageSelector size="medium" />
    </header>
  );
}
```

## Available Languages

| Language | Code | Flag | Name |
|----------|------|------|------|
| English | `en` | 🇺🇸 | English |
| Italian | `it` | 🇮🇹 | Italiano |
| German | `de` | 🇩🇪 | Deutsch |

## Translation Keys

The system includes translations for:

- **Common UI elements**: Loading, error, success messages
- **Navigation**: Home, menu, cart, login, etc.
- **Product-related**: Products, categories, prices, cart
- **Authentication**: Login, signup, form validation
- **Dashboard**: Admin and waiter dashboard elements
- **Orders**: Order status, management
- **Form validation**: Error messages
- **Time and currency**: Formatting utilities

## Adding New Languages

1. Create a new translation file in `src/i18n/locales/` (e.g., `fr.js`)
2. Add the language to the `LANGUAGES` object in `src/i18n/index.js`
3. The language selector will automatically include the new language

Example:
```javascript
// src/i18n/locales/fr.js
export default {
  welcome: 'Bienvenue',
  home: 'Accueil',
  // ... more translations
};

// src/i18n/index.js
import fr from './locales/fr.js';

export const LANGUAGES = {
  en: { name: 'English', flag: '🇺🇸', translations: en },
  it: { name: 'Italiano', flag: '🇮🇹', translations: it },
  de: { name: 'Deutsch', flag: '🇩🇪', translations: de },
  fr: { name: 'Français', flag: '🇫🇷', translations: fr } // New language
};
```

## Adding New Translation Keys

1. Add the key to all language files in `src/i18n/locales/`
2. Use the key in your components with the `t()` function

Example:
```javascript
// Add to all locale files
export default {
  // ... existing translations
  newFeature: 'New Feature', // en
  newFeature: 'Nuova Funzionalità', // it
  newFeature: 'Neue Funktion', // de
};

// Use in component
const { t } = useI18n();
return <div>{t('newFeature')}</div>;
```

## Utilities

The i18n system includes several utility functions:

- `formatDate(date, locale)` - Format dates according to locale
- `formatNumber(number, locale)` - Format numbers according to locale
- `formatCurrency(amount, locale, currency)` - Format currency
- `pluralize(count, singular, plural)` - Basic pluralization

## Best Practices

1. **Always use translation keys**: Don't hardcode text in components
2. **Use descriptive keys**: Make keys self-explanatory (e.g., `heroTitle` instead of `title`)
3. **Group related keys**: Use prefixes for related translations (e.g., `cart.`, `order.`)
4. **Test all languages**: Ensure translations work correctly in all supported languages
5. **Handle missing keys gracefully**: The system will show the key name if translation is missing

## Context Provider

The i18n system is provided through `I18nProvider` in the main app:

```jsx
// src/index.jsx
import { I18nProvider } from './context/I18nContext';

createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <I18nProvider>
      {/* Your app components */}
    </I18nProvider>
  </ErrorBoundary>
);
```

This ensures all components have access to the translation functions and language state. 