"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import { TextGenerateEffect } from "../ui/text-generate-effect";

export function HeroSection() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);


  const handleMouseEnter = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error: any) => {
        console.error("Audio playback failed:", error);
      });
    }
  };

  const handleMouseLeave = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div ref={containerRef} className="relative h-screen bg-black w-full">
      {/* Sticky container for video */}
      <div className="sticky top-0 h-screen w-full flex justify-center overflow-hidden">
        <video
          src="/Hero.mp4"
          autoPlay
          muted
          loop
          className=""
        />

        {/* Animated text on the left with typewriter effect and vertical stacking */}
        <div className="absolute left-4 top-2 text-center md:left-12 md:top-1/2 md:-translate-y-1/2 z-10">
          <div className="flex items-center justify-center">
            <TextGenerateEffect words="Hello Saab" className="text-3xl font-bold text-white whitespace-nowrap font-mono" />
            <motion.img
              src="https://raw.githubusercontent.com/nixin72/nixin72/master/wave.gif"
              alt="Waving hand"
              className="h-10 w-10 mr-2 inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            />
          </div>
          <TextGenerateEffect words="iamvevaar" className="text-3xl font-bold text-white whitespace-nowrap font-mono" />
          <TextGenerateEffect words="Creative Software Engineer" className="text-3xl font-bold text-white whitespace-nowrap font-mono" />
          <TextGenerateEffect words="Let's Create Something Amazing" className="text-3xl font-bold text-white whitespace-nowrap font-mono" />
        </div>

        {/* Interactive audio circle */}
        <div
          className="absolute bottom-48 left-1/2 transform -translate-x-1/2 flex flex-col justify-center items-center text-center h-44 w-44 rounded-full cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />

        {/* Hidden audio element */}
        <audio ref={audioRef} src="/a.mp3" preload="auto" />
      </div>
    </div>
  );
}