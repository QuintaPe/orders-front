import React from 'react';
import { useI18n } from '../../context/I18nContext.jsx';
import { Button } from '../ui';
import { Trash2, ShoppingBag } from 'lucide-react';
import './styles.css';

function CartSummary({
    totalAmount,
    itemCount,
    onClearCart,
    onPlaceOrder,
    isSubmitting = false
}) {
    const { t } = useI18n();

    const formatPrice = (price) => {
        return typeof price === 'number' ? `$${price.toFixed(2)}` : '$0.00';
    };

    return (
        <div className="cart-summary">
            <div className="cart-summary-content">
                <div className="cart-summary-header">
                    <h2 className="cart-summary-title">{t('orderSummary')}</h2>
                    <div className="cart-summary-count">
                        {itemCount} {itemCount === 1 ? t('item') : t('items')}
                    </div>
                </div>

                <div className="cart-summary-details">
                    <div className="summary-row">
                        <span className="summary-label">{t('subtotal')}</span>
                        <span className="summary-value">{formatPrice(totalAmount)}</span>
                    </div>
                    <div className="summary-row">
                        <span className="summary-label">{t('tax')}</span>
                        <span className="summary-value">{formatPrice(totalAmount * 0.1)}</span>
                    </div>
                    <div className="summary-divider"></div>
                    <div className="summary-row summary-row--total">
                        <span className="summary-label">{t('total')}</span>
                        <span className="summary-value">{formatPrice(totalAmount * 1.1)}</span>
                    </div>
                </div>

                <div className="cart-summary-actions">
                    <Button
                        onClick={onClearCart}
                        variant="outline"
                        size="large"
                        className="clear-cart-btn"
                        icon={<Trash2 size={18} />}
                    >
                        {t('clearCart')}
                    </Button>
                    <Button
                        onClick={onPlaceOrder}
                        variant="primary"
                        size="large"
                        className="place-order-btn"
                        loading={isSubmitting}
                        icon={<ShoppingBag size={18} />}
                    >
                        {t('placeOrder')}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CartSummary; 