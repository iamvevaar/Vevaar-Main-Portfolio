"use client";
import { motion } from "motion/react";

// Left: the raw tripod shot, dancer drifting around a 160×90 frame, with the 2× window following.
// Right: what the dance cam outputs, the same scene seen through that window.
const xs = [40, 75, 115, 95, 50, 40];
const ys = [30, 26, 34, 28, 32, 30];
const cx = xs.map((x) => Math.min(80, Math.max(0, x - 40)));
const cy = ys.map((y) => Math.min(45, Math.max(0, y - 15)));
const loop = { duration: 7, repeat: Infinity, ease: "easeInOut" as const };

function Scene() {
  return (
    <>
      {[20, 50, 80, 110, 140].map((x) => (
        <line key={x} x1={x} y1={0} x2={x} y2={70} stroke="rgba(255,255,255,0.06)" strokeWidth={6} />
      ))}
      <line x1={0} y1={72} x2={160} y2={72} stroke="rgba(255,255,255,0.25)" strokeWidth={0.8} />
      <motion.g initial={{ x: xs[0], y: ys[0] }} animate={{ x: xs, y: ys }} transition={loop}>
        <circle r={5} fill="#f472b6" />
        <line x1={0} y1={5} x2={0} y2={24} stroke="#e5e5e5" strokeWidth={1.6} strokeLinecap="round" />
        <line x1={-8} y1={10} x2={8} y2={14} stroke="#e5e5e5" strokeWidth={1.4} strokeLinecap="round" />
        <line x1={0} y1={24} x2={-6} y2={38} stroke="#e5e5e5" strokeWidth={1.4} strokeLinecap="round" />
        <line x1={0} y1={24} x2={6} y2={38} stroke="#e5e5e5" strokeWidth={1.4} strokeLinecap="round" />
      </motion.g>
    </>
  );
}

export function DanceCamDemo() {
  return (
    <div className="my-10 rounded-2xl border border-white/10 bg-neutral-950 px-5 py-5 sm:px-6">
      <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
        Dance cam · one tap · 2× view on the dancer&apos;s head
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <figure>
          <svg viewBox="0 0 160 90" className="w-full rounded-lg border border-white/10 bg-black">
            <Scene />
            <motion.rect
              width={80}
              height={45}
              rx={2}
              fill="none"
              stroke="#c084fc"
              strokeWidth={1}
              strokeDasharray="3 2"
              initial={{ x: cx[0], y: cy[0] }}
              animate={{ x: cx, y: cy }}
              transition={loop}
            />
          </svg>
          <figcaption className="mt-2 text-xs text-neutral-500">Your shot from across the room</figcaption>
        </figure>
        <figure>
          <svg viewBox="0 0 80 45" className="w-full rounded-lg border border-purple-400/40 bg-black">
            <motion.g initial={{ x: -cx[0], y: -cy[0] }} animate={{ x: cx.map((v) => -v), y: cy.map((v) => -v) }} transition={loop}>
              <Scene />
            </motion.g>
          </svg>
          <figcaption className="mt-2 text-xs text-neutral-500">What Vits exports: the head stays put</figcaption>
        </figure>
      </div>
    </div>
  );
}
