"use client";

import Cookies from "js-cookie";

const setCookie = (tokens) => {
  document.cookie = `accessToken=${tokens.accessToken}; max-age=${
    1 * 24 * 60 * 160
  }`;
  document.cookie = `refreshToken=${tokens.refreshToken}; max-age=${
    30 * 24 * 60 * 160
  }`;
};

function getCookie(name) {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const getNewTookens = async () => {
  const refreshToken = getCookie("refreshToken");
  if (!refreshToken) return null;

  try {
    const { data } = await api.post("/auth/refresh-token", { refreshToken });
    api.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;
    return data.accessToken;
  } catch (error) {
    return null;
  }
};

const removeCookie = (name) => {
  Cookies.remove(name,);
};

export { setCookie, getCookie, getNewTookens, removeCookie };
