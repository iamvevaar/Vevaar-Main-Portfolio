import { getAllSlugs, getPostAgentSource, hasAgentSource } from "@/lib/blog";

// Until now the agent markdown existed only behind a clipboard button, so no
// crawler or agent could ever reach it. This gives each companion a real URL,
// served as text/markdown so a fetching agent gets clean prose instead of the
// full React page.
export const dynamic = "force-static";

export async function generateStaticParams() {
  return getAllSlugs()
    .filter(hasAgentSource)
    .map((slug) => ({ slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const source = getPostAgentSource(slug);

  if (!source) {
    return new Response("No agent markdown for this post.\n", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  return new Response(source, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "X-Robots-Tag": "all",
    },
  });
}
