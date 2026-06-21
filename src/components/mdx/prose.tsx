import type { ReactNode } from "react";

interface ProseProps {
  children: ReactNode;
  className?: string;
}

export function Prose({ children, className = "" }: ProseProps) {
  return (
    <div className={`prose ${className}`}>
      {children}
    </div>
  );
}
