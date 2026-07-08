"use client";

import { useEffect, useRef, useState } from "react";
import { MagneticButton } from "@/components/MagneticButton";
import { heroProofPoints, videoScenes } from "@/data/landing";
import { prefersReducedMotion } from "@/lib/utils";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function prefersStaticMedia() {
  const connection = navigator as Navigator & {
    connection?: { saveData?: boolean };
  };

  return prefersReducedMotion() || Boolean(connection.connection?.saveData);
}

const heroChapters = ["Capture", "Context", "Draft", "Gate"];

export function ScrollScrubHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const activeChapterRef = useRef(0);
  const [activeChapter, setActiveChapter] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video || prefersStaticMedia()) {
      return;
    }

    let cleanup: (() => void) | undefined;
    let active = true;
    let stopTimer = 0;
    let seekFrame = 0;
    let pendingProgress = 0;
    let lastSeekTime = -1;
    let lastVisualProgress = -1;

    async function setupScrollFilm() {
      const [{ gsap }, scrollModule] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      const { ScrollTrigger } = scrollModule;

      if (!active || !sectionRef.current || !videoRef.current) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);
      const currentSection = sectionRef.current;
      const currentVideo = videoRef.current;

      function queueVideoSeek(progress: number) {
        pendingProgress = clamp(progress, 0, 1);

        if (seekFrame) {
          return;
        }

        seekFrame = requestAnimationFrame(() => {
          seekFrame = 0;
          const duration = currentVideo.duration;

          if (!Number.isFinite(duration) || duration <= 0) {
            return;
          }

          const nextTime = clamp(
            pendingProgress * duration,
            0,
            Math.max(0, duration - 0.05),
          );

          if (Math.abs(nextTime - lastSeekTime) < 0.04) {
            return;
          }

          lastSeekTime = nextTime;
          currentVideo.currentTime = nextTime;
        });
      }

      function setVideoProgress(progress: number) {
        const nextProgress = clamp(progress, 0, 1);

        if (Math.abs(nextProgress - lastVisualProgress) > 0.001) {
          lastVisualProgress = nextProgress;
          currentSection.style.setProperty(
            "--hero-scroll-progress",
            String(nextProgress),
          );

          if (progressRef.current) {
            progressRef.current.style.transform = `scaleX(${nextProgress})`;
          }
        }

        queueVideoSeek(nextProgress);

        const nextChapter = Math.min(
          heroChapters.length - 1,
          Math.floor(clamp(nextProgress, 0, 0.999) * heroChapters.length),
        );

        if (activeChapterRef.current !== nextChapter) {
          activeChapterRef.current = nextChapter;
          setActiveChapter(nextChapter);
        }
      }

      function markScrubbing() {
        window.clearTimeout(stopTimer);
        currentSection.classList.add("is-scrubbing");
        stopTimer = window.setTimeout(() => {
          currentSection.classList.remove("is-scrubbing");
        }, 130);
      }

      function prepareVideo() {
        currentVideo.pause();
        setVideoProgress(0.001);
        currentSection.classList.add("is-video-ready");
        ScrollTrigger.refresh();
      }

      if (currentVideo.readyState >= 1) {
        prepareVideo();
      } else {
        currentVideo.addEventListener("loadedmetadata", prepareVideo, {
          once: true,
        });
      }

      const trigger = ScrollTrigger.create({
        trigger: currentSection,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (!currentVideo.paused) {
            currentVideo.pause();
          }
          setVideoProgress(self.progress);
          markScrubbing();
        },
        onEnter: () => currentVideo.pause(),
        onEnterBack: () => currentVideo.pause(),
      });

      cleanup = () => {
        window.clearTimeout(stopTimer);
        cancelAnimationFrame(seekFrame);
        currentVideo.removeEventListener("loadedmetadata", prepareVideo);
        currentSection.classList.remove("is-scrubbing", "is-video-ready");
        trigger.kill();
      };
    }

    void setupScrollFilm();

    return () => {
      active = false;
      cleanup?.();
    };
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="scroll-scrub-hero relative h-[285vh] min-h-[1800px]"
      aria-labelledby="hero-title"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-ink">
        <video
          ref={videoRef}
          className="scroll-scrub-hero__video absolute inset-0 h-full w-full object-cover"
          muted
          playsInline
          preload="metadata"
          poster={videoScenes.hero.poster}
          aria-label={videoScenes.hero.title}
        >
          <source
            media="(max-width: 767px)"
            src={videoScenes.hero.mobileSrc}
            type="video/mp4"
          />
          <source src={videoScenes.hero.src} type="video/mp4" />
        </video>

        <div className="scroll-scrub-hero__wash" aria-hidden="true" />
        <div className="scroll-scrub-hero__scan" aria-hidden="true" />
        <div className="scroll-scrub-hero__grid" aria-hidden="true" />

        <div className="absolute inset-0 z-10 flex items-end">
          <div className="container-page pb-8 pt-28 sm:pb-10 lg:pb-12">
            <div className="max-w-7xl">
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <p className="eyebrow text-acid">Scroll-controlled hero film</p>
                <span className="scroll-scrub-hero__state border border-white/12 bg-ink/54 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.08em] text-paper/64 backdrop-blur">
                  Scroll = Play
                </span>
              </div>

              <div
                className="scroll-scrub-hero__guide mb-6 max-w-2xl border border-white/10 bg-ink/48 p-3 backdrop-blur-md"
                aria-label="Scroll Film Fortschritt"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-paper/58">
                    Langsam scrollen
                  </p>
                  <p className="text-sm font-bold text-acid">
                    {heroChapters[activeChapter]}
                  </p>
                </div>
                <div className="mt-3 grid grid-cols-4 gap-1.5">
                  {heroChapters.map((chapter, index) => (
                    <span
                      key={chapter}
                      className={
                        index <= activeChapter
                          ? "h-1.5 bg-acid"
                          : "h-1.5 bg-white/12"
                      }
                    />
                  ))}
                </div>
              </div>

              <h1
                id="hero-title"
                className="scroll-scrub-hero__title max-w-[10ch] font-display text-[clamp(4.2rem,11vw,12.8rem)] font-semibold leading-[0.78] tracking-[-0.075em] text-paper"
              >
                Aus jedem{" "}
                <span className="nova-gradient-text">Moment</span> wird Content.
              </h1>

              <div className="mt-7 grid gap-5 lg:grid-cols-[0.74fr_1fr] lg:items-end">
                <p className="max-w-2xl text-lg leading-8 text-paper/70 sm:text-xl sm:leading-9">
                  Scroll steuert den Film. Am Ende wartet der Draft sauber auf
                  Review.
                </p>

                <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                  <MagneticButton
                    href="#kontakt"
                    className="w-full sm:w-auto"
                    data-cursor-label="Demo"
                  >
                    Demo anfragen
                  </MagneticButton>
                  <MagneticButton
                    href="#media-system"
                    variant="secondary"
                    className="w-full sm:w-auto"
                    data-cursor-label="Scroll"
                  >
                    Film weiter
                  </MagneticButton>
                </div>
              </div>

              <div className="mt-6 grid max-w-5xl gap-2 sm:grid-cols-3">
                {heroProofPoints.map((point) => (
                  <div
                    key={point.value}
                    data-cursor-label={point.value}
                    className="border border-white/10 bg-ink/46 p-4 backdrop-blur-md"
                  >
                    <p className="text-xl font-semibold text-paper">{point.value}</p>
                    <p className="mt-2 text-sm leading-6 text-paper/58">
                      {point.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="scroll-scrub-hero__progress" aria-hidden="true">
          <div ref={progressRef} className="scroll-scrub-hero__progress-bar" />
        </div>
      </div>
    </section>
  );
}
