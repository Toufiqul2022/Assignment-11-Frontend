import axios from "axios";
import { getAuth } from "firebase/auth";

const axiosSecure = axios.create({
  baseURL: "https://assignment-11-backend-alpha.vercel.app",
});

// Always use getIdToken() — never accessToken
axiosSecure.interceptors.request.use(
  async (config) => {
    const user = getAuth().currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Auto-retry on 401 with fresh token
axiosSecure.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const user = getAuth().currentUser;
        if (user) {
          const token = await user.getIdToken(true);
          original.headers.Authorization = `Bearer ${token}`;
          return axiosSecure(original);
        }
      } catch (e) {
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  },
);

const useAxiosSecure = () => axiosSecure;
export default useAxiosSecure;
