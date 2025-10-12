"use client";

import { toPersianNumber } from "@/utils/helper";
import { otpCheker } from "@/utils/validations";
import { useCheckOtp, useResend, useSendOtp } from "@/hooks/mutations";
import styles from "@/styles/OtpModal.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import OtpInput from "react-otp-input";

function OtpModal({ setOtp, phone, setIsOn }) {
  const [seconds, setSeconds] = useState(120);

  useEffect(() => {
    if (seconds <= 0) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(otpCheker) });

  const otp = watch("otp") || "";

  const backHandler = () => {
    setOtp((s) => !s);
    setIsOn((s) => !s);
  };

  const { mutate } = useCheckOtp(() => {
    setOtp((s) => !s);
  });

  const { mutate: resendMutate } = useResend();

  const resendHandler = () => {
    resendMutate({ mobile: phone });
    setSeconds(120);
  };

  const onSubmit = (data) => {
    const newData = {
      mobile: phone,
      code: data.otp,
    };
    mutate(newData);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <Image
          src="/images/arrowleft.png"
          width={24}
          height={24}
          alt="close-btn"
          className={styles.closeBtn}
          onClick={backHandler}
        />
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.inner}>
            <h1>کد تایید را وارد کنید.</h1>
            <p>کد تایید به شماره {toPersianNumber(phone)} ارسال شد</p>
            <OtpInput
              value={otp}
              onChange={(value) => {
                setValue("otp", value, { shouldValidate: true });
                if (value.length === 6) {
                  handleSubmit(onSubmit)();
                }
              }}
              numInputs={6}
              containerStyle={{
                direction: "ltr",
                display: "flex",
                justifyContent: "center",
                gap: "5px",
              }}
              renderSeparator={() => (
                <span style={{ width: "10px", display: "inline-block" }}></span>
              )}
              renderInput={(props) => (
                <input
                  {...props}
                  style={{
                    width: "40px",
                    height: "40px",
                    textAlign: "center",
                    borderRadius: "6px",
                    border: "1px solid #bdbcbce1",
                    marginBottom: "10px",
                  }}
                  onPaste={(e) => {
                    e.preventDefault();
                    const paste = e.clipboardData.getData("text");
                    const cleaned = paste.replace(/\D/g, "").slice(0, 6);
                    setValue("otp", cleaned, { shouldValidate: true });
                    if (cleaned.length === 6) {
                      handleSubmit(onSubmit)();
                    }
                  }}
                />
              )}
            />
            <input type="hidden" {...register("otp")} value={otp} />
            {errors.otp && <p className={styles.error}>{errors.otp.message}</p>}
            <div className={styles.resend}>
              {seconds > 0 ? (
                <div>
                  <span>
                    {toPersianNumber(Math.floor(seconds / 60))}:
                    {toPersianNumber(String(seconds % 60).padStart(2, "0"))}
                  </span>
                  <p>تا ارسال مجدد کد</p>
                </div>
              ) : (
                <p onClick={resendHandler}>ارسال دوباره کد</p>
              )}
            </div>
            <button type="submit" disabled={isSubmitting}>
              ورود به تورینو
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OtpModal;
