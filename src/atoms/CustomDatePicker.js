"use client";

import { useState, useEffect } from "react";
import { DatePicker } from "zaman";
import Image from "next/image";

function CustomDatePicker({ register, setValue, name }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (selected) {
      setValue(name, selected.toString());
    }
  }, [selected, setValue, name]);

  return (
    <div>
      <div onClick={() => setIsOpen((prev) => !prev)}>
        <span>
          {selected ? selected.toString() : ""}
        </span>
        <Image src="/images/date.png" width={16} height={16} alt="date" />
      </div>
      {isOpen && (
        <div>
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
