import Navbar from "../../components/Navbar";
import HeroSection from "../../components/HeroSection";
import { ServicesList } from "../../components/ServicesList";
import RecentWorkTeaser from "../../components/RecentWorkTeaser";
import CTABanner from "../../components/CTABanner";
import MiniContactForm from "../../components/MiniContactForm";
import Footer from "../../components/Footer";
import PageBanner from "../../components/PageBanner";

import TabsFaq from "../../components/TabsFaq"

// Services Page for Garbage Hero Limited
export const metadata = {
  title: 'Services | Corporate Cleaning, Sanitary, Pest Control & Landscaping Kenya',
  description: 'Sustainable corporate cleaning, sanitary and washroom hygiene, integrated pest management, fumigation, landscaping and waste management support across Kenya. Request a proposal.',
};

export default function ServicesPage() {
  return (
    <main id="main" className="bg-white text-black font-lato">
      <Navbar />
      <PageBanner
        title="What We Do"
        subtitle="Discover sustainable cleaning, hygiene, pest control, and landscaping solutions designed to elevate your facility"
      />
      <ServicesList />
      <CTABanner />
      <TabsFaq />
      <MiniContactForm />
      <Footer />
    </main>
  );
}
