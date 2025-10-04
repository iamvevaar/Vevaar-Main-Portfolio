import { HeroSection } from "@/components/sections/hero-section";
import JoinList from "@/components/sections/JoinList";
import { ProjectSection } from "@/components/sections/project-setcion";
import { TechStackSection } from "@/components/sections/tech-stack-section";
import { TimelineSection } from "@/components/sections/timeline-section";

export default function Home() {

  return (
    <main>
      <HeroSection />
      <TimelineSection/>
      <ProjectSection/>
      <TechStackSection/>
      <JoinList />      
    </main>
  );
}
