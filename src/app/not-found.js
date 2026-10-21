import Link from "next/link";
import Image from "next/image";

function Notfound() {
  return (
      <div className="text-center md:flex md:flex-row-reverse md:items-center lg:mx-auto lg:max-w-[1200px] lg:gap-[30px]">
        <Image
          src="/images/Tv.png"
          width={322}
          height={322}
          alt="tv-img"
          className="md:size-[440px] lg:size-[550px]"
        />
        <div className="lg:flex lg:flex-col lg:items-center">
        <h1 className="-mt-2.5 mb-[30px] text-2xl font-semibold text-text md:text-[28px] lg:mb-[70px] lg:text-4xl">صفحه مورد نظر یافت نشد!</h1>
        <Link
          href="/"
          className="rounded-2xl bg-[#ccfbf1] dark:bg-[#0d948826] px-5 py-2.5 text-xl font-normal text-[#0d9488] no-underline transition-all duration-100 ease-in hover:bg-[#0f766e] hover:text-white md:text-[22px] lg:text-[28px]"
        >بازگشت به صفحه اصلی</Link>
        </div>
      </div>
  );
}

export default Notfound;
