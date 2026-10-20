import { getCookie, setCookie } from "@/utils/cookieHelper";

import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

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
    const status = error.response?.status;

    // A network-level failure (backend down, DNS, timeout) has no response at
    // all. Reading .status off it unguarded replaced the real ECONNREFUSED
    // with a confusing "cannot read properties of undefined".
    if ((status === 401 || status === 403) && !originalRequest?._retry) {
      originalRequest._retry = true;

      const res = await getNewTokens();
      if (res?.status === 200) {
        setCookie("accessToken", res?.data?.accessToken, 30);
        return api(originalRequest);
      }
    }
    return Promise.reject(error?.response?.data ?? error);
  }
);

const getNewTokens = async () => {
  const refreshToken = getCookie("refreshToken");
  if (!refreshToken) return;

  try {
    const response = axios.post(`${BASE_URL}/auth/refresh-token`, {
      refreshToken,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export { api };
