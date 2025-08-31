
import { Open_Sans, Playfair } from "next/font/google";
import "./globals.css";


const Open_Sans_init = Open_Sans({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-open_sans",
});

const Playfair_init = Playfair({
  weight: ["900", "800", "700", "600", "500", "400", "300"],
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata = {
  title: "Garbage Hero Limited - Eco-Friendly Cleaning and Waste Management in Kenya",
  description: "Garbage Hero Limited is a leading provider of eco-friendly cleaning and waste management services in Kenya. We offer a wide range of services to residential, commercial, and industrial clients, including garbage collection, recycling, deep cleaning, landscaping, and pest control.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body className={`${Open_Sans_init.variable} ${Playfair_init.variable} `}>
        {children}
      </body>
    </html>
  );
}
