"use client";

import { useEffect, useRef } from "react";
import { motionStoryPanels } from "@/data/landing";
import { RevealText } from "@/components/RevealText";
import { prefersReducedMotion } from "@/lib/utils";

export function HorizontalStory() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const panelRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track || prefersReducedMotion()) {
      return;
    }

    let cleanup: (() => void) | undefined;
    let active = true;

    async function animateHorizontalStory() {
      const [{ gsap }, scrollModule] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      const { ScrollTrigger } = scrollModule;

      if (!active || !sectionRef.current || !trackRef.current) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);
      const currentSection = sectionRef.current;
      const currentTrack = trackRef.current;
      const mm = gsap.matchMedia();
      const ctx = gsap.context(() => {
        mm.add("(min-width: 1024px)", () => {
          const distance = () =>
            Math.max(0, currentTrack.scrollWidth - window.innerWidth + 64);

          const tween = gsap.to(currentTrack, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: currentSection,
              start: "top top",
              end: () => `+=${distance() + window.innerHeight * 0.58}`,
              pin: true,
              pinSpacing: true,
              scrub: 0.85,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          panelRefs.current.forEach((panel, index) => {
            if (!panel) {
              return;
            }

            gsap.fromTo(
              panel.querySelector("[data-story-inner]"),
              { y: 42, autoAlpha: 0.65 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: tween,
                  start: index === 0 ? "left 80%" : "left 72%",
                  end: "left 38%",
                  scrub: 0.5,
                },
              },
            );
          });

          ScrollTrigger.refresh();
        });
      }, currentSection);

      cleanup = () => {
        mm.revert();
        ctx.revert();
      };
    }

    void animateHorizontalStory();

    return () => {
      active = false;
      cleanup?.();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#070707] py-20 sm:py-24 lg:h-screen lg:min-h-[720px] lg:py-0"
      aria-labelledby="motion-story-title"
    >
      <div className="absolute inset-0 bg-fine-grid bg-[length:54px_54px] opacity-[0.18]" />
      <div className="absolute inset-y-0 left-0 w-1/3 bg-[linear-gradient(90deg,#050505,transparent)]" />
      <div className="container-page relative lg:flex lg:min-h-screen lg:flex-col lg:justify-center">
        <div className="max-w-5xl">
          <RevealText as="p" className="eyebrow mb-5 text-cyan">
            Scroll-Story
          </RevealText>
          <RevealText
            as="h2"
            id="motion-story-title"
            className="font-display text-[clamp(3.6rem,8vw,7.7rem)] font-semibold leading-[0.86] text-paper"
          >
            Vier Stationen. Vom Rohsignal zum Post.
          </RevealText>
        </div>

        <div className="mt-10 lg:mt-12">
          <div
            ref={trackRef}
            className="flex flex-col gap-4 lg:w-max lg:flex-row lg:gap-5 lg:will-change-transform"
          >
            {motionStoryPanels.map((panel, index) => (
              <article
                key={panel.step}
                ref={(node) => {
                  panelRefs.current[index] = node;
                }}
                className="relative min-h-[22rem] overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.045] p-6 lg:w-[min(66vw,780px)] lg:shrink-0 lg:p-7"
              >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_18%,rgba(255,255,255,0.12),transparent_34rem)] opacity-80" />
                <div className="absolute right-0 top-0 h-40 w-40 border-b border-l border-white/10" />
                <div
                  data-story-inner
                  className="relative flex min-h-[18rem] flex-col justify-between"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold text-acid">
                        {panel.step} / {panel.label}
                      </p>
                      <p className="mt-3 rounded-full border border-white/10 px-4 py-2 text-sm font-bold text-paper/58">
                        {panel.metric}
                      </p>
                    </div>
                    <div className="hidden h-20 w-20 rounded-full border border-cyan/25 bg-cyan/[0.06] sm:block" />
                  </div>

                  <div>
                    <h3 className="max-w-2xl text-4xl font-semibold leading-none text-paper sm:text-[3.35rem]">
                      {panel.title}
                    </h3>
                    <p className="mt-5 max-w-2xl text-base leading-7 text-paper/62">
                      {panel.copy}
                    </p>
                    <div className="mt-7 flex flex-wrap gap-2">
                      {panel.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold uppercase text-paper/46"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
