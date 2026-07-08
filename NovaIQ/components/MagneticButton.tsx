"use client";

import type { AnchorHTMLAttributes, PointerEvent, ReactNode } from "react";
import { useRef } from "react";
import { cn, prefersReducedMotion } from "@/lib/utils";

type MagneticButtonProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const variants = {
  primary:
    "border border-cyan/25 bg-[linear-gradient(135deg,#7C3AED_0%,#22D3EE_100%)] text-paper shadow-[0_18px_70px_rgba(34,211,238,0.28)] hover:scale-[1.025] hover:shadow-[0_20px_90px_rgba(124,58,237,0.34)]",
  secondary:
    "border border-white/14 bg-white/[0.055] text-paper backdrop-blur-md hover:border-cyan/40 hover:bg-white/[0.09]",
  ghost: "text-paper hover:bg-white/[0.065] hover:text-cyan",
};

export function MagneticButton({
  children,
  href,
  variant = "primary",
  className,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  function handlePointerMove(event: PointerEvent<HTMLAnchorElement>) {
    const element = ref.current;

    if (!element || prefersReducedMotion()) {
      return;
    }

    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const moveX = (x - rect.width / 2) * 0.16;
    const moveY = (y - rect.height / 2) * 0.2;

    element.style.setProperty("--mx", `${x}px`);
    element.style.setProperty("--my", `${y}px`);
    element.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
  }

  function handlePointerLeave() {
    const element = ref.current;

    if (!element) {
      return;
    }

    element.style.transform = "translate3d(0, 0, 0)";
  }

  return (
    <a
      ref={ref}
      href={href}
      className={cn("magnetic-button", variants[variant], className)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      {...props}
    >
      <span className="shrink-0">{children}</span>
      <span
        aria-hidden="true"
        className="grid size-7 place-items-center rounded-full border border-current/20"
      >
        <span className="h-px w-3 bg-current" />
      </span>
    </a>
  );
}
