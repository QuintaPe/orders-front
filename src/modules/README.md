# Repository Modules

This directory contains modular repository files for different backend sections, following a clean architecture pattern. Each module represents a specific domain or feature of the application.

## Structure

```
src/modules/
├── products/
│   └── repository.jsx      # Product management
├── cart/
│   └── repository.jsx      # Shopping cart operations
├── auth/
│   └── repository.jsx      # Authentication & authorization
├── orders/
│   └── repository.jsx      # Order management
├── users/
│   └── repository.jsx      # User management
├── categories/
│   └── repository.jsx      # Category management
├── analytics/
│   └── repository.jsx      # Analytics & reporting
├── index.js               # Central exports
└── README.md             # This file
```

## Usage

### Importing Repositories

```javascript
// Import specific repository
import ProductsRepository from './modules/products/repository.jsx';
import CartRepository from './modules/cart/repository.jsx';

// Or import from central index
import { 
  ProductsRepository, 
  CartRepository, 
  AuthRepository 
} from './modules/index.js';
```

### Using Repository Methods

```javascript
// Products
const products = await ProductsRepository.getProducts({ limit: 10 });
const product = await ProductsRepository.getProduct('123');

// Cart
const cart = await CartRepository.getCart();
await CartRepository.addToCart({ productId: '123', quantity: 2 });

// Auth
const user = await AuthRepository.login({ email: 'user@example.com', password: 'password' });

// Orders
const orders = await OrdersRepository.getOrders({ status: 'pending' });
await OrdersRepository.updateOrderStatus('456', 'completed');
```

### URL Constants

Each repository exports URL constants that can be used for reference:

```javascript
import { ProductsURLS, CartURLS } from './modules/index.js';

console.log(ProductsURLS.PRODUCT); // 'products/:id'
console.log(CartURLS.CART); // 'cart'
```

## Available Repositories

### ProductsRepository
- `getProducts(params)` - Get all products with optional filters
- `getProduct(id)` - Get a specific product
- `createProduct(data)` - Create a new product
- `updateProduct(id, data)` - Update a product
- `deleteProduct(id)` - Delete a product
- `getProductsByCategory(categoryId, params)` - Get products by category
- `getFeaturedProducts()` - Get featured products
- `getPopularProducts()` - Get popular products

### CartRepository
- `getCart()` - Get current cart
- `addToCart(data)` - Add item to cart
- `updateCartItem(id, data)` - Update cart item
- `removeFromCart(id)` - Remove item from cart
- `updateQuantity(id, quantity)` - Update item quantity
- `clearCart()` - Clear entire cart

### AuthRepository
- `login(credentials)` - User login
- `logout()` - User logout
- `register(userData)` - User registration
- `refreshToken()` - Refresh authentication token
- `getProfile()` - Get user profile
- `updateProfile(data)` - Update user profile
- `changePassword(data)` - Change password
- `forgotPassword(email)` - Request password reset
- `resetPassword(token, password)` - Reset password
- `verifyEmail(token)` - Verify email address

### OrdersRepository
- `getOrders(params)` - Get all orders with filters
- `getOrder(id)` - Get specific order
- `createOrder(data)` - Create new order
- `updateOrder(id, data)` - Update order
- `deleteOrder(id)` - Delete order
- `updateOrderStatus(id, status)` - Update order status
- `getOrderItems(id)` - Get order items
- `getPendingOrders()` - Get pending orders
- `getCompletedOrders(params)` - Get completed orders
- `getOrdersByDate(date, params)` - Get orders by date
- `getOrdersByUser(userId, params)` - Get orders by user

### UsersRepository
- `getUsers(params)` - Get all users with filters
- `getUser(id)` - Get specific user
- `createUser(data)` - Create new user
- `updateUser(id, data)` - Update user
- `deleteUser(id)` - Delete user
- `updateUserRole(id, role)` - Update user role
- `getUsersByRole(role, params)` - Get users by role
- `getStaffUsers(params)` - Get staff users
- `getCustomerUsers(params)` - Get customer users

### CategoriesRepository
- `getCategories(params)` - Get all categories
- `getCategory(id)` - Get specific category
- `createCategory(data)` - Create new category
- `updateCategory(id, data)` - Update category
- `deleteCategory(id)` - Delete category
- `getCategoryProducts(id, params)` - Get products in category

### AnalyticsRepository
- `getSalesReport(params)` - Get sales report
- `getSalesByDate(date, params)` - Get sales by date
- `getSalesByPeriod(data)` - Get sales by period
- `getTopProducts(params)` - Get top selling products
- `getTopCategories(params)` - Get top categories
- `getRevenueStats(params)` - Get revenue statistics
- `getOrderStats(params)` - Get order statistics
- `getCustomerStats(params)` - Get customer statistics
- `getDashboardSummary()` - Get dashboard summary

## Error Handling

All repository methods return promises and will throw errors for failed requests. Handle errors appropriately in your components:

```javascript
try {
  const products = await ProductsRepository.getProducts();
  // Handle success
} catch (error) {
  console.error('Failed to fetch products:', error);
  // Handle error
}
```

## Configuration

The API base URL is configured in the `ApiFetch` utility. You can set it via environment variable:

```bash
REACT_APP_API_URL=http://localhost:3000/api
```

Or it will default to `http://localhost:3000/api`. 