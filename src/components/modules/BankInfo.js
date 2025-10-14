"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styles from "@/styles/BankInfo.module.css";
import { api } from "@/configs/config";
import { useGetUserInfo } from "@/hooks/queries";
import Image from "next/image";
import { toPersianNumber } from "@/utils/helper";
import { bankChecker } from "@/utils/validations";
import { toast } from "react-toastify";
import { useUpdateUserProfile } from "@/hooks/mutations";

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
    <div className={styles.card}>
      {isEditing ? (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h3>ویرایش اطلاعات حساب بانکی</h3>
          <div className={styles.inputs}>
            <input
              type="text"
              placeholder="شماره کارت"
              {...register("debitCard_code")}
            />
            {errors.debitCard_code && (
              <span className={styles.error}>
                {errors.debitCard_code.message}
              </span>
            )}
            <input
              type="text"
              placeholder="شماره حساب"
              {...register("accountIdentifier")}
            />
            {errors.accountIdentifier && (
              <span className={styles.error}>
                {errors.accountIdentifier.message}
              </span>
            )}
            <input
              type="text"
              placeholder="شماره شبا"
              {...register("shaba_code")}
            />
            {errors.shaba_code && (
              <span className={styles.error}>{errors.shaba_code.message}</span>
            )}
          </div>
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
            <h3>اطلاعات حساب بانکی</h3>
            <div className={styles.editInfo}>
              <Image src="/images/edit.png" width={12} height={12} alt="edit" />
              <p onClick={() => setIsEditing((s) => !s)}>ویرایش اطلاعات</p>
            </div>
          </div>
          <div className={styles.mainInfo}>
            <div className={styles.data}>
              <p>شماره کارت</p>
              <span>
                {toPersianNumber(data?.payment?.debitCard_code) || "—"}
              </span>
            </div>
            <div className={styles.data}>
              <p>شماره شبا</p>
              <span>{toPersianNumber(data?.payment?.shaba_code) || "—"}</span>
            </div>
            <div className={styles.data}>
              <p>شماره حساب</p>
              <span>
                {toPersianNumber(data?.payment?.accountIdentifier) || "—"}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
