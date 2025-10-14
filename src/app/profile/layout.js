import styles from "@/styles/ProfileLayout.module.css";
import Image from "next/image";
import Link from "next/link";

export default function ProfileLayout({ children }) {
  return (
    <div>
      <header className={styles.header}>
        <ul>
          <li>
            <Image
              src="/images/pblackfull.png"
              width={16}
              height={16}
              alt="profile"
            />
            <Link href="/profile">پروفایل</Link>
          </li>
          <li>
            <Image src="/images/sun.png" width={16} height={16} alt="sun" />
            <Link href="/profile/tours">تور های من</Link>
          </li>
          <li>
            <Image
              src="/images/convert.png"
              width={16}
              height={16}
              alt="convert"
            />
            <Link href="/profile/transactions">تراکنش ها</Link>
          </li>
        </ul>
      </header>
      <main>{children}</main>
    </div>
  );
}
