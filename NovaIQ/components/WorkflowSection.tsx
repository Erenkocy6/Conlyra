"use client";

import { useEffect, useRef } from "react";
import { aiWorkflowSteps } from "@/data/landing";
import { RevealText } from "@/components/RevealText";
import { prefersReducedMotion } from "@/lib/utils";

export function WorkflowSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || prefersReducedMotion()) {
      return;
    }

    let cleanup: (() => void) | undefined;
    let active = true;

    async function animateWorkflow() {
      const [{ gsap }, scrollModule] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      const { ScrollTrigger } = scrollModule;

      if (!active || !sectionRef.current) {
        return;
      }

      const currentSection = sectionRef.current;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        const cards = cardRefs.current.filter(Boolean);
        const workflowLine = currentSection.querySelector("[data-workflow-line]");

        if (workflowLine) {
          gsap.fromTo(
            workflowLine,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: currentSection,
                start: "top 68%",
                end: "bottom 68%",
                scrub: true,
              },
            },
          );
        }

        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            {
              y: 46,
              autoAlpha: 0,
              scale: 0.965,
            },
            {
              y: 0,
              autoAlpha: 1,
              scale: 1,
              duration: 0.9,
              delay: index * 0.025,
              ease: "power4.out",
              scrollTrigger: {
                trigger: card,
                start: "top 84%",
                once: true,
              },
            },
          );
        });
      }, currentSection);

      cleanup = () => ctx.revert();
    }

    void animateWorkflow();

    return () => {
      active = false;
      cleanup?.();
    };
  }, []);

  return (
    <section
      id="workflow"
      ref={sectionRef}
      className="section-pad relative overflow-hidden bg-[linear-gradient(180deg,rgba(17,24,39,0.42),rgba(7,8,13,0.2)_42%,rgba(17,24,39,0.34))]"
      aria-labelledby="workflow-title"
    >
      <div className="nova-orb right-[-10rem] top-24 size-80 bg-violet/20" />
      <div className="container-page grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <RevealText as="p" className="eyebrow mb-5 text-cyan">
            AI Workflow
          </RevealText>
          <RevealText
            as="h2"
            id="workflow-title"
            className="section-title max-w-2xl text-paper"
          >
            Detect. Idea. Approve. Publish.
          </RevealText>
          <p className="mt-7 max-w-xl text-lg leading-8 text-paper/64">
            Ein klarer Prozess für Unternehmen, die Content nicht dem Zufall
            überlassen wollen.
          </p>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <div className="glass-line rounded-[18px] p-5">
              <p className="text-sm font-bold text-paper">Marketing sieht früher</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Content-Chancen werden erkannt, bevor jemand aktiv danach sucht.
              </p>
            </div>
            <div className="glass-line rounded-[18px] p-5">
              <p className="text-sm font-bold text-paper">Kontrolle bleibt intern</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Automatisierung endet dort, wo Freigabe und Markenrisiko
                beginnen.
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute bottom-10 left-6 top-10 w-px overflow-hidden bg-white/10">
            <div
              data-workflow-line
              className="h-full w-full origin-top bg-gradient-to-b from-violet via-cyan to-acid"
            />
          </div>

          <div className="space-y-5 pl-12">
            {aiWorkflowSteps.map((item, index) => (
              <article
                key={item.step}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                data-cursor-label={item.label}
                className="workflow-card nova-card rounded-[22px] p-5 sm:p-7"
              >
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.08em] text-cyan">
                      {item.step} / {item.label}
                    </p>
                    <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] text-paper sm:text-4xl">
                      {item.title}
                    </h3>
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-sm font-semibold text-muted">
                    {item.metric}
                  </div>
                </div>
                <p className="mt-6 max-w-2xl text-base leading-7 text-muted">
                  {item.copy}
                </p>
                <div className="mt-6 grid gap-2 sm:grid-cols-3">
                  {["Signal", "Brand", "Gate"].map((label, chipIndex) => (
                    <div
                      key={label}
                      className="rounded-full border border-white/10 bg-ink/50 px-3 py-2 text-center text-xs font-bold uppercase tracking-[0.08em] text-muted"
                    >
                      {chipIndex <= index ? label : "locked"}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
