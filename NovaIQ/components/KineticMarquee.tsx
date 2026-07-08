"use client";

import { useEffect, useRef } from "react";
import { marqueeLines } from "@/data/landing";
import { prefersReducedMotion } from "@/lib/utils";

export function KineticMarquee() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || prefersReducedMotion()) {
      return;
    }

    let cleanup: (() => void) | undefined;
    let active = true;

    async function animateMarquee() {
      const [{ gsap }, scrollModule] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      const { ScrollTrigger } = scrollModule;

      if (!active || !sectionRef.current) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);
      const currentSection = sectionRef.current;
      const mm = gsap.matchMedia();
      const ctx = gsap.context(() => {
        mm.add("(min-width: 768px)", () => {
          rowRefs.current.forEach((row, index) => {
            if (!row) {
              return;
            }

            gsap.fromTo(
              row,
              { xPercent: index % 2 === 0 ? -4 : -18 },
              {
                xPercent: index % 2 === 0 ? -20 : 0,
                ease: "none",
                scrollTrigger: {
                  trigger: currentSection,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.65,
                  invalidateOnRefresh: true,
                },
              },
            );
          });
        });
      }, currentSection);

      cleanup = () => {
        mm.revert();
        ctx.revert();
      };
    }

    void animateMarquee();

    return () => {
      active = false;
      cleanup?.();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-y border-white/10 bg-paper py-6 text-ink sm:py-8"
      aria-label="NovaIQ Content Operations Signalband"
    >
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,6,0.08),transparent_20%,transparent_80%,rgba(5,5,6,0.08))]" />
      <div className="relative space-y-2">
        {marqueeLines.map((line, rowIndex) => (
          <div
            key={line.join("-")}
            ref={(node) => {
              rowRefs.current[rowIndex] = node;
            }}
            className="flex w-max items-center gap-4 whitespace-nowrap will-change-transform"
          >
            {Array.from({ length: 4 }).map((_, repeatIndex) => (
              <div
                key={`${rowIndex}-${repeatIndex}`}
                className="flex items-center gap-4"
                aria-hidden={repeatIndex > 0}
              >
                {line.map((item) => (
                  <span
                    key={`${item}-${repeatIndex}`}
                    className="font-display text-[3.15rem] font-semibold leading-none tracking-normal sm:text-[5.4rem] lg:text-[7rem]"
                  >
                    {item}
                    <span className="mx-4 inline-block h-4 w-4 rounded-full bg-ink align-middle sm:mx-7 sm:h-5 sm:w-5" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
