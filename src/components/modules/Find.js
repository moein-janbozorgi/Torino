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
import { searchChecker } from "@/utils/validations";
import { api } from "@/configs/config";
import { convertCity, searchTours } from "@/utils/helper";
import { useSearchParams } from "next/navigation";

function Find({ onSearch, data }) {
  const searchParams = useSearchParams();
  const [activeInput, setActiveInput] = useState(null);
  const [range, setRange] = useState({ from: null, to: null });
  const [originCities, setOriginCities] = useState([]);
  const [destinationCities, setDestinationCities] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!data) return;
    const origins = Array.from(
      new Map(
        data.map((city) => [
          city.origin.id,
          {
            id: city.origin.id,
            name: convertCity(city.origin.name),
          },
        ])
      ).values()
    );

    const destinations = Array.from(
      new Map(
        data.map((city) => [
          city.destination.id,
          {
            id: city.destination.id,
            name: convertCity(city.destination.name),
          },
        ])
      ).values()
    );

    setOriginCities(origins);
    setDestinationCities(destinations);
  }, [data]);

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

  useEffect(() => {
    if (!searchParams) return;

    const originId = searchParams.get("originId");
    const destinationId = searchParams.get("destinationId");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    if (!originId && !destinationId && !startDate && !endDate) {
      setRange([]);
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
        (c) => c.id.toString() === destinationId
      );
      if (destinationObj) setValue("destination", destinationObj.name);
    }
    if (startDate && endDate) {
      setRange([
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
      ]);
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
    <div className={styles.container}>
      <div className={styles.select}>
        <div className={styles.text}>
          <span>تورینو</span>
          <p>برگزار کننده بهترین تور های داخلی و خارجی</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.searchBox}>
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
                      {originCities.map((city, i) => (
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
                {activeInput === "destination" && (
                  <div className={styles.cityDropdown} ref={dropdownRef}>
                    <div className={styles.cityHeader}>پرتردد</div>
                    <div className={styles.cityList}>
                      {destinationCities.map((city, i) => (
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
          </div>
        </form>
      </div>
    </div>
  );
}

export default Find;
