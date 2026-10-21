import Link from "next/link";
import Image from "next/image";
import { toPersianNumber } from "@/utils/helper";

const item = "my-2";
const firstItem = "mt-2 mb-2.5 lg:mb-5";
const link =
  "text-base font-normal text-text no-underline transition-colors duration-300 hover:text-[#1ea34a] xs:text-sm lg:text-lg";
const firstLink =
  "text-[22px] font-semibold text-text no-underline transition-colors duration-300 xs:text-lg xs:font-medium lg:text-[22px]";
const badgeGroup =
  "col-span-3 flex justify-center gap-4 xs:items-center lg:gap-6";
const badge = "md:h-[45px] md:w-10 lg:h-[55px] lg:w-[50px]";

export default function Footer() {
  return (
    <footer className="w-full px-8 xs:mx-auto xs:px-12 md:px-16 lg:mx-auto lg:my-2.5 lg:flex lg:max-w-[1200px] lg:flex-col lg:justify-between lg:text-xl lg:text-text">
      <div className="mt-8 w-full border-t border-dashed border-line lg:m-0 lg:border lg:border-solid lg:border-line"></div>
      <div className="md:flex md:justify-between">
        <div className="flex justify-between md:gap-[35px] lg:gap-20">
          <div>
            <ul className="list-none p-0">
              <li className={firstItem}>
                <Link className={firstLink} href="/">تورینو</Link>
              </li>
              <li className={item}>
                <Link className={link} href="#">درباره ما</Link>
              </li>
              <li className={item}>
                <Link className={link} href="#">تماس با ما</Link>
              </li>
              <li className={item}>
                <Link className={link} href="#">چرا تورینو</Link>
              </li>
              <li className={item}>
                <Link className={link} href="#">بیمه مسافرتی</Link>
              </li>
            </ul>
          </div>
          <div>
            <ul className="list-none p-0">
              <li className={firstItem}>
                <Link className={firstLink} href="/">خدمات مشتریان</Link>
              </li>
              <li className={item}>
                <Link className={link} href="#">پشتیبانی آنلاین</Link>
              </li>
              <li className={item}>
                <Link className={link} href="#">راهنمای خرید</Link>
              </li>
              <li className={item}>
                <Link className={link} href="#">راهنمای استرداد</Link>
              </li>
              <li className={item}>
                <Link className={link} href="#">پرسش و پاسخ</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-between xs:items-end xs:gap-[30px] md:flex-col lg:gap-10">
          <div className="grid grid-cols-3 items-center justify-items-center gap-2 xs:order-2 xs:mb-2.5 xs:flex">
            <div className={badgeGroup}>
              <Image
                src="/images/qrcode.png"
                width={35}
                height={38}
                alt="qrcode"
                className={badge}
              />
              <Image
                src="/images/saman.png"
                width={34}
                height={38}
                alt="saman"
                className={badge}
              />
              <Image
                src="/images/aira.png"
                width={35}
                height={38}
                alt="aira"
                className={badge}
              />
            </div>
            <div className={badgeGroup}>
              <Image
                src="/images/sazman.png"
                width={40}
                height={38}
                alt="sazman"
                className={badge}
              />
              <Image
                src="/images/chatr.png"
                width={36}
                height={38}
                alt="chatr"
                className={badge}
              />
            </div>
          </div>
          <div className="flex flex-col items-end xs:order-1 xs:mt-[30px] xs:flex xs:flex-col">
            <Image
              src="/images/Torino-logo.png"
              width={100}
              height={30}
              alt="torino"
              className="md:h-[35px] md:w-[126px] lg:h-11 lg:w-[146px] dark:invert dark:hue-rotate-180"
            />
            <p className="mt-2 text-center text-xs font-light text-fg md:text-base lg:text-lg lg:font-normal">
              تلفن پشتیبانی: {toPersianNumber("8574-021")}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-[7px] h-px w-full bg-line"></div>
      <p className="m-[3px] text-center text-xs font-light lg:mx-0 lg:mt-3 lg:mb-0 lg:text-[15px] lg:font-normal lg:text-fg">کلیه حقوق این وب سایت متعلق به تورینو میباشد.</p>
    </footer>
  );
}
