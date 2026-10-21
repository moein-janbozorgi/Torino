"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetUserInfo } from "@/hooks/queries";
import Image from "next/image";
import { toPersianNumber } from "@/utils/helper";
import { emailChecker } from "@/utils/validations";
import { useUpdateUserProfile } from "@/hooks/mutations";

export default function UserInfo() {
  const { data } = useGetUserInfo();
  const [isEditing, setIsEditing] = useState(false);

  const mutation = useUpdateUserProfile(() => setIsEditing((s) => !s));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(emailChecker),
    defaultValues: { email: data?.email || "" },
  });

  const onSubmit = async (values) => {
    const merged = { ...data, ...values };
    await mutation.mutateAsync(merged);
  };

  return (
    <div className="mx-auto mb-4 w-full max-w-[330px] rounded-[10px] border border-line bg-surface px-5 xs:max-w-[600px] lg:max-w-[1200px]">
      <div className="flex justify-between">
        <h3 className="text-base font-normal text-fg">اطلاعات حساب کاربری</h3>
        {data?.email ? (
          <div className="flex items-center gap-1.5">
            <Image src="/images/edit.png" width={12} height={12} alt="edit" />
            <p
              onClick={() => setIsEditing((s) => !s)}
              className="text-[13px] font-normal text-[#009eca]"
            >
              ویرایش اطلاعات
            </p>
          </div>
        ) : null}
      </div>
      <div className="lg:flex lg:justify-between">
        <div className="flex items-center justify-between lg:gap-[30px] lg:px-2.5">
          <p className="text-sm font-light text-fg">شماره موبایل</p>
          <span className="text-sm font-normal text-text">
            {toPersianNumber(data?.mobile)}
          </span>
        </div>
        {isEditing ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full items-start justify-between gap-2.5 pb-2.5 lg:w-1/2"
          >
            <div className="flex flex-col lg:relative lg:flex-1">
              <input
                {...register("email")}
                className="w-full rounded-[5px] border border-line p-2 text-xs font-normal text-muted outline-none lg:w-[200px]"
                type="text"
                placeholder="آدرس ایمیل"
              />
              {errors.email && (
                <span className="mt-1 text-right text-sm font-normal text-[#e74c3c] lg:absolute lg:right-[3px] lg:-bottom-5 lg:text-xs">
                  {errors.email.message}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="w-[30%] rounded-[5px] border-none bg-[#28a745] px-0 py-[5px] text-base font-normal text-white transition-all duration-200 ease-in hover:bg-[#6eff9e] hover:text-white lg:w-2/5"
              disabled={mutation.isLoading}
            >
              تایید
            </button>
          </form>
        ) : (
          <div className="flex justify-between lg:gap-[100px]">
            <div className="flex w-full items-center justify-between lg:gap-[70px]">
              <p className="text-sm font-light text-fg">ایمیل</p>
              <span className="text-text [overflow-wrap:anywhere] [word-break:break-word]">{data?.email || ""}</span>
            </div>
            {!data?.email ? (
              <div className="flex items-center gap-[5px]">
                <Image
                  src="/images/edit.png"
                  width={16}
                  height={16}
                  alt="edit"
                />
                <p
                  onClick={() => setIsEditing((s) => !s)}
                  className="text-sm font-normal text-[#009eca]"
                >
                  افزودن
                </p>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
