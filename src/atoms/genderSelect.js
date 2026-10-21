import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const option =
  "m-0 cursor-pointer p-2.5 text-base font-normal text-muted hover:bg-surface-2";

export default function GenderSelect({ register, setValue }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const boxRef = useRef(null);

  const handleSelect = (value) => {
    setSelected(value);
    setValue("gender", value, { shouldValidate: true });
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!boxRef.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div
      ref={boxRef}
      className="relative w-full"
    >
      <div
        className="flex cursor-pointer items-center justify-between rounded-[5px] border border-muted px-2.5 py-[15px] text-base font-normal text-muted"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{selected || "جنسیت"}</span>
        <Image
          src="/images/arrow-down.png"
          width={12}
          height={12}
          alt="arrow"
          className="dark:invert"
        />
      </div>

      {isOpen && (
        <div className="absolute top-full right-0 left-0 z-10 mt-1 rounded-lg border border-line bg-surface">
          <p onClick={() => handleSelect("مرد")} className={option}>
            مرد
          </p>
          <p onClick={() => handleSelect("زن")} className={option}>
            زن
          </p>
        </div>
      )}
      <input type="hidden" {...register("gender")} />
    </div>
  );
}
