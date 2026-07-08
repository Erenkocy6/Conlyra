"use client";

import { useEffect, useRef, useState } from "react";
import { platformPreviews, productOpportunities, videoScenes } from "@/data/landing";
import { RevealText } from "@/components/RevealText";
import { VideoFrame } from "@/components/VideoFrame";
import { cn, prefersReducedMotion } from "@/lib/utils";

type Platform = keyof typeof platformPreviews;

const platforms = Object.keys(platformPreviews) as Platform[];

const scheduleSlots = [
  { day: "Di", time: "09:20", status: "Review" },
  { day: "Mi", time: "14:00", status: "Ready" },
  { day: "Fr", time: "11:30", status: "Locked" },
];

const operationFlow = [
  ["Upload", "Material rein"],
  ["Detect", "Signal erkannt"],
  ["Draft", "Kanalidee gebaut"],
  ["Review", "Mensch prüft"],
  ["Schedule", "Queue wartet"],
];

export function ProductDemo() {
  const [platform, setPlatform] = useState<Platform>("LinkedIn");
  const panelRef = useRef<HTMLDivElement | null>(null);
  const preview = platformPreviews[platform];

  useEffect(() => {
    const panel = panelRef.current;

    if (!panel || prefersReducedMotion()) {
      return;
    }

    let cleanup: (() => void) | undefined;
    let active = true;

    async function animatePanel() {
      const { gsap } = await import("gsap");

      if (!active || !panelRef.current) {
        return;
      }

      const ctx = gsap.context(() => {
        gsap.fromTo(
          "[data-product-card]",
          { y: 18, opacity: 0, filter: "blur(8px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.055,
          },
        );
      }, panelRef.current);

      cleanup = () => ctx.revert();
    }

    void animatePanel();

    return () => {
      active = false;
      cleanup?.();
    };
  }, [platform]);

  return (
    <section
      id="produkt"
      className="section-pad relative overflow-hidden"
      aria-labelledby="product-title"
    >
      <div className="absolute inset-x-0 top-1/3 -z-10 h-[36rem] bg-[radial-gradient(ellipse_at_50%_50%,rgba(34,211,238,0.12),transparent_65%)]" />
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <RevealText as="p" className="eyebrow mb-5 text-cyan">
              Product Preview
            </RevealText>
            <RevealText
              as="h2"
              id="product-title"
              className="section-title max-w-3xl text-paper"
            >
              Ein Dashboard, das Content-Chancen sichtbar macht.
            </RevealText>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-muted lg:justify-self-end">
            Kein generischer Textgenerator. NovaIQ verbindet Signale, Brand
            Voice, Plattformen, Status und Veröffentlichung in einem
            kontrollierten Workflow.
          </p>
        </div>

        <div
          ref={panelRef}
          className="nova-card mt-12 overflow-hidden rounded-[28px] p-3 sm:p-4"
        >
          <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-ink">
            <div className="nova-grid absolute inset-0 opacity-60" />
            <div className="relative z-10 border-b border-white/10 bg-white/[0.035] px-4 py-4 sm:px-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-semibold text-paper">
                    NovaIQ Content Operations
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    Live workspace for B2B marketing teams
                  </p>
                </div>
                <div className="grid grid-cols-3 rounded-full border border-white/10 bg-white/[0.045] p-1">
                  {platforms.map((item) => (
                    <button
                      key={item}
                      type="button"
                      aria-pressed={platform === item}
                      onClick={() => setPlatform(item)}
                      data-cursor-label={item}
                      className={cn(
                        "rounded-full px-2 py-2 text-xs font-bold transition duration-300 sm:px-3 sm:text-sm",
                        platform === item
                          ? "bg-cyan text-ink"
                          : "text-muted hover:text-paper",
                      )}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative z-10 border-b border-white/10 bg-ink/42 px-4 py-4 sm:px-6">
              <div className="grid gap-2 sm:grid-cols-5">
                {operationFlow.map(([label, copy], index) => (
                  <div
                    key={label}
                    data-product-card
                    data-cursor-label={label}
                    className={cn(
                      "border px-3 py-3",
                      index < 3
                        ? "border-cyan/20 bg-cyan/[0.06]"
                        : "border-white/10 bg-white/[0.035]",
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs font-bold uppercase tracking-[0.08em] text-paper">
                        {label}
                      </p>
                      <span
                        className={cn(
                          "size-2 rounded-full",
                          index < 3 ? "bg-acid" : "bg-white/22",
                        )}
                      />
                    </div>
                    <p className="mt-2 text-xs leading-5 text-muted">{copy}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 grid gap-4 p-4 lg:grid-cols-[18rem_1fr_16rem] lg:p-6">
              <aside className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-muted">
                  Content Opportunities
                </p>
                {productOpportunities.map((item, index) => (
                  <article
                    key={item.title}
                    data-product-card
                    className={cn(
                      "rounded-[18px] border p-4",
                      index === 0
                        ? "border-cyan/30 bg-cyan/[0.08]"
                        : "border-white/10 bg-white/[0.045]",
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-bold uppercase tracking-[0.08em] text-muted">
                        {item.source}
                      </span>
                      <span className="rounded-full bg-white/[0.08] px-2 py-1 text-xs font-bold text-cyan">
                        {item.score}
                      </span>
                    </div>
                    <h3 className="mt-3 text-base font-semibold leading-tight text-paper">
                      {item.title}
                    </h3>
                    <div className="mt-4 flex items-center justify-between text-sm text-muted">
                      <span>{item.channel}</span>
                      <span>{item.status}</span>
                    </div>
                  </article>
                ))}
              </aside>

              <main
                data-product-card
                className="rounded-[22px] border border-white/10 bg-[linear-gradient(145deg,rgba(30,41,59,0.86),rgba(17,24,39,0.84))] p-5 sm:p-7"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.08em] text-cyan">
                      Suggested Post / {platform}
                    </p>
                    <h3 className="mt-4 max-w-2xl text-3xl font-semibold leading-none tracking-[-0.045em] text-paper sm:text-5xl">
                      {preview.hook}
                    </h3>
                  </div>
                  <span className="w-fit rounded-full border border-acid/25 bg-acid/[0.1] px-3 py-1.5 text-xs font-bold uppercase text-acid">
                    approval required
                  </span>
                </div>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
                  {preview.body}
                </p>

                <VideoFrame
                  src={videoScenes.workspace.src}
                  mobileSrc={videoScenes.workspace.mobileSrc}
                  poster={videoScenes.workspace.poster}
                  eyebrow="Live Workspace"
                  label={`${platform} Preview`}
                  title="Der Entwurf bleibt sichtbar, bevor er in die Queue geht."
                  source={videoScenes.workspace.source}
                  aspect="wide"
                  className="mt-7 min-h-[16rem] border-white/10"
                  cursorLabel="Preview"
                  showTitle={false}
                >
                  <div className="absolute bottom-4 left-4 right-4 grid gap-2 sm:grid-cols-3">
                    {["Hook", "Caption", "Review"].map((item, index) => (
                      <div
                        key={item}
                        className="border border-white/10 bg-ink/58 px-3 py-2 backdrop-blur-md"
                      >
                        <p className="text-[0.62rem] font-bold uppercase tracking-[0.08em] text-paper/42">
                          Step 0{index + 1}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-paper">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </VideoFrame>

                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  {[
                    ["Brand Safety", "aktiv"],
                    ["Status", preview.status],
                    ["Publish", "gesperrt"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-[16px] border border-white/10 bg-ink/58 p-4"
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

              <aside data-product-card className="space-y-3">
                <div className="rounded-[18px] border border-white/10 bg-white/[0.045] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-muted">
                    Approval Status
                  </p>
                  <div className="mt-5 space-y-3">
                    {["Entwurf erstellt", "Brand Check", "Human Review"].map(
                      (item, index) => (
                        <div key={item} className="flex items-center gap-3">
                          <span
                            className={cn(
                              "size-2.5 rounded-full",
                              index < 2 ? "bg-acid" : "bg-cyan",
                            )}
                          />
                          <span className="text-sm font-semibold text-paper">
                            {item}
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div className="rounded-[18px] border border-white/10 bg-white/[0.045] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-muted">
                    Scheduled Publishing
                  </p>
                  <div className="mt-4 grid gap-2">
                    {scheduleSlots.map((slot) => (
                      <div
                        key={`${slot.day}-${slot.time}`}
                        className="flex items-center justify-between rounded-[14px] border border-white/10 bg-ink/52 px-3 py-3"
                      >
                        <div>
                          <p className="text-sm font-semibold text-paper">
                            {slot.day}
                          </p>
                          <p className="text-xs text-muted">{slot.time}</p>
                        </div>
                        <span
                          className={cn(
                            "rounded-full px-2.5 py-1 text-xs font-bold",
                            slot.status === "Ready"
                              ? "bg-acid/[0.12] text-acid"
                              : "bg-white/[0.07] text-muted",
                          )}
                        >
                          {slot.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
