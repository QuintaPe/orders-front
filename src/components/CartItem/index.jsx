import React from 'react';
import { useI18n } from '../../context/I18nContext.jsx';
import { Plus, Minus, Trash2 } from 'lucide-react';
import './styles.css';

function CartItem({ item, onQuantityChange, onRemove }) {
    const { t } = useI18n();

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

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity <= 0) {
            onRemove(item.id);
        } else {
            onQuantityChange(item.id, newQuantity);
        }
    };

    return (
        <div className="cart-item">
            <div className="cart-item-content">
                <div className="cart-item-image">
                    <div
                        className="cart-item-icon"
                        style={{ backgroundColor: getProductColor(item.category) }}
                    >
                        {getProductIcon(item.category)}
                    </div>
                </div>

                <div className="cart-item-info">
                    <div className="cart-item-header">
                        <h3 className="cart-item-name">{item.name}</h3>
                        <button
                            className="remove-item-btn"
                            onClick={() => onRemove(item.id)}
                            aria-label={t('remove')}
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>

                    <div className="cart-item-price">
                        {formatPrice(item.price)} {t('each')}
                    </div>

                    <div className="cart-item-controls">
                        <div className="quantity-selector">
                            <button
                                className="quantity-btn quantity-btn--minus"
                                onClick={() => handleQuantityChange(item.quantity - 1)}
                                disabled={item.quantity <= 1}
                            >
                                <Minus size={16} />
                            </button>
                            <span className="quantity-value">{item.quantity}</span>
                            <button
                                className="quantity-btn quantity-btn--plus"
                                onClick={() => handleQuantityChange(item.quantity + 1)}
                                disabled={item.quantity >= 99}
                            >
                                <Plus size={16} />
                            </button>
                        </div>

                        <div className="cart-item-total">
                            <span className="total-label">{t('subtotal')}:</span>
                            <span className="total-amount">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItem; 