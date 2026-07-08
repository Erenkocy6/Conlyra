"use client";

import { useEffect, useRef } from "react";

type NovaSignalCoreProps = {
  className?: string;
  intensity?: "hero" | "section" | "footer";
};

const palette = {
  lime: "184, 227, 77",
  cyan: "70, 199, 217",
  violet: "139, 108, 240",
};

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function NovaSignalCore({
  className = "",
  intensity = "section",
}: NovaSignalCoreProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d", { alpha: true });

    if (!context) {
      return;
    }

    const drawingCanvas = canvas;
    const drawingContext = context;
    const reduceMotion = prefersReducedMotion();
    const parent = drawingCanvas.parentElement ?? drawingCanvas;
    let frame = 0;
    let visible = false;
    let width = 1;
    let height = 1;
    let pixelRatio = 1;
    let pointerX = 0.5;
    let pointerY = 0.5;

    function resize() {
      const rect = parent.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      drawingCanvas.width = Math.round(width * pixelRatio);
      drawingCanvas.height = Math.round(height * pixelRatio);
      drawingCanvas.style.width = `${width}px`;
      drawingCanvas.style.height = `${height}px`;
      drawingContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    }

    function draw(time = 0) {
      frame = 0;
      const t = reduceMotion ? 0.45 : time * 0.00048;
      const cx = width * (0.5 + (pointerX - 0.5) * 0.08);
      const cy = height * (0.5 + (pointerY - 0.5) * 0.08);
      const radius = Math.min(width, height) * (intensity === "hero" ? 0.34 : 0.38);

      drawingContext.clearRect(0, 0, width, height);

      const glow = drawingContext.createRadialGradient(cx, cy, radius * 0.04, cx, cy, radius * 1.32);
      glow.addColorStop(0, `rgba(${palette.lime}, 0.34)`);
      glow.addColorStop(0.38, `rgba(${palette.cyan}, 0.12)`);
      glow.addColorStop(1, "rgba(7, 8, 11, 0)");
      drawingContext.fillStyle = glow;
      drawingContext.beginPath();
      drawingContext.arc(cx, cy, radius * 1.32, 0, Math.PI * 2);
      drawingContext.fill();

      for (let ring = 0; ring < 4; ring += 1) {
        const phase = t * (ring % 2 === 0 ? 1 : -0.72) + ring * 0.72;
        const arcRadius = radius * (0.52 + ring * 0.18);
        const start = phase + ring * 0.34;
        const end = start + Math.PI * (0.42 + ring * 0.08);

        drawingContext.lineWidth = ring === 0 ? 1.6 : 1;
        drawingContext.strokeStyle =
          ring % 2 === 0
            ? `rgba(${palette.lime}, ${0.58 - ring * 0.08})`
            : `rgba(${palette.cyan}, ${0.46 - ring * 0.06})`;
        drawingContext.beginPath();
        drawingContext.arc(cx, cy, arcRadius, start, end);
        drawingContext.stroke();
      }

      for (let node = 0; node < 10; node += 1) {
        const angle = t * 0.62 + node * 0.628;
        const orbit = radius * (0.44 + (node % 3) * 0.18);
        const x = cx + Math.cos(angle) * orbit;
        const y = cy + Math.sin(angle * 0.88) * orbit * 0.68;
        const nodeSize = node % 4 === 0 ? 3.2 : 2;

        drawingContext.fillStyle =
          node % 4 === 0
            ? `rgba(${palette.violet}, 0.72)`
            : `rgba(${palette.lime}, 0.8)`;
        drawingContext.beginPath();
        drawingContext.arc(x, y, nodeSize, 0, Math.PI * 2);
        drawingContext.fill();
      }

      drawingContext.strokeStyle = `rgba(${palette.cyan}, 0.18)`;
      drawingContext.lineWidth = 1;
      drawingContext.beginPath();
      drawingContext.moveTo(cx - radius * 0.88, cy);
      drawingContext.lineTo(cx + radius * 0.88, cy);
      drawingContext.moveTo(cx, cy - radius * 0.62);
      drawingContext.lineTo(cx, cy + radius * 0.62);
      drawingContext.stroke();

      if (visible && !reduceMotion) {
        frame = window.requestAnimationFrame(draw);
      }
    }

    function start() {
      if (reduceMotion || frame !== 0) {
        return;
      }

      visible = true;
      frame = window.requestAnimationFrame(draw);
    }

    function stop() {
      visible = false;
      window.cancelAnimationFrame(frame);
      frame = 0;
    }

    function handlePointerMove(event: PointerEvent) {
      const rect = parent.getBoundingClientRect();
      pointerX = (event.clientX - rect.left) / Math.max(1, rect.width);
      pointerY = (event.clientY - rect.top) / Math.max(1, rect.height);
    }

    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver(([entry]) => {
            if (entry?.isIntersecting) {
              start();
              return;
            }

            stop();
          })
        : undefined;
    const resizeObserver =
      "ResizeObserver" in window
        ? new ResizeObserver(() => {
            resize();
            window.cancelAnimationFrame(frame);
            frame = 0;
            draw();
          })
        : undefined;

    resize();
    draw();
    if (observer) {
      observer.observe(parent);
    } else {
      start();
    }
    resizeObserver?.observe(parent);
    parent.addEventListener("pointermove", handlePointerMove);

    return () => {
      stop();
      observer?.disconnect();
      resizeObserver?.disconnect();
      parent.removeEventListener("pointermove", handlePointerMove);
    };
  }, [intensity]);

  return (
    <div
      className={`nova-signal-core nova-signal-core--${intensity}${className ? ` ${className}` : ""}`}
      data-cursor-label="signal"
      data-signal-core
      aria-hidden="true"
    >
      <canvas ref={canvasRef} />
      <span />
      <i />
    </div>
  );
}
