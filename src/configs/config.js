import { getCookie, getNewTokens, setCookie } from "@/utils/cookieHelper";

import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (request) => {
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      request.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const res = await getNewTokens();
      console.log(res?.data?.accessToken);

      if (res?.status === 200) {
        setCookie("accessToken", res?.data?.accessToken, 30);
        return api(originalRequest);
      }
    } else {
      setCookie("accessToken", "", 0);
      setCookie("refreshToken", "", 0);
    }

    return Promise.reject(error?.response?.data);
  }
);

export { api };
