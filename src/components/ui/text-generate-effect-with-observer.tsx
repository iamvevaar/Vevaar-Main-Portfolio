"use client";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { TextGenerateEffect } from "./text-generate-effect";

export const TextGenerateEffectWithObserver = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [ref, isInView] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <div ref={ref}>
      {isInView ? (
        <TextGenerateEffect
          words={words}
          className={className}
          filter={filter}
          duration={duration}
        />
      ) : (
        <div className="dark:text-white text-black opacity-0">{words}</div>
      )}
    </div>
  );
};