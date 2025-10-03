"use client";

import Image from "next/image";
import styles from "@/styles/Tours.module.css";
import Link from "next/link";
import { convertToRial, toPersianNumber } from "@/helper/helper";
import { useEffect, useState } from "react";
import Loader from "../tempelates/Loader";

function Tours({ data, isLoading }) {
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 390;
      setIsMobile(mobile);
      if (!mobile) setShowAll(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const displayedTours = isMobile && !showAll ? data?.slice(0, 4) : data;

  console.log(data);
  return (
    <div className={styles.container}>
      <h1>همه تور ها</h1>
      <div className={styles.card}>
        {displayedTours?.map((tour) => (
          <div key={tour.id} className={styles.main}>
            <div className={styles.top}>
              <Image
                src={tour.image}
                width={327}
                height={159}
                alt="tours-title"
              />
              <div className={styles.description}>
                <h1>{tour.title}</h1>
                <div className={styles.options}>
                  <p>{tour.options[0]},</p>
                  <p>{tour.options[1]},</p>
                  <p>...</p>
                </div>
              </div>
            </div>
            <div className={styles.buttonprice}>
              <Link href="/details">رزرو</Link>
              <div className={styles.price}>
                <span>{toPersianNumber(convertToRial(tour.price))}</span>
                <p>تومان</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isMobile && !showAll && data?.length > 4 && (
        <button className={styles.showbutton} onClick={() => setShowAll(true)}>
          مشاهده بیشتر
          <Image
            src="/images/arrow.png"
            width={12}
            height={12}
            alt="arrow-img"
          />
        </button>
      )}
    </div>
  );
}

export default Tours;
