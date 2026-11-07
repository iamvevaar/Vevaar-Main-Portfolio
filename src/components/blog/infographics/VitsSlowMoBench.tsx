"use client";
import { motion } from "motion/react";

// Mean PSNR of synthesized in-between frames vs held-out ground truth (Vits quality bench).
// Encoder ceiling is ~36.2 dB, so bars are drawn on a 20 to 36.2 dB scale.
const rows = [
  { mode: "Frame repeat", mean: 23.6, worst: 22.3 },
  { mode: "Frame blending", mean: 26.0, worst: 24.2 },
  { mode: "Optical flow", mean: 34.1, worst: 31.0, hero: true },
];
const MIN = 20;
const MAX = 36.2;
const pct = (db: number) => ((db - MIN) / (MAX - MIN)) * 100;

export function VitsSlowMoBench() {
  return (
    <div className="my-10 rounded-2xl border border-white/10 bg-neutral-950 px-5 py-5 sm:px-6">
      <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
        0.5× slow motion · PSNR vs real frames · higher is closer
      </p>
      <div className="space-y-4">
        {rows.map((r, i) => (
          <div key={r.mode}>
            <div className="mb-1 flex items-baseline justify-between text-sm">
              <span className={r.hero ? "font-semibold text-white" : "text-neutral-400"}>{r.mode}</span>
              <span className="font-mono text-xs text-neutral-400 tabular-nums">
                {r.mean.toFixed(1)} dB <span className="text-neutral-600">· worst {r.worst.toFixed(1)}</span>
              </span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/[0.05]">
              <motion.div
                className={`h-full origin-left rounded-full ${
                  r.hero ? "bg-gradient-to-r from-purple-400 via-violet-400 to-pink-400" : "bg-neutral-600"
                }`}
                style={{ width: `${pct(r.mean)}%` }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.15, duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-neutral-500">
        Scale starts at 20 dB. The encoder itself tops out near 36.2 dB.
      </p>
    </div>
  );
}
