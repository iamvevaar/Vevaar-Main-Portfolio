"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";

// Accent used for the dot, the "%", the ambient glow and the curved edge glow.
// One place to retheme.
const ACCENT = "#a855f7";

// Global mix, ending on a Hindi welcome — mirrors the manndamani.com feel.
const GREETINGS = [
  "नमस्ते",
  "Hello",
  "Bonjour",
  "Ciao",
  "Hola",
  "こんにちは",
  "你好",
  "مرحبا",
  "Olá",
  "Hallo",
  "안녕하세요",
  "आपका स्वागत है",
];

// Minimum time the intro is on screen, so the greetings always play through
// even when the page loads instantly. Real progress still drives the 100%.
const MIN_DURATION = 2400;
const GREETING_INTERVAL = MIN_DURATION / GREETINGS.length;

// Reveal tuning. Deep valley in the middle of the flight, decelerating hard at
// the top for the "very slow at the end" feel from the reference.
const REVEAL_DURATION = 2.1;
const REVEAL_EASE = [0.33, 0, 0.2, 1] as const; // gentler ease-out: less front-load, slow tail
const VALLEY_DEPTH = 65; // in the 0-100 viewBox units of the curve SVG

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  // window "load" (all assets) flips this; the counter can only reach 100 after.
  const loadedRef = useRef(false);

  // Drives the curved reveal: 0 = covering, 1 = fully cleared off the top.
  const reveal = useMotionValue(0);
  // The whole overlay slides up; ends past the top so the valley clears too.
  const translateY = useTransform(reveal, [0, 1], ["0%", "-135%"]);
  // Valley depth swells then flattens (sin bump) as the edge travels up.
  const fillPath = useTransform(reveal, (r) => {
    const depth = VALLEY_DEPTH * Math.sin(Math.PI * r);
    return `M0 0 Q50 ${depth} 100 0 Z`;
  });
  const strokePath = useTransform(reveal, (r) => {
    const depth = VALLEY_DEPTH * Math.sin(Math.PI * r);
    return `M0 0 Q50 ${depth} 100 0`;
  });

  useEffect(() => {
    // Lock scroll while the intro is up.
    document.body.style.overflow = "hidden";

    const start = performance.now();

    const markLoaded = () => {
      loadedRef.current = true;
    };
    if (document.readyState === "complete") {
      markLoaded();
    } else {
      window.addEventListener("load", markLoaded);
    }

    let raf = 0;
    const tick = () => {
      const elapsed = performance.now() - start;
      const timeRatio = Math.min(elapsed / MIN_DURATION, 1);

      // Ceiling holds a hair under 100 until the page is genuinely loaded AND
      // the minimum duration has passed — then it's allowed to complete.
      const canFinish = loadedRef.current && elapsed >= MIN_DURATION;
      const ceiling = canFinish ? 100 : Math.min(96, timeRatio * 96);

      setProgress((prev) => {
        // Ease toward the ceiling so real, jumpy load events read as a smooth climb.
        const next = prev + (ceiling - prev) * 0.12 + 0.35;
        return next >= 100 ? 100 : next;
      });

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Advance greetings, holding on the final "welcome".
    const greetTimer = setInterval(() => {
      setGreetingIndex((i) => Math.min(i + 1, GREETINGS.length - 1));
    }, GREETING_INTERVAL);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(greetTimer);
      window.removeEventListener("load", markLoaded);
    };
  }, []);

  // Fire the curved reveal once the counter lands on 100.
  useEffect(() => {
    if (progress >= 100 && !done) {
      const t = setTimeout(() => setDone(true), 300);
      return () => clearTimeout(t);
    }
  }, [progress, done]);

  // Run the reveal, unlock scroll, then unmount the overlay entirely.
  useEffect(() => {
    if (!done) return;
    document.body.style.overflow = "";
    const controls = animate(reveal, 1, {
      duration: REVEAL_DURATION,
      ease: REVEAL_EASE,
      onComplete: () => setHidden(true),
    });
    return () => controls.stop();
  }, [done, reveal]);

  if (hidden) return null;

  const rounded = Math.min(Math.round(progress), 100);

  return (
    <AnimatePresence>
      <motion.div
        style={{ y: translateY }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0b0b0d]"
      >
        {/* Ambient accent glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.18] blur-[120px]"
          style={{
            background: `radial-gradient(circle, ${ACCENT} 0%, transparent 60%)`,
          }}
        />

        {/* Center greeting. A fixed-width box stays centered on screen so the
            text is always centered, while the dot is pinned to the box's left
            edge — so it never shifts as the greeting changes width. */}
        <div className="relative w-[20rem] text-center md:w-[32rem]">
          <span
            className="absolute right-full top-1/2 mr-4 h-2 w-2 -translate-y-1/2 rounded-full"
            style={{ backgroundColor: ACCENT }}
          />
          <AnimatePresence mode="wait">
            <motion.span
              key={greetingIndex}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="inline-block whitespace-nowrap text-4xl font-light tracking-tight text-white md:text-5xl"
            >
              {GREETINGS[greetingIndex]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Bottom-left label */}
        <div className="absolute bottom-6 left-6 flex items-center gap-2 md:bottom-10 md:left-10">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: ACCENT }}
          />
          <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-neutral-500 md:text-xs">
            Loading Experience
          </span>
        </div>

        {/* Bottom-right counter */}
        <div className="absolute bottom-2 right-6 flex items-end leading-none md:right-10">
          <span className="text-[22vw] font-extralight tabular-nums text-white md:text-[13vw]">
            {rounded}
          </span>
          <span
            className="mb-[3vw] ml-1 text-2xl font-light md:mb-[2.2vw] md:text-4xl"
            style={{ color: ACCENT }}
          >
            %
          </span>
        </div>

        {/* Curved valley hanging just below the panel — the leading edge of the
            reveal. Filled to match the panel, then a glowing accent stroke. */}
        <svg
          aria-hidden
          className="absolute left-0 top-full w-full"
          style={{ height: "22vh" }}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <motion.path d={fillPath} fill="#0b0b0d" />
        </svg>
        <svg
          aria-hidden
          className="absolute left-0 top-full w-full overflow-visible"
          style={{ height: "22vh" }}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <motion.path
            d={strokePath}
            fill="none"
            stroke={ACCENT}
            strokeWidth={2}
            vectorEffect="non-scaling-stroke"
            style={{ filter: `drop-shadow(0 0 6px ${ACCENT})` }}
          />
        </svg>
      </motion.div>
    </AnimatePresence>
  );
}
