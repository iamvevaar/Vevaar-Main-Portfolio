import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { Spotlight } from "@/components/ui/spotlight";
import { IconArrowUpRight } from "@tabler/icons-react";

export const metadata: Metadata = {
  title: "Blog | Vevaar",
  description:
    "Build-in-public notes on engineering, design, and the in-between.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-screen overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-60"
          fill="white"
        />
      </div>

      <div className="relative container mx-auto px-4 pt-20 sm:pt-28 pb-32 max-w-4xl">
        <p className="text-xs sm:text-sm uppercase tracking-[0.3em] font-mono text-neutral-500 mb-6">
          Build in public
        </p>
        <h1 className="font-outfit text-4xl sm:text-6xl leading-[1.1]">
          <span className="text-white">Notes from the desk.</span>
          <span className="block mt-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500">
            Code, design, and the in-between.
          </span>
        </h1>

        <div className="mt-16 flex flex-col gap-4">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group rounded-2xl border border-white/10 bg-neutral-950/60 p-6 sm:p-8 hover:border-white/20 hover:bg-neutral-950 transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-purple-500/10"
            >
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-neutral-500">
                <time>{p.date}</time>
                {p.readingTime && <span>·</span>}
                {p.readingTime && <span>{p.readingTime}</span>}
                {p.tags.length > 0 && <span>·</span>}
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-white font-outfit group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:via-violet-400 group-hover:to-pink-400 transition-all">
                {p.title}
              </h2>
              <p className="mt-3 text-neutral-400 leading-relaxed">
                {p.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-mono text-pink-400 group-hover:gap-3 transition-all">
                Read post <IconArrowUpRight size={16} />
              </span>
            </Link>
          ))}
          {posts.length === 0 && (
            <p className="text-neutral-500 font-mono text-sm">
              No posts yet. Soon.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
