// src/app/page.static.js
// Production static variant: build-time generation ONLY (no revalidation). Duplicate logic from page.js without dynamic flag.
// To use this in production, you can rename to page.js before build or maintain a branch variant.

import { fetchTestimonials, fetchPortfolioTeasers, urlFor } from '@/lib/sanity';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { motion } from 'framer-motion';

export const dynamic = 'error'; // ensure static
export const revalidate = false; // ensure no ISR

export default async function HomePageStatic() {
  const [testimonials, teasers] = await Promise.all([
    fetchTestimonials(),
    fetchPortfolioTeasers(),
  ]);

  return (
    <main className="bg-white text-[#333333] font-open-sans min-h-screen flex flex-col">
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
    <section className="px-4 sm:px-6 md:px-8 lg:px-10 py-10 sm:py-14 md:py-16 bg-[#E5F3E8]">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-[#000000] mb-6">Cleaner. Greener. Smarter.</h1>
      <p className="max-w-2xl text-sm sm:text-base md:text-lg">Garbage Hero Limited delivers eco-friendly cleaning, waste management, landscaping, and sanitation services across Kenya—powering a healthier future.</p>
    </section>
  );
}

function TestimonialsSection({ testimonials }) {
  if (!testimonials?.length) return null;
  return (
    <section className="px-4 sm:px-6 md:px-8 lg:px-10 py-12 sm:py-16 bg-white">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-playfair font-bold text-[#000000] mb-8">What Clients Say</h2>
      <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <motion.figure
            key={t._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative rounded-xl border border-[#E5F3E8] bg-[#E5F3E8]/40 p-5 sm:p-6 backdrop-blur shadow-sm hover:shadow-md transition-shadow"
          >
            {t.companyLogo && (
              <div className="mb-4 flex items-center gap-3">
                <Image
                  src={urlFor(t.companyLogo).width(120).height(120).url()}
                  alt={t.company + ' logo'}
                  width={48}
                  height={48}
                  className="h-12 w-12 object-contain"
                />
                <div>
                  <figcaption className="font-playfair font-semibold text-[#000000] text-sm sm:text-base">{t.clientName}</figcaption>
                  <p className="text-xs sm:text-sm text-[#333333]">{t.clientTitle} • {t.company}</p>
                </div>
              </div>
            )}
            <blockquote className="text-sm sm:text-base italic leading-relaxed">“{t.statement}”</blockquote>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

function TeasersSection({ teasers }) {
  if (!teasers?.length) return null;
  return (
    <section className="px-4 sm:px-6 md:px-8 lg:px-10 py-12 sm:py-16 bg-[#E5F3E8]">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-playfair font-bold text-[#000000] mb-8">Recent Work</h2>
      <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {teasers.map((p) => (
          <motion.article
            key={p._id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="rounded-xl overflow-hidden border border-[#50AB62]/20 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            {p.image && (
              <div className="relative h-40 sm:h-48 md:h-52 w-full">
                <Image
                  src={urlFor(p.image).width(600).height(400).url()}
                  alt={p.companyName}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-5 sm:p-6">
              <p className="text-xs uppercase tracking-wide text-[#50AB62] font-semibold mb-2">{p.category}</p>
              <h3 className="font-playfair font-bold text-[#000000] text-lg sm:text-xl mb-2">{p.companyName}</h3>
              <p className="text-sm sm:text-base text-[#333333] line-clamp-3">{p.shortDescription}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
