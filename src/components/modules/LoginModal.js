"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { toPersianNumber } from "@/utils/helper";
import { useSendOtp } from "@/hooks/mutations";
import { phoneCheker } from "@/utils/validations";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const OTP_COOLDOWN_SECONDS = 120;

// Seconds left before another OTP may be requested, 0 when none.
function remainingCooldown() {
  if (typeof window === "undefined") return 0;
  const lastSent = localStorage.getItem("otpSentAt");
  if (!lastSent) return 0;
  const elapsed = (Date.now() - Number(lastSent)) / 1000;
  return elapsed < OTP_COOLDOWN_SECONDS ? OTP_COOLDOWN_SECONDS - elapsed : 0;
}

function LoginModal({ setIsOn, setOtp, setPhone }) {
  // Read the cooldown straight from localStorage on first render instead of
  // syncing it in via setState. canSend is never rendered, only checked in
  // onSubmit, so deriving it up front cannot cause a hydration mismatch.
  const [canSend, setCanSend] = useState(() => remainingCooldown() === 0);

  useEffect(() => {
    if (canSend) return;
    const timeout = setTimeout(
      () => setCanSend(true),
      remainingCooldown() * 1000
    );
    return () => clearTimeout(timeout);
  }, [canSend]);

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
    <div className="fixed inset-0 z-10 flex size-full animate-fade-in items-center justify-center bg-black/45 backdrop-blur-[2px]">
      <div className="relative w-[280px] animate-pop-up rounded-[20px] bg-white text-center lg:ml-2.5 lg:w-[450px]">
        <Image
          src="/images/add.png"
          width={34}
          height={34}
          alt="close-btn"
          onClick={() => setIsOn((s) => !s)}
          className="absolute top-[13px] left-[15px] cursor-pointer opacity-80 transition-opacity duration-200 hover:opacity-100"
        />
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="p-[30px]">
            <h1 className="mb-10 text-[22px] font-semibold text-[#282828] lg:mb-[30px]">ورود به تورینو</h1>
            <p className="mr-2.5 text-right text-base font-light">شماره موبایل خود را وارد کنید</p>
            <div>
              <input
                type="text"
                className="w-full rounded-md border border-[#00000040] px-[5px] py-5 text-[15px] font-light focus:border-[#166534] focus:outline-none lg:w-[95%] lg:px-1.5 lg:py-2.5"
                placeholder={toPersianNumber("4253***0912")}
                {...register("mobile")}
              />
              {errors.mobile && (
                <p className="mt-2 mr-2.5 text-right text-xs font-light text-[#e53e3e]">{errors.mobile.message}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-[1.8rem] h-[3.4rem] w-full cursor-pointer rounded-md border border-[#166534] bg-[#28a745] text-lg font-medium text-white transition-[background,transform] duration-200 hover:bg-[#6eff9e] hover:text-white disabled:cursor-not-allowed disabled:opacity-60 lg:h-12 lg:w-[98%]"
            >
              ارسال کد تایید
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
