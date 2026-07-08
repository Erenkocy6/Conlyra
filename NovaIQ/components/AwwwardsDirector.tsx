"use client";

import { useEffect, useRef } from "react";
import type Lenis from "lenis";
import { prefersReducedMotion } from "@/lib/utils";

type NovaWindow = Window & {
  novaLenis?: Pick<Lenis, "scrollTo" | "resize">;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

const cursorTargets =
  "[data-cursor-label], [data-inspect-title], a, button, input, textarea, select, [role='button'], .sideways-card, .nova-hall-card, .nova-choice-card, .nova-signal-core, .scene-bridge, .sticky-product__stage, .review-comment, .workflow-card, .outcome-card, .b2b-card, .control-room";

const magneticTargetsSelector =
  "[data-magnetic], .button, .menu-toggle, .brand-mark, .header-cta, .site-menu__links a";

export function AwwwardsDirector() {
  const progressRef = useRef<HTMLDivElement | null>(null);
  const velocityRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const html = document.documentElement;

    if (prefersReducedMotion()) {
      html.classList.add("motion-reduced");
      return () => html.classList.remove("motion-reduced");
    }

    let raf = 0;
    let lenisInstance: Lenis | undefined;
    let cleanupAnimations: (() => void) | undefined;
    let active = true;
    let progressFrame = 0;
    const requestFrame =
      typeof window.requestAnimationFrame === "function"
        ? window.requestAnimationFrame.bind(window)
        : (callback: FrameRequestCallback) =>
            window.setTimeout(() => callback(Date.now()), 16);
    const cancelFrame =
      typeof window.cancelAnimationFrame === "function"
        ? window.cancelAnimationFrame.bind(window)
        : window.clearTimeout.bind(window);

    async function setupMotion() {
      const [{ gsap }, { ScrollTrigger }, { default: LenisClass }] =
        await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
          import("lenis"),
        ]);

      if (!active) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);
      const compactMotion = window.matchMedia("(max-width: 767px)").matches;

      const lenis = new LenisClass({
        lerp: compactMotion ? 0.14 : 0.075,
        smoothWheel: !compactMotion,
        syncTouch: false,
        wheelMultiplier: 0.82,
        touchMultiplier: compactMotion ? 1 : 1.1,
        anchors: false,
      });

      lenisInstance = lenis;
      (window as NovaWindow).novaLenis = lenis;
      html.classList.add("motion-ready");

      const revealItems = Array.from(
        document.querySelectorAll<HTMLElement>("[data-reveal]"),
      );
      const revealItem = (
        item: Element,
        observer?: IntersectionObserver,
      ) => {
        item.classList.add("is-revealed");
        observer?.unobserve(item);
      };
      const revealObserver =
        "IntersectionObserver" in window
          ? new IntersectionObserver(
              (entries, observer) => {
                entries.forEach((entry) => {
                  if (!entry.isIntersecting) {
                    return;
                  }

                  revealItem(entry.target, observer);
                });
              },
              {
                rootMargin: "0px 0px -12% 0px",
                threshold: 0.16,
              },
            )
          : undefined;

      revealItems.forEach((item, index) => {
        item.style.setProperty("--reveal-delay", `${Math.min((index % 8) * 0.045, 0.28)}s`);

        if (revealObserver) {
          revealObserver.observe(item);
          return;
        }

        revealItem(item);
      });

      document.querySelectorAll<HTMLElement>(".button").forEach((button) => {
        if (!button.dataset.buttonText) {
          button.dataset.buttonText = button.textContent?.trim() ?? "";
        }
      });

      const saveData = Boolean(
        (
          navigator as Navigator & {
            connection?: {
              saveData?: boolean;
            };
          }
        ).connection?.saveData,
      );
      const motionVideos = Array.from(
        document.querySelectorAll<HTMLVideoElement>("video[data-motion-video]"),
      );
      const pauseMotionVideo = (video: HTMLVideoElement) => {
        video.pause();
      };
      const playMotionVideo = (video: HTMLVideoElement) => {
        if (saveData) {
          return;
        }

        void video.play().catch(() => undefined);
      };
      const motionVideoObserver =
        !saveData && "IntersectionObserver" in window
          ? new IntersectionObserver(
              (entries) => {
                entries.forEach((entry) => {
                  const video = entry.target;

                  if (!(video instanceof HTMLVideoElement)) {
                    return;
                  }

                  if (entry.isIntersecting) {
                    playMotionVideo(video);
                    return;
                  }

                  pauseMotionVideo(video);
                });
              },
              {
                rootMargin: "18% 0px",
                threshold: 0.24,
              },
            )
          : undefined;

      motionVideos.forEach((video) => {
        video.pause();
        motionVideoObserver?.observe(video);
      });

      const syncVisibleReveals = () => {
        revealItems.forEach((item) => {
          if (item.classList.contains("is-revealed")) {
            return;
          }

          const rect = item.getBoundingClientRect();
          const entersViewport = rect.top <= window.innerHeight * 0.92;
          const stillVisible = rect.bottom >= window.innerHeight * -0.08;

          if (entersViewport && stillVisible) {
            revealItem(item, revealObserver);
          }
        });
      };

      let maskLocked = false;
      const finePointer =
        !compactMotion && window.matchMedia("(pointer: fine)").matches;
      const cursorRoot = document.querySelector<HTMLElement>(".nova-cursor");
      const cursorLabel = document.querySelector<HTMLElement>(".nova-cursor__label");
      const inspectRoot = document.querySelector<HTMLElement>(".inspect-loupe");
      const inspectTitle = inspectRoot?.querySelector<HTMLElement>(
        "[data-inspect-loupe-title]",
      );
      const inspectMeta = inspectRoot?.querySelector<HTMLElement>(
        "[data-inspect-loupe-meta]",
      );
      const inspectStatus = inspectRoot?.querySelector<HTMLElement>(
        "[data-inspect-loupe-status]",
      );
      const lockButton = document.querySelector<HTMLButtonElement>("[data-hero-mask-lock]");
      let cursorX = window.innerWidth / 2;
      let cursorY = window.innerHeight / 2;
      let cursorRingX = cursorX;
      let cursorRingY = cursorY;
      let cursorFrame = 0;
      const magneticTargets = finePointer
        ? Array.from(document.querySelectorAll<HTMLElement>(magneticTargetsSelector))
        : [];
      const magneticCleanups = magneticTargets.map((target) => {
        const handleMove = (event: PointerEvent) => {
          const rect = target.getBoundingClientRect();
          const x = ((event.clientX - rect.left) / rect.width - 0.5) * 18;
          const y = ((event.clientY - rect.top) / rect.height - 0.5) * 14;
          target.style.setProperty("--magnet-x", `${x}px`);
          target.style.setProperty("--magnet-y", `${y}px`);
        };
        const handleLeave = () => {
          target.style.removeProperty("--magnet-x");
          target.style.removeProperty("--magnet-y");
        };

        target.addEventListener("pointermove", handleMove);
        target.addEventListener("pointerleave", handleLeave);

        return () => {
          target.removeEventListener("pointermove", handleMove);
          target.removeEventListener("pointerleave", handleLeave);
        };
      });

      const updateCursorRing = () => {
        cursorFrame = 0;
        cursorRingX += (cursorX - cursorRingX) * 0.22;
        cursorRingY += (cursorY - cursorRingY) * 0.22;
        html.style.setProperty("--cursor-ring-x", `${cursorRingX}px`);
        html.style.setProperty("--cursor-ring-y", `${cursorRingY}px`);

        if (Math.abs(cursorX - cursorRingX) + Math.abs(cursorY - cursorRingY) > 0.4) {
          cursorFrame = requestFrame(updateCursorRing);
        }
      };

      const scheduleCursorRing = () => {
        if (finePointer && cursorFrame === 0) {
          cursorFrame = requestFrame(updateCursorRing);
        }
      };

      const getCursorLabel = (target: HTMLElement) => {
        if (target.dataset.cursorLabel) {
          return target.dataset.cursorLabel;
        }

        if (target.matches("input, textarea, select")) {
          return "type";
        }

        if (target instanceof HTMLAnchorElement) {
          return target.href.startsWith("mailto:") ? "send" : "open";
        }

        return "view";
      };

      const showInspectPanel = (target: HTMLElement) => {
        if (!finePointer || !inspectRoot) {
          return;
        }

        inspectRoot.classList.add("is-active");
        cursorRoot?.classList.add("is-inspecting");

        if (inspectTitle) {
          inspectTitle.textContent = target.dataset.inspectTitle ?? "NovaIQ";
        }

        if (inspectMeta) {
          inspectMeta.textContent = target.dataset.inspectMeta ?? "Inspect";
        }

        if (inspectStatus) {
          inspectStatus.textContent = target.dataset.inspectStatus ?? "Live";
        }
      };

      const hideInspectPanel = () => {
        inspectRoot?.classList.remove("is-active");
        cursorRoot?.classList.remove("is-inspecting");
      };

      function handleCursorOver(event: PointerEvent) {
        if (!finePointer || !cursorRoot || !cursorLabel) {
          return;
        }

        const inspectTarget = (event.target as HTMLElement | null)?.closest<HTMLElement>(
          "[data-inspect-title]",
        );

        if (inspectTarget) {
          showInspectPanel(inspectTarget);
        }

        const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
          cursorTargets,
        );

        if (!target) {
          return;
        }

        cursorRoot.classList.add("is-active");
        cursorLabel.textContent = getCursorLabel(target);
      }

      function handleCursorOut(event: PointerEvent) {
        if (!finePointer || !cursorRoot) {
          return;
        }

        const inspectTarget = (event.target as HTMLElement | null)?.closest<HTMLElement>(
          "[data-inspect-title]",
        );
        const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
          cursorTargets,
        );
        const related = event.relatedTarget as HTMLElement | null;

        if (inspectTarget && related && inspectTarget.contains(related)) {
          return;
        }

        if (inspectTarget) {
          hideInspectPanel();
        }

        if (target && related && target.contains(related)) {
          return;
        }

        cursorRoot.classList.remove("is-active");
      }

      function handlePointerDown() {
        if (finePointer) {
          cursorRoot?.classList.add("is-down");
        }
      }

      function handlePointerUp() {
        cursorRoot?.classList.remove("is-down");
      }

      function handleMaskToggle() {
        maskLocked = !maskLocked;
        html.classList.toggle("hero-mask-locked", maskLocked);

        if (lockButton) {
          lockButton.textContent = maskLocked ? "back to scroll" : "tap to lock";
        }
      }

      const updateMobileSidewaysSections = () => {
        if (window.innerWidth >= 1040) {
          return;
        }

        document.querySelectorAll<HTMLElement>(".sideways-section").forEach((section) => {
          section.dataset.sidewaysReady = "mobile";
        });
      };

      const agentFlowSections = Array.from(
        document.querySelectorAll<HTMLElement>("[data-agent-flow]"),
      )
        .map((section) => ({
          section,
          steps: Array.from(
            section.querySelectorAll<HTMLElement>("[data-flow-step]"),
          ),
        }))
        .filter(({ steps }) => steps.length > 0);

      const syncAgentFlows = () => {
        const viewportHeight = Math.max(window.innerHeight, 1);

        agentFlowSections.forEach(({ section, steps }) => {
          const rect = section.getBoundingClientRect();
          const start = viewportHeight * 0.68;
          const end = viewportHeight * 0.42;
          const distance = Math.max(rect.height + start - end, 1);
          const progress = clamp((start - rect.top) / distance, 0, 1);
          const activeIndex = clamp(
            Math.floor(progress * steps.length),
            0,
            steps.length - 1,
          );

          steps.forEach((step, index) => {
            step.classList.toggle("is-active", index <= activeIndex);
          });
        });
      };

      const updateProgress = () => {
        const maxScroll = html.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
        const velocity = clamp(Math.abs(lenis.velocity) / 58, 0, 1);

        html.style.setProperty("--scroll-progress", String(clamp(progress, 0, 1)));
        html.style.setProperty("--scroll-velocity", String(velocity));

        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${clamp(progress, 0, 1)})`;
        }

        if (velocityRef.current) {
          velocityRef.current.style.opacity = String(0.12 + velocity * 0.8);
          velocityRef.current.style.transform = `translateX(${progress * 100}vw) scaleX(${0.3 + velocity})`;
        }

        syncVisibleReveals();
        ScrollTrigger.update();
        syncAgentFlows();
      };

      const scheduleProgress = () => {
        if (progressFrame) {
          return;
        }

        progressFrame = requestFrame(() => {
          progressFrame = 0;
          updateProgress();
        });
      };

      const unsubscribe = lenis.on("scroll", scheduleProgress);

      const run = (time: number) => {
        lenis.raf(time);
        syncAgentFlows();
        raf = requestFrame(run);
      };

      raf = requestFrame(run);

      const ctx = gsap.context(() => {
        const chapterHudItems = Array.from(
          document.querySelectorAll<HTMLElement>("[data-chapter-hud-item]"),
        );
        const setActiveChapterHud = (target: string) => {
          chapterHudItems.forEach((item) => {
            item.classList.toggle("is-active", item.dataset.chapterTarget === target);
          });
        };

        chapterHudItems.forEach((item) => {
          const target = item.dataset.chapterTarget;
          const section = target ? document.querySelector<HTMLElement>(target) : null;

          if (!target || !section) {
            return;
          }

          ScrollTrigger.create({
            trigger: section,
            start: "top center",
            end: "bottom center",
            onEnter: () => setActiveChapterHud(target),
            onEnterBack: () => setActiveChapterHud(target),
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-scroll-film]").forEach((section) => {
          const pin = section.querySelector<HTMLElement>(".scroll-film__pin");
          const video = section.querySelector<HTMLVideoElement>(
            "[data-scroll-film-video]",
          );
          const steps = Array.from(
            section.querySelectorAll<HTMLElement>("[data-scroll-film-step]"),
          );
          const status = section.querySelector<HTMLElement>(
            "[data-scroll-film-status]",
          );
          const playhead = section.querySelector<HTMLElement>(
            "[data-scroll-film-playhead]",
          );

          if (!pin || !video) {
            return;
          }

          const setFilmState = (progress: number) => {
            const duration = video.duration;

            section.style.setProperty("--scroll-film-progress", String(progress));
            playhead?.style.setProperty("transform", `scaleX(${progress})`);

            if (Number.isFinite(duration) && duration > 0) {
              video.currentTime = clamp(progress * duration, 0, Math.max(0, duration - 0.06));
            }

            if (steps.length > 0) {
              const activeIndex = Math.round(progress * (steps.length - 1));
              const activeStep = steps[activeIndex] ?? steps[0];

              steps.forEach((step, index) => {
                step.classList.toggle("is-active", index === activeIndex);
                step.classList.toggle("is-complete", index < activeIndex);
              });

              if (status && activeStep?.dataset.scrollFilmTitle) {
                status.textContent = activeStep.dataset.scrollFilmTitle;
              }
            }
          };

          video.pause();
          video.addEventListener("loadedmetadata", () => setFilmState(0), {
            once: true,
          });

          ScrollTrigger.create({
            trigger: section,
            pin,
            pinSpacing: true,
            start: "top top",
            end: () => `+=${Math.max(window.innerHeight * 1.65, 960)}`,
            scrub: 0.32,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onEnter: () => section.classList.add("is-live"),
            onEnterBack: () => section.classList.add("is-live"),
            onLeave: () => section.classList.remove("is-live"),
            onLeaveBack: () => section.classList.remove("is-live"),
            onUpdate: (self) => setFilmState(self.progress),
          });
        });

        const heroChapters = Array.from(
          document.querySelectorAll<HTMLElement>("[data-hero-chapter]"),
        );
        const heroStatusTargets = Array.from(
          document.querySelectorAll<HTMLElement>(
            "[data-hero-status], [data-hero-broadcast]",
          ),
        );

        const setHeroChapter = (index: number) => {
          const safeIndex = clamp(index, 0, Math.max(heroChapters.length - 1, 0));
          const activeChapter = heroChapters[safeIndex];
          const status = activeChapter?.dataset.heroChapterStatus;

          heroChapters.forEach((chapter, chapterIndex) => {
            chapter.classList.toggle("is-active", chapterIndex === safeIndex);
            chapter.classList.toggle("is-complete", chapterIndex < safeIndex);
          });

          if (status) {
            heroStatusTargets.forEach((target) => {
              target.textContent = status;
            });
          }
        };

        if (heroChapters.length > 0) {
          setHeroChapter(0);

          ScrollTrigger.create({
            trigger: ".hero-stage",
            start: "top top",
            end: "bottom top",
            scrub: 0.4,
            onUpdate: (self) => {
              setHeroChapter(Math.round(self.progress * (heroChapters.length - 1)));
            },
          });
        }

        gsap.utils.toArray<HTMLElement>("[data-count-to]").forEach((counter) => {
          const target = Number(counter.dataset.countTo);

          if (!Number.isFinite(target)) {
            return;
          }

          const suffix = counter.dataset.countSuffix ?? "";
          const prefix = counter.dataset.countPrefix ?? "";
          const decimals = Number(counter.dataset.countDecimals ?? "0");
          const state = { value: 0 };
          const formatValue = (value: number) => {
            const rounded =
              decimals > 0
                ? value.toFixed(decimals)
                : String(Math.round(value));

            return `${prefix}${rounded}${suffix}`;
          };

          counter.textContent = formatValue(0);

          gsap.to(state, {
            value: target,
            duration: 1.18,
            ease: "power2.out",
            onUpdate: () => {
              counter.textContent = formatValue(state.value);
            },
            onComplete: () => {
              counter.textContent = formatValue(target);
            },
            scrollTrigger: {
              trigger: counter.closest("section") ?? counter,
              start: "top 82%",
              once: true,
            },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-scene-bridge]").forEach((bridge) => {
          const lines = bridge.querySelectorAll("i");

          gsap.fromTo(
            lines,
            { scaleX: 0 },
            {
              scaleX: 1,
              stagger: 0.08,
              ease: "none",
              scrollTrigger: {
                trigger: bridge,
                start: "top 88%",
                end: "bottom 44%",
                scrub: true,
              },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-sticky-product]").forEach((section) => {
          const steps = Array.from(
            section.querySelectorAll<HTMLElement>("[data-sticky-product-step]"),
          );
          const media = Array.from(
            section.querySelectorAll<HTMLElement>("[data-sticky-product-media]"),
          );
          const nodes = Array.from(
            section.querySelectorAll<HTMLElement>("[data-sticky-product-node]"),
          );
          const microRows = Array.from(
            section.querySelectorAll<HTMLElement>("[data-sticky-product-micro]"),
          );
          const videos = Array.from(
            section.querySelectorAll<HTMLVideoElement>("[data-sticky-product-video]"),
          );
          const status = section.querySelector<HTMLElement>(
            "[data-sticky-product-status]",
          );
          const headline = section.querySelector<HTMLElement>(
            "[data-sticky-product-headline]",
          );
          const progress = section.querySelector<HTMLElement>(
            "[data-sticky-product-progress]",
          );

          if (steps.length === 0) {
            return;
          }

          let productInView = false;
          let activeProductIndex = 0;
          const playActiveProductVideo = () => {
            videos.forEach((video, videoIndex) => {
              if (productInView && videoIndex === activeProductIndex && !saveData) {
                void video.play().catch(() => undefined);
                return;
              }

              video.pause();
            });
          };

          const setStickyProductStep = (index: number) => {
            const safeIndex = clamp(index, 0, steps.length - 1);
            const activeStep = steps[safeIndex];

            activeProductIndex = safeIndex;
            section.style.setProperty(
              "--sticky-product-index",
              String(safeIndex),
            );

            steps.forEach((step, stepIndex) => {
              step.classList.toggle("is-active", stepIndex === safeIndex);
              step.classList.toggle("is-complete", stepIndex < safeIndex);
            });

            media.forEach((item, itemIndex) => {
              item.classList.toggle("is-active", itemIndex === safeIndex);
            });

            nodes.forEach((node, nodeIndex) => {
              node.classList.toggle("is-active", nodeIndex === safeIndex);
              node.classList.toggle("is-complete", nodeIndex < safeIndex);
            });

            microRows.forEach((row, rowIndex) => {
              row.classList.toggle("is-active", rowIndex === safeIndex);
              row.classList.toggle("is-complete", rowIndex < safeIndex);
            });

            if (status && activeStep.dataset.productSignal) {
              status.textContent = activeStep.dataset.productSignal;
            }

            if (headline && activeStep.dataset.productTitle) {
              headline.textContent = activeStep.dataset.productTitle;
            }

            playActiveProductVideo();
          };

          setStickyProductStep(0);

          ScrollTrigger.create({
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            onEnter: () => {
              productInView = true;
              playActiveProductVideo();
            },
            onEnterBack: () => {
              productInView = true;
              playActiveProductVideo();
            },
            onLeave: () => {
              productInView = false;
              playActiveProductVideo();
            },
            onLeaveBack: () => {
              productInView = false;
              playActiveProductVideo();
            },
          });

          steps.forEach((step, index) => {
            ScrollTrigger.create({
              trigger: step,
              start: "top 56%",
              end: "bottom 42%",
              onEnter: () => setStickyProductStep(index),
              onEnterBack: () => setStickyProductStep(index),
            });
          });

          if (progress) {
            gsap.fromTo(
              progress,
              { scaleX: 0 },
              {
                scaleX: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: section,
                  start: "top 72%",
                  end: "bottom 55%",
                  scrub: true,
                },
              },
            );
          }
        });

        gsap.utils.toArray<HTMLElement>(".review-room").forEach((room) => {
          const comments = Array.from(
            room.querySelectorAll<HTMLElement>("[data-review-comment]"),
          );
          const ready = room.querySelector<HTMLElement>("[data-review-ready]");

          if (comments.length === 0) {
            return;
          }

          const setReviewState = (progress: number) => {
            const activeIndex = Math.round(progress * (comments.length - 1));
            const readyPercent = Math.round(72 + progress * 28);

            comments.forEach((comment, index) => {
              comment.classList.toggle("is-live", index <= activeIndex);
            });

            if (ready) {
              ready.textContent =
                progress > 0.92 ? "approved" : `${readyPercent}% ready`;
            }
          };

          setReviewState(0);

          ScrollTrigger.create({
            trigger: room,
            start: "top 72%",
            end: "bottom 38%",
            scrub: 0.5,
            onUpdate: (self) => setReviewState(self.progress),
          });
        });

        if (!compactMotion) {
          gsap.to(".hero-stage__image", {
            scale: 1.13,
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero-stage",
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });

          gsap.to(".hero-filmstrip", {
            yPercent: -24,
            xPercent: -8,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero-stage",
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });

          gsap.to(".hero-giant-type span:first-child", {
            xPercent: -8,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero-stage",
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });

          gsap.to(".hero-giant-type span:last-child", {
            xPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero-stage",
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });

          gsap.to(".hero-stage__content", {
            yPercent: -18,
            opacity: 0.24,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero-stage",
              start: "45% top",
              end: "bottom top",
              scrub: true,
            },
          });

          gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((item) => {
            const amount = Number(item.dataset.parallax ?? "12");
            const section = item.closest("section") ?? item;

            gsap.to(item, {
              yPercent: -amount,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            });
          });

          gsap.utils.toArray<HTMLElement>("[data-tilt-card]").forEach((card) => {
            gsap.fromTo(
              card,
              { rotateX: 10, rotateY: -7, scale: 0.96 },
              {
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  start: "top 92%",
                  end: "top 42%",
                  scrub: true,
                },
              },
            );
          });
        }

        if (window.matchMedia("(min-width: 1040px)").matches) {
          gsap.utils.toArray<HTMLElement>(".sideways-section").forEach((section) => {
            const pin = section.querySelector<HTMLElement>(".sideways-pin");
            const track = section.querySelector<HTMLElement>(".sideways-track");
            const cards = Array.from(
              section.querySelectorAll<HTMLElement>("[data-sideways-card]"),
            );
            const statusIndex = section.querySelector<HTMLElement>(
              "[data-sideways-index]",
            );
            const statusSignal = section.querySelector<HTMLElement>(
              "[data-sideways-signal]",
            );

            if (!pin || !track || cards.length === 0) {
              return;
            }

            const getDistance = () =>
              Math.max(0, track.scrollWidth - pin.clientWidth + window.innerWidth * 0.18);

            const updateSidewaysState = (progress: number) => {
              const activeIndex = Math.round(progress * (cards.length - 1));
              const activeCard = cards[activeIndex] ?? cards[0];

              section.dataset.sidewaysReady = "pinned";
              section.style.setProperty("--sideways-progress", String(progress));

              cards.forEach((card, index) => {
                const offset = (1 - progress) * (index % 2 === 0 ? 34 : 64);
                const rotate = (1 - progress) * (index % 2 === 0 ? 1.4 : -1.4);
                gsap.set(card, {
                  y: offset,
                  rotate,
                  transformOrigin: "center center",
                });
              });

              if (statusIndex) {
                statusIndex.textContent = String(activeIndex + 1).padStart(2, "0");
              }

              if (statusSignal && activeCard?.dataset.sidewaysCardSignal) {
                statusSignal.textContent = activeCard.dataset.sidewaysCardSignal;
              }
            };

            gsap.set(track, { x: 0 });
            updateSidewaysState(0);

            gsap.to(track, {
              x: () => -getDistance(),
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: () =>
                  `+=${Math.max(
                    window.innerHeight * 2.2,
                    getDistance() + window.innerHeight * 1.25,
                  )}`,
                scrub: 0.55,
                pin,
                pinSpacing: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onRefresh: (self) => updateSidewaysState(self.progress),
                onUpdate: (self) => updateSidewaysState(self.progress),
              },
            });
          });
        }

        gsap.utils.toArray<HTMLElement>(".nova-reading").forEach((section) => {
          const words = Array.from(
            section.querySelectorAll<HTMLElement>("[data-reading-word]"),
          );

          if (words.length === 0) {
            return;
          }

          ScrollTrigger.create({
            trigger: section,
            start: "top 72%",
            end: "bottom 36%",
            scrub: 0.8,
            onUpdate: (self) => {
              const activeIndex = Math.round(self.progress * (words.length - 1));

              words.forEach((word, index) => {
                word.classList.toggle("is-active", index <= activeIndex);
              });
            },
          });
        });

        if (!compactMotion) {
          gsap.utils.toArray<HTMLElement>("[data-story-panel]").forEach((panel) => {
            const image = panel.querySelector("[data-story-image]");
            const accent = panel.querySelector("[data-story-accent]");

            if (image) {
              gsap.to(image, {
                scale: 1.08,
                yPercent: -8,
                ease: "none",
                scrollTrigger: {
                  trigger: panel,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              });
            }

            if (accent) {
              gsap.fromTo(
                accent,
                { scaleX: 0 },
                {
                  scaleX: 1,
                  ease: "none",
                  scrollTrigger: {
                    trigger: panel,
                    start: "top 72%",
                    end: "bottom 62%",
                    scrub: true,
                  },
                },
              );
            }
          });

          gsap.utils.toArray<HTMLElement>(".review-room").forEach((room) => {
            const comments = Array.from(
              room.querySelectorAll<HTMLElement>("[data-review-comment]"),
            );
            const scan = room.querySelector<HTMLElement>("[data-review-scan]");
            const source = room.querySelector<HTMLElement>("[data-review-map]");

            comments.forEach((comment, index) => {
              gsap.fromTo(
                comment,
                {
                  xPercent: index % 2 === 0 ? 8 : -8,
                  y: 44 + index * 8,
                  rotate: index % 2 === 0 ? 2 : -2,
                },
                {
                  xPercent: 0,
                  y: 0,
                  rotate: 0,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: room,
                    start: "top 82%",
                    end: "center 46%",
                    scrub: true,
                  },
                },
              );
            });

            if (scan) {
              gsap.fromTo(
                scan,
                { y: 0 },
                {
                  y: () => Math.max(220, room.offsetHeight - 120),
                  ease: "none",
                  scrollTrigger: {
                    trigger: room,
                    start: "top 82%",
                    end: "bottom 28%",
                    scrub: true,
                  },
                },
              );
            }

            if (source) {
              gsap.to(source, {
                yPercent: -5,
                ease: "none",
                scrollTrigger: {
                  trigger: room,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              });
            }
          });

          gsap.to("[data-footer-orbit]", {
            rotate: 240,
            scale: 1.16,
            ease: "none",
            scrollTrigger: {
              trigger: ".final-footer",
              start: "top bottom",
              end: "bottom bottom",
              scrub: true,
            },
          });

          gsap.to("[data-footer-word]", {
            yPercent: -16,
            ease: "none",
            scrollTrigger: {
              trigger: ".final-footer",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });

          gsap.utils.toArray<HTMLElement>("[data-signal-core]").forEach((core) => {
            gsap.to(core, {
              rotate: 10,
              scale: 1.04,
              ease: "none",
              scrollTrigger: {
                trigger: core.closest("section, footer") ?? core,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            });
          });
        }
      });

      function handlePointerMove(event: PointerEvent) {
        cursorX = event.clientX;
        cursorY = event.clientY;
        html.style.setProperty("--cursor-x", `${cursorX}px`);
        html.style.setProperty("--cursor-y", `${cursorY}px`);
        scheduleCursorRing();

        if (!maskLocked) {
          html.style.setProperty("--mask-x", `${cursorX}px`);
          html.style.setProperty("--mask-y", `${cursorY}px`);
        }
      }

      function handleResize() {
        updateMobileSidewaysSections();
        lenis.resize();
        ScrollTrigger.refresh();
        scheduleProgress();
      }

      document.addEventListener("pointermove", handlePointerMove);
      document.addEventListener("pointerover", handleCursorOver);
      document.addEventListener("pointerout", handleCursorOut);
      document.addEventListener("pointerdown", handlePointerDown);
      document.addEventListener("pointerup", handlePointerUp);
      lockButton?.addEventListener("click", handleMaskToggle);
      window.addEventListener("scroll", scheduleProgress, { passive: true });
      window.addEventListener("resize", handleResize);
      const refreshTimer = window.setTimeout(() => {
        lenis.resize();
        ScrollTrigger.refresh();
        updateProgress();
      }, 900);
      const revealKickTimer = window.setTimeout(syncVisibleReveals, 140);

      updateMobileSidewaysSections();
      syncVisibleReveals();
      ScrollTrigger.refresh();
      updateProgress();

      cleanupAnimations = () => {
        document.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("pointerover", handleCursorOver);
        document.removeEventListener("pointerout", handleCursorOut);
        document.removeEventListener("pointerdown", handlePointerDown);
        document.removeEventListener("pointerup", handlePointerUp);
        lockButton?.removeEventListener("click", handleMaskToggle);
        window.removeEventListener("scroll", scheduleProgress);
        window.removeEventListener("resize", handleResize);
        window.clearTimeout(refreshTimer);
        window.clearTimeout(revealKickTimer);
        cancelFrame(progressFrame);
        cancelFrame(cursorFrame);
        motionVideoObserver?.disconnect();
        motionVideos.forEach((video) => video.pause());
        magneticCleanups.forEach((cleanup) => cleanup());
        revealObserver?.disconnect();
        revealItems.forEach((item) => item.classList.remove("is-revealed"));
        unsubscribe();
        ctx.revert();
      };
    }

    void setupMotion();

    return () => {
      active = false;
      cancelFrame(raf);
      cleanupAnimations?.();
      lenisInstance?.destroy();
      delete (window as NovaWindow).novaLenis;
      html.classList.remove("motion-ready");
      html.style.removeProperty("--scroll-progress");
      html.style.removeProperty("--scroll-velocity");
      html.style.removeProperty("--cursor-x");
      html.style.removeProperty("--cursor-y");
      html.style.removeProperty("--cursor-ring-x");
      html.style.removeProperty("--cursor-ring-y");
    };
  }, []);

  return (
    <>
      <div className="motion-hud" aria-hidden="true">
        <div ref={progressRef} className="motion-hud__progress" />
        <div ref={velocityRef} className="motion-hud__velocity" />
      </div>
      <div className="nova-cursor" aria-hidden="true">
        <span className="nova-cursor__dot" />
        <span className="nova-cursor__ring">
          <em className="nova-cursor__label">view</em>
        </span>
      </div>
      <div className="inspect-loupe" aria-hidden="true">
        <span data-inspect-loupe-meta>Inspect</span>
        <strong data-inspect-loupe-title>NovaIQ</strong>
        <p data-inspect-loupe-status>Live</p>
      </div>
    </>
  );
}
