import styles from "@/styles/ToursCard.module.css";
import {
  convertCity,
  convertToRial,
  convertVehicle,
  formatJalaliText,
  randomNineDigit,
  toPersianNumber,
} from "@/utils/helper";
import Image from "next/image";

function TourCard({ tour }) {
  const today = new Date();
  console.log(tour);
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        {new Date(tour.endDate) < today ? (
          <p className={styles.end}>به اتمام رسیده</p>
        ) : (
          <p className={styles.ongoing}>در حال برگزاری</p>
        )}
        <div className={styles.topMain}>
          <div className={styles.tourName}>
            <div>
              <Image
                src="/images/sunfog.png"
                width={18}
                height={18}
                alt="sun"
              />
              <p>{tour.title}</p>
            </div>
            <div>
              <Image
                src="/images/airplanee.png"
                width={18}
                height={18}
                alt="airplane"
              />
              <p>سفر با {convertVehicle(tour.fleetVehicle)}</p>
            </div>
          </div>
          <div className={styles.timeWrapper}>
            <div className={styles.origindest}>
              <h3>
                {convertCity(tour.origin.name)} به{" "}
                {convertCity(tour.destination.name)}
              </h3>
              <p>{formatJalaliText(tour.startDate)}</p>
            </div>
            <div className={styles.endDate}>
              <h3>تاریخ برگشت</h3>
              <p>{formatJalaliText(tour.endDate)}</p>
            </div>
          </div>
        </div>
        <div className={styles.bottomMain}>
          <div className={styles.numTour}>
            <p>شماره تور</p>
            <span>{toPersianNumber(randomNineDigit())}</span>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.bottomLeft}>
            <p className={styles.spend}>مبلغ پرداخت شده</p>
            <div className={styles.price}>
              <span>{toPersianNumber(convertToRial(tour.price))}</span>
              <p>تومان</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourCard;
