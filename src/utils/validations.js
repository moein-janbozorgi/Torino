import * as yup from "yup";

const phoneCheker = yup.object({
  mobile: yup
    .string()
    .required("وارد کردن شماره موبایل الزامی است")
    .trim()
    .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست (مثال: 09123456789)"),
});

const emailChecker = yup.object({
  email: yup
    .string()
    .trim()
    .lowercase()
    .required("ایمیل را وارد کنید.")
    .max(254, "ایمیل نباید بیشتر از ۲۵۴ کاراکتر باشد.")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "فرمت ایمیل معتبر نیست."),
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
  nationalCode: yup
    .string()
    .matches(/^\d{10}$/, "کد ملی باید ۱۰ رقم باشد")
    .required("کد ملی الزامی است"),
  birthDate: yup.string().required("تاریخ تولد الزامی است"),
});

const searchChecker = yup.object().shape({
  origin: yup.string().required("لطفاً مبدا را انتخاب کنید"),
  dateRange: yup
    .array()
    .of(yup.string())
    .min(2, "لطفاً بازه زمانی رفت و برگشت را انتخاب کنید")
    .required("انتخاب تاریخ الزامی است"),
});

const bankChecker = yup.object({
  accountIdentifier: yup
    .string()
    .matches(/^\d+$/, "شماره حساب فقط عدد باشد")
    .required("شماره حساب الزامی است"),
  shaba_code: yup
    .string()
    .matches(/^IR\d{24}$/, "شماره شبا معتبر نیست")
    .required("شماره شبا الزامی است"),
  debitCard_code: yup
    .string()
    .matches(/^\d{16}$/, "شماره کارت باید ۱۶ رقم باشد")
    .required("شماره کارت الزامی است"),
});

export {
  phoneCheker,
  otpCheker,
  formCheker,
  searchChecker,
  bankChecker,
  emailChecker,
};
