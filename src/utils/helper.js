import { toJalaali } from "jalaali-js";
import { api } from "@/configs/config";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
export const searchTours = async ({
  origin,
  destination,
  range,
  originCities,
  destinationCities,
  onSearch,
}) => {
  try {
    const queryObj = {};

    const originObj = originCities.find((c) => c.name === origin);
    const destinationObj = destinationCities.find(
      (c) => c.name === destination
    );

    if (originObj) queryObj.originId = originObj.id;
    if (destinationObj) queryObj.destinationId = destinationObj.id;

    if (range[0]) {
      const startDate = new DateObject({
        calendar: persian,
        locale: persian_fa,
        date: range[0],
      })
        .convert("gregorian")
        .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
        .toDate()
        .toISOString();

      queryObj.startDate = startDate;
    }

    if (range[1]) {
      const endDate = new DateObject({
        calendar: persian,
        locale: persian_fa,
        date: range[1],
      })
        .convert("gregorian")
        .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
        .toDate()
        .toISOString();

      queryObj.endDate = endDate;
    }

    const queryString = new URLSearchParams(queryObj).toString();

    const tours = await api.get("/tour", { params: queryObj });
    onSearch(tours, queryString);
  } catch (err) {
    console.error(err);
  }
};

export function toPersianNumber(num) {
  if (num == null) return "";
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return num
    .toString()
    .split("")
    .map((c) => (/\d/.test(c) ? persianDigits[c] : c))
    .join("");
}

function convertToRial(dollarPrice, exchangeRate = 103) {
  const rialPrice = dollarPrice * exchangeRate;
  return rialPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const persianDays = [
  "یک‌شنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنج‌شنبه",
  "جمعه",
  "شنبه",
];

const persianMonths = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

export function formatJalaliText(isoDate) {
  const date = new Date(isoDate);

  const weekDay = persianDays[date.getDay()];

  const { jy, jm, jd } = toJalaali(
    date.getUTCFullYear(),
    date.getUTCMonth() + 1,
    date.getUTCDate()
  );

  const day = toPersianNumber(jd);
  const month = persianMonths[jm - 1];
  const year = toPersianNumber(jy);

  return [weekDay, day, month, year].join(" ");
}

// Stable display number derived from a record id (same id → same number),
// since the backend has no numeric reference of its own.
export function idToNumber(id, digits) {
  let hash = 0;
  for (const ch of String(id)) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  const min = 10 ** (digits - 1);
  return (min + (hash % (9 * min))).toString();
}

export function formatPersianDate(isoString) {
  const date = new Date(isoString);

  const faDate = new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);

  const faTime = new Intl.DateTimeFormat("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);

  return `${faTime} - ${faDate}`;
}

const vehicleMap = {
  bus: "اتوبوس",
  ship: "کشتی",
  train: "قطار",
  airplane: "هواپیما",
  SUV: "آفرود",
};

export function convertVehicle(name) {
  return vehicleMap[name] || name;
}

const cityMap = {
  Tehran: "تهران",
  Sananndaj: "سنندج",
  Madrid: "مادرید",
  Isfahan: "اصفهان",
  Sulaymaniyah: "سلیمانیه",
  Hewler: "هولر",
  Mazandaran: "مازندران",
  Gilan: "گیلان",
  Italy: "ایتالیا",
};

export function convertCity(name) {
  return cityMap[name] || name;
}

export { convertToRial };
