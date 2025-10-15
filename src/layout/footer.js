import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Footer.module.css";
import { toPersianNumber } from "@/utils/helper";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.topline}></div>
      <div className={styles.main}>
        <div className={styles.topfooter}>
          <div>
            <ul className={styles.right}>
              <li>
                <Link href="/">تورینو</Link>
              </li>
              <li>
                <Link href="#">درباره ما</Link>
              </li>
              <li>
                <Link href="#">تماس با ما</Link>
              </li>
              <li>
                <Link href="#">چرا تورینو</Link>
              </li>
              <li>
                <Link href="#">بیمه مسافرتی</Link>
              </li>
            </ul>
          </div>
          <div>
            <ul className={styles.left}>
              <li>
                <Link href="/">خدمات مشتریان</Link>
              </li>
              <li>
                <Link href="#">پشتیبانی آنلاین</Link>
              </li>
              <li>
                <Link href="#">راهنمای خرید</Link>
              </li>
              <li>
                <Link href="#">راهنمای استرداد</Link>
              </li>
              <li>
                <Link href="#">پرسش و پاسخ</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottomfooter}>
          <div className={styles.photo}>
            <div>
              <Image
                src="/images/qrcode.png"
                width={35}
                height={38}
                alt="qrcode"
              />
              <Image
                src="/images/saman.png"
                width={34}
                height={38}
                alt="saman"
              />
              <Image src="/images/aira.png" width={35} height={38} alt="aira" />
            </div>
            <div>
              <Image
                src="/images/sazman.png"
                width={40}
                height={38}
                alt="sazman"
              />
              <Image
                src="/images/chatr.png"
                width={36}
                height={38}
                alt="chatr"
              />
            </div>
          </div>
          <div className={styles.torino}>
            <Image
              src="/images/torino-logo.png"
              width={100}
              height={30}
              alt="torino"
            />
            <p className={styles.contact}>
              تلفن پشتیبانی: {toPersianNumber("8574-021")}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.bottomline}></div>
      <p className={styles.last}>کلیه حقوق این وب سایت متعلق به تورینو میباشد.</p>
    </footer>
  );
}
