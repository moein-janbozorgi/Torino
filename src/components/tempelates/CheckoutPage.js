"use client";

import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { useGetBasket } from "@/hooks/queries";
import Loader from "@/components/tempelates/Loader";
import styles from "@/styles/CheckoutPage.module.css";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formCheker } from "@/helper/validations";
import GenderSelect from "@/atoms/genderSelect";
import { convertToRial, toPersianNumber } from "@/helper/helper";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Controller } from "react-hook-form";
import DateObject from "react-date-object";
import { useRef } from "react";

export default function CheckoutPage({ dehydratedState }) {
  return (
    <ReactQueryStreamedHydration state={dehydratedState}>
      <Basket />
    </ReactQueryStreamedHydration>
  );
}

function Basket() {
  const { data, isLoading } = useGetBasket();
  const formRef = useRef();

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

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.infoBox}>
        <div className={styles.user}>
          <Image
            src="/images/pblackfull.png"
            width={24}
            height={24}
            alt="profile"
          />
          <h1>مشخصات مسافر</h1>
        </div>
        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          ref={formRef}
        >
          <input
            type="text"
            placeholder="نام و نام خانوادگی"
            {...register("fullName")}
          />
          {errors.fullName && (
            <span className={styles.error}>{errors.fullName.message}</span>
          )}
          <GenderSelect register={register} setValue={setValue} />
          {errors.gender && (
            <span className={styles.error}>{errors.gender.message}</span>
          )}
          <input type="text" placeholder="کد ملی" {...register("nationalId")} />
          {errors.nationalId && (
            <span className={styles.error}>{errors.nationalId.message}</span>
          )}
          <Controller
            name="date"
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
                          <span>
                            {field.value ? field.value : "تاریخ تولد"}
                          </span>
                        </div>
                      </div>
                    )}
                  />
                  {errors.date && (
                    <span className={styles.error}>{errors.date.message}</span>
                  )}
                </div>
              );
            }}
          />
        </form>
      </div>
      <div className={styles.checkoutBox}>
        <div className={styles.desc}>
          <h1>{data.title}</h1>
          <p>
            {toPersianNumber(5)} روز و {toPersianNumber(4)} شب
          </p>
        </div>
        <div className={styles.midLine}></div>
        <div className={styles.priceDiv}>
          <p>قیمت نهایی</p>
          <div className={styles.price}>
            <span>{toPersianNumber(convertToRial(data.price))}</span>
            <p>تومان</p>
          </div>
        </div>
        <div className={styles.btn}>
          <button onClick={() => formRef.current.requestSubmit()}>
            ثبت و خرید نهایی
          </button>
        </div>
      </div>
    </div>
  );
}
