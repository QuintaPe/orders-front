import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

const WebSocketContext = createContext();

export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    return context;
};

export const WebSocketProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [orders, setOrders] = useState([]);
    const [updatedOrders, setUpdatedOrders] = useState([]);
    const socketRef = useRef(null);
    const notificationSound = useRef(new Audio('/notification.mp3'));
    const { isAuthenticated, user } = useAuth();

    // Configuración del WebSocket
    const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000';

    useEffect(() => {
        if (!isAuthenticated || !user) {
            return;
        }

        // Crear conexión WebSocket
        socketRef.current = io(SOCKET_URL, {
            auth: {
                token: localStorage.getItem('token'),
                userId: user.id,
                role: user.role
            },
            transports: ['websocket', 'polling']
        });

        // Eventos de conexión
        socketRef.current.on('connect', () => {
            console.log('WebSocket conectado');
            setIsConnected(true);
        });

        socketRef.current.on('disconnect', () => {
            console.log('WebSocket desconectado');
            setIsConnected(false);
        });

        socketRef.current.on('connect_error', (error) => {
            console.error('Error de conexión WebSocket:', error);
            setIsConnected(false);
        });

        // Eventos de pedidos
        socketRef.current.on('order:created', (order) => {
            console.log('Nuevo pedido recibido:', order);
            notificationSound.current.play().catch(err => console.error('Error playing sound:', err));
            setOrders(prev => [{ ...order, isNew: true }, ...prev]);
        });

        socketRef.current.on('orders:updated', (order) => {
            console.log('Pedido actualizado:', order);
            setUpdatedOrders(prev => [...prev, order]);
            setOrders(prev => prev.map(o => o.id === order.id ? order : o));
        });

        socketRef.current.on('orders:deleted', (orderId) => {
            console.log('Pedido eliminado:', orderId);
            setOrders(prev => prev.filter(o => o.id !== orderId));
        });

        socketRef.current.on('orders:list', (ordersList) => {
            console.log('Lista de pedidos recibida:', ordersList);
            setOrders(ordersList);
        });

        // Limpiar conexión al desmontar
        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, [isAuthenticated, user, SOCKET_URL]);

    // Función para emitir eventos
    const emit = (event, data) => {
        if (socketRef.current && isConnected) {
            socketRef.current.emit(event, data);
        }
    };

    // Función para actualizar estado de pedido
    const updateOrderStatus = (orderId, status) => {
        emit('orders:updateStatus', { orderId, status });
    };

    const clearUpdatedOrders = () => {
        setUpdatedOrders([]);
    };

    const value = {
        isConnected,
        orders,
        setOrders,
        updatedOrders,
        emit,
        updateOrderStatus,
        clearUpdatedOrders
    };

    return (
        <WebSocketContext.Provider value={value}>
            {children}
        </WebSocketContext.Provider>
    );
}; 