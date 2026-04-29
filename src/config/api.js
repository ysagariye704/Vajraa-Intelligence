// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  ENDPOINTS: {
    HEALTH: '/health/',
    LOGIN: '/login/',
    SIGNUP: '/signup/',
    PROFILE: '/profile/',
    ADMIN_STATS: '/admin/statistics/',
    ADMIN_CONTACTS: '/admin/contacts/',
    // Add more endpoints as needed
  }
};

// Helper function to get full API URL
export const getApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`.replace(/\/+/g, '/');
};