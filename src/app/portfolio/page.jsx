import Navbar from "../../components/Navbar";
import PageBanner from "../../components/PageBanner";
import ProjectGrid from "../../components/ProjectGrid";
import CTABanner from "../../components/CTABanner";
import Footer from "../../components/Footer";
import MiniContactForm from "../../components/MiniContactForm";
import Process from "@/components/Process";
import { fetchPortfolio } from '@/lib/sanity';
import FAQAccordion from "@/components/FAQAccordion"

// Remove legacy Head usage; use metadata export instead in App Router
export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Portfolio | Garbage Hero Limited',
  description: 'See our portfolio of cleaning and waste management projects across Kenya.'
};

// Portfolio (Case Studies) Page for Garbage Hero Limited
export default async function PortfolioPage() {
  const projects = await fetchPortfolio();
  return (
    <main className="bg-white text-black font-roboto">
      <Navbar />
      <PageBanner
        title="Our Green Projects"
        subtitle="See our work in sustainable cleaning and landscaping"
      />
      <ProjectGrid projects={projects} />
      <Process />
      <CTABanner />
      <FAQAccordion />
      <MiniContactForm />
      <Footer />
    </main>
  );
}
