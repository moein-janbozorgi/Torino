import { getCookie, removeCookie, setCookie } from "@/utils/cookieHelper";

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

      const accessToken = await getNewTokens();
      if (accessToken) {
        setCookie("accessToken", accessToken, 30);
        return api(originalRequest);
      }
      // Refresh token is missing or rejected: the session is over.
      removeCookie();
    }
    return Promise.reject(error?.response?.data ?? error);
  }
);

// Parallel 401s share one in-flight refresh instead of each firing their own.
let refreshPromise = null;

const getNewTokens = () => {
  const refreshToken = getCookie("refreshToken");
  if (!refreshToken) return null;

  refreshPromise ??= axios
    .post(`${BASE_URL}/auth/refresh-token`, { refreshToken })
    .then((res) => res.data?.accessToken)
    .catch(() => null)
    .finally(() => {
      refreshPromise = null;
    });
  return refreshPromise;
};

export { api };
