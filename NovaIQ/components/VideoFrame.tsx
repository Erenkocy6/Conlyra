"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn, prefersReducedMotion } from "@/lib/utils";

type VideoFrameProps = {
  src: string;
  mobileSrc?: string;
  poster: string;
  title: string;
  eyebrow?: string;
  label?: string;
  source?: string;
  aspect?: "wide" | "tall" | "square" | "panel";
  className?: string;
  videoClassName?: string;
  cursorLabel?: string;
  showSource?: boolean;
  showTitle?: boolean;
  children?: ReactNode;
};

const aspectClasses = {
  wide: "aspect-[16/9]",
  tall: "aspect-[4/5]",
  square: "aspect-square",
  panel: "aspect-[1.22/1]",
};

export function VideoFrame({
  src,
  mobileSrc,
  poster,
  title,
  eyebrow = "Video",
  label,
  source,
  aspect = "wide",
  className,
  videoClassName,
  cursorLabel = "Play",
  showSource = true,
  showTitle = true,
  children,
}: VideoFrameProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const connection = navigator as Navigator & {
      connection?: { saveData?: boolean };
    };

    if (prefersReducedMotion() || connection.connection?.saveData) {
      video.pause();
      return;
    }

    let active = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!active) {
          return;
        }

        if (entry?.isIntersecting) {
          void video.play().catch(() => undefined);
          return;
        }

        video.pause();
      },
      { threshold: 0.28 },
    );

    observer.observe(video);

    return () => {
      active = false;
      observer.disconnect();
      video.pause();
    };
  }, [src, mobileSrc]);

  return (
    <figure
      className={cn(
        "nova-video group relative isolate overflow-hidden border border-white/10 bg-ink shadow-[0_34px_120px_rgba(0,0,0,0.4)]",
        aspectClasses[aspect],
        className,
      )}
      data-cursor-label={cursorLabel}
    >
      <video
        ref={videoRef}
        className={cn(
          "absolute inset-0 h-full w-full object-cover opacity-78 saturate-[0.9] transition duration-700 group-hover:scale-[1.035] group-hover:opacity-95",
          isReady ? "blur-0" : "blur-sm",
          videoClassName,
        )}
        muted
        loop
        playsInline
        preload="none"
        poster={poster}
        aria-label={title}
        onCanPlay={() => setIsReady(true)}
      >
        {mobileSrc ? (
          <source media="(max-width: 767px)" src={mobileSrc} type="video/mp4" />
        ) : null}
        <source src={src} type="video/mp4" />
      </video>

      <div className="nova-video__wash" aria-hidden="true" />
      <div className="nova-video__scan" aria-hidden="true" />
      <div className="nova-video__grid" aria-hidden="true" />

      <figcaption className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-4 p-4 sm:p-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-cyan">
            {eyebrow}
          </p>
          {label ? (
            <p className="mt-2 max-w-[18rem] text-sm font-semibold leading-5 text-paper/72">
              {label}
            </p>
          ) : null}
        </div>
        {showSource && source ? (
          <span className="border border-white/12 bg-ink/54 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.08em] text-paper/58 backdrop-blur">
            {source}
          </span>
        ) : null}
      </figcaption>

      {showTitle ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5">
          <p className="max-w-xl text-2xl font-semibold leading-none tracking-[-0.045em] text-paper sm:text-4xl">
            {title}
          </p>
        </div>
      ) : null}

      {children ? <div className="absolute inset-0 z-20">{children}</div> : null}
    </figure>
  );
}
