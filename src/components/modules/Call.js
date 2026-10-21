import { toPersianNumber } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";

function Call() {
  return (
    <div className="mx-auto mt-[100px] mb-5 w-full max-w-[327px] xs:flex xs:max-w-[730px] xs:px-8 md:mt-[70px] md:mb-10 md:max-w-[990px] md:px-12 lg:max-w-[1150px]">
      <div className="relative h-[130px] rounded-t-[10px] border-x border-t border-[#218838] bg-[#28a745] px-2.5 py-3 xs:top-0 xs:right-1.5 xs:z-2 xs:h-[172px] xs:w-[70%] xs:rounded-[10px] xs:border-b lg:h-[200px]">
        <div className="z-2 flex flex-col gap-1.5 text-white md:px-[5px] lg:px-10 lg:py-2.5">
          <div className="flex items-center gap-1 md:gap-[9px]">
            <p className="m-0 text-[22px] font-normal text-white xs:text-[28px] md:text-[34px] lg:text-5xl">
              خرید تلفنی از
            </p>
            <span className="text-[22px] font-extrabold text-[#10411b] xs:text-[28px] md:text-[34px] lg:text-5xl">
              تورینو
            </span>
          </div>
          <p className="m-0 text-sm font-normal xs:text-lg md:text-2xl lg:text-[32px]">به هرکجا که میخواهید!</p>
        </div>
        <div className="absolute right-[130px] -bottom-[9px] z-1 xs:right-1/2 md:right-[55%] lg:right-[65%]">
          <Image
            src="/images/mard.png"
            width={195}
            height={158}
            alt="call-torino"
          />
        </div>
      </div>
      <div className="flex items-center justify-evenly gap-2 rounded-b-[10px] border-x border-b border-[#00000040] bg-white py-3 xs:relative xs:w-[30%] xs:flex-col xs:justify-center xs:rounded-l-[10px] xs:rounded-r-none xs:border-t">
        <div className="flex items-center gap-1.5 text-base font-bold text-[#282828]">
          <span className="lg:text-[22px]"> {toPersianNumber("021-1840")}</span>
          <Image src="/images/call.png" width={20} height={20} alt="call-img" />
        </div>
        <div>
          <Link
            href="#"
            className="inline-block rounded-lg bg-[#10411b] px-[30px] py-1.5 text-sm font-semibold text-white no-underline transition-colors duration-200 hover:bg-[#218838]"
          >اطلاعات بیشتر</Link>
        </div>
      </div>
    </div>
  );
}

export default Call;
