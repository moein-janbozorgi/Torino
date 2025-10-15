import { api } from "@/configs/config";
import { removeCookie, setCookie } from "@/utils/cookieHelper";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { toPersianNumber } from "@/utils/helper";

export const useSendOtp = (onSuccessCallback) => {
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

export const useCheckOtp = (onSuccessCallback) => {
  const queryClient = useQueryClient();
  const mutationFn = (data) => api.post("/auth/check-otp", data);

  return useMutation({
    mutationFn,
    onSuccess: (response) => {
      setCookie("accessToken", response?.accessToken, 30);
      setCookie("refreshToken", response?.refreshToken, 365);

      toast.success("شما با موفقیت وارد شدید", {
        autoClose: 1000,
      });

      queryClient.invalidateQueries(["user-data"]);

      if (onSuccessCallback) onSuccessCallback(response.data);
    },
    onError: () => {
      toast.error("درخواست موفقیت امیز نبود");
    },
  });
};

export const useSubmitPassenger = (onSuccessCallback) => {
  const queryClient = useQueryClient();

  const mutationFn = async (data) => {
    const response = await api.post("/order", data);
    return response;
  };

  return useMutation({
    mutationFn,
    onSuccess: (data) => {
      console.log(data);
      toast.success("تور با موفقیت رزرو شد");
      queryClient.invalidateQueries(["basket"]);
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: () => {
      toast.error("ثبت اطلاعات مسافر با خطا مواجه شد");
    },
  });
};

export const useResend = () => {
  const mutationFn = (data) => api.post("/auth/send-otp", data);

  return useMutation({
    mutationFn,
    onSuccess: () => {
      toast.success("کد تایید دوباره ارسال شد", { autoClose: 1000 });
    },
    onError: () => {
      toast.error("ارسال مجدد کد با خطا مواجه شد", { autoClose: 1000 });
    },
  });
};

export const useUpdateUserProfile = (onSuccessCallback) => {
  const queryClient = useQueryClient();

  const mutationFn = async (payload) => {
    const response = await api.put("/user/profile", payload);
    return response;
  };

  return useMutation({
    mutationFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["user-data"]);

      toast.success("دیتا با موفقیت تغییر یافت");

      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (error) => {
      toast.error(error?.message || "مشکلی پیش آمده، دوباره تلاش کنید");
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const handleLogout = () => {
    removeCookie("accessToken", "refreshToken");
    api.defaults.headers.common["Authorization"];
    queryClient.setQueryData(["user-data"], null);
    queryClient.invalidateQueries(["user-data"]);
    toast.success("شما با موفقیت خارج شدید");
  };
  return handleLogout;
};
