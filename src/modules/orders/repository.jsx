import ApiFetch from '../../utils/apiFetch';
import { preparePath } from '../../utils/preparePath';

const OrdersInstance = ApiFetch();

export const URLS = {
    ORDERS: 'orders',
    ORDER: 'orders/:id',
    ORDER_STATUS: 'orders/:id/status',
    ORDER_ITEMS: 'orders/:id/items',
    PENDING_ORDERS: 'orders/pending',
    COMPLETED_ORDERS: 'orders/completed',
    ORDERS_BY_DATE: 'orders/date/:date',
    ORDERS_BY_USER: 'orders/user/:userId',
};

async function getOrders(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const path = queryString ? `${URLS.ORDERS}?${queryString}` : URLS.ORDERS;
    return OrdersInstance.get(path);
}

async function getOrder(id) {
    const path = preparePath(URLS.ORDER, { id });
    return OrdersInstance.get(path);
}

async function createOrder(data) {
    return OrdersInstance.post(URLS.ORDERS, data);
}

async function updateOrder(id, data) {
    const path = preparePath(URLS.ORDER, { id });
    return OrdersInstance.put(path, data);
}

async function deleteOrder(id) {
    const path = preparePath(URLS.ORDER, { id });
    return OrdersInstance.delete(path);
}

async function updateOrderStatus(id, status) {
    const path = preparePath(URLS.ORDER_STATUS, { id });
    return OrdersInstance.patch(path, { status });
}

async function getOrderItems(id) {
    const path = preparePath(URLS.ORDER_ITEMS, { id });
    return OrdersInstance.get(path);
}

async function getCompletedOrders(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const path = queryString ? `${URLS.COMPLETED_ORDERS}?${queryString}` : URLS.COMPLETED_ORDERS;
    return OrdersInstance.get(path);
}

async function getOrdersByDate(date, params = {}) {
    const path = preparePath(URLS.ORDERS_BY_DATE, { date });
    const queryString = new URLSearchParams(params).toString();
    const fullPath = queryString ? `${path}?${queryString}` : path;
    return OrdersInstance.get(fullPath);
}

async function getOrdersByUser(userId, params = {}) {
    const path = preparePath(URLS.ORDERS_BY_USER, { userId });
    const queryString = new URLSearchParams(params).toString();
    const fullPath = queryString ? `${path}?${queryString}` : path;
    return OrdersInstance.get(fullPath);
}

export default {
    getOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder,
    updateOrderStatus,
    getOrderItems,
    getCompletedOrders,
    getOrdersByDate,
    getOrdersByUser,
}; 