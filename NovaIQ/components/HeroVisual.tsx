"use client";

import { useEffect, useRef, useState } from "react";
import { platformPreviews, productOpportunities } from "@/data/landing";
import { cn, prefersReducedMotion } from "@/lib/utils";

type Platform = keyof typeof platformPreviews;

const platforms = Object.keys(platformPreviews) as Platform[];

type HeroVisualProps = {
  immersive?: boolean;
  className?: string;
};

export function HeroVisual({ immersive = false, className }: HeroVisualProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [platform, setPlatform] = useState<Platform>("LinkedIn");
  const activePreview = platformPreviews[platform];

  useEffect(() => {
    const root = rootRef.current;

    if (!root || prefersReducedMotion()) {
      return;
    }
    const element = root;

    function handlePointerMove(event: PointerEvent) {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      element.style.setProperty("--dashboard-tilt-x", `${y * -5}deg`);
      element.style.setProperty("--dashboard-tilt-y", `${x * 7}deg`);
      element.style.setProperty("--dashboard-glow-x", `${(x + 0.5) * 100}%`);
      element.style.setProperty("--dashboard-glow-y", `${(y + 0.5) * 100}%`);
    }

    function handlePointerLeave() {
      element.style.setProperty("--dashboard-tilt-x", "0deg");
      element.style.setProperty("--dashboard-tilt-y", "0deg");
      element.style.setProperty("--dashboard-glow-x", "50%");
      element.style.setProperty("--dashboard-glow-y", "50%");
    }

    element.addEventListener("pointermove", handlePointerMove);
    element.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      element.removeEventListener("pointermove", handlePointerMove);
      element.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={cn(
        "hero-visual relative mx-auto w-full max-w-[65rem] overflow-hidden rounded-[28px] border border-white/12 bg-graphite/80 p-3 shadow-[0_40px_160px_rgba(0,0,0,0.48)] backdrop-blur-2xl",
        immersive && "max-w-none",
        className,
      )}
      aria-label="NovaIQ Dashboard Vorschau mit Content-Chancen, Post-Vorschlag und Freigabe"
      role="img"
      style={{
        transform:
          "perspective(1200px) rotateX(var(--dashboard-tilt-x, 0deg)) rotateY(var(--dashboard-tilt-y, 0deg))",
        transition: "transform 420ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_var(--dashboard-glow-x,50%)_var(--dashboard-glow-y,50%),rgba(34,211,238,0.22),transparent_32rem)]" />
      <div className="pointer-events-none absolute -left-20 top-10 size-52 rounded-full bg-violet/24 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-8 size-56 rounded-full bg-cyan/18 blur-3xl" />
      <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-ink">
        <div className="nova-grid absolute inset-0 opacity-70" />
        <div className="relative z-10 flex min-h-[34rem] flex-col">
          <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.035] px-4 py-3 sm:px-5">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-full border border-cyan/20 bg-cyan/[0.08]">
                <span className="size-2.5 rounded-full bg-cyan shadow-[0_0_24px_rgba(34,211,238,0.85)]" />
              </span>
              <div>
                <p className="text-sm font-semibold text-paper">NovaIQ OS</p>
                <p className="text-xs text-muted">Content Opportunity Radar</p>
              </div>
            </div>
            <div className="hidden items-center gap-2 rounded-full border border-acid/20 bg-acid/[0.08] px-3 py-1.5 text-xs font-bold uppercase text-acid sm:flex">
              <span className="size-1.5 rounded-full bg-acid" />
              Approval required
            </div>
          </div>

          <div className="grid flex-1 gap-3 p-3 lg:grid-cols-[17rem_1fr_15rem]">
            <aside className="rounded-[18px] border border-white/10 bg-white/[0.045] p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-muted">
                  Chancen
                </p>
                <span className="rounded-full bg-cyan/[0.12] px-2.5 py-1 text-xs font-bold text-cyan">
                  Live
                </span>
              </div>
              <div className="mt-4 space-y-3">
                {productOpportunities.map((item, index) => (
                  <article
                    key={item.title}
                    className={cn(
                      "rounded-[14px] border p-3 transition duration-300",
                      index === 0
                        ? "border-cyan/30 bg-cyan/[0.08]"
                        : "border-white/10 bg-ink/52",
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[0.68rem] font-bold uppercase tracking-[0.08em] text-muted">
                        {item.source}
                      </p>
                      <span className="text-xs font-bold text-cyan">
                        {item.score}
                      </span>
                    </div>
                    <h3 className="mt-2 text-sm font-semibold leading-5 text-paper">
                      {item.title}
                    </h3>
                    <div className="mt-3 flex items-center justify-between text-xs text-muted">
                      <span>{item.channel}</span>
                      <span>{item.status}</span>
                    </div>
                  </article>
                ))}
              </div>
            </aside>

            <main className="relative overflow-hidden rounded-[18px] border border-white/10 bg-[linear-gradient(145deg,rgba(30,41,59,0.72),rgba(17,24,39,0.86))] p-4 sm:p-5">
              <div className="absolute right-4 top-4 rounded-full border border-violet/20 bg-violet/[0.1] px-3 py-1.5 text-xs font-bold uppercase text-violet">
                AI Draft
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-muted">
                Vorgeschlagener Post
              </p>
              <h3 className="mt-5 max-w-xl text-3xl font-semibold leading-none tracking-[-0.04em] text-paper sm:text-5xl">
                {activePreview.hook}
              </h3>
              <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">
                {activePreview.body}
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {platforms.map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={platform === item}
                    onClick={() => setPlatform(item)}
                    className={cn(
                      "rounded-full border px-2 py-2 text-xs font-bold transition duration-300 sm:px-4 sm:text-sm",
                      platform === item
                        ? "border-cyan/30 bg-cyan/[0.12] text-cyan"
                        : "border-white/10 bg-white/[0.045] text-muted hover:border-white/20 hover:text-paper",
                    )}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {[
                  ["Brand Fit", "96%"],
                  ["Status", activePreview.status],
                  ["Gate", "Human"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-[14px] border border-white/10 bg-ink/52 p-4"
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.08em] text-muted">
                      {label}
                    </p>
                    <p className="mt-2 break-words text-base font-semibold leading-tight text-paper sm:text-lg">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </main>

            <aside className="rounded-[18px] border border-white/10 bg-white/[0.045] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-muted">
                Freigabe
              </p>
              <div className="mt-5 space-y-4">
                {[
                  ["Detect", "done"],
                  ["Idea", "done"],
                  ["Approve", "active"],
                  ["Publish", "locked"],
                ].map(([label, state]) => (
                  <div key={label} className="flex items-center gap-3">
                    <span
                      className={cn(
                        "grid size-8 place-items-center rounded-full border text-[0.6rem] font-bold uppercase",
                        state === "done" &&
                          "border-acid/30 bg-acid/[0.12] text-acid",
                        state === "active" &&
                          "border-cyan/30 bg-cyan/[0.12] text-cyan",
                        state === "locked" &&
                          "border-white/10 bg-white/[0.04] text-muted",
                      )}
                    >
                      {state === "done" ? "ok" : state === "active" ? "now" : "off"}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-paper">
                        {label}
                      </p>
                      <p className="text-xs text-muted">
                        {state === "locked"
                          ? "wartet"
                          : state === "active"
                            ? "in Prüfung"
                            : "abgeschlossen"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-7 rounded-[14px] border border-acid/18 bg-acid/[0.08] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-acid">
                  Ready after approval
                </p>
                <p className="mt-3 text-sm leading-6 text-paper/76">
                  Veröffentlichung bleibt gesperrt, bis Marketing den Beitrag
                  freigibt.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
