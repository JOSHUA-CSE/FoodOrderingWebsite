import axios from 'axios';

// Use environment variable for API URL, fallback to localhost for development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to every request
api.interceptors.request.use((config) => {
  let token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Handle response errors
api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
  return Promise.reject(error);
});

// Auth functions
export const authAPI = {
  signup: function(userData) {
    return api.post('/auth/register', userData);
  },
  login: function(credentials) {
    return api.post('/auth/login', credentials);
  }
};

// Menu functions
export const menuAPI = {
  getAllItems: function() {
    return api.get('/items');
  },
  getItemById: function(id) {
    return api.get('/items/' + id);
  },
  getItemsByCategory: function(category) {
    return api.get('/items?category=' + category);
  }
};

// Cart functions
export const cartAPI = {
  addToCart: function(cartData) {
    return api.post('/cart', cartData);
  },
  getCart: function() {
    return api.get('/cart');
  },
  updateCart: function(itemId, quantity) {
    return api.put('/cart', { itemId: itemId, quantity: quantity });
  },
  removeFromCart: function(itemId) {
    return api.delete('/cart/' + itemId);
  }
};

// Order functions
export const orderAPI = {
  placeOrder: function(orderData) {
    return api.post('/orders', orderData);
  },
  createPaymentOrder: function(orderData) {
    return api.post('/orders/create-payment', orderData);
  },
  verifyPayment: function(paymentData) {
    return api.post('/orders/verify', paymentData);
  },
  getUserOrders: function() {
    return api.get('/orders');
  },
  getOrderById: function(id) {
    return api.get('/orders/' + id);
  },
  getAllOrders: function() {
    return api.get('/orders/all');
  },
  updateOrderStatus: function(id, status) {
    return api.put('/orders/' + id, { status: status });
  }
};

// Admin functions
export const adminAPI = {
  addMenuItem: function(itemData) {
    return api.post('/admin', itemData);
  },
  editMenuItem: function(id, itemData) {
    return api.put('/admin/' + id, itemData);
  },
  deleteMenuItem: function(id) {
    return api.delete('/admin/' + id);
  },
  getStats: function() {
    return api.get('/admin/stats');
  }
};

export default api;
