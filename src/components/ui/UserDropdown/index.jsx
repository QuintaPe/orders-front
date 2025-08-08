import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Shield, Users, Package, ClipboardList } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext.jsx';
import { useI18n } from '../../../context/I18nContext.jsx';
import './styles.css';

function UserDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { user, logout } = useAuth();
    const { t } = useI18n();
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Error during logout:', error);
        } finally {
            setIsOpen(false);
        }
    };

    const handleNavigate = (path) => {
        navigate(path);
        setIsOpen(false);
    };

    const getRoleOptions = () => {
        if (!user) return [];

        const baseOptions = [
            {
                label: t('profile'),
                icon: User,
                onClick: () => handleNavigate('/profile')
            }
        ];

        // Opciones específicas según el rol
        switch (user.role) {
            case 'admin':
                return [
                    ...baseOptions,
                    {
                        label: t('adminDashboard'),
                        icon: Shield,
                        onClick: () => handleNavigate('/admin-dashboard')
                    },
                    {
                        label: t('userManagement'),
                        icon: Users,
                        onClick: () => handleNavigate('/admin-dashboard?tab=users')
                    },
                    {
                        label: t('productManagement'),
                        icon: Package,
                        onClick: () => handleNavigate('/admin-dashboard?tab=products')
                    },
                    {
                        label: t('orderManagement'),
                        icon: ClipboardList,
                        onClick: () => handleNavigate('/admin-dashboard?tab=orders')
                    }
                ];
            case 'waiter':
                return [
                    ...baseOptions
                    // Removida la opción del panel de camarero
                ];
            case 'manager':
                return [
                    ...baseOptions,
                    {
                        label: t('adminDashboard'),
                        icon: Shield,
                        onClick: () => handleNavigate('/admin-dashboard')
                    },
                    {
                        label: t('orderManagement'),
                        icon: ClipboardList,
                        onClick: () => handleNavigate('/admin-dashboard?tab=orders')
                    }
                ];
            default:
                return baseOptions;
        }
    };

    const roleOptions = getRoleOptions();

    if (!user) {
        return null;
    }

    return (
        <div className="user-dropdown" ref={dropdownRef}>
            <button
                className="user-dropdown-trigger"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={t('userMenu')}
                aria-expanded={isOpen}
            >
                <User size={24} />
                <span className="user-name">{user.name || user.username}</span>
            </button>

            {isOpen && (
                <div className="user-dropdown-menu">
                    <div className="user-dropdown-header">
                        <div className="user-info">
                            <div className="user-avatar">
                                <User size={20} />
                            </div>
                            <div className="user-details">
                                <span className="user-full-name">{user.name || user.username}</span>
                                <span className="user-role">{t(user.role || 'user')}</span>
                            </div>
                        </div>
                    </div>

                    <div className="user-dropdown-options">
                        {roleOptions.map((option, index) => {
                            const IconComponent = option.icon;
                            return (
                                <button
                                    key={index}
                                    className="user-dropdown-option"
                                    onClick={option.onClick}
                                >
                                    <IconComponent size={18} />
                                    <span>{option.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="user-dropdown-divider"></div>

                    <div className="user-dropdown-options">
                        <button
                            className="user-dropdown-option user-dropdown-option--logout"
                            onClick={handleLogout}
                        >
                            <LogOut size={18} />
                            <span>{t('logout')}</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserDropdown; 