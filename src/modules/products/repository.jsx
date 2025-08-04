import ApiFetch from '../../utils/apiFetch';
import { preparePath } from '../../utils/preparePath';

const ProductsInstance = ApiFetch();

export const URLS = {
    PRODUCTS: 'products',
    PRODUCT: 'products/:id',
    PRODUCTS_BY_CATEGORY: 'products/category/:categoryId',
    FEATURED_PRODUCTS: 'products/featured',
    POPULAR_PRODUCTS: 'products/popular',
};

async function getProducts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const path = queryString ? `${URLS.PRODUCTS}?${queryString}` : URLS.PRODUCTS;
    return ProductsInstance.get(path);
}

async function getProduct(id) {
    const path = preparePath(URLS.PRODUCT, { id });
    return ProductsInstance.get(path);
}

async function createProduct(data) {
    return ProductsInstance.post(URLS.PRODUCTS, data);
}

async function updateProduct(id, data) {
    const path = preparePath(URLS.PRODUCT, { id });
    return ProductsInstance.put(path, data);
}

async function deleteProduct(id) {
    const path = preparePath(URLS.PRODUCT, { id });
    return ProductsInstance.delete(path);
}

async function getProductsByCategory(categoryId, params = {}) {
    const path = preparePath(URLS.PRODUCTS_BY_CATEGORY, { categoryId });
    const queryString = new URLSearchParams(params).toString();
    const fullPath = queryString ? `${path}?${queryString}` : path;
    return ProductsInstance.get(fullPath);
}

async function getFeaturedProducts() {
    return ProductsInstance.get(URLS.FEATURED_PRODUCTS);
}

async function getPopularProducts() {
    return ProductsInstance.get(URLS.POPULAR_PRODUCTS);
}

export default {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategory,
    getFeaturedProducts,
    getPopularProducts,
}; 