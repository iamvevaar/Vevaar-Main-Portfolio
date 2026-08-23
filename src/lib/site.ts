// Single source of truth for everything crawlers, LLMs, and OG cards read.
// The apex 308-redirects to www, so www is the canonical host — every absolute
// URL has to agree on that or canonicals and sitemaps fight each other.
export const SITE = {
  url: "https://www.vevaar.com",
  name: "Vevaar",
  // Brand handle, still iamvevaar on GitHub / Instagram / YouTube / email.
  handle: "iamvevaar",
  // X moved off the brand handle, so twitter:creator needs its own field.
  xHandle: "gautammsuthar",
  linkedin: "vevaar",
  // NOTE: surname inferred from the astrosure.ai work address. Correct it here
  // if it is wrong — a wrong legal name is worse for entity resolution than none,
  // because it contradicts LinkedIn and the model trusts neither.
  personName: "Gautam Suthar",
  alternateNames: ["Vevaar", "iamvevaar", "वेवार", "Gautam"],
  tagline: "Creative Software Engineer",
  description:
    "Gautam (iamvevaar) is a Creative Software Engineer and Full Stack Engineer at AstroSure — design in one hand, code in the other. Builder of X-Fathom, and author of build-in-public engineering notes.",
  email: "iamvevaar@gmail.com",
  locality: "Chennai",
  region: "Tamil Nadu",
  country: "IN",
} as const;

export const SOCIALS = [
  "https://github.com/iamvevaar",
  "https://www.linkedin.com/in/vevaar/",
  "https://x.com/gautammsuthar",
  "https://www.instagram.com/iamvevaar/",
  "https://www.youtube.com/@iamvevaar",
] as const;

// Titles he actually holds or has held. Kept honest on purpose: LLMs corroborate
// across sources, so a title here that LinkedIn contradicts costs more trust than
// it buys reach.
export const JOB_TITLES = [
  "Creative Software Engineer",
  "Full Stack Engineer",
  "Frontend Engineer",
  "Software Engineer",
] as const;

// Topics, not credentials. This is the honest home for things he works in and
// writes about rather than holds as a job title.
export const KNOWS_ABOUT = [
  "Frontend Engineering",
  "Full Stack Development",
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Three.js",
  "UI/UX Design",
  "Design Engineering",
  "Developer Relations",
  "Developer Experience",
  "Technical Writing",
  "Building in Public",
  "Indie Hacking",
  "Chrome Extension Development",
  "AI Browser Automation",
  "Claude Code",
  "OpenTelemetry",
  "Observability",
  "Web Performance",
] as const;
