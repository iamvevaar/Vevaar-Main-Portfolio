"use client";
import { motion } from "motion/react";

const lines: [string, string][] = [
  ["Watermark", "your video."],
  ["Ask", "who you are."],
  ["Upload", "your footage."],
  ["Show ads", "while you edit."],
  ["Lock", "the good transitions."],
];

export function VitsNoList() {
  return (
    <div className="my-10 rounded-2xl border border-white/10 bg-neutral-950 px-6 py-6 sm:px-8">
      <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
        What Vits will never do
      </p>
      <ul className="space-y-2">
        {lines.map(([verb, rest], i) => (
          <li key={verb} className="text-xl sm:text-2xl font-outfit text-neutral-300">
            <span className="relative inline-block font-semibold text-white">
              {verb}
              <motion.span
                aria-hidden
                className="absolute left-0 top-1/2 h-[2px] w-full origin-left bg-pink-500"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: 0.25 + i * 0.18, duration: 0.45, ease: "easeOut" }}
              />
            </span>{" "}
            {rest}
          </li>
        ))}
      </ul>
      <p className="mt-5 text-sm text-neutral-400">What's left is the editor.</p>
    </div>
  );
}
