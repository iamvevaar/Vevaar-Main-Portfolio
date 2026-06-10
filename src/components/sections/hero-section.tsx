"use client";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  type MotionValue,
} from "motion/react";
import { FollowerPointerCard } from "../ui/following-pointer";
import { getAudioFileName } from "@/lib/audioUtils";
import { Spotlight } from "../ui/spotlight";
import { CLOUDFRONT_URL } from "@/lib/config";

/* ----------------------------- scene copy ------------------------------ */

type Beat = {
  label: string;
  headline: string;
  gradient: string[]; // words in headline that get the brand gradient
  sub: string;
  enter: [number, number];
  exit: [number, number] | null;
};

const BEATS: Beat[] = [
  {
    label: "SCENE 01 · THE INTRO",
    headline: "Half dev, half vibe.",
    gradient: ["vibe."],
    sub: "I'm Gautam, aka iamvevaar. Creative Software Engineer: design in one hand, code in the other.",
    enter: [0.14, 0.3],
    exit: [0.34, 0.4],
  },
  {
    label: "SCENE 02 · THE PROOF",
    headline: "I build things that pay rent.",
    gradient: ["pay", "rent."],
    sub: "At Astrosure my microsites went from ₹5K to ₹2.5L a month, and 2,500 people talk to my chatbot every day. X-Fathom lives on the Chrome store.",
    enter: [0.44, 0.6],
    exit: [0.64, 0.7],
  },
  {
    label: "SCENE 03 · THE INVITE",
    headline: "Living proof you can debug and chill.",
    gradient: ["debug", "chill."],
    sub: "Keep scrolling for the long version. Or hit Let's Talk; I reply faster than my CI.",
    enter: [0.74, 0.9],
    exit: null,
  },
];

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

/* ------------------------- scrubbed word reveal ------------------------ */

function ScrubWord({
  word,
  progress,
  start,
  end,
  gradient,
}: {
  word: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
  gradient: boolean;
}) {
  const y = useTransform(progress, [start, end], ["115%", "0%"]);
  const opacity = useTransform(progress, [start, end], [0, 1]);
  return (
    <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
      <motion.span
        style={{ y, opacity }}
        className={`inline-block ${
          gradient
            ? "bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-violet-400 to-pink-400"
            : "text-white"
        }`}
      >
        {word}
        {" "}
      </motion.span>
    </span>
  );
}

function SceneBeat({
  beat,
  progress,
}: {
  beat: Beat;
  progress: MotionValue<number>;
}) {
  const [enterStart, enterEnd] = beat.enter;
  const words = beat.headline.split(" ");
  const step = (enterEnd - enterStart) / (words.length + 2);

  const exitRange = beat.exit ?? [1.1, 1.2]; // never exits within scroll
  const blockOpacity = useTransform(
    progress,
    [enterStart, enterStart + 0.01, exitRange[0], exitRange[1]],
    [0, 1, 1, 0]
  );
  const blockY = useTransform(progress, exitRange, [0, -60]);

  const labelOpacity = useTransform(
    progress,
    [enterStart, enterStart + step * 1.5],
    [0, 1]
  );
  const subStart = enterStart + (enterEnd - enterStart) * 0.65;
  const subOpacity = useTransform(progress, [subStart, enterEnd], [0, 1]);
  const subY = useTransform(progress, [subStart, enterEnd], [24, 0]);

  return (
    <motion.div
      style={{ opacity: blockOpacity, y: blockY }}
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
    >
      <motion.p
        style={{ opacity: labelOpacity }}
        className="mb-6 text-[11px] sm:text-xs font-mono uppercase tracking-[0.35em] text-neutral-400"
      >
        {beat.label}
      </motion.p>
      <h2 className="font-outfit max-w-4xl text-4xl sm:text-6xl md:text-7xl font-bold leading-[1.05]">
        {words.map((word, i) => {
          const start = enterStart + i * step;
          return (
            <ScrubWord
              key={`${word}-${i}`}
              word={word}
              progress={progress}
              start={start}
              end={start + step * 3}
              gradient={beat.gradient.includes(word)}
            />
          );
        })}
      </h2>
      <motion.p
        style={{ opacity: subOpacity, y: subY }}
        className="mt-7 max-w-xl text-base sm:text-lg text-neutral-300 leading-relaxed"
      >
        {beat.sub}
      </motion.p>
    </motion.div>
  );
}

/* ------------------------------- hero ---------------------------------- */

export function HeroSection() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [pendingPlay, setPendingPlay] = useState(false);
  const audioFileName = getAudioFileName();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Scene 1 exits as soon as the user takes the wheel
  const scene1Opacity = useTransform(scrollYProgress, [0.02, 0.1], [1, 0]);
  const scene1Y = useTransform(scrollYProgress, [0.02, 0.1], [0, -40]);
  const scene1Pointer = useTransform(scrollYProgress, (v) =>
    v > 0.05 ? ("none" as const) : ("auto" as const)
  );

  // The camera racks focus: video pushes in, blurs, darkens
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const videoBlur = useTransform(scrollYProgress, [0.04, 0.2], [0, 18]);
  const videoBright = useTransform(scrollYProgress, [0.04, 0.2], [1, 0.4]);
  const videoFilter = useMotionTemplate`blur(${videoBlur}px) brightness(${videoBright})`;
  const washOpacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);

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
    const events = ["click", "touchstart", "keydown", "mousemove", "scroll"];

    events.forEach((event) => {
      document.addEventListener(event, unlockAudio, { once: true, passive: true });
    });

    return () => {
      events.forEach((event) => {
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
    <div ref={containerRef} className="relative h-[300vh] bg-black w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-60"
          fill="white"
        />

        {/* Center video: stays through every scene, the camera just loses focus */}
        <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-3 items-center justify-items-center">
          <div className="md:col-start-2 h-full flex items-center justify-center pb-[74px]">
            <motion.video
              src={`${CLOUDFRONT_URL}/Hero.mp4`}
              autoPlay
              muted
              loop
              playsInline
              style={{ scale: videoScale, filter: videoFilter }}
              className="h-full object-contain"
            />
          </div>
        </div>

        {/* Scene 1: the still frame. Just the video. Exits the moment the user scrolls. */}
        <motion.div
          style={{ opacity: scene1Opacity, y: scene1Y, pointerEvents: scene1Pointer }}
          className="absolute inset-0"
        >
          {showScrollHint && (
            <motion.img
              src="/Scroll down hint.gif"
              alt="Scroll down"
              className="absolute bottom-8 left-1/2 -translate-x-1/2 h-16 w-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          )}

          {/* Audio easter egg lives and dies with scene 1 */}
          <FollowerPointerCard
            title={
              audioUnlocked
                ? `Listening to ${audioFileName}`
                : "Click to listen"
            }
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="absolute bottom-28 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col justify-center items-center text-center h-56 w-56 rounded-full cursor-pointer z-20"
          >
            <div />
          </FollowerPointerCard>
        </motion.div>

        {/* The wash: vignette + grain settle over the frame as focus racks out */}
        <motion.div
          style={{ opacity: washOpacity }}
          className="absolute inset-0 pointer-events-none"
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.8) 100%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.14]"
            style={{ backgroundImage: GRAIN }}
          />
        </motion.div>

        {/* Scenes 2 to 4: the credits, scrubbed by the user's own scroll */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {BEATS.map((beat) => (
            <SceneBeat key={beat.label} beat={beat} progress={scrollYProgress} />
          ))}
        </div>

        <audio
          ref={audioRef}
          src={`${CLOUDFRONT_URL}/${audioFileName}`}
          preload="auto"
          loop
        />
      </div>
    </div>
  );
}
