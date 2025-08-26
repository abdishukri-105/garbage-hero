import Head from "next/head";
import Navbar from "../../components/Navbar";
import PageBanner from "../../components/PageBanner";
import ProjectGrid from "../../components/ProjectGrid";
import CTABanner from "../../components/CTABanner";
import Footer from "../../components/Footer";
import MiniContactForm from "../../components/MiniContactForm";
import Process from "@/components/Process";


// Portfolio (Case Studies) Page for Garbage Hero Limited
export default function PortfolioPage() {
  return (
    <>
      <Head>
        <title>Portfolio | Garbage Hero Limited</title>
        <meta name="description" content="See our portfolio of cleaning and waste management projects across Kenya." />
      </Head>
      <main className="bg-white text-black font-roboto">
        <Navbar />
         <PageBanner
        title="Our Green Projects"
        subtitle="See our work in sustainable cleaning and landscaping"
      />
        <ProjectGrid />
        <Process />
        <CTABanner />
        <MiniContactForm />
        <Footer />
      </main>
    </>
  );
}
