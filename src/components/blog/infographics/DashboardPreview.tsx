"use client";
import { motion } from "motion/react";

const tiles = [
  { label: "Total tokens", value: "284,310", accent: "from-purple-400 to-violet-400" },
  { label: "Cost · USD", value: "$8.42", accent: "from-violet-400 to-pink-400" },
  { label: "Sessions", value: "17", accent: "from-pink-400 to-purple-400" },
  { label: "Quota · 5h", value: "62%", accent: "from-purple-400 to-pink-400" },
];

const modelSlices = [
  { name: "Sonnet 4.6", pct: 58, color: "#a855f7" },
  { name: "Opus 4.7", pct: 28, color: "#8b5cf6" },
  { name: "Haiku 4.5", pct: 14, color: "#ec4899" },
];

const toolSlices = [
  { name: "Edit", pct: 34, color: "#a855f7" },
  { name: "Read", pct: 28, color: "#8b5cf6" },
  { name: "Bash", pct: 18, color: "#ec4899" },
  { name: "Grep", pct: 12, color: "#d946ef" },
  { name: "Other", pct: 8, color: "#6366f1" },
];

const sparkBars = [
  18, 24, 19, 32, 28, 41, 36, 52, 48, 60, 55, 72, 64, 81, 70, 88, 76, 95, 84, 73,
];

function buildConicGradient(slices: { pct: number; color: string }[]) {
  let acc = 0;
  const stops = slices
    .map((s) => {
      const start = acc;
      acc += s.pct;
      return `${s.color} ${start}% ${acc}%`;
    })
    .join(", ");
  return `conic-gradient(${stops})`;
}

function Donut({
  slices,
  title,
}: {
  slices: { name: string; pct: number; color: string }[];
  title: string;
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
      <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-3">
        {title}
      </div>
      <div className="flex items-center gap-4">
        <motion.div
          initial={{ rotate: -90, opacity: 0 }}
          whileInView={{ rotate: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative h-20 w-20 shrink-0 rounded-full"
          style={{ backgroundImage: buildConicGradient(slices) }}
        >
          <div className="absolute inset-[10px] rounded-full bg-neutral-950" />
        </motion.div>
        <ul className="flex-1 min-w-0 space-y-1.5">
          {slices.map((s) => (
            <li
              key={s.name}
              className="flex items-center justify-between gap-2 text-[11px] font-mono"
            >
              <span className="flex items-center gap-2 min-w-0">
                <span
                  className="h-2 w-2 rounded-sm shrink-0"
                  style={{ background: s.color }}
                />
                <span className="text-neutral-300 truncate">{s.name}</span>
              </span>
              <span className="text-neutral-500 tabular-nums">{s.pct}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function DashboardPreview() {
  return (
    <div className="my-10 rounded-2xl border border-white/10 bg-neutral-950 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
        <span className="w-2 h-2 rounded-full bg-red-400/70" />
        <span className="w-2 h-2 rounded-full bg-yellow-400/70" />
        <span className="w-2 h-2 rounded-full bg-green-400/70" />
        <span className="ml-3 text-[11px] font-mono text-neutral-500 truncate">
          signoz · claude-code · last 24h
        </span>
      </div>

      <div className="p-4 sm:p-5 space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {tiles.map((t, i) => (
            <motion.div
              key={t.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
              className="rounded-xl border border-white/5 bg-white/[0.02] p-3"
            >
              <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                {t.label}
              </div>
              <div
                className={`mt-1 font-mono text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${t.accent} tabular-nums`}
              >
                {t.value}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Donut slices={modelSlices} title="Model split" />
          <Donut slices={toolSlices} title="Tool calls" />
        </div>

        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
              Tokens over time
            </span>
            <span className="text-[10px] font-mono text-neutral-600">
              1h buckets
            </span>
          </div>
          <div className="flex items-end gap-1 h-20">
            {sparkBars.map((h, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.025,
                  ease: "easeOut",
                }}
                style={{ height: `${h}%` }}
                className="flex-1 rounded-sm bg-gradient-to-t from-purple-500/40 via-violet-500/70 to-pink-500 origin-bottom"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 py-2 text-[10px] font-mono text-neutral-600 border-t border-white/5 bg-white/[0.02]">
        numbers are illustrative · your dashboard will look like your week
      </div>
    </div>
  );
}
