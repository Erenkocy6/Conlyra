"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

export function ConlyraScrollDirector() {
  const pathname = usePathname();

  useEffect(() => {
    let disposed = false;
    let cleanup: () => void = () => {};

    const setup = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      await new Promise<void>((resolve) => {
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => resolve());
        });
      });

      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);

      const manifesto = document.querySelector<HTMLElement>("[data-director-manifesto]");
      const manifestoWords = manifesto
        ? Array.from(manifesto.querySelectorAll<HTMLElement>("[data-director-word]"))
        : [];
      const film = document.querySelector<HTMLElement>("[data-film-chapter]");

      const signatureTargets = new Set<Element>(
        [manifesto, film].filter((target): target is HTMLElement => Boolean(target)),
      );

      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger && signatureTargets.has(trigger.trigger)) {
          trigger.kill(true);
        }
      });

      const created: Array<ReturnType<typeof ScrollTrigger.create>> = [];

      if (manifesto && manifestoWords.length) {
        created.push(
          ScrollTrigger.create({
            trigger: manifesto,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const revealProgress = clamp01((self.progress - 0.035) / 0.93);
              const total = manifestoWords.length;

              manifestoWords.forEach((word, index) => {
                const local = clamp01(revealProgress * (total + 0.9) - index);
                word.style.setProperty("--director-fill", `${Math.round(local * 100)}%`);
              });
            },
          }),
        );
      }

      if (film) {
        const video = film.querySelector<HTMLVideoElement>("video");
        const words = Array.from(film.querySelectorAll<HTMLElement>("[data-film-word]"));

        created.push(
          ScrollTrigger.create({
            trigger: film,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.75,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress;

              if (video) {
                gsap.set(video, {
                  scale: 1.065 - progress * 0.065,
                  yPercent: -progress * 1.5,
                });
              }

              words.forEach((word, index) => {
                const start = 0.08 + index * 0.2;
                const local = clamp01((progress - start) / 0.16);
                gsap.set(word, {
                  opacity: 0.16 + local * 0.84,
                  y: (1 - local) * 8,
                });
              });
            },
          }),
        );
      }

      const integration = document.querySelector<HTMLElement>(
        'section[aria-labelledby="integration-title"]',
      );
      if (integration && !integration.id) integration.id = "integrations";

      ScrollTrigger.refresh();

      cleanup = () => {
        created.forEach((trigger) => trigger.kill(true));
      };
    };

    void setup();

    return () => {
      disposed = true;
      cleanup();
    };
  }, [pathname]);

  return null;
}
