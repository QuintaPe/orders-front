import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { LoadingSpinner } from '../ui';
import { useToast } from '../ui';
import './styles.css';

function ProtectedRoute({ children, requiredRole = null, allowedRoles = [] }) {
    const { isAuthenticated, loading, user } = useAuth();
    const toast = useToast();

    // Mostrar spinner mientras se verifica la autenticación
    if (loading) {
        return <LoadingSpinner />;
    }

    // Si no está autenticado, redirigir al login
    if (!isAuthenticated) {
        toast.showWarning('Debes iniciar sesión para acceder a esta página');
        return <Navigate to="/login" replace />;
    }

    // Si se especifica un rol requerido, verificar que el usuario lo tenga
    if (requiredRole && user?.role !== requiredRole) {
        toast.showError(`No tienes permisos para acceder a esta página. Rol requerido: ${requiredRole}`);
        // Redirigir según el rol del usuario
        if (user?.role === 'admin') {
            return <Navigate to="/admin/dashboard" replace />;
        } else {
            return <Navigate to="/waiter/dashboard" replace />;
        }
    }

    // Si se especifican roles permitidos, verificar que el usuario tenga uno de ellos
    if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
        toast.showError(`No tienes permisos para acceder a esta página. Roles permitidos: ${allowedRoles.join(', ')}`);
        // Redirigir según el rol del usuario
        if (user?.role === 'admin') {
            return <Navigate to="/admin/dashboard" replace />;
        } else {
            return <Navigate to="/waiter/dashboard" replace />;
        }
    }

    // Si pasa todas las verificaciones, renderizar el contenido
    return children;
}

export default ProtectedRoute; 