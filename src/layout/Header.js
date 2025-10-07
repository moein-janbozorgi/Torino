"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "@/styles/Header.module.css";
import { useEffect, useState } from "react";
import LoginModal from "@/components/modules/LoginModal";
import OtpModal from "@/components/modules/OtpModal";
import { getCookie } from "@/utils/cookieHelper";
import { useGetUserInfo } from "@/hooks/queries";
import UserProfile from "@/atoms/userProfile";

export default function Header() {
  const pathname = usePathname();
  const [hamburger, setHamburger] = useState(false);
  const [on, setIsOn] = useState(false);
  const [otp, setOtp] = useState(false);
  const [phone, setPhone] = useState("");
 

  const links = [
    { href: "/", label: "صفحه اصلی" },
    { href: "/services", label: "خدمات گردشگری" },
    { href: "/about", label: "درباره ما" },
    { href: "/contact", label: "تماس با ما" },
  ];

  const { data: user } = useGetUserInfo();

  console.log(user);

  return (
    <header className={styles.topheader}>
      <div className={styles.header}>
        <div>
          <Image
            src="/images/hamburger.png"
            width={22}
            height={18}
            alt="menu"
            onClick={() => setHamburger((s) => !s)}
          />
        </div>
        {user ? (
          <UserProfile data={user} />
        ) : (
          <div>
            <Image
              src="/images/loginarrow.png"
              width={40}
              height={40}
              alt="arrow"
              onClick={() => setIsOn((s) => !s)}
            />
          </div>
        )}
      </div>
      {hamburger ? (
        <>
          <div
            className={styles.overlay}
            onClick={() => setHamburger((s) => !s)}
          ></div>

          <div
            className={`${styles.hamburger} ${hamburger ? styles.open : ""}`}
          >
            <div>
              <Image
                src="/images/home.png"
                width={16}
                height={16}
                alt="home-img"
              />
              <Link href="/" className={styles.active}>
                صفحه اصلی
              </Link>
            </div>
            <div>
              <Image
                src="/images/airplane.png"
                width={16}
                height={16}
                alt="airplane-img"
              />
              <Link href="/">خدمات گردشگری</Link>
            </div>
            <div>
              <Image
                src="/images/volume-low.png"
                width={16}
                height={16}
                alt="volume-img"
              />
              <Link href="/">درباره ما</Link>
            </div>
            <div>
              <Image
                src="/images/call.png"
                width={16}
                height={16}
                alt="call-img"
              />
              <Link href="/">تماس با ما</Link>
            </div>
          </div>
        </>
      ) : null}
      <div className={styles.webheader}>
        <div className={styles.rightGroup}>
          <Image
            src="/images/Torino-logo.png"
            width={100}
            height={30}
            alt="torino-img"
          />
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={
                    link.href === "/"
                      ? pathname === "/"
                        ? styles.activeLink
                        : styles.link
                      : pathname.startsWith(link.href)
                      ? styles.activeLink
                      : styles.link
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {user ? (
          <UserProfile data={user} />
        ) : (
          <button className={styles.authbtn} onClick={() => setIsOn((s) => !s)}>
            <Image
              src="/images/profile.png"
              width={24}
              height={24}
              alt="profile-img"
            />
            <span className="text">ورود</span>
            <span className="divider">|</span>
            <span className="text">ثبت نام</span>
          </button>
        )}
      </div>

      {on ? (
        <LoginModal setIsOn={setIsOn} setOtp={setOtp} setPhone={setPhone} />
      ) : null}
      {otp ? (
        <OtpModal otp={otp} setOtp={setOtp} phone={phone} setIsOn={setIsOn} />
      ) : null}
    </header>
  );
}
