import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../context/I18nContext.jsx';
import Layout from '../../layouts/index.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { EmptyState, useToast } from '../../components/ui';
import CartItem from '../../components/CartItem/index.jsx';
import CartSummary from '../../components/CartSummary/index.jsx';
import { OrdersRepository } from '../../modules/index.js';
import './styles.css';

function CartPage() {
    const navigate = useNavigate();
    const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
    const toast = useToast();
    const { t } = useI18n();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleRemoveFromCart = (productId) => {
        removeFromCart(productId);
    };

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            updateQuantity(productId, newQuantity);
        }
    };

    const handleBackToMenu = () => {
        navigate('/menu');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const orderData = {
                products: cartItems.map(item => ({
                    product_id: item.id,
                    quantity: item.quantity,
                    price: item.price
                })),
                table_number: 1
            };

            await OrdersRepository.createOrder(orderData);
            toast.showSuccess(t('orderCreatedSuccess'));
        } catch (error) {
            console.error('Error creating order:', error);
            const errorMessage = error.message || t('orderCreatedError');
            toast.showError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="cart-page">
            <title>{t('cart')}</title>
            {cartItems.length === 0 ? (
                <div className="cart-content">
                    <EmptyState
                        icon="🛒"
                        title={t('cartEmpty')}
                        description={t('cartEmptyDescription')}
                        actionText={t('viewMenu')}
                        onAction={handleBackToMenu}
                    />
                </div>
            ) : (
                <div className="cart-content">
                    <div className="cart-items-section">
                        <div className="cart-items">
                            {cartItems.map((item) => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    onQuantityChange={handleQuantityChange}
                                    onRemove={handleRemoveFromCart}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="cart-summary-section">
                        <CartSummary
                            totalAmount={getCartTotal()}
                            itemCount={cartItems.length}
                            onClearCart={clearCart}
                            onPlaceOrder={handleSubmit}
                            isSubmitting={isSubmitting}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartPage; 