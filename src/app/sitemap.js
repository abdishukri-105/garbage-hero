// sitemap.js - generates /sitemap.xml via Next.js App Router
// Docs: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap

export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://garbagehero.co.ke';
  const now = new Date();
  /** @type {import('next').MetadataRoute.Sitemap} */
  const routes = [
    '',
    'about-us',
    'services',
    'portfolio',
    'contact-us'
  ].map((path) => ({
    url: `${baseUrl}/${path}`.replace(/\/$/, '/'),
    lastModified: now,
    changeFrequency: path === '' ? 'daily' : 'monthly',
    priority: path === '' ? 1.0 : 0.6,
  }));

  return routes;
}
