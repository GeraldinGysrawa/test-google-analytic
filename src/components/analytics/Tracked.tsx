"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { trackClick } from "@/lib/analytics";

type TrackedButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  eventName: string;
  eventLabel: string;
  children: ReactNode;
};

export function TrackedButton({
  eventName,
  eventLabel,
  onClick,
  children,
  ...props
}: TrackedButtonProps) {
  return (
    <button
      {...props}
      onClick={(e) => {
        trackClick(eventName, eventLabel);
        onClick?.(e);
      }}
    >
      {children}
    </button>
  );
}

type TrackedAnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  eventName: string;
  eventLabel: string;
  children: ReactNode;
};

export function TrackedAnchor({
  eventName,
  eventLabel,
  onClick,
  children,
  ...props
}: TrackedAnchorProps) {
  return (
    <a
      {...props}
      onClick={(e) => {
        trackClick(eventName, eventLabel);
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
