"use client";

import { useGetBasket } from "@/hooks/queries";
import Loader from "@/components/tempelates/Loader";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formCheker } from "@/utils/validations";
import { convertToRial, toPersianNumber } from "@/utils/helper";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Controller } from "react-hook-form";
import DateObject from "react-date-object";
import { useEffect, useRef } from "react";
import { useSubmitPassenger } from "@/hooks/mutations";
import { useRouter } from "next/navigation";
import GenderSelect from "@/atoms/genderSelect";

const textInput =
  "h-[55px] w-full appearance-none rounded-[5px] border border-muted bg-surface pr-2.5 text-base font-normal text-muted outline-none xs:w-[250px] md:w-40 lg:w-[220px]";
const fieldError = "mt-[5px] text-xs font-normal text-[#e74c3c] lg:text-sm";

export default function Basket() {
  const router = useRouter();
  const { data, isLoading } = useGetBasket();
  const formRef = useRef();

  const { mutate: submitPassenger } = useSubmitPassenger((data) => {
    setTimeout(() => {
      router.push("/profile/tours");
    }, 1500);
  });

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formCheker),
  });

  if (isLoading) return <Loader />;

  const onSubmit = (formData) => {
    const payload = {
      nationalCode: formData.nationalCode,
      fullName: formData.fullName,
      gender: formData.gender,
      birthDate: formData.birthDate,
    };
    submitPassenger(payload);
  };

  return (
    <div className="mx-auto mt-10 mb-[50px] flex w-full max-w-[1200px] flex-col gap-5 px-5 xs:max-w-[400px] xs:px-8 md:max-w-[950px] md:flex-row md:items-start md:justify-between md:px-12 lg:max-w-[1200px] lg:px-14">
      <div className="rounded-[10px] border border-line px-5 pt-0 pb-[15px] xs:px-10 md:flex md:flex-[1_1_60%] md:flex-col md:gap-5 md:px-5 lg:flex-[1_1_70%]">
        <div className="flex items-center gap-2.5">
          <Image
            src="/images/pblackfull.png"
            width={24}
            height={24}
            alt="profile"
            priority={true}
            className="dark:invert"
          />
          <h1 className="text-2xl font-normal text-fg">مشخصات مسافر</h1>
        </div>
        <form
          className="flex flex-col gap-[25px] md:flex-row md:flex-wrap md:gap-5"
          onSubmit={handleSubmit(onSubmit)}
          ref={formRef}
        >
          <div className="relative flex flex-col">
            <input
              type="text"
              className={textInput}
              placeholder="نام و نام خانوادگی"
              {...register("fullName")}
            />
            {errors.fullName && (
              <span className={fieldError}>{errors.fullName.message}</span>
            )}
          </div>
          <div className="relative flex flex-col">
            <GenderSelect register={register} setValue={setValue} />
            {errors.gender && (
              <span className={fieldError}>{errors.gender.message}</span>
            )}
          </div>
          <div className="relative flex flex-col">
            <input
              type="text"
              className={textInput}
              placeholder="کد ملی"
              {...register("nationalCode")}
            />
            {errors.nationalCode && (
              <span className={fieldError}>
                {errors.nationalCode.message}
              </span>
            )}
          </div>
          <Controller
            name="birthDate"
            control={control}
            render={({ field }) => {
              const selectedDate = field.value
                ? new DateObject({
                    date: field.value,
                    format: "YYYY/MM/DD",
                    calendar: persian,
                  })
                : null;

              return (
                <div className="relative flex flex-col">
                  <DatePicker
                    value={selectedDate}
                    calendar={persian}
                    locale={persian_fa}
                    onChange={(date) =>
                      field.onChange(date.format("YYYY/MM/DD"))
                    }
                    render={(value, openCalendar) => (
                      <div
                        onClick={openCalendar}
                        className="w-[270px] appearance-none rounded-[5px] border border-muted bg-surface px-[5px] py-[15px] text-base font-normal text-muted outline-none xs:max-w-[250px] md:w-40 lg:w-[220px]"
                      >
                        <div className="flex items-center gap-1 text-base font-normal text-muted">
                          <Image
                            src="/images/date.png"
                            width={16}
                            height={16}
                            alt="date"
                            priority={true}
                            className="dark:invert"
                          />
                          <span className="flex items-center justify-center text-center text-base font-normal text-muted">
                            {field.value ? field.value : "تاریخ تولد"}
                          </span>
                        </div>
                      </div>
                    )}
                  />
                  {errors.birthDate && (
                    <span className={fieldError}>
                      {errors.birthDate.message}
                    </span>
                  )}
                </div>
              );
            }}
          />
        </form>
      </div>
      <div className="mt-[30px] rounded-[10px] border border-line md:m-0 md:flex md:flex-[1_1_40%] md:flex-col md:justify-start lg:flex-[1_1_30%]">
        <div className="flex items-center justify-between px-[30px]">
          <h1 className="text-2xl font-semibold text-fg">{data?.title || "  بارگذاری..."}</h1>
          <p className="text-base font-normal text-text">
            {toPersianNumber(5)} روز و {toPersianNumber(4)} شب
          </p>
        </div>
        <div className="mt-2.5 rounded-lg border border-dashed border-line [border-image:repeating-linear-gradient(to_right,#00000080,transparent_7px_10px)_1]"></div>
        <div className="mt-[15px] mb-5 flex justify-between px-[30px]">
          <p className="mt-[18px] text-base font-normal text-text">قیمت نهایی</p>
          <div className="flex items-center gap-[7px]">
            <span className="text-2xl font-medium text-[#009eca] md:text-[22px]">
              {data?.price
                ? toPersianNumber(convertToRial(data.price))
                : "درحال بروزرسانی"}
            </span>
            <p className="mt-[18px] text-sm font-normal text-text/80">
              تومان
            </p>
          </div>
        </div>
        <div>
          <button
            onClick={() => formRef.current.requestSubmit()}
            className="h-14 w-full rounded-[10px] border-none bg-[#28a745] text-2xl font-normal text-white hover:bg-[#6eff9e] md:h-[45px] md:text-xl"
          >
            ثبت و خرید نهایی
          </button>
        </div>
      </div>
    </div>
  );
}
