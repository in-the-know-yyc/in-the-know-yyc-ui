import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const montserrat = localFont({
  src: "./fonts/montserrat/Montserrat-VariableFont_wght.ttf",
  variable: "--font-montserrat",
  weight: "100 900",
});
const sarabun = localFont({
  src: "./fonts/sarabun/Sarabun-Regular.ttf",
  variable: "--font-sarabun",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "HOME | In The Know YYC",
  description: "In The Know YYC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${sarabun.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
