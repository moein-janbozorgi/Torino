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
import CustomDatePicker from "@/atoms/CustomDatePicker";
import { convertToRial, toPersianNumber } from "@/helper/helper";

export default function CheckoutPage({ dehydratedState }) {
  return (
    <ReactQueryStreamedHydration state={dehydratedState}>
      <Basket />
    </ReactQueryStreamedHydration>
  );
}

function Basket() {
  const { data, isLoading } = useGetBasket();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formCheker),
  });

  console.log(data);

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
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
          <CustomDatePicker
            register={register}
            setValue={setValue}
            name="birthDate"
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
          <button>ثبت و خرید نهایی</button>
        </div>
      </div>
    </div>
  );
}
