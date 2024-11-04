import axios, {AxiosError} from "axios";

export const baseUrl = "http://localhost:4000";

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (axios.isAxiosError(error)) {
        const { data } = error.response!;
  
        return Promise.reject(data);
      }
      return Promise.reject(error);
    }
  );