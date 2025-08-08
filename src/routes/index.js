// Route Components
export { default as ProductDetailPage } from './product/index.jsx';
export { default as CartPage } from './cart/index.jsx';
export { default as MenuPage } from './menu/index.jsx';
export { default as NotFoundPage } from './not-found/index.jsx';
export { default as LoginPage } from './login/index.jsx';
export { default as WaiterDashboardPage } from './waiter-dashboard/index.jsx';
export { default as AdminDashboardPage } from './admin-dashboard/index.jsx';
export { default as ProfilePage } from './profile/index.jsx';

// Route Configuration
export const routes = [
    {
        path: '/',
        element: 'MenuPage',
        title: 'Menu'
    },
    {
        path: '/product/:id',
        element: 'ProductDetailPage',
        title: 'Product Details'
    },
    {
        path: '/cart',
        element: 'CartPage',
        title: 'Cart'
    },
    {
        path: '/login',
        element: 'LoginPage',
        title: 'Login'
    },
    {
        path: '/waiter/dashboard',
        element: 'WaiterDashboardPage',
        title: 'Dashboard Camarero'
    },
    {
        path: '/admin/dashboard',
        element: 'AdminDashboardPage',
        title: 'Dashboard Administrador'
    },
    {
        path: '/profile',
        element: 'ProfilePage',
        title: 'Profile'
    },
    {
        path: '*',
        element: 'NotFoundPage',
        title: 'Not Found'
    }
]; 