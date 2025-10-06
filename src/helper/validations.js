import * as yup from "yup";

const phoneCheker = yup.object({
  mobile: yup
    .string()
    .required("وارد کردن شماره موبایل الزامی است")
    .trim()
    .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست (مثال: 09123456789)"),
});

const otpCheker = yup.object().shape({
  otp: yup
    .string()
    .required("لطفا کد تایید را وارد کنید")
    .matches(/^\d{6}$/, "کد تایید باید 6 رقم باشد"),
});

export { phoneCheker, otpCheker };
