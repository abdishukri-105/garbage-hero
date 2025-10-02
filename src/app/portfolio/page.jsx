import Navbar from "../../components/Navbar";
import PageBanner from "../../components/PageBanner";
import ProjectGrid from "../../components/ProjectGrid";
import CTABanner from "../../components/CTABanner";
import Footer from "../../components/Footer";
import MiniContactForm from "../../components/MiniContactForm";
import Process from "@/components/Process";
import { client, PORTFOLIO_QUERY } from '@/lib/sanity';
import FAQAccordion from "@/components/FAQAccordion"
import TabsFaq from "@/components/TabsFaq"
import { FALLBACK_PROJECTS } from "@/data/fallback/projects";

// Remove legacy Head usage; use metadata export instead in App Router
export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Our Work | Corporate Cleaning, Sanitary & Pest Control Projects',
  description: 'Multi-site cleaning, washroom hygiene, pest control and landscaping success highlights. Consistent, compliant delivery nationwide across Kenyan institutions and corporates.',
};

// Portfolio (Case Studies) Page for Garbage Hero Limited
export default async function PortfolioPage() {
  let projects = [];
  try {
    projects = await client.fetch(PORTFOLIO_QUERY);
  } catch (e) {
    projects = [];
  }
  if (!Array.isArray(projects) || projects.length === 0) {
    projects = FALLBACK_PROJECTS;
  }

  return (
    <main className="bg-white text-black font-lato">
      <Navbar />
      <PageBanner
        title="Our Green Projects"
        subtitle="See our work in sustainable cleaning and landscaping"
      />
      <ProjectGrid projects={projects} />
      <Process />
      <CTABanner />
      <TabsFaq />
      <MiniContactForm />
      <Footer />
    </main>
  );
}
