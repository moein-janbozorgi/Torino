import { getCookie, getNewTookens, setCookie } from "@/utils/cookieHelper";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getCookie("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response.data, 
  async (error) => {
    const originalRequest = error.config;

    const status = error.response?.status;
    const notRetried = !originalRequest._retry;

    if ((status === 401 || status === 403) && notRetried) {
      originalRequest._retry = true;

      const newAccessToken = await getNewTookens();
      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export { api };
