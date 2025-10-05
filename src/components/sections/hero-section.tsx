"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { TextHoverEffect } from "../ui/text-hover-effect";
import { FollowerPointerCard } from "../ui/following-pointer";
import { getAudioFileName } from "@/lib/audioUtils";

export function HeroSection() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [pendingPlay, setPendingPlay] = useState(false);
  const audioFileName = getAudioFileName();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollHint(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Silently unlock audio on ANY user interaction
  useEffect(() => {
    const unlockAudio = async () => {
      if (!audioUnlocked && audioRef.current) {
        try {
          // Attempt to play and immediately pause to unlock
          await audioRef.current.play();
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          setAudioUnlocked(true);
          
          // If user was already hovering, play now
          if (pendingPlay) {
            audioRef.current.play().catch(console.error);
          }
        } catch (error) {
          // Still locked, will retry on next interaction
        }
      }
    };

    // Listen for ANY interaction to unlock audio
    const events = ['click', 'touchstart', 'keydown', 'mousemove', 'scroll'];
    
    events.forEach(event => {
      document.addEventListener(event, unlockAudio, { once: true, passive: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, unlockAudio);
      });
    };
  }, [audioUnlocked, pendingPlay]);

  const handleMouseEnter = () => {
    setPendingPlay(true);
    if (audioRef.current) {
      if (audioUnlocked) {
        audioRef.current.play().catch((error: any) => {
          console.error("Audio playback failed:", error);
        });
      }
      // If not unlocked yet, audio will play automatically once unlocked (via pendingPlay)
    }
  };

  const handleMouseLeave = () => {
    setPendingPlay(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div ref={containerRef} className="relative h-screen bg-black w-full">
      <div className="sticky top-0 h-screen w-full flex justify-center overflow-hidden">
        <video src="/Hero.mp4" autoPlay muted loop className="" />

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

        <FollowerPointerCard
          title={
            audioUnlocked
              ? `Listening to ${audioFileName}`
              : "Click to listen"
          }
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="absolute bottom-48 left-1/2 transform -translate-x-1/2 flex flex-col justify-center items-center text-center h-44 w-44 rounded-full cursor-pointer"
        >
          <div />
        </FollowerPointerCard>

        <audio ref={audioRef} src={`/${audioFileName}`} preload="auto" loop />
      </div>
    </div>
  );
}