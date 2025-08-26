import Head from "next/head";
import Navbar from "../../components/Navbar";
import HeroSection from "../../components/HeroSection";
import { ServicesList } from "../../components/ServicesList";
import RecentWorkTeaser from "../../components/RecentWorkTeaser";
import CTABanner from "../../components/CTABanner";
import MiniContactForm from "../../components/MiniContactForm";
import Footer from "../../components/Footer";
import PageBanner from "@/components/PageBanner";

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
       <PageBanner
        title="Our Eco-Friendly Services"
        subtitle="Cleaning and landscaping for universities and governments"
      />
     <ServicesList />
        {/* <RecentWorkTeaser /> */}
        <CTABanner />
        <MiniContactForm />
        <Footer />
      </main>
    </>
  );
}
