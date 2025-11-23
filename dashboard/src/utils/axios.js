import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/${
    import.meta.env.VITE_BASE_API
  }`,
});

// Add a request interceptor
api.interceptors.request.use((config) => {
  console.log(config);
});

export { api };
