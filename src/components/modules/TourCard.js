import {
  convertCity,
  convertToRial,
  convertVehicle,
  formatJalaliText,
  idToNumber,
  toPersianNumber,
} from "@/utils/helper";
import Image from "next/image";

const status =
  "absolute left-0 mx-2 my-2.5 inline-block rounded-[27px] px-3 py-1.5 text-[6px] font-normal min-[392px]:text-[8px] md:text-[10px] lg:top-1 lg:left-1 lg:py-px";
const tourNameItem = "flex items-center gap-2.5";
const tourNameText = "text-xs font-normal text-black min-[392px]:text-sm";
const dateRow =
  "flex items-center justify-between text-xs font-normal text-[#00000099] min-[392px]:text-sm lg:gap-[15px]";
const dateTitle =
  "text-sm font-semibold text-black min-[392px]:text-base lg:text-sm";
const dateText =
  "text-xs font-normal text-[#00000099] min-[392px]:text-sm lg:text-sm";
const label =
  "text-[10px] font-semibold text-[#00000080] min-[392px]:text-sm";

function TourCard({ tour }) {
  const today = new Date();
  return (
    <div className="relative mx-auto mb-5 w-[330px] max-w-full rounded-[10px] border border-[#00000033] min-[392px]:w-[480px] md:w-[580px] lg:w-full">
      <div>
        {new Date(tour.endDate) < today ? (
          <p className={`${status} bg-[#28a7454d] text-[#28a745]`}>به اتمام رسیده</p>
        ) : (
          <p className={`${status} bg-[#d1b9004d] text-[#d1b900]`}>در حال برگزاری</p>
        )}
        <div className="border-b border-[#00000033] px-5 pt-5 pb-[5px] lg:py-0 lg:pr-[15px] lg:pl-0">
          <div className="flex gap-5 lg:gap-[170px]">
            <div className={tourNameItem}>
              <Image
                src="/images/sunfog.png"
                width={18}
                height={18}
                alt="sun"
                className="lg:size-5"
              />
              <p className={tourNameText}>{tour.title}</p>
            </div>
            <div className={tourNameItem}>
              <Image
                src="/images/airplanee.png"
                width={18}
                height={18}
                alt="airplane"
                className="lg:size-5"
              />
              <p className={tourNameText}>سفر با {convertVehicle(tour.fleetVehicle)}</p>
            </div>
          </div>
          <div className="lg:flex lg:gap-[25px]">
            <div className={dateRow}>
              <h3 className={dateTitle}>
                {convertCity(tour.origin.name)} به{" "}
                {convertCity(tour.destination.name)}
              </h3>
              <p className={dateText}>{formatJalaliText(tour.startDate)}</p>
            </div>
            <div className={dateRow}>
              <h3 className={dateTitle}>تاریخ برگشت</h3>
              <p className={dateText}>{formatJalaliText(tour.endDate)}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between px-2.5 py-2 lg:justify-normal">
          <div className="flex items-center gap-[13px] lg:pl-5">
            <p className={label}>شماره تور</p>
            <span className="text-xs font-medium text-[#282828] min-[392px]:text-sm">
              {toPersianNumber(idToNumber(tour.id, 9))}
            </span>
          </div>
          <div className="flex w-px items-center bg-[#00000033]"></div>
          <div className="flex items-center gap-5 lg:pr-5">
            <p className="text-[10px] font-semibold text-[#00000080] min-[392px]:text-[13px]">مبلغ پرداخت شده</p>
            <div className="flex items-center gap-[3px]">
              <span className="text-xs font-medium text-[#282828] min-[392px]:text-sm min-[392px]:text-black">{toPersianNumber(convertToRial(tour.price))}</span>
              <p className="text-[8px] font-light text-[#00000080] min-[392px]:text-[10px]">
                تومان
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourCard;
