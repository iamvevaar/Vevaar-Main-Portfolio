import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/sections/footer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { Preloader } from "@/components/ui/preloader";
import { SmoothScroll } from "@/components/smooth-scroll";
import { CLOUDFRONT_URL } from "@/lib/config";
import { SITE, SOCIALS, JOB_TITLES, KNOWS_ABOUT } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // metadataBase is what turns every relative OG/canonical URL into an absolute
  // one. Without it Next emits relative OG images, which most scrapers drop.
  metadataBase: new URL(SITE.url),
  title: {
    default: "Vevaar | Gautam — Creative Software Engineer",
    template: "%s | Vevaar",
  },
  description:
    "Gautam, aka iamvevaar. Creative Software Engineer and Full Stack Engineer at AstroSure: design in one hand, code in the other. Half-dev, half-vibe, and living proof you can debug and chill.",
  applicationName: SITE.name,
  authors: [{ name: SITE.personName, url: SITE.url }],
  creator: SITE.personName,
  publisher: SITE.personName,
  keywords: [
    "Vevaar",
    "iamvevaar",
    "Gautam",
    "Creative Software Engineer",
    "Full Stack Engineer",
    "Frontend Engineer",
    "React developer",
    "Next.js developer",
    "design engineer",
    "X-Fathom",
    "AstroSure",
    "Chennai",
    "build in public",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: `${CLOUDFRONT_URL}/favicon.ico`, sizes: "any" },
    ],
    apple: [
      { url: `${CLOUDFRONT_URL}/favicon.ico`, sizes: "180x180" },
    ],
    shortcut: `${CLOUDFRONT_URL}/favicon.ico`,
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: SITE.url,
    locale: "en_US",
    title: "Vevaar | Gautam — Creative Software Engineer",
    description:
      "Creative Software Engineer and Full Stack Engineer at AstroSure. Design in one hand, code in the other.",
    images: [
      {
        url: `${CLOUDFRONT_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Vevaar — Gautam, Creative Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vevaar | Gautam — Creative Software Engineer",
    description:
      "Creative Software Engineer and Full Stack Engineer at AstroSure. Design in one hand, code in the other.",
    creator: `@${SITE.xHandle}`,
    images: [`${CLOUDFRONT_URL}/og-image.png`],
  },
};

// One @graph rather than several loose blocks, so the Person and the WebSite are
// explicitly linked by @id instead of leaving a model to guess they are the same
// entity. This is the part that actually answers "who is iamvevaar".
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE.url}/#person`,
      name: SITE.personName,
      alternateName: [...SITE.alternateNames],
      url: SITE.url,
      image: `${CLOUDFRONT_URL}/og-image.png`,
      email: SITE.email,
      jobTitle: [...JOB_TITLES],
      description: SITE.description,
      knowsAbout: [...KNOWS_ABOUT],
      sameAs: [...SOCIALS],
      worksFor: {
        "@type": "Organization",
        name: "AstroSure",
        url: "https://astrosure.ai",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: SITE.locality,
        addressRegion: SITE.region,
        addressCountry: SITE.country,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      description: SITE.description,
      inLanguage: "en",
      publisher: { "@id": `${SITE.url}/#person` },
      author: { "@id": `${SITE.url}/#person` },
    },
  ],
};

// Export viewport separately
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
        />
        <SmoothScroll />
        <Preloader />
        {children}
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics />
        <footer className="bg-black">
        <Footer />
      </footer>
      </body>      
    </html>
  );
}
