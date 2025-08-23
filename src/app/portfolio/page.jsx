import Head from "next/head";
import Navbar from "../../components/Navbar";
import HeroSection from "../../components/HeroSection";
import ProjectGrid from "../../components/ProjectGrid";
import CTABanner from "../../components/CTABanner";
import Footer from "../../components/Footer";

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
        <HeroSection variant="portfolio" />
        <ProjectGrid />
        <CTABanner />
        <Footer />
      </main>
    </>
  );
}
