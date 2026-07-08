"use client";

import { useEffect, useRef } from "react";
import { RevealText } from "@/components/RevealText";
import { prefersReducedMotion } from "@/lib/utils";

const flywheelMetrics = [
  ["900°", "Scroll-Rotation"],
  ["4 Schritte", "Detect bis Publish"],
  ["0 Auto-Posts", "Freigabe bleibt Pflicht"],
];

const signalLabels = ["Detect", "Idea", "Approve", "Publish"];

export function PinWindmill() {
  const wrapRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const rotorRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const pin = pinRef.current;
    const rotor = rotorRef.current;

    if (!wrap || !pin || !rotor || prefersReducedMotion()) {
      return;
    }

    let cleanup: (() => void) | undefined;
    let active = true;

    async function runWindmill() {
      const [{ gsap }, scrollModule] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      const { ScrollTrigger } = scrollModule;

      if (!active || !wrapRef.current || !pinRef.current || !rotorRef.current) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      const currentWrap = wrapRef.current;
      const currentPin = pinRef.current;
      const currentRotor = rotorRef.current;
      const mm = gsap.matchMedia();
      const ctx = gsap.context(() => {
        mm.add("(min-width: 1024px)", () => {
          const speedLayers = gsap.utils.toArray<HTMLElement>("[data-speed]");
          const timeline = gsap.timeline({
            scrollTrigger: {
              scrub: 1,
              pin: true,
              trigger: currentPin,
              start: "50% 50%",
              endTrigger: currentWrap,
              end: "bottom 50%",
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          timeline.to(
            currentRotor,
            {
              rotateZ: 900,
              transformOrigin: "50% 50%",
              ease: "none",
            },
            0,
          );

          speedLayers.forEach((layer) => {
            const speed = Number(layer.dataset.speed ?? 1);
            const distance = (speed - 1) * -32;

            timeline.to(
              layer,
              {
                yPercent: distance,
                ease: "none",
              },
              0,
            );
          });

          timeline.to(
            "[data-windmill-ring]",
            {
              scale: 1.12,
              opacity: 0.82,
              ease: "none",
            },
            0,
          );

          timeline.to(
            "[data-windmill-chip]",
            {
              y: -18,
              opacity: 1,
              stagger: 0.08,
              ease: "none",
            },
            0,
          );

          ScrollTrigger.refresh();
        });
      }, currentWrap);

      cleanup = () => {
        mm.revert();
        ctx.revert();
      };
    }

    void runWindmill();

    return () => {
      active = false;
      cleanup?.();
    };
  }, []);

  return (
    <section
      id="pin-windmill-wrap"
      ref={wrapRef}
      className="relative overflow-hidden border-y border-white/10 bg-[linear-gradient(180deg,rgba(7,8,13,0.28),rgba(17,24,39,0.56)_50%,rgba(7,8,13,0.2))] motion-safe:lg:min-h-[190vh]"
      aria-labelledby="pin-windmill-title"
    >
      <div data-speed="0.8" className="nova-grid absolute inset-0 opacity-40" />
      <div data-speed="2.0" className="nova-orb left-[8%] top-24 size-72 bg-cyan/14" />
      <div
        data-speed="1.2"
        className="nova-orb bottom-16 right-[6%] size-80 bg-violet/16"
      />

      <div
        id="pin-windmill"
        ref={pinRef}
        className="section-pad relative z-10 flex min-h-screen items-center"
      >
        <div className="container-page grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-20">
          <div>
            <RevealText as="p" className="eyebrow mb-5 text-cyan">
              Workflow Engine
            </RevealText>
            <RevealText
              as="h2"
              id="pin-windmill-title"
              className="section-title max-w-3xl text-paper"
            >
              Aus Material wird ein laufender Content-Prozess.
            </RevealText>
            <p className="mt-7 max-w-xl text-lg leading-8 text-paper/64">
              Nach Video, Bild oder Notiz übernimmt die Pipeline: Detect, Idea,
              Approve, Publish. Keine Effekt-Spielerei, sondern der Ablauf, der
              jeden echten Moment in Richtung Veröffentlichung bewegt.
            </p>

            <div className="mt-10 grid gap-3 sm:grid-cols-3 lg:max-w-2xl">
              {flywheelMetrics.map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-[18px] border border-white/10 bg-white/[0.045] p-4"
                >
                  <p className="text-2xl font-semibold tracking-[-0.04em] text-paper">
                    {value}
                  </p>
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.08em] text-muted">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto grid aspect-square w-full max-w-[36rem] place-items-center">
            <div
              data-windmill-ring
              className="absolute inset-0 rounded-full border border-cyan/18 bg-[radial-gradient(circle,rgba(34,211,238,0.11),transparent_58%)] opacity-55 shadow-[0_0_120px_rgba(34,211,238,0.13)]"
            />
            <div className="absolute inset-[9%] rounded-full border border-white/10" />
            <div className="absolute inset-[20%] rounded-full border border-dashed border-white/16" />

            <div className="absolute inset-0">
              {signalLabels.map((label, index) => (
                <div
                  key={label}
                  data-windmill-chip
                  className="absolute left-1/2 top-1/2 rounded-full border border-white/10 bg-ink/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-paper opacity-72 backdrop-blur"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${index * 90}deg) translateY(calc(-1 * min(15.5rem, 38vw))) rotate(-${index * 90}deg)`,
                  }}
                >
                  {label}
                </div>
              ))}
            </div>

            <svg
              id="pin-windmill-svg"
              ref={rotorRef}
              viewBox="0 0 420 420"
              className="relative z-10 size-[min(82vw,29rem)] overflow-visible drop-shadow-[0_28px_80px_rgba(0,0,0,0.42)]"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="windmillBlade" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#A3E635" stopOpacity="0.92" />
                  <stop offset="48%" stopColor="#22D3EE" stopOpacity="0.84" />
                  <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.86" />
                </linearGradient>
                <radialGradient id="windmillHub" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#F8FAFC" stopOpacity="0.96" />
                  <stop offset="58%" stopColor="#22D3EE" stopOpacity="0.72" />
                  <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.18" />
                </radialGradient>
              </defs>
              <g fill="url(#windmillBlade)" stroke="rgba(248,250,252,0.28)" strokeWidth="1.5">
                <path d="M210 197 C232 124 274 78 342 48 C352 104 334 153 281 198 C254 220 226 220 210 197Z" />
                <path d="M223 210 C296 232 342 274 372 342 C316 352 267 334 222 281 C200 254 200 226 223 210Z" />
                <path d="M210 223 C188 296 146 342 78 372 C68 316 86 267 139 222 C166 200 194 200 210 223Z" />
                <path d="M197 210 C124 188 78 146 48 78 C104 68 153 86 198 139 C220 166 220 194 197 210Z" />
              </g>
              <circle cx="210" cy="210" r="58" fill="rgba(7,8,13,0.88)" stroke="rgba(248,250,252,0.18)" strokeWidth="2" />
              <circle cx="210" cy="210" r="34" fill="url(#windmillHub)" />
              <circle cx="210" cy="210" r="8" fill="#07080D" />
            </svg>

            <div className="absolute bottom-6 left-1/2 w-[min(18rem,72vw)] -translate-x-1/2 rounded-full border border-acid/20 bg-acid/[0.08] px-4 py-2 text-center text-xs font-bold uppercase tracking-[0.08em] text-acid">
              Scrollen zum Drehen
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
