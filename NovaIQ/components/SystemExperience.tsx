"use client";

import { useEffect, useRef, useState } from "react";
import { systemTimeline } from "@/data/landing";
import { RevealText } from "@/components/RevealText";
import { cn, prefersReducedMotion } from "@/lib/utils";

export function SystemExperience() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(0);
  const activeStage = systemTimeline[active];

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || prefersReducedMotion()) {
      return;
    }
    const element = section;

    let cleanup: (() => void) | undefined;
    let activeRun = true;

    async function runTimeline() {
      const [{ gsap }, scrollModule] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      const { ScrollTrigger } = scrollModule;

      if (!activeRun || !sectionRef.current) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const mm = gsap.matchMedia();
        mm.add("(min-width: 1024px)", () => {
          const stage = element.querySelector<HTMLElement>("[data-system-stage]");
          const orbits = gsap.utils.toArray<HTMLElement>("[data-system-orbit]");
          const end = `+=${systemTimeline.length * 560}`;
          const trigger = ScrollTrigger.create({
            trigger: element,
            start: "top top",
            end,
            pin: true,
            scrub: true,
            onUpdate: (self) => {
              const next = Math.min(
                systemTimeline.length - 1,
                Math.floor(self.progress * systemTimeline.length),
              );
              setActive(next);
              element.style.setProperty(
                "--system-progress",
                String(self.progress),
              );
            },
          });

          const stageTween = stage
            ? gsap.to(stage, {
                yPercent: -5,
                rotateX: 5,
                rotateY: -4,
                scale: 1.035,
                ease: "none",
                scrollTrigger: {
                  trigger: element,
                  start: "top top",
                  end,
                  scrub: true,
                },
              })
            : undefined;

          const orbitTween = gsap.to(orbits, {
            xPercent: (index) => (index % 2 === 0 ? -18 : 16),
            yPercent: (index) => (index % 2 === 0 ? 10 : -12),
            rotate: (index) => (index % 2 === 0 ? -18 : 24),
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top top",
              end,
              scrub: true,
            },
          });

          return () => {
            trigger.kill();
            stageTween?.kill();
            orbitTween.kill();
          };
        });

        gsap.fromTo(
          "[data-system-step]",
          { y: 28, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "power4.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: element,
              start: "top 72%",
              once: true,
            },
          },
        );

        gsap.fromTo(
          "[data-system-main]",
          { autoAlpha: 0, y: 42, clipPath: "inset(12% 0% 12% 0%)" },
          {
            autoAlpha: 1,
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.15,
            ease: "expo.out",
            scrollTrigger: {
              trigger: element,
              start: "top 72%",
              once: true,
            },
          },
        );

        cleanup = () => mm.revert();
      }, element);

      cleanup = () => {
        ctx.revert();
      };
    }

    void runTimeline();

    return () => {
      activeRun = false;
      cleanup?.();
    };
  }, []);

  return (
    <section
      id="system"
      ref={sectionRef}
      className="section-pad relative isolate overflow-hidden bg-[linear-gradient(180deg,rgba(7,8,13,0.4),rgba(17,24,39,0.48))]"
      aria-labelledby="system-title"
    >
      <div className="nova-orb left-1/2 top-10 size-96 -translate-x-1/2 bg-cyan/12" />
      <div className="nova-grid absolute inset-0 -z-10 opacity-50" />
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[0.64fr_1.36fr] lg:items-center">
          <div>
            <RevealText as="p" className="eyebrow mb-5 text-cyan">
              System Dive
            </RevealText>
            <RevealText
              as="h2"
              id="system-title"
              className="section-title max-w-3xl text-paper"
            >
              Ein Signal. Ein Flow.
            </RevealText>
            <p className="mt-7 max-w-lg text-xl leading-8 text-paper/68">
              Langsam scrollen. Der Rundgang zoomt vom erkannten Moment bis zum
              Review-Gate.
            </p>
            <div className="mt-9 grid max-w-md grid-cols-2 gap-2">
              {["Detect", "Context", "Draft", "Review"].map((label, index) => (
                <div
                  key={label}
                  className={cn(
                    "border px-3 py-3 text-sm font-bold uppercase tracking-[0.08em] transition duration-300",
                    active >= index
                      ? "border-cyan/30 bg-cyan/[0.08] text-paper"
                      : "border-white/10 bg-white/[0.035] text-muted",
                  )}
                >
                  {label}
                </div>
              ))}
            </div>
          </div>

          <div
            data-system-main
            className="system-immersive nova-card relative min-h-[38rem] overflow-hidden p-3 sm:p-4"
          >
            <div className="nova-grid absolute inset-0 opacity-35" />
            <div
              data-system-orbit
              className="absolute left-8 top-10 h-40 w-40 rounded-full border border-cyan/20 bg-cyan/[0.04] blur-[1px]"
            />
            <div
              data-system-orbit
              className="absolute bottom-8 right-8 h-56 w-56 rounded-full border border-acid/20 bg-acid/[0.035] blur-[1px]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-8 top-8 font-display text-[clamp(5rem,14vw,12rem)] font-semibold leading-none tracking-[-0.08em] text-white/[0.04]"
            >
              {activeStage.status}
            </div>

            <div
              data-system-stage
              className="relative z-10 flex min-h-[30rem] flex-col justify-between overflow-hidden border border-white/10 bg-ink/78 p-5 shadow-panel-glow sm:p-7"
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-muted">
                    NovaIQ live flow
                  </p>
                  <p className="mt-3 text-sm font-bold text-cyan">
                    {activeStage.time} / {activeStage.status}
                  </p>
                </div>
                <span className="system-pulse-dot size-3 bg-acid" />
              </div>

              <div className="max-w-3xl">
                <p className="font-script text-4xl leading-none text-cyan/80 sm:text-5xl">
                  {activeStage.label}
                </p>
                <h3 className="mt-5 text-5xl font-semibold leading-[0.88] text-paper sm:text-7xl">
                  {activeStage.title}
                </h3>
                <p className="mt-6 max-w-lg text-xl leading-8 text-paper/62">
                  {activeStage.copy}
                </p>
              </div>

              <div>
                <div className="h-1.5 overflow-hidden bg-white/10">
                  <div
                    className="h-full origin-left bg-[linear-gradient(90deg,#7C3AED,#22D3EE,#A3E635)] transition-[width] duration-500 ease-cinematic"
                    style={{
                      width: `${((active + 1) / systemTimeline.length) * 100}%`,
                    }}
                  />
                </div>
                <div className="mt-4 grid gap-2 sm:grid-cols-4">
                  {systemTimeline.map((item, index) => (
                    <button
                      key={item.time}
                      type="button"
                      data-system-step
                      onClick={() => setActive(index)}
                      className={cn(
                        "border px-3 py-3 text-left transition duration-300",
                        active === index
                          ? "border-acid/35 bg-acid/[0.09] text-paper"
                          : "border-white/10 bg-white/[0.04] text-muted hover:border-white/20",
                      )}
                    >
                      <span className="block text-xs font-bold uppercase tracking-[0.08em]">
                        {item.time}
                      </span>
                      <span className="mt-2 block text-sm font-semibold leading-5">
                        {item.status}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
