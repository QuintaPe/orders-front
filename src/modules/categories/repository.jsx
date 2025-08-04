import ApiFetch from '../../utils/apiFetch';
import { preparePath } from '../../utils/preparePath';

const CategoriesInstance = ApiFetch();

export const URLS = {
    CATEGORIES: 'categories',
    CATEGORY: 'categories/:id',
    CATEGORY_PRODUCTS: 'categories/:id/products',
};

async function getCategories(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const path = queryString ? `${URLS.CATEGORIES}?${queryString}` : URLS.CATEGORIES;
    return CategoriesInstance.get(path);
}

async function getCategory(id) {
    const path = preparePath(URLS.CATEGORY, { id });
    return CategoriesInstance.get(path);
}

async function createCategory(data) {
    return CategoriesInstance.post(URLS.CATEGORIES, data);
}

async function updateCategory(id, data) {
    const path = preparePath(URLS.CATEGORY, { id });
    return CategoriesInstance.put(path, data);
}

async function deleteCategory(id) {
    const path = preparePath(URLS.CATEGORY, { id });
    return CategoriesInstance.delete(path);
}

async function getCategoryProducts(id, params = {}) {
    const path = preparePath(URLS.CATEGORY_PRODUCTS, { id });
    const queryString = new URLSearchParams(params).toString();
    const fullPath = queryString ? `${path}?${queryString}` : path;
    return CategoriesInstance.get(fullPath);
}

export default {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryProducts,
}; 