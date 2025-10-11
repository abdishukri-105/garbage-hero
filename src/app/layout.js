import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: {
    default: "Garbage Hero",
    template: "%s | Garbage Hero",
  },
  description: "Integrated contract cleaning, sanitary hygiene, pest control, fumigation and landscaping services delivering consistent compliant facility hygiene across Kenya.",
  icons: {
    icon: "/images/logo1.png",
    apple: "/images/logo1.png",
    other: [
      { rel: "icon", url: "/images/logo1.png", sizes: "32x32" },
      { rel: "icon", url: "/images/logo1.png", sizes: "192x192" },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Favicon + Apple touch icon are provided via metadata.icons above */}
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        {/* Preload a frequently used hero image with correct React attribute */}
        <link rel="preload" as="image" href="/projects/traning-1.jpg" fetchPriority="high" />
        <link rel="canonical" href="https://garbagehero.co.ke/" />
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
              url: "https://garbagehero.co.ke/",
              logo: "https://garbagehero.co.ke/images/logo1.png",
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
