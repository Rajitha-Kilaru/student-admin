import axios from "axios";
import { store } from "./redux/store";

const dev = true;

const api = axios.create({
  baseURL:  dev ? "http://localhost:3000" : "sss",
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state?.user?.data?.token;
    if (token) {
      config.headers['x-auth-token'] = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 401) {
      }
      return Promise.reject(error);
    }
  );

export default api;
