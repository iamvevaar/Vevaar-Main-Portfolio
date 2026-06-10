"use client";
import { motion } from "motion/react";
import { IconCheck } from "@tabler/icons-react";

type Row = {
  tool: string;
  findsBy: string;
  onRedesign: string;
  hero?: boolean;
};

const rows: Row[] = [
  {
    tool: "Selenium / Playwright",
    findsBy: "CSS selectors and XPath",
    onRedesign: "Script breaks. You fix it at 2am.",
  },
  {
    tool: "Traditional RPA",
    findsBy: "Pixel positions, recorded clicks",
    onRedesign: "Bot clicks the wrong thing. Silently.",
  },
  {
    tool: "Skyvern",
    findsBy: "Vision LLM reading the rendered page",
    onRedesign: "Agent re-reads the page and carries on.",
    hero: true,
  },
];

export function AutomationShowdown() {
  return (
    <div className="my-10 rounded-2xl border border-white/10 bg-neutral-950 overflow-hidden">
      <div className="hidden sm:grid grid-cols-[1.2fr_1.4fr_1.4fr] gap-4 px-5 py-3 border-b border-white/5 bg-white/[0.02] text-[10px] font-mono uppercase tracking-widest text-neutral-500">
        <span>Approach</span>
        <span>Finds the button by</span>
        <span>When the UI changes</span>
      </div>

      <div className="divide-y divide-white/5">
        {rows.map((row, i) => (
          <motion.div
            key={row.tool}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.35, delay: i * 0.08, ease: "easeOut" }}
            className={`grid grid-cols-1 sm:grid-cols-[1.2fr_1.4fr_1.4fr] gap-1 sm:gap-4 px-5 py-4 text-sm ${
              row.hero
                ? "relative bg-gradient-to-r from-purple-500/[0.08] via-violet-500/[0.06] to-pink-500/[0.08]"
                : ""
            }`}
          >
            {row.hero && (
              <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-purple-500 via-violet-500 to-pink-500" />
            )}

            <div className="flex items-center gap-2">
              {row.hero ? (
                <IconCheck size={14} className="text-pink-400 shrink-0" />
              ) : (
                <span className="w-[14px] shrink-0" />
              )}
              <span
                className={
                  row.hero
                    ? "font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-violet-300 to-pink-300"
                    : "text-white"
                }
              >
                {row.tool}
              </span>
            </div>

            <div className="text-neutral-400 sm:text-neutral-300 text-[13px] sm:text-sm pl-6 sm:pl-0 font-mono">
              {row.findsBy}
            </div>

            <div
              className={`pl-6 sm:pl-0 text-[13px] sm:text-sm ${
                row.hero ? "text-pink-300" : "text-neutral-400"
              }`}
            >
              {row.onRedesign}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
