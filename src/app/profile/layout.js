"use client";

import AuthProvider from "@/Providers/AuthProvider";
import styles from "@/styles/ProfileLayout.module.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProfileLayout({ children }) {
  const pathname = usePathname();


  return (
    <AuthProvider>
      <div className={styles.container}>
        <aside className={styles.wrapper}>
          <div
            className={
              pathname === "/profile"
                ? `${styles.box} ${styles.active}`
                : styles.box
            }
          >
            <Image
              src={"/images/pblackfull.png"}
              width={16}
              height={16}
              alt="profile"
              priority={true}
            />
            <Link href="/profile">پروفایل</Link>
          </div>

          <div
            className={
              pathname === "/profile/tours"
                ? `${styles.box} ${styles.active}`
                : styles.box
            }
          >
            <Image src={"/images/sun.png"} width={16} height={16} alt="sun" />
            <Link href="/profile/tours">تور های من</Link>
          </div>

          <div
            className={
              pathname === "/profile/transactions"
                ? `${styles.box} ${styles.active}`
                : styles.box
            }
          >
            <Image
              src="/images/convert.png"
              width={16}
              height={16}
              alt="convert"
            />
            <Link href="/profile/transactions">تراکنش ها</Link>
          </div>
        </aside>
        <header className={styles.header}>
          <ul>
            <li className={pathname === "/profile" ? styles.active : ""}>
              <Image
                src={"/images/pblackfull.png"}
                width={16}
                height={16}
                alt="profile"
              />
              <Link href="/profile">پروفایل</Link>
            </li>

            <li className={pathname === "/profile/tours" ? styles.active : ""}>
              <Image src={"/images/sun.png"} width={16} height={16} alt="sun" />
              <Link href="/profile/tours">تور های من</Link>
            </li>

            <li
              className={
                pathname === "/profile/transactions" ? styles.active : ""
              }
            >
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
        <main className={styles.main}>{children}</main>
      </div>
    </AuthProvider>
  );
}
