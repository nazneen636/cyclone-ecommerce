import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/${
    import.meta.env.VITE_BASE_API
  }`,
  withCredentials: true,
});

// ---------------------------
// Request Interceptor
// ---------------------------
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ---------------------------
// Response Interceptor
// ---------------------------
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Refresh token
        const refreshRes = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/${
            import.meta.env.VITE_BASE_API
          }/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = refreshRes.data?.data?.accessToken;

        // Store token
        localStorage.setItem("accessToken", newAccessToken);

        // Retry old request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (err) {
        console.error("Refresh failed:", err);
      }
    }

    return Promise.reject(error);
  }
);

export { api };
