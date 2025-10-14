import Navbar from "../../components/Navbar";
import TabsFaq from "../../components/TabsFaq";
import MiniContactForm from "../../components/MiniContactForm";
import MapEmbed from "../../components/MapEmbed";
import Footer from "../../components/Footer";
import PageBanner from "../../components/PageBanner";

// Contact Us Page for Garbage Hero Limited
export const metadata = {
  title: 'Contact Us | Corporate Cleaning & Hygiene Services Kenya',
  description: 'Request a proposal for corporate cleaning, sanitary bin, pest control, fumigation, landscaping and waste support. Fast response nationwide.',
};

export default function ContactUsPage() {
  return (
    <main id="main" className="bg-white text-black font-lato">
      <Navbar />
      <PageBanner
        title="Request A Hygiene Quote"
        subtitle="Fast tailored facility hygiene proposal – nationwide response"
      />
      <MiniContactForm />
      <MapEmbed />
      <TabsFaq />
      <Footer />
    </main>
  );
}
