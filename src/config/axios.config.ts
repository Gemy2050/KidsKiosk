import axios from "axios";
const BASE_URL = "https://kidskiosk-api-mongodb.vercel.app/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
