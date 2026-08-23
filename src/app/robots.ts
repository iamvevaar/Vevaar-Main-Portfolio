import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// AI crawlers that respect robots.txt and are worth naming explicitly. Google
// treats an absent Google-Extended as allow, but stating it removes ambiguity —
// and several of these default to *deny* if they cannot find a matching rule.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "meta-externalagent",
  "CCBot",
  "cohere-ai",
  "DuckAssistBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /portfolio is still carrying placeholder items. Indexing thin or
        // borrowed content drags sitewide quality down, so it stays out until
        // it holds real work.
        disallow: ["/portfolio"],
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/portfolio"],
      })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
