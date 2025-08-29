
import { Roboto, Open_Sans } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"], // Covers light, medium, bold, black for headings, nav, buttons
  variable: "--font-roboto",
  display: "swap", // Ensures fonts load without FOUT (flash of unstyled text)
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600"], // Light, regular, semibold for body, mobile, captions
  variable: "--font-open-sans",
  display: "swap",
});

export const metadata = {
  title: "Garbage Hero Limited - Eco-Friendly Cleaning and Waste Management in Kenya",
  description: "Garbage Hero Limited is a leading provider of eco-friendly cleaning and waste management services in Kenya. We offer a wide range of services to residential, commercial, and industrial clients, including garbage collection, recycling, deep cleaning, landscaping, and pest control.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${openSans.variable} antialiased font-open-sans`}> {/* Default to Open Sans for body text, Roboto for headings */}
        {children}
      </body>
    </html>
  );
}
