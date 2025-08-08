import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useI18n } from '../../context/I18nContext.jsx';
import Layout from '../../layouts/index.jsx';
import LoadingSpinner from '../../components/ui/LoadingSpinner/index.jsx';
import { Button, Card, Badge } from '../../components/ui';
import { useCart } from '../../context/CartContext.jsx';
import { ProductsRepository } from '../../modules/index.js';

function ProductDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { t } = useI18n();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const productData = await ProductsRepository.getProduct(id);
                setProduct(productData);
            } catch (error) {
                console.error('Error loading product:', error);
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
            navigate('/cart');
        }
    };

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
        }
    };

    if (loading) {
        return (
            <div className="product-detail-page">
                <head>
                    <title>{t('product')}</title>
                </head>
                <LoadingSpinner />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="product-detail-page">
                <head>
                    <title>{t('productNotFound')}</title>
                </head>
                <div className="product-not-found">
                    <h2>{t('productNotFound')}</h2>
                    <p>El producto que buscas no existe.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="product-detail-page">
            <head>
                <title>{product.name}</title>
            </head>
            <div className="product-image-container">
                <img
                    src={product.image || '/placeholder-food.jpg'}
                    alt={product.name}
                    className="product-image"
                />
            </div>

            <div className="product-info">
                <h1 className="product-name">{product.name}</h1>
                <p className="product-category">{product.category}</p>
                <p className="product-description">{product.description}</p>

                <div className="product-price">€{product.price}</div>

                <div className="product-actions">
                    <div className="quantity-controls">
                        <Button
                            onClick={() => handleQuantityChange(quantity - 1)}
                            variant="outline"
                            size="small"
                            className="quantity-button"
                            disabled={quantity <= 1}
                        >
                            -
                        </Button>
                        <Badge variant="primary" size="medium" className="quantity-display">
                            {quantity}
                        </Badge>
                        <Button
                            onClick={() => handleQuantityChange(quantity + 1)}
                            variant="outline"
                            size="small"
                            className="quantity-button"
                        >
                            +
                        </Button>
                    </div>

                    <Button
                        onClick={handleAddToCart}
                        variant="primary"
                        size="large"
                        fullWidth
                        className="add-to-cart-button"
                    >
                        {t('addToCart')} - €{(product.price * quantity).toFixed(2)}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage; 