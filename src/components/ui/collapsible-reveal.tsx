"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { IconPlus } from "@tabler/icons-react";

/**
 * Wraps a block of content and clamps it to a fixed height while collapsed,
 * fading + blurring the overflow at the bottom. A round "+" control (bottom
 * right) expands it to full height and turns into an "×" to collapse again.
 *
 * The wrapped content is untouched — same bullets, same styling — this only
 * controls how much of it is visible.
 */
export function CollapsibleReveal({
  children,
  collapsedHeight = 150,
}: {
  children: React.ReactNode;
  collapsedHeight?: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative mb-8">
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : collapsedHeight }}
        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        className="overflow-hidden"
      >
        {children}
      </motion.div>

      {/* Fade + blur veil over the clipped overflow while collapsed */}
      {!open && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-transparent" />
          <div className="absolute inset-0 backdrop-blur-[3px] [mask-image:linear-gradient(to_top,black_35%,transparent)]" />
        </div>
      )}

      {/* Expand / collapse control */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Show less" : "Show more"}
        className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-purple-400/60 hover:text-purple-300"
      >
        <IconPlus
          className={`h-3.5 w-3.5 transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        />
        {open ? "Show less" : "Show more"}
      </button>
    </div>
  );
}
