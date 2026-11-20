"use client";
import { motion } from "motion/react";

// A song's waveform with beat markers: amber = found by Vits, pink = tapped by you.
// A playhead sweeps across and each dot flashes as it passes.
const BARS = 96;
const STEP = 8; // a beat every 8 bars
const W = 480;
const bw = W / BARS;
const heights = Array.from({ length: BARS }, (_, i) => {
  const onBeat = i % STEP === 0;
  const afterBeat = i % STEP === 1;
  const wobble = ((i * 37) % 11) / 11;
  return onBeat ? 34 : afterBeat ? 24 : 8 + wobble * 12;
});
const beats = Array.from({ length: BARS / STEP }, (_, k) => k * STEP);
const yours = new Set([5, 9]); // two beats the user moved by hand
const DUR = 6;

export function BeatMarkersDemo() {
  return (
    <div className="my-10 rounded-2xl border border-white/10 bg-neutral-950 px-5 py-5 sm:px-6">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">Add beat markers · on</p>
        <p className="font-mono text-xs text-neutral-300">128 BPM · found by Vits</p>
      </div>
      <svg viewBox={`0 0 ${W} 96`} className="w-full">
        {heights.map((h, i) => (
          <rect
            key={i}
            x={i * bw + 0.8}
            y={40 - h / 2}
            width={bw - 1.6}
            height={h}
            rx={1}
            fill="rgba(74,222,128,0.55)"
          />
        ))}
        {beats.map((b, k) => {
          const x = b * bw + bw / 2;
          const t = x / W;
          const color = yours.has(k) ? "#ec4899" : "#f59e0b";
          return (
            <motion.circle
              key={b}
              cx={x}
              cy={80}
              r={4.5}
              fill={color}
              stroke="#0a0a0a"
              strokeWidth={1.5}
              animate={{ opacity: [0.45, 0.45, 1, 0.45, 0.45], r: [4.5, 4.5, 7, 4.5, 4.5] }}
              transition={{
                duration: DUR,
                repeat: Infinity,
                ease: "linear",
                times: [0, Math.max(0, t - 0.005), t, Math.min(1, t + 0.06), 1],
              }}
            />
          );
        })}
        <motion.line
          x1={0}
          x2={0}
          y1={0}
          y2={92}
          stroke="#fff"
          strokeWidth={1.5}
          animate={{ x: [0, W] }}
          transition={{ duration: DUR, repeat: Infinity, ease: "linear" }}
        />
      </svg>
      <div className="mt-3 flex flex-wrap gap-4 text-xs text-neutral-400">
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-500" /> found by Vits
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-pink-500" /> yours
        </span>
      </div>
    </div>
  );
}
