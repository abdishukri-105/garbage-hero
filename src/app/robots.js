// robots.js - generates /robots.txt via Next.js App Router
// Docs: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://garbagehero.co.ke';
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
