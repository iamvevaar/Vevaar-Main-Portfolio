import { FileTree } from "./infographics/FileTree";
import { InstallSteps } from "./infographics/InstallSteps";
import { StatCounter } from "./infographics/StatCounter";
import { Callout } from "./infographics/Callout";
import { ComparisonTable } from "./infographics/ComparisonTable";
import { FlowDiagram } from "./infographics/FlowDiagram";
import { SheetPreview } from "./infographics/SheetPreview";
import { ClaudeFlowDiagram } from "./infographics/ClaudeFlowDiagram";
import { DashboardPreview } from "./infographics/DashboardPreview";
import { SigNozInstallSteps } from "./infographics/SigNozInstallSteps";
import { CodeBlock } from "./CodeBlock";

export const mdxComponents = {
  h1: (props: any) => (
    <h1
      {...props}
      className="text-4xl sm:text-5xl font-bold text-white mt-12 mb-6 font-outfit leading-tight"
    />
  ),
  h2: (props: any) => (
    <h2
      {...props}
      className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-4 pb-2 border-b border-white/10 font-outfit"
    />
  ),
  h3: (props: any) => (
    <h3
      {...props}
      className="text-xl font-semibold text-white mt-8 mb-3 font-outfit"
    />
  ),
  p: (props: any) => (
    <p {...props} className="text-neutral-300 leading-relaxed my-5" />
  ),
  a: ({ href = "", ...props }: any) => {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    return (
      <a
        href={href}
        {...props}
        {...(isInternal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
        className="text-pink-400 hover:text-pink-300 underline underline-offset-4 decoration-pink-500/40 hover:decoration-pink-300"
      />
    );
  },
  ul: (props: any) => (
    <ul
      {...props}
      className="list-disc list-outside ml-6 my-5 text-neutral-300 space-y-2 marker:text-pink-500/60"
    />
  ),
  ol: (props: any) => (
    <ol
      {...props}
      className="list-decimal list-outside ml-6 my-5 text-neutral-300 space-y-2 marker:text-pink-500/60"
    />
  ),
  li: (props: any) => <li {...props} className="leading-relaxed pl-1" />,
  blockquote: (props: any) => (
    <blockquote
      {...props}
      className="border-l-2 border-pink-500/60 pl-5 my-8 italic text-neutral-400"
    />
  ),
  code: (props: any) => (
    <code
      {...props}
      className="bg-white/[0.06] text-pink-300 px-1.5 py-0.5 rounded text-[0.9em] font-mono"
    />
  ),
  pre: (props: any) => <CodeBlock {...props} />,
  hr: () => <hr className="my-12 border-white/10" />,
  strong: (props: any) => (
    <strong {...props} className="font-semibold text-white" />
  ),
  FileTree,
  InstallSteps,
  StatCounter,
  Callout,
  ComparisonTable,
  FlowDiagram,
  SheetPreview,
  ClaudeFlowDiagram,
  DashboardPreview,
  SigNozInstallSteps,
};
