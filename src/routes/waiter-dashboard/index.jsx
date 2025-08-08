import React, { useState, useEffect } from 'react';
import { Clock, ChefHat, CheckCircle, CheckCircle2, Wifi, WifiOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useWebSocket } from '../../context/WebSocketContext.jsx';
import { useI18n } from '../../context/I18nContext.jsx';
import Layout from '../../layouts/index.jsx';
import LoadingSpinner from '../../components/ui/LoadingSpinner/index.jsx';
import { Button, Card, Badge, EmptyState } from '../../components/ui';
import { OrdersRepository } from '../../modules/index.js';
import './styles.css';

function WaiterDashboardPage() {
    const [loading, setLoading] = useState(true);
    const [updatingOrder, setUpdatingOrder] = useState(null);
    const { user, isAuthenticated } = useAuth();
    const { orders, setOrders, isConnected } = useWebSocket();
    const { t } = useI18n();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        // Cargar pedidos iniciales
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const data = await OrdersRepository.getOrders();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateOrderStatus = async (orderId, newStatus) => {
        setUpdatingOrder(orderId);
        try {
            await OrdersRepository.updateOrderStatus(orderId, newStatus);
            // El WebSocket se encargará de actualizar la lista automáticamente
        } catch (error) {
            console.error('Error updating order status:', error);
        } finally {
            setUpdatingOrder(null);
        }
    };



    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'status-pending';
            case 'preparing': return 'status-preparing';
            case 'ready': return 'status-ready';
            case 'delivered': return 'status-delivered';
            case 'cancelled': return 'status-cancelled';
            default: return 'status-default';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'pending': return t('pending');
            case 'preparing': return t('preparing');
            case 'ready': return t('ready');
            case 'delivered': return t('delivered');
            case 'cancelled': return t('cancelled');
            default: return status;
        }
    };

    const getNextStatus = (currentStatus) => {
        switch (currentStatus) {
            case 'pending': return 'preparing';
            case 'preparing': return 'ready';
            case 'ready': return 'delivered';
            default: return null;
        }
    };

    const getNextStatusText = (currentStatus) => {
        const nextStatus = getNextStatus(currentStatus);
        if (!nextStatus) return '';

        switch (nextStatus) {
            case 'preparing': return t('markAsPreparing');
            case 'ready': return t('markAsReady');
            case 'delivered': return t('markAsDelivered');
            default: return t('nextStatus');
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="waiter-dashboard">
            <head>
                <title>{t('waiterDashboard')}</title>
            </head>
            {/* Content */}
            <div className="dashboard-content">
                {/* Stats */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-content">
                            <div className="stat-icon stat-icon-pending">
                                <Clock className="h-6 w-6" />
                            </div>
                            <div className="stat-info">
                                <p className="stat-label">{t('pending')}</p>
                                <p className="stat-value">
                                    {orders.filter(order => order.status === 'pending').length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-content">
                            <div className="stat-icon stat-icon-preparing">
                                <ChefHat className="h-6 w-6" />
                            </div>
                            <div className="stat-info">
                                <p className="stat-label">{t('preparing')}</p>
                                <p className="stat-value">
                                    {orders.filter(order => order.status === 'preparing').length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-content">
                            <div className="stat-icon stat-icon-ready">
                                <CheckCircle className="h-6 w-6" />
                            </div>
                            <div className="stat-info">
                                <p className="stat-label">{t('ready')}</p>
                                <p className="stat-value">
                                    {orders.filter(order => order.status === 'ready').length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-content">
                            <div className="stat-icon stat-icon-delivered">
                                <CheckCircle2 className="h-6 w-6" />
                            </div>
                            <div className="stat-info">
                                <p className="stat-label">{t('delivered')}</p>
                                <p className="stat-value">
                                    {orders.filter(order => order.status === 'delivered').length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Orders List */}
                <div className="orders-container">
                    <div className="orders-header">
                        <h2 className="orders-title">{t('orders')}</h2>
                    </div>
                    <div className="orders-list">
                        {orders.length === 0 ? (
                            <EmptyState
                                icon="📋"
                                title={t('noOrders')}
                                description={t('noOrdersDescription')}
                            />
                        ) : (
                            orders.map((order) => (
                                <div key={order.id} className={`order-item ${order.isNew ? 'new-order' : ''}`}>
                                    <div className="order-content">
                                        <div className="order-header">
                                            <div className="table-info">
                                                <div className="table-number">
                                                    {order.table_number}
                                                </div>
                                            </div>
                                            <div className="order-details">
                                                <p className="table-title">
                                                    {t('tableNumber', { number: order.table_number })}
                                                </p>
                                                <p className="order-summary">
                                                    {order.products?.length || 0} {t('products')}
                                                </p>
                                                <p className="order-total">
                                                    {t('total')}: €{order.total?.toFixed(2) || '0.00'}
                                                </p>
                                            </div>
                                            <div className="order-status">
                                                <span className={`status-badge ${getStatusColor(order.status)}`}>
                                                    {getStatusText(order.status)}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Products List */}
                                        {order.products && order.products.length > 0 && (
                                            <div className="products-list">
                                                <div className="products-content">
                                                    {order.products.map((product, index) => (
                                                        <div key={index} className="product-item">
                                                            <span className="product-quantity">{product.quantity}x {product.name}</span>
                                                            <span className="product-price">€{(product.price * product.quantity).toFixed(2)}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="order-actions">
                                        {getNextStatus(order.status) && (
                                            <button
                                                onClick={() => handleUpdateOrderStatus(order.id, getNextStatus(order.status))}
                                                disabled={updatingOrder === order.id}
                                                className="action-button"
                                            >
                                                {updatingOrder === order.id ? t('updating') : getNextStatusText(order.status)}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WaiterDashboardPage; 