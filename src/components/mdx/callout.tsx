import type { ReactNode } from "react";

type CalloutType = "info" | "warning" | "tip";

interface CalloutProps {
  type?: CalloutType;
  children: ReactNode;
}

const styles: Record<CalloutType, string> = {
  info: "border-accent/40 bg-accent/5",
  warning: "border-yellow-500/40 bg-yellow-500/5",
  tip: "border-green-500/40 bg-green-500/5",
};

const icon: Record<CalloutType, string> = {
  info: "ℹ",
  warning: "⚠",
  tip: "💡",
};

export function Callout({ type = "info", children }: CalloutProps) {
  return (
    <div
      className={`border-l-3 pl-4 py-3 my-6 rounded-r-lg text-text-secondary text-sm leading-relaxed ${styles[type]}`}
    >
      <span className="mr-2 text-base align-middle">{icon[type]}</span>
      <span>{children}</span>
    </div>
  );
}
