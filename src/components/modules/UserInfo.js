"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useGetUserInfo } from "@/hooks/queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styles from "@/styles/UserInfo.module.css";
import { api } from "@/configs/config";
import Image from "next/image";
import { toPersianNumber } from "@/utils/helper";
import { emailChecker } from "@/utils/validations";
import { toast } from "react-toastify";
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
    <div className={styles.card}>
      <div className={styles.topInput}>
        <h3>اطلاعات حساب بانکی</h3>
        <div className={styles.editInfo}>
          <Image src="/images/edit.png" width={12} height={12} alt="edit" />
          <p onClick={() => setIsEditing((s) => !s)}>ویرایش اطلاعات</p>
        </div>
      </div>
      <div className={styles.phone}>
        <p>شماره موبایل</p>
        <span>{toPersianNumber(data?.mobile)}</span>
      </div>
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.editInput}>
          <div className={styles.inputWrapper}>
            <input
              {...register("email")}
              className={styles.inp}
              type="text"
              placeholder="آدرس ایمیل"
            />
            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
          </div>
          <button
            type="submit"
            className={styles.addBtn}
            disabled={mutation.isLoading}
          >
            تایید
          </button>
        </form>
      ) : (
        <div className={styles.lowerInfo}>
          <div className={styles.email}>
            <p>ایمیل</p>
            <span>{data?.email || "—"}</span>
          </div>
          {!data?.email ? (
            <div className={styles.edit}>
              <Image src="/images/edit.png" width={16} height={16} alt="edit" />
              <p onClick={() => setIsEditing((s) => !s)}>افزودن</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
