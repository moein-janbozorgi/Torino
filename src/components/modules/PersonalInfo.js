"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetUserInfo } from "@/hooks/queries";
import styles from "@/styles/PersonalInfo.module.css";
import Image from "next/image";
import { toPersianNumber } from "@/utils/helper";
import { formCheker } from "@/utils/validations";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { toast } from "react-toastify";
import { useUpdateUserProfile } from "@/hooks/mutations";

export default function PersonalInfo() {
  const { data } = useGetUserInfo();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");
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
      setSelectedGender(data.personal?.gender || "");
    }
  }, [data, reset]);

  const handleSelectGender = (gender) => {
    setSelectedGender(gender);
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
      gender: mapGenderToServer(values.gender || selectedGender),
      birthDate: values.birthDate,
    };

    await mutation.mutateAsync(merged);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {isEditing ? (
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <h3>ویرایش اطلاعات شخصی</h3>
            <div className={styles.wrapper}>
              <div className={styles.formField}>
                <input
                  type="text"
                  placeholder="نام و نام خانوادگی"
                  {...register("fullName")}
                />
                {errors.fullName && (
                  <span className={styles.error}>
                    {errors.fullName.message}
                  </span>
                )}
              </div>
              <div className={styles.formField}>
                <div className={styles.genderBox}>
                  <div
                    className={styles.genderInput}
                    onClick={() => setIsOpen((prev) => !prev)}
                  >
                    <span className={styles.show}>
                      {selectedGender || "جنسیت"}
                    </span>
                    <span className={styles.hide}>
                      {selectedGender || "انتخاب"}
                    </span>
                    <Image
                      src="/images/arrow-down.png"
                      width={12}
                      height={12}
                      alt="arrow"
                    />
                  </div>
                  <div className={styles.topText}>
                    <p>جنسیت</p>
                  </div>
                  {isOpen && (
                    <div className={styles.dropdown}>
                      <p onClick={() => handleSelectGender("مرد")}>مرد</p>
                      <p onClick={() => handleSelectGender("زن")}>زن</p>
                    </div>
                  )}
                  <input type="hidden" {...register("gender")} />
                </div>
                {errors.gender && (
                  <span className={styles.error}>{errors.gender.message}</span>
                )}
              </div>
              <div className={styles.formField}>
                <input
                  type="text"
                  placeholder="کد ملی"
                  {...register("nationalCode")}
                />
                {errors.nationalCode && (
                  <span className={styles.error}>
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
                    <div className={styles.formInputWrapper}>
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
                            className={styles.dateInput}
                          >
                            <div className={styles.placeholder}>
                              <Image
                                src="/images/date.png"
                                width={16}
                                height={16}
                                alt="date"
                              />
                              <span>{field.value || "تاریخ تولد"}</span>
                            </div>
                          </div>
                        )}
                      />
                      {errors.birthDate && (
                        <span className={styles.error}>
                          {errors.birthDate.message}
                        </span>
                      )}
                    </div>
                  );
                }}
              />
            </div>
            <div className={styles.divider}></div>
            <div className={styles.buttons}>
              <button
                type="submit"
                className={styles.addBtn}
                disabled={mutation.isLoading}
              >
                تایید
              </button>
              <button
                type="button"
                className={styles.cancleBtn}
                onClick={() => setIsEditing((s) => !s)}
              >
                انصراف
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className={styles.topInput}>
              <h3>اطلاعات شخصی</h3>
              <div className={styles.editInfo}>
                <Image
                  src="/images/edit.png"
                  width={12}
                  height={12}
                  alt="edit"
                />
                <p onClick={() => setIsEditing((s) => !s)}>ویرایش اطلاعات</p>
              </div>
            </div>
            <div className={styles.mainInfo}>
              <div className={styles.data}>
                <p>نام و نام خانوادگی</p>
                <span className={styles.bold}>
                  {data?.firstName && data?.lastName
                    ? `${data.firstName} ${data.lastName}`
                    : "—"}
                </span>
              </div>
              <div className={styles.data}>
                <p>کدملی</p>
                <span>{toPersianNumber(data?.nationalCode || "—")}</span>
              </div>
              <div className={styles.data}>
                <p>جنسیت</p>
                <span className={styles.bold}>
                  {data?.gender === "male"
                    ? "مرد"
                    : data?.gender === "female"
                    ? "زن"
                    : "—"}
                </span>
              </div>
              <div className={styles.data}>
                <p>تاریخ تولد</p>
                <span>{data?.birthDate || "—"}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
