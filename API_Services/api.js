import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:5000/api/v1",
  baseURL: "https://jobdev-backend.onrender.com/api/v1",
  withCredentials: true, 
});

// Response interceptor — auto refresh token on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
  //   if (original.url?.includes("/auth/refresh")) {
  // return Promise.reject(error);
// }
  const skipRefresh =
      original.url?.includes("/auth/login") ||
      original.url?.includes("/auth/register") ||
      original.url?.includes("/auth/me") ||
      original.url?.includes("/auth/refresh") ||
      original.url?.includes("/auth/forgot-password");

    if (error.response?.status === 401 && !original._retry && !skipRefresh) {
      original._retry = true;
      try {
        await api.post("/auth/refresh", {}, { withCredentials: true });
        return api(original); 
      } catch(err) {

       if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
         return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
