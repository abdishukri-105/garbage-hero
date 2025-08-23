"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiMenu, FiArrowRight } from "react-icons/fi";
import Link from "next/link";

const LINKS = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About Us",
    href: "/about-us",
  },
  {
    title: "Services",
    href: "/services",
  },
  {
    title: "Portfolio",
    href: "/portfolio",
  },
  {
    title: "Contact Us",
    href: "/contact-us",
  },
];

const Navbar = () => {
  return (
    <div className="bg-gray-50">
      <Nav />
      {/* <div className="h-72" /> */}
    </div>
  );
};

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-green-200 p-6  flex items-center justify-between relative">
      <NavLeft setIsOpen={setIsOpen} />
      <NavRight />
      <NavMenu isOpen={isOpen} />
    </nav>
  );
};

const Logo = () => {
  return (
    <svg
      width="50"
      height="39"
      viewBox="0 0 50 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-gray-800"
    >
      <path
        d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
        fill="#000000"
      ></path>
      <path
        d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
        fill="#000000"
      ></path>
    </svg>
  );
};

const NavLeft = ({ setIsOpen }) => {
  return (
    <div className="flex items-center gap-6">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="block lg:hidden text-gray-950 text-2xl"
        onClick={() => setIsOpen((pv) => !pv)}
      >
        <FiMenu />
      </motion.button>
      <Logo />
      {LINKS.map((link) => (
        <NavLink key={link.href} text={link.title} href={link.href} />
      ))}
    </div>
  );
};

const NavLink = ({ text, href }) => {
  return (
    <Link href={href} legacyBehavior>
      <a className="hidden lg:block h-[40px] overflow-hidden font-medium">
        <motion.div whileHover={{ y: -30 }}>
          <span className="flex items-center text-xl h-[40px] text-gray-900">{text}</span>
          <span className="flex items-center text-xl h-[40px] text-green-700">
            {text}
          </span>
        </motion.div>
      </a>
    </Link>
  );
};

const NavRight = () => {
  return (
    <div className="flex items-center gap-4">
      {/* <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent font-medium rounded-md whitespace-nowrap"
      >
        Sign in
      </motion.button> */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-800 text-white font-medium rounded-md whitespace-nowrap"
      >
        get A Quote
      </motion.button>
    </div>
  );
};

const NavMenu = ({ isOpen }) => {
  return (
    <motion.div
      variants={menuVariants}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      className="absolute p-4 bg-white shadow-lg left-0 right-0 top-full origin-top flex flex-col gap-4"
    >
      {LINKS.map((link) => (
        <MenuLink key={link.href} text={link.title} href={link.href} />
      ))}
    </motion.div>
  );
};

const MenuLink = ({ text, href }) => {
  return (
    <Link href={href} legacyBehavior>
      <motion.a
        variants={menuLinkVariants}
        className="h-[40px] overflow-hidden font-medium text-lg flex items-start gap-4"
      >
        <motion.span variants={menuLinkArrowVariants}>
          <FiArrowRight className="h-[40px] text-gray-950" />
        </motion.span>
        <motion.div whileHover={{ y: -30 }}>
          <span className="flex items-center h-[40px] text-gray-500">{text}</span>
          <span className="flex items-center h-[40px] text-indigo-600">
            {text}
          </span>
        </motion.div>
      </motion.a>
    </Link>
  );
};

const menuVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const menuLinkVariants = {
  open: {
    y: 0,
    opacity: 1,
  },
  closed: {
    y: -10,
    opacity: 0,
  },
};

const menuLinkArrowVariants = {
  open: {
    x: 0,
  },
  closed: {
    x: -4,
  },
};

export default Navbar;