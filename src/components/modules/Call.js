import { toPersianNumber } from "@/utils/helper";
import styles from "@/styles/call.module.css";
import Image from "next/image";
import Link from "next/link";

function Call() {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.text}>
          <div className={styles.buy}>
            <p>خرید تلفنی از</p>
            <span>تورینو</span>
          </div>
          <p>به هرکجا که میخواهید!</p>
        </div>
        <div className={styles.mard}>
          <Image
            src="/images/mard.png"
            width={195}
            height={158}
            alt="call-torino"
          />
        </div>
      </div>
      <div className={styles.details}>
        <div className={styles.phone}>
          <span> {toPersianNumber("021-1840")}</span>
          <Image src="/images/call.png" width={20} height={20} alt="call-img" />
        </div>
        <div>
          <Link href="#">اطلاعات بیشتر</Link>
        </div>
      </div>
    </div>
  );
}

export default Call;
