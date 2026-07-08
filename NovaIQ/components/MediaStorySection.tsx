"use client";

import { useEffect, useRef } from "react";
import { mediaStory } from "@/data/landing";
import { RevealText } from "@/components/RevealText";
import { VideoFrame } from "@/components/VideoFrame";
import { cn, prefersReducedMotion } from "@/lib/utils";

export function MediaStorySection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || prefersReducedMotion()) {
      return;
    }

    let cleanup: (() => void) | undefined;
    let active = true;

    async function animateMediaStory() {
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

      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-media-card]");

        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            {
              y: 54,
              autoAlpha: 0,
              clipPath: "inset(12% 0% 12% 0%)",
            },
            {
              y: 0,
              autoAlpha: 1,
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1,
              ease: "power4.out",
              delay: index * 0.04,
              scrollTrigger: {
                trigger: card,
                start: "top 82%",
                once: true,
              },
            },
          );
        });

        gsap.to("[data-media-track]", {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: currentSection,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }, currentSection);

      cleanup = () => ctx.revert();
    }

    void animateMediaStory();

    return () => {
      active = false;
      cleanup?.();
    };
  }, []);

  return (
    <section
      id="media-system"
      ref={sectionRef}
      className="section-pad relative isolate overflow-hidden border-y border-white/10 bg-[linear-gradient(180deg,rgba(7,8,13,0.62),rgba(17,24,39,0.66)_48%,rgba(7,8,13,0.5))]"
      aria-labelledby="media-system-title"
    >
      <div className="nova-grid absolute inset-0 -z-10 opacity-40" />
      <div className="nova-orb left-[-12rem] top-20 size-96 bg-cyan/12" />
      <div className="nova-orb bottom-0 right-[-12rem] size-96 bg-acid/10" />

      <div className="container-page grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-start lg:gap-16">
        <div className="lg:sticky lg:top-28">
          <RevealText as="p" className="eyebrow mb-5 text-acid">
            Video Content Engine
          </RevealText>
          <RevealText
            as="h2"
            id="media-system-title"
            className="section-title max-w-3xl text-paper"
          >
            Vier Clips. Ein Flow.
          </RevealText>
          <p className="mt-7 max-w-lg text-xl leading-8 text-paper/66">
            Rohmaterial, Kontext, Draft und Review wirken wie eine ruhige
            Sequenz statt wie kleine Deko-Kacheln.
          </p>
          <div className="mt-9 flex flex-wrap gap-2">
            {["Capture", "Map", "Draft", "Gate"].map((label) => (
              <span
                key={label}
                className="border border-white/10 bg-white/[0.045] px-3 py-2 text-sm font-bold uppercase tracking-[0.08em] text-paper/68"
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        <div data-media-track className="grid gap-3 lg:grid-cols-[1.08fr_0.92fr]">
          {mediaStory.map((item, index) => (
            <article
              key={item.step}
              data-media-card
              className={cn(
                "min-w-0",
                index === 0 ? "lg:row-span-3" : undefined,
              )}
            >
              <VideoFrame
                src={item.scene.src}
                mobileSrc={item.scene.mobileSrc}
                poster={item.scene.poster}
                eyebrow={`${item.step} / ${item.scene.eyebrow}`}
                label={item.metric}
                title={item.scene.title}
                source={item.scene.source}
                aspect={index === 0 ? "tall" : "wide"}
                className={cn(
                  "border-white/10",
                  index === 0 ? "min-h-[34rem]" : "min-h-[13.5rem]",
                )}
                cursorLabel={item.metric}
                showSource={false}
              />
              <div className="mt-2 flex items-center justify-between gap-3 border border-white/10 bg-white/[0.035] px-3 py-2 text-sm text-paper/62">
                <span className="font-bold text-paper/78">{item.title}</span>
                <span className="hidden text-right sm:block">{item.copy}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
