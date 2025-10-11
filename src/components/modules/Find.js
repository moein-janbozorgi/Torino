"use client";

import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import styles from "@/styles/Find.module.css";
import "@/styles/calendar.css";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRef, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { searchChecker } from "@/helper/validations";
import { useRouter } from "next/navigation";

function Find({ onSearch }) {
  const [activeInput, setActiveInput] = useState(null);
  const [range, setRange] = useState({ from: null, to: null });
  const dropdownRef = useRef(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(searchChecker),
    defaultValues: { destination: "", origin: "", dateRange: [] },
  });

  const cities = [
    { id: "1", name: "تهران" },
    { id: "2", name: "سنندج" },
    { id: "3", name: "مادرید" },
    { id: "4", name: "اصفهان" },
    { id: "5", name: "سلیمانیه" },
    { id: "6", name: "هولیر" },
    { id: "7", name: "مازندران" },
    { id: "8", name: "گیلان" },
    { id: "9", name: "ایتالیا" },
  ];

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

  const onSubmit = async (data) => {
    const originObj = cities.find((c) => c.name === data.origin);
    const destinationObj = cities.find((c) => c.name === data.destination);
    const originId = originObj.id;
    const destinationId = destinationObj.id;

    const startDateObj = new DateObject({
      calendar: persian,
      locale: persian_fa,
      date: range[0],
    });

    const endDateObj = new DateObject({
      calendar: persian,
      locale: persian_fa,
      date: range[1],
    });

    const startDate = startDateObj
      .convert("gregorian")
      .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
      .toDate()
      .toISOString();

    const endDate = endDateObj
      .convert("gregorian")
      .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
      .toDate()
      .toISOString();

    const query = new URLSearchParams({
      destinationId,
      originId,
      startDate,
      endDate,
    }).toString();

    console.log(startDate, endDate);

    try {
      const res = await fetch(`http://localhost:6500/tour?${query}`);
      const tours = await res.json();
      onSearch(tours);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.select}>
        <div className={styles.text}>
          <span>تورینو</span>
          <p>برگزار کننده بهترین تور های داخلی و خارجی</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.topinput}>
            <label className={styles.label}>
              <Image
                src="/images/location.png"
                width={18}
                height={18}
                alt="location"
              />
              <input
                type="text"
                placeholder="مبدا"
                readOnly
                {...register("origin")}
                onClick={() => setActiveInput("origin")}
              />
              {errors.origin && (
                <p className={styles.error}>{errors.origin.message}</p>
              )}
              {activeInput === "origin" && (
                <div className={styles.cityDropdown} ref={dropdownRef}>
                  <div className={styles.cityHeader}>پرتردد</div>
                  <div className={styles.cityList}>
                    {cities.map((city, i) => (
                      <button
                        key={i}
                        type="button"
                        className={styles.cityItem}
                        onClick={() => handleSelectCity(city)}
                      >
                        <Image
                          src="/images/location.png"
                          width={18}
                          height={18}
                          alt="location"
                        />
                        {city.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </label>

            <label className={styles.label}>
              <Image
                src="/images/global.png"
                width={18}
                height={18}
                alt="global"
              />
              <input
                type="text"
                placeholder="مقصد"
                readOnly
                {...register("destination")}
                onClick={() => setActiveInput("destination")}
              />
              {errors.destination && (
                <p className={styles.error}>{errors.destination.message}</p>
              )}
              {activeInput === "destination" && (
                <div className={styles.cityDropdown} ref={dropdownRef}>
                  <div className={styles.cityHeader}>پرتردد</div>
                  <div className={styles.cityList}>
                    {cities.map((city, i) => (
                      <button
                        key={i}
                        type="button"
                        className={styles.cityItem}
                        onClick={() => handleSelectCity(city)}
                      >
                        <Image
                          src="/images/location.png"
                          width={18}
                          height={18}
                          alt="location"
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
                dates.map((d) => d.format("YYYY/MM/DD"))
              );
            }}
            render={(value, openCalendar) => (
              <div onClick={openCalendar} className={styles.dateInput}>
                {range?.length ? (
                  <span>
                    {range[0]?.format("YYYY/MM/DD")} تا{" "}
                    {range[1]?.format("YYYY/MM/DD")}
                  </span>
                ) : (
                  <div className={styles.placeholder}>
                    <Image
                      src="/images/date.png"
                      width={16}
                      height={16}
                      alt="date"
                    />
                    <span>تاریخ</span>
                  </div>
                )}
              </div>
            )}
          />
          <button type="submit" className={styles.searchBtn}>
            جستجو
          </button>
        </form>
      </div>
    </div>
  );
}

export default Find;
