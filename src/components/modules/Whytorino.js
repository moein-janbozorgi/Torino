"use client";
import { useState } from "react";
import styles from "@/styles/Whytorino.module.css";
import Image from "next/image";
import { toPersianNumber } from "@/utils/helper";

export default function Whytorino() {
  const [order, setOrder] = useState([0, 1, 2, 3]);

  const images = [
    "/images/R.png",
    "/images/OIP.png",
    "/images/car.png",
    "/images/window.png",
  ];

  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % images.length);
    setOrder((prev) => {
      const newOrder = [...prev];
      newOrder.push(newOrder.shift());
      return newOrder;
    });
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
    setOrder((prev) => {
      const newOrder = [...prev];
      newOrder.unshift(newOrder.pop());
      return newOrder;
    });
  };

  return (
    <div className={styles.slider}>
      <div className={styles.alltext}>
        <div className={styles.text}>
          <Image
            src="/images/؟.png"
            width={10}
            height={17}
            alt="?-img"
            className={styles.firstimg}
          />
          <Image
            src="/images/zel.png"
            width={34}
            height={38}
            alt="zel-img"
            className={styles.zel}
          />
          <Image
            src="/images/Polygon.png"
            width={38}
            height={38}
            alt="cycle-img"
            className={styles.cycle}
          />

          <span>چرا</span>
          <p>تورینو</p>
          <span>؟</span>
        </div>
        <div className={styles.lowertext}>
          <h1>تور طبیعت گردی و تاریخی</h1>
          <p>
            اگر دوست داشته باشید که یک جاذبه طبیعی را از نزدیک ببینید و در دل
            طبیعت چادر بزنید یا در یک اقامتگاه بوم گردی اتاق بگیرید، باید تورهای
            طبیعت‌گردی را خریداری کنید. اما اگر بخواهید از جاذبه‌های گردشگری و
            آثار تاریخی یک مقصد خاص بازدید کنید، می‌توانید تورهایفرهنگی و تاریخی
            را خریداری کنید.
          </p>
        </div>
      </div>
      <div className={styles.allslider}>
        <div className={styles.sliderimg}>
          {order.map((imgIndex, i) => {
            const className = styles[`img${i + 1}`];
            return (
              <Image
                key={imgIndex}
                src={images[imgIndex]}
                width={200}
                height={200}
                alt={`img${imgIndex}`}
                className={`${styles.image} ${className}`}
              />
            );
          })}
        </div>

        <div className={styles.counter}>
          <button onClick={handleNext}>
            <Image
              src="/images/arrow-right.png"
              width={24}
              height={24}
              alt="arrow-img"
            />
          </button>
          <p>
            {toPersianNumber(images.length)} / {toPersianNumber(current + 1)}
          </p>
          <button onClick={handlePrev}>
            <Image
              src="/images/arrow-left.png"
              width={24}
              height={24}
              alt="arrow-img"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
