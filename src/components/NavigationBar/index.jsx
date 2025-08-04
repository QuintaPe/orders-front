import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui';
import './styles.css';

function NavigationBar() {
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();
    const { getCartCount } = useCart();

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
                    aria-label="Ir al inicio"
                >
                    <span className="logo-text">🍺 BarApp</span>
                </button>
            </div>

            <div className="nav-right">
                <button
                    className="nav-button nav-button--cart"
                    onClick={handleCartClick}
                    aria-label="Ver carrito"
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
                        aria-label="Menú de usuario"
                    >
                        <User size={24} />
                    </button>
                )}
            </div>
        </nav>
    );
}

export default NavigationBar; 