"use client";

import AuthProvider from "@/Providers/AuthProvider";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    href: "/profile",
    label: "پروفایل",
    icon: "/images/pblackfull.png",
    alt: "profile",
    boxClass: "pb-[15px] border-b border-line",
  },
  {
    href: "/profile/tours",
    label: "تور های من",
    icon: "/images/sun.png",
    alt: "sun",
    boxClass: "py-[15px] border-b border-line",
  },
  {
    href: "/profile/transactions",
    label: "تراکنش ها",
    icon: "/images/convert.png",
    alt: "convert",
    boxClass: "pt-[15px]",
  },
];

const activeIcon =
  "invert-[44%] sepia-[94%] saturate-[10000%] hue-rotate-135 brightness-90 contrast-90";

export default function ProfileLayout({ children }) {
  const pathname = usePathname();

  return (
    <AuthProvider>
      <div className="md:mx-auto md:mt-20 md:mb-[100px] md:flex md:w-full md:max-w-[1200px] md:items-start md:gap-[30px] md:px-8 lg:px-16">
        <aside className="hidden rounded-[10px] border border-line bg-surface px-2.5 py-[15px] md:flex md:flex-[0_0_240px] md:flex-col lg:flex-[0_0_220px]">
          {links.map((link, i) => {
            const active = pathname === link.href;
            return (
              <div
                key={link.href}
                className={`flex items-center gap-1.5 ${link.boxClass}`}
              >
                <Image
                  src={link.icon}
                  width={16}
                  height={16}
                  alt={link.alt}
                  priority={i === 0}
                  className={active ? activeIcon : "dark:invert"}
                />
                <Link
                  href={link.href}
                  className={`flex items-center gap-[7px] text-sm no-underline transition-colors duration-300 ${
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
        </aside>
        <header className="mx-auto my-10 w-full max-w-[330px] xs:max-w-[600px] md:hidden">
          <ul className="m-0 flex list-none justify-between px-2">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <li
                  key={link.href}
                  className={`relative flex flex-1 cursor-pointer items-center justify-center gap-[7px] py-2.5 text-center transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:transition-colors after:duration-300 after:content-[''] ${
                    active ? "after:bg-[#009e60]" : "after:bg-line"
                  }`}
                >
                  <Image
                    src={link.icon}
                    width={16}
                    height={16}
                    alt={link.alt}
                    className={active ? activeIcon : "dark:invert"}
                  />
                  <Link
                    href={link.href}
                    className={`flex items-center gap-[7px] text-xs no-underline transition-colors duration-300 ${
                      active
                        ? "font-medium text-[#009e60]"
                        : "font-normal text-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </header>
        <main className="md:block md:w-full md:max-w-[calc(100%-240px)] md:flex-1 md:bg-transparent">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}
