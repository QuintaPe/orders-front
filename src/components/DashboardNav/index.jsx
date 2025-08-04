import React from 'react';
import { LayoutDashboard, Users, Package, Tags, ClipboardList } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import './styles.css';

function DashboardNav({ activeTab, onTabChange }) {
    const { user } = useAuth();

    const tabs = [
        { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
        { id: 'users', name: 'Usuarios', icon: Users },
        { id: 'products', name: 'Productos', icon: Package },
        { id: 'categories', name: 'Categorías', icon: Tags },
        { id: 'orders', name: 'Pedidos', icon: ClipboardList }
    ];

    // Filtrar tabs según el rol del usuario
    const availableTabs = user?.role === 'admin' ? tabs : tabs.filter(tab => tab.id === 'dashboard' || tab.id === 'orders');

    return (
        <nav className="dashboard-nav">
            {availableTabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`dashboard-nav-tab ${activeTab === tab.id ? 'dashboard-nav-tab--active' : ''}`}
                    >
                        <IconComponent className="dashboard-nav-icon" size={24} />
                        <span>{tab.name}</span>
                    </button>
                );
            })}
        </nav>
    );
}

export default DashboardNav; 