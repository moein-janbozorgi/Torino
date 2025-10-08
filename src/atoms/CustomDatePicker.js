"use client";

import { useState, useEffect } from "react";
import { DatePicker } from "zaman";
import Image from "next/image";
import styles from "@/styles/CheckoutPage.module.css";

function CustomDatePicker({ register, setValue, name }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (selected) {
      setValue(name, selected.toString());
    }
  }, [selected, setValue, name]);

  return (
    <div className={styles.datePickerBox}>
      <div
        className={styles.dateInputWrapper}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className={styles.dateText}>
          {selected ? selected.toString() : ""}
        </span>
        <Image src="/images/date.png" width={16} height={16} alt="date" />
      </div>
      {isOpen && (
        <div className={styles.dateDropdown}>
          <DatePicker value={selected} onChange={setSelected} locale="fa" />
        </div>
      )}
      <input
        type="hidden"
        {...register(name)}
        value={selected ? selected.toString() : ""}
      />
    </div>
  );
}

export default CustomDatePicker;
