"use client";
import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

export function StatCounter({
  value,
  label,
  suffix = "",
}: {
  value: number | string;
  label: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const parsed = Number(value);
  const target = Number.isFinite(parsed) ? parsed : 0;

  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  const display = Number.isFinite(n) ? n.toLocaleString() : "0";

  return (
    <div
      ref={ref}
      className="my-3 mr-3 inline-flex items-baseline gap-3 rounded-2xl border border-white/10 bg-neutral-950 px-5 py-3 align-top"
    >
      <span className="font-mono text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-violet-400 to-pink-400 tabular-nums">
        {display}
        {suffix}
      </span>
      <span className="text-xs sm:text-sm text-neutral-400">{label}</span>
    </div>
  );
}
