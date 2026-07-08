"use client";

import { useEffect, useRef, useState } from "react";
import { industryUseCases } from "@/data/landing";
import { RevealText } from "@/components/RevealText";
import { cn, prefersReducedMotion } from "@/lib/utils";

export function IndustrySwitcher() {
  const [active, setActive] = useState(0);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const current = industryUseCases[active];

  useEffect(() => {
    const panel = panelRef.current;

    if (!panel || prefersReducedMotion()) {
      return;
    }

    let cleanup: (() => void) | undefined;
    let activeRun = true;

    async function animatePanel() {
      const { gsap } = await import("gsap");

      if (!activeRun || !panelRef.current) {
        return;
      }

      const ctx = gsap.context(() => {
        gsap.fromTo(
          "[data-case-panel]",
          { y: 18, opacity: 0, filter: "blur(8px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.55,
            ease: "power3.out",
          },
        );
      }, panelRef.current);

      cleanup = () => ctx.revert();
    }

    void animatePanel();

    return () => {
      activeRun = false;
      cleanup?.();
    };
  }, [active]);

  return (
    <section
      id="cases"
      className="section-pad relative overflow-hidden bg-[linear-gradient(180deg,rgba(17,24,39,0.34),rgba(7,8,13,0.72))]"
      aria-labelledby="cases-title"
    >
      <div className="nova-orb -right-28 top-20 size-80 bg-cyan/14" />
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <RevealText as="p" className="eyebrow mb-5 text-cyan">
              Use Cases
            </RevealText>
            <RevealText
              as="h2"
              id="cases-title"
              className="section-title max-w-3xl text-paper"
            >
              Eine Engine. Unterschiedliche Unternehmensrealitäten.
            </RevealText>
          </div>
          <p className="max-w-xl text-lg leading-8 text-muted lg:justify-self-end">
            NovaIQ übersetzt Signale je nach Branche, Kanal und Zielgruppe. Der
            Workflow bleibt kontrolliert, der Output wird konkreter.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-[18rem_1fr]">
          <div className="grid gap-2">
            {industryUseCases.map((item, index) => (
              <button
                key={item.industry}
                type="button"
                onClick={() => setActive(index)}
                className={cn(
                  "rounded-[18px] border px-4 py-4 text-left transition duration-300",
                  active === index
                    ? "border-cyan/35 bg-cyan/[0.08] text-paper"
                    : "border-white/10 bg-white/[0.04] text-muted hover:border-white/20 hover:text-paper",
                )}
              >
                <span className="text-sm font-bold uppercase tracking-[0.08em]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-2 block text-xl font-semibold">
                  {item.industry}
                </span>
              </button>
            ))}
          </div>

          <div ref={panelRef} className="nova-card rounded-[28px] p-4 sm:p-6">
            <div
              key={current.industry}
              data-case-panel
              className="grid gap-5 lg:grid-cols-[1fr_18rem]"
            >
              <div className="rounded-[22px] border border-white/10 bg-ink/72 p-5 sm:p-7">
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-cyan">
                  {current.signal}
                </p>
                <h3 className="mt-5 max-w-2xl text-4xl font-semibold leading-none tracking-[-0.05em] text-paper sm:text-6xl">
                  {current.title}
                </h3>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
                  {current.copy}
                </p>
              </div>

              <div className="rounded-[22px] border border-white/10 bg-[linear-gradient(145deg,rgba(124,58,237,0.18),rgba(34,211,238,0.08))] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-muted">
                  Output
                </p>
                <p className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-paper">
                  {current.output}
                </p>
                <div className="mt-7 space-y-3">
                  {["Signal erkannt", "Post vorbereitet", "Freigabe offen"].map(
                    (label, index) => (
                      <div
                        key={label}
                        className="flex items-center justify-between rounded-[14px] border border-white/10 bg-ink/50 px-3 py-3"
                      >
                        <span className="text-sm text-muted">{label}</span>
                        <span
                          className={cn(
                            "size-2.5 rounded-full",
                            index < 2 ? "bg-acid" : "bg-cyan",
                          )}
                        />
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
