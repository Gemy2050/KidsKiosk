import axios from "axios";
import Cookies from "js-cookie";
const BASE_URL = "https://kidskiosk-api-mongodb.vercel.app/api";

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
    console.log(error);
    if (error.status == 401) {
      Cookies.remove("auth");
      Cookies.remove("auth_state");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
