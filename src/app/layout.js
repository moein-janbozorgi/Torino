import Header from "@/layout/Header";
import Footer from "@/layout/footer";
import Providers from "./providers";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "Torino",
  description: "تورینو وب‌سایت گردشگری",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <head />
      <link rel="shortcut icon" href="/images/Torino.png" />
      <link
        href="https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@latest/dist/font-face.css"
        rel="stylesheet"
        precedence="default"
      />
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
          <ToastContainer position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
