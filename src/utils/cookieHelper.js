"use client";

import Cookies from "js-cookie";

const setCookie = (name, value, days) => {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

function getCookie(name) {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

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

const removeCookie = (name) => {
  Cookies.remove(name);
};

export { setCookie, getCookie, removeCookie, getNewTokens };
