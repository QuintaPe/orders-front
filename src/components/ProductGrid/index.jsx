import React from 'react';
import { Card, Tag, EmptyState } from '../ui';
import { useNavigate } from 'react-router-dom';
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

function ProductGrid({ products, title = "All Products" }) {
    return (
        <div>
            <div className="section-header">
                <h2 className="section-title">{title}</h2>
            </div>
            {products.length > 0 ? (
                <div className="product-grid">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <EmptyState
                    icon="🍕"
                    title="No se encontraron productos"
                    description="Intenta seleccionar una categoría diferente o cambiar el término de búsqueda."
                />
            )}
        </div>
    );
}

export default ProductGrid; 