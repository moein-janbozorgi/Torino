"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "@/styles/Header.module.css";
import { useEffect, useState } from "react";
import LoginModal from "@/components/modules/LoginModal";
import OtpModal from "@/components/modules/OtpModal";
import { useSearchParams } from "next/navigation";
import { useGetUserInfo } from "@/hooks/queries";
import UserProfile from "@/atoms/userProfile";

export default function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const loginRequested = searchParams.get("login") === "true";

  const [hamburger, setHamburger] = useState(false);
  // Seed from the URL so ?login=true opens the modal on the very first render,
  // with no flash of the closed header.
  const [on, setIsOn] = useState(loginRequested);
  const [otp, setOtp] = useState(false);
  const [phone, setPhone] = useState("");

  const { data: user } = useGetUserInfo();

  // Re-open if the param flips on later during a client navigation. Adjusting
  // state during render is React's documented alternative to an effect here.
  const [prevLoginRequested, setPrevLoginRequested] = useState(loginRequested);
  if (loginRequested !== prevLoginRequested) {
    setPrevLoginRequested(loginRequested);
    if (loginRequested) setIsOn(true);
  }

  // Stripping the param from the address bar is a real external-system sync.
  useEffect(() => {
    if (!loginRequested) return;

    const url = new URL(window.location.href);
    url.searchParams.delete("login");

    window.history.replaceState({}, "", url);
  }, [loginRequested]);

  return (
    <header className={styles.topheader}>
      <div className={styles.header}>
        <div>
          <Image
            src="/images/hamburger.png"
            width={25}
            height={20}
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
            <div className={pathname === "/" ? `${styles.active}` : ""}>
              <Image
                src="/images/home.png"
                width={16}
                height={16}
                alt="home-img"
              />
              <Link href="/">صفحه اصلی</Link>
            </div>
            <div className={pathname === "/#" ? `${styles.active}` : ""}>
              <Image
                src="/images/airplane.png"
                width={16}
                height={16}
                alt="airplane-img"
              />
              <Link href="/#">خدمات گردشگری</Link>
            </div>
            <div className={pathname === "/#" ? `${styles.active}` : ""}>
              <Image
                src="/images/volume-low.png"
                width={16}
                height={16}
                alt="volume-img"
              />
              <Link href="/#">درباره ما</Link>
            </div>
            <div className={pathname === "/#" ? `${styles.active}` : ""}>
              <Image
                src="/images/callkh.png"
                width={16}
                height={16}
                alt="call-img"
              />
              <Link href="/#">تماس با ما</Link>
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
            <li className={pathname === "/" ? `${styles.active}` : ""}>
              <Link href="/">صفحه اصلی</Link>
            </li>
            <li className={pathname === "/#" ? `${styles.active}` : ""}>
              <Link href="/#">خدمات گردشگری</Link>
            </li>
            <li className={pathname === "/#" ? `${styles.active}` : ""}>
              <Link href="/#">درباره ما</Link>
            </li>
            <li className={pathname === "/#" ? `${styles.active}` : ""}>
              <Link href="/#"> تماس با ما</Link>
            </li>
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
