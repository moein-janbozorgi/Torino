"use client";

import styles from "@/styles/errorPage.module.css";
import Image from "next/image";

export default function GlobalError() {
  return (
    <div className={styles.container}>
      <Image src="/images/lamp.png" width={322} height={322} alt="lamp-img" />
      <div>
        <h1>اتصال با سرور برقرار نیست!</h1>
        <p>لطفا بعدا دوباره امتحان کنید.</p>
      </div>
    </div>
  );
}
