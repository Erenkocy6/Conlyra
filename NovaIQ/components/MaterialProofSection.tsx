"use client";

import { useEffect, useRef } from "react";
import { stockImageScenes } from "@/data/landing";
import { RevealText } from "@/components/RevealText";
import { StockImageFrame } from "@/components/StockImageFrame";
import { prefersReducedMotion } from "@/lib/utils";

export function MaterialProofSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || prefersReducedMotion()) {
      return;
    }

    let cleanup: (() => void) | undefined;
    let active = true;

    async function animateMaterial() {
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

      const ctx = gsap.context(() => {
        gsap.fromTo(
          "[data-material-image]",
          { y: 60, autoAlpha: 0, clipPath: "inset(10% 0% 10% 0%)" },
          {
            y: 0,
            autoAlpha: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1,
            ease: "power4.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: currentSection,
              start: "top 72%",
              once: true,
            },
          },
        );

        gsap.to("[data-material-image]:nth-child(2)", {
          yPercent: -9,
          ease: "none",
          scrollTrigger: {
            trigger: currentSection,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }, currentSection);

      cleanup = () => ctx.revert();
    }

    void animateMaterial();

    return () => {
      active = false;
      cleanup?.();
    };
  }, []);

  return (
    <section
      id="material"
      ref={sectionRef}
      className="section-pad relative isolate overflow-hidden"
      aria-labelledby="material-title"
    >
      <div className="absolute inset-x-0 top-1/4 -z-10 h-[38rem] bg-[radial-gradient(ellipse_at_50%_50%,rgba(163,230,53,0.1),transparent_65%)]" />
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <RevealText as="p" className="eyebrow mb-5 text-acid">
              Material Proof
            </RevealText>
            <RevealText
              as="h2"
              id="material-title"
              className="section-title max-w-3xl text-paper"
            >
              Der Content ist schon da. Er braucht nur ein System.
            </RevealText>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-muted lg:justify-self-end">
            Meetings, Arbeitsplätze, Screens und kleine Fortschritte sind keine
            Deko. Genau daraus wird die NovaIQ-Pipeline gespeist: erkennen,
            einordnen, verdichten, freigeben.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-[1.08fr_0.92fr_1fr] lg:items-start">
          {stockImageScenes.map((image, index) => (
            <div
              key={image.title}
              data-material-image
              className={index === 1 ? "lg:mt-20" : undefined}
            >
              <StockImageFrame
                src={image.src}
                title={image.title}
                label={image.label}
                metric={image.metric}
                source={image.source}
                className={index === 0 ? "lg:min-h-[34rem]" : undefined}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
