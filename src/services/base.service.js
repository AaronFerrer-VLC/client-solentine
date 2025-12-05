/**
 * Base Service Class
 * Provides common axios configuration and interceptors for all services
 */

import axios from 'axios';
import { handleApiError } from '../utils/errorHandler';

class BaseService {
  constructor(baseURL) {
    this.axiosApp = axios.create({
      baseURL: `${import.meta.env.VITE_APP_API_URL}${baseURL}`,
      timeout: 30000, // 30 seconds timeout
    });

    this.setupInterceptors();
  }

  setupInterceptors() {
    // Request interceptor - Add auth token
    this.axiosApp.interceptors.request.use(
      (config) => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
          config.headers.Authorization = `Bearer ${storedToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor - Handle errors globally
    this.axiosApp.interceptors.response.use(
      (response) => response,
      (error) => {
        // Handle authentication errors
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          console.error('Authentication error. Token may have expired.');
          localStorage.removeItem('authToken');
          localStorage.removeItem('userId');
          
          // Only redirect if not already on login page
          if (!window.location.pathname.includes('/inicio-sesion')) {
            window.location.href = '/inicio-sesion';
          }
        }
        
        // Log error for debugging
        if (import.meta.env.DEV) {
          console.error('API Error:', {
            url: error.config?.url,
            method: error.config?.method,
            status: error.response?.status,
            data: error.response?.data,
            error: error.message
          });
        }
        
        return Promise.reject(error);
      }
    );
  }

  // Generic CRUD methods
  async get(endpoint, config = {}) {
    try {
      const response = await this.axiosApp.get(endpoint, config);
      return response;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  async post(endpoint, data = {}, config = {}) {
    try {
      const response = await this.axiosApp.post(endpoint, data, config);
      return response;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  async put(endpoint, data = {}, config = {}) {
    try {
      const response = await this.axiosApp.put(endpoint, data, config);
      return response;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  async patch(endpoint, data = {}, config = {}) {
    try {
      const response = await this.axiosApp.patch(endpoint, data, config);
      return response;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  async delete(endpoint, config = {}) {
    try {
      const response = await this.axiosApp.delete(endpoint, config);
      return response;
    } catch (error) {
      throw handleApiError(error);
    }
  }
}

export default BaseService;

