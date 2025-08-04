import ApiFetch from '../../utils/apiFetch';
import { preparePath } from '../../utils/preparePath';

const AuthInstance = ApiFetch();

export const URLS = {
    LOGIN: 'auth/login',
    LOGOUT: 'auth/logout',
    REGISTER: 'auth/register',
    REFRESH: 'auth/refresh',
    PROFILE: 'auth/profile',
    CHANGE_PASSWORD: 'auth/change-password',
    FORGOT_PASSWORD: 'auth/forgot-password',
    RESET_PASSWORD: 'auth/reset-password',
    VERIFY_EMAIL: 'auth/verify-email/:token',
};

async function login(credentials) {
    return AuthInstance.post(URLS.LOGIN, credentials);
}

async function logout() {
    return AuthInstance.post(URLS.LOGOUT);
}

async function register(userData) {
    return AuthInstance.post(URLS.REGISTER, userData);
}

async function refreshToken() {
    return AuthInstance.post(URLS.REFRESH);
}

async function getProfile() {
    return AuthInstance.get(URLS.PROFILE);
}

async function updateProfile(data) {
    return AuthInstance.put(URLS.PROFILE, data);
}

async function changePassword(data) {
    return AuthInstance.post(URLS.CHANGE_PASSWORD, data);
}

async function forgotPassword(email) {
    return AuthInstance.post(URLS.FORGOT_PASSWORD, { email });
}

async function resetPassword(token, password) {
    return AuthInstance.post(URLS.RESET_PASSWORD, { token, password });
}

async function verifyEmail(token) {
    const path = preparePath(URLS.VERIFY_EMAIL, { token });
    return AuthInstance.post(path);
}

export default {
    login,
    logout,
    register,
    refreshToken,
    getProfile,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword,
    verifyEmail,
}; 