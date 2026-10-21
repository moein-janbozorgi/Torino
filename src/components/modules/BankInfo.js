"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetUserInfo } from "@/hooks/queries";
import Image from "next/image";
import { toPersianNumber } from "@/utils/helper";
import { bankChecker } from "@/utils/validations";

import { useUpdateUserProfile } from "@/hooks/mutations";

const heading = "text-base font-normal text-fg";
const inputWrapper = "flex flex-col gap-2.5 lg:flex-1 lg:px-3";
const input =
  "rounded-[5px] border border-line px-[5px] py-2.5 text-sm font-normal text-muted outline-none lg:w-[95%] lg:py-[7px]";
const fieldError = "text-right text-sm font-normal text-[#e74c3c]";
const dataLabel = "text-sm font-light text-fg";
const dataValue = "inline-block text-right text-sm font-normal text-text";

export default function BankInfo() {
  const { data } = useGetUserInfo();

  const [isEditing, setIsEditing] = useState(false);

  const mutation = useUpdateUserProfile(() => setIsEditing((s) => !s));

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bankChecker),
    defaultValues: data?.payment || {},
  });

  useEffect(() => {
    if (data?.payment) {
      reset(data.payment);
    }
  }, [data, reset]);

  const onSubmit = async (values) => {
    const merged = { ...data, payment: values };
    await mutation.mutateAsync(merged);
  };

  return (
    <div className="mx-auto mb-4 w-full max-w-[330px] rounded-[10px] border border-line bg-surface px-5 xs:max-w-[600px] lg:max-w-[1200px] lg:p-0">
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className={`${heading} lg:px-[15px]`}>ویرایش اطلاعات حساب بانکی</h3>
          <div className="flex flex-col gap-[15px] lg:flex-row lg:gap-0 lg:pb-5">
            <div className={inputWrapper}>
              <input
                placeholder="شماره کارت"
                className={input}
                {...register("debitCard_code")}
              />
              {errors.debitCard_code && (
                <span className={fieldError}>
                  {errors.debitCard_code.message}
                </span>
              )}
            </div>

            <div className={inputWrapper}>
              <input
                placeholder="شماره حساب"
                className={input}
                {...register("accountIdentifier")}
              />
              {errors.accountIdentifier && (
                <span className={fieldError}>
                  {errors.accountIdentifier.message}
                </span>
              )}
            </div>

            <div className={inputWrapper}>
              <input
                placeholder="شماره شبا"
                className={input}
                {...register("shaba_code")}
              />
              {errors.shaba_code && (
                <span className={fieldError}>
                  {errors.shaba_code.message}
                </span>
              )}
            </div>
          </div>
          <div className="lg:h-px lg:w-full lg:border lg:border-line"></div>
          <div className="flex gap-2.5 pt-2.5 pb-[15px] lg:w-full lg:justify-end lg:pb-2.5 lg:pl-[25px]">
            <button
              type="submit"
              className="w-full rounded-[5px] border-none bg-[#0f766e] p-2 text-base font-semibold text-white transition-all duration-200 ease-in hover:bg-[#115e59] hover:text-white lg:w-1/5 lg:px-0 lg:py-[5px]"
              disabled={mutation.isLoading}
            >
              تایید
            </button>
            <button
              type="button"
              className="w-full rounded-[5px] border-2 border-solid border-primary bg-surface p-2 text-base font-semibold text-primary transition-all duration-200 ease-in hover:bg-[#0f766e] hover:text-white lg:w-1/5 lg:px-0 lg:py-[5px]"
              onClick={() => setIsEditing((s) => !s)}
            >
              انصراف
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="flex justify-between lg:px-5">
            <h3 className={heading}>اطلاعات حساب بانکی</h3>
            <div className="flex items-center gap-1.5">
              <Image src="/images/edit.png" width={12} height={12} alt="edit" />
              <p
                onClick={() => setIsEditing((s) => !s)}
                className="text-[13px] font-normal text-[#009eca]"
              >
                ویرایش اطلاعات
              </p>
            </div>
          </div>
          <div className="flex flex-col lg:pr-5">
            <div className="lg:flex lg:flex-row-reverse lg:justify-end lg:gap-[70px]">
              <div className="flex items-center justify-between lg:gap-5">
                <p className={dataLabel}>شماره کارت</p>
                <span className={dataValue}>
                  {toPersianNumber(data?.payment?.debitCard_code) || "—"}
                </span>
              </div>
              <div className="flex items-center justify-between lg:justify-normal lg:gap-[60px]">
                <p className={dataLabel}>شماره شبا</p>
                <span className={dataValue}>{toPersianNumber(data?.payment?.shaba_code) || "—"}</span>
              </div>
            </div>
            <div className="flex items-center justify-between lg:justify-normal lg:gap-10">
              <p className={dataLabel}>شماره حساب</p>
              <span className={dataValue}>
                {toPersianNumber(data?.payment?.accountIdentifier) || "—"}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
