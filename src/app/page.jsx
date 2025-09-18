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
import { fetchWithFallback } from '@/lib/fetchWithFallback';
import { TestimonialsSchema, ClientLogosSchema } from '@/lib/schemas';
export const dynamic = 'force-dynamic';
import TabsFaq from "@/components/TabsFaq"
import Clients from "@/components/Clients"

export default async function HomePage() {
  const [
    { data: testimonialsData, source: tSrc },
    { data: teasersData, source: pSrc },
    { data: clientLogosData, source: cSrc }
  ] = await Promise.all([
    fetchWithFallback({ key: 'testimonials', live: () => client.fetch(TESTIMONIALS_QUERY), schema: TestimonialsSchema, snapshotFile: 'testimonials.json', defaults: [], timeoutMs: 3000 }),
    fetchWithFallback({ key: 'portfolioTeasers', live: () => client.fetch(PORTFOLIO_TEASERS_QUERY), schema: undefined, snapshotFile: 'teasers.json', defaults: [], timeoutMs: 3000 }),
    fetchWithFallback({ key: 'clientLogos', live: () => client.fetch(CLIENT_LOGOS_QUERY), schema: ClientLogosSchema, snapshotFile: 'clients.json', defaults: [], timeoutMs: 3000 }),
  ]);
  // Optional server-side logging of sources
  if (process.env.NODE_ENV !== 'production') {
    console.log('[home] sources:', { testimonials: tSrc, teasers: pSrc, clientLogos: cSrc });
  }
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