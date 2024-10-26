import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://kidskiosk.runasp.net/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
