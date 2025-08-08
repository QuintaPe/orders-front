import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../context/I18nContext.jsx';
import Layout from '../../layouts/index.jsx';
import { Button } from '../../components/ui';
import './styles.css';

function NotFoundPage() {
    const navigate = useNavigate();
    const { t } = useI18n();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <Layout title={t('pageNotFound')}>
            <div className="not-found-page">
                <div className="not-found-content">
                    <div className="not-found-icon">404</div>
                    <h1 className="not-found-title">{t('pageNotFound')}</h1>
                    <p className="not-found-description">
                        {t('pageNotFoundDescription')}
                    </p>
                    <div className="not-found-actions">
                        <Button
                            onClick={handleGoBack}
                            variant="outline"
                            size="medium"
                            className="back-button"
                        >
                            {t('goBack')}
                        </Button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default NotFoundPage; 