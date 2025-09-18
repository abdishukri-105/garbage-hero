import Navbar from "../../components/Navbar";
import FullStory from "../../components/FullStory";
import MissionVisionValues from "../../components/MissionVisionValues";
import CompanyVideo from "../../components/CompanyVideo";
import TeamProfiles from "../../components/TeamProfiles";
import CTABanner from "../../components/CTABanner";
import Footer from "../../components/Footer";
import PageBanner from "@/components/PageBanner";
import { client, TEAM_QUERY } from '@/lib/sanity';
import { fetchWithFallback } from '@/lib/fetchWithFallback';
import { TeamSchema } from '@/lib/schemas';
import MinicontactForm from "@/components/MiniContactForm"
import FAQAccordion from "@/components/FAQAccordion"
import TabsFaq from "@/components/TabsFaq"


export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'About Us | Garbage Hero Limited',
  description: "Learn about Garbage Hero Limited's mission, vision, values, and our journey as Kenya's leading cleaning and waste management company.",
};

// About Us Page for Garbage Hero Limited
export default async function AboutUsPage() {
  const { data: team, source } = await fetchWithFallback({
    key: 'team',
    live: () => client.fetch(TEAM_QUERY),
    schema: TeamSchema,
    snapshotFile: 'team.json',
    defaults: [],
    timeoutMs: 4000,
  });
  if (process.env.NODE_ENV !== 'production') {
    console.log('[about-us] team source:', source);
  }
  return (
    <main className="bg-white text-black font-lato">
      <Navbar />
      <PageBanner />
      <MissionVisionValues />
      <FullStory />
      
      <CompanyVideo />
      <TeamProfiles team={team} />
      <CTABanner />
     <TabsFaq />
      <MinicontactForm />
      <Footer />
    </main>
  );
}
