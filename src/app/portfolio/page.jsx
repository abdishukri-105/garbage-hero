import Navbar from "../../components/Navbar";
import PageBanner from "../../components/PageBanner";
import ProjectGrid from "../../components/ProjectGrid";
import CTABanner from "../../components/CTABanner";
import Footer from "../../components/Footer";
import MiniContactForm from "../../components/MiniContactForm";
import Process from "@/components/Process";
import { client, PORTFOLIO_QUERY } from '@/lib/sanity';
import { fetchWithFallback } from '@/lib/fetchWithFallback';
import { ProjectsSchema } from '@/lib/schemas';
import FAQAccordion from "@/components/FAQAccordion"
import TabsFaq from "@/components/TabsFaq"

// Remove legacy Head usage; use metadata export instead in App Router
export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Portfolio | Garbage Hero Limited',
  description: 'See our portfolio of cleaning and waste management projects across Kenya.'
};

// Portfolio (Case Studies) Page for Garbage Hero Limited
export default async function PortfolioPage() {
  const { data: projects, source } = await fetchWithFallback({
    key: 'portfolio',
    live: () => client.fetch(PORTFOLIO_QUERY),
    schema: ProjectsSchema,
    snapshotFile: 'projects.json',
    defaults: [],
    timeoutMs: 4000,
  });
  if (process.env.NODE_ENV !== 'production') {
    console.log('[portfolio] source:', source);
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
