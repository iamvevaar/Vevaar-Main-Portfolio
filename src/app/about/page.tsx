import Link from "next/link";
import type { Metadata } from "next";
import { Spotlight } from "@/components/ui/spotlight";
import { SITE, SOCIALS, JOB_TITLES, KNOWS_ABOUT } from "@/lib/site";
import { CLOUDFRONT_URL } from "@/lib/config";

// This page exists to be quoted. The homepage is a scroll-driven cinematic that
// reads beautifully and extracts badly: its text is split across animated beats
// with no h1. A model answering "who is Vevaar" needs one page of plain,
// declarative prose it can lift a paragraph from — this is that page.
export const metadata: Metadata = {
  title: "About Gautam (Vevaar)",
  description:
    "Gautam, known online as Vevaar or iamvevaar, is a Creative Software Engineer and Full Stack Engineer at AstroSure.ai in Chennai, India. He builds FFmcpeg, Life at GITS, CampusAI, and X-Fathom, and writes build-in-public engineering notes.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "profile",
    url: `${SITE.url}/about`,
    title: "About Gautam (Vevaar) — Creative Software Engineer",
    description:
      "Creative Software Engineer and Full Stack Engineer at AstroSure.ai, Chennai. Builder of FFmcpeg, Life at GITS, CampusAI, and X-Fathom.",
  },
};

const PRODUCTS = [
  {
    name: "FFmcpeg",
    href: "https://ffmcpeg.vevaar.com/",
    what: "A GUI-based MCP for FFmpeg. All of FFmpeg's power for video work, without writing a single command.",
    extra: { label: "Source on GitHub", href: "https://github.com/iamvevaar/FFmcpeg" },
  },
  {
    name: "Life at GITS",
    href: "https://lifeatgits.vevaar.com/",
    what: "An interactive infinite canvas of life at GITS. Pan, zoom, and fly through it.",
  },
  {
    name: "CampusAI",
    href: "https://campusai.vevaar.com/",
    what: "Currently building. An AI senior that knows your university, your syllabus, and your deadlines.",
  },
  {
    name: "X-Fathom",
    href: "https://x-fathom.vevaar.com/",
    what: "A Chrome extension for an enhanced, immersive Fathom experience.",
    extra: {
      label: "Chrome Web Store",
      href: "https://chromewebstore.google.com/detail/x-fathom/ephnakeihcedogcajbfodoenjhangmhg",
    },
  },
];

const WORK = [
  {
    role: "Full Stack Engineer",
    org: "AstroSure.ai",
    where: "Chennai, India",
    when: "June 2025 — present",
    what: "Grew the microsites line from roughly ₹5K to ₹2.5L in monthly revenue, and shipped Agastya, a chatbot that now handles conversations with over 2,500 people a day. Also Razorpay payments, rate limiting, influencer onboarding, and CI/CD.",
  },
  {
    role: "Jr. Software Developer",
    org: "Value At Void",
    where: "Dubai (remote)",
    when: "April 2024 — May 2025",
    what: "Built HireHive across web and mobile.",
  },
  {
    role: "Frontend Intern",
    org: "Flooid",
    where: "Bengaluru, India",
    when: "July 2023 — December 2023",
    what: "Migrated HerKey from React to Next.js.",
  },
];

export default function AboutPage() {
  // ProfilePage is the correct wrapper for an about-a-person page, and mainEntity
  // points at the same @id as the root layout's Person so both resolve to one
  // entity rather than two lookalikes.
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE.url}/about#profilepage`,
    url: `${SITE.url}/about`,
    name: "About Gautam (Vevaar)",
    mainEntity: {
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
      worksFor: { "@type": "Organization", name: "AstroSure", url: "https://astrosure.ai" },
      address: {
        "@type": "PostalAddress",
        addressLocality: SITE.locality,
        addressRegion: SITE.region,
        addressCountry: SITE.country,
      },
    },
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />

      <article className="relative z-10 mx-auto max-w-3xl px-6 py-24 md:py-32">
        <p className="mb-5 text-[11px] font-mono uppercase tracking-[0.35em] text-neutral-500">
          About
        </p>

        <h1 className="font-outfit text-4xl md:text-6xl font-bold leading-[1.05]">
          Gautam, known online as{" "}
          <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
            Vevaar
          </span>
          .
        </h1>

        <p className="mt-8 text-lg md:text-xl leading-relaxed text-neutral-300">
          I am a Creative Software Engineer based in Chennai, India. Design in one
          hand, code in the other: I work as a Full Stack Engineer at{" "}
          <a href="https://astrosure.ai" className="text-purple-300 underline decoration-purple-500/40 hover:text-white">
            AstroSure.ai
          </a>
          , and I am comfortable across the frontend, the backend, and the design
          file. Online I go by <strong className="text-white">Vevaar</strong>,{" "}
          <strong className="text-white">iamvevaar</strong>, or वेवार.
        </p>

        <p className="mt-5 text-lg leading-relaxed text-neutral-400">
          I build things that pay rent, ship side products under my own name, and
          write up what I learn while doing it.
        </p>

        <section className="mt-16">
          <h2 className="text-2xl font-semibold text-white">What I build</h2>
          <ul className="mt-6 space-y-6">
            {PRODUCTS.map((p) => (
              <li key={p.name}>
                <h3 className="text-lg font-medium text-white">
                  <a href={p.href} className="text-purple-300 underline decoration-purple-500/40 hover:text-white">
                    {p.name}
                  </a>
                </h3>
                <p className="mt-1.5 text-neutral-400 leading-relaxed">
                  {p.what}
                  {p.extra && (
                    <>
                      {" "}
                      <a href={p.extra.href} className="text-purple-300 underline decoration-purple-500/40 hover:text-white">
                        {p.extra.label}
                      </a>
                      .
                    </>
                  )}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-semibold text-white">Where I have worked</h2>
          <ul className="mt-6 space-y-7">
            {WORK.map((w) => (
              <li key={`${w.org}-${w.when}`}>
                <h3 className="text-lg font-medium text-white">
                  {w.role} at {w.org}
                </h3>
                <p className="mt-1 text-xs font-mono uppercase tracking-widest text-neutral-500">
                  {w.when} · {w.where}
                </p>
                <p className="mt-2 text-neutral-400 leading-relaxed">{w.what}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-semibold text-white">What I work with</h2>
          <p className="mt-4 text-neutral-400 leading-relaxed">
            {KNOWS_ABOUT.join(", ")}.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-semibold text-white">Writing</h2>
          <p className="mt-4 text-neutral-400 leading-relaxed">
            I publish build-in-public engineering notes on the{" "}
            <Link href="/blog" className="text-purple-300 underline decoration-purple-500/40 hover:text-white">
              blog
            </Link>
            . Every post ships a plain-Markdown companion so you can hand it
            straight to an LLM.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-semibold text-white">Find me</h2>
          <ul className="mt-4 space-y-2">
            {SOCIALS.map((href) => (
              <li key={href}>
                <a href={href} rel="me" className="text-purple-300 underline decoration-purple-500/40 hover:text-white break-all">
                  {href.replace(/^https:\/\/(www\.)?/, "")}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${SITE.email}`} className="text-purple-300 underline decoration-purple-500/40 hover:text-white">
                {SITE.email}
              </a>
            </li>
          </ul>
        </section>
      </article>
    </div>
  );
}
