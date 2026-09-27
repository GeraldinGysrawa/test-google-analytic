"use client";

import { trackClick } from "@/lib/analytics";

type TrackedButtonProps = {
  children: React.ReactNode;
  className?: string;
  eventName?: string;
  eventLabel: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

export function TrackedButton({
  children,
  className,
  eventName = "button_click",
  eventLabel,
  type = "button",
  onClick,
}: TrackedButtonProps) {
  return (
    <button
      type={type}
      className={className}
      onClick={() => {
        trackClick(eventName, eventLabel);
        onClick?.();
      }}
    >
      {children}
    </button>
  );
}
