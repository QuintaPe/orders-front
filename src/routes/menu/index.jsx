import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../context/I18nContext.jsx';
import Layout from '../../layouts/index.jsx';
import ProductGrid from '../../components/ProductCard/index.jsx';
import AdvancedFilters from '../../components/AdvancedFilters/index.jsx';
import LoadingSpinner from '../../components/ui/LoadingSpinner/index.jsx';
import FloatingCartButton from '../../components/FloatingCartButton/index.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { ProductsRepository, CategoriesRepository } from '../../modules/index.js';
import './styles.css';
import ProductCard from '../../components/ProductCard/index.jsx';

function MenuPage() {
    const navigate = useNavigate();
    const { getCartCount } = useCart();
    const { t } = useI18n();

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
    const [sortBy, setSortBy] = useState('name');

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
                console.error('Error loading menu data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    // Filter and sort products
    useEffect(() => {
        let filtered = products;

        // Filter by category
        if (selectedCategory && selectedCategory !== 'all') {
            filtered = filtered.filter(product =>
                product.category === selectedCategory
            );
        }

        // Filter by search term
        if (searchQuery.trim()) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Filter by price range
        filtered = filtered.filter(product =>
            product.price >= priceRange.min && product.price <= priceRange.max
        );

        // Sort products
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'price-asc':
                    return a.price - b.price;
                case 'price-desc':
                    return b.price - a.price;
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'popular':
                    return (b.rating || 0) - (a.rating || 0);
                default:
                    return 0;
            }
        });

        setFilteredProducts(filtered);
    }, [products, selectedCategory, searchQuery, priceRange, sortBy]);

    const handleSearchChange = (query) => {
        setSearchQuery(query);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const handleViewModeChange = (mode) => {
        setViewMode(mode);
    };

    const handlePriceRangeChange = (range) => {
        setPriceRange(range);
    };

    const handleSortChange = (sort) => {
        setSortBy(sort);
    };

    const handleCartClick = () => {
        navigate('/cart');
    };

    // Transform categories for the dropdown
    const categoryOptions = categories.map(category => ({
        value: category.name,
        label: category.name
    }));

    if (loading) {
        return (
            <Layout title={t('menu')} showBack={true}>
                <LoadingSpinner />
            </Layout>
        );
    }

    const cartCount = getCartCount();

    return (
        <Layout title={t('menu')} showBack={true}>
            <div className="menu-page">
                <div className="menu-content">
                    <AdvancedFilters
                        onPriceRangeChange={handlePriceRangeChange}
                        onSortChange={handleSortChange}
                        onViewChange={handleViewModeChange}
                        onSearchChange={handleSearchChange}
                        onCategoryChange={handleCategoryChange}
                        viewMode={viewMode}
                        priceRange={priceRange}
                        sortBy={sortBy}
                        searchQuery={searchQuery}
                        selectedCategory={selectedCategory}
                        categories={categoryOptions}
                    />
                    <div className="product-grid-container">
                        {filteredProducts.length > 0 ? (
                            <div className={`product-grid product-grid--${viewMode}`}>
                                {filteredProducts.map(product => (
                                    <ProductCard key={product.id} product={product} viewMode={viewMode} />
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
                </div>

                {/* Floating cart button */}
                <FloatingCartButton />
            </div>
        </Layout>
    );
}

export default MenuPage; 