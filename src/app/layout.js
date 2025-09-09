import "./globals.css";

export const metadata = {
  title: "Garbage Hero Limited - Eco-Friendly Cleaning and Waste Management in Kenya",
  description: "Garbage Hero Limited is a leading provider of eco-friendly cleaning and waste management services in Kenya. We offer a wide range of services to residential, commercial, and industrial clients, including garbage collection, recycling, deep cleaning, landscaping, and pest control.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
