"use client";
import { motion } from "motion/react";
import {
  IconFolderFilled,
  IconFile,
  IconBrandReact,
  IconMarkdown,
} from "@tabler/icons-react";

type Node = {
  depth: number;
  name: string;
  kind: "folder" | "tsx" | "ts" | "mdx";
  highlight?: boolean;
};

const tree: Node[] = [
  { depth: 0, name: "vevaar-portfolio/", kind: "folder" },
  { depth: 1, name: "content/", kind: "folder" },
  { depth: 2, name: "blog/", kind: "folder" },
  { depth: 3, name: "scaffolding-mdx-blog.mdx", kind: "mdx", highlight: true },
  { depth: 1, name: "src/", kind: "folder" },
  { depth: 2, name: "app/blog/", kind: "folder" },
  { depth: 3, name: "page.tsx", kind: "tsx" },
  { depth: 3, name: "[slug]/page.tsx", kind: "tsx" },
  { depth: 2, name: "components/blog/", kind: "folder" },
  { depth: 3, name: "mdx-components.tsx", kind: "tsx" },
  { depth: 3, name: "infographics/", kind: "folder" },
  { depth: 4, name: "FileTree.tsx", kind: "tsx" },
  { depth: 4, name: "InstallSteps.tsx", kind: "tsx" },
  { depth: 4, name: "StatCounter.tsx", kind: "tsx" },
  { depth: 4, name: "Callout.tsx", kind: "tsx" },
  { depth: 2, name: "lib/blog.ts", kind: "ts" },
];

function Icon({ kind }: { kind: Node["kind"] }) {
  const cls = "shrink-0";
  if (kind === "folder") return <IconFolderFilled size={15} className={`${cls} text-purple-400/80`} />;
  if (kind === "mdx") return <IconMarkdown size={15} className={`${cls} text-pink-400`} />;
  if (kind === "tsx") return <IconBrandReact size={15} className={`${cls} text-cyan-400/80`} />;
  return <IconFile size={15} className={`${cls} text-neutral-500`} />;
}

export function FileTree() {
  return (
    <div className="my-8 rounded-2xl border border-white/10 bg-neutral-950 p-5 font-mono text-[13px] overflow-x-auto">
      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-white/5">
        <span className="w-2 h-2 rounded-full bg-red-400/70" />
        <span className="w-2 h-2 rounded-full bg-yellow-400/70" />
        <span className="w-2 h-2 rounded-full bg-green-400/70" />
        <span className="ml-3 text-[11px] text-neutral-500 uppercase tracking-widest">
          project structure
        </span>
      </div>
      <div className="space-y-1">
        {tree.map((node, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.35, delay: i * 0.04, ease: "easeOut" }}
            className="flex items-center gap-2"
            style={{ paddingLeft: `${node.depth * 18}px` }}
          >
            <Icon kind={node.kind} />
            <span
              className={
                node.highlight
                  ? "bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-violet-400 to-pink-400 font-semibold"
                  : "text-neutral-300"
              }
            >
              {node.name}
            </span>
            {node.highlight && (
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1, duration: 0.4 }}
                className="ml-2 text-[10px] uppercase tracking-widest text-pink-400/70"
              >
                ← you are here
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
