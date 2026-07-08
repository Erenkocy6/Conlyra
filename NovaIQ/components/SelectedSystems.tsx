"use client";

import { useEffect, useRef, useState } from "react";
import { RevealText } from "@/components/RevealText";
import { selectedSystems } from "@/data/landing";
import { cn, prefersReducedMotion } from "@/lib/utils";

const outputSteps = ["Signal erkannt", "Draft gebaut", "Review wartet"];

export function SelectedSystems() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const activeSystem = selectedSystems[active];

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || prefersReducedMotion()) {
      return;
    }

    let cleanup: (() => void) | undefined;
    let activeRun = true;

    async function animateRows() {
      const [{ gsap }, scrollModule] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      const { ScrollTrigger } = scrollModule;

      if (!activeRun || !sectionRef.current) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);
      const currentSection = sectionRef.current;

      const ctx = gsap.context(() => {
        const rows = gsap.utils.toArray<HTMLElement>("[data-selected-row]");

        gsap.fromTo(
          rows,
          { y: 42, autoAlpha: 0, filter: "blur(10px)" },
          {
            y: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power4.out",
            stagger: 0.075,
            scrollTrigger: {
              trigger: currentSection,
              start: "top 68%",
              once: true,
            },
          },
        );

        rows.forEach((row, index) => {
          ScrollTrigger.create({
            trigger: row,
            start: "top 46%",
            end: "bottom 46%",
            onEnter: () => setActive((current) => (current === index ? current : index)),
            onEnterBack: () =>
              setActive((current) => (current === index ? current : index)),
          });
        });
      }, currentSection);

      cleanup = () => ctx.revert();
    }

    void animateRows();

    return () => {
      activeRun = false;
      cleanup?.();
    };
  }, []);

  useEffect(() => {
    const preview = previewRef.current;

    if (!preview || prefersReducedMotion()) {
      return;
    }

    let cleanup: (() => void) | undefined;
    let activeRun = true;

    async function animatePreview() {
      const { gsap } = await import("gsap");

      if (!activeRun || !previewRef.current) {
        return;
      }

      const ctx = gsap.context(() => {
        gsap.fromTo(
          "[data-selected-layer]",
          {
            y: 28,
            opacity: 0,
            filter: "blur(12px)",
            rotateX: -8,
          },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            rotateX: 0,
            duration: 0.72,
            ease: "power4.out",
            stagger: 0.06,
          },
        );
      }, previewRef.current);

      cleanup = () => ctx.revert();
    }

    void animatePreview();

    return () => {
      activeRun = false;
      cleanup?.();
    };
  }, [active]);

  return (
    <section
      id="selected-systems"
      ref={sectionRef}
      className="section-pad relative isolate overflow-hidden border-y border-white/10 bg-[linear-gradient(180deg,rgba(248,250,252,0.965),rgba(226,232,240,0.92))] text-ink"
      aria-labelledby="selected-systems-title"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(7,8,13,0.08),transparent_18%,transparent_82%,rgba(7,8,13,0.1))]" />
      <div className="pointer-events-none absolute left-[-12rem] top-[-16rem] size-[36rem] rounded-full bg-cyan/18 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-18rem] right-[-12rem] size-[38rem] rounded-full bg-violet/16 blur-3xl" />

      <div className="container-page relative">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <RevealText as="p" className="eyebrow mb-5 text-ink/56">
              Selected Systems
            </RevealText>
            <RevealText
              as="h2"
              id="selected-systems-title"
              className="max-w-5xl font-display text-[clamp(4.2rem,9.4vw,10.5rem)] font-semibold leading-[0.78] tracking-[-0.075em] text-ink"
            >
              Content, der wie ein System arbeitet.
            </RevealText>
          </div>
          <p className="max-w-xl text-lg leading-8 text-ink/66 lg:justify-self-end">
            Vier typische NovaIQ-Setups als Rundgang: Signal rein, Kontext
            verstanden, kanalgenauer Output vorbereitet. Jede Zeile öffnet eine
            andere Content-Maschine.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(26rem,0.92fr)] lg:items-start">
          <div className="border-t border-ink/18">
            {selectedSystems.map((system, index) => {
              const isActive = active === index;

              return (
                <article
                  key={system.name}
                  data-selected-row
                  data-cursor-label="View"
                  className={cn(
                    "group border-b border-ink/18 transition-colors duration-500",
                    isActive ? "bg-ink/[0.035]" : "hover:bg-ink/[0.025]",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    onMouseEnter={() => setActive(index)}
                    aria-expanded={isActive}
                    data-cursor-label={isActive ? "Open" : "View"}
                    className="grid w-full gap-5 px-0 py-7 text-left sm:grid-cols-[4.5rem_1fr_auto] sm:items-start sm:gap-6 lg:py-9"
                  >
                    <span className="font-editorial text-5xl leading-none tracking-[-0.08em] text-ink/26 transition-colors duration-500 group-hover:text-cyan sm:text-6xl">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span>
                      <span className="block max-w-4xl font-display text-[clamp(2.45rem,6.6vw,5.8rem)] font-semibold leading-[0.86] tracking-[-0.065em] text-ink">
                        {system.name}
                      </span>
                      <span className="mt-5 flex flex-wrap gap-2">
                        {system.tags.map((tag) => (
                          <span
                            key={tag}
                            className={cn(
                              "border px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] transition-colors duration-500",
                              isActive
                                ? "border-cyan/45 bg-cyan/10 text-ink"
                                : "border-ink/14 text-ink/50",
                            )}
                          >
                            {tag}
                          </span>
                        ))}
                      </span>
                    </span>

                    <span
                      className={cn(
                        "w-fit border px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] transition duration-500",
                        isActive
                          ? "border-ink bg-ink text-paper"
                          : "border-ink/18 text-ink/54 group-hover:border-cyan/45 group-hover:text-ink",
                      )}
                    >
                      {isActive ? "( View - )" : "( View + )"}
                    </span>
                  </button>

                  <div
                    className={cn(
                      "grid overflow-hidden transition-[grid-template-rows,opacity] duration-500 ease-cinematic",
                      isActive
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="min-h-0">
                      <p className="max-w-2xl pb-7 pl-0 text-base leading-7 text-ink/62 sm:pl-[6rem]">
                        {system.copy}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="lg:sticky lg:top-28">
            <div
              ref={previewRef}
              key={activeSystem.name}
              className="relative min-h-[34rem] overflow-hidden border border-ink/14 bg-ink text-paper shadow-[0_34px_120px_rgba(7,8,13,0.28)]"
            >
              <div className="nova-grid absolute inset-0 opacity-45" />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-6 top-8 max-w-[9ch] font-display text-[clamp(5rem,12vw,10rem)] font-semibold leading-[0.78] tracking-[-0.08em] text-white/[0.045]"
              >
                {activeSystem.name.split(" ")[0]}
              </div>
              <div className="pointer-events-none absolute right-[-8rem] top-[-8rem] size-80 rounded-full bg-cyan/18 blur-3xl" />
              <div className="pointer-events-none absolute bottom-[-8rem] left-[-8rem] size-80 rounded-full bg-violet/22 blur-3xl" />

              <div className="relative z-10 flex min-h-[34rem] flex-col justify-between p-5 sm:p-7">
                <div data-selected-layer className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.08em] text-cyan">
                      Live Setup / 0{active + 1}
                    </p>
                    <h3 className="mt-4 max-w-md text-4xl font-semibold leading-none tracking-[-0.05em] text-paper sm:text-6xl">
                      {activeSystem.output}
                    </h3>
                  </div>
                  <span className="border border-acid/25 bg-acid/[0.1] px-3 py-1.5 text-xs font-bold uppercase text-acid">
                    gated
                  </span>
                </div>

                <div className="mt-10 grid gap-4">
                  <div
                    data-selected-layer
                    className="border border-white/10 bg-white/[0.055] p-4 sm:p-5"
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.08em] text-paper/42">
                      Source Signal
                    </p>
                    <p className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.035em] text-paper">
                      {activeSystem.signal}
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-[1.15fr_0.85fr]">
                    <div
                      data-selected-layer
                      className="min-h-[12rem] border border-white/10 bg-[linear-gradient(145deg,rgba(30,41,59,0.72),rgba(17,24,39,0.72))] p-4 sm:p-5"
                    >
                      <p className="text-xs font-bold uppercase tracking-[0.08em] text-paper/42">
                        Draft Angle
                      </p>
                      <p className="mt-4 text-lg leading-7 text-paper/72">
                        {activeSystem.copy}
                      </p>
                    </div>

                    <div data-selected-layer className="grid gap-3">
                      {outputSteps.map((step, stepIndex) => (
                        <div
                          key={step}
                          className="flex items-center justify-between border border-white/10 bg-white/[0.055] px-3 py-3"
                        >
                          <span className="text-sm font-semibold text-paper/68">
                            {step}
                          </span>
                          <span
                            className={cn(
                              "size-2.5 rounded-full",
                              stepIndex < 2 ? "bg-acid" : "bg-cyan",
                            )}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div
                  data-selected-layer
                  className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-end sm:justify-between"
                >
                  <p className="font-script text-4xl leading-none text-cyan/82">
                    human approval stays in control
                  </p>
                  <p className="max-w-[12rem] text-right text-xs font-bold uppercase leading-5 tracking-[0.08em] text-paper/42">
                    Detect / Generate / Approve / Publish
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
