"use client";

import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import Image from "next/image";
import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useRef, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { searchChecker } from "@/utils/validations";
import { convertCity, searchTours } from "@/utils/helper";
import { useSearchParams } from "next/navigation";

// The date range encoded in the URL. Returns undefined when the URL carries
// other filters but no dates, meaning "leave the user's own pick alone".
function rangeFromParams(params) {
  const originId = params.get("originId");
  const destinationId = params.get("destinationId");
  const startDate = params.get("startDate");
  const endDate = params.get("endDate");

  if (!originId && !destinationId && !startDate && !endDate) return [];

  if (startDate && endDate) {
    return [
      new DateObject({
        date: startDate,
        calendar: persian,
        locale: persian_fa,
      }),
      new DateObject({
        date: endDate,
        calendar: persian,
        locale: persian_fa,
      }),
    ];
  }

  return undefined;
}

const label =
  "relative flex w-full flex-1 text-center text-sm text-text lg:flex-[1_1_40%] lg:items-center lg:gap-1.5 lg:py-2.5 lg:pr-2 lg:pl-0 lg:[direction:rtl]";
const labelIcon =
  "pointer-events-none absolute top-1/2 -translate-y-1/2 lg:right-2.5 lg:order-2";
const cityInput =
  "h-10 w-full rounded-xl border border-line pr-3.5 text-center text-base text-muted outline-none xs:h-11 xs:text-[17px] md:h-[46px] lg:order-1 lg:mr-[23px] lg:h-auto lg:border-none! lg:bg-transparent lg:p-0 lg:text-right lg:text-base lg:text-fg lg:placeholder:text-right lg:placeholder:text-fg";
const cityDropdown =
  "absolute top-[45px] left-0 z-20 w-full animate-drop-in overflow-hidden rounded-lg border border-line bg-surface shadow-[0_4px_15px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_15px_rgba(0,0,0,0.6)] md:max-h-[180px] lg:top-[55px]";
const cityHeader =
  "px-[5px] py-[5px] text-right text-[13px] font-light text-text/70";
const cityList = "flex max-h-[150px] w-full flex-col overflow-y-auto";
const cityItem =
  "flex w-full cursor-pointer items-center gap-1.5 border-x-0 border-t-0 border-b border-solid border-line px-3.5 py-2.5 text-right text-sm font-normal text-text transition-[background] duration-200 lg:flex-row-reverse lg:justify-end";
// The old CSS's input-icon rule also reached these, hence the translate.
const cityItemIcon =
  "pointer-events-none static mt-[17px] shrink-0 -translate-y-1/2 lg:order-2";
const dateText =
  "flex w-full items-center justify-center text-center text-base font-normal text-muted lg:block lg:text-right lg:text-fg";

function Find({ onSearch, data }) {
  const searchParams = useSearchParams();
  const [activeInput, setActiveInput] = useState(null);
  const [range, setRange] = useState(
    () => rangeFromParams(searchParams) ?? { from: null, to: null },
  );
  const dropdownRef = useRef(null);

  // The DatePicker also writes `range`, so it cannot simply be derived. React's
  // documented way to fold a changed input into existing state is to adjust it
  // during render rather than from an effect.
  const paramsKey = searchParams.toString();
  const [prevParamsKey, setPrevParamsKey] = useState(paramsKey);
  if (paramsKey !== prevParamsKey) {
    setPrevParamsKey(paramsKey);
    const nextRange = rangeFromParams(searchParams);
    if (nextRange !== undefined) setRange(nextRange);
  }

  // Both lists are pure derivations of `data`, so compute them during render
  // rather than copying them into state from an effect.
  const originCities = useMemo(
    () =>
      Array.from(
        new Map(
          (Array.isArray(data) ? data : []).map((city) => [
            city.origin.id,
            {
              id: city.origin.id,
              name: convertCity(city.origin.name),
            },
          ]),
        ).values(),
      ),
    [data],
  );

  const destinationCities = useMemo(
    () =>
      Array.from(
        new Map(
          (Array.isArray(data) ? data : []).map((city) => [
            city.destination.id,
            {
              id: city.destination.id,
              name: convertCity(city.destination.name),
            },
          ]),
        ).values(),
      ),
    [data],
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveInput(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectCity = (city) => {
    if (activeInput) {
      setValue(activeInput, city.name, { shouldValidate: true });
      setActiveInput(null);
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(searchChecker),
    defaultValues: { destination: "", origin: "", dateRange: [] },
  });

  // Pushing the URL into the form is a sync with react-hook-form's own store,
  // which is external to React state. The range half is handled above.
  useEffect(() => {
    if (!searchParams) return;

    const originId = searchParams.get("originId");
    const destinationId = searchParams.get("destinationId");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    if (!originId && !destinationId && !startDate && !endDate) {
      setValue("origin", "");
      setValue("destination", "");
      return;
    }

    if (originId) {
      const originObj = originCities.find((c) => c.id.toString() === originId);
      if (originObj) setValue("origin", originObj.name);
    }
    if (destinationId) {
      const destinationObj = destinationCities.find(
        (c) => c.id.toString() === destinationId,
      );
      if (destinationObj) setValue("destination", destinationObj.name);
    }
  }, [searchParams, originCities, destinationCities, setValue]);

  const onSubmit = (data) => {
    searchTours({
      origin: data.origin,
      destination: data.destination,
      range,
      originCities,
      destinationCities,
      onSearch,
    });
  };

  return (
    <div className="mx-auto mb-[45px] max-w-[390px] px-4 xs:mb-[60px] xs:max-w-[720px] xs:px-8 md:mb-20 md:max-w-[800px] md:px-12">
      <div className="w-full lg:mx-auto lg:max-w-[1200px]">
        <div className="flex items-center justify-center gap-[7px] lg:mb-2.5">
          <span className="text-base font-semibold text-primary xs:text-[15px] md:text-[22px] lg:text-[28px]">تورینو</span>
          <p className="text-base font-semibold text-fg/65 xs:text-[15px] md:text-[22px] lg:text-[28px]">
            برگزار کننده بهترین تور های داخلی و خارجی</p>
        </div>

        <form
          className="flex flex-col gap-2.5 md:mx-auto md:w-[380px] md:gap-3.5 lg:w-[700px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex w-full flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:rounded-[20px] lg:border lg:border-line lg:bg-surface/45 lg:p-[5px]">
            <div className="mb-3.5 flex gap-5 md:gap-[25px] lg:m-0 lg:flex-row lg:items-center lg:gap-2.5 lg:p-0 lg:[direction:rtl]">
              <label className={label}>
                <Image
                  src="/images/location.png"
                  width={18}
                  height={18}
                  alt="location"
                  className={`${labelIcon} right-[30%] xs:right-[32%] md:right-[35%] dark:invert`}
                />
                <input
                  type="text"
                  className={cityInput}
                  placeholder="مبدا"
                  readOnly
                  {...register("origin")}
                  onClick={() => setActiveInput("origin")}
                />
                {errors.origin && (
                  <p className="absolute -bottom-[30px] left-0 mt-1 w-full text-right text-[10px] text-[#ff3b3b] lg:top-[50px] lg:right-[15px] lg:text-[11px]">{errors.origin.message}</p>
                )}
                {activeInput === "origin" && (
                  <div className={cityDropdown} ref={dropdownRef}>
                    <div className={cityHeader}>پرتردد</div>
                    <div className={cityList}>
                      {originCities.map((city, i) => (
                        <button
                          key={i}
                          type="button"
                          className={cityItem}
                          onClick={() => handleSelectCity(city)}
                        >
                          <Image
                            src="/images/location.png"
                            width={18}
                            height={18}
                            alt="location"
                            className={`${cityItemIcon} dark:invert`}
                          />
                          {city.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </label>

              <label className={`${label} lg:border-r lg:border-line`}>
                <Image
                  src="/images/global.png"
                  width={18}
                  height={18}
                  alt="global"
                  className={`${labelIcon} right-[20%] xs:right-[27%] md:right-[30%] dark:invert`}
                />
                <input
                  type="text"
                  className={cityInput}
                  placeholder="مقصد"
                  readOnly
                  {...register("destination")}
                  onClick={() => setActiveInput("destination")}
                />
                {activeInput === "destination" && (
                  <div className={cityDropdown} ref={dropdownRef}>
                    <div className={cityHeader}>پرتردد</div>
                    <div className={cityList}>
                      {destinationCities.map((city, i) => (
                        <button
                          key={i}
                          type="button"
                          className={cityItem}
                          onClick={() => handleSelectCity(city)}
                        >
                          <Image
                            src="/images/location.png"
                            width={18}
                            height={18}
                            alt="location"
                            className={`${cityItemIcon} dark:invert`}
                          />
                          {city.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </label>
            </div>
            <DatePicker
              range
              calendar={persian}
              locale={persian_fa}
              containerClassName="calendarContainer"
              onChange={(dates) => {
                setRange(dates);
                setValue(
                  "dateRange",
                  dates.map((d) => d.format("YYYY/MM/DD")),
                );
              }}
              render={(value, openCalendar) => (
                <div
                  onClick={openCalendar}
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-line bg-surface px-3 py-2 md:mx-auto md:w-4/5 lg:min-w-[200px] lg:flex-[1_1_20%] lg:justify-start lg:rounded-none lg:border-y-0 lg:border-r lg:border-l-0 lg:border-r-line lg:bg-transparent lg:text-right lg:[direction:rtl]"
                >
                  {range?.length ? (
                    <span className={dateText}>
                      {range[0]?.format("YYYY/MM/DD")} تا{" "}
                      {range[1]?.format("YYYY/MM/DD")}
                    </span>
                  ) : (
                    <div className="flex items-center gap-1.5 text-center text-base font-normal text-muted lg:mr-1">
                      <Image
                        src="/images/date.png"
                        width={16}
                        height={16}
                        alt="date"
                        className="dark:invert"
                      />
                      <span className={dateText}>تاریخ</span>
                    </div>
                  )}
                </div>
              )}
            />
            <button type="submit" className="mt-[15px] h-[47px] w-full rounded-2xl border-none bg-[#0f766e] text-xl font-normal text-white transition-all duration-200 ease-in hover:bg-[#115e59] hover:text-white md:mx-auto md:h-[50px] md:w-[55%] lg:m-0 lg:w-1/5 lg:shrink-0 lg:shadow-none">
              جستجو
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Find;
