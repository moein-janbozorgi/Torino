"use client";

import Image from "next/image";
import Link from "next/link";
import { convertToRial, toPersianNumber } from "@/utils/helper";
import { useEffect, useState } from "react";
import Loader from "../tempelates/Loader";

function Tours({ data, isLoading }) {
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
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
  return (
    <div className="w-full xs:max-w-[720px] xs:px-8 md:mx-auto md:max-w-[990px] md:px-12 lg:max-w-[1200px] lg:px-[4.5rem]">
      <h1 className="m-0 mr-[15px] mb-[3px] text-xl font-normal text-fg xs:text-center md:text-start md:text-2xl lg:mr-0">همه تور ها</h1>

      {displayedTours && displayedTours.length > 0 ? (
        <div className="md:grid md:grid-cols-3 lg:grid-cols-4 lg:justify-items-center lg:gap-5">
          {displayedTours.map((tour) => (
            <div
              key={tour.id}
              className="mx-auto mb-5 flex w-full max-w-[327px] flex-col rounded-[10px] border border-line xs:mt-2.5 xs:w-[95%] lg:w-full"
            >
              <div className="flex flex-col">
                <Image
                  src={tour.image}
                  alt="tours-title"
                  width={327}
                  height={159}
                  style={{ width: "100%", height: "auto" }}
                  className="xs:rounded-t-[10px]"
                />
                <div className="border-b border-line pt-2.5 pr-2.5 pb-2 pl-0">
                  <h1 className="m-0 p-0 text-[22px] font-normal text-fg xs:mr-0.5 xs:text-right md:text-lg lg:text-[22px] lg:font-medium">{tour.title}</h1>
                  <div className="flex gap-[3px] text-text/70">
                    <p className="m-0 p-0 text-[15px] font-normal md:text-sm">{tour.options[0]},</p>
                    <p className="m-0 p-0 text-[15px] font-normal md:text-sm">{tour.options[1]},</p>
                    <p className="m-0 p-0 text-[15px] font-normal md:text-sm">...</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between px-2.5 xs:py-[5px] lg:py-0.5">
                <Link
                  href={`/Details/${tour.id}`}
                  className="inline-block rounded bg-[#28a745] px-10 py-1 text-[15px] font-normal text-white no-underline hover:bg-[#6eff9e] hover:text-white md:px-[30px] lg:px-[25px] lg:py-0.5"
                >رزرو</Link>
                <div className="flex items-center gap-1.5 text-xs font-normal text-text/80 md:gap-[3px] md:text-[10px]">
                  <span className="text-base font-normal text-[#009eca] md:text-[15px]">{toPersianNumber(convertToRial(tour.price))}</span>
                  <p>تومان</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center", marginTop: "2rem", fontSize: "16px" }}>
          توری یافت نشد
        </p>
      )}

      {isMobile && !showAll && data?.length > 4 && (
        <button
          className="mx-auto -my-5 flex cursor-pointer items-center justify-center gap-[5px] border-none bg-surface px-4 py-2 text-[13px] font-normal text-muted"
          onClick={() => setShowAll(true)}
        >
          مشاهده بیشتر
          <Image
            src="/images/arrow.png"
            width={12}
            height={12}
            alt="arrow-img"
            className="dark:invert"
          />
        </button>
      )}
    </div>
  );
}

export default Tours;
