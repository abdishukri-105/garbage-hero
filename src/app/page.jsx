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
import { client, TESTIMONIALS_QUERY, CLIENT_LOGOS_QUERY, PORTFOLIO_TEASERS_QUERY } from '@/lib/sanity';
export const dynamic = 'force-dynamic';
import TabsFaq from "@/components/TabsFaq"
import Clients from "@/components/Clients"
import { FALLBACK_TESTIMONIALS } from "@/data/fallback/testimonials";
import { FALLBACK_CLIENT_LOGOS } from "@/data/fallback/clients";
import { FALLBACK_TEASERS } from "@/data/fallback/teasers";

export default async function HomePage() {
  let testimonialsData = [];
  let teasersData = [];
  let clientLogosData = [];

  try { testimonialsData = await client.fetch(TESTIMONIALS_QUERY); } catch { testimonialsData = []; }
  try { teasersData = await client.fetch(PORTFOLIO_TEASERS_QUERY); } catch { teasersData = []; }
  try { clientLogosData = await client.fetch(CLIENT_LOGOS_QUERY); } catch { clientLogosData = []; }

  if (!Array.isArray(testimonialsData) || testimonialsData.length === 0) testimonialsData = FALLBACK_TESTIMONIALS;
  if (!Array.isArray(teasersData) || teasersData.length === 0) teasersData = FALLBACK_TEASERS;
  if (!Array.isArray(clientLogosData) || clientLogosData.length === 0) clientLogosData = FALLBACK_CLIENT_LOGOS;

  return (
    <main className="bg-white text-black font-lato">
      <Navbar />
      <HeroSection />
      <AboutUsTeaser />
      <ClientLogosMarquee logos={clientLogosData} />
      {/* <Clients logos={clientLogosData} /> */}
      <ServicesPreview />
      <WhyUs />
      <CTABanner />
      <RecentWorkTeaser teasers={teasersData} />
      <TestimonialsCarousel testimonials={testimonialsData} />
      {/* <FAQAccordion /> */}
      <TabsFaq />
      <ContactForm />
      <Footer />
    </main>
  );
}