import axios from "axios";
import Cookies from "js-cookie";
const BASE_URL = "https://kidskiosk-api-mongodb.vercel.app/api";
// const BASE_URL = "http://localhost:3000/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("auth");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove("auth");
      Cookies.remove("auth_state");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
