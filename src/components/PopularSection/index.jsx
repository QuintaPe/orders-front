import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../context/I18nContext.jsx';
import { Card, Tag } from '../ui';
import './styles.css';

function ProductCard({ product }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/product/${product.id}`);
    };

    const formatPrice = (price) => {
        return typeof price === 'number' ? `$${price}` : '$0';
    };

    const getProductIcon = (category) => {
        if (category === 'Bebidas') return '🥤';
        if (category === 'Postres') return '🍰';
        if (category === 'Entradas') return '🥗';
        return '🍕';
    };

    const getProductGradient = (category) => {
        if (category === 'Bebidas') return 'linear-gradient(135deg, #4facfe, #00f2fe)';
        if (category === 'Postres') return 'linear-gradient(135deg, #fa709a, #fee140)';
        if (category === 'Entradas') return 'linear-gradient(135deg, #a8edea, #fed6e3)';
        return 'linear-gradient(135deg, #ff6b6b, #ff8e8e)';
    };

    return (
        <Card
            className="product-card"
            onClick={handleClick}
            hoverable
            padding="none"
        >
            <div className="product-image">
                <div style={{
                    width: '100%',
                    height: '100%',
                    background: getProductGradient(product.category),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '24px'
                }}>
                    {getProductIcon(product.category)}
                </div>
            </div>
            <div className="product-info">
                <div className="product-name">{product.name}</div>
                <div className="product-price">{formatPrice(product.price)}</div>
                <div className="product-rating">
                    <span className="star-icon">⭐</span>
                </div>
                {product.category && (
                    <Tag variant="info" size="small">
                        {product.category}
                    </Tag>
                )}
            </div>
        </Card>
    );
}

function PopularSection({ products, title = "Popular", showViewAll = true, onViewAll }) {
    const navigate = useNavigate();
    const { t } = useI18n();

    // Get first 4 products for popular section, or all if less than 4
    const displayProducts = products.slice(0, 4);

    const handleViewAll = () => {
        if (onViewAll) {
            onViewAll();
        } else {
            navigate('/menu');
        }
    };

    return (
        <div>
            <div className="section-header">
                <h2 className="section-title">{title}</h2>
                {showViewAll && (
                    <span className="view-all" onClick={handleViewAll}>
                        {t('viewAll')}
                    </span>
                )}
            </div>
            {displayProducts.length > 0 ? (
                <div className="product-grid">
                    {displayProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div style={{
                    textAlign: 'center',
                    padding: '40px 20px',
                    color: '#666'
                }}>
                    <div style={{ fontSize: '48px', marginBottom: '20px' }}>🍕</div>
                    <h3>{t('noResults')}</h3>
                    <p>{t('searchFor')} {t('products').toLowerCase()}</p>
                </div>
            )}
        </div>
    );
}

export default PopularSection; 