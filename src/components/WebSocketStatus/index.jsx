import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { useWebSocket } from '../../context/WebSocketContext';
import './styles.css';

const WebSocketStatus = ({ showText = true, className = '' }) => {
    const { isConnected } = useWebSocket();

    return (
        <div className={`websocket-status ${className}`}>
            {isConnected ? (
                <div className="status-connected">
                    <Wifi className="h-4 w-4" />
                    {showText && <span>Conectado</span>}
                </div>
            ) : (
                <div className="status-disconnected">
                    <WifiOff className="h-4 w-4" />
                    {showText && <span>Desconectado</span>}
                </div>
            )}
        </div>
    );
};

export default WebSocketStatus; 