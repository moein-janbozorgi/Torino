"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export default function useAuthGuard({
  redirect = "/",
  message = "برای ادامه لطفاً وارد حساب کاربری خود شوید.",
  autoCheck = true, 
} = {}) {
  const router = useRouter();
  const token = Cookies.get("accessToken");


  useEffect(() => {
    if (autoCheck && !token) {
      toast.error(message);
      router.replace(redirect);
    }
  }, [autoCheck, token, router, message, redirect]);

  const checkAuth = useCallback(
    (onSuccess) => {
      if (!token) {
        toast.error(message);
        router.replace(redirect);
        return false;
      }
      if (typeof onSuccess === "function") onSuccess();
      return true;
    },
    [token, router, redirect, message]
  );

  return { isAuthenticated: !!token, checkAuth };
}
