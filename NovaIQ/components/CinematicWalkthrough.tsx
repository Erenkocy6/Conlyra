"use client";

import { useEffect, useRef } from "react";
import { cinematicScenes } from "@/data/landing";
import { RevealText } from "@/components/RevealText";
import { prefersReducedMotion } from "@/lib/utils";

export function CinematicWalkthrough() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const sceneRefs = useRef<Array<HTMLElement | null>>([]);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const orbRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || prefersReducedMotion()) {
      return;
    }

    let cleanup: (() => void) | undefined;
    let active = true;

    async function animateWalkthrough() {
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
        mm.add("(min-width: 1024px)", () => {
          const scenes = sceneRefs.current.filter(Boolean);
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: currentSection,
              start: "top top",
              end: () => `+=${window.innerHeight * scenes.length}`,
              pin: true,
              pinSpacing: true,
              scrub: 0.72,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          gsap.set(scenes, { autoAlpha: 0, y: 42, scale: 0.985 });
          gsap.set(scenes[0], { autoAlpha: 1, y: 0, scale: 1 });

          scenes.forEach((scene, index) => {
            if (!scene) {
              return;
            }

            const inner = scene.querySelectorAll("[data-walk-layer]");
            const mask = scene.querySelector("[data-walk-mask]");

            timeline.fromTo(
              inner,
              { y: 24, autoAlpha: index === 0 ? 1 : 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.28,
                stagger: 0.03,
                ease: "power2.out",
              },
              index === 0 ? 0 : ">-0.1",
            );

            if (mask) {
              timeline.fromTo(
                mask,
                { clipPath: "inset(18% 18% 18% 18%)" },
                {
                  clipPath: "inset(0% 0% 0% 0%)",
                  duration: 0.42,
                  ease: "power2.out",
                },
                "<",
              );
            }

            timeline.to({}, { duration: 0.38 });

            if (index < scenes.length - 1) {
              timeline
                .to(scene, {
                  autoAlpha: 0,
                  y: -54,
                  scale: 0.975,
                  duration: 0.34,
                  ease: "power2.inOut",
                })
                .fromTo(
                  scenes[index + 1],
                  { autoAlpha: 0, y: 60, scale: 0.985 },
                  {
                    autoAlpha: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.44,
                    ease: "power3.out",
                  },
                  "<0.08",
                );
            }
          });

          if (progressRef.current) {
            timeline.fromTo(
              progressRef.current,
              { scaleX: 0 },
              { scaleX: 1, ease: "none", duration: timeline.duration() },
              0,
            );
          }

          if (orbRef.current) {
            timeline.to(
              orbRef.current,
              {
                xPercent: 18,
                yPercent: -12,
                rotate: 18,
                ease: "none",
                duration: timeline.duration(),
              },
              0,
            );
          }

          ScrollTrigger.refresh();
        });
      }, currentSection);

      cleanup = () => {
        mm.revert();
        ctx.revert();
      };
    }

    void animateWalkthrough();

    return () => {
      active = false;
      cleanup?.();
    };
  }, []);

  return (
    <section
      id="rundgang"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#050505] py-20 sm:py-24 lg:h-screen lg:min-h-[720px] lg:py-0"
      aria-labelledby="rundgang-title"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_30%,rgba(255,255,255,0.1),transparent_36rem)]" />
      <div
        ref={orbRef}
        className="absolute right-[10%] top-[18%] h-[24rem] w-[24rem] rounded-full border border-white/16 bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_64%)]"
      />
      <div className="container-page relative grid gap-8 lg:min-h-screen lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-10">
        <div className="max-w-4xl">
          <RevealText as="p" className="eyebrow mb-5 text-acid">
            Cinematic Walkthrough
          </RevealText>
          <RevealText
            as="h2"
            id="rundgang-title"
            className="font-display text-[clamp(3.6rem,8vw,7.8rem)] font-semibold leading-[0.86] text-paper"
          >
            Vom Moment zum Content-System.
          </RevealText>
          <p className="mt-7 max-w-md text-lg leading-8 text-paper/60">
            Ein Rundgang durch Quellen, Kontext, Vorschläge und Review.
          </p>
        </div>

        <div className="lg:relative lg:h-[min(60vh,35rem)] lg:min-h-[30rem]">
          {cinematicScenes.map((scene, index) => (
            <article
              key={scene.chapter}
              ref={(node) => {
                sceneRefs.current[index] = node;
              }}
              className="mb-4 grid min-h-[34rem] gap-6 overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.045] p-5 sm:p-7 lg:absolute lg:inset-0 lg:mb-0 lg:min-h-full lg:grid-cols-[0.84fr_1.16fr] lg:items-stretch lg:p-8"
            >
              <div className="relative z-10 flex flex-col justify-between">
                <div data-walk-layer>
                  <p className="text-sm font-bold text-cyan">
                    {scene.chapter}
                  </p>
                  <p className="mt-4 text-xs font-bold uppercase text-paper/42">
                    {scene.eyebrow}
                  </p>
                </div>

                <div data-walk-layer>
                  <h3 className="max-w-xl text-4xl font-semibold leading-none text-paper sm:text-5xl">
                    {scene.title}
                  </h3>
                  <p className="mt-5 max-w-xl text-base leading-7 text-paper/62">
                    {scene.copy}
                  </p>
                </div>
              </div>

              <div
                data-walk-mask
                className="relative overflow-hidden rounded-[8px] border border-white/10 bg-ink/70"
              >
                <div className="absolute inset-0 bg-fine-grid bg-[length:36px_36px] opacity-25" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_44%,rgba(255,255,255,0.14),transparent_28rem)]" />
                <div className="relative z-10 flex h-full min-h-[23rem] flex-col justify-between p-5 sm:p-7 lg:min-h-full">
                  <div
                    data-walk-layer
                    className="flex items-start justify-between gap-4"
                  >
                    <div>
                      <p className="text-xs font-bold uppercase text-paper/42">
                        Live Signal
                      </p>
                      <p className="mt-3 text-5xl font-semibold leading-none text-paper sm:text-6xl">
                        {scene.stat}
                      </p>
                    </div>
                    <span className="rounded-full border border-acid/25 bg-acid/[0.08] px-3 py-1.5 text-xs font-bold uppercase text-acid">
                      {scene.detail}
                    </span>
                  </div>

                  <div data-walk-layer className="space-y-3">
                    {scene.tags.map((tag, tagIndex) => (
                      <div
                        key={tag}
                        className="flex items-center justify-between rounded-[8px] border border-white/10 bg-white/[0.045] p-4"
                      >
                        <span className="text-sm font-semibold text-paper/72">
                          {tag}
                        </span>
                        <span className="text-xs font-bold text-paper/36">
                          0{tagIndex + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="hidden h-px overflow-hidden rounded-full bg-white/10 lg:absolute lg:bottom-12 lg:left-0 lg:right-0 lg:block">
          <div
            ref={progressRef}
            className="h-full origin-left bg-gradient-to-r from-cyan via-acid to-violet"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </section>
  );
}
