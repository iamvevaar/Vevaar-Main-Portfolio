"use client";
import { HeroSection } from "@/components/sections/hero-section";
import JoinList from "@/components/sections/JoinList";
import { TimelineSection } from "@/components/sections/timeline-section";

export default function Home() {

  return (
    <main>
      <HeroSection />
      <TimelineSection/>
      <JoinList />      
    </main>
  );
}
