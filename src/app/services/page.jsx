import Head from "next/head";
import Navbar from "../../components/Navbar";
import HeroSection from "../../components/HeroSection";
import ServicesList from "../../components/ServicesList";
import RecentWorkTeaser from "../../components/RecentWorkTeaser";
import CTABanner from "../../components/CTABanner";
import Footer from "../../components/Footer";

// Services Page for Garbage Hero Limited
export default function ServicesPage() {
  return (
    <>
      <Head>
        <title>Our Services | Garbage Hero Limited</title>
        <meta name="description" content="Explore our cleaning, landscaping, pest control, garbage collection, and sanitary disposal services in Kenya." />
      </Head>
      <main className="bg-white text-black font-roboto">
        <Navbar />
        <HeroSection variant="services" />
        <ServicesList />
        <RecentWorkTeaser />
        <CTABanner />
        <Footer />
      </main>
    </>
  );
}
