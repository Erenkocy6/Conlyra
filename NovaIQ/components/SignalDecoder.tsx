"use client";

import { useEffect, useRef } from "react";
import { RevealText } from "@/components/RevealText";
import { prefersReducedMotion } from "@/lib/utils";

const scrambleGlyphs = "§¶•†‡ÆØÅ";

type Particle = {
  originX: number;
  originY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
};

function setupParticleCanvas(canvas: HTMLCanvasElement, reducedMotion: boolean) {
  const context = canvas.getContext("2d");

  if (!context) {
    return undefined;
  }

  const drawContext = context;
  let frame = 0;
  let width = 0;
  let height = 0;
  let particles: Particle[] = [];
  let running = false;
  let lastFrameTime = 0;
  const pointer = { x: -9999, y: -9999 };
  const frameInterval = reducedMotion ? Number.POSITIVE_INFINITY : 1000 / 30;

  function createParticles(canvasWidth: number, canvasHeight: number) {
    const offscreen = document.createElement("canvas");
    offscreen.width = canvasWidth;
    offscreen.height = canvasHeight;

    const offscreenContext = offscreen.getContext("2d");

    if (!offscreenContext) {
      return [];
    }

    const fontSize = Math.max(42, Math.min(86, canvasWidth * 0.18));
    offscreenContext.fillStyle = "#ffffff";
    offscreenContext.font = `760 ${fontSize}px Inter, ui-sans-serif, system-ui, sans-serif`;
    offscreenContext.textAlign = "center";
    offscreenContext.textBaseline = "middle";
    offscreenContext.fillText("NovaIQ", canvasWidth / 2, canvasHeight / 2);

    const imageData = offscreenContext.getImageData(
      0,
      0,
      canvasWidth,
      canvasHeight,
    );
    const dots: Particle[] = [];
    const step = canvasWidth < 460 ? 8 : 7;

    for (let y = 0; y < canvasHeight; y += step) {
      for (let x = 0; x < canvasWidth; x += step) {
        const alpha = imageData.data[(y * canvasWidth + x) * 4 + 3];

        if (alpha > 120) {
          dots.push({ originX: x, originY: y, x, y, vx: 0, vy: 0 });
        }
      }
    }

    if (dots.length <= 1300) {
      return dots;
    }

    const stride = Math.ceil(dots.length / 1300);
    return dots.filter((_, index) => index % stride === 0);
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.35);
    width = Math.max(1, Math.floor(rect.width));
    height = Math.max(1, Math.floor(rect.height));

    canvas.width = Math.floor(width * pixelRatio);
    canvas.height = Math.floor(height * pixelRatio);
    drawContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    particles = createParticles(width, height);
    render();
  }

  function render() {
    drawContext.clearRect(0, 0, width, height);
    drawContext.fillStyle = "rgba(248, 250, 252, 0.82)";

    particles.forEach((particle) => {
      drawContext.beginPath();
      drawContext.arc(particle.x, particle.y, 1.35, 0, Math.PI * 2);
      drawContext.fill();
    });
  }

  function animate(timestamp = 0) {
    if (!running) {
      return;
    }

    if (timestamp - lastFrameTime < frameInterval) {
      frame = requestAnimationFrame(animate);
      return;
    }

    lastFrameTime = timestamp;
    drawContext.clearRect(0, 0, width, height);
    drawContext.fillStyle = "rgba(248, 250, 252, 0.84)";

    particles.forEach((particle) => {
      const dx = particle.x - pointer.x;
      const dy = particle.y - pointer.y;
      const distance = Math.hypot(dx, dy);

      if (distance > 0 && distance < 78) {
        const force = (78 - distance) / 78;
        particle.vx += (dx / distance) * force * 2.7;
        particle.vy += (dy / distance) * force * 2.7;
      }

      particle.x += particle.vx + (particle.originX - particle.x) * 0.1;
      particle.y += particle.vy + (particle.originY - particle.y) * 0.1;
      particle.vx *= 0.84;
      particle.vy *= 0.84;

      drawContext.beginPath();
      drawContext.arc(particle.x, particle.y, 1.35, 0, Math.PI * 2);
      drawContext.fill();
    });

    frame = requestAnimationFrame(animate);
  }

  function start() {
    if (running || reducedMotion) {
      return;
    }

    running = true;
    lastFrameTime = 0;
    frame = requestAnimationFrame(animate);
  }

  function stop() {
    running = false;
    cancelAnimationFrame(frame);
  }

  function handlePointerMove(event: PointerEvent) {
    const rect = canvas.getBoundingClientRect();
    pointer.x = event.clientX - rect.left;
    pointer.y = event.clientY - rect.top;
  }

  function handlePointerLeave() {
    pointer.x = -9999;
    pointer.y = -9999;
  }

  resize();
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);

  if (!reducedMotion) {
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          start();
          return;
        }

        stop();
      },
      { rootMargin: "360px 0px", threshold: 0 },
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

  return () => {
    resizeObserver.disconnect();
  };
}

export function SignalDecoder() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const reducedMotion = prefersReducedMotion();

    if (!section) {
      return;
    }

    const canvasCleanup = canvas
      ? setupParticleCanvas(canvas, reducedMotion)
      : undefined;

    if (reducedMotion) {
      return () => {
        canvasCleanup?.();
      };
    }

    let cleanup: (() => void) | undefined;
    let active = true;

    async function runDecoder() {
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

      function addScramble(
        timeline: ReturnType<typeof gsap.timeline>,
        element: HTMLElement,
        text: string,
        duration: number,
      ) {
        const proxy = { progress: 0 };
        let maxLength = text.length;

        timeline.to(proxy, {
          progress: 1,
          duration,
          ease: "none",
          onStart: () => {
            proxy.progress = 0;
            maxLength = Math.max(element.textContent?.length ?? 0, text.length);
          },
          onUpdate: () => {
            const revealLength = Math.floor(proxy.progress * maxLength);
            let nextValue = "";

            for (let index = 0; index < maxLength; index += 1) {
              nextValue +=
                index < revealLength
                  ? (text[index] ?? "")
                  : (scrambleGlyphs[
                      Math.floor(Math.random() * scrambleGlyphs.length)
                    ] ?? "");
            }

            element.textContent = nextValue;
          },
          onComplete: () => {
            element.textContent = text;
          },
        });
      }

      const ctx = gsap.context(() => {
        const wrapper = currentSection.querySelector<HTMLElement>(".wrapper");
        const innerLayers =
          gsap.utils.toArray<HTMLElement>("[data-inner-layer]");
        const scrambleText =
          currentSection.querySelector<HTMLElement>("[data-scramble-text]");
        const traces = gsap.utils.toArray<SVGGeometryElement>("[data-trace]");
        const nodes = gsap.utils.toArray<SVGElement>("[data-node]");
        const flowDots =
          gsap.utils.toArray<SVGCircleElement>("[data-flow-dot]");
        const stageChips =
          gsap.utils.toArray<HTMLElement>("[data-stage-chip]");
        const shader =
          currentSection.querySelector<HTMLElement>("[data-decoder-shader]");
        const drawText =
          currentSection.querySelector<SVGTextElement>("[data-draw-text]");
        const loopingAnimations: { pause: () => void; resume: () => void }[] = [];

        if (wrapper && innerLayers.length > 0) {
          gsap.from(innerLayers, {
            scale: 0.6,
            opacity: 0,
            y: 42,
            stagger: 0.08,
            ease: "none",
            scrollTrigger: {
              trigger: wrapper,
              start: "top 82%",
              end: "bottom 38%",
              scrub: true,
            },
          });
        }

        if (scrambleText) {
          const originalText =
            scrambleText.dataset.original ??
            scrambleText.textContent ??
            "Original Text";
          const glyphText = Array.from(
            { length: originalText.length },
            (_, index) => scrambleGlyphs[index % scrambleGlyphs.length],
          ).join("");
          const scrambleTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: currentSection,
              start: "top 62%",
              once: true,
            },
          });

          addScramble(scrambleTimeline, scrambleText, glyphText, 1);
          scrambleTimeline.to({}, { duration: 0.8 });
          addScramble(scrambleTimeline, scrambleText, originalText, 1);
        }

        traces.forEach((trace) => {
          const length = trace.getTotalLength();
          gsap.set(trace, {
            strokeDasharray: length,
            strokeDashoffset: length,
          });
        });

        const traceTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: currentSection,
            start: "top 54%",
            once: true,
          },
        });

        traceTimeline
          .to(traces, {
            strokeDashoffset: 0,
            stagger: 0.3,
            duration: 1.2,
            ease: "power2.inOut",
          })
          .from(
            nodes,
            {
              scale: 0,
              transformOrigin: "50% 50%",
              stagger: 0.15,
              ease: "back.out(2)",
            },
            "-=0.45",
          );

        if (drawText) {
          gsap.set(drawText, {
            strokeDasharray: 900,
            strokeDashoffset: 900,
            fill: "transparent",
          });

          traceTimeline
            .to(
              drawText,
              {
                strokeDashoffset: 0,
                duration: 2,
                ease: "power2.inOut",
              },
              0,
            )
            .to(
              drawText,
              {
                fill: "#A3E635",
                duration: 0.8,
              },
              "-=0.3",
            );
        }

        if (shader) {
          loopingAnimations.push(
            gsap.to(shader, {
              backgroundPosition: "180% 50%",
              duration: 7,
              ease: "none",
              repeat: -1,
              paused: true,
            }),
          );
        }

        if (flowDots.length >= 3) {
          gsap.set(flowDots, { autoAlpha: 0, attr: { r: 0 } });
          gsap.set(stageChips, { autoAlpha: 0.46, y: 0 });

          const loop = gsap.timeline({
            repeat: -1,
            repeatDelay: 0.28,
            defaults: { ease: "power3.inOut" },
            paused: true,
          });

          loopingAnimations.push(loop);

          const loopSteps = [
            {
              dot: flowDots[0]!,
              chip: stageChips[0],
              node: nodes[0],
              from: { cx: 198, cy: 103 },
              to: { cx: 312, cy: 215 },
            },
            {
              dot: flowDots[1]!,
              chip: stageChips[1],
              node: nodes[1],
              from: { cx: 312, cy: 215 },
              to: { cx: 428, cy: 112 },
            },
            {
              dot: flowDots[2]!,
              chip: stageChips[2],
              node: nodes[3],
              from: { cx: 312, cy: 256 },
              to: { cx: 480, cy: 326 },
            },
          ];

          loopSteps.forEach((step, index) => {
            const at = index * 0.78;

            loop
              .set(step.dot, { autoAlpha: 0, attr: { ...step.from, r: 0 } }, at)
              .to(
                step.chip ?? {},
                { autoAlpha: 1, y: -5, duration: 0.18, ease: "back.out(2)" },
                at,
              )
              .to(
                step.dot,
                { autoAlpha: 1, attr: { r: 7 }, duration: 0.08 },
                at + 0.03,
              )
              .to(
                step.dot,
                {
                  attr: { ...step.to, r: 12 },
                  duration: 0.46,
                  ease: "expo.in",
                },
                at + 0.09,
              )
              .to(
                step.dot,
                {
                  attr: { r: 0 },
                  autoAlpha: 0,
                  duration: 0.2,
                  ease: "back.in(2.5)",
                },
                at + 0.58,
              )
              .to(
                step.node ?? {},
                {
                  scale: 1.42,
                  transformOrigin: "50% 50%",
                  duration: 0.16,
                  ease: "back.out(3)",
                  yoyo: true,
                  repeat: 1,
                },
                at + 0.52,
              )
              .to(
                step.chip ?? {},
                { autoAlpha: 0.46, y: 0, duration: 0.26 },
                at + 0.62,
              );
          });
        }

        if (loopingAnimations.length > 0) {
          const setLoopsPaused = (paused: boolean) => {
            loopingAnimations.forEach((animation) => {
              if (paused) {
                animation.pause();
                return;
              }

              animation.resume();
            });
          };

          ScrollTrigger.create({
            trigger: currentSection,
            start: "top 110%",
            end: "bottom -10%",
            onEnter: () => setLoopsPaused(false),
            onEnterBack: () => setLoopsPaused(false),
            onLeave: () => setLoopsPaused(true),
            onLeaveBack: () => setLoopsPaused(true),
          });
        }
      }, currentSection);

      cleanup = () => ctx.revert();
    }

    void runDecoder();

    return () => {
      active = false;
      cleanup?.();
      canvasCleanup?.();
    };
  }, []);

  return (
    <section
      id="decoder"
      ref={sectionRef}
      className="section-pad relative overflow-hidden bg-[linear-gradient(180deg,rgba(7,8,13,0.18),rgba(17,24,39,0.62)_48%,rgba(7,8,13,0.42))]"
      aria-labelledby="decoder-title"
    >
      <div className="nova-grid absolute inset-0 opacity-35" />
      <div className="nova-orb right-[8%] top-10 size-80 bg-acid/10" />
      <div className="container-page relative grid gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:gap-16">
        <div>
          <RevealText as="p" className="eyebrow mb-5 text-acid">
            Nova Workflow
          </RevealText>
          <h2
            id="decoder-title"
            className="section-title max-w-3xl text-paper"
          >
            <span
              data-scramble-text
              data-original="Signal rein. Draft raus."
              aria-label="Signal rein. Draft raus."
            >
              Signal rein. Draft raus.
            </span>
          </h2>
          <p className="mt-7 max-w-lg text-xl leading-8 text-paper/64">
            Der Loop zeigt den Kern: erkennen, mappen, vorschlagen und sauber
            vor dem Review stoppen.
          </p>
          <div className="mt-9 grid gap-3 sm:grid-cols-3">
            {["Speed ramp", "Trace", "Gate"].map((label) => (
              <div
                key={label}
                data-stage-chip
                className="rounded-[18px] border border-white/10 bg-white/[0.045] px-4 py-3 text-sm font-bold uppercase tracking-[0.08em] text-muted"
              >
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="wrapper relative min-h-[35rem] overflow-hidden rounded-[28px] border border-white/10 bg-ink/78 p-4 shadow-panel-glow sm:p-6">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full opacity-50"
            aria-hidden="true"
          />
          <div
            data-decoder-shader
            className="decoder-shader absolute inset-0 opacity-80"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_45%,rgba(34,211,238,0.16),transparent_26rem)]" />

          <div
            data-inner-layer
            className="inner-layer absolute left-5 top-5 z-20 rounded-[18px] border border-cyan/18 bg-cyan/[0.07] px-4 py-3 text-sm font-bold text-cyan backdrop-blur"
          >
            Signal erkannt
          </div>
          <div
            data-inner-layer
            className="inner-layer absolute right-6 top-24 z-20 rounded-[18px] border border-violet/22 bg-violet/[0.08] px-4 py-3 text-sm font-bold text-violet backdrop-blur"
          >
            Kontext gemappt
          </div>
          <div
            data-inner-layer
            className="inner-layer absolute bottom-7 left-8 z-20 rounded-[18px] border border-acid/22 bg-acid/[0.08] px-4 py-3 text-sm font-bold text-acid backdrop-blur"
          >
            Review bereit
          </div>

          <svg
            viewBox="0 0 620 420"
            className="relative z-10 h-full min-h-[32rem] w-full"
            aria-hidden="true"
          >
            <defs>
              <filter id="workflowGlow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g className="decoder-box" transform="translate(52 64)">
              <rect
                className="decoder-box-outline"
                width="146"
                height="78"
                rx="16"
                fill="rgba(7,8,13,0.72)"
                stroke="#22D3EE"
                strokeWidth="2"
              />
              <text x="24" y="47" fill="#F8FAFC" fontSize="18" fontWeight="700">
                Raw Signal
              </text>
            </g>

            <g className="decoder-box" transform="translate(236 172)">
              <rect
                className="decoder-box-outline"
                width="152"
                height="84"
                rx="18"
                fill="rgba(7,8,13,0.78)"
                stroke="#A3E635"
                strokeWidth="2"
              />
              <text x="28" y="50" fill="#F8FAFC" fontSize="18" fontWeight="700">
                NovaIQ
              </text>
            </g>

            <g className="decoder-box" transform="translate(428 74)">
              <rect
                className="decoder-box-outline"
                width="142"
                height="78"
                rx="16"
                fill="rgba(7,8,13,0.72)"
                stroke="#7C3AED"
                strokeWidth="2"
              />
              <text x="25" y="47" fill="#F8FAFC" fontSize="18" fontWeight="700">
                Post Draft
              </text>
            </g>

            <path
              data-trace
              className="trace"
              d="M198 103 C248 102 245 216 236 216"
              fill="none"
              stroke="#22D3EE"
              strokeLinecap="round"
              strokeWidth="3"
            />
            <path
              data-trace
              className="trace"
              d="M388 215 C438 216 426 112 428 112"
              fill="none"
              stroke="#A3E635"
              strokeLinecap="round"
              strokeWidth="3"
            />
            <path
              data-trace
              className="trace"
              d="M312 256 C312 304 370 330 480 326"
              fill="none"
              stroke="#7C3AED"
              strokeLinecap="round"
              strokeWidth="3"
            />

            <circle data-node className="node" cx="198" cy="103" r="7" fill="#22D3EE" />
            <circle data-node className="node" cx="312" cy="215" r="9" fill="#A3E635" />
            <circle data-node className="node" cx="428" cy="112" r="7" fill="#7C3AED" />
            <circle data-node className="node" cx="480" cy="326" r="8" fill="#F8FAFC" />
            <circle
              data-flow-dot
              cx="198"
              cy="103"
              r="0"
              fill="#22D3EE"
              filter="url(#workflowGlow)"
            />
            <circle
              data-flow-dot
              cx="312"
              cy="215"
              r="0"
              fill="#A3E635"
              filter="url(#workflowGlow)"
            />
            <circle
              data-flow-dot
              cx="312"
              cy="256"
              r="0"
              fill="#7C3AED"
              filter="url(#workflowGlow)"
            />

            <text
              data-draw-text
              x="78"
              y="344"
              fill="transparent"
              stroke="#A3E635"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.6"
              fontSize="64"
              fontWeight="760"
            >
              trace
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}
