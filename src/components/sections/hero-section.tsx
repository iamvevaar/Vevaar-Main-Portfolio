"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function HeroSection() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

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

  // Text content that changes on scroll
  const texts = [
    "Hello Saab",
    "iamvevaar",
    "Creative Software Engineer",
    "Let's Create Something Amazing"
  ];

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-black w-full">
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
        <div className="absolute left-12 top-1/2 -translate-y-1/2 z-10">
          {texts.map((text, index) => {
            const start = index / texts.length;
            const end = (index + 1) / texts.length;

            const charCount = useTransform(
              scrollYProgress,
              [start, end],
              [0, text.length]
            );

            const opacity = useTransform(scrollYProgress, (progress) => {
              // If we haven't reached this text yet
              if (progress < start) return 0;
              
              // Calculate how many texts are currently active after this one
              let activeAfter = 0;
              for (let i = index + 1; i < texts.length; i++) {
                const nextStart = i / texts.length;
                if (progress >= nextStart) {
                  activeAfter++;
                }
              }
              
              // Current line (no lines after it) = 100% opacity
              // Previous line (1 line after it) = 80% opacity
              // Line before that (2 lines after it) = 60% opacity
              // And so on...
              const opacityValue = 1 - (activeAfter * 0.2);
              return Math.max(opacityValue, 0.2); // Minimum 20% opacity
            });

            // Calculate vertical position - each line appears below the previous one
            const yPosition = useTransform(scrollYProgress, (progress) => {
              // Base position for this line (index * 60px spacing)
              return index * 60;
            });

            return (
              <motion.div
                key={index}
                style={{ opacity, y: yPosition }}
                className="absolute"
              >
                <h1 className="text-3xl font-bold text-white whitespace-nowrap font-mono flex">
                  {text.split('').map((char, charIndex) => {
                    const charOpacity = useTransform(
                      charCount,
                      [charIndex - 1, charIndex],
                      [0, 1]
                    );

                    return (
                      <motion.span
                        key={charIndex}
                        style={{ opacity: charOpacity }}
                        className="inline-block"
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </motion.span>
                    );
                  })}
                </h1>
              </motion.div>
            );
          })}
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