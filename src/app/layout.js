import Header from "@/layout/Header";
import Footer from "@/layout/footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "@/styles/toastStyle.module.css";
import "./globals.css";
import Providers from "@/Providers/ReactQueryProvider";


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
      <body className="layout-body">
        <Providers>
          <Header />
          <main className="main-content">{children}</main>
          <Footer />
          <ToastContainer
            position="top-center"
            autoClose={3000}
            rtl={true}
            theme="dark"
            toastClassName={styles.customToast}
            progressClassName={styles.customProgress}
          />
        </Providers>
      </body>
    </html>
  );
}
