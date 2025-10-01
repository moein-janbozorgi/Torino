import Header from "@/components/modules/Header";
import Footer from "@/components/modules/footer"



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
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
