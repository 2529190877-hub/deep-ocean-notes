"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";

type LinkProps = ComponentProps<typeof NextLink> & {
  underline?: boolean;
};

export function Link({
  children,
  className = "",
  underline = true,
  ...props
}: LinkProps) {
  return (
    <NextLink
      className={`relative inline-block text-accent transition-colors duration-300 hover:text-accent-glow group ${className}`}
      {...props}
    >
      {children}
      {underline && (
        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent-glow transition-all duration-300 group-hover:w-full" />
      )}
    </NextLink>
  );
}
