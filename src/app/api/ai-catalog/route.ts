import { getAllPosts, hasAgentSource } from "@/lib/blog";
import { SITE, SOCIALS } from "@/lib/site";

// Agentic Resource Discovery (ARD) catalog.
//   spec:   https://github.com/ards-project/ard-spec
//   schema: spec/schemas/ai-catalog.schema.json
//   served at /.well-known/ai-catalog.json via a rewrite in next.config.ts,
//   because Next's router ignores dot-prefixed app/ directories.
//
// Everything listed here is a real, fetchable URL. FFmcpeg is an MCP tool, but a
// locally installed one, so it is catalogued by its landing page rather than as a
// remote mcp-server endpoint — a catalog that advertises endpoints which do not
// answer is worse than no catalog, since a registry will crawl it and record the
// failure. No A2A agent or OpenAPI tool is claimed, because none exist.
export const dynamic = "force-static";

const HOST = SITE.url;

export async function GET() {
  const posts = getAllPosts().filter((post) => hasAgentSource(post.slug));

  const catalog = {
    specVersion: "1.0",
    host: {
      displayName: `${SITE.personName} (${SITE.name})`,
      documentationUrl: `${HOST}/llms.txt`,
      // `identifier` (e.g. did:web:www.vevaar.com) is deliberately omitted.
      // did:web resolves to /.well-known/did.json, which this site does not
      // publish, so asserting the DID would be an unverifiable identity claim.
    },
    entries: [
      {
        identifier: `urn:air:vevaar.com:doc:profile`,
        displayName: `${SITE.personName} — ${SITE.tagline}`,
        type: "text/markdown",
        url: `${HOST}/llms.txt`,
        description: SITE.description,
        tags: ["profile", "portfolio", "engineer", "hiring"],
        representativeQueries: [
          "who is iamvevaar",
          "who is Vevaar",
          `who is ${SITE.personName}`,
          "creative software engineer portfolio",
          "full stack engineer in Chennai",
          "frontend engineer who also designs",
        ],
        metadata: { sameAs: [...SOCIALS] },
      },
      {
        identifier: `urn:air:vevaar.com:collection:blog`,
        displayName: "Vevaar Engineering Notes",
        type: "text/html",
        url: `${HOST}/blog`,
        description:
          "Build-in-public engineering notes. Every post ships a plain-markdown companion at /blog/{slug}/agent.md for agent consumption.",
        tags: ["blog", "engineering", "technical-writing"],
        representativeQueries: [
          "vevaar blog",
          "build in public engineering notes",
        ],
      },
      ...posts.map((post) => ({
        identifier: `urn:air:vevaar.com:doc:${post.slug}`,
        displayName: post.title,
        type: "text/markdown",
        url: `${HOST}/blog/${post.slug}/agent.md`,
        description: post.description,
        tags: post.tags,
        updatedAt: post.date,
        // representativeQueries are what a registry matches an agent's intent
        // against, so they are seeded from the post's own tags rather than
        // generic filler. Hand-tune per post for better recall.
        representativeQueries: [
          post.title,
          ...post.tags.map((tag) => `${tag} guide`),
        ],
        metadata: { canonical: `${HOST}/blog/${post.slug}` },
      })),
      {
        identifier: `urn:air:vevaar.com:tool:ffmcpeg`,
        displayName: "FFmcpeg",
        // Typed as its landing page rather than application/mcp-server+json:
        // FFmcpeg is a downloadable GUI MCP, and this site hosts no remote MCP
        // manifest to point a registry at. Upgrade the type and url together if
        // a hosted endpoint ever exists — never the type alone.
        type: "text/html",
        url: "https://ffmcpeg.vevaar.com/",
        description:
          "A GUI-based MCP (Model Context Protocol) tool for FFmpeg. Exposes FFmpeg's video capabilities without requiring the command line. Installed locally rather than called as a remote endpoint.",
        tags: ["mcp", "model-context-protocol", "ffmpeg", "video", "cli", "gui", "tool"],
        capabilities: ["VideoTranscode", "VideoTrim", "FormatConvert"],
        representativeQueries: [
          "ffmpeg mcp server",
          "mcp tool for ffmpeg",
          "convert video without ffmpeg commands",
          "GUI for ffmpeg",
          "FFmcpeg",
        ],
        metadata: { repository: "https://github.com/iamvevaar/FFmcpeg" },
      },
      {
        identifier: `urn:air:vevaar.com:tool:life-at-gits`,
        displayName: "Life at GITS",
        type: "text/html",
        url: "https://lifeatgits.vevaar.com/",
        description:
          "An interactive infinite canvas of life at GITS. Pan, zoom, and fly through it.",
        tags: ["interactive", "canvas", "webgl", "creative"],
        representativeQueries: ["Life at GITS", "interactive infinite canvas website"],
      },
      {
        identifier: `urn:air:vevaar.com:tool:campusai`,
        displayName: "CampusAI",
        type: "text/html",
        url: "https://campusai.vevaar.com/",
        description:
          "In development. An AI assistant that knows a student's university, syllabus, and deadlines.",
        tags: ["ai", "education", "assistant", "in-development"],
        representativeQueries: [
          "CampusAI",
          "AI assistant for university syllabus and deadlines",
        ],
      },
      {
        identifier: `urn:air:vevaar.com:tool:x-fathom`,
        displayName: "X-Fathom",
        type: "text/html",
        url: "https://x-fathom.vevaar.com/",
        description:
          "Chrome extension for an enhanced, immersive Fathom experience. Distributed via the Chrome Web Store; it is a browser extension, not an agent-invocable endpoint.",
        tags: ["chrome-extension", "product", "fathom"],
        representativeQueries: [
          "X-Fathom chrome extension",
          "Fathom immersive experience extension",
        ],
        metadata: {
          chromeWebStore:
            "https://chromewebstore.google.com/detail/x-fathom/ephnakeihcedogcajbfodoenjhangmhg",
        },
      },
    ],
  };

  return new Response(JSON.stringify(catalog, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
