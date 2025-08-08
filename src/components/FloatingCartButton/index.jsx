import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext.jsx';
import { useI18n } from '../../context/I18nContext.jsx';
import './styles.css';

function FloatingCartButton() {
    const navigate = useNavigate();
    const { getCartCount } = useCart();
    const { t } = useI18n();

    const handleClick = () => {
        navigate('/cart');
    };

    const cartCount = getCartCount();

    return (
        <button
            className="floating-cart-button"
            onClick={handleClick}
            aria-label={t('cart')}
        >
            <ShoppingCart size={24} />
            {cartCount > 0 && (
                <span className="cart-badge">
                    {cartCount > 99 ? '99+' : cartCount}
                </span>
            )}
        </button>
    );
}

export default FloatingCartButton; 