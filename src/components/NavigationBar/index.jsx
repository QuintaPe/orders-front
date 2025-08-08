import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useI18n } from '../../context/I18nContext.jsx';
import { Button, LanguageSelector, ThemeToggle } from '../ui';
import './styles.css';

function NavigationBar() {
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();
    const { getCartCount } = useCart();
    const { t } = useI18n();

    const handleLogoClick = () => {
        navigate('/');
    };

    const handleCartClick = () => {
        navigate('/cart');
    };

    const handleUserClick = () => {
        // Aquí puedes agregar un dropdown o navegar a perfil
        if (isAuthenticated) {
            // Por ahora solo logout, pero puedes expandir esto
            logout();
        } else {
            navigate('/login');
        }
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

                {isAuthenticated && (
                    <button
                        className="nav-button nav-button--user"
                        onClick={handleUserClick}
                        aria-label={t('profile')}
                    >
                        <User size={24} />
                    </button>
                )}
            </div>
        </nav>
    );
}

export default NavigationBar; 