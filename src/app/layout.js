import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

// Central site URL for metadata and links
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://garbagehero.co.ke';

export const metadata = {
  title: {
    default: "Garbage Hero",
    template: "%s | Garbage Hero",
  },
  description: "Integrated contract cleaning, sanitary hygiene, pest control, fumigation and landscaping services delivering consistent compliant facility hygiene across Kenya.",
  icons: {
    icon: [
      { url: "/images/logo1.png?v=2", type: "image/png" },
      { url: "/images/logo1.png?v=2", sizes: "16x16", type: "image/png" },
      { url: "/images/logo1.png?v=2", sizes: "32x32", type: "image/png" },
      { url: "/images/logo1.png?v=2", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/images/logo1.png?v=2" }],
    shortcut: ["/images/logo1.png?v=2"],
  },
  // Ensure absolute URLs for OpenGraph/SEO
  metadataBase: new URL(siteUrl),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Favicon + Apple touch icon are provided via metadata.icons above */}
        {/* Explicit links to ensure all browsers pick the correct icon */}
  <link rel="icon" href="/images/logo1.png?v=2" type="image/png" />
  <link rel="apple-touch-icon" href="/images/logo1.png?v=2" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#1E611B" />
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        {/* Preload a frequently used hero image with correct React attribute */}
        <link rel="preload" as="image" href="/projects/traning-1.jpg" fetchPriority="high" />
        <link rel="canonical" href={`${siteUrl}/`} />
        <meta name="robots" content="index,follow" />
        {/* Inline style for skip link (kept lightweight to avoid new CSS file edits) */}
        <style>{`:root{scroll-behavior:smooth}.skip-link{position:absolute;left:-999px;top:auto;width:1px;height:1px;overflow:hidden} .skip-link:focus{left:8px;top:8px;width:auto;height:auto;padding:8px 14px;z-index:1000;background:#1E611B;color:#fff;border-radius:6px;outline:2px solid #fff;}`}</style>
        {/* Organization + Services JSON-LD (site‑wide) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Garbage Hero Limited",
              url: `${siteUrl}/`,
              logo: `${siteUrl}/images/logo1.png?v=2`,
              description: "Integrated contract cleaning, sanitary hygiene, pest control and landscaping partner in Kenya.",
              areaServed: "KE",
              foundingDate: "2020",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                { "@type": "Service", name: "Cleaning Services", description: "Routine and deep contract cleaning for institutional and corporate facilities across Kenya." },
                { "@type": "Service", name: "Sanitary Services", description: "Washroom hygiene servicing, waste segregation guidance and high-touch surface sanitation." },
                { "@type": "Service", name: "Gardening & Landscaping", description: "Grounds care, seasonal redesigns and sustainable plant stewardship improving outdoor environments." },
                { "@type": "Service", name: "Fumigation & Pest Control", description: "Integrated pest management and safe fumigation preventing recurrence and safeguarding health." }
              ]
            }),
          }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to main content</a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
