"use client";

import styles from "@/styles/LoginModal.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { phoneCheker, toPersianNumber } from "@/helper/helper";
import { useLogin } from "@/hooks/mutations";

function LoginModal({ setIsOn, setOtp, setPhone }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(phoneCheker) });

  const { mutate } = useLogin(() => {
    setIsOn((s) => !s);
    setOtp((s) => !s);
  });

  const onSubmit = (data) => {
    console.log(data)
    setPhone(data.mobile);
    mutate(data);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <Image
          src="/images/add.png"
          width={34}
          height={34}
          alt="close-btn"
          onClick={() => setIsOn((s) => !s)}
          className={styles.closeBtn}
        />
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.inner}>
            <h1>ورود به تورینو</h1>
            <p>شماره موبایل خود را وارد کنید</p>
            <input
              type="number"
              placeholder={toPersianNumber("4253***0912")}
              {...register("mobile")}
            />
            {errors.mobile && (
              <p className={styles.error}>{errors.mobile.message}</p>
            )}
            <button type="submit" disabled={isSubmitting}>
              ارسال کد تایید
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
