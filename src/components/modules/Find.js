"use client";

import styles from "@/styles/Find.module.css";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { DatePicker } from "zaman";
import { useRef, useEffect } from "react";

function Find() {
  const [activeInput, setActiveInput] = useState(null);
  const [range, setRange] = useState({ from: null, to: null });
  const [openCalendar, setOpenCalendar] = useState(false);
  const dropdownRef = useRef(null);
  const calendarRef = useRef(null);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: { origin: "", destination: "", dateRange: [] },
  });

  const cities = [
    "تهران",
    "اصفهان",
    "مشهد",
    "شیراز",
    "تبریز",
    "رشت",
    "کیش",
    "قشم",
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setOpenCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleSelectCity = (city) => {
    if (activeInput) {
      setValue(activeInput, city);
      setActiveInput(null);
    }
  };

  const displayText =
    range.from && range.to
      ? `${range.from.toLocaleDateString()} تا ${range.to.toLocaleDateString()}`
      : "تاریخ";

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
                        {city}
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
                        {city}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </label>
          </div>
          <div className={styles.dateBox}>
            <div
              className={styles.dateTag}
              onClick={() => {
                if (calendarRef.current) {
                  calendarRef.current.querySelector("input")?.focus();
                }
              }}
            >
              <Image src="/images/date.png" width={18} height={18} alt="date" />
              <span>{displayText}</span>
            </div>
            {openCalendar && (
              <div ref={calendarRef} className={styles.calendarDropdown}>
                <DatePicker
                  type="range"
                  range={range}
                  onChange={(value) => {
                    if (value?.from && value?.to) {
                      setRange(value);
                      setValue("dateRange", value);
                      setOpenCalendar(false);
                    }
                  }}
                  inputClass=""
                />
              </div>
            )}
          </div>
          <button type="submit" className={styles.searchBtn}>
            جستجو
          </button>
        </form>
      </div>
    </div>
  );
}

export default Find;
