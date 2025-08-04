import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthRepository } from '../modules/index.js';
import { useToast } from '../components/ui';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const toast = useToast();

    // Verificar si el usuario está autenticado al cargar la app
    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const userData = await AuthRepository.getProfile();
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {
            console.error('Error checking auth status:', error);
            setUser(null);
            localStorage.removeItem('user');
        } finally {
            setLoading(false);
        }
    };

    const login = async (username, password) => {
        setError(null);
        try {
            const userData = await AuthRepository.login({ username, password });
            setUser(userData);
            // Guardar en localStorage para acceso rápido
            localStorage.setItem('user', JSON.stringify(userData));
            toast.showSuccess('Inicio de sesión exitoso');
            return { success: true };
        } catch (error) {
            const errorMessage = error.message || 'Error de conexión';
            setError(errorMessage);
            toast.showError(errorMessage);
            return { success: false, error: errorMessage };
        }
    };

    const logout = async () => {
        try {
            await AuthRepository.logout();
            toast.showInfo('Sesión cerrada correctamente');
        } catch (error) {
            console.error('Error during logout:', error);
            toast.showWarning('Error al cerrar sesión, pero se ha limpiado la sesión local');
        } finally {
            setUser(null);
            setError(null);
            localStorage.removeItem('user');
        }
    };

    const register = async (userData) => {
        setError(null);
        try {
            const newUser = await AuthRepository.register(userData);
            setUser(newUser);
            return { success: true };
        } catch (error) {
            setError('Error de conexión');
            return { success: false, error: 'Error de conexión' };
        }
    };

    const value = {
        user,
        loading,
        error,
        login,
        logout,
        register,
        checkAuthStatus,
        isAuthenticated: !!user,
        isWaiter: user?.role === 'waiter',
        isManager: user?.role === 'manager',
        isAdmin: user?.role === 'admin',
        canAccessWaiterRoutes: user?.role === 'waiter' || user?.role === 'manager' || user?.role === 'admin',
        canAccessAdminRoutes: user?.role === 'admin',
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}; 