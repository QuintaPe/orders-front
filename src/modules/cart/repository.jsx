import ApiFetch from '../../utils/apiFetch';
import { preparePath } from '../../utils/preparePath';

const CartInstance = ApiFetch();

export const URLS = {
    CART: 'cart',
    CART_ITEM: 'cart/:id',
    CART_CLEAR: 'cart/clear',
    CART_UPDATE_QUANTITY: 'cart/:id/quantity',
};

async function getCart() {
    return CartInstance.get(URLS.CART);
}

async function addToCart(data) {
    return CartInstance.post(URLS.CART, data);
}

async function updateCartItem(id, data) {
    const path = preparePath(URLS.CART_ITEM, { id });
    return CartInstance.put(path, data);
}

async function removeFromCart(id) {
    const path = preparePath(URLS.CART_ITEM, { id });
    return CartInstance.delete(path);
}

async function updateQuantity(id, quantity) {
    const path = preparePath(URLS.CART_UPDATE_QUANTITY, { id });
    return CartInstance.patch(path, { quantity });
}

async function clearCart() {
    return CartInstance.delete(URLS.CART_CLEAR);
}

export default {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    updateQuantity,
    clearCart,
}; 