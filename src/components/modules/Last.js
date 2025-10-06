import { toPersianNumber } from "@/helper/helper";
import styles from "@/styles/Last.module.css";
import Image from "next/image";

function Last() {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.textimg}>
          <Image
            src="/images/16.png"
            width={64}
            height={64}
            alt="price-title"
          />
          <div>
            <p>بصرفه ترین قیمت</p>
            <span>بصرفه ترین و ارزان ترین قیمت تور را از ما بخواهید.</span>
          </div>
        </div>
        <div className={styles.textimg}>
          <Image
            src="/images/17.png"
            width={64}
            height={64}
            alt="contact-title"
          />
          <div>
            <p>پشتیبانی</p>
            <span>
              پشتیبانی و همراهی {toPersianNumber(10)} ساعته در تمامی مراحل سفر
              شما.
            </span>
          </div>
        </div>
        <div className={styles.textimg}>
          <Image
            src="/images/18.png"
            width={64}
            height={64}
            alt="rezayat-title"
          />
          <div>
            <p>رضایت کاربران</p>
            <span>
              رضایت بیش از {toPersianNumber(10)} هزار کاربر از تور های ما
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Last;
