"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type RouteAtlasItem = {
  phase: string;
  title: string;
  copy: string;
  image: string;
  signal: string;
  videoSrc?: string;
  mobileVideoSrc?: string;
  poster?: string;
};

type HorizontalRouteAtlasProps = {
  items: RouteAtlasItem[];
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  copy?: string;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function listenToMediaQuery(query: MediaQueryList, listener: () => void) {
  const legacyQuery = query as MediaQueryList & {
    addListener?: (listener: () => void) => void;
    removeListener?: (listener: () => void) => void;
  };

  if (typeof legacyQuery.addEventListener === "function") {
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }

  legacyQuery.addListener?.(listener);
  return () => legacyQuery.removeListener?.(listener);
}

export function HorizontalRouteAtlas({
  items,
  id = "route-atlas",
  eyebrow = "Sideways System",
  title = (
    <>
      Der Content-Flow bewegt sich <span className="type-contrast">seitlich</span>,
      weil Teams nicht linear arbeiten.
    </>
  ),
  copy = "Quellen, Narrative, Review und Queue passieren nicht als simple Checkliste. NovaIQ macht daraus eine sichtbare Route, die beim Scrollen quer durch das System läuft.",
}: HorizontalRouteAtlasProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!section || !pin || !viewport || !track) {
      return;
    }

    let raf = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 1040px)");
    const requestFrame =
      typeof window.requestAnimationFrame === "function"
        ? window.requestAnimationFrame.bind(window)
        : (callback: FrameRequestCallback) =>
            window.setTimeout(() => callback(Date.now()), 16);
    const cancelFrame =
      typeof window.cancelAnimationFrame === "function"
        ? window.cancelAnimationFrame.bind(window)
        : window.clearTimeout.bind(window);

    const sync = () => {
      raf = 0;
      const isDesktop = desktop.matches && !reduceMotion.matches;
      const cards = Array.from(
        track.querySelectorAll<HTMLElement>("[data-sideways-card]"),
      );

      if (!isDesktop) {
        section.dataset.sidewaysReady = "mobile";
        section.style.removeProperty("min-height");
        section.style.removeProperty("--sideways-progress");
        track.style.removeProperty("transform");
        cards.forEach((card) => card.style.removeProperty("transform"));

        const maxScroll = Math.max(1, viewport.scrollWidth - viewport.clientWidth);
        const mobileProgress = clamp(viewport.scrollLeft / maxScroll, 0, 1);
        setActiveIndex(Math.round(mobileProgress * (items.length - 1)));
        return;
      }

      if (section.dataset.sidewaysReady !== "pinned") {
        section.dataset.sidewaysReady = "awaiting-pin";
      }
    };

    const requestSync = () => {
      if (raf === 0) {
        raf = requestFrame(sync);
      }
    };

    const resizeObserver =
      typeof window.ResizeObserver === "function"
        ? new window.ResizeObserver(requestSync)
        : undefined;
    resizeObserver?.observe(track);

    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);
    viewport.addEventListener("scroll", requestSync, { passive: true });
    const removeReduceMotionListener = listenToMediaQuery(reduceMotion, requestSync);
    const removeDesktopListener = listenToMediaQuery(desktop, requestSync);

    requestSync();
    const settleTimer = window.setTimeout(requestSync, 180);

    return () => {
      if (raf !== 0) {
        cancelFrame(raf);
      }

      window.clearTimeout(settleTimer);
      resizeObserver?.disconnect();
      window.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", requestSync);
      viewport.removeEventListener("scroll", requestSync);
      removeReduceMotionListener();
      removeDesktopListener();
    };
  }, [items.length]);

  const activeItem = items[activeIndex] ?? items[0];
  const titleId = `${id}-title`;

  return (
    <section
      id={id}
      className="sideways-section"
      ref={sectionRef}
      aria-labelledby={titleId}
    >
      <div className="sideways-pin" ref={pinRef}>
        <div className="section-inner sideways-heading" data-reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 id={titleId}>{title}</h2>
          <p>{copy}</p>
        </div>

        <div
          className="sideways-status section-inner"
          data-sideways-status
          aria-live="polite"
        >
          <span data-sideways-index>{String(activeIndex + 1).padStart(2, "0")}</span>
          <strong data-sideways-signal>{activeItem.signal}</strong>
          <i aria-hidden="true" />
        </div>

        <div
          className="sideways-viewport"
          ref={viewportRef}
          aria-label="NovaIQ Route Atlas"
        >
          <div className="sideways-track" ref={trackRef}>
            {items.map((item) => (
              <article
                className="sideways-card"
                key={item.phase}
                data-sideways-card
                data-sideways-card-signal={item.signal}
                data-reveal
                data-cursor-label={item.signal}
                data-inspect-title={item.title}
                data-inspect-meta={item.phase}
                data-inspect-status={item.signal}
              >
                <div className="sideways-card__media">
                  {item.videoSrc ? (
                    <video
                      data-motion-video
                      className="sideways-card__video"
                      muted
                      loop
                      playsInline
                      preload="none"
                      poster={item.poster}
                      aria-hidden="true"
                    >
                      {item.mobileVideoSrc ? (
                        <source
                          media="(max-width: 767px)"
                          src={item.mobileVideoSrc}
                          type="video/mp4"
                        />
                      ) : null}
                      <source src={item.videoSrc} type="video/mp4" />
                    </video>
                  ) : null}
                  <Image
                    src={item.image}
                    alt={`${item.signal} im NovaIQ System`}
                    fill
                    sizes="(min-width: 1040px) 52vw, 86vw"
                    className={item.videoSrc ? "sideways-card__fallback" : undefined}
                  />
                </div>
                <div className="sideways-card__copy">
                  <span>{item.phase}</span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                  <strong>{item.signal}</strong>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
