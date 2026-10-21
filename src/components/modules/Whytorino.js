"use client";
import { useState } from "react";
import Image from "next/image";
import { toPersianNumber } from "@/utils/helper";

// Stacked-card positions, front to back.
const slotClasses = [
  "right-0 z-4 h-[284px] w-[265px] scale-95 lg:h-[324px] lg:w-[255px]",
  "right-10 z-3 h-[247px] w-[253px] scale-90 lg:h-[277px]",
  "right-20 z-2 h-[198px] w-[165px] -translate-x-[40%] scale-90 lg:h-[220px] lg:w-[168px]",
  "right-[120px] z-1 h-[162px] w-[142px] -translate-x-1/2 scale-[0.85] lg:h-[182px]",
];
const headingText = "text-2xl font-extrabold xs:text-[28px] md:text-[30px] lg:text-[40px]";
const arrowButton = "border-none bg-surface hover:scale-[1.2]";

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
    <div className="mx-auto w-full max-w-[327px] xs:flex xs:max-w-[730px] xs:gap-2.5 xs:overflow-visible xs:px-6 md:max-w-[990px] md:gap-[50px] md:px-12 md:pt-8 lg:max-w-[1200px] lg:flex-row lg:gap-0">
      <div className="xs:w-1/2 lg:mr-[30px] lg:flex lg:w-[70%] lg:flex-col">
        <div className="relative mr-3 mb-2.5 flex items-center gap-1.5 lg:gap-[9px]">
          <Image
            src="/images/؟.png"
            width={10}
            height={17}
            alt="?-img"
            className="absolute right-3 xs:right-3.5 lg:right-[15px] lg:h-[25px] lg:w-3.5"
          />
          <Image
            src="/images/zel.png"
            width={34}
            height={38}
            alt="zel-img"
            className="xs:hidden"
          />
          <Image
            src="/images/Polygon.png"
            width={38}
            height={38}
            alt="cycle-img"
            className="hidden xs:block lg:size-[45px]"
          />

          <span className={`${headingText} text-text`}>چرا</span>
          <p className={`${headingText} text-[#0d9488]`}>تورینو</p>
          <span className={`${headingText} text-text`}>؟</span>
        </div>
        <div className="-mt-[35px] mr-2.5 hidden xs:block">
          <h1 className="text-2xl font-medium text-text xs:text-xl md:text-2xl">تور طبیعت گردی و تاریخی</h1>
          <p className="block w-full text-justify text-xl leading-[35px] font-normal break-words whitespace-normal text-text [word-spacing:5px] xs:text-xs md:text-[15px] md:leading-[30px] md:[word-spacing:3px]">
            اگر دوست داشته باشید که یک جاذبه طبیعی را از نزدیک ببینید و در دل
            طبیعت چادر بزنید یا در یک اقامتگاه بوم گردی اتاق بگیرید، باید تورهای
            طبیعت‌گردی را خریداری کنید. اما اگر بخواهید از جاذبه‌های گردشگری و
            آثار تاریخی یک مقصد خاص بازدید کنید، می‌توانید تورهایفرهنگی و تاریخی
            را خریداری کنید.
          </p>
        </div>
      </div>
      <div className="xs:mt-[70px] xs:w-1/2 lg:mx-[60px] lg:my-[90px] lg:w-[30%]">
        <div className="relative h-[220px] w-full overflow-visible">
          {order.map((imgIndex, i) => {
            return (
              <Image
                key={imgIndex}
                src={images[imgIndex]}
                width={200}
                height={200}
                alt={`img${imgIndex}`}
                className={`absolute top-1/2 left-1/2 -translate-y-1/2 rounded-xl transition-all duration-500 ease-[ease] ${slotClasses[i]}`}
              />
            );
          })}
        </div>

        <div className="mt-5 ml-[50px] flex items-center justify-center gap-3.5 md:ml-[100px] lg:mt-[30px] lg:ml-2.5">
          <button onClick={handleNext} className={arrowButton}>
            <Image
              src="/images/arrow-right.png"
              width={24}
              height={24}
              alt="arrow-img"
              className="dark:invert"
            />
          </button>
          <p className="text-xl font-medium">
            {toPersianNumber(images.length)} / {toPersianNumber(current + 1)}
          </p>
          <button onClick={handlePrev} className={arrowButton}>
            <Image
              src="/images/arrow-left.png"
              width={24}
              height={24}
              alt="arrow-img"
              className="dark:invert"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
