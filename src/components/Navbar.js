"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiMenu } from "react-icons/fi";
import { Download } from "lucide-react";
import useMeasure from "react-use-measure";
import Link from "next/link";
import Image from "next/image";
import WetPaintButton from "./ui/WetPaintButton";
import { usePathname } from 'next/navigation';

// Palette reference: #3AA335 (brand), #1E611B (brand-dark), #E8F6E9 (brand-light), #333333 (body)

const LINKS = [
	{ title: "Home", href: "/" },
	{ title: "About Us", href: "/about-us" },
	{ title: "Services", href: "/services" },
	{ title: "Projects", href: "/portfolio" },
	{ title: "Contact Us", href: "/contact-us" },
];

const Navbar = () => {
	return (
		<section className="relative w-full bg-transparent">{/* background handled in nav glass */}
			<GlassNavigation />
		</section>
	);
};

const GlassNavigation = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const pathname = usePathname();
	const [atTop, setAtTop] = useState(true);

	// Determine if we are over the hero region on home page for inverted (white) links
	useEffect(() => {
		if (pathname !== '/') { setAtTop(false); return; }
		const heroThreshold = () => window.innerHeight * 0.55; // 55% viewport height
		const onScroll = () => {
			setAtTop(window.scrollY < heroThreshold());
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, [pathname]);

	const invert = pathname === '/' && atTop;

	return (
		<nav
			className={`fixed left-0 right-0 top-0 z-50 mx-auto max-w-7xl overflow-hidden border backdrop-blur-lg md:left-6 md:right-6 md:top-6 md:rounded-2xl transition-colors duration-300 ${invert ? 'bg-gradient-to-br from-black/40 to-black/10 border-white/20' : 'bg-white/90 border-[#3aa335]'}`}
			aria-label="Primary"
		>
			<div className="flex items-center justify-between px-4 sm:px-5 py-4 sm:py-3">
				<Logo invert={invert} />
				<Links invert={invert} />
				<Buttons setMenuOpen={setMenuOpen} invert={invert} />
			</div>
			<MobileMenu menuOpen={menuOpen} invert={invert} />
		</nav>
	);
};

const Logo = ({ invert }) => (
	<Image
		src="/images/logo1.png"
		alt="Garbage Hero Ltd Logo"
		width={80}
		height={80}
		className={`relative w-12 sm:w-16 mr-4 transition-opacity ${invert ? 'opacity-95' : 'opacity-100'}`}
	/>
);

const Links = ({ invert }) => (
	<div className="hidden md:flex items-center gap-2">
		{LINKS.map((link) => (
			<Link
				key={link.href}
				href={link.href}
				className={`px-3 sm:px-4 py-2 font-bold text-base sm:text-xl transition-colors duration-200 font-montserrat focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-md ${invert ? 'text-white hover:text-white/80 focus-visible:ring-white/60' : 'text-[#000000] hover:text-[#1E611B] focus-visible:ring-[#3AA335]/60'}`}
			>
				{link.title}
			</Link>
		))}
	</div>
);

const TextLink = ({ text, href, invert }) => {
	return (
		<Link
			href={href}
			className={`px-3 py-2 font-lato font-medium text-base transition-colors duration-200 ${invert ? 'text-white hover:text-white/80' : 'text-[#000000] hover:text-[#333333]'}`}
		>
			{text}
		</Link>
	);
};

const Buttons = ({ setMenuOpen, invert }) => (
	<div className="flex items-center gap-2 sm:gap-4">
		<motion.a
			href="/images/companyprofile.pdf"
			download="Garbage-Hero-Ltd-Company-Profile.pdf"
			whileHover={{ scale: 1.05, backgroundColor: '#1E611B' }}
			whileTap={{ scale: 0.95 }}
			className={`hidden md:inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 font-montserrat font-medium text-sm sm:text-base rounded-md whitespace-nowrap transition-colors ${invert ? 'bg-white/15 text-white hover:bg-white/25' : 'bg-[#3AA335] text-white hover:bg-[#1E611B]'}`}
		>
			<Download size={16} className="sm:w-5 sm:h-5" />
			<span className="hidden sm:inline">Company Profile</span>
			<span className="sm:hidden">Profile</span>
		</motion.a>
		<WetPaintButton text="Request Quote" href="/contact-us" className="hidden md:inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 font-montserrat font-medium text-sm sm:text-base rounded-md whitespace-nowrap" size="sm" />
		<button
			onClick={() => setMenuOpen((pv) => !pv)}
			className={`ml-2 block md:hidden text-2xl sm:text-3xl transition-transform hover:scale-105 active:scale-95 font-montserrat ${invert ? 'text-white' : 'text-black'}`}
			aria-label="Toggle menu"
		>
			<FiMenu />
		</button>
	</div>
);

const MobileMenu = ({ menuOpen, invert }) => {
	const [ref, { height }] = useMeasure();
	return (
		<motion.div
			initial={false}
			animate={{
				height: menuOpen ? height : "0px",
				opacity: menuOpen ? 1 : 0,
			}}
			transition={{ duration: 0.3, ease: "easeOut" }}
			className={`block md:hidden overflow-hidden ${invert ? 'bg-black/70 backdrop-blur' : 'bg-white/95'} border-t border-white/10`}
		>
			<div ref={ref} className="flex flex-col gap-4 px-4 pb-4 pt-2">
				{LINKS.map((link) => (
					<TextLink key={link.href} text={link.title} href={link.href} invert={invert} />
				))}
				<motion.a
					href="/images/companyprofile.pdf"
					download="Garbage-Hero-Ltd-Company-Profile.pdf"
					className={`inline-flex items-center gap-2 px-2 py-1.5 font-montserrat font-medium text-sm rounded-md transition-colors ${invert ? 'bg-white/15 text-white hover:bg-white/25' : 'bg-[#3AA335] text-white hover:bg-[#1E611B]'}`}
				>
					<Download size={16} />
					Profile
				</motion.a>
			</div>
		</motion.div>
	);
};

export default Navbar;