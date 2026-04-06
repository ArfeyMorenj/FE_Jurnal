import axios from "axios";
import { API_CONFIG } from "../config/api";

const apiClient = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
});

const getStoredToken = () => {
  // Semua session selalu di localStorage
  return localStorage.getItem("token");
};

apiClient.interceptors.request.use(
  (config) => {
    const token = getStoredToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const isFormData = config.data instanceof FormData;

    if (isFormData) {
      delete config.headers["Content-Type"];
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // contoh handle: redirect ke login
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);


export default apiClient;


