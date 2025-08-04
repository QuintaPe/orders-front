import ApiFetch from '../../utils/apiFetch';
import { preparePath } from '../../utils/preparePath';

const UsersInstance = ApiFetch();

export const URLS = {
    USERS: 'users',
    USER: 'users/:id',
    USER_ROLE: 'users/:id/role',
    USERS_BY_ROLE: 'users/role/:role',
    STAFF_USERS: 'users/staff',
    CUSTOMER_USERS: 'users/customers',
};

async function getUsers(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const path = queryString ? `${URLS.USERS}?${queryString}` : URLS.USERS;
    return UsersInstance.get(path);
}

async function getUser(id) {
    const path = preparePath(URLS.USER, { id });
    return UsersInstance.get(path);
}

async function createUser(data) {
    return UsersInstance.post(URLS.USERS, data);
}

async function updateUser(id, data) {
    const path = preparePath(URLS.USER, { id });
    return UsersInstance.put(path, data);
}

async function deleteUser(id) {
    const path = preparePath(URLS.USER, { id });
    return UsersInstance.delete(path);
}

async function updateUserRole(id, role) {
    const path = preparePath(URLS.USER_ROLE, { id });
    return UsersInstance.patch(path, { role });
}

async function getUsersByRole(role, params = {}) {
    const path = preparePath(URLS.USERS_BY_ROLE, { role });
    const queryString = new URLSearchParams(params).toString();
    const fullPath = queryString ? `${path}?${queryString}` : path;
    return UsersInstance.get(fullPath);
}

async function getStaffUsers(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const path = queryString ? `${URLS.STAFF_USERS}?${queryString}` : URLS.STAFF_USERS;
    return UsersInstance.get(path);
}

async function getCustomerUsers(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const path = queryString ? `${URLS.CUSTOMER_USERS}?${queryString}` : URLS.CUSTOMER_USERS;
    return UsersInstance.get(path);
}

export default {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    updateUserRole,
    getUsersByRole,
    getStaffUsers,
    getCustomerUsers,
}; 