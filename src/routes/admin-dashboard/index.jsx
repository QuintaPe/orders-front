import React, { useState, useEffect } from 'react';
import { Users, Package, Tags, ClipboardList } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useI18n } from '../../context/I18nContext.jsx';
import LoadingSpinner from '../../components/ui/LoadingSpinner/index.jsx';
import DashboardNav from '../../components/DashboardNav/index.jsx';
import {
    UsersRepository,
    ProductsRepository,
    CategoriesRepository,
    OrdersRepository
} from '../../modules/index.js';
import './styles.css';
import { useNavigate } from 'react-router-dom';

function AdminDashboardPage() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingItem, setUpdatingItem] = useState(null);
    const { isAuthenticated } = useAuth();
    const { t } = useI18n();
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



    const deleteUser = async (userId) => {
        if (!confirm(t('confirmDeleteUser'))) return;

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
        if (!confirm(t('confirmDeleteProduct'))) return;

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
        if (!confirm(t('confirmDeleteCategory'))) return;

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
        if (!confirm(t('confirmDeleteOrder'))) return;

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
            case 'admin': return t('admin');
            case 'manager': return t('manager');
            case 'waiter': return t('waiter');
            default: return role;
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="admin-dashboard">
            <title>{t('adminDashboard')}</title>
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
                                    <Users className="h-6 w-6" />
                                </div>
                                <div className="stat-info">
                                    <p className="stat-label">{t('users')}</p>
                                    <p className="stat-value">{users.length}</p>
                                </div>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-content">
                                <div className="stat-icon stat-icon-products">
                                    <Package className="h-6 w-6" />
                                </div>
                                <div className="stat-info">
                                    <p className="stat-label">{t('products')}</p>
                                    <p className="stat-value">{products.length}</p>
                                </div>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-content">
                                <div className="stat-icon stat-icon-categories">
                                    <Tags className="h-6 w-6" />
                                </div>
                                <div className="stat-info">
                                    <p className="stat-label">{t('categories')}</p>
                                    <p className="stat-value">{categories.length}</p>
                                </div>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-content">
                                <div className="stat-icon stat-icon-orders">
                                    <ClipboardList className="h-6 w-6" />
                                </div>
                                <div className="stat-info">
                                    <p className="stat-label">{t('orders')}</p>
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
                            <h2 className="data-title">{t('users')}</h2>
                        </div>
                        <div className="data-table">
                            <table className="table">
                                <thead className="table-header">
                                    <tr>
                                        <th className="table-th">{t('username')}</th>
                                        <th className="table-th">{t('firstName')}</th>
                                        <th className="table-th">{t('role')}</th>
                                        <th className="table-th">{t('actions')}</th>
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
                                                    {updatingItem === user.id ? t('deleting') : t('delete')}
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
                            <h2 className="data-title">{t('products')}</h2>
                        </div>
                        <div className="data-table">
                            <table className="table">
                                <thead className="table-header">
                                    <tr>
                                        <th className="table-th">{t('name')}</th>
                                        <th className="table-th">{t('price')}</th>
                                        <th className="table-th">{t('category')}</th>
                                        <th className="table-th">{t('actions')}</th>
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
                                                    {updatingItem === product.id ? t('deleting') : t('delete')}
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
                            <h2 className="data-title">{t('categories')}</h2>
                        </div>
                        <div className="data-table">
                            <table className="table">
                                <thead className="table-header">
                                    <tr>
                                        <th className="table-th">{t('name')}</th>
                                        <th className="table-th">{t('description')}</th>
                                        <th className="table-th">{t('actions')}</th>
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
                                                    {updatingItem === category.id ? t('deleting') : t('delete')}
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
                            <h2 className="data-title">{t('orders')}</h2>
                        </div>
                        <div className="data-table">
                            <table className="table">
                                <thead className="table-header">
                                    <tr>
                                        <th className="table-th">{t('table')}</th>
                                        <th className="table-th">{t('status')}</th>
                                        <th className="table-th">{t('total')}</th>
                                        <th className="table-th">{t('date')}</th>
                                        <th className="table-th">{t('actions')}</th>
                                    </tr>
                                </thead>
                                <tbody className="table-body">
                                    {orders.map((order) => (
                                        <tr key={order.id} className="table-row">
                                            <td className="table-td">{t('tableNumber', { number: order.table_number })}</td>
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
                                                    {updatingItem === order.id ? t('deleting') : t('delete')}
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
        case 'pending': return 'pending';
        case 'preparing': return 'preparing';
        case 'ready': return 'ready';
        case 'delivered': return 'delivered';
        case 'cancelled': return 'cancelled';
        default: return status;
    }
};

export default AdminDashboardPage; 