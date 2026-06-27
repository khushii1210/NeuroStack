import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const instance = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
});

export default instance;