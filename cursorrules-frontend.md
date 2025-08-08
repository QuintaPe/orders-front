# Bar QR Frontend - Cursor Rules

## Project Overview
This is a React-based frontend for a bar QR code ordering system with real-time WebSocket functionality. The application provides a modern, responsive interface for customers to browse menus, place orders, and for staff to manage orders with role-based access control.

## Technology Stack
- **Framework**: React 19.1.1 with Vite 7.0.6
- **Routing**: React Router DOM 7.7.1
- **State Management**: React Context API
- **Real-time**: Socket.io Client 4.8.1
- **HTTP Client**: Axios 1.11.0
- **UI Icons**: Lucide React 0.536.0
- **Build Tool**: Vite with @vitejs/plugin-react
- **Styling**: CSS modules with component-scoped styles

## Project Structure

### Core Files
- `src/index.jsx` - Main application entry point with router setup
- `src/index.css` - Global styles and CSS variables
- `vite.config.js` - Vite configuration
- `package.json` - Dependencies and scripts

### Context Providers (`src/context/`)
- `AuthContext.jsx` - User authentication and role management
- `CartContext.jsx` - Shopping cart state management
- `WebSocketContext.jsx` - Real-time WebSocket connections

### Components (`src/components/`)
- **UI Components** (`src/components/ui/`)
  - `Button/` - Reusable button components
  - `Card/` - Card layout components
  - `Input/` - Form input components
  - `Toast/` - Notification system
  - `LoadingSpinner/` - Loading indicators
  - `SearchBar/` - Search functionality
  - `Badge/` - Status badges
  - `Tag/` - Category tags
  - `EmptyState/` - Empty state displays

- **Feature Components**
  - `NavigationBar/` - Main navigation
  - `DashboardNav/` - Dashboard navigation
  - `ProductGrid/` - Product display grid
  - `CategoryFilter/` - Category filtering
  - `OrderForm/` - Order creation form
  - `WebSocketStatus/` - Connection status indicator
  - `ProtectedRoute/` - Route protection
  - `ErrorBoundary/` - Error handling

### Routes (`src/routes/`)
- `/` - Menu page (product catalog with filtering)
- `product/:id` - Individual product details
- `cart/` - Shopping cart management
- `login/` - Authentication page
- `waiter-dashboard/` - Waiter order management
- `admin-dashboard/` - Admin system management
- `not-found/` - 404 error page

### Modules (`src/modules/`)
Repository pattern for API communication:
- `auth/repository.jsx` - Authentication endpoints
- `products/repository.jsx` - Product management
- `categories/repository.jsx` - Category management
- `orders/repository.jsx` - Order operations
- `cart/repository.jsx` - Cart management
- `users/repository.jsx` - User management (admin)
- `analytics/repository.jsx` - Analytics data

### Utilities (`src/utils/`)
- `apiFetch.js` - Centralized API client with error handling
- `preparePath.js` - Path utilities

### Hooks (`src/hooks/`)
- `useDeviceType.js` - Responsive design utilities

## Authentication & Authorization

### User Roles
1. **customer** - Default role for QR code users
2. **waiter** - Order management and status updates
3. **manager** - Full order and product management
4. **admin** - Complete system access including user management

### Authentication Flow
- Cookie-based authentication (httpOnly, secure)
- Automatic token validation on protected routes
- Role-based component rendering
- Persistent login state with localStorage backup

### Protected Routes
```javascript
<ProtectedRoute allowedRoles={['waiter', 'manager', 'admin']}>
  <WaiterDashboardPage />
</ProtectedRoute>

<ProtectedRoute requiredRole="admin">
  <AdminDashboardPage />
</ProtectedRoute>
```

## State Management

### Context Providers Hierarchy
```javascript
<ErrorBoundary>
  <ToastProvider>
    <AuthProvider>
      <WebSocketProvider>
        <CartProvider>
          <RouterProvider />
        </CartProvider>
      </WebSocketProvider>
    </AuthProvider>
  </ToastProvider>
</ErrorBoundary>
```

### Context Usage
- **AuthContext**: User authentication, roles, and permissions
- **CartContext**: Shopping cart state and operations
- **WebSocketContext**: Real-time order updates and notifications
- **ToastProvider**: Global notification system

## API Communication

### Repository Pattern
Each module exports a repository with standardized methods:
```javascript
// Example: ProductsRepository
export default {
  getAll: () => apiFetch.get('products'),
  getById: (id) => apiFetch.get(`products/${id}`),
  create: (data) => apiFetch.post('products', data),
  update: (id, data) => apiFetch.patch(`products/${id}`, data),
  delete: (id) => apiFetch.delete(`products/${id}`)
};
```

### API Client Features
- Automatic cookie handling for authentication
- Centralized error handling
- Network error detection
- JSON response parsing
- Request/response logging

## WebSocket Integration

### Connection Management
- Automatic reconnection on connection loss
- Connection status indicators
- Room-based messaging for different user types
- Real-time order status updates

### Event Handling
- `order:created` - New order notifications
- `order:updated` - Order status changes
- `order:completed` - Order delivery notifications
- `order:cancelled` - Order cancellation alerts

## Component Architecture

### UI Component Pattern
```javascript
// Component structure
const ComponentName = ({ prop1, prop2, children }) => {
  // State and effects
  // Event handlers
  // Render logic
};

// Export with styles
export default ComponentName;
```

### Styling Convention
- Component-scoped CSS files
- CSS variables for theming
- Responsive design with mobile-first approach
- Consistent spacing and typography

### Component Categories
1. **Presentational Components**: Pure UI components (Button, Card, Input)
2. **Container Components**: Business logic components (ProductGrid, OrderForm)
3. **Layout Components**: Page structure components (NavigationBar, DashboardNav)
4. **Route Components**: Page-level components (MenuPage, ProductDetailPage, etc.)

## Routing Structure

### Public Routes
- `/` - Menu page (product catalog)
- `/product/:id` - Product details
- `/cart` - Shopping cart
- `/login` - Authentication

### Protected Routes
- `/waiter/dashboard` - Waiter order management
- `/admin/dashboard` - Admin system management

### Route Protection
- Role-based access control
- Automatic redirect to login for unauthenticated users
- Error boundaries for route-level error handling

## Error Handling

### Error Boundaries
- Route-level error boundaries
- Component-level error catching
- Graceful error display
- Error reporting and logging

### API Error Handling
- Network error detection
- HTTP status code handling
- User-friendly error messages
- Toast notifications for errors

## Responsive Design

### Breakpoints
- Mobile-first approach
- Tablet and desktop optimizations
- Touch-friendly interfaces
- Adaptive layouts

### Device Detection
- `useDeviceType` hook for responsive logic
- Conditional rendering based on screen size
- Optimized interactions for different devices

## Development Guidelines

### Code Style
- Functional components with hooks
- ES6+ syntax (arrow functions, destructuring)
- Consistent naming conventions
- JSDoc comments for complex functions

### File Organization
- Feature-based folder structure
- Co-located styles with components
- Index files for clean imports
- Consistent file naming

### State Management
- Context for global state
- Local state for component-specific data
- Custom hooks for reusable logic
- Minimal prop drilling

### Performance
- React.memo for expensive components
- useMemo and useCallback for optimization
- Lazy loading for routes
- Image optimization

## Environment Configuration

### Environment Variables
```env
VITE_API_URL=http://localhost:3000/api
VITE_WS_URL=http://localhost:3000
VITE_APP_NAME=Bar QR Ordering
VITE_APP_VERSION=1.0.0
```

### Build Configuration
- Vite for fast development and optimized builds
- Environment-specific configurations
- Asset optimization
- Code splitting

## Testing & Quality

### Code Quality
- ESLint configuration
- Consistent code formatting
- Type checking considerations
- Performance monitoring

### User Experience
- Loading states for all async operations
- Error states with recovery options
- Accessibility considerations
- Keyboard navigation support

## Common Patterns

### Component Pattern
```javascript
import React from 'react';
import './styles.css';

const ComponentName = ({ prop1, prop2, children }) => {
  // State
  const [state, setState] = useState(initialValue);
  
  // Effects
  useEffect(() => {
    // Side effects
  }, [dependencies]);
  
  // Handlers
  const handleEvent = () => {
    // Event logic
  };
  
  // Render
  return (
    <div className="component-name">
      {children}
    </div>
  );
};

export default ComponentName;
```

### Hook Pattern
```javascript
const useCustomHook = (dependencies) => {
  const [state, setState] = useState(initialValue);
  
  useEffect(() => {
    // Hook logic
  }, [dependencies]);
  
  return { state, setState };
};
```

### Repository Pattern
```javascript
import ApiFetch from '../../utils/apiFetch.js';

const api = ApiFetch();

export default {
  async methodName(params) {
    try {
      return await api.get('endpoint', params);
    } catch (error) {
      throw new Error('Custom error message');
    }
  }
};
```

## Key Features to Remember
1. **Real-time Updates**: WebSocket integration for live order updates
2. **Role-based UI**: Different interfaces for different user types
3. **Responsive Design**: Mobile-first approach with adaptive layouts
4. **Error Handling**: Comprehensive error boundaries and user feedback
5. **State Management**: Context-based global state with local component state
6. **API Integration**: Repository pattern for clean API communication
7. **Authentication**: Cookie-based auth with role-based route protection
8. **Component Library**: Reusable UI components with consistent styling

## Common Issues & Solutions
- **CORS errors**: Verify API URL configuration in environment variables
- **WebSocket connection**: Check WebSocket URL and CORS settings
- **Authentication**: Ensure cookie settings match backend configuration
- **Routing issues**: Verify route protection and role-based access
- **State updates**: Use proper dependency arrays in useEffect hooks
- **Performance**: Implement React.memo and useCallback for expensive operations
- **Styling conflicts**: Use component-scoped CSS to avoid global conflicts 