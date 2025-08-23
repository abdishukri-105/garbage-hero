import Head from "next/head";
import Navbar from "../../components/Navbar";
import HeroSection from "../../components/HeroSection";
import FullStory from "../../components/FullStory";
import MissionVisionValues from "../../components/MissionVisionValues";
import CompanyVideo from "../../components/CompanyVideo";
import TeamProfiles from "../../components/TeamProfiles";
import CTABanner from "../../components/CTABanner";
import Footer from "../../components/Footer";

// About Us Page for Garbage Hero Limited
export default function AboutUsPage() {
  return (
    <>
      <Head>
        <title>About Us | Garbage Hero Limited</title>
        <meta name="description" content="Learn about Garbage Hero Limited's mission, vision, values, and our journey as Kenya's leading cleaning and waste management company." />
      </Head>
      <main className="bg-white text-black font-roboto">
        <Navbar />
        <HeroSection variant="about" />
        <FullStory />
        <MissionVisionValues />
        <CompanyVideo />
        <TeamProfiles />
        <CTABanner />
        <Footer />
      </main>
    </>
  );
}
