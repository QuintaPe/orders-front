import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../layouts/index.jsx';
import { Button } from '../../components/ui';
import './styles.css';

function NotFoundPage() {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <Layout title="Página no encontrada">
            <div className="not-found-page">
                <div className="not-found-content">
                    <div className="not-found-icon">404</div>
                    <h1 className="not-found-title">Página no encontrada</h1>
                    <p className="not-found-description">
                        Lo sentimos, la página que buscas no existe o ha sido movida.
                    </p>
                    <div className="not-found-actions">
                        <Button
                            onClick={handleGoBack}
                            variant="outline"
                            size="medium"
                            className="back-button"
                        >
                            Volver
                        </Button>
                        <Button
                            onClick={handleGoHome}
                            variant="primary"
                            size="medium"
                            className="home-button"
                        >
                            Ir al Inicio
                        </Button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default NotFoundPage; 