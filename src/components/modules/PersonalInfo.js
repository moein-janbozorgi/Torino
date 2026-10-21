"use client";

import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetUserInfo } from "@/hooks/queries";
import Image from "next/image";
import { toPersianNumber } from "@/utils/helper";
import { formCheker } from "@/utils/validations";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { toast } from "react-toastify";
import { useUpdateUserProfile } from "@/hooks/mutations";

const heading = "pr-5 text-base font-normal text-fg";
const textInput =
  "h-[55px] w-full rounded-[5px] border border-muted bg-surface pr-2.5 text-base text-muted outline-none lg:h-[45px] lg:w-[245px] lg:px-3 lg:py-2.5 lg:text-[15px]";
const fieldError = "relative top-0 mt-1 text-right text-[13px] text-[#e74c3c]";
const genderOption =
  "m-0 cursor-pointer p-2.5 text-base text-muted hover:bg-surface-2";
const actionButton =
  "w-full rounded-[5px] p-2 text-base font-semibold transition-all duration-200 ease-in lg:w-1/5 lg:px-0 lg:py-[5px]";
const dataRow = "flex items-center justify-between";
const dataLabel = "text-sm font-light text-fg lg:text-[15px]";
const dataValue = "inline-block text-right text-sm text-text";

export default function PersonalInfo() {
  const { data } = useGetUserInfo();
  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const mutation = useUpdateUserProfile(() => setIsEditing((s) => !s));

  const mapGenderToServer = (gender) => {
    if (gender === "مرد") return "male";
    if (gender === "زن") return "female";
    return "";
  };

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formCheker),
    defaultValues: {
      fullName: "",
      nationalCode: "",
      gender: "",
      birthDate: "",
    },
  });

  // gender lives in the form; mirroring it into separate state only had to
  // be kept in sync by hand, so read it back off the form instead.
  const selectedGender = useWatch({ control, name: "gender" }) || "";

  useEffect(() => {
    if (data) {
      reset({
        fullName: `${data.firstName ? data.firstName : ""} ${
          data.lastName ? data.lastName : ""
        }`.trim(),
        nationalCode: data.nationalCode || "",
        gender: data.personal?.gender || "",
        birthDate: data.birthDate || "",
      });
    }
  }, [data, reset]);

  const handleSelectGender = (gender) => {
    setValue("gender", gender, { shouldValidate: true, shouldDirty: true });
    setIsOpen(false);
  };

  const onSubmit = async (values) => {
    if (!data) {
      toast.error("داده کاربر هنوز لود نشده است");
      return;
    }

    const names = values.fullName.trim().split(" ");
    const firstName = names[0] || "";
    const lastName = names.slice(1).join(" ") || "";

    const merged = {
      ...data,
      firstName,
      lastName,
      nationalCode: values.nationalCode,
      gender: mapGenderToServer(values.gender),
      birthDate: values.birthDate,
    };

    await mutation.mutateAsync(merged);
  };

  return (
    <div className="mx-auto mb-4 w-full max-w-[330px] rounded-[10px] border border-line bg-surface xs:max-w-[600px] md:max-w-[950px]">
      <div className="xs:max-w-[600px] md:text-start lg:max-w-[1200px]">
        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className={`${heading} lg:px-[15px]`}>ویرایش اطلاعات شخصی</h3>
            <div className="flex flex-col gap-[15px] px-5 pt-0 pb-5 lg:flex-row lg:flex-wrap lg:gap-5">
              <div className="relative flex flex-col">
                <input
                  type="text"
                  className={textInput}
                  placeholder="نام و نام خانوادگی"
                  {...register("fullName")}
                />
                {errors.fullName && (
                  <span className={fieldError}>
                    {errors.fullName.message}
                  </span>
                )}
              </div>
              <div className="relative flex flex-col">
                <div className="relative w-full lg:w-[245px]">
                  <div
                    className="flex cursor-pointer items-center justify-between rounded-[5px] border border-muted px-2.5 py-[15px] text-base text-muted lg:h-[45px] lg:px-3 lg:py-2.5 lg:text-[15px]"
                    onClick={() => setIsOpen((prev) => !prev)}
                  >
                    <span className="block text-fg lg:hidden">
                      {selectedGender || "جنسیت"}
                    </span>
                    <span className="hidden text-fg lg:block">
                      {selectedGender || "انتخاب"}
                    </span>
                    <Image
                      src="/images/arrow-down.png"
                      width={12}
                      height={12}
                      alt="arrow"
                      className="dark:invert"
                    />
                  </div>
                  <div className="hidden lg:absolute lg:-top-5 lg:right-2.5 lg:block lg:bg-surface lg:px-2.5">
                    <p className="lg:text-[10px] lg:font-normal lg:text-muted">جنسیت</p>
                  </div>
                  {isOpen && (
                    <div className="absolute top-full right-0 left-0 z-10 mt-1 rounded-lg border border-line bg-surface">
                      <p
                        onClick={() => handleSelectGender("مرد")}
                        className={genderOption}
                      >
                        مرد
                      </p>
                      <p
                        onClick={() => handleSelectGender("زن")}
                        className={genderOption}
                      >
                        زن
                      </p>
                    </div>
                  )}
                  <input type="hidden" {...register("gender")} />
                </div>
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
                    <div className="flex flex-col">
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
                            className="w-[287px] cursor-pointer rounded-[5px] border border-muted bg-surface px-[5px] py-[15px] text-base text-muted xs:w-full lg:h-[45px] lg:w-[245px] lg:px-3 lg:py-2.5 lg:text-[15px]"
                          >
                            <div className="flex items-center gap-1 text-base text-muted">
                              <Image
                                src="/images/date.png"
                                width={16}
                                height={16}
                                alt="date"
                                className="dark:invert"
                              />
                              <span>{field.value || "تاریخ تولد"}</span>
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
            </div>
            <div className="md:mb-2.5 md:h-px md:w-full md:border md:border-line"></div>
            <div className="flex gap-2.5 px-5 pt-0 pb-2.5 md:w-full md:justify-end lg:pr-0 lg:pl-[25px]">
              <button
                type="submit"
                className={`${actionButton} border-none bg-[#28a745] text-white hover:bg-[#6eff9e] hover:text-white`}
                disabled={mutation.isLoading}
              >
                تایید
              </button>
              <button
                type="button"
                className={`${actionButton} border-2 border-solid border-[#28a745] bg-surface text-[#28a745] hover:bg-[#28a745] hover:text-white`}
                onClick={() => setIsEditing((s) => !s)}
              >
                انصراف
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="flex justify-between px-5">
              <h3 className={heading}>اطلاعات شخصی</h3>
              <div className="flex items-center gap-1.5">
                <Image
                  src="/images/edit.png"
                  width={12}
                  height={12}
                  alt="edit"
                />
                <p
                  onClick={() => setIsEditing((s) => !s)}
                  className="text-[13px] font-normal text-[#009eca]"
                >
                  ویرایش اطلاعات
                </p>
              </div>
            </div>
            <div className="flex flex-col px-5">
              <div className={`${dataRow} lg:gap-[25px]`}>
                <p className={dataLabel}>نام و نام خانوادگی</p>
                <span className={`${dataValue} font-semibold`}>
                  {data?.firstName && data?.lastName
                    ? `${data.firstName} ${data.lastName}`
                    : "—"}
                </span>
              </div>
              <div className={`${dataRow} lg:gap-[47px]`}>
                <p className={dataLabel}>کدملی</p>
                <span className={`${dataValue} font-normal`}>
                  {toPersianNumber(data?.nationalCode || "—")}
                </span>
              </div>
              <div className={`${dataRow} lg:gap-20`}>
                <p className={dataLabel}>جنسیت</p>
                <span className={`${dataValue} font-semibold`}>
                  {data?.gender === "male"
                    ? "مرد"
                    : data?.gender === "female"
                    ? "زن"
                    : "—"}
                </span>
              </div>
              <div className={`${dataRow} lg:gap-[25px]`}>
                <p className={dataLabel}>تاریخ تولد</p>
                <span className={`${dataValue} font-normal`}>
                  {data?.birthDate || "—"}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
