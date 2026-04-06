
/**
 * Catatan: Semua env variables di Vite harus menggunakan prefix VITE_
 * untuk bisa diakses di client-side code
 */

export const API_CONFIG = {
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 30000, // Increased to 30 seconds
    env: import.meta.env.VITE_ENV || 'development',
  };
  
  
  export const getApiUrl = (endpoint) => {
    const baseURL = API_CONFIG.baseURL.replace(/\/$/, ''); // Remove trailing slash
    const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${baseURL}${path}`;
  };
  
  // Export default untuk kemudahan import
  export default API_CONFIG;