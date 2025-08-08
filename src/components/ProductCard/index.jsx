import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';
import { useI18n } from '../../context/I18nContext.jsx';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import './styles.css';

export default function ProductCard({ product, viewMode = 'grid' }) {
    const navigate = useNavigate();
    const { addToCart, getCartItemQuantity } = useCart();
    const { t } = useI18n();
    const [quantity, setQuantity] = useState(1);
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    const handleCardClick = (e) => {
        // Evitar navegación si se hace clic en los controles del carrito
        if (e.target.closest('.product-cart-controls')) {
            return;
        }
        navigate(`/product/${product.id}`);
    };

    const handleAddToCart = async (e) => {
        e.stopPropagation();
        setIsAddingToCart(true);

        // Simular un pequeño delay para feedback visual
        setTimeout(() => {
            addToCart(product, quantity);
            setQuantity(1); // Reset quantity after adding
            setIsAddingToCart(false);
        }, 150);
    };

    const handleQuantityChange = (e, newQuantity) => {
        e.stopPropagation();
        if (newQuantity >= 1 && newQuantity <= 99) {
            setQuantity(newQuantity);
        }
    };

    const formatPrice = (price) => {
        return typeof price === 'number' ? `$${price.toFixed(2)}` : '$0.00';
    };

    const getProductIcon = (category) => {
        const icons = {
            'Bebidas': '🥤',
            'Postres': '🍰',
            'Entradas': '🥗',
            'Platos Principales': '🍽️',
            'Aperitivos': '🍟',
            'default': '🍕'
        };
        return icons[category] || icons.default;
    };

    const getProductColor = (category) => {
        const colors = {
            'Bebidas': '#4facfe',
            'Postres': '#fa709a',
            'Entradas': '#a8edea',
            'Platos Principales': '#ff6b6b',
            'Aperitivos': '#ffd93d',
            'default': '#ff6b6b'
        };
        return colors[category] || colors.default;
    };

    const cartQuantity = getCartItemQuantity(product.id);

    return (
        <div className={`product-card product-card--${viewMode}`} onClick={handleCardClick}>
            <div className="product-card-content">
                <div className="product-image">
                    <div
                        className="product-icon"
                        style={{ backgroundColor: getProductColor(product.category) }}
                    >
                        {getProductIcon(product.category)}
                    </div>
                </div>
                <div className="product-info">
                    <div className="product-header">
                        <h3 className="product-name">{product.name}</h3>
                        {viewMode === 'list' && (
                            <div className="product-category">
                                {product.category}
                            </div>
                        )}
                    </div>
                    <div className="product-footer">
                        <span className="product-price">{formatPrice(product.price)}</span>
                        <div className="product-cart-controls">
                            {cartQuantity > 0 && (
                                <div className="quantity-display">
                                    <span className="quantity-text">{cartQuantity}</span>
                                </div>
                            )}
                            <div className="quantity-selector">
                                <button
                                    className="quantity-btn quantity-btn--minus"
                                    onClick={(e) => handleQuantityChange(e, quantity - 1)}
                                    disabled={quantity <= 1}
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="quantity-value">{quantity}</span>
                                <button
                                    className="quantity-btn quantity-btn--plus"
                                    onClick={(e) => handleQuantityChange(e, quantity + 1)}
                                    disabled={quantity >= 99}
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                            <button
                                className={`add-to-cart-btn ${isAddingToCart ? 'add-to-cart-btn--loading' : ''}`}
                                onClick={handleAddToCart}
                                disabled={isAddingToCart}
                            >
                                <ShoppingCart size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}