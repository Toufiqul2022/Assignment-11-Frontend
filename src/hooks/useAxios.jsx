import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // Fixed spelling here
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
