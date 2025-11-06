import Navbar from "../../components/Navbar";
import FullStory from "../../components/FullStory";
import MissionVisionValues from "../../components/MissionVisionValues";
import CompanyVideo from "../../components/CompanyVideo";
import TeamProfiles from "../../components/TeamProfiles";
import CTABanner from "../../components/CTABanner";
import Footer from "../../components/Footer";
import PageBanner from "../../components/PageBanner";
import { client, TEAM_QUERY } from '../../lib/sanity';
import MinicontactForm from "../../components/MiniContactForm"
import TabsFaq from "../../components/TabsFaq"
import { FALLBACK_TEAM } from "../../data/fallback/team";


export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'About Us | Contract Cleaning, Sanitary & Pest Control Services Kenya',
  description: 'Facility hygiene partner delivering contract cleaning, washroom hygiene, pest control, fumigation, landscaping and waste support for government, education, healthcare & corporate sites across Kenya.',
};

// About Us Page for Garbage Hero Limited
export default async function AboutUsPage() {
  let team = [];
  try {
    team = await client.fetch(TEAM_QUERY);
  } catch (_) {
    team = [];
  }
  if (!Array.isArray(team) || team.length === 0) team = FALLBACK_TEAM.map(t => ({ _id: t._id, name: t.name, title: t.title, image: t.imageUrl }));

  return (
    <main id="main" className="bg-white text-black font-lato">
      <Navbar />
      <PageBanner />
      <MissionVisionValues />
      <FullStory />
      
      <CompanyVideo />
      {/* <TeamProfiles team={team} /> */}
      <CTABanner />
     <TabsFaq />
      <MinicontactForm />
      <Footer />
    </main>
  );
}
