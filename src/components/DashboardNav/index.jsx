import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Package, Tags, ClipboardList } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useI18n } from '../../context/I18nContext.jsx';
import './styles.css';

function DashboardNav({ activeTab, onTabChange }) {
    const { user } = useAuth();
    const { t } = useI18n();
    const location = useLocation();
    const navigate = useNavigate();

    const tabs = [
        { id: 'dashboard', name: t('dashboard'), icon: LayoutDashboard },
        { id: 'users', name: t('users'), icon: Users },
        { id: 'products', name: t('products'), icon: Package },
        { id: 'categories', name: t('categories'), icon: Tags },
        { id: 'orders', name: t('orders'), icon: ClipboardList }
    ];

    // Filtrar tabs según el rol del usuario
    const availableTabs = user?.role === 'admin' ? tabs : tabs.filter(tab => tab.id === 'dashboard' || tab.id === 'orders');

    useEffect(() => {
        // Verificar si hay un parámetro de pestaña en la URL
        const urlParams = new URLSearchParams(location.search);
        const tabParam = urlParams.get('tab');

        if (tabParam && availableTabs.some(tab => tab.id === tabParam)) {
            onTabChange(tabParam);
        }
    }, [location.search, onTabChange]);

    const handleTabChange = (tabId) => {
        onTabChange(tabId);

        // Actualizar la URL con el parámetro de pestaña
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('tab', tabId);
        navigate(`${location.pathname}?${urlParams.toString()}`, { replace: true });
    };

    if (!user) {
        return null;
    }

    return (
        <nav className="dashboard-nav">
            {availableTabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                    <button
                        key={tab.id}
                        onClick={() => handleTabChange(tab.id)}
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