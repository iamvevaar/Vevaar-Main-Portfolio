"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { TextHoverEffect } from "../ui/text-hover-effect";
import { FollowerPointerCard } from "../ui/following-pointer";

export function HeroSection() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollHint, setShowScrollHint] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollHint(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

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
        <video src="/Hero.mp4" autoPlay muted loop className="" />

        {/* Animated text on the left with typewriter effect and vertical stacking */}
        <div className="absolute bottom-6 text-center md:left-12 md:top-1/2 md:-translate-y-1/2 z-10">
          <div className="flex md:mt-16 items-center justify-center">
            <TextGenerateEffect
              words="Hello Saab"
              className="text-3xl font-bold text-white whitespace-nowrap font-mono"
            />
            <motion.img
              src="https://raw.githubusercontent.com/nixin72/nixin72/master/wave.gif"
              alt="Waving hand"
              className="h-10 w-10 mr-1 mt-[9px] inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            />
            <TextGenerateEffect
              words="iamvevaar"
              className="text-3xl font-bold text-white whitespace-nowrap font-mono"
            />
          </div>
          <div className="flex flex-col items-center">
            <TextGenerateEffect
              words="Creative Software Engineer"
              className="text-3xl font-bold text-white whitespace-nowrap font-mono"
            />
            {showScrollHint && (
              <motion.img
                src="/Scroll down hint.gif"
                alt="Scroll down"
                className="h-16 w-16 mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </div>
        </div>
        <div className="absolute top-2 md:bottom-24 text-center md:right-1 md:top-1/2 md:-translate-y-1/2 z-10">
          <TextHoverEffect text="vevaar" />
        </div>

        {/* Interactive audio circle */}
        <FollowerPointerCard
          title="Play Music"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="absolute bottom-48 left-1/2 transform -translate-x-1/2 flex flex-col justify-center items-center text-center h-44 w-44 rounded-full cursor-pointer"
        >
          <div />
        </FollowerPointerCard>

        {/* Hidden audio element */}
        <audio ref={audioRef} src="/intestellar.mp3" preload="auto" loop />
      </div>
    </div>
  );
}
