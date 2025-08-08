import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useI18n } from '../../context/I18nContext.jsx';
import { LanguageSelector, ThemeToggle, UserDropdown } from '../ui';
import './styles.css';

function NavigationBar() {
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();
    const { getCartCount } = useCart();
    const { t } = useI18n();

    const handleLogoClick = () => {
        navigate('/');
    };

    const handleCartClick = () => {
        navigate('/cart');
    };

    return (
        <nav className="nav-bar">
            <div className="nav-left">
                <button
                    className="nav-logo"
                    onClick={handleLogoClick}
                    aria-label="Ir al menú"
                >
                    <span className="logo-text">🍺 BarApp</span>
                </button>
            </div>

            <div className="nav-right">
                <LanguageSelector size="small" className="nav-language-selector" />

                <ThemeToggle size="small" className="nav-theme-toggle" />

                {isAuthenticated && user ? (
                    <UserDropdown />
                ) : (
                    <button
                        className="nav-button nav-button--cart"
                        onClick={handleCartClick}
                        aria-label={t('cart')}
                    >
                        <ShoppingCart size={24} />
                        {getCartCount() > 0 && (
                            <span className="cart-badge">{getCartCount()}</span>
                        )}
                    </button>
                )}
            </div>
        </nav>
    );
}

export default NavigationBar; 