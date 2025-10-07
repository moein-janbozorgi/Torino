import { api } from "@/configs/config";
import { toPersianNumber } from "@/helper/helper";
import { setCookie } from "@/utils/cookieHelper";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useLogin = (onSuccessCallback) => {
  const mutationFn = (data) => api.post("/auth/send-otp", data);

  return useMutation({
    mutationFn,
    onSuccess: (response) => {
      toast.success(`کد تایید شما ${toPersianNumber(response.code)}`, {
        autoClose: 3000,
      });
      if (onSuccessCallback) onSuccessCallback(response.data);
    },
    onError: () => {
      toast.error("درخواست موفقیت امیز نبود");
    },
  });
};

export const useSendOtp = (onSuccessCallback) => {
  const mutationFn = (data) => api.post("/auth/check-otp", data);

  return useMutation({
    mutationFn,
    onSuccess: (response) => {
      setCookie(response);
      toast.success("شما با موفقیت وارد شدید", {
        autoClose: 1000,
      });

      if (onSuccessCallback) onSuccessCallback(response.data);
    },
    onError: () => {
      toast.error("درخواست موفقیت امیز نبود");
    },
  });
};

export const useResend = () => {
  const mutationFn = (data) => api.post("/auth/send-otp", data);

  return useMutation({
    mutationFn,
    mutationFn,
    onSuccess: () => {
      toast.success("کد تایید دوباره ارسال شد", { autoClose: 1000 });
    },
    onError: () => {
      toast.error("ارسال مجدد کد با خطا مواجه شد", { autoClose: 1000 });
    },
  });
};
