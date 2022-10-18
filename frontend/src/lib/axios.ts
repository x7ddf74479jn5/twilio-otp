import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
