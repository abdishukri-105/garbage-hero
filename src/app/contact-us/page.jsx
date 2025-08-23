import Head from "next/head";
import Navbar from "../../components/Navbar";
import HeroSection from "../../components/HeroSection";
import ContactForm from "../../components/ContactForm";
import ContactDetails from "../../components/ContactDetails";
import MapEmbed from "../../components/MapEmbed";
import SocialLinks from "../../components/SocialLinks";
import Footer from "../../components/Footer";

// Contact Us Page for Garbage Hero Limited
export default function ContactUsPage() {
  return (
    <>
      <Head>
        <title>Contact Us | Garbage Hero Limited</title>
        <meta name="description" content="Contact Garbage Hero Limited for cleaning and waste management services in Kenya. Get in touch today!" />
      </Head>
      <main className="bg-white text-black font-roboto">
        <Navbar />
        <HeroSection variant="contact" />
        <ContactForm />
        <ContactDetails />
        <MapEmbed />
        <SocialLinks />
        <Footer />
      </main>
    </>
  );
}
