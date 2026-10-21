"use client";

import { toPersianNumber } from "@/utils/helper";
import { otpCheker } from "@/utils/validations";
import { useCheckOtp, useResend, useSendOtp } from "@/hooks/mutations";
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

  useEffect(() => {
    const lastSent = localStorage.getItem("otpSentAt");
    if (lastSent) {
      const elapsed = (Date.now() - Number(lastSent)) / 1000;
      if (elapsed < 120) setSeconds(120 - Math.floor(elapsed));
    }

    if (seconds <= 0) return;
    const interval = setInterval(() => setSeconds((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, []);

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
    <div className="fixed inset-0 z-10 flex size-full animate-fade-in items-center justify-center bg-black/45 backdrop-blur-[2px]">
      <div className="relative w-[350px] animate-pop-up rounded-[20px] bg-white text-center lg:ml-2.5 lg:w-[450px]">
        <Image
          src="/images/arrowleft.png"
          width={24}
          height={24}
          alt="close-btn"
          className="absolute top-[13px] left-[15px] cursor-pointer opacity-80 transition-opacity duration-200 hover:opacity-100"
          onClick={backHandler}
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-[30px]">
            <h1 className="mt-[25px] text-[22px] font-semibold text-[#282828]">کد تایید را وارد کنید.</h1>
            <p className="text-sm font-normal text-[#282828]">
              کد تایید به شماره {toPersianNumber(phone)} ارسال شد</p>
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
                  className="focus:outline-none"
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
            {errors.otp && (
              <p className="mt-2 text-center text-sm font-normal text-[#e53e3e]">
                {errors.otp.message}
              </p>
            )}
            <div className="flex justify-center">
              {seconds > 0 ? (
                <div className="flex items-center justify-center gap-[3px]">
                  <span className="text-[13px] font-light text-[#282828]">
                    {toPersianNumber(Math.floor(seconds / 60))}:
                    {toPersianNumber(String(seconds % 60).padStart(2, "0"))}
                  </span>
                  <p className="text-[13px] font-light text-[#282828]">
                    تا ارسال مجدد کد
                  </p>
                </div>
              ) : (
                <p
                  onClick={resendHandler}
                  className="text-sm font-normal text-[#282828]"
                >
                  ارسال دوباره کد
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 mb-2.5 h-[3.4rem] w-[95%] cursor-pointer rounded-md border border-[#166534] bg-[#28a745] text-lg font-medium text-white transition-[background,transform] duration-200 hover:bg-[#6eff9e] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              ورود به تورینو
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OtpModal;
