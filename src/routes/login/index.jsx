import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useI18n } from '../../context/I18nContext.jsx';
import Layout from '../../layouts/index.jsx';
import LoadingSpinner from '../../components/ui/LoadingSpinner/index.jsx';
import { Input, Button, Card } from '../../components/ui';
import { AuthRepository } from '../../modules/index.js';
import './styles.css';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login, error } = useAuth();
    const navigate = useNavigate();
    const { t } = useI18n();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const result = await login(username, password);

        if (result.success) {
            // Redirigir según el rol del usuario
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            if (user.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/waiter/dashboard');
            }
        }

        setIsLoading(false);
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Layout title={t('loginTitle')}>
            <div className="login-container">
                <Card className="login-card" padding="large" shadow="large">
                    {/* Header */}
                    <div className="login-header">
                        <div className="login-icon">
                            <User className="h-8 w-8 text-white" />
                        </div>
                        <h2 className="login-title">
                            {t('welcome')}
                        </h2>
                        <p className="login-subtitle">
                            {t('loginSubtitle')}
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="login-form">
                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="username" className="form-label">
                                {t('username')}
                            </label>
                            <Input
                                id="username"
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder={t('usernamePlaceholder')}
                                fullWidth
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="form-label">
                                {t('password')}
                            </label>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={t('passwordPlaceholder')}
                                fullWidth
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            variant="primary"
                            size="large"
                            fullWidth
                        >
                            {isLoading ? t('signingIn') : t('signIn')}
                        </Button>
                    </form>

                    {/* Demo Credentials */}
                    <div className="demo-credentials">
                        <h3 className="demo-title">{t('demoCredentials')}</h3>
                        <div className="demo-list">
                            <div>
                                <strong>{t('waiter')}:</strong> waiter1 / password123
                            </div>
                            <div>
                                <strong>{t('manager')}:</strong> manager / password123
                            </div>
                            <div>
                                <strong>{t('admin')}:</strong> admin / password123
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </Layout>
    );
}

export default LoginPage; 