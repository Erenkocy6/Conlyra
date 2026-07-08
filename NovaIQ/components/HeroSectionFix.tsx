"use client";

import { useEffect } from "react";
import styles from "./HeroSectionFix.module.css";

export function HeroSectionFix() {
  useEffect(() => {
    let disposed = false;
    let timer: number | undefined;
    let attempts = 0;

    const normalizeHeroScroll = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (disposed) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      const hero = document.querySelector<HTMLElement>(".conlyra-hero");
      if (!hero) {
        return;
      }

      const resetHero = () => {
        if (disposed) {
          return;
        }

        attempts += 1;

        const heroTriggers = ScrollTrigger.getAll().filter((trigger) => trigger.trigger === hero);

        heroTriggers.forEach((trigger) => {
          trigger.animation?.kill();
          trigger.kill(true);
        });

        const animatedTargets = hero.querySelectorAll<HTMLElement>(
          ".conlyra-hero-video, .conlyra-hero-video video, .conlyra-hero-copy, .conlyra-hero-title, .conlyra-pill, .conlyra-hero-subline, .conlyra-actions, .conlyra-hero-aura",
        );

        gsap.set([hero, ...Array.from(animatedTargets)], {
          clearProps: "transform,opacity,filter,position,top,left,right,bottom,width,height,willChange",
        });

        hero.style.setProperty("--hero-sequence-progress", "0");
        hero.style.setProperty("--hero-bridge-opacity", "0");
        hero.style.setProperty("--conlyra-film-lift", "0px");

        if (heroTriggers.length > 0) {
          ScrollTrigger.refresh();
          return;
        }

        if (attempts < 40) {
          timer = window.setTimeout(resetHero, 125);
        }
      };

      resetHero();
    };

    void normalizeHeroScroll();

    return () => {
      disposed = true;
      if (timer) {
        window.clearTimeout(timer);
      }
    };
  }, []);

  return <span className={styles.root} aria-hidden="true" />;
}
