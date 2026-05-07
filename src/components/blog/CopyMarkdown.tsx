"use client";
import { useState } from "react";
import { IconMarkdown, IconCheck } from "@tabler/icons-react";

export function CopyMarkdown({ source }: { source: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!source) return;
    try {
      await navigator.clipboard.writeText(source);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — fail silently
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Markdown copied" : "Copy post as Markdown"}
      title="Copy the raw Markdown — paste into ChatGPT, Claude, Cursor, etc."
      className="group inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/[0.06] px-3.5 py-1.5 text-xs font-mono text-purple-300 hover:bg-purple-500/[0.12] hover:border-purple-400/60 hover:text-white transition-all cursor-pointer"
    >
      {copied ? (
        <>
          <IconCheck size={14} className="text-green-400" />
          <span className="text-green-400">Copied — paste into your LLM</span>
        </>
      ) : (
        <>
          <IconMarkdown size={14} />
          <span>Copy as Markdown</span>
        </>
      )}
    </button>
  );
}
