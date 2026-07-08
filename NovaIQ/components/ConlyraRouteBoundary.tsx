"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ConlyraRouteBoundary.module.css";

type TransitionPhase = "idle" | "covering" | "covered" | "revealing";

const TRANSITION_FLAG = "conlyra-liquid-transition";
const TRANSITION_MESSAGE = "conlyra-liquid-transition-message";
const DEFAULT_MESSAGE = "SYSTEM TRANSITION";

const routeMessages = [
  ["/ai-agenten", "AGENT SYSTEM INITIALIZING"],
  ["/workflow-automatisierung", "FLOW ENGINE CONNECTING"],
  ["/private-intelligence", "PRIVATE CONTEXT LOADING"],
  ["/voice-ai", "VOICE CHANNEL OPENING"],
  ["/ai-strategy", "READINESS SCAN STARTING"],
  ["/integrationen", "OPERATING STACK CONNECTING"],
  ["/governance-security", "CONTROL LAYER VERIFYING"],
  ["/lab", "EXPERIMENT ENVIRONMENT OPENING"],
] as const;

function getTransitionMessage(pathname: string) {
  const matchedRoute = routeMessages.find(([route]) =>
    pathname === route || pathname.startsWith(`${route}/`),
  );

  return matchedRoute?.[1] ?? DEFAULT_MESSAGE;
}

export function ConlyraRouteBoundary() {
  const [phase, setPhase] = useState<TransitionPhase>("idle");
  const [transitionMessage, setTransitionMessage] = useState(DEFAULT_MESSAGE);
  const navigatingRef = useRef(false);
  const targetUrlRef = useRef<string | null>(null);

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    let firstFrame = 0;
    let secondFrame = 0;
    let settleTimer = 0;
    let navigationTimer = 0;

    const enteredThroughTransition = window.sessionStorage.getItem(TRANSITION_FLAG) === "1";

    if (enteredThroughTransition) {
      const persistedMessage = window.sessionStorage.getItem(TRANSITION_MESSAGE);

      window.sessionStorage.removeItem(TRANSITION_FLAG);
      window.sessionStorage.removeItem(TRANSITION_MESSAGE);
      setTransitionMessage(persistedMessage ?? getTransitionMessage(window.location.pathname));
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      setPhase("covered");

      firstFrame = window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        secondFrame = window.requestAnimationFrame(() => {
          setPhase("revealing");
        });
      });

      settleTimer = window.setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        navigatingRef.current = false;
        targetUrlRef.current = null;
        setPhase("idle");
      }, 1120);
    }

    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        navigatingRef.current
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const rawHref = link.getAttribute("href");
      if (
        !rawHref ||
        rawHref.startsWith("mailto:") ||
        rawHref.startsWith("tel:") ||
        rawHref.startsWith("javascript:")
      ) {
        return;
      }

      if (link.target === "_blank" || link.hasAttribute("download")) return;

      const nextUrl = new URL(link.href, window.location.href);
      if (nextUrl.origin !== window.location.origin) return;

      const currentUrl = new URL(window.location.href);
      const sameDocument =
        nextUrl.pathname === currentUrl.pathname &&
        nextUrl.search === currentUrl.search;

      if (sameDocument) return;

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      const nextMessage = getTransitionMessage(nextUrl.pathname);

      navigatingRef.current = true;
      targetUrlRef.current = nextUrl.href;
      setTransitionMessage(nextMessage);
      setPhase("covering");

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const navigationDelay = reducedMotion ? 30 : 900;

      navigationTimer = window.setTimeout(() => {
        setPhase("covered");
        window.sessionStorage.setItem(TRANSITION_FLAG, "1");
        window.sessionStorage.setItem(TRANSITION_MESSAGE, nextMessage);
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });

        const destination = targetUrlRef.current;
        if (destination) window.location.assign(destination);
      }, navigationDelay);
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      window.clearTimeout(settleTimer);
      window.clearTimeout(navigationTimer);
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    const body = document.body;
    const previousOverflow = body.style.overflow;

    if (phase !== "idle") {
      body.style.overflow = "hidden";
    }

    return () => {
      body.style.overflow = previousOverflow;
    };
  }, [phase]);

  return (
    <div className={styles.overlay} data-phase={phase} aria-hidden="true">
      <div className={styles.liquid}>
        <svg className={styles.waveTop} viewBox="0 0 1600 180" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M0 120C140 36 274 34 410 112C548 192 690 188 836 94C980 2 1120 14 1260 102C1390 184 1508 174 1600 112V180H0V120Z"
            fill="currentColor"
          />
        </svg>
        <svg className={styles.waveBottom} viewBox="0 0 1600 180" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M0 120C140 36 274 34 410 112C548 192 690 188 836 94C980 2 1120 14 1260 102C1390 184 1508 174 1600 112V180H0V120Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className={styles.logoStage}>
        <div className={styles.logoWrap}>
          <img src="/conlyra-logo.svg" alt="" />
          <span>CONLYRA / {transitionMessage}</span>
        </div>
      </div>
    </div>
  );
}
