"use client";

import { toast } from "react-toastify";
import Loader from "@/components/tempelates/Loader";
import { useEffect } from "react";
import { useGetUseTransactions } from "@/hooks/queries";
import {
  convertToRial,
  formatPersianDate,
  idToNumber,
  toPersianNumber,
} from "@/utils/helper";

const th =
  "px-3 py-[15px] text-center text-xs font-normal text-[#282828cc] md:text-black lg:text-base";
const cell =
  "px-2.5 py-[15px] text-[13px] font-light text-[#282828] lg:px-0 lg:pt-2.5 lg:pb-[5px] lg:text-sm";
const firstCell = "text-[9px] xs:text-xs lg:text-sm";

export default function TransactionsPage() {
  const { data, isLoading, isError } = useGetUseTransactions();


  useEffect(() => {
    if (isError) {
      toast.error("خطا در دریافت اطلاعات");
    }
  }, [isError]);

  if (isLoading) return <Loader />;

  return (
    <table className="mx-auto w-full max-w-[330px] border-separate border-spacing-0 overflow-hidden rounded-[10px] border border-[#00000040] [direction:rtl] xs:max-w-[600px] md:max-w-[900px] lg:max-w-[960px]">
      <thead className="bg-[#e6e6e6]">
        <tr>
          <th className={th}>تاریخ‌ و ساعت</th>
          <th className={th}>مبلغ‌(تومان)</th>
          <th className={`${th} hidden md:block`}>نوع تراکنش</th>
          <th className={th}>شماره سفارش</th>
        </tr>
      </thead>
      <tbody>
        {data && data.length > 0 ? (
          data.map((item) => <TransactionsCard data={item} key={item.id} />)
        ) : (
          <tr>
            <td colSpan={3} className="border-b-0 py-3.5 text-center text-sm font-normal text-[#282828]">
              داده‌ای وجود ندارد
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

function TransactionsCard({ data }) {
  return (
    <>
      <tr className="bg-white text-center transition-colors duration-200 ease-in-out hover:bg-[#f9f9f9]">
        <td className={`${cell} ${firstCell}`}>{formatPersianDate(data.createdAt)}</td>
        <td className={cell}>
          {toPersianNumber(convertToRial(data.amount))}
        </td>
        <td className="hidden px-2.5 py-[15px] text-sm font-light text-black md:block">ثبت نام در تور گردشگری</td>
        <td className={cell}>
          {toPersianNumber(idToNumber(data.id, 8))}
        </td>
      </tr>
    </>
  );
}
