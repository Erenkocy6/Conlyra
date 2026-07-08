"use client";

import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/utils";

type NovaWindow = Window & {
  novaLenis?: {
    scrollTo: (
      target: string | number | HTMLElement,
      options?: { duration?: number; immediate?: boolean; offset?: number },
    ) => void;
  };
};

function scrollToHash(hash: string, behavior: ScrollBehavior) {
  if (!hash || hash === "#") {
    return;
  }

  const lenis = (window as NovaWindow).novaLenis;

  if (lenis && behavior === "smooth") {
    lenis.scrollTo(hash, {
      duration: 1.24,
      offset: 0,
    });
    return;
  }

  const target = document.querySelector(hash);

  if (!target) {
    return;
  }

  target.scrollIntoView({
    behavior,
    block: "start",
  });
}

export function SmoothHashNavigation() {
  useEffect(() => {
    const behavior: ScrollBehavior = prefersReducedMotion() ? "auto" : "smooth";

    const handleClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest("a[href^='#']");

      if (!(anchor instanceof HTMLAnchorElement)) {
        return;
      }

      const hash = anchor.getAttribute("href") ?? "";

      if (!hash || hash === "#") {
        return;
      }

      event.preventDefault();
      if (window.location.hash !== hash) {
        history.pushState(null, "", hash);
      }
      scrollToHash(hash, behavior);
    };

    const handleHashChange = () => {
      window.setTimeout(() => scrollToHash(window.location.hash, behavior), 80);
    };

    document.addEventListener("click", handleClick);
    window.addEventListener("hashchange", handleHashChange);

    if (window.location.hash) {
      window.setTimeout(() => scrollToHash(window.location.hash, "auto"), 650);
    }

    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return null;
}
