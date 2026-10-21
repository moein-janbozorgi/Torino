"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LoginModal from "@/components/modules/LoginModal";
import OtpModal from "@/components/modules/OtpModal";
import { useSearchParams } from "next/navigation";
import { useGetUserInfo } from "@/hooks/queries";
import UserProfile from "@/atoms/userProfile";
import ThemeToggle from "@/atoms/ThemeToggle";

// `mono` icons are near-black and get inverted in dark mode; home.png is already green.
const navLinks = [
  { href: "/", label: "صفحه اصلی", icon: "/images/home.png", alt: "home-img" },
  {
    href: "/#",
    label: "خدمات گردشگری",
    icon: "/images/airplane.png",
    alt: "airplane-img",
    mono: true,
  },
  {
    href: "/#",
    label: "درباره ما",
    icon: "/images/volume-low.png",
    alt: "volume-img",
    mono: true,
  },
  {
    href: "/#",
    label: "تماس با ما",
    icon: "/images/callkh.png",
    alt: "call-img",
    mono: true,
  },
];

const activeIcon =
  "invert-[44%] sepia-[94%] saturate-[10000%] hue-rotate-135 brightness-90 contrast-90";

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
    <header className="fixed top-0 left-0 z-[1000] w-full bg-surface shadow-[0px_1px_4px_0px_#00000040] dark:shadow-[0px_1px_0px_0px_#ffffff26]">
      <div className="mx-auto flex w-full items-center justify-between px-[1.8rem] pt-[0.7rem] pb-[0.2rem] xs:px-12 md:hidden">
        <div>
          <Image
            src="/images/hamburger.png"
            width={25}
            height={20}
            alt="menu"
            onClick={() => setHamburger((s) => !s)}
            className="dark:invert"
          />
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
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
      </div>
      {hamburger ? (
        <>
          <div
            className="fixed top-0 left-0 z-[900] h-full w-full bg-black/20 backdrop-blur-[1px]"
            onClick={() => setHamburger((s) => !s)}
          ></div>

          <div className="fixed top-0 right-0 z-[1000] flex h-full w-1/2 translate-x-0 flex-col rounded-xl bg-surface pt-[30px] pr-2.5 transition-transform duration-300 ease-in-out">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <div
                  key={link.label}
                  className="mb-5 flex items-center gap-2.5"
                >
                  <Image
                    src={link.icon}
                    width={16}
                    height={16}
                    alt={link.alt}
                    className={
                      active ? activeIcon : link.mono ? "dark:invert" : ""
                    }
                  />
                  <Link
                    href={link.href}
                    className={`text-base no-underline ${
                      active
                        ? "font-semibold text-[#28a745]"
                        : "font-normal text-text"
                    }`}
                  >
                    {link.label}
                  </Link>
                </div>
              );
            })}
          </div>
        </>
      ) : null}
      <div className="hidden md:flex md:h-[60px] md:items-center md:justify-between md:px-16 md:py-3 lg:mx-auto lg:max-w-[1200px]">
        <div className="flex items-center gap-[3.3rem] md:gap-6 lg:gap-[3.3rem]">
          <Image
            src="/images/Torino-logo.png"
            width={100}
            height={30}
            alt="torino-img"
            className="cursor-pointer object-contain dark:invert dark:hue-rotate-180"
          />
          <ul className="m-0 flex list-none gap-8 p-0">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`text-base font-normal no-underline transition-colors duration-300 hover:text-[#1ea34a] md:text-[15px] lg:text-base ${
                    pathname === link.href ? "text-[#28a745]" : "text-text"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {user ? (
            <UserProfile data={user} />
          ) : (
            <button
              className="flex h-[30px] cursor-pointer items-center gap-1.5 rounded-lg border-2 border-solid border-[#1ea34a] bg-transparent text-sm font-semibold text-[#1ea34a] transition-all duration-300 hover:bg-[#6eff9e] hover:text-white md:px-2.5 md:py-[15px]"
              onClick={() => setIsOn((s) => !s)}
            >
              <Image
                src="/images/profile.png"
                width={24}
                height={24}
                alt="profile-img"
                className="size-5 md:size-6"
              />
              <span>ورود</span>
              <span>|</span>
              <span>ثبت نام</span>
            </button>
          )}
        </div>
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
