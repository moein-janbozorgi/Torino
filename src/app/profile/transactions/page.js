"use client";

import { toast } from "react-toastify";
import Loader from "@/components/tempelates/Loader";
import { useEffect } from "react";
import { useGetUseTransactions } from "@/hooks/queries";
import styles from "@/styles/TransactionsPage.module.css";
import {
  convertToRial,
  formatPersianDate,
  generateRandom8DigitNumber,
  toPersianNumber,
} from "@/utils/helper";

export default function TransactionsPage() {
  const { data, isLoading, isError } = useGetUseTransactions();

  console.log(data);

  useEffect(() => {
    if (isError) {
      toast.error("خطا در دریافت اطلاعات");
    }
  }, [isError]);

  if (isLoading) return <Loader />;

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>تاریخ‌ و ساعت</th>
          <th>مبلغ‌(تومان)</th>
          <th className={styles.hide}>نوع تراکنش</th>
          <th>شماره سفارش</th>
        </tr>
      </thead>
      <tbody>
        {data && data.length > 0 ? (
          data.map((item) => <TransactionsCard data={item} key={item.id} />)
        ) : (
          <tr>
            <td colSpan={3} className={styles.noData}>
              داده‌ای وجود ندارد
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

function TransactionsCard({ data }) {
  console.log(data.amount);
  return (
    <>
      <tr className={styles.row}>
        <td className={styles.cell}>{formatPersianDate(data.createdAt)}</td>
        <td className={styles.cell}>
          {toPersianNumber(convertToRial(data.amount * 2))}
        </td>
        <td className={styles.hide}>ثبت نام در تور گردشگری</td>
        <td className={styles.cell}>
          {toPersianNumber(generateRandom8DigitNumber())}
        </td>
      </tr>
    </>
  );
}
