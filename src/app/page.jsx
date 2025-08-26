export const metadata = {
  title: "Garbage Hero Limited | Cleaning & Waste Management Kenya",
  description: "Professional cleaning and waste management services in Kenya. Eco-friendly, reliable, and affordable.",
};

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import AboutUsTeaser from "@/components/AboutUsTeaser";
import ServicesPreview from "@/components/ServicesPreview";
import CTABanner from "@/components/CTABanner";
import RecentWorkTeaser from "@/components/RecentWorkTeaser";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import ContactForm from "@/components/MiniContactForm";
import Footer from "@/components/Footer";
import WhyUs from "@/components/WhyUs";
import TabsFaq from "@/components/TabsFaq";

export default function HomePage() {
  return (
    <main className="bg-white text-black font-roboto">
      <Navbar />
      <div className="relative">
        <HeroSection />
        {/* <StatsSection /> */}
      </div>
      <div className="-mt-2 sm:-mt-4">
        <AboutUsTeaser />
      </div>
      <ServicesPreview />
      <WhyUs />
      <CTABanner />
      <RecentWorkTeaser />
      <TestimonialsCarousel />
      <TabsFaq />
      <ContactForm />
      <Footer />
    </main>
  );
}