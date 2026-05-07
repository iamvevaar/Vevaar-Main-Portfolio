"use client";
import { useRef, useState } from "react";
import { IconCopy, IconCheck } from "@tabler/icons-react";

export function CodeBlock(props: any) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = ref.current?.textContent ?? "";
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard unavailable (insecure context, etc.) — fail silently
    }
  };

  return (
    <div className="relative my-6">
      <pre
        ref={ref}
        {...props}
        className="bg-neutral-950 border border-white/10 rounded-xl p-4 pr-20 overflow-x-auto text-sm font-mono leading-relaxed [&_code]:!bg-transparent [&_code]:!p-0 [&_code]:!text-neutral-300"
      />
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Copied" : "Copy code"}
        className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-neutral-900/80 backdrop-blur-sm px-2.5 py-1.5 text-[11px] font-mono text-neutral-400 hover:text-white hover:border-white/20 transition-colors cursor-pointer"
      >
        {copied ? (
          <>
            <IconCheck size={12} className="text-green-400" />
            <span className="text-green-400">Copied</span>
          </>
        ) : (
          <>
            <IconCopy size={12} />
            <span>Copy</span>
          </>
        )}
      </button>
    </div>
  );
}
