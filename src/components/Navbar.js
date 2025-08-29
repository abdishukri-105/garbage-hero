"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FiMenu } from "react-icons/fi";
import { Download } from "lucide-react";
import useMeasure from "react-use-measure";
import Link from "next/link";
import Image from "next/image";

const LINKS = [
  { title: "Home", href: "/" },
  { title: "About Us", href: "/about-us" },
  { title: "Services", href: "/services" },
  { title: "Portfolio", href: "/portfolio" },
  { title: "Contact Us", href: "/contact-us" },
];

const Navbar = () => {
  return (
    <section className="relative w-full bg-[#FFFFFF]">
      <GlassNavigation />
    </section>
  );
};

const GlassNavigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 mx-auto max-w-6xl overflow-hidden border-[1px] border-[#E5F3E8] bg-gradient-to-br from-[#3aa335]/20 to-[#3aa335]/5 backdrop-blur-md md:left-6 md:right-6 md:top-6 md:rounded-2xl">
      <div className="flex items-center justify-between px-4 sm:px-5 py-4 sm:py-3">
        <Logo />
        <Links />
        <Buttons setMenuOpen={setMenuOpen} />
      </div>
      <MobileMenu menuOpen={menuOpen} />
    </nav>
  );
};

const Logo = () => (
  <Image
    src="/images/logo1.png"
    alt="Garbage Hero Ltd Logo"
    width={80}
    height={80}
    className="relative w-12 sm:w-16 mr-4"
  />
);

const Links = () => (
  <div className="hidden md:flex items-center gap-2">
    {LINKS.map((link) => (
      <Link
        key={link.href}
        href={link.href}
        className="px-3 sm:px-4 py-2 font-roboto font-medium text-base sm:text-xl text-[#000000] hover:text-[#3aa335] transition-colors duration-200"
      >
        {link.title}
      </Link>
    ))}
  </div>
);

const TextLink = ({ text, href }) => {
  return (
    <Link
      href={href}
      className="px-3 py-2 font-open-sans font-medium text-base text-[#333333] hover:text-[#3aa335] transition-colors duration-200"
    >
      {text}
    </Link>
  );
};

const Buttons = ({ setMenuOpen }) => (
  <div className="flex items-center gap-2 sm:gap-4">
    <motion.a
      href="/images/companyprofile.pdf"
      download="Garbage-Hero-Ltd-Company-Profile.pdf"
      whileHover={{ scale: 1.05, backgroundColor: '#228B22' }}
      whileTap={{ scale: 0.95 }}
      className="hidden md:inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-[#3aa335] text-[#FFFFFF] font-roboto font-medium text-sm sm:text-base rounded-md whitespace-nowrap"
    >
      <Download size={16} className="sm:w-5 sm:h-5" />
      <span className="hidden sm:inline">Company Profile</span>
      <span className="sm:hidden">Profile</span>
    </motion.a>
    <motion.button
      whileHover={{ scale: 1.05, backgroundColor: '#228B22' }}
      whileTap={{ scale: 0.95 }}
      className="px-2 sm:px-4 py-1.5 sm:py-2 bg-[#3aa335] text-[#FFFFFF] font-roboto font-medium text-sm sm:text-base rounded-md whitespace-nowrap"
    >
      Get a Quote
    </motion.button>
    <button
      onClick={() => setMenuOpen((pv) => !pv)}
      className="ml-2 block md:hidden text-2xl sm:text-3xl text-[#000000] transition-transform hover:scale-105 active:scale-95 font-roboto"
    >
      <FiMenu />
    </button>
  </div>
);

const MobileMenu = ({ menuOpen }) => {
  const [ref, { height }] = useMeasure();
  return (
    <motion.div
      initial={false}
      animate={{
        height: menuOpen ? height : "0px",
        opacity: menuOpen ? 1 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="block md:hidden overflow-hidden"
    >
      <div ref={ref} className="flex flex-col gap-4 px-4 pb-4">
        {LINKS.map((link) => (
          <TextLink key={link.href} text={link.title} href={link.href} />
        ))}
        <motion.a
          href="/images/companyprofile.pdf"
          download="Garbage-Hero-Ltd-Company-Profile.pdf"
          className="inline-flex items-center gap-2 px-2 py-1.5 bg-[#3aa335] text-[#FFFFFF] font-roboto font-medium text-sm rounded-md"
        >
          <Download size={16} />
          Profile
        </motion.a>
      </div>
    </motion.div>
  );
};

export default Navbar;