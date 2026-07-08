"use client";

import type { PointerEvent as ReactPointerEvent } from "react";
import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/utils";

const navColumns = [
  {
    title: "Navigation",
    links: [
      ["Home", "#top"],
      ["System Dive", "#system"],
      ["Workflow", "#workflow"],
      ["Kontakt", "#kontakt"],
    ],
  },
  {
    title: "Product",
    links: [
      ["Features", "#features"],
      ["Demo", "#produkt"],
      ["Security", "#sicherheit"],
      ["FAQ", "#angebot"],
    ],
  },
  {
    title: "NovaIQ OS",
    links: [
      ["Detect", "#media-system"],
      ["Generate", "#decoder"],
      ["Approve", "#workflow"],
      ["Publish", "#selected-systems"],
    ],
  },
  {
    title: "Social",
    links: [
      ["Instagram", "https://www.instagram.com"],
      ["LinkedIn", "https://www.linkedin.com"],
      ["X / Twitter", "https://x.com"],
      ["Contact", "mailto:hello@novaiq.ai"],
    ],
  },
];

const signalPanels = [
  ["Signal", "raw material"],
  ["Context", "brand logic"],
  ["Draft", "3 channels"],
  ["Gate", "human review"],
];

type FooterParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
};

function setupFooterCanvas(canvas: HTMLCanvasElement, reducedMotion: boolean) {
  const context = canvas.getContext("2d");

  if (!context) {
    return undefined;
  }

  const drawContext = context;
  const particles: FooterParticle[] = [];
  const pointer = { x: -9999, y: -9999 };
  let width = 0;
  let height = 0;
  let frame = 0;
  let time = 0;
  let running = false;
  let lastFrameTime = 0;
  const maxPixelRatio = window.innerWidth < 768 ? 1 : 1.35;
  const frameInterval = reducedMotion ? Number.POSITIVE_INFINITY : 1000 / 30;

  function createParticles() {
    particles.length = 0;
    const count = reducedMotion
      ? 42
      : Math.min(window.innerWidth < 768 ? 46 : 86, Math.max(42, Math.floor(width / 24)));

    for (let index = 0; index < count; index += 1) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        size: Math.random() * 1.35 + 0.7,
      });
    }
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const pixelRatio = Math.min(window.devicePixelRatio || 1, maxPixelRatio);
    width = Math.max(1, Math.floor(rect.width));
    height = Math.max(1, Math.floor(rect.height));

    canvas.width = Math.floor(width * pixelRatio);
    canvas.height = Math.floor(height * pixelRatio);
    drawContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    createParticles();
  }

  function renderFrame(timestamp = 0) {
    if (!running && !reducedMotion) {
      return;
    }

    if (!reducedMotion && timestamp - lastFrameTime < frameInterval) {
      frame = requestAnimationFrame(renderFrame);
      return;
    }

    lastFrameTime = timestamp;
    time += 0.008;
    drawContext.clearRect(0, 0, width, height);

    particles.forEach((particle) => {
      const dx = pointer.x - particle.x;
      const dy = pointer.y - particle.y;
      const distance = Math.hypot(dx, dy);

      if (!reducedMotion && distance > 0 && distance < 180) {
        const force = (180 - distance) / 180;
        particle.vx -= (dx / distance) * force * 0.022;
        particle.vy -= (dy / distance) * force * 0.022;
      }

      particle.x += reducedMotion ? 0 : particle.vx + Math.sin(time + particle.y * 0.01) * 0.035;
      particle.y += reducedMotion ? 0 : particle.vy + Math.cos(time + particle.x * 0.01) * 0.035;

      if (particle.x < -20) particle.x = width + 20;
      if (particle.x > width + 20) particle.x = -20;
      if (particle.y < -20) particle.y = height + 20;
      if (particle.y > height + 20) particle.y = -20;

      particle.vx *= 0.992;
      particle.vy *= 0.992;
    });

    for (let i = 0; i < particles.length; i += 1) {
      const a = particles[i];

      if (!a) continue;

      for (let j = i + 1; j < particles.length; j += 1) {
        const b = particles[j];

        if (!b) continue;

        const distance = Math.hypot(a.x - b.x, a.y - b.y);

        if (distance < 104) {
          const alpha = (1 - distance / 104) * 0.16;
          drawContext.strokeStyle = `rgba(125, 211, 252, ${alpha})`;
          drawContext.lineWidth = 1;
          drawContext.beginPath();
          drawContext.moveTo(a.x, a.y);
          drawContext.lineTo(b.x, b.y);
          drawContext.stroke();
        }
      }
    }

    particles.forEach((particle, index) => {
      const glow = index % 5 === 0 ? "163, 230, 53" : "248, 250, 252";
      drawContext.fillStyle = `rgba(${glow}, ${index % 5 === 0 ? 0.82 : 0.46})`;
      drawContext.beginPath();
      drawContext.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      drawContext.fill();
    });

    if (!reducedMotion) {
      frame = requestAnimationFrame(renderFrame);
    }
  }

  function start() {
    if (running || reducedMotion) {
      return;
    }

    running = true;
    lastFrameTime = 0;
    frame = requestAnimationFrame(renderFrame);
  }

  function stop() {
    running = false;
    cancelAnimationFrame(frame);
  }

  function handlePointerMove(event: globalThis.PointerEvent) {
    const rect = canvas.getBoundingClientRect();
    pointer.x = event.clientX - rect.left;
    pointer.y = event.clientY - rect.top;
  }

  function handlePointerLeave() {
    pointer.x = -9999;
    pointer.y = -9999;
  }

  resize();
  renderFrame();

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);

  const visibilityObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        start();
        return;
      }

      stop();
    },
    { rootMargin: "420px 0px", threshold: 0 },
  );

  visibilityObserver.observe(canvas);

  canvas.addEventListener("pointermove", handlePointerMove);
  canvas.addEventListener("pointerleave", handlePointerLeave);

  return () => {
    stop();
    resizeObserver.disconnect();
    visibilityObserver.disconnect();
    canvas.removeEventListener("pointermove", handlePointerMove);
    canvas.removeEventListener("pointerleave", handlePointerLeave);
  };
}

export function Footer() {
  const footerRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const canvas = canvasRef.current;
    const reducedMotion = prefersReducedMotion();
    const canvasCleanup = canvas
      ? setupFooterCanvas(canvas, reducedMotion)
      : undefined;

    if (!footer || reducedMotion) {
      return () => {
        canvasCleanup?.();
      };
    }

    let cleanup: (() => void) | undefined;
    let active = true;

    async function animateFooter() {
      const [{ gsap }, scrollModule] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      const { ScrollTrigger } = scrollModule;

      if (!active || !footerRef.current) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);
      const currentFooter = footerRef.current;

      const ctx = gsap.context(() => {
        const loopingTweens = [
          gsap.to("[data-ai-ring]", {
            rotate: 360,
            duration: (index) => 20 + index * 8,
            ease: "none",
            repeat: -1,
            transformOrigin: "50% 50%",
            paused: true,
          }),
          gsap.to("[data-signal-line]", {
            scaleX: 1,
            transformOrigin: "left center",
            duration: 1.65,
            ease: "power2.inOut",
            stagger: {
              each: 0.18,
              repeat: -1,
              yoyo: true,
            },
            paused: true,
          }),
          gsap.to("[data-footer-beam]", {
            xPercent: 12,
            rotate: -2,
            duration: 7.2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            paused: true,
          }),
        ];

        const setLoopsPaused = (paused: boolean) => {
          loopingTweens.forEach((tween) => {
            if (paused) {
              tween.pause();
              return;
            }

            tween.resume();
          });
        };

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: currentFooter,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        });

        timeline
          .fromTo("[data-ai-core]", { scale: 0.86, rotate: -18 }, { scale: 1.08, rotate: 0, ease: "none" }, 0)
          .fromTo("[data-footer-title]", { yPercent: 24, letterSpacing: "0.08em" }, { yPercent: -5, letterSpacing: "0em", ease: "none" }, 0)
          .fromTo("[data-holo-panel]", { y: 72, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.08, ease: "power2.out" }, 0.18);

        gsap.fromTo(
          "[data-footer-reveal]",
          { y: 34, autoAlpha: 0, filter: "blur(12px)" },
          {
            y: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power4.out",
            stagger: 0.07,
            scrollTrigger: {
              trigger: currentFooter,
              start: "top 72%",
              once: true,
            },
          },
        );

        ScrollTrigger.create({
          trigger: currentFooter,
          start: "top 115%",
          end: "bottom -15%",
          onEnter: () => setLoopsPaused(false),
          onEnterBack: () => setLoopsPaused(false),
          onLeave: () => setLoopsPaused(true),
          onLeaveBack: () => setLoopsPaused(true),
        });
      }, currentFooter);

      cleanup = () => ctx.revert();
    }

    void animateFooter();

    return () => {
      active = false;
      cleanup?.();
      canvasCleanup?.();
    };
  }, []);

  function handlePointerMove(event: ReactPointerEvent<HTMLElement>) {
    const footer = event.currentTarget;
    const rect = footer.getBoundingClientRect();

    footer.style.setProperty("--footer-x", `${event.clientX - rect.left}px`);
    footer.style.setProperty("--footer-y", `${event.clientY - rect.top}px`);
  }

  return (
    <footer
      ref={footerRef}
      onPointerMove={handlePointerMove}
      className="ai-footer relative isolate min-h-screen overflow-hidden border-t border-white/10 bg-black text-paper"
      aria-label="NovaIQ Footer"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-80"
        aria-hidden="true"
      />
      <div className="ai-footer__wash" aria-hidden="true" />
      <div className="ai-footer__beam" data-footer-beam aria-hidden="true" />
      <div className="ai-footer__grain" aria-hidden="true" />

      <div className="container-page relative z-10 flex min-h-screen flex-col py-7 sm:py-10">
        <div className="grid grid-cols-[1fr_auto] items-start gap-5 lg:grid-cols-[1fr_auto_1fr]">
          <a
            data-footer-reveal
            href="#top"
            className="font-display text-3xl font-semibold leading-none text-paper sm:text-4xl"
            aria-label="NovaIQ Startseite"
          >
            NovaIQ
          </a>

          <nav
            data-footer-reveal
            className="ai-footer-pill hidden items-center gap-6 rounded-full border border-white/14 bg-white/[0.07] px-7 py-3.5 text-sm font-bold uppercase tracking-[0.08em] text-paper/72 backdrop-blur-xl lg:flex"
            aria-label="Footer Hauptnavigation"
          >
            {["Solutions", "Workflow", "Features", "Contact"].map((item) => (
              <a
                key={item}
                href={item === "Contact" ? "#kontakt" : `#${item.toLowerCase()}`}
                className="transition-colors hover:text-cyan"
              >
                {item}
              </a>
            ))}
          </nav>

          <a
            data-footer-reveal
            href="mailto:hello@novaiq.ai?subject=NovaIQ%20Demo"
            className="ai-footer-button justify-self-end rounded-[16px] px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-paper"
          >
            Get Started
          </a>
        </div>

        <div className="relative grid flex-1 items-center gap-10 py-12 lg:grid-cols-[0.72fr_1.28fr_0.72fr]">
          <div className="order-2 grid gap-3 lg:order-1">
            {signalPanels.slice(0, 2).map(([title, detail], index) => (
              <div
                key={title}
                data-holo-panel
                className="ai-footer-panel border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl"
              >
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-cyan">
                  0{index + 1} / {title}
                </p>
                <p className="mt-3 text-lg font-semibold text-paper">{detail}</p>
                <span
                  data-signal-line
                  className="mt-4 block h-px scale-x-0 bg-gradient-to-r from-cyan via-acid to-transparent"
                />
              </div>
            ))}
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative mx-auto grid min-h-[28rem] place-items-center">
              <div data-ai-core className="ai-footer-core absolute inset-0 mx-auto aspect-square w-[min(78vw,42rem)]">
                <div data-ai-ring className="ai-footer-ring ai-footer-ring--outer" />
                <div data-ai-ring className="ai-footer-ring ai-footer-ring--middle" />
                <div data-ai-ring className="ai-footer-ring ai-footer-ring--inner" />
                <div className="ai-footer-core__dot" />
              </div>

              <div className="relative z-10 text-center">
                <p
                  data-footer-reveal
                  className="mb-5 text-xs font-bold uppercase tracking-[0.16em] text-acid"
                >
                  AI IQ Core online
                </p>
                <h2
                  data-footer-title
                  className="ai-footer-title font-display text-[clamp(4.8rem,15vw,15rem)] font-semibold uppercase leading-[0.76]"
                >
                  <span className="block">Nova</span>
                  <span className="block text-[0.72em]">IQ</span>
                </h2>
                <p
                  data-footer-reveal
                  className="mx-auto mt-6 max-w-xl text-lg leading-8 text-paper/62"
                >
                  Content intelligence that detects signals, builds context and
                  stops at human approval.
                </p>
              </div>
            </div>
          </div>

          <div className="order-3 grid gap-3">
            {signalPanels.slice(2).map(([title, detail], index) => (
              <div
                key={title}
                data-holo-panel
                className="ai-footer-panel border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl lg:text-right"
              >
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-acid">
                  0{index + 3} / {title}
                </p>
                <p className="mt-3 text-lg font-semibold text-paper">{detail}</p>
                <span
                  data-signal-line
                  className="mt-4 block h-px scale-x-0 bg-gradient-to-r from-transparent via-cyan to-acid lg:origin-right"
                />
              </div>
            ))}
          </div>
        </div>

        <div
          data-footer-reveal
          className="ai-footer-links grid gap-8 border-t border-white/10 pt-7 md:grid-cols-2 lg:grid-cols-4"
        >
          {navColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-paper">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {column.links.map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="footer-link text-base font-medium text-paper/50 transition-colors hover:text-paper"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-7 flex flex-col gap-3 border-t border-white/10 pt-5 text-sm text-paper/42 sm:flex-row sm:items-center sm:justify-between">
          <p>All rights reserved for @NovaIQ</p>
          <p>Designed for AI content teams with human approval.</p>
        </div>
      </div>
    </footer>
  );
}
