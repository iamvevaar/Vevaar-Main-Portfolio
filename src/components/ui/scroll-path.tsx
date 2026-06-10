"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from "motion/react";

/**
 * A gradient ink line that draws itself down the entire page as the user
 * scrolls, with a glowing head riding the tip. Lives in a pointer-events-none
 * overlay with mix-blend-screen so it reads as "behind" the content even
 * though the sections have opaque black backgrounds.
 *
 * Mount as a direct child of a `relative` <main>.
 */

// Deterministic PRNG so the "random" path is stable across renders
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildPath(w: number, h: number): string {
  const rand = mulberry32(2026);
  const margin = w * 0.1;
  const span = w - margin * 2;

  // One wandering S-curve segment roughly every ~70% of a viewport
  const segments = Math.max(6, Math.round(h / 620));
  const stepY = (h - 160) / segments;

  let x = w * 0.55;
  let y = 90;
  let d = `M ${x.toFixed(1)} ${y.toFixed(1)}`;
  let side = 1; // alternate swings: right, left, right...

  for (let i = 0; i < segments; i++) {
    const nextY = y + stepY;
    // Swing toward the opposite gutter with organic jitter
    const targetX =
      margin + span * (side > 0 ? 0.72 + rand() * 0.24 : 0.04 + rand() * 0.24);
    const c1x = x + (targetX - x) * (0.1 + rand() * 0.25);
    const c1y = y + stepY * (0.3 + rand() * 0.2);
    const c2x = targetX - (targetX - x) * (0.1 + rand() * 0.25);
    const c2y = y + stepY * (0.6 + rand() * 0.2);
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${targetX.toFixed(1)} ${nextY.toFixed(1)}`;
    x = targetX;
    y = nextY;
    side = -side;
  }
  return d;
}

export function ScrollPath() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const headRef = useRef<SVGCircleElement>(null);
  const [dims, setDims] = useState<{ w: number; h: number } | null>(null);

  // Measure the full height of <main> (the parent), re-measure on resize
  useEffect(() => {
    const parent = wrapRef.current?.parentElement;
    if (!parent) return;
    const measure = () =>
      setDims({ w: parent.clientWidth, h: parent.scrollHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(parent);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll();
  const drawn = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.0005,
  });

  const d = useMemo(
    () => (dims ? buildPath(dims.w, dims.h) : ""),
    [dims]
  );

  // Glowing head rides the tip of the line (no React re-renders)
  useMotionValueEvent(drawn, "change", (v) => {
    const path = pathRef.current;
    const head = headRef.current;
    if (!path || !head || !d) return;
    const len = path.getTotalLength();
    if (!len) return;
    const pt = path.getPointAtLength(Math.max(0, Math.min(1, v)) * len);
    head.setAttribute("cx", String(pt.x));
    head.setAttribute("cy", String(pt.y));
    head.setAttribute("opacity", v > 0.005 ? "1" : "0");
  });

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="absolute inset-x-0 top-0 z-[3] pointer-events-none mix-blend-screen"
      style={{ height: dims?.h ?? 0 }}
    >
      {dims && d && (
        <svg
          width={dims.w}
          height={dims.h}
          viewBox={`0 0 ${dims.w} ${dims.h}`}
          fill="none"
          className="absolute inset-0"
        >
          <defs>
            <linearGradient id="ink-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
            <filter id="ink-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>

          {/* soft glow underlay */}
          <motion.path
            d={d}
            stroke="url(#ink-grad)"
            strokeWidth={7}
            strokeLinecap="round"
            opacity={0.25}
            filter="url(#ink-glow)"
            style={{ pathLength: drawn }}
          />
          {/* the ink line */}
          <motion.path
            ref={pathRef}
            d={d}
            stroke="url(#ink-grad)"
            strokeWidth={1.75}
            strokeLinecap="round"
            opacity={0.7}
            style={{ pathLength: drawn }}
          />
          {/* comet head */}
          <circle
            ref={headRef}
            r={3.5}
            fill="#f0abfc"
            opacity={0}
            filter="url(#ink-glow)"
          />
        </svg>
      )}
    </div>
  );
}
