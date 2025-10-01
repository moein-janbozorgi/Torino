import Link from "next/link";
import styles from "@/styles/notfound.module.css";
import Image from "next/image";

function Notfound() {
  return (
      <div className={styles.container}>
        <Image src="/images/Tv.png" width={322} height={322} alt="tv-img" />
        <div>
        <h1>صفحه مورد نظر یافت نشد!</h1>
        <Link href="/">بازگشت به صفحه اصلی</Link>
        </div>
      </div>
  );
}

export default Notfound;
