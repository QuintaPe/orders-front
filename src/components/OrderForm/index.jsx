import React, { useState } from 'react';
import { Input, Button, Card } from '../ui';
import { useToast } from '../ui';
import { OrdersRepository } from '../../modules/index.js';

const OrderForm = ({ cart, total, onComplete, onBack }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        table_number: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const toast = useToast();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const orderData = {
                ...formData,
                items: cart.map(item => ({
                    product_id: item.id,
                    quantity: item.quantity,
                    price: item.price
                })),
                total: total
            };

            await OrdersRepository.createOrder(orderData);
            toast.showSuccess('Pedido creado exitosamente');
            onComplete();
        } catch (error) {
            console.error('Error creating order:', error);
            const errorMessage = error.message || 'Error al crear el pedido. Por favor, inténtalo de nuevo.';
            toast.showError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="order-form" padding="large" shadow="medium">
            <h2>Realizar Pedido</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nombre:</label>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        fullWidth
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        fullWidth
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Teléfono:</label>
                    <Input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        fullWidth
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="table_number">Número de Mesa:</label>
                    <Input
                        type="number"
                        id="table_number"
                        name="table_number"
                        value={formData.table_number}
                        onChange={handleInputChange}
                        required
                        fullWidth
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Dirección (opcional):</label>
                    <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                <div className="order-summary">
                    <h3>Resumen del Pedido</h3>
                    <p>Total: €{total.toFixed(2)}</p>
                </div>

                <div className="form-actions">
                    <Button type="button" onClick={onBack} variant="outline" size="medium">
                        Volver
                    </Button>
                    <Button type="submit" disabled={isSubmitting} variant="primary" size="medium">
                        {isSubmitting ? 'Creando Pedido...' : 'Crear Pedido'}
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default OrderForm; 