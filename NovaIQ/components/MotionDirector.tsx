"use client";

import { useEffect, useRef } from "react";
import type Lenis from "lenis";
import { prefersReducedMotion } from "@/lib/utils";

type NovaWindow = Window & {
  novaLenis?: Pick<Lenis, "scrollTo" | "resize">;
};

const cursorTargets =
  "[data-cursor-label], a, button, [role='button'], input, textarea, select, .magnetic-button, .content-card, .decoder-box, .nova-video";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function MotionDirector() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);
  const velocityRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const html = document.documentElement;
    const reducedMotion = prefersReducedMotion();

    if (reducedMotion) {
      html.classList.add("motion-reduced");
      return () => html.classList.remove("motion-reduced");
    }

    let raf = 0;
    let lenisInstance: Lenis | undefined;
    let cleanupScrollTrigger: (() => void) | undefined;
    let active = true;

    async function setupLenis() {
      const [{ default: LenisClass }, scrollModule] = await Promise.all([
        import("lenis"),
        import("gsap/ScrollTrigger"),
      ]);
      const { ScrollTrigger } = scrollModule;

      if (!active) {
        return;
      }

      const lenis = new LenisClass({
        lerp: 0.082,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.86,
        touchMultiplier: 1.08,
        anchors: false,
        prevent: (node) =>
          node.closest("[data-lenis-prevent], textarea, select") !== null,
      });

      lenisInstance = lenis;
      (window as NovaWindow).novaLenis = lenis;
      html.classList.add("motion-lenis-ready");

      const updateProgress = () => {
        const maxScroll =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;

        html.style.setProperty("--scroll-progress", String(clamp(progress, 0, 1)));
        html.style.setProperty(
          "--scroll-velocity",
          String(clamp(Math.abs(lenis.velocity) / 58, 0, 1)),
        );

        if (velocityRef.current) {
          velocityRef.current.style.transform = `scaleX(${clamp(
            Math.abs(lenis.velocity) / 42,
            0,
            1,
          )})`;
        }

        ScrollTrigger.update();
      };

      const unsubscribe = lenis.on("scroll", updateProgress);
      cleanupScrollTrigger = unsubscribe;

      const run = (time: number) => {
        lenis.raf(time);
        raf = requestAnimationFrame(run);
      };

      raf = requestAnimationFrame(run);
      ScrollTrigger.refresh();
      updateProgress();
    }

    void setupLenis();

    return () => {
      active = false;
      cancelAnimationFrame(raf);
      cleanupScrollTrigger?.();
      lenisInstance?.destroy();
      delete (window as NovaWindow).novaLenis;
      html.classList.remove("motion-lenis-ready");
      html.style.removeProperty("--scroll-progress");
      html.style.removeProperty("--scroll-velocity");
    };
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;
    const reducedMotion = prefersReducedMotion();
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (!cursor || !dot || !label || reducedMotion || !canHover) {
      return;
    }

    const cursorLabel = label;
    let cleanup: (() => void) | undefined;
    let active = true;

    async function setupCursor() {
      const { gsap } = await import("gsap");

      if (!active) {
        return;
      }

      const html = document.documentElement;
      const cursorX = gsap.quickTo(cursor, "x", {
        duration: 0.42,
        ease: "power3.out",
      });
      const cursorY = gsap.quickTo(cursor, "y", {
        duration: 0.42,
        ease: "power3.out",
      });
      const dotX = gsap.quickTo(dot, "x", {
        duration: 0.12,
        ease: "power3.out",
      });
      const dotY = gsap.quickTo(dot, "y", {
        duration: 0.12,
        ease: "power3.out",
      });
      const cursorScale = gsap.quickTo(cursor, "scale", {
        duration: 0.28,
        ease: "power3.out",
      });

      function handlePointerMove(event: PointerEvent) {
        html.classList.add("motion-cursor-active");
        html.style.setProperty("--cursor-x", `${event.clientX}px`);
        html.style.setProperty("--cursor-y", `${event.clientY}px`);
        cursorX(event.clientX);
        cursorY(event.clientY);
        dotX(event.clientX);
        dotY(event.clientY);
      }

      function handlePointerOver(event: PointerEvent) {
        const target = (event.target as Element | null)?.closest(cursorTargets);

        if (target) {
          const nextLabel =
            target.getAttribute("data-cursor-label") ??
            (target.classList.contains("nova-video") ? "Play" : "");

          html.classList.add("motion-cursor-hover");
          if (nextLabel) {
            cursorLabel.textContent = nextLabel;
            html.classList.add("motion-cursor-labelled");
            cursorScale(2.08);
          } else {
            cursorLabel.textContent = "";
            html.classList.remove("motion-cursor-labelled");
            cursorScale(1.8);
          }
          return;
        }

        cursorLabel.textContent = "";
        html.classList.remove("motion-cursor-hover", "motion-cursor-labelled");
        cursorScale(1);
      }

      function handlePointerLeave() {
        cursorLabel.textContent = "";
        html.classList.remove(
          "motion-cursor-active",
          "motion-cursor-hover",
          "motion-cursor-labelled",
        );
      }

      document.addEventListener("pointermove", handlePointerMove);
      document.addEventListener("pointerover", handlePointerOver);
      document.addEventListener("pointerleave", handlePointerLeave);

      cleanup = () => {
        document.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("pointerover", handlePointerOver);
        document.removeEventListener("pointerleave", handlePointerLeave);
        html.classList.remove(
          "motion-cursor-active",
          "motion-cursor-hover",
          "motion-cursor-labelled",
        );
        html.style.removeProperty("--cursor-x");
        html.style.removeProperty("--cursor-y");
      };
    }

    void setupCursor();

    return () => {
      active = false;
      cleanup?.();
    };
  }, []);

  return (
    <>
      <div className="motion-field" aria-hidden="true" />
      <div className="motion-progress" aria-hidden="true">
        <div className="motion-progress__bar" />
        <div ref={velocityRef} className="motion-progress__velocity" />
      </div>
      <div ref={cursorRef} className="nova-cursor" aria-hidden="true">
        <span ref={labelRef} className="nova-cursor-label" />
      </div>
      <div ref={dotRef} className="nova-cursor-dot" aria-hidden="true" />
    </>
  );
}
