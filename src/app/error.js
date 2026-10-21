"use client";

import Image from "next/image";

export default function GlobalError() {
  return (
    <div className="mt-[60px] min-h-screen text-center lg:mx-auto lg:my-10 lg:flex lg:max-w-[1200px] lg:flex-row-reverse lg:items-center lg:justify-between">
      <Image
        src="/images/lamp.png"
        width={322}
        height={322} alt="lamp-img"
        className="md:size-[440px] lg:size-[550px]"
      />
      <div>
        <h1 className="-mt-2.5 text-2xl font-semibold text-text md:text-[28px] lg:text-4xl">اتصال با سرور برقرار نیست!</h1>
        <p className="text-base font-semibold text-text md:text-xl lg:text-2xl">لطفا بعدا دوباره امتحان کنید.</p>
      </div>
    </div>
  );
}
