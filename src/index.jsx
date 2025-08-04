import { createRoot } from 'react-dom/client'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'

import HomePage from './routes/home/index.jsx'
import ProductDetailPage from './routes/product/index.jsx'
import CartPage from './routes/cart/index.jsx'
import MenuPage from './routes/menu/index.jsx'
import NotFoundPage from './routes/not-found/index.jsx'
import LoginPage from './routes/login/index.jsx'
import WaiterDashboardPage from './routes/waiter-dashboard/index.jsx'
import AdminDashboardPage from './routes/admin-dashboard/index.jsx'
import ProtectedRoute from './components/ProtectedRoute/index.jsx'
import ErrorBoundary from './components/ErrorBoundary/index.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { WebSocketProvider } from './context/WebSocketContext.jsx'
import { ToastProvider } from './components/ui/Toast/index.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <ErrorBoundary> <Outlet /> </ErrorBoundary>,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "menu",
        element: <MenuPage />
      },
      {
        path: "product/:id",
        element: <ProductDetailPage />
      },
      {
        path: "cart",
        element: <CartPage />
      },
      {
        path: "login",
        element: <LoginPage />
      },
      {
        path: "waiter/dashboard",
        element: (
          <ProtectedRoute allowedRoles={['waiter', 'manager', 'admin']}>
            <WaiterDashboardPage />
          </ProtectedRoute>
        )
      },
      {
        path: "admin/dashboard",
        element: (
          <ProtectedRoute requiredRole="admin">
            <AdminDashboardPage />
          </ProtectedRoute>
        )
      },
      {
        path: "*",
        element: <NotFoundPage />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <ToastProvider>
      <AuthProvider>
        <WebSocketProvider>
          <CartProvider>
            <RouterProvider router={router} />
          </CartProvider>
        </WebSocketProvider>
      </AuthProvider>
    </ToastProvider>
  </ErrorBoundary>
)
