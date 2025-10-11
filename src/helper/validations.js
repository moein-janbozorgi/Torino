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

const formCheker = yup.object().shape({
  fullName: yup
    .string()
    .required("نام و نام خانوادگی الزامی است")
    .min(7, "نام و نام خانوادگی باید شامل حداقل 7 حرف باشد")
    .max(20, "نام و نام خانوادگی باید شامل حداکثر 20 حرف باشد"),
  gender: yup.string().required("انتخاب جنسیت الزامی است"),
  nationalId: yup
    .string()
    .matches(/^\d{10}$/, "کد ملی باید ۱۰ رقم باشد")
    .required("کد ملی الزامی است"),
  date: yup.string().required("تاریخ تولد الزامی است"),
});

const searchChecker = yup.object().shape({
  origin: yup.string().required("لطفاً مبدا را انتخاب کنید"),

  destination: yup
    .string()
    .required("لطفاً مقصد را انتخاب کنید")
    .notOneOf([yup.ref("origin")], "مبدا و مقصد نمی‌توانند یکسان باشند"),
  dateRange: yup
    .array()
    .of(yup.string())
    .min(2, "لطفاً بازه زمانی رفت و برگشت را انتخاب کنید")
    .required("انتخاب تاریخ الزامی است"),
});

export { phoneCheker, otpCheker, formCheker, searchChecker };
