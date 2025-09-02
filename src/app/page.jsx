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
import ClientLogosMarquee from '@/components/ClientLogosMarquee';
import TeamProfiles from '@/components/TeamProfiles';
import { fetchTestimonials, fetchPortfolioTeasers, fetchClientLogos, fetchTeam } from '@/lib/sanity';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [testimonials, teasers, clientLogos, team] = await Promise.all([
    fetchTestimonials(),
    fetchPortfolioTeasers(),
    fetchClientLogos(),
    fetchTeam(),
  ]);
  return (
    <main className="bg-white text-black font-roboto">
      <Navbar />
      <HeroSection />
     
      <AboutUsTeaser />
       <ClientLogosMarquee logos={clientLogos} />
      <ServicesPreview />
      <WhyUs />
      {/* <TeamProfiles team={team} /> */}
      <CTABanner />
      <RecentWorkTeaser teasers={teasers} />
      <TestimonialsCarousel testimonials={testimonials} />
      {/* <TabsFaq /> */}
      <ContactForm />
      <Footer />
    </main>
  );
}