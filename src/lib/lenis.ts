import type Lenis from "lenis";

// The single Lenis instance, owned by <SmoothScroll />. Anything that needs to
// drive the scroll position programmatically goes through here rather than
// touching window.scrollTo, so it can't fight the smooth-scroll loop.
let instance: Lenis | null = null;

export function setLenis(next: Lenis | null) {
  instance = next;
}

export function getLenis() {
  return instance;
}

// Scroll to an element by id. Falls back to native smooth scroll when Lenis
// isn't running -- reduced-motion users, or a click that lands before mount.
export function scrollToId(id: string, offset = 0) {
  const el = document.getElementById(id);
  if (!el) return;
  if (instance) instance.scrollTo(el, { offset });
  else el.scrollIntoView({ behavior: "smooth", block: "start" });
}
