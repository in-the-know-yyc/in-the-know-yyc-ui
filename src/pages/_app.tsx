import type { AppProps } from 'next/app';
import localFont from "next/font/local";
import "../app/styles/globals.css";
import Header from '../components/Header';
import Footer from '../components/Footer';

const montserrat = localFont({
  src: "../app/fonts/montserrat/Montserrat-VariableFont_wght.ttf",
  variable: "--font-montserrat",
  weight: "100 900",
});
const sarabun = localFont({
  src: "../app/fonts/sarabun/Sarabun-Regular.ttf",
  variable: "--font-sarabun",
  weight: "100 900",
});
 
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${montserrat.variable} ${sarabun.variable} antialiased`}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}