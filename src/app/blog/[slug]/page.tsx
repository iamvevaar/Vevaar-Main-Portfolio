import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import { IconArrowLeft } from "@tabler/icons-react";
import { getAllSlugs, getPostSource, getPostAgentSource } from "@/lib/blog";
import { mdxComponents } from "@/components/blog/mdx-components";
import { CopyMarkdown } from "@/components/blog/CopyMarkdown";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { Spotlight } from "@/components/ui/spotlight";

type Frontmatter = {
  title: string;
  description: string;
  date: string;
  readingTime?: string;
  tags?: string[];
};

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const source = getPostSource(slug);
  if (!source) return {};
  const { frontmatter } = await compileMDX<Frontmatter>({
    source,
    options: { parseFrontmatter: true },
  });
  return {
    title: `${frontmatter.title} | Vevaar Blog`,
    description: frontmatter.description,
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const source = getPostSource(slug);
  if (!source) notFound();

  const agentSource = getPostAgentSource(slug);

  const { content, frontmatter } = await compileMDX<Frontmatter>({
    source,
    components: mdxComponents,
    options: { parseFrontmatter: true },
  });

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <ReadingProgress />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-screen overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-60"
          fill="white"
        />
      </div>

      <article className="relative container mx-auto px-4 pt-16 sm:pt-24 pb-32 max-w-3xl">
        <div className="flex items-center justify-between gap-4 mb-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-mono text-neutral-500 hover:text-white transition-colors"
          >
            <IconArrowLeft size={16} />
            Back to blog
          </Link>
          {agentSource && <CopyMarkdown source={agentSource} />}
        </div>

        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-neutral-500 mb-5">
            <time>{frontmatter.date}</time>
            {frontmatter.readingTime && <span>·</span>}
            {frontmatter.readingTime && <span>{frontmatter.readingTime}</span>}
            {frontmatter.tags && frontmatter.tags.length > 0 && <span>·</span>}
            {frontmatter.tags?.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-400"
              >
                {t}
              </span>
            ))}
          </div>
          <h1 className="font-outfit text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05]">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-violet-400 to-pink-400">
              {frontmatter.title}
            </span>
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-neutral-400 leading-relaxed">
            {frontmatter.description}
          </p>
        </header>

        <div className="text-base sm:text-lg">{content}</div>
      </article>
    </div>
  );
}
