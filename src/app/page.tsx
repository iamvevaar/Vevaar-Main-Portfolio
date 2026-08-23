import { Dock } from "@/components/dock";
import { Footer } from "@/components/sections/footer";
import { HeroSection } from "@/components/sections/hero-section";
import JoinList from "@/components/sections/JoinList";
import { ProjectSection } from "@/components/sections/project-section";
import { TechStackSection } from "@/components/sections/tech-stack-section";
import { TimelineSection } from "@/components/sections/timeline-section";

export default function Home() {

  return (
    <main className="relative">
      {/* The hero is a scroll-driven cinematic with no single headline element,
          so the page shipped with no h1 at all — its strongest on-page signal
          was empty. This states the same thing the hero says in sequence, in one
          line, for crawlers and screen readers. Visually hidden, not cloaked:
          the content matches the page. */}
      <h1 className="sr-only">
        Gautam (Vevaar / iamvevaar) — Creative Software Engineer and Full Stack
        Engineer at AstroSure.ai, Chennai. Builder of FFmcpeg, Life at GITS, CampusAI, and X-Fathom.
      </h1>
      <HeroSection />
      <TimelineSection/>
      <ProjectSection/>
      <TechStackSection/>
      <JoinList />
      <div className="fixed bottom-10 left-0 right-0 flex justify-center z-10">
        <Dock />
      </div>
    </main>
  );
}
