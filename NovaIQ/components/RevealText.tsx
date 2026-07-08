"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useEffect, useRef } from "react";
import { cn, prefersReducedMotion } from "@/lib/utils";

type RevealTextProps = {
  as?: "h1" | "h2" | "h3" | "p" | "div" | "span";
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
} & Omit<HTMLAttributes<HTMLElement>, "children" | "className">;

export function RevealText({
  as = "div",
  children,
  className,
  delay = 0,
  id,
  ...props
}: RevealTextProps) {
  const ref = useRef<HTMLElement | null>(null);
  const Tag = as;

  useEffect(() => {
    const element = ref.current;

    if (!element || prefersReducedMotion()) {
      return;
    }

    let cleanup: (() => void) | undefined;
    let active = true;

    async function runReveal() {
      const [{ gsap }, scrollModule] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      const { ScrollTrigger } = scrollModule;

      if (!active || !ref.current) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);
      const target = ref.current.querySelector(".reveal-target") ?? ref.current;
      const ctx = gsap.context(() => {
        gsap.fromTo(
          target,
          {
            yPercent: 115,
            opacity: 0,
            filter: "blur(14px)",
            rotateX: -12,
          },
          {
            yPercent: 0,
            opacity: 1,
            filter: "blur(0px)",
            rotateX: 0,
            duration: 1.05,
            delay,
            ease: "power4.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 82%",
              once: true,
            },
          },
        );
      }, ref.current);

      cleanup = () => ctx.revert();
    }

    void runReveal();

    return () => {
      active = false;
      cleanup?.();
    };
  }, [delay]);

  return (
    <Tag
      ref={(node) => {
        ref.current = node;
      }}
      id={id}
      className={cn("reveal-mask", className)}
      {...props}
    >
      <span className="reveal-target block">{children}</span>
    </Tag>
  );
}
