import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../context/I18nContext.jsx';
import Layout from '../../layouts/index.jsx';
import SearchBar from '../../components/ui/SearchBar/index.jsx';
import CategoryFilter from '../../components/CategoryFilter/index.jsx';
import ProductGrid from '../../components/ProductGrid/index.jsx';
import AdvancedFilters from '../../components/AdvancedFilters/index.jsx';
import LoadingSpinner from '../../components/ui/LoadingSpinner/index.jsx';
import FloatingCartButton from '../../components/FloatingCartButton/index.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { useDeviceType } from '../../hooks/useDeviceType.js';
import { ProductsRepository, CategoriesRepository } from '../../modules/index.js';
import './styles.css';

function MenuPage() {
    const navigate = useNavigate();
    const { getCartCount } = useCart();
    const { isMobile } = useDeviceType();
    const { t } = useI18n();

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
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
    }, [products, selectedCategory, searchTerm, priceRange, sortBy]);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const handleCategorySelect = (category) => {
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
                    <SearchBar onSearch={handleSearch} />

                    <AdvancedFilters
                        onPriceRangeChange={handlePriceRangeChange}
                        onSortChange={handleSortChange}
                        onViewChange={handleViewModeChange}
                        viewMode={viewMode}
                        priceRange={priceRange}
                        sortBy={sortBy}
                    />

                    <CategoryFilter
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onSelectCategory={handleCategorySelect}
                    />

                    <ProductGrid
                        products={filteredProducts}
                        title={selectedCategory ? selectedCategory.name : t('allProducts')}
                        viewMode={viewMode}
                    />
                </div>

                {/* Floating cart button */}
                <FloatingCartButton />
            </div>
        </Layout>
    );
}

export default MenuPage; 