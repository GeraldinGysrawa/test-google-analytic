"use client";

import Link from "next/link";
import { trackClick } from "@/lib/analytics";

type TrackedLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  eventName?: string;
  eventLabel: string;
  target?: string;
  rel?: string;
};

export function TrackedLink({
  href,
  children,
  className,
  eventName = "nav_click",
  eventLabel,
  target,
  rel,
}: TrackedLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      target={target}
      rel={rel}
      onClick={() => trackClick(eventName, eventLabel)}
    >
      {children}
    </Link>
  );
}
