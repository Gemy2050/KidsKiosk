import axios from "axios";
// const BASE_URL = "http://kidskiosk.runasp.net/api";
const BASE_URL = "https://kidskiosk-api.vercel.app/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
