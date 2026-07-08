"use client";

import { useEffect, useRef } from "react";
import { manifestoLines } from "@/data/landing";
import { prefersReducedMotion } from "@/lib/utils";

function words(value: string) {
  return value.split(" ").filter(Boolean);
}

export function ManifestoSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || prefersReducedMotion()) {
      return;
    }

    let cleanup: (() => void) | undefined;
    let active = true;

    async function runType() {
      const [{ gsap }, scrollModule] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      const { ScrollTrigger } = scrollModule;

      if (!active || !sectionRef.current) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        gsap.fromTo(
          "[data-manifesto-word]",
          {
            yPercent: 120,
            opacity: 0,
            filter: "blur(14px)",
            rotateX: -18,
          },
          {
            yPercent: 0,
            opacity: 1,
            filter: "blur(0px)",
            rotateX: 0,
            duration: 0.9,
            ease: "power4.out",
            stagger: 0.035,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 68%",
              once: true,
            },
          },
        );
      }, sectionRef.current);

      cleanup = () => ctx.revert();
    }

    void runType();

    return () => {
      active = false;
      cleanup?.();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pad relative overflow-hidden"
      aria-labelledby="manifesto-title"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet/30 to-transparent" />
      <div className="container-page">
        <p className="eyebrow mb-8 text-cyan">Manifesto</p>
        <div id="manifesto-title" className="space-y-8">
          {manifestoLines.map((line, index) => (
            <p
              key={line.lead}
              className="max-w-6xl font-display text-[clamp(3.4rem,8.8vw,9rem)] font-semibold leading-[0.86] tracking-[-0.065em] text-paper"
            >
              {[...words(line.lead), ...words(line.accent)].map((word, wordIndex) => {
                const isAccent = wordIndex >= words(line.lead).length;
                return (
                  <span
                    key={`${word}-${wordIndex}`}
                    className="inline-block overflow-hidden align-baseline"
                  >
                    <span
                      data-manifesto-word
                      className={
                        isAccent
                          ? index === 1
                            ? "nova-gradient-text type-scan mx-[0.08em] inline-block font-editorial"
                            : "nova-gradient-text mx-[0.08em] inline-block font-script text-[1.06em] leading-none"
                          : "mx-[0.08em] inline-block"
                      }
                    >
                      {word}
                    </span>
                  </span>
                );
              })}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
