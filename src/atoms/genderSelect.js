import { useEffect, useState } from "react";
import styles from "@/styles/CheckoutPage.module.css";
import Image from "next/image";

export default function GenderSelect({ register, setValue }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const handleSelect = (value) => {
    setSelected(value);
    setValue("gender", value, { shouldValidate: true });
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(`.${styles.genderBox}`)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className={styles.genderBox}>
      <div
        className={styles.genderInput}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{selected || "جنسیت"}</span>
        <Image
          src="/images/arrow-down.png"
          width={12}
          height={12}
          alt="arrow"
        />
      </div>

      {isOpen && (
        <div className={styles.dropdown}>
          <p onClick={() => handleSelect("مرد")}>مرد</p>
          <p onClick={() => handleSelect("زن")}>زن</p>
        </div>
      )}
      <input type="hidden" {...register("gender")} />
    </div>
  );
}
