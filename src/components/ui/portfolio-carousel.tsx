"use client";

import { useCallback, useEffect, useState, type ComponentProps } from "react";
import { motion } from "framer-motion";
import { PortfolioCard } from "./portfolio-card";

type Item = ComponentProps<typeof PortfolioCard>;

// Mobile carousel: one card at a time, auto-sliding, swipeable, with dots —
// same behaviour as the projects section.
export function PortfolioCarousel({
  items,
  startDelay = 0,
}: {
  items: Item[];
  startDelay?: number;
}) {
  const [index, setIndex] = useState(0);
  const count = items.length;

  const goTo = useCallback(
    (i: number) => setIndex(((i % count) + count) % count),
    [count]
  );
  const next = useCallback(() => setIndex((p) => (p + 1) % count), [count]);

  // Auto-advance. `startDelay` offsets the first tick so multiple carousels on
  // the page don't all slide in lockstep, then it settles into a steady 4.5s.
  useEffect(() => {
    if (count <= 1) return;
    let interval: ReturnType<typeof setInterval>;
    const timeout = setTimeout(() => {
      next();
      interval = setInterval(next, 4500);
    }, startDelay);
    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [next, count, startDelay]);

  if (count === 0) return null;

  return (
    <div className="w-full overflow-hidden">
      <motion.div
        className="flex"
        style={{ width: `${count * 100}%` }}
        animate={{ x: `-${(index * 100) / count}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        onDragEnd={(_, info) => {
          if (info.offset.x < -60) next();
          else if (info.offset.x > 60) goTo(index - 1);
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            style={{ width: `${100 / count}%` }}
            className="flex shrink-0 justify-center overflow-hidden px-2 py-2"
          >
            <PortfolioCard {...item} />
          </div>
        ))}
      </motion.div>

      {/* Dots */}
      <div className="mt-4 flex justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to item ${i + 1}`}
            aria-current={i === index}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index
                ? "w-6 bg-purple-500"
                : "w-2 bg-neutral-600 hover:bg-neutral-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
