import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Package, Tags, ClipboardList } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import Layout from '../../layouts/index.jsx';
import LoadingSpinner from '../../components/ui/LoadingSpinner/index.jsx';
import DashboardNav from '../../components/DashboardNav/index.jsx';
import {
    UsersRepository,
    ProductsRepository,
    CategoriesRepository,
    OrdersRepository
} from '../../modules/index.js';
import './styles.css';

function AdminDashboardPage() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingItem, setUpdatingItem] = useState(null);
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        fetchDashboardData();
    }, [isAuthenticated, navigate]);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            const [usersData, productsData, categoriesData, ordersData] = await Promise.all([
                UsersRepository.getUsers(),
                ProductsRepository.getProducts(),
                CategoriesRepository.getCategories(),
                OrdersRepository.getOrders()
            ]);

            setUsers(usersData);
            setProducts(productsData);
            setCategories(categoriesData);
            setOrders(ordersData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const deleteUser = async (userId) => {
        if (!confirm('¿Estás seguro de que quieres eliminar este usuario?')) return;

        setUpdatingItem(userId);
        try {
            await UsersRepository.deleteUser(userId);
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        } finally {
            setUpdatingItem(null);
        }
    };

    const deleteProduct = async (productId) => {
        if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) return;

        setUpdatingItem(productId);
        try {
            await ProductsRepository.deleteProduct(productId);
            setProducts(products.filter(product => product.id !== productId));
        } catch (error) {
            console.error('Error deleting product:', error);
        } finally {
            setUpdatingItem(null);
        }
    };

    const deleteCategory = async (categoryId) => {
        if (!confirm('¿Estás seguro de que quieres eliminar esta categoría?')) return;

        setUpdatingItem(categoryId);
        try {
            await CategoriesRepository.deleteCategory(categoryId);
            setCategories(categories.filter(category => category.id !== categoryId));
        } catch (error) {
            console.error('Error deleting category:', error);
        } finally {
            setUpdatingItem(null);
        }
    };

    const deleteOrder = async (orderId) => {
        if (!confirm('¿Estás seguro de que quieres eliminar este pedido?')) return;

        setUpdatingItem(orderId);
        try {
            await OrdersRepository.deleteOrder(orderId);
            setOrders(orders.filter(order => order.id !== orderId));
        } catch (error) {
            console.error('Error deleting order:', error);
        } finally {
            setUpdatingItem(null);
        }
    };

    const getRoleColor = (role) => {
        switch (role) {
            case 'admin': return 'role-admin';
            case 'manager': return 'role-manager';
            case 'waiter': return 'role-waiter';
            default: return 'role-default';
        }
    };

    const getRoleText = (role) => {
        switch (role) {
            case 'admin': return 'Administrador';
            case 'manager': return 'Gerente';
            case 'waiter': return 'Camarero';
            default: return role;
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <Layout title="Dashboard Administrador">
            <div className="admin-dashboard">
                {/* Header */}
                <div className="dashboard-header">
                    <div className="header-content">
                        <div>
                            <h1 className="dashboard-title">
                                Dashboard Administrador
                            </h1>
                            <p className="dashboard-subtitle">
                                Bienvenido, {user?.name || user?.username}
                            </p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="logout-button"
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="dashboard-nav">
                    <div className="nav-content">
                        <DashboardNav activeTab={activeTab} onTabChange={setActiveTab} />
                    </div>
                </div>

                {/* Content */}
                <div className="dashboard-content">
                    {/* Dashboard Overview */}
                    {activeTab === 'dashboard' && (
                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-content">
                                    <div className="stat-icon stat-icon-users">
                                        <Users className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div className="stat-info">
                                        <p className="stat-label">Usuarios</p>
                                        <p className="stat-value">{users.length}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="stat-card">
                                <div className="stat-content">
                                    <div className="stat-icon stat-icon-products">
                                        <Package className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div className="stat-info">
                                        <p className="stat-label">Productos</p>
                                        <p className="stat-value">{products.length}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="stat-card">
                                <div className="stat-content">
                                    <div className="stat-icon stat-icon-categories">
                                        <Tags className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <div className="stat-info">
                                        <p className="stat-label">Categorías</p>
                                        <p className="stat-value">{categories.length}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="stat-card">
                                <div className="stat-content">
                                    <div className="stat-icon stat-icon-orders">
                                        <ClipboardList className="h-6 w-6 text-orange-600" />
                                    </div>
                                    <div className="stat-info">
                                        <p className="stat-label">Pedidos</p>
                                        <p className="stat-value">{orders.length}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Users Tab */}
                    {activeTab === 'users' && (
                        <div className="data-container">
                            <div className="data-header">
                                <h2 className="data-title">Usuarios</h2>
                            </div>
                            <div className="data-table">
                                <table className="table">
                                    <thead className="table-header">
                                        <tr>
                                            <th className="table-th">Usuario</th>
                                            <th className="table-th">Nombre</th>
                                            <th className="table-th">Rol</th>
                                            <th className="table-th">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-body">
                                        {users.map((user) => (
                                            <tr key={user.id} className="table-row">
                                                <td className="table-td">{user.username}</td>
                                                <td className="table-td">{user.name}</td>
                                                <td className="table-td">
                                                    <span className={`role-badge ${getRoleColor(user.role)}`}>
                                                        {getRoleText(user.role)}
                                                    </span>
                                                </td>
                                                <td className="table-td">
                                                    <button
                                                        onClick={() => deleteUser(user.id)}
                                                        disabled={updatingItem === user.id}
                                                        className="delete-button"
                                                    >
                                                        {updatingItem === user.id ? 'Eliminando...' : 'Eliminar'}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Products Tab */}
                    {activeTab === 'products' && (
                        <div className="data-container">
                            <div className="data-header">
                                <h2 className="data-title">Productos</h2>
                            </div>
                            <div className="data-table">
                                <table className="table">
                                    <thead className="table-header">
                                        <tr>
                                            <th className="table-th">Nombre</th>
                                            <th className="table-th">Precio</th>
                                            <th className="table-th">Categoría</th>
                                            <th className="table-th">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-body">
                                        {products.map((product) => (
                                            <tr key={product.id} className="table-row">
                                                <td className="table-td">{product.name}</td>
                                                <td className="table-td">€{product.price}</td>
                                                <td className="table-td">{product.category_name}</td>
                                                <td className="table-td">
                                                    <button
                                                        onClick={() => deleteProduct(product.id)}
                                                        disabled={updatingItem === product.id}
                                                        className="delete-button"
                                                    >
                                                        {updatingItem === product.id ? 'Eliminando...' : 'Eliminar'}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Categories Tab */}
                    {activeTab === 'categories' && (
                        <div className="data-container">
                            <div className="data-header">
                                <h2 className="data-title">Categorías</h2>
                            </div>
                            <div className="data-table">
                                <table className="table">
                                    <thead className="table-header">
                                        <tr>
                                            <th className="table-th">Nombre</th>
                                            <th className="table-th">Descripción</th>
                                            <th className="table-th">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-body">
                                        {categories.map((category) => (
                                            <tr key={category.id} className="table-row">
                                                <td className="table-td">{category.name}</td>
                                                <td className="table-td">{category.description}</td>
                                                <td className="table-td">
                                                    <button
                                                        onClick={() => deleteCategory(category.id)}
                                                        disabled={updatingItem === category.id}
                                                        className="delete-button"
                                                    >
                                                        {updatingItem === category.id ? 'Eliminando...' : 'Eliminar'}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Orders Tab */}
                    {activeTab === 'orders' && (
                        <div className="data-container">
                            <div className="data-header">
                                <h2 className="data-title">Pedidos</h2>
                            </div>
                            <div className="data-table">
                                <table className="table">
                                    <thead className="table-header">
                                        <tr>
                                            <th className="table-th">Mesa</th>
                                            <th className="table-th">Estado</th>
                                            <th className="table-th">Total</th>
                                            <th className="table-th">Fecha</th>
                                            <th className="table-th">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-body">
                                        {orders.map((order) => (
                                            <tr key={order.id} className="table-row">
                                                <td className="table-td">{order.table_number}</td>
                                                <td className="table-td">
                                                    <span className={`status-badge ${getStatusColor(order.status)}`}>
                                                        {getStatusText(order.status)}
                                                    </span>
                                                </td>
                                                <td className="table-td">€{order.total?.toFixed(2) || '0.00'}</td>
                                                <td className="table-td">
                                                    {new Date(order.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="table-td">
                                                    <button
                                                        onClick={() => deleteOrder(order.id)}
                                                        disabled={updatingItem === order.id}
                                                        className="delete-button"
                                                    >
                                                        {updatingItem === order.id ? 'Eliminando...' : 'Eliminar'}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}

// Helper functions for order status
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

export default AdminDashboardPage; 