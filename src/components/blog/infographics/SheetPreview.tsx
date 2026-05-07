"use client";
import { motion } from "motion/react";

type Row = [string, string, string, string];

const headers = ["Timestamp", "Name", "Email", "Message"];
const cols = ["A", "B", "C", "D"];

const rows: Row[] = [
  [
    "2026-05-07 10:42",
    "Aarav Mehta",
    "aarav@studio.in",
    "Loved the X-Fathom extension — open to a chat?",
  ],
  [
    "2026-05-07 11:08",
    "Sara Lin",
    "sara@nimbus.dev",
    "Hiring for a creative FE role, you free this week?",
  ],
  [
    "2026-05-07 12:21",
    "Devon K.",
    "devon@orbital.app",
    "Need a polished portfolio rebuild. Budget ready.",
  ],
  [
    "2026-05-07 13:55",
    "Priya R.",
    "priya@fold.studio",
    "Quick question about your timeline section.",
  ],
];

export function SheetPreview() {
  return (
    <div className="my-10 rounded-2xl border border-white/10 bg-neutral-950 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
        <span className="w-2 h-2 rounded-full bg-red-400/70" />
        <span className="w-2 h-2 rounded-full bg-yellow-400/70" />
        <span className="w-2 h-2 rounded-full bg-green-400/70" />
        <span className="ml-3 text-[11px] font-mono text-neutral-500 truncate">
          contact-submissions · Google Sheets
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-[12px] sm:text-[13px] font-mono border-collapse">
          <thead>
            <tr className="bg-white/[0.03]">
              <th className="w-8 px-2 py-1.5 text-neutral-600 border-r border-b border-white/5 text-center">
                {""}
              </th>
              {cols.map((c) => (
                <th
                  key={c}
                  className="px-3 py-1.5 text-neutral-500 border-r border-b border-white/5 text-left font-normal"
                >
                  {c}
                </th>
              ))}
            </tr>
            <tr>
              <td className="px-2 py-2 text-neutral-600 bg-white/[0.03] border-r border-b border-white/5 text-center">
                1
              </td>
              {headers.map((h) => (
                <td
                  key={h}
                  className="px-3 py-2 text-pink-300 font-semibold border-r border-b border-white/5 whitespace-nowrap"
                >
                  {h}
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <motion.tr
                key={i}
                initial={{ opacity: 0, x: -16, backgroundColor: "rgba(168,85,247,0.18)" }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  backgroundColor: "rgba(168,85,247,0)",
                }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: 0.4 + i * 0.35,
                  ease: "easeOut",
                  backgroundColor: { duration: 1.2, delay: 0.4 + i * 0.35 + 0.3 },
                }}
              >
                <td className="px-2 py-2 text-neutral-600 bg-white/[0.03] border-r border-b border-white/5 text-center">
                  {i + 2}
                </td>
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className="px-3 py-2 text-neutral-300 border-r border-b border-white/5 whitespace-nowrap max-w-[260px] overflow-hidden text-ellipsis"
                  >
                    {cell}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-2 text-[10px] font-mono text-neutral-600 border-t border-white/5 bg-white/[0.02]">
        rows arrive in real time — no refresh, no webhook, no server
      </div>
    </div>
  );
}
