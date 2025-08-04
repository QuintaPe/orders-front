import ApiFetch from '../../utils/apiFetch';
import { preparePath } from '../../utils/preparePath';

const AnalyticsInstance = ApiFetch();

export const URLS = {
    SALES_REPORT: 'analytics/sales',
    SALES_BY_DATE: 'analytics/sales/date/:date',
    SALES_BY_PERIOD: 'analytics/sales/period',
    TOP_PRODUCTS: 'analytics/products/top',
    TOP_CATEGORIES: 'analytics/categories/top',
    REVENUE_STATS: 'analytics/revenue',
    ORDER_STATS: 'analytics/orders',
    CUSTOMER_STATS: 'analytics/customers',
    DASHBOARD_SUMMARY: 'analytics/dashboard',
};

async function getSalesReport(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const path = queryString ? `${URLS.SALES_REPORT}?${queryString}` : URLS.SALES_REPORT;
    return AnalyticsInstance.get(path);
}

async function getSalesByDate(date, params = {}) {
    const path = preparePath(URLS.SALES_BY_DATE, { date });
    const queryString = new URLSearchParams(params).toString();
    const fullPath = queryString ? `${path}?${queryString}` : path;
    return AnalyticsInstance.get(fullPath);
}

async function getSalesByPeriod(data) {
    return AnalyticsInstance.post(URLS.SALES_BY_PERIOD, data);
}

async function getTopProducts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const path = queryString ? `${URLS.TOP_PRODUCTS}?${queryString}` : URLS.TOP_PRODUCTS;
    return AnalyticsInstance.get(path);
}

async function getTopCategories(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const path = queryString ? `${URLS.TOP_CATEGORIES}?${queryString}` : URLS.TOP_CATEGORIES;
    return AnalyticsInstance.get(path);
}

async function getRevenueStats(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const path = queryString ? `${URLS.REVENUE_STATS}?${queryString}` : URLS.REVENUE_STATS;
    return AnalyticsInstance.get(path);
}

async function getOrderStats(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const path = queryString ? `${URLS.ORDER_STATS}?${queryString}` : URLS.ORDER_STATS;
    return AnalyticsInstance.get(path);
}

async function getCustomerStats(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const path = queryString ? `${URLS.CUSTOMER_STATS}?${queryString}` : URLS.CUSTOMER_STATS;
    return AnalyticsInstance.get(path);
}

async function getDashboardSummary() {
    return AnalyticsInstance.get(URLS.DASHBOARD_SUMMARY);
}

export default {
    getSalesReport,
    getSalesByDate,
    getSalesByPeriod,
    getTopProducts,
    getTopCategories,
    getRevenueStats,
    getOrderStats,
    getCustomerStats,
    getDashboardSummary,
}; 