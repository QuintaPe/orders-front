import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useI18n } from '../../context/I18nContext.jsx';
import Layout from '../../layouts/index.jsx';
import LoadingSpinner from '../../components/ui/LoadingSpinner/index.jsx';
import { Button, Card, Badge } from '../../components/ui';
import { User, Shield, Mail, Calendar, Settings, Edit, Save, X } from 'lucide-react';
import './styles.css';

function ProfilePage() {
    const { user, isAuthenticated } = useAuth();
    const { t } = useI18n();
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                username: user.username || ''
            });
            setLoading(false);
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            // Aquí iría la lógica para actualizar el perfil
            // await updateProfile(formData);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            name: user.name || '',
            email: user.email || '',
            username: user.username || ''
        });
        setIsEditing(false);
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

    if (!isAuthenticated || !user) {
        return (
            <Layout title={t('profile')}>
                <div className="profile-page">
                    <div className="profile-error">
                        <h2>{t('accessDenied')}</h2>
                        <p>{t('pleaseLoginToViewProfile')}</p>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout title={t('profile')}>
            <div className="profile-page">
                <div className="profile-container">
                    {/* Profile Header */}
                    <div className="profile-header">
                        <div className="profile-avatar">
                            <User size={48} />
                        </div>
                        <div className="profile-info">
                            <h1 className="profile-name">{user.name || user.username}</h1>
                            <Badge
                                variant={getRoleColor(user.role)}
                                size="medium"
                                className="profile-role"
                            >
                                {getRoleText(user.role)}
                            </Badge>
                        </div>
                        <div className="profile-actions">
                            {!isEditing ? (
                                <Button
                                    onClick={() => setIsEditing(true)}
                                    variant="primary"
                                    size="medium"
                                    className="edit-button"
                                >
                                    <Edit size={18} />
                                    <span>{t('editProfile')}</span>
                                </Button>
                            ) : (
                                <div className="edit-actions">
                                    <Button
                                        onClick={handleSave}
                                        variant="success"
                                        size="small"
                                        className="save-button"
                                    >
                                        <Save size={16} />
                                        <span>{t('save')}</span>
                                    </Button>
                                    <Button
                                        onClick={handleCancel}
                                        variant="secondary"
                                        size="small"
                                        className="cancel-button"
                                    >
                                        <X size={16} />
                                        <span>{t('cancel')}</span>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Profile Content */}
                    <div className="profile-content">
                        <div className="profile-section">
                            <Card className="profile-card" padding="large" shadow="medium">
                                <div className="card-header">
                                    <h2 className="card-title">
                                        <User size={20} />
                                        <span>{t('personalInformation')}</span>
                                    </h2>
                                </div>
                                <div className="card-content">
                                    <div className="form-group">
                                        <label className="form-label">{t('fullName')}</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="form-input"
                                                placeholder={t('enterFullName')}
                                            />
                                        ) : (
                                            <p className="form-value">{user.name || t('notProvided')}</p>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">{t('username')}</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="username"
                                                value={formData.username}
                                                onChange={handleInputChange}
                                                className="form-input"
                                                placeholder={t('enterUsername')}
                                            />
                                        ) : (
                                            <p className="form-value">{user.username}</p>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">{t('email')}</label>
                                        {isEditing ? (
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="form-input"
                                                placeholder={t('enterEmail')}
                                            />
                                        ) : (
                                            <p className="form-value">{user.email || t('notProvided')}</p>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        </div>

                        <div className="profile-section">
                            <Card className="profile-card" padding="large" shadow="medium">
                                <div className="card-header">
                                    <h2 className="card-title">
                                        <Shield size={20} />
                                        <span>{t('accountInformation')}</span>
                                    </h2>
                                </div>
                                <div className="card-content">
                                    <div className="info-grid">
                                        <div className="info-item">
                                            <div className="info-icon">
                                                <Shield size={16} />
                                            </div>
                                            <div className="info-content">
                                                <label className="info-label">{t('role')}</label>
                                                <p className="info-value">{getRoleText(user.role)}</p>
                                            </div>
                                        </div>

                                        <div className="info-item">
                                            <div className="info-icon">
                                                <Calendar size={16} />
                                            </div>
                                            <div className="info-content">
                                                <label className="info-label">{t('memberSince')}</label>
                                                <p className="info-value">
                                                    {user.created_at ?
                                                        new Date(user.created_at).toLocaleDateString() :
                                                        t('notAvailable')
                                                    }
                                                </p>
                                            </div>
                                        </div>

                                        <div className="info-item">
                                            <div className="info-icon">
                                                <Mail size={16} />
                                            </div>
                                            <div className="info-content">
                                                <label className="info-label">{t('lastLogin')}</label>
                                                <p className="info-value">
                                                    {user.last_login ?
                                                        new Date(user.last_login).toLocaleDateString() :
                                                        t('notAvailable')
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        <div className="profile-section">
                            <Card className="profile-card" padding="large" shadow="medium">
                                <div className="card-header">
                                    <h2 className="card-title">
                                        <Settings size={20} />
                                        <span>{t('accountSettings')}</span>
                                    </h2>
                                </div>
                                <div className="card-content">
                                    <div className="settings-list">
                                        <div className="setting-item">
                                            <div className="setting-info">
                                                <h3 className="setting-title">{t('changePassword')}</h3>
                                                <p className="setting-description">{t('changePasswordDescription')}</p>
                                            </div>
                                            <Button variant="outline" size="small">
                                                {t('change')}
                                            </Button>
                                        </div>

                                        <div className="setting-item">
                                            <div className="setting-info">
                                                <h3 className="setting-title">{t('notificationSettings')}</h3>
                                                <p className="setting-description">{t('notificationSettingsDescription')}</p>
                                            </div>
                                            <Button variant="outline" size="small">
                                                {t('configure')}
                                            </Button>
                                        </div>

                                        <div className="setting-item">
                                            <div className="setting-info">
                                                <h3 className="setting-title">{t('privacySettings')}</h3>
                                                <p className="setting-description">{t('privacySettingsDescription')}</p>
                                            </div>
                                            <Button variant="outline" size="small">
                                                {t('configure')}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ProfilePage; 