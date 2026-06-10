import { Dock } from "@/components/dock";
import { Footer } from "@/components/sections/footer";
import { HeroSection } from "@/components/sections/hero-section";
import JoinList from "@/components/sections/JoinList";
import { ProjectSection } from "@/components/sections/project-section";
import { TechStackSection } from "@/components/sections/tech-stack-section";
import { TimelineSection } from "@/components/sections/timeline-section";
import { ScrollPath } from "@/components/ui/scroll-path";

export default function Home() {

  return (
    <main className="relative">
      <ScrollPath />
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
