"use client";
import { motion } from "motion/react";

const steps = [
  {
    n: "01",
    label: "Install",
    code: "npm i next-mdx-remote gray-matter",
    note: "Two deps. That's the whole pipeline.",
  },
  {
    n: "02",
    label: "Folder",
    code: "content/blog/*.mdx",
    note: "Posts live in git, not a database.",
  },
  {
    n: "03",
    label: "Helper",
    code: "src/lib/blog.ts",
    note: "Reads files, parses frontmatter, exports list.",
  },
  {
    n: "04",
    label: "Routes",
    code: "/blog  +  /blog/[slug]",
    note: "Index page + dynamic post page.",
  },
];

export function InstallSteps() {
  return (
    <div className="my-8 rounded-2xl border border-white/10 bg-neutral-950 p-6">
      <div className="space-y-5">
        {steps.map((step, i) => (
          <motion.div
            key={step.n}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
            className="relative flex items-start gap-4"
          >
            {i < steps.length - 1 && (
              <motion.span
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 + 0.3 }}
                className="absolute left-[19px] top-10 w-px h-[calc(100%+8px)] bg-gradient-to-b from-purple-500/60 to-pink-500/20 origin-top"
              />
            )}
            <div className="relative shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-[11px] font-mono font-bold text-white shadow-lg shadow-purple-500/30">
              {step.n}
            </div>
            <div className="flex-1 min-w-0 pt-1">
              <div className="text-sm font-semibold text-white">{step.label}</div>
              <code className="block mt-1.5 text-xs text-pink-300 font-mono break-all">
                {step.code}
              </code>
              <p className="mt-1.5 text-xs text-neutral-500 leading-relaxed">
                {step.note}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
