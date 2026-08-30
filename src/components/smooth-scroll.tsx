"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { setLenis } from "@/lib/lenis";

// Lenis owns the scroll position for the whole site.
//
// It preventDefault()s wheel events, accumulates the deltas into a virtual
// target, and each frame eases the real scrollTop toward that target by
// 1 - exp(-lerp * 60 * dt) with the default lerp of 0.1. Because the output
// velocity is a function of the *remaining distance* and never of the input
// velocity, a gentle nudge and a hard trackpad flick produce the same decay
// curve -- the flick just travels further. That's the whole effect.
//
// Defaults are deliberately left alone. In particular syncTouch stays false so
// mobile keeps native iOS momentum instead of an emulated version of it.
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true, // Lenis drives its own rAF; nothing else to sync it with
      anchors: true, // href="#id" links get eased instead of jumping
      allowNestedScroll: true, // inner scrollers (code blocks) stay native
      autoToggle: true, // stops itself when the wrapper's overflow is hidden
    });

    setLenis(lenis);
    return () => {
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
