import { useEffect, useRef } from 'react';
import { useWebSocket } from '../context/WebSocketContext';

export const useWebSocketNotifications = () => {
    const { newOrders, updatedOrders, isConnected } = useWebSocket();
    const audioRef = useRef(null);
    const notificationRef = useRef(null);

    // Crear elemento de audio para notificaciones
    useEffect(() => {
        try {
            audioRef.current = new Audio('/notification.mp3');
            audioRef.current.volume = 0.5;
        } catch (error) {
            console.warn('No se pudo cargar el archivo de audio de notificación:', error);
        }
    }, []);

    // Efecto para notificar nuevos pedidos
    useEffect(() => {
        if (newOrders.length > 0 && isConnected) {
            // Reproducir sonido
            if (audioRef.current) {
                audioRef.current.play().catch(console.error);
            }

            // Mostrar notificación del navegador
            if ('Notification' in window && Notification.permission === 'granted') {
                const latestOrder = newOrders[newOrders.length - 1];
                new Notification('Nuevo Pedido', {
                    body: `Mesa ${latestOrder.table_number} - ${latestOrder.products?.length || 0} productos`,
                    icon: '/favicon.ico',
                    tag: 'new-order'
                });
            }

            // Mostrar toast personalizado
            showToast('Nuevo pedido recibido', 'success');
        }
    }, [newOrders, isConnected]);

    // Efecto para notificar pedidos actualizados
    useEffect(() => {
        if (updatedOrders.length > 0 && isConnected) {
            const latestUpdate = updatedOrders[updatedOrders.length - 1];
            showToast(`Pedido actualizado - Mesa ${latestUpdate.table_number}`, 'info');
        }
    }, [updatedOrders, isConnected]);

    // Función para mostrar toast personalizado
    const showToast = (message, type = 'info') => {
        // Crear elemento toast
        const toast = document.createElement('div');
        toast.className = `websocket-toast websocket-toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <span class="toast-message">${message}</span>
                <button class="toast-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;

        // Agregar estilos
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 9999;
            max-width: 300px;
            animation: slideIn 0.3s ease-out;
        `;

        // Agregar estilos CSS para la animación
        if (!document.getElementById('websocket-toast-styles')) {
            const style = document.createElement('style');
            style.id = 'websocket-toast-styles';
            style.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                .websocket-toast .toast-content {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 8px;
                }
                .websocket-toast .toast-close {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 18px;
                    cursor: pointer;
                    padding: 0;
                    width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .websocket-toast .toast-close:hover {
                    opacity: 0.8;
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(toast);

        // Remover toast después de 5 segundos
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 5000);
    };

    // Función para solicitar permisos de notificación
    const requestNotificationPermission = async () => {
        if ('Notification' in window && Notification.permission === 'default') {
            const permission = await Notification.requestPermission();
            return permission === 'granted';
        }
        return Notification.permission === 'granted';
    };

    return {
        showToast,
        requestNotificationPermission,
        isConnected
    };
}; 