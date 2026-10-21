import Image from "next/image";
import {
  convertCity,
  convertToRial,
  convertVehicle,
  formatJalaliText,
  toPersianNumber,
} from "@/utils/helper";
import { notFound } from "next/navigation";
import { serverFetch } from "@/hooks/HttpsReq";
import Reserve from "@/atoms/reserve";

const descItem = "flex items-center gap-2.5 md:flex-none md:gap-[5px]";
const descText = "text-[13px] font-normal text-muted lg:text-[15px]";
const descIcon = "lg:size-[18px]";
const optionText = "text-sm font-medium text-text";
const priceValue = "text-2xl font-medium text-[#009eca]";
const priceUnit = "mt-[15px] text-[10px] font-normal text-text/80";

export const metadata = {
  title: "Torino details",
  description: "جزییات محصول"
};

export default async function Page({ params }) {
  const awaitedParams = await params;
  const idtour = awaitedParams.idtour;

  const data = await serverFetch(`/tour/${idtour}`, {}, { cache: "no-store" });


  // A bad id comes back as an error body, not false, so check for a real tour.
  if (!data?.id) notFound();

  const nights = Math.round((new Date(data.endDate) - new Date(data.startDate)) / 86400000);

  // The first three boxes only show from lg; the rest are nudged to line up.
  const options = [
    {
      icon: "/images/routing.png",
      label: "مبدا",
      value: convertCity(data.origin.name),
      boxClass: "ml-5 hidden lg:flex lg:translate-x-[10px]",
    },
    {
      icon: "/images/calendar.png",
      label: "تاریخ رفت",
      value: formatJalaliText(data.startDate),
      boxClass: "hidden lg:flex lg:translate-x-5",
    },
    {
      icon: "/images/calendar.png",
      label: "تاریخ برگشت",
      value: formatJalaliText(data.endDate),
      boxClass: "mr-2.5 hidden lg:flex lg:translate-x-[13px]",
    },
    {
      icon: "/images/bus.png",
      label: "حمل و نقل",
      value: convertVehicle(data.fleetVehicle),
    },
    {
      icon: "/images/2user.png",
      label: "ظرفیت",
      value: `حداکثر ${toPersianNumber(data.capacity)} نفر`,
    },
    {
      icon: "/images/security.png",
      label: "بیمه",
      value: `بیمه ${toPersianNumber(50)} دیناری`,
      boxClass: "flex lg:-translate-x-[10px]",
    },
  ];

  return (
    <div className="mx-auto my-10 w-full max-w-[330px] xs:max-w-[500px] md:mt-[100px] md:mb-[70px] md:w-[calc(100%-100px)] md:max-w-[900px] md:rounded-[10px] md:border md:border-line lg:w-[calc(100%-240px)] lg:max-w-[1200px]">
      <div className="xs:p-5 md:w-full md:px-[15px] md:pt-5 md:pb-0">
        <div>
          <div className="md:flex md:gap-5">
            <div>
              <Image
                src={data.image}
                width={330}
                height={220}
                alt="tour"
                className="h-auto w-full rounded-b-xl md:h-[200px] md:w-[250px] md:rounded-xl lg:h-[230px] lg:w-[300px]"
              />
            </div>
            <div className="md:flex md:flex-1 md:flex-col">
              <div className="flex items-center justify-between md:flex-col md:items-start">
                <h1 className="text-2xl font-bold text-fg md:m-0 md:p-0 lg:text-[28px]">{data.title}</h1>
                <p className="text-[15px] font-normal text-text lg:text-lg">
                  {toPersianNumber(nights + 1)} روز و {toPersianNumber(nights)} شب
                </p>
              </div>
              <div className="flex justify-between md:mr-[5px] md:justify-start md:gap-[25px]">
                <div className={descItem}>
                  <Image
                    src="/images/usertick.png"
                    width={14}
                    height={14}
                    alt="user"
                    className={`${descIcon} dark:invert`}
                  />
                  <p className={descText}>تورلیدر از مبدا</p>
                </div>
                <div className={descItem}>
                  <Image
                    src="/images/map.png"
                    width={14}
                    height={14}
                    alt="map"
                    className={`${descIcon} dark:invert`}
                  />
                  <p className={descText}>برنامه سفر</p>
                </div>
                <div className={descItem}>
                  <Image
                    src="/images/medal.png"
                    width={14}
                    height={14}
                    alt="medal"
                    className={`${descIcon} dark:invert`}
                  />
                  <p className={descText}>تضمین کیفیت</p>
                </div>
              </div>
              <div className="hidden md:flex md:flex-row-reverse md:items-center md:justify-between">
                <Reserve id={data?.id} />
                <div className="md:mt-2.5 md:flex md:items-center md:gap-[7px]">
                  <span className={`${priceValue} lg:text-[28px]`}>{toPersianNumber(convertToRial(data.price))}</span>
                  <p className={`${priceUnit} lg:text-[13px]`}>تومان</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-2 text-center md:justify-start md:gap-0">
            {options.map((option, i) => (
              <div
                key={option.label}
                className={`relative flex-col md:justify-center md:px-5 lg:flex-1 ${
                  i < options.length - 1
                    ? "lg:after:absolute lg:after:top-[15%] lg:after:bottom-[15%] lg:after:left-0 lg:after:h-[70%] lg:after:w-px lg:after:bg-line lg:after:content-['']"
                    : ""
                } ${option.boxClass ?? "flex"}`}
              >
                <div className="-mb-[15px] flex items-center justify-center gap-[5px] whitespace-nowrap">
                  <Image src={option.icon} width={14} height={14} alt="medal" className="dark:invert" />
                  <p className={optionText}>{option.label}</p>
                </div>
                <p className={optionText}>{option.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between md:hidden">
            <Reserve id={data?.id} />
            <div className="flex items-center gap-[7px]">
              <span className={priceValue}>{toPersianNumber(convertToRial(data.price))}</span>
              <p className={priceUnit}>تومان</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
