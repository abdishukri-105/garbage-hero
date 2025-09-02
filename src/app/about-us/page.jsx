import Navbar from "../../components/Navbar";
import FullStory from "../../components/FullStory";
import MissionVisionValues from "../../components/MissionVisionValues";
import CompanyVideo from "../../components/CompanyVideo";
import TeamProfiles from "../../components/TeamProfiles";
import CTABanner from "../../components/CTABanner";
import Footer from "../../components/Footer";
import PageBanner from "@/components/PageBanner";
import { fetchTeam } from '@/lib/sanity';
import MinicontactForm from "@/components/MiniContactForm"
import FAQAccordion from "@/components/FAQAccordion"



export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'About Us | Garbage Hero Limited',
  description: "Learn about Garbage Hero Limited's mission, vision, values, and our journey as Kenya's leading cleaning and waste management company.",
};

// About Us Page for Garbage Hero Limited
export default async function AboutUsPage() {
  const team = await fetchTeam();
  return (
    <main className="bg-white text-black font-roboto">
      <Navbar />
      <PageBanner />
      <MissionVisionValues />
      <FullStory />
      
      <CompanyVideo />
      <TeamProfiles team={team} />
      <CTABanner />
      <FAQAccordion />
      <MinicontactForm />
      <Footer />
    </main>
  );
}
