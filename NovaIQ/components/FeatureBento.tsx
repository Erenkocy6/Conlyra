"use client";

import type { CSSProperties, PointerEvent } from "react";
import { useEffect, useRef } from "react";
import { bentoFeatures, videoScenes } from "@/data/landing";
import { RevealText } from "@/components/RevealText";
import { cn, prefersReducedMotion } from "@/lib/utils";

const bentoMedia = [
  videoScenes.capture,
  videoScenes.network,
  videoScenes.workspace,
  videoScenes.hero,
  videoScenes.network,
  videoScenes.workspace,
];

const bentoAccents = [
  "#22D3EE",
  "#A3E635",
  "#7C3AED",
  "#22D3EE",
  "#A3E635",
  "#7C3AED",
];

export function FeatureBento() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const videos = Array.from(
      section.querySelectorAll<HTMLVideoElement>("[data-feature-video]"),
    );

    if (!videos.length) {
      return;
    }

    const pauseVideo = (video: HTMLVideoElement) => {
      video.pause();
      video.currentTime = Math.min(video.currentTime, 0.2);
    };

    if (prefersReducedMotion()) {
      videos.forEach(pauseVideo);
      return;
    }

    const visibleVideos = new Set<HTMLVideoElement>();
    const syncPlayback = () => {
      const playableVideos = Array.from(visibleVideos).slice(0, 3);

      videos.forEach((video) => {
        if (playableVideos.includes(video)) {
          void video.play().catch(() => undefined);
          return;
        }

        video.pause();
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;

          if (!(video instanceof HTMLVideoElement)) {
            return;
          }

          if (entry.isIntersecting) {
            visibleVideos.add(video);
            return;
          }

          visibleVideos.delete(video);
          pauseVideo(video);
        });

        syncPlayback();
      },
      {
        rootMargin: "160px 0px",
        threshold: 0.22,
      },
    );

    videos.forEach((video) => observer.observe(video));

    return () => {
      observer.disconnect();
      videos.forEach((video) => video.pause());
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || prefersReducedMotion()) {
      return;
    }

    let cleanup: (() => void) | undefined;
    let active = true;

    async function animateFeatures() {
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
        const cards = gsap.utils.toArray<HTMLElement>("[data-feature-card]");

        gsap.fromTo(
          cards,
          {
            y: 72,
            autoAlpha: 0,
            rotateX: -12,
            scale: 0.965,
            clipPath: "inset(16% 0% 16% 0%)",
          },
          {
            y: 0,
            autoAlpha: 1,
            rotateX: 0,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1,
            ease: "power4.out",
            stagger: 0.06,
            scrollTrigger: {
              trigger: currentSection,
              start: "top 68%",
              once: true,
            },
          },
        );

        gsap.to("[data-feature-video]", {
          scale: 1.1,
          yPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: currentSection,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        const marqueeTween = gsap.to("[data-feature-marquee]", {
          xPercent: -50,
          duration: 18,
          ease: "none",
          repeat: -1,
          paused: true,
        });

        ScrollTrigger.create({
          trigger: currentSection,
          start: "top 110%",
          end: "bottom -10%",
          onEnter: () => marqueeTween.resume(),
          onEnterBack: () => marqueeTween.resume(),
          onLeave: () => marqueeTween.pause(),
          onLeaveBack: () => marqueeTween.pause(),
        });
      }, currentSection);

      cleanup = () => ctx.revert();
    }

    void animateFeatures();

    return () => {
      active = false;
      cleanup?.();
    };
  }, []);

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();

    card.style.setProperty("--card-x", `${event.clientX - rect.left}px`);
    card.style.setProperty("--card-y", `${event.clientY - rect.top}px`);
  }

  return (
    <section
      id="features"
      ref={sectionRef}
      className="section-pad relative isolate overflow-hidden border-y border-white/10 bg-[linear-gradient(180deg,rgba(7,8,13,0.78),rgba(17,24,39,0.52)_48%,rgba(7,8,13,0.76))]"
      aria-labelledby="features-title"
    >
      <div className="nova-grid absolute inset-0 -z-10 opacity-35" />
      <div className="nova-orb left-[-10rem] top-10 size-[34rem] bg-cyan/12" />
      <div className="nova-orb bottom-[-12rem] right-[-10rem] size-[36rem] bg-violet/14" />

      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <RevealText as="p" className="eyebrow mb-5 text-cyan">
              Product Features
            </RevealText>
            <RevealText
              as="h2"
              id="features-title"
              className="section-title max-w-3xl text-paper"
            >
              Features, die sich bewegen.
            </RevealText>
          </div>
          <p className="max-w-2xl text-xl leading-8 text-paper/64 lg:justify-self-end">
            Jede Karte bekommt Material, Bewegung und Systemlogik. Weniger
            Text, mehr Produktfilm.
          </p>
        </div>

        <div className="feature-marquee mt-10 overflow-hidden border-y border-white/10 py-3">
          <div
            data-feature-marquee
            className="flex w-max gap-8 text-xs font-bold uppercase tracking-[0.08em] text-paper/42"
          >
            {[...Array(2)].map((_, groupIndex) => (
              <div key={groupIndex} className="flex gap-8">
                {[
                  "Detect",
                  "Brand Sense",
                  "Draft",
                  "Human Gate",
                  "Memory",
                  "Learning",
                ].map((item) => (
                  <span key={`${groupIndex}-${item}`}>{item}</span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid auto-rows-[17rem] gap-4 md:grid-cols-4">
          {bentoFeatures.map((feature, index) => {
            const media = bentoMedia[index % bentoMedia.length];
            const accent = bentoAccents[index % bentoAccents.length];

            return (
              <article
                key={feature.title}
                data-feature-card
                data-cursor-label={feature.metric}
                onPointerMove={handlePointerMove}
                style={{ "--feature-accent": accent } as CSSProperties}
                className={cn(
                  "feature-card content-card nova-card group relative overflow-hidden p-5",
                  feature.size === "large" && "md:col-span-2 md:row-span-2",
                  feature.size === "medium" && "md:col-span-2",
                )}
              >
                <video
                  data-feature-video
                  className="absolute inset-0 h-full w-full scale-[1.02] object-cover opacity-32 saturate-[0.85] transition duration-700 group-hover:opacity-62"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={media.poster}
                  aria-hidden="true"
                >
                  <source src={media.src} type="video/mp4" />
                </video>

                <div className="feature-card__wash" aria-hidden="true" />
                <div className="feature-card__scan" aria-hidden="true" />
                <div className="feature-card__spotlight" aria-hidden="true" />

                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-editorial text-4xl leading-none text-paper/28">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="border border-cyan/20 bg-cyan/[0.08] px-3 py-1.5 text-xs font-bold text-cyan backdrop-blur-md">
                      {feature.metric}
                    </span>
                  </div>

                  <div>
                    <div className="mb-5 flex gap-1.5" aria-hidden="true">
                      {[0, 1, 2].map((bar) => (
                        <span
                          key={bar}
                          className="h-1.5 w-10"
                          style={{
                            backgroundColor: accent,
                            opacity: 0.32 + bar * 0.26,
                          }}
                        />
                      ))}
                    </div>
                    <h3 className="max-w-lg text-4xl font-semibold leading-none text-paper sm:text-5xl">
                      {feature.title}
                    </h3>
                    <p className="mt-4 max-w-lg text-base leading-7 text-paper/64">
                      {feature.copy}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
