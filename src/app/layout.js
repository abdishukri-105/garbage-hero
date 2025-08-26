import { Roboto, Open_Sans } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

export const metadata = {
  title: "Garbage Hero Limited - eco-friendly cleaning and waste management in kenya",
  description: "garbage hero limited is a leading provider of eco-friendly cleaning and waste management services in kenya. we offer a wide range of services to residential, commercial, and industrial clients, including garbage collection, recycling, deep cleaning, landscaping, and pest control.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${openSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
