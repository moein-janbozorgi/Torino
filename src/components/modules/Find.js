"use client";
import styles from "@/styles/Find.module.css";
import { useState } from "react";
import { DatePicker } from "zaman";

function Find() {
  const [range, setRange] = useState([null, null]);
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.select}>
        <div className={styles.text}>
          <span>تورینو</span>
          <p>برگزار کننده بهترین تور های داخلی و خارجی</p>
        </div>
        <form className={styles.form}>
          <div className={styles.topinput}>
            <input type="text" placeholder="مبدا" />
            <input type="text" placeholder="مقصد" />
          </div>
          <div className={styles.dateWrapper}>
            <input
              type="text"
              className={styles.dateInput}
              readOnly
              onClick={() => setShowPicker((s) => !s)}
              value={
                range[0] && range[1]
                  ? `${range[0].format("YYYY/MM/DD")}تا ${range[1].format(
                      "YYYY/MM/DD"
                    )}`
                  : "انتخاب تاریخ"
              }
            />
            {showPicker && (
              <div className={styles.pickerWrapper}>
                <DatePicker
                  locale="fa"
                  direction="rtl"
                  type="range"
                  onChange={(selectedRange) => {
                    setRange(selectedRange);
                    setShowPicker(false);
                  }}
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
