export const metadata = {
  title: "Facility Hygiene & Cleaning Partner Kenya | Garbage Hero",
  description: "Integrated cleaning, sanitary bin, pest control and grounds maintenance for government, education, healthcare and corporate sites across Kenya. Reliable vetted teams. Request a proposal.",
};

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutUsTeaser from "@/components/AboutUsTeaser";
import nextDynamic from 'next/dynamic';
import { client, TESTIMONIALS_QUERY, CLIENT_LOGOS_QUERY, PORTFOLIO_TEASERS_QUERY } from '@/lib/sanity';
import { FALLBACK_TESTIMONIALS } from "@/data/fallback/testimonials";
import { FALLBACK_CLIENT_LOGOS } from "@/data/fallback/clients";
import { FALLBACK_TEASERS } from "@/data/fallback/teasers";
import WhyUs from "@/components/WhyUs";
import ContactForm from "@/components/MiniContactForm";
import Footer from "@/components/Footer";

// Below-the-fold dynamic imports (skeletons with min-heights for CLS stability)
const ServicesPreview = nextDynamic(() => import('@/components/ServicesPreview'), { loading: () => <div className="min-h-[200px]" aria-busy="true" /> });
const CTABanner = nextDynamic(() => import('@/components/CTABanner'), { loading: () => <div className="min-h-[280px]" aria-busy="true" /> });
const RecentWorkTeaser = nextDynamic(() => import('@/components/RecentWorkTeaser'), { loading: () => <div className="min-h-[240px]" aria-busy="true" /> });
const TestimonialsCarousel = nextDynamic(() => import('@/components/TestimonialsCarousel'), { loading: () => <div className="min-h-[320px]" aria-busy="true" /> });
const TabsFaq = nextDynamic(() => import('@/components/TabsFaq'), { loading: () => <div className="min-h-[260px]" aria-busy="true" /> });
const ClientLogosMarquee = nextDynamic(() => import('@/components/ClientLogosMarquee'), { loading: () => <div className="min-h-[180px]" aria-busy="true" /> });
const ProjectGrid = nextDynamic(() => import('@/components/ProjectGrid'), { loading: () => <div className="min-h-[600px]" aria-busy="true" /> });

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
    <main id="main" className="bg-white text-black font-lato">
      <Navbar />
      <HeroSection />
      <AboutUsTeaser />
      <ClientLogosMarquee logos={clientLogosData} />
      <ServicesPreview />
      <WhyUs />
      <CTABanner />
      <RecentWorkTeaser teasers={teasersData} />
      <TestimonialsCarousel testimonials={testimonialsData} />
      <TabsFaq />
      <ContactForm />
      <Footer />
    </main>
  );
}