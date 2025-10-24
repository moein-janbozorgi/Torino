import styles from "@/styles/Detailspage.module.css";
import Image from "next/image";
import {
  convertCity,
  convertToRial,
  convertVehicle,
  formatJalaliText,
  toPersianNumber,
} from "@/utils/helper";
import Loader from "@/components/tempelates/Loader";
import { serverFetch } from "@/hooks/HttpsReq";
import Reserve from "@/atoms/reserve";

export const metadata = {
  title: "Torino details",
  description: "جزییات محصول"
};

export default async function Page({ params }) {
  const awaitedParams = await params;
  const idtour = awaitedParams.idtour;

  const data = await serverFetch(`/tour/${idtour}`, { cache: "no-store" });

  console.log(data);

  if (!data) return <Loader />;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.topContent}>
            <div>
              <Image
                src={data.image}
                width={330}
                height={220}
                alt="tour"
                className={styles.tourimg}
              />
            </div>
            <div className={styles.topLeftContent}>
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
                  <Image
                    src="/images/map.png"
                    width={14}
                    height={14}
                    alt="map"
                  />
                  <p>برنامه سفر</p>
                </div>
                <div>
                  <Image
                    src="/images/medal.png"
                    width={14}
                    height={14}
                    alt="medal"
                  />
                  <p>تضمین کیفیت</p>
                </div>
              </div>
              <div className={styles.finish1}>
                <Reserve id={data?.id} />
                <div className={styles.price1}>
                  <span>{toPersianNumber(convertToRial(data.price))}</span>
                  <p>تومان</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.options}>
            <div className={styles.box}>
              <div className={styles.topoption}>
                <Image
                  src="/images/routing.png"
                  width={14}
                  height={14}
                  alt="medal"
                />
                <p>مبدا</p>
              </div>
              <p className={styles.underoption}>
                {convertCity(data.origin.name)}
              </p>
            </div>
            <div className={styles.box}>
              <div className={styles.topoption}>
                <Image
                  src="/images/calendar.png"
                  width={14}
                  height={14}
                  alt="medal"
                />
                <p>تاریخ رفت</p>
              </div>
              <p className={styles.underoption}>
                {formatJalaliText(data.startDate)}
              </p>
            </div>
            <div className={styles.box}>
              <div className={styles.topoption}>
                <Image
                  src="/images/calendar.png"
                  width={14}
                  height={14}
                  alt="medal"
                />
                <p>تاریخ برگشت</p>
              </div>
              <p className={styles.underoption}>
                {formatJalaliText(data.endDate)}
              </p>
            </div>
            <div className={styles.box}>
              <div className={styles.topoption}>
                <Image
                  src="/images/bus.png"
                  width={14}
                  height={14}
                  alt="medal"
                />
                <p>حمل و نقل</p>
              </div>
              <p>{convertVehicle(data.fleetVehicle)}</p>
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
              <p className={styles.underoption}>
                حداکثر {toPersianNumber(data.capacity)} نفر
              </p>
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
              <p>بیمه {toPersianNumber(50)} دیناری</p>
            </div>
          </div>
          <div className={styles.finish}>
            <Reserve id={data?.id} />
            <div className={styles.price}>
              <span>{toPersianNumber(convertToRial(data.price))}</span>
              <p>تومان</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
