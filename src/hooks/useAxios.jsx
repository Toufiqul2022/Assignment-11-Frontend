import axios from "axios";
import { getAuth } from "firebase/auth";

const axiosInstance = axios.create({
  baseURL: "https://assignment-11-backend-alpha.vercel.app",
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const user = getAuth().currentUser;
    if (user) {
      const token = await user.getIdToken();
      // Use "Authorization" (capital A) — matches backend & useAxiosSecure
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default function useAxios() {
  return axiosInstance;
}
