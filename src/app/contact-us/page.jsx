import Head from "next/head";
import Navbar from "../../components/Navbar";
import HeroSection from "../../components/HeroSection";
import TabsFaq from "@/components/TabsFaq"
import MiniContactForm from "../../components/MiniContactForm";

import MapEmbed from "../../components/MapEmbed";
import SocialLinks from "../../components/SocialLinks";
import Footer from "../../components/Footer";
import PageBanner from "@/components/PageBanner";

// Contact Us Page for Garbage Hero Limited
export default function ContactUsPage() {
  return (
    <>
      <Head>
        <title>Contact Us | Garbage Hero Limited</title>
        <meta name="description" content="Contact Garbage Hero Limited for cleaning and waste management services in Kenya. Get in touch today!" />
      </Head>
      <main className="bg-white text-black font-lato">
        <Navbar />
        <PageBanner  
         title="Get in Touch With Us"
        subtitle="we're here to help and answer any questions you might have"
        />
        
        <MiniContactForm />
        
        <MapEmbed />
         <TabsFaq />
    
        <Footer />
      </main>
    </>
  );
}
