"use client";

import { useGetUserTours } from "@/hooks/queries";
import { toast } from "react-toastify";
import Loader from "@/components/tempelates/Loader";
import TourCard from "@/components/modules/TourCard";
import { useEffect } from "react";
import styles from "@/styles/MytourPage.module.css";



export default function MyToursPage() {
  const { data, isLoading, isError } = useGetUserTours();

  useEffect(() => {
    if (isError) {
      toast.error("خطا در دریافت اطلاعات");
    }
  }, [isError]);

  if (isLoading) return <Loader />;

  if (!data || data.length === 0)
    return <p style={{ textAlign: "center" }}>شما هنوز توری رزرو نکرده‌اید.</p>;

  return (
    <div className={styles.wrapper}>
      {data.map((tour, index) => (
        <TourCard key={`${tour.id}-${index}`} tour={tour} />
      ))}
    </div>
  );
}
