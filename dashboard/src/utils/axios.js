import axios from "axios";
import { tr } from "zod/v4/locales";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/${
    import.meta.env.VITE_BASE_API
  }`,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// response interceptor
api.interceptors.request.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
    }
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/${
          import.meta.env.VITE_BASE_API
        }/auth/refresh`,
        { withCredentials: true }
      );

      const newAccessToken = res.data.accessToken;
      localStorage.setItem("accessToken", newAccessToken);
    } catch (error) {}
  }
);
export { api };
