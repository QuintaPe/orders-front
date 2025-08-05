import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../context/I18nContext.jsx';
import Layout from '../../layouts/index.jsx';
import HeroSection from '../../components/HeroSection/index.jsx';
import SearchBar from '../../components/ui/SearchBar/index.jsx';
import CategoryFilter from '../../components/CategoryFilter/index.jsx';
import PopularSection from '../../components/PopularSection/index.jsx';
import ProductGrid from '../../components/ProductGrid/index.jsx';
import LoadingSpinner from '../../components/ui/LoadingSpinner/index.jsx';
import { Button, Badge, Card } from '../../components/ui';
import { useToast } from '../../components/ui';
import { useCart } from '../../context/CartContext.jsx';
import { useDeviceType } from '../../hooks/useDeviceType.js';
import { ProductsRepository, CategoriesRepository } from '../../modules/index.js';
import './styles.css';

function HomePage() {
    const navigate = useNavigate();
    const { getCartCount } = useCart();
    const { isMobile, isTablet, isDesktop } = useDeviceType();
    const toast = useToast();
    const { t } = useI18n();

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAllProducts, setShowAllProducts] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                // Load categories and products using repositories
                const [categoriesData, productsData] = await Promise.all([
                    CategoriesRepository.getCategories(),
                    ProductsRepository.getProducts()
                ]);

                setCategories(categoriesData);
                setProducts(productsData);
                setFilteredProducts(productsData);
            } catch (error) {
                console.error('Error loading data:', error);
                toast.showError(t('errorLoadingData'));
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    // Filter products based on category and search
    useEffect(() => {
        let filtered = products;

        // Filter by category
        if (selectedCategory) {
            filtered = filtered.filter(product =>
                product.category === selectedCategory.name
            );
        }

        // Filter by search term
        if (searchTerm.trim()) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredProducts(filtered);
    }, [products, selectedCategory, searchTerm]);

    const handleSearch = (term) => {
        setSearchTerm(term);
        setShowAllProducts(false);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setShowAllProducts(false);
    };

    const handleViewAll = () => {
        setShowAllProducts(true);
        setSelectedCategory(null);
        setSearchTerm('');
    };

    const handleCartClick = () => {
        navigate('/cart');
    };

    if (loading) {
        return (
            <Layout title="Bekasi" location={true}>
                <LoadingSpinner />
            </Layout>
        );
    }

    const cartCount = getCartCount();

    return (
        <Layout title="Bekasi" location={true}>
            <HeroSection />

            <SearchBar onSearch={handleSearch} />

            <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={handleCategorySelect}
            />

            {showAllProducts ? (
                <ProductGrid
                    products={filteredProducts}
                    title={t('allProducts')}
                />
            ) : (
                <PopularSection
                    products={filteredProducts}
                    title={selectedCategory ? selectedCategory.name : t('popular')}
                    showViewAll={!selectedCategory && filteredProducts.length > 4}
                    onViewAll={handleViewAll}
                />
            )}

            {/* Cart button - only show on mobile */}
            {isMobile && (
                <div className="cart-button-container">
                    <Button
                        onClick={handleCartClick}
                        variant="primary"
                        size="large"
                        className="cart-button"
                    >
                        🛒
                        {cartCount > 0 && (
                            <Badge variant="danger" size="small" className="cart-count">
                                {cartCount}
                            </Badge>
                        )}
                    </Button>
                </div>
            )}
        </Layout>
    );
}

export default HomePage; 