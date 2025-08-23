export const metadata = {
  title: "Garbage Hero Limited | Cleaning & Waste Management Kenya",
  description: "Professional cleaning and waste management services in Kenya. Eco-friendly, reliable, and affordable.",
};

import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import StatsSection from "../components/StatsSection";
import AboutUsTeaser from "../components/AboutUsTeaser";
import ServicesPreview from "../components/ServicesPreview";
import CTABanner from "../components/CTABanner";
import RecentWorkTeaser from "../components/RecentWorkTeaser";
import TestimonialsCarousel from "../components/TestimonialsCarousel";
import MiniContactForm from "../components/MiniContactForm";
import Footer from "../components/Footer";

// Homepage for Garbage Hero Limited
export default function HomePage() {
  return (
    <main className="bg-white text-black font-roboto">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <AboutUsTeaser />
      <ServicesPreview />
      <CTABanner />
      <RecentWorkTeaser />
      <TestimonialsCarousel />
      <MiniContactForm />
      <Footer />
    </main>
  );
}
