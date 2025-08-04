import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../layouts/index.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { Button, Badge, EmptyState, useToast } from '../../components/ui';
import { OrdersRepository } from '../../modules/index.js';
import './styles.css';

function CartPage() {
    const navigate = useNavigate();
    const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
    const toast = useToast();
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
            toast.showSuccess('Pedido creado exitosamente');
            onComplete();
        } catch (error) {
            console.error('Error creating order:', error);
            const errorMessage = error.message || 'Error al crear el pedido. Por favor, inténtalo de nuevo.';
            toast.showError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Layout title="Carrito" showBack={true}>
            <div className="cart-page">
                {cartItems.length === 0 ? (
                    <EmptyState
                        icon="🛒"
                        title="Tu carrito está vacío"
                        description="Agrega algunos productos deliciosos para comenzar"
                        actionText="Ver Menú"
                        onAction={handleBackToMenu}
                    />
                ) : (
                    <>
                        <div className="cart-items">
                            {cartItems.map((item) => (
                                <div key={item.id} className="cart-item">
                                    <div className="cart-item-image">
                                        <img
                                            src={item.image || '/placeholder-food.jpg'}
                                            alt={item.name}
                                            className="item-image"
                                        />
                                    </div>
                                    <div className="cart-item-details">
                                        <h3 className="cart-item-name">{item.name}</h3>
                                        <p className="cart-item-price">€{item.price}</p>
                                        <div className="cart-item-controls">
                                            <Button
                                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                variant="outline"
                                                size="small"
                                                className="quantity-button"
                                            >
                                                -
                                            </Button>
                                            <Badge variant="primary" size="medium" className="quantity-display">
                                                {item.quantity}
                                            </Badge>
                                            <Button
                                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                variant="outline"
                                                size="small"
                                                className="quantity-button"
                                            >
                                                +
                                            </Button>
                                            <Button
                                                onClick={() => handleRemoveFromCart(item.id)}
                                                variant="danger"
                                                size="small"
                                                className="remove-button"
                                            >
                                                Eliminar
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="cart-summary">
                            <div className="cart-total">
                                <span className="total-label">Total:</span>
                                <span className="total-amount">€{getCartTotal().toFixed(2)}</span>
                            </div>
                            <div className="cart-actions">
                                <Button
                                    onClick={clearCart}
                                    variant="outline"
                                    size="medium"
                                    className="clear-cart-button"
                                >
                                    Vaciar Carrito
                                </Button>
                                <Button
                                    onClick={handleSubmit}
                                    variant="primary"
                                    size="medium"
                                    className="checkout-button"
                                    loading={isSubmitting}
                                >
                                    Realizar Pedido
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </Layout>
    );
}

export default CartPage; 