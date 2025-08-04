# Eventos WebSocket - Bar App

## Eventos de Pedidos

### Eventos Recibidos del Servidor

#### `order:created`
Se emite cuando se crea un nuevo pedido.

**Payload:**
```javascript
{
  id: string,
  table_number: number,
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled',
  total: number,
  products: [
    {
      id: string,
      name: string,
      price: number,
      quantity: number
    }
  ],
  created_at: string,
  updated_at: string
}
```

**Acción en el cliente:**
- Se agrega el pedido al inicio de la lista
- Se muestra notificación de nuevo pedido
- Se reproduce sonido de notificación

#### `orders:updated`
Se emite cuando se actualiza un pedido existente.

**Payload:**
```javascript
{
  id: string,
  table_number: number,
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled',
  total: number,
  products: [...],
  created_at: string,
  updated_at: string
}
```

**Acción en el cliente:**
- Se actualiza el pedido en la lista
- Se muestra notificación de actualización

#### `orders:deleted`
Se emite cuando se elimina un pedido.

**Payload:**
```javascript
{
  orderId: string
}
```

**Acción en el cliente:**
- Se elimina el pedido de la lista

#### `orders:list`
Se emite con la lista completa de pedidos (generalmente al conectar).

**Payload:**
```javascript
[
  {
    id: string,
    table_number: number,
    status: string,
    total: number,
    products: [...],
    created_at: string,
    updated_at: string
  }
]
```

**Acción en el cliente:**
- Se reemplaza la lista completa de pedidos

### Eventos Enviados al Servidor

#### `orders:updateStatus`
Se emite cuando se actualiza el estado de un pedido.

**Payload:**
```javascript
{
  orderId: string,
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled'
}
```

## Configuración del Servidor

El servidor debe estar configurado para:

1. **Escuchar el evento `orders:updateStatus`** y procesar la actualización
2. **Emitir `order:created`** cuando se cree un nuevo pedido
3. **Emitir `orders:updated`** cuando se actualice un pedido
4. **Emitir `orders:deleted`** cuando se elimine un pedido
5. **Emitir `orders:list`** cuando un cliente se conecte (opcional)

## Ejemplo de Implementación del Servidor

```javascript
// Socket.IO Server
io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);

  // Escuchar actualización de estado
  socket.on('orders:updateStatus', async (data) => {
    try {
      const { orderId, status } = data;
      
      // Actualizar en base de datos
      const updatedOrder = await updateOrderStatus(orderId, status);
      
      // Emitir a todos los clientes
      io.emit('orders:updated', updatedOrder);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  });

  // Enviar lista inicial de pedidos
  socket.on('requestOrders', async () => {
    try {
      const orders = await getOrders();
      socket.emit('orders:list', orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  });
});

// Cuando se crea un nuevo pedido (desde API REST)
app.post('/api/orders', async (req, res) => {
  try {
    const newOrder = await createOrder(req.body);
    
    // Emitir a todos los clientes conectados
    io.emit('order:created', newOrder);
    
    res.json(newOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

## Notas Importantes

- El evento `order:created` es el principal para nuevos pedidos
- Todos los eventos se emiten a todos los clientes conectados (`io.emit`)
- El cliente maneja automáticamente la actualización de la UI
- Las notificaciones se muestran solo para nuevos pedidos (`order:created`) 