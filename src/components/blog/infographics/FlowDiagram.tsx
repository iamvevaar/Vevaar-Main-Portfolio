"use client";
import { motion } from "motion/react";
import {
  IconWorld,
  IconBolt,
  IconTable,
  IconArrowRight,
  IconArrowDown,
} from "@tabler/icons-react";
import type { ReactNode } from "react";

type Node = {
  label: string;
  sub: string;
  icon: ReactNode;
  accent: string;
};

const nodes: Node[] = [
  {
    label: "Browser",
    sub: "fetch( ... )",
    icon: <IconWorld size={22} />,
    accent: "from-purple-500/30 to-purple-500/5 border-purple-500/40",
  },
  {
    label: "Apps Script",
    sub: "doGet(e)",
    icon: <IconBolt size={22} />,
    accent: "from-violet-500/30 to-violet-500/5 border-violet-500/40",
  },
  {
    label: "Google Sheet",
    sub: "appendRow(...)",
    icon: <IconTable size={22} />,
    accent: "from-pink-500/30 to-pink-500/5 border-pink-500/40",
  },
];

export function FlowDiagram() {
  return (
    <div className="my-10 rounded-2xl border border-white/10 bg-neutral-950 p-6 sm:p-8">
      <div className="flex items-center gap-2 pb-5 mb-5 border-b border-white/5">
        <span className="w-2 h-2 rounded-full bg-red-400/70" />
        <span className="w-2 h-2 rounded-full bg-yellow-400/70" />
        <span className="w-2 h-2 rounded-full bg-green-400/70" />
        <span className="ml-3 text-[11px] text-neutral-500 uppercase tracking-widest">
          how a submission travels
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-2">
        {nodes.map((node, i) => (
          <div
            key={node.label}
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-2 flex-1 sm:flex-none sm:basis-0 sm:grow"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.25, ease: "easeOut" }}
              className={`relative w-full rounded-2xl border bg-gradient-to-br ${node.accent} p-4 text-center`}
            >
              <div className="flex justify-center mb-2 text-white">
                {node.icon}
              </div>
              <div className="text-sm font-semibold text-white">
                {node.label}
              </div>
              <div className="mt-1 text-[11px] font-mono text-neutral-400">
                {node.sub}
              </div>
            </motion.div>

            {i < nodes.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.25 + 0.2 }}
                className="flex sm:items-center justify-center text-neutral-500 shrink-0"
              >
                <IconArrowDown size={20} className="sm:hidden" />
                <IconArrowRight size={20} className="hidden sm:block" />
              </motion.div>
            )}
          </div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.9 }}
        className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] font-mono text-neutral-500"
      >
        <span>name · email · message · timestamp</span>
        <span className="text-neutral-600">→</span>
        <span>one new row, every time</span>
      </motion.div>
    </div>
  );
}
