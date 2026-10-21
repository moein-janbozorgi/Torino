import { toPersianNumber } from "@/utils/helper";
import Image from "next/image";

const item = "flex items-center gap-2.5 lg:w-[300px]";
const itemText = "mb-5 flex flex-col xs:mb-0";
const title =
  "text-sm font-medium text-text xs:text-[15px] md:text-base lg:text-[26px]";
const desc =
  "-mt-3 text-xs font-light xs:leading-[1.6] md:text-sm lg:-mt-[25px] lg:text-lg lg:text-text";

function Last() {
  return (
    <div className="mx-auto mt-10 w-full max-w-[327px] border-t border-line xs:mx-auto xs:mt-[30px] xs:max-w-[730px] xs:px-8 md:max-w-[990px] md:px-10 lg:mx-auto lg:mt-0 lg:mb-2.5 lg:max-w-[1150px]">
      <div className="mt-5 xs:flex xs:items-center xs:justify-between xs:gap-6">
        <div className={item}>
          <Image
            src="/images/16.png"
            width={64}
            height={64}
            alt="price-title"
          />
          <div className={itemText}>
            <p className={title}>بصرفه ترین قیمت</p>
            <span className={desc}>بصرفه ترین و ارزان ترین قیمت تور را از ما بخواهید.</span>
          </div>
        </div>
        <div className={item}>
          <Image
            src="/images/17.png"
            width={64}
            height={64}
            alt="contact-title"
          />
          <div className={itemText}>
            <p className={title}>پشتیبانی</p>
            <span className={desc}>
              پشتیبانی و همراهی {toPersianNumber(10)} ساعته در تمامی مراحل سفر
              شما.
            </span>
          </div>
        </div>
        <div className={item}>
          <Image
            src="/images/18.png"
            width={64}
            height={64}
            alt="rezayat-title"
          />
          <div className={itemText}>
            <p className={title}>رضایت کاربران</p>
            <span className={desc}>
              رضایت بیش از {toPersianNumber(10)} هزار کاربر از تور های ما
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Last;
