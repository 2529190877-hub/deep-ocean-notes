interface TagProps {
  children: string;
  className?: string;
}

export function Tag({ children, className = "" }: TagProps) {
  return (
    <span
      className={`inline-block px-2.5 py-0.5 text-xs rounded-full bg-bg-tertiary text-text-secondary border border-bg-tertiary ${className}`}
    >
      {children}
    </span>
  );
}
