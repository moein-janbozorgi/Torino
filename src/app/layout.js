import Header from "@/layout/Header";
import Footer from "@/layout/footer";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import Providers from "@/Providers/ReactQueryProvider";

export const metadata = {
  title: "Torino",
  description: "تورینو وب‌سایت گردشگری",
};

// Runs before first paint so a dark-mode user never sees a white flash.
// A saved choice (ThemeToggle) wins; otherwise follow the OS setting, live.
const themeScript = `try{var m=matchMedia("(prefers-color-scheme: dark)"),t=localStorage.getItem("theme");if(t==="dark"||(!t&&m.matches))document.documentElement.classList.add("dark");m.addEventListener("change",function(e){localStorage.getItem("theme")||document.documentElement.classList.toggle("dark",e.matches)})}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="fa"
      dir="rtl"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <link rel="shortcut icon" href="/images/Torino.png" />
      {/* One variable font covers every weight, instead of a file per weight. */}
      <link
        rel="preload"
        href="/fonts/Vazirmatn[wght].woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <body className="flex min-h-screen flex-col">
        <Providers>
          <Suspense fallback={null}>
            <Header />
          </Suspense>

          <main className="mx-auto w-full max-w-[1440px] flex-1 p-4 pt-[60px]">{children}</main>

          <Footer />

          <ToastContainer
            position="top-center"
            autoClose={3000}
            rtl={true}
            theme="dark"
            toastClassName="rounded-xl bg-[rgba(25,25,25,0.8)] font-[Vazirmatn] text-white backdrop-blur-[8px] [direction:rtl]"
            progressClassName="bg-linear-to-r from-[#00c6ff] to-[#0072ff]"
          />
        </Providers>
      </body>
    </html>
  );
}
