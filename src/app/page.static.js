// src/app/page.static.js
// Production static variant: build-time generation ONLY (no revalidation). Duplicate logic from page.js without dynamic flag.
// To use this in production, you can rename to page.js before build or maintain a branch variant.

import { urlFor } from '@/lib/sanity';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { client, TESTIMONIALS_QUERY, PORTFOLIO_TEASERS_QUERY } from '@/lib/sanity';
import { FALLBACK_TESTIMONIALS } from '@/data/fallback/testimonials';
import { FALLBACK_TEASERS } from '@/data/fallback/teasers';

export const dynamic = 'error'; // ensure static
export const revalidate = false; // ensure no ISR

export default async function HomePageStatic() {
  let testimonials = [];
  let teasers = [];
  try { testimonials = await client.fetch(TESTIMONIALS_QUERY); } catch { testimonials = []; }
  try { teasers = await client.fetch(PORTFOLIO_TEASERS_QUERY); } catch { teasers = []; }

  if (!Array.isArray(testimonials) || testimonials.length === 0) testimonials = FALLBACK_TESTIMONIALS;
  if (!Array.isArray(teasers) || teasers.length === 0) teasers = FALLBACK_TEASERS;

  return (
    <main className="bg-white text-[#333333] font-lato min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <TestimonialsSection testimonials={testimonials} />
      <TeasersSection teasers={teasers} />
      <Footer />
    </main>
  );
}

function Hero() {
  return (
    <section className="px-4 sm:px-6 md:px-8 lg:px-10 py-10 sm:py-14 md:py-16 bg-[#E8F6E9]">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-bold text-black mb-6">Cleaner. Greener. Smarter.</h1>
      <p className="max-w-2xl text-sm sm:text-base md:text-lg text-[#333333]">Garbage Hero Limited delivers eco-friendly cleaning, waste management, landscaping, and sanitation services across Kenya—powering a healthier future.</p>
    </section>
  );
}

function TestimonialsSection({ testimonials }) {
  if (!testimonials?.length) return null;
  return (
    <section className="px-4 sm:px-6 md:px-8 lg:px-10 py-12 sm:py-16 bg-white">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-montserrat font-bold text-black mb-8">What Clients Say</h2>
      <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => {
          const hasSanityLogo = !!t.companyLogo;
          const localLogo = t.companyLogoUrl;
          const logoAlt = (t.company || 'Client') + ' logo';
          return (
            <motion.figure
              key={t._id || i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative rounded-xl border border-[#E8F6E9] bg-[#E8F6E9]/40 p-5 sm:p-6 backdrop-blur shadow-sm hover:shadow-md transition-shadow"
            >
              {(hasSanityLogo || localLogo) && (
                <div className="mb-4 flex items-center gap-3">
                  {hasSanityLogo ? (
                    <Image
                      loader={({ width, quality }) => urlFor(t.companyLogo).width(Math.min(width, 140)).height(Math.min(width, 140)).quality(quality ?? 70).auto('format').url()}
                      src={urlFor(t.companyLogo).width(120).height(120).quality(75).auto('format').url()}
                      alt={logoAlt}
                      width={48}
                      height={48}
                      sizes="48px"
                      quality={70}
                      className="h-12 w-12 object-contain"
                    />
                  ) : (
                    <Image
                      src={localLogo}
                      alt={logoAlt}
                      width={48}
                      height={48}
                      sizes="48px"
                      quality={70}
                      className="h-12 w-12 object-contain"
                    />
                  )}
                  <div>
                    <figcaption className="font-montserrat font-semibold text-black text-sm sm:text-base">{t.clientName}</figcaption>
                    <p className="text-xs sm:text-sm text-[#333333]">{t.clientTitle}{t.company ? ' • ' + t.company : ''}</p>
                  </div>
                </div>
              )}
              <blockquote className="text-sm sm:text-base italic leading-relaxed">“{t.statement}”</blockquote>
            </motion.figure>
          );
        })}
      </div>
    </section>
  );
}

function TeasersSection({ teasers }) {
  if (!teasers?.length) return null;
  return (
    <section className="px-4 sm:px-6 md:px-8 lg:px-10 py-12 sm:py-16 bg-[#E8F6E9]">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-montserrat font-bold text-black mb-8">Recent Work</h2>
      <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {teasers.map((p, i) => {
          const hasSanityImage = !!p.image;
          const localImage = p.imageUrl;
          const alt = p.companyName || p.title || 'Project';
          return (
            <motion.article
              key={p._id || i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="rounded-xl overflow-hidden border border-[#3AA335]/20 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              {(hasSanityImage || localImage) && (
                <div className="relative h-40 sm:h-48 md:h-52 w-full">
                  {hasSanityImage ? (
                    <Image
                      loader={({ width, quality }) => urlFor(p.image).width(Math.min(width, 800)).height(Math.min(Math.round(width*0.67), 600)).quality(quality ?? 65).auto('format').url()}
                      src={urlFor(p.image).width(800).height(534).quality(70).auto('format').url()}
                      alt={alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    <Image
                      src={localImage}
                      alt={alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                      className="object-cover"
                    />
                  )}
                </div>
              )}
              <div className="p-5 sm:p-6">
                <p className="text-xs uppercase tracking-wide text-[#3AA335] font-semibold mb-2">{p.category || 'Project'}</p>
                <h3 className="font-montserrat font-bold text-black text-lg sm:text-xl mb-2">{p.companyName || p.title}</h3>
                <p className="text-sm sm:text-base text-[#333333] line-clamp-3">{p.shortDescription || p.description}</p>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
