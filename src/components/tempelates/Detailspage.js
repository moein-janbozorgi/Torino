"use client";

import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { useGetTourById } from "@/hooks/queries";
import Loader from "./Loader";
import styles from "@/styles/Detailspage.module.css";
import Image from "next/image";
import { convertToRial, toPersianNumber } from "@/helper/helper";
import Link from "next/link";
import { api } from "@/configs/config";

export default function Detailspage({ idtour, dehydratedState }) {
  return (
    <ReactQueryStreamedHydration state={dehydratedState}>
      <DetailspageContent idtour={idtour} />
    </ReactQueryStreamedHydration>
  );
}

const sendHandler = (id) => {
  api.put(`/basket/${id}`);
};

function DetailspageContent({ idtour }) {
  const { data, isLoading } = useGetTourById(idtour);

  if (isLoading) return <Loader />;

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <Image
          src={data.image}
          width={340}
          height={220}
          alt="tour"
          className={styles.tourimg}
        />
        <div className={styles.titleoption}>
          <h1>{data.title}</h1>
          <p>
            {toPersianNumber(5)} روز و {toPersianNumber(4)} شب
          </p>
        </div>
        <div className={styles.desc}>
          <div>
            <Image
              src="/images/usertick.png"
              width={14}
              height={14}
              alt="user"
            />
            <p>تورلیدر از مبدا</p>
          </div>
          <div>
            <Image src="/images/map.png" width={14} height={14} alt="map" />
            <p>برنامه سفر</p>
          </div>
          <div>
            <Image src="/images/medal.png" width={14} height={14} alt="medal" />
            <p>تضمین کیفیت</p>
          </div>
        </div>
        <div className={styles.options}>
          <div className={styles.box}>
            <div className={styles.topoption}>
              <Image src="/images/bus.png" width={14} height={14} alt="medal" />
              <p>حمل و نقل</p>
            </div>
            <p>{data.fleetVehicle}</p>
          </div>
          <div className={styles.box}>
            <div className={styles.topoption}>
              <Image
                src="/images/2user.png"
                width={14}
                height={14}
                alt="medal"
              />
              <p>ظرفیت</p>
            </div>
            <p>حداکثر {toPersianNumber(data.capacity)} نفر</p>
          </div>
          <div className={styles.box}>
            <div className={styles.topoption}>
              <Image
                src="/images/security.png"
                width={14}
                height={14}
                alt="medal"
              />
              <p>بیمه</p>
            </div>
            <p>بیمه {toPersianNumber(50)}</p>
          </div>
        </div>
        <div className={styles.finish}>
          <Link href="/checkout" onClick={sendHandler(data.id)}>
            رزرو و خرید
          </Link>
          <div className={styles.price}>
            <span>{toPersianNumber(convertToRial(data.price))}</span>
            <p>تومان</p>
          </div>
        </div>
      </div>
    </div>
  );
}
