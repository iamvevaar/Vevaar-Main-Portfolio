"use client";
import { motion } from "motion/react";
import { IconCheck, IconInfinity } from "@tabler/icons-react";

type Row = {
  service: string;
  bestFor: string;
  limit: string;
  hero?: boolean;
};

const rows: Row[] = [
  {
    service: "Web3Forms",
    bestFor: "Devs who want it simple",
    limit: "250 / month",
  },
  {
    service: "EmailJS",
    bestFor: "Sending email from the client",
    limit: "200 / month",
  },
  {
    service: "FormSubmit",
    bestFor: "Zero-account, zero-setup",
    limit: "Unlimited (basic)",
  },
  {
    service: "Formspree",
    bestFor: "Industry standard",
    limit: "50 / month",
  },
  {
    service: "Netlify Forms",
    bestFor: "Sites already on Netlify",
    limit: "100 / month",
  },
  {
    service: "Google Sheets + Apps Script",
    bestFor: "Owning your data, full control",
    limit: "Effectively unlimited",
    hero: true,
  },
];

export function ComparisonTable() {
  return (
    <div className="my-10 rounded-2xl border border-white/10 bg-neutral-950 overflow-hidden">
      <div className="hidden sm:grid grid-cols-[1.4fr_1.6fr_1fr] gap-4 px-5 py-3 border-b border-white/5 bg-white/[0.02] text-[10px] font-mono uppercase tracking-widest text-neutral-500">
        <span>Service</span>
        <span>Best for</span>
        <span className="text-right">Free tier</span>
      </div>

      <div className="divide-y divide-white/5">
        {rows.map((row, i) => (
          <motion.div
            key={row.service}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.35, delay: i * 0.06, ease: "easeOut" }}
            className={`grid grid-cols-1 sm:grid-cols-[1.4fr_1.6fr_1fr] gap-1 sm:gap-4 px-5 py-4 text-sm ${
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
                {row.service}
              </span>
            </div>

            <div className="text-neutral-400 sm:text-neutral-300 text-[13px] sm:text-sm pl-6 sm:pl-0">
              {row.bestFor}
            </div>

            <div className="pl-6 sm:pl-0 sm:text-right">
              {row.hero ? (
                <span className="inline-flex items-center gap-1 font-mono text-pink-300">
                  <IconInfinity size={16} className="shrink-0" />
                  <span>unlimited</span>
                </span>
              ) : (
                <span className="font-mono text-neutral-400 text-[13px]">
                  {row.limit}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
