import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ChefHat, CheckCircle, CheckCircle2, Wifi, WifiOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useWebSocket } from '../../context/WebSocketContext.jsx';
import { useWebSocketNotifications } from '../../hooks/useWebSocketNotifications.js';
import Layout from '../../layouts/index.jsx';
import LoadingSpinner from '../../components/ui/LoadingSpinner/index.jsx';
import { Button, Card, Badge, EmptyState } from '../../components/ui';
import { OrdersRepository } from '../../modules/index.js';
import './styles.css';

function WaiterDashboardPage() {
    const [loading, setLoading] = useState(true);
    const [updatingOrder, setUpdatingOrder] = useState(null);
    const { user, logout, isAuthenticated } = useAuth();
    const { orders, setOrders, isConnected, updateOrderStatus } = useWebSocket();
    const { requestNotificationPermission } = useWebSocketNotifications();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        // Solicitar permisos de notificación al cargar
        requestNotificationPermission();

        // Cargar pedidos iniciales
        fetchOrders();
    }, [isAuthenticated, navigate, requestNotificationPermission]);

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

    const handleLogout = async () => {
        await logout();
        navigate('/login');
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
            case 'pending': return 'Pendiente';
            case 'preparing': return 'Preparando';
            case 'ready': return 'Listo';
            case 'delivered': return 'Entregado';
            case 'cancelled': return 'Cancelado';
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

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <Layout title="Dashboard Camarero">
            <div className="waiter-dashboard">
                {/* Header */}
                <div className="dashboard-header">
                    <div className="header-content">
                        <div>
                            <h1 className="dashboard-title">
                                Dashboard Camarero
                            </h1>
                            <p className="dashboard-subtitle">
                                Bienvenido, {user?.name || user?.username}
                            </p>
                            <div className="connection-status">
                                {isConnected ? (
                                    <div className="status-connected">
                                        <Wifi className="h-4 w-4" />
                                        <span>Conectado en tiempo real</span>
                                    </div>
                                ) : (
                                    <div className="status-disconnected">
                                        <WifiOff className="h-4 w-4" />
                                        <span>Desconectado</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <Button
                            onClick={handleLogout}
                            variant="outline"
                            size="medium"
                            className="logout-button"
                        >
                            Cerrar Sesión
                        </Button>
                    </div>
                </div>

                {/* Content */}
                <div className="dashboard-content">
                    {/* Stats */}
                    <div className="stats-grid">
                        <Card className="stat-card" padding="medium" shadow="small">
                            <div className="stat-content">
                                <div className="stat-icon stat-icon-pending">
                                    <Clock className="h-6 w-6 text-yellow-600" />
                                </div>
                                <div className="stat-info">
                                    <p className="stat-label">Pendientes</p>
                                    <p className="stat-value">
                                        {orders.filter(order => order.status === 'pending').length}
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <Card className="stat-card" padding="medium" shadow="small">
                            <div className="stat-content">
                                <div className="stat-icon stat-icon-preparing">
                                    <ChefHat className="h-6 w-6 text-blue-600" />
                                </div>
                                <div className="stat-info">
                                    <p className="stat-label">Preparando</p>
                                    <p className="stat-value">
                                        {orders.filter(order => order.status === 'preparing').length}
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <Card className="stat-card" padding="medium" shadow="small">
                            <div className="stat-content">
                                <div className="stat-icon stat-icon-ready">
                                    <CheckCircle className="h-6 w-6 text-green-600" />
                                </div>
                                <div className="stat-info">
                                    <p className="stat-label">Listos</p>
                                    <p className="stat-value">
                                        {orders.filter(order => order.status === 'ready').length}
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <Card className="stat-card" padding="medium" shadow="small">
                            <div className="stat-content">
                                <div className="stat-icon stat-icon-delivered">
                                    <CheckCircle2 className="h-6 w-6 text-gray-600" />
                                </div>
                                <div className="stat-info">
                                    <p className="stat-label">Entregados</p>
                                    <p className="stat-value">
                                        {orders.filter(order => order.status === 'delivered').length}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Orders List */}
                    <div className="orders-container">
                        <div className="orders-header">
                            <h2 className="orders-title">Pedidos</h2>
                        </div>
                        <div className="orders-list">
                            {orders.length === 0 ? (
                                <EmptyState
                                    icon="📋"
                                    title="No hay pedidos"
                                    description="No hay pedidos pendientes en este momento."
                                />
                            ) : (
                                orders.map((order) => (
                                    <Card key={order.id} className="order-item" padding="medium" shadow="small">
                                        <div className="order-content">
                                            <div className="order-header">
                                                <div className="table-info">
                                                    <div className="table-number">
                                                        {order.table_number}
                                                    </div>
                                                </div>
                                                <div className="order-details">
                                                    <p className="table-title">
                                                        Mesa {order.table_number}
                                                    </p>
                                                    <p className="order-summary">
                                                        {order.products?.length || 0} productos
                                                    </p>
                                                    <p className="order-total">
                                                        Total: €{order.total?.toFixed(2) || '0.00'}
                                                    </p>
                                                </div>
                                                <div className="order-status">
                                                    <Badge
                                                        variant={order.status === 'pending' ? 'warning' :
                                                            order.status === 'preparing' ? 'info' :
                                                                order.status === 'ready' ? 'success' :
                                                                    order.status === 'delivered' ? 'default' : 'danger'}
                                                        size="small"
                                                        className="status-badge"
                                                    >
                                                        {getStatusText(order.status)}
                                                    </Badge>
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
                                                <Button
                                                    onClick={() => handleUpdateOrderStatus(order.id, getNextStatus(order.status))}
                                                    disabled={updatingOrder === order.id}
                                                    variant="primary"
                                                    size="small"
                                                    className="action-button"
                                                >
                                                    {updatingOrder === order.id ? 'Actualizando...' : 'Siguiente Estado'}
                                                </Button>
                                            )}
                                        </div>
                                    </Card>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default WaiterDashboardPage; 