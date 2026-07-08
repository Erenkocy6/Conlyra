"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

type SpringValue = {
  x: number;
  y: number;
  charge: number;
};

const vueSignals = [
  {
    id: "source",
    label: "Source",
    title: "Kundenfrage erkannt",
    meta: "Messe / Sales",
  },
  {
    id: "route",
    label: "Route",
    title: "LinkedIn Angle priorisiert",
    meta: "B2B Decision Pain",
  },
  {
    id: "gate",
    label: "Gate",
    title: "Founder Review angefragt",
    meta: "Human approval",
  },
  {
    id: "queue",
    label: "Queue",
    title: "Output bleibt gesperrt",
    meta: "No auto-publish",
  },
];

const svelteCards = [
  ["Draft", "Hook, Beweis und CTA reagieren auf den Team-Kontext."],
  ["Review", "Kommentare federn in die Entscheidung, ohne den Draft zu verschieben."],
  ["Queue", "Planung fühlt sich lebendig an, bleibt aber kontrolliert."],
];

export function FrameworkEffects() {
  const vueMountRef = useRef<HTMLDivElement | null>(null);
  const svelteStageRef = useRef<HTMLDivElement | null>(null);
  const [springValue, setSpringValue] = useState<SpringValue>({
    x: 0,
    y: 0,
    charge: 0.2,
  });

  useEffect(() => {
    const target = vueMountRef.current;

    if (!target) {
      return;
    }

    const mountTarget: Element = target;
    let app: { mount: (target: Element) => unknown; unmount: () => void } | undefined;
    let cancelled = false;

    async function mountVueIsland() {
      const vue = await import("vue");

      if (cancelled) {
        return;
      }

      const h = vue.h as (...args: unknown[]) => unknown;
      const transitionGroup = vue.TransitionGroup as unknown;

      app = vue.createApp({
        setup() {
          const index = vue.ref(0);
          let timer = 0;

          vue.onMounted(() => {
            timer = window.setInterval(() => {
              index.value += 1;
            }, 2100);
          });

          vue.onUnmounted(() => {
            window.clearInterval(timer);
          });

          const rotatedRows = vue.computed(() =>
            vueSignals.map((_, rowIndex) => {
              const sourceIndex = (rowIndex + index.value) % vueSignals.length;
              return vueSignals[sourceIndex];
            }),
          );

          return () =>
            h("div", { class: "vue-island" }, [
              h("div", { class: "vue-island__topbar" }, [
                h("span", null, "Vue Reactivity"),
                h("strong", null, "TransitionGroup"),
              ]),
              h(
                transitionGroup,
                {
                  name: "vue-shift",
                  tag: "div",
                  class: "vue-island__stack",
                },
                {
                  default: () =>
                    rotatedRows.value.map((row) =>
                      h("article", { key: row.id }, [
                        h("span", null, row.label),
                        h("h3", null, row.title),
                        h("p", null, row.meta),
                      ]),
                    ),
                },
              ),
            ]);
        },
      });

      app.mount(mountTarget);
    }

    void mountVueIsland();

    return () => {
      cancelled = true;
      app?.unmount();
    };
  }, []);

  useEffect(() => {
    const stage = svelteStageRef.current;

    if (!stage) {
      return;
    }

    const stageTarget: HTMLDivElement = stage;
    let unsubscribe: (() => void) | undefined;
    let springStore:
      | {
          set: (value: SpringValue) => void;
          subscribe: (callback: (value: SpringValue) => void) => () => void;
        }
      | undefined;
    let cancelled = false;

    async function mountSvelteMotion() {
      const { spring } = await import("svelte/motion");

      if (cancelled) {
        return;
      }

      springStore = spring(
        { x: 0, y: 0, charge: 0.2 },
        { stiffness: 0.08, damping: 0.28 },
      );
      unsubscribe = springStore.subscribe((value) => setSpringValue(value));
    }

    function handlePointerMove(event: PointerEvent) {
      const rect = stageTarget.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

      springStore?.set({
        x,
        y,
        charge: Math.min(1, Math.abs(x) + Math.abs(y) + 0.18),
      });
    }

    function handlePointerLeave() {
      springStore?.set({ x: 0, y: 0, charge: 0.2 });
    }

    void mountSvelteMotion();
    stageTarget.addEventListener("pointermove", handlePointerMove);
    stageTarget.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      cancelled = true;
      unsubscribe?.();
      stageTarget.removeEventListener("pointermove", handlePointerMove);
      stageTarget.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <section className="framework-section" aria-labelledby="framework-title">
      <div className="section-inner framework-layout">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">Reactive Motion Layer</p>
          <h2 id="framework-title">
            Vue-Transitions und Svelte-Springs, aber in{" "}
            <span className="type-contrast">NovaIQ</span>-Sprache.
          </h2>
          <p>
            Die Website bekommt jetzt mehr Reaktionsfähigkeit: Signale ordnen
            sich sichtbar neu, Queues federn weich nach und Motion bleibt Teil
            des Produktgefühls statt reine Deko.
          </p>
        </div>

        <div className="framework-grid">
          <div className="framework-panel framework-panel--vue" data-reveal>
            <div ref={vueMountRef} />
          </div>

          <div
            className="framework-panel framework-panel--svelte"
            ref={svelteStageRef}
            data-reveal
          >
            <div className="svelte-island__topbar">
              <span>Svelte Motion</span>
              <strong>spring / tweened</strong>
            </div>
            <div
              className="svelte-orchestrator"
              style={
                {
                  "--spring-x": springValue.x,
                  "--spring-y": springValue.y,
                  "--spring-charge": springValue.charge,
                } as CSSProperties
              }
            >
              {svelteCards.map(([title, copy], index) => (
                <article key={title} style={{ "--i": index } as CSSProperties}>
                  <span>{title}</span>
                  <h3>{title === "Draft" ? "Spring Draft" : title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
