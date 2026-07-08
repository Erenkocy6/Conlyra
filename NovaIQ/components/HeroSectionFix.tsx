"use client";

import { useEffect } from "react";
import styles from "./HeroSectionFix.module.css";

const MANIFESTO_TRIGGER_ID = "conlyra-manifesto-clean-reveal";

export function HeroSectionFix() {
  useEffect(() => {
    let disposed = false;
    let timer: number | undefined;
    let manifestoTrigger: { kill: (revert?: boolean) => void } | null = null;
    let attempts = 0;

    const install = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (disposed) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      const synchronize = () => {
        if (disposed) {
          return;
        }

        attempts += 1;

        const hero = document.querySelector<HTMLElement>(".conlyra-hero");
        const manifesto = document.querySelector<HTMLElement>(".conlyra-type-manifesto");

        if (hero) {
          const heroTriggers = ScrollTrigger.getAll().filter((trigger) => trigger.trigger === hero);

          heroTriggers.forEach((trigger) => {
            trigger.kill(true);
          });

          const heroTargets = hero.querySelectorAll<HTMLElement>(
            ".conlyra-hero-video, .conlyra-hero-video video, .conlyra-hero-copy, .conlyra-hero-title, .conlyra-pill, .conlyra-hero-subline, .conlyra-actions, .conlyra-hero-aura",
          );

          gsap.set([hero, ...Array.from(heroTargets)], {
            clearProps: "transform,opacity,filter,position,top,left,right,bottom,width,height,willChange",
          });

          hero.style.setProperty("--hero-sequence-progress", "0");
          hero.style.setProperty("--hero-bridge-opacity", "0");
          hero.style.setProperty("--conlyra-film-lift", "0px");

          const possibleSpacer = hero.parentElement;
          if (possibleSpacer?.classList.contains("pin-spacer")) {
            possibleSpacer.style.setProperty("height", "auto", "important");
            possibleSpacer.style.setProperty("min-height", "0", "important");
            possibleSpacer.style.setProperty("padding", "0", "important");
          }
        }

        if (manifesto) {
          const words = Array.from(
            manifesto.querySelectorAll<HTMLElement>("[data-conlyra-type-word]"),
          );

          ScrollTrigger.getAll()
            .filter(
              (trigger) =>
                trigger.trigger === manifesto && trigger.vars.id !== MANIFESTO_TRIGGER_ID,
            )
            .forEach((trigger) => trigger.kill(true));

          manifestoTrigger?.kill(true);

          words.forEach((word) => {
            word.style.setProperty("--word-fill", "0%");
            word.classList.remove("is-filled");
          });

          const trigger = ScrollTrigger.create({
            id: MANIFESTO_TRIGGER_ID,
            trigger: manifesto,
            start: "top 78%",
            end: "bottom 38%",
            scrub: 0.7,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const total = Math.max(1, words.length);

              words.forEach((word, index) => {
                const localProgress = Math.min(
                  1,
                  Math.max(0, self.progress * (total + 0.9) - index + 0.08),
                );

                word.style.setProperty("--word-fill", `${Math.round(localProgress * 100)}%`);
                word.classList.toggle("is-filled", localProgress >= 0.96);
              });
            },
          });

          manifestoTrigger = trigger;
        }

        ScrollTrigger.refresh();

        if (attempts < 12) {
          timer = window.setTimeout(synchronize, 180);
        }
      };

      timer = window.setTimeout(synchronize, 160);
    };

    void install();

    return () => {
      disposed = true;
      if (timer) {
        window.clearTimeout(timer);
      }
      manifestoTrigger?.kill(true);
    };
  }, []);

  return <span className={styles.root} aria-hidden="true" />;
}
