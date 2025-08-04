import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../layouts/index.jsx';
import SearchBar from '../../components/ui/SearchBar/index.jsx';
import CategoryFilter from '../../components/CategoryFilter/index.jsx';
import ProductGrid from '../../components/ProductGrid/index.jsx';
import LoadingSpinner from '../../components/ui/LoadingSpinner/index.jsx';
import { Button, Badge } from '../../components/ui';
import { useCart } from '../../context/CartContext.jsx';
import { useDeviceType } from '../../hooks/useDeviceType.js';
import { ProductsRepository, CategoriesRepository } from '../../modules/index.js';
import './styles.css';

function MenuPage() {
    const navigate = useNavigate();
    const { getCartCount } = useCart();
    const { isMobile } = useDeviceType();

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

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
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const handleCartClick = () => {
        navigate('/cart');
    };

    if (loading) {
        return (
            <Layout title="Menú" showBack={true}>
                <LoadingSpinner />
            </Layout>
        );
    }

    const cartCount = getCartCount();

    return (
        <Layout title="Menú" showBack={true}>
            <div className="menu-page">
                <SearchBar onSearch={handleSearch} />

                <CategoryFilter
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={handleCategorySelect}
                />

                <ProductGrid
                    products={filteredProducts}
                    title={selectedCategory ? selectedCategory.name : "Todos los Productos"}
                />

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
            </div>
        </Layout>
    );
}

export default MenuPage; 