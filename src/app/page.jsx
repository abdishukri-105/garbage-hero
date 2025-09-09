export const metadata = {
  title: "Garbage Hero Limited | Cleaning & Waste Management Kenya",
  description: "Professional cleaning and waste management services in Kenya. Eco-friendly, reliable, and affordable.",
};

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutUsTeaser from "@/components/AboutUsTeaser";
import ServicesPreview from "@/components/ServicesPreview";
import CTABanner from "@/components/CTABanner";
import RecentWorkTeaser from "@/components/RecentWorkTeaser";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import ContactForm from "@/components/MiniContactForm";
import Footer from "@/components/Footer";
import WhyUs from "@/components/WhyUs";
import ClientLogosMarquee from '@/components/ClientLogosMarquee';
import { fetchTestimonials, fetchPortfolioTeasers, fetchClientLogos, fetchTeam } from '@/lib/sanity';
import FAQAccordion from "@/components/FAQAccordion"
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const results = await Promise.allSettled([
    fetchTestimonials(),
    fetchPortfolioTeasers(),
    fetchClientLogos(),
  ]);
  const [testimonialsRes, teasersRes, clientLogosRes] = results;
  const testimonials = testimonialsRes.status === 'fulfilled' ? testimonialsRes.value : [];
  const teasers = teasersRes.status === 'fulfilled' ? teasersRes.value : [];
  const clientLogos = clientLogosRes.status === 'fulfilled' ? clientLogosRes.value : [];
  // Optionally log server side only
  if (results.some(r => r.status === 'rejected')) {
    console.warn('[home] Some data fetches failed:', results.filter(r => r.status === 'rejected').map(r => r.reason));
  }
  return (
    <main className="bg-white text-black font-lato">
      <Navbar />
      <HeroSection />
      <AboutUsTeaser />
      <ClientLogosMarquee logos={clientLogos} />
      <ServicesPreview />
      <WhyUs />
      <CTABanner />
      <RecentWorkTeaser teasers={teasers} />
      <TestimonialsCarousel testimonials={testimonials} />
      <FAQAccordion />
      <ContactForm />
      <Footer />
    </main>
  );
}