import Image from "next/image";
import styles from "@/styles/Find.module.css";

function Find() {
  return (
    <div className={styles.container}>
      <Image
        src="/images/airplan.png"
        width={390}
        height={119}
        alt="airplan-img"
      />
      <div className={styles.select}>
        <div className={styles.text}>
          <span>تورینو</span>
          <p> برگزار کننده بهترین تور های داخلی و خارجی</p>
        </div>
        <form></form>
      </div>
    </div>
  );
}

export default Find;
