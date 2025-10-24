"use client";

import styles from "@/styles/LoginModal.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { toPersianNumber } from "@/utils/helper";
import { useSendOtp } from "@/hooks/mutations";
import { phoneCheker } from "@/utils/validations";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function LoginModal({ setIsOn, setOtp, setPhone }) {
  const [canSend, setCanSend] = useState(true);
  useEffect(() => {
    const lastSent = localStorage.getItem("otpSentAt");
    if (lastSent) {
      const elapsed = (Date.now() - Number(lastSent)) / 1000;
      if (elapsed < 120) {
        setCanSend(false);
        const timeout = setTimeout(
          () => setCanSend(true),
          (120 - elapsed) * 1000
        );
        return () => clearTimeout(timeout);
      }
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(phoneCheker) });

  const { mutate } = useSendOtp(() => {
    localStorage.setItem("otpSentAt", Date.now());
    setIsOn((s) => !s);
    setOtp((s) => !s);
  });

  const onSubmit = (data) => {
    if (!canSend) {
      toast.error("کد قبلی هنوز منقضی نشده، لطفاً کمی صبر کنید ⏳");
      return;
    }

    setPhone(data.mobile);
    mutate(data);
    setCanSend(false);
    setTimeout(() => setCanSend(true), 120000);
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
            <div className={styles.inputWrapper}>
              <input
                type="text"
                placeholder={toPersianNumber("4253***0912")}
                {...register("mobile")}
              />
              {errors.mobile && (
                <p className={styles.error}>{errors.mobile.message}</p>
              )}
            </div>
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
