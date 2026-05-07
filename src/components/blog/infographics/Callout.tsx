import { ReactNode } from "react";
import { IconBulb, IconInfoCircle, IconAlertTriangle } from "@tabler/icons-react";

type Variant = "info" | "tip" | "warn";

const styles: Record<Variant, { border: string; icon: ReactNode }> = {
  info: {
    border: "border-blue-500/30 bg-blue-500/[0.04]",
    icon: <IconInfoCircle size={18} className="text-blue-400" />,
  },
  tip: {
    border: "border-purple-500/30 bg-purple-500/[0.04]",
    icon: <IconBulb size={18} className="text-purple-400" />,
  },
  warn: {
    border: "border-yellow-500/30 bg-yellow-500/[0.04]",
    icon: <IconAlertTriangle size={18} className="text-yellow-400" />,
  },
};

export function Callout({
  variant = "info",
  children,
}: {
  variant?: Variant;
  children: ReactNode;
}) {
  const s = styles[variant];
  return (
    <div className={`my-8 flex gap-3 rounded-2xl border p-4 text-sm leading-relaxed ${s.border}`}>
      <div className="shrink-0 mt-0.5">{s.icon}</div>
      <div className="flex-1 [&>p]:!my-0 text-neutral-300">{children}</div>
    </div>
  );
}
