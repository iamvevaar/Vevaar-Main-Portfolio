"use client";
import { motion } from "motion/react";

// How "नमस्ते" (न म स ् त े) gets cut into animated pieces.
// "◌" marks a sign drawn with nothing to sit on.
const rows: { label: string; note: string; pieces: string[]; broken: number[]; hero?: boolean }[] = [
  {
    label: "By character",
    note: "6 pieces, two of them orphan signs",
    pieces: ["न", "म", "स", "◌्", "त", "◌े"],
    broken: [3, 5],
  },
  {
    label: "Older Unicode rule",
    note: "4 pieces, the conjunct is split in two",
    pieces: ["न", "म", "स्", "ते"],
    broken: [2, 3],
  },
  {
    label: "Vits",
    note: "3 pieces, the way a reader sees it",
    pieces: ["न", "म", "स्ते"],
    broken: [],
    hero: true,
  },
];

export function GraphemeSplit() {
  return (
    <div className="my-10 rounded-2xl border border-white/10 bg-neutral-950 px-5 py-5 sm:px-6">
      <p className="mb-5 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
        Animating नमस्ते letter by letter · what each piece is
      </p>
      <div className="space-y-6">
        {rows.map((r, ri) => (
          <div key={r.label}>
            <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-3 text-sm">
              <span className={r.hero ? "font-semibold text-white" : "text-neutral-400"}>{r.label}</span>
              <span className="font-mono text-xs text-neutral-500">{r.note}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {r.pieces.map((p, i) => {
                const bad = r.broken.includes(i);
                return (
                  <motion.span
                    key={i}
                    className={`inline-flex min-w-[3rem] items-center justify-center rounded-xl border px-3 py-2 text-2xl sm:text-3xl ${
                      r.hero
                        ? "border-pink-500/50 bg-pink-500/[0.08] text-white"
                        : bad
                          ? "border-dashed border-yellow-500/50 bg-yellow-500/[0.05] text-yellow-200"
                          : "border-white/10 bg-white/[0.03] text-neutral-200"
                    }`}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ delay: ri * 0.35 + i * 0.12, duration: 0.4, ease: "easeOut" }}
                  >
                    {p}
                  </motion.span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-5 text-xs text-neutral-500">
        Dashed pieces are the ones a Hindi reader would never call a letter.
      </p>
    </div>
  );
}
