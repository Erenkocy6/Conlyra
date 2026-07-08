"use client";

import Image from "next/image";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, FormEvent, RefObject } from "react";

const navLinks = [
  ["Plattform", "#platform"],
  ["Leistungen", "#services"],
  ["Produkt", "#workflow-preview"],
  ["Anwendungen", "#use-cases"],
  ["Vertrauen", "#trust"],
  ["Integrationen", "#integrations"],
  ["Kontakt", "#contact"],
];

const showCinematicShowcase = false;

const trustWaveText =
  "Erst Vertrauen. Dann Automation. Jeder Agent, jede Freigabe und jeder Schritt bleibt sichtbar.";

const conlyraManifestoWords =
  "Verbinden Sie Daten Tools und Teams zu KI-Agenten die Prozesse verstehen entscheiden und kontrolliert ausfuehren.".split(
    " ",
  );

const conlyraEngineBadges = ["Private Daten", "Agenten", "Workflow OS", "Kontrolle"];

const serviceOffers = [
  {
    step: "01",
    label: "KI-Potenzialanalyse",
    title: "Finden Sie die Arbeit, die nie wieder manuell laufen sollte.",
    copy: "Wir kartieren Prozessdruck, Datenquellen, Risiken und Automationspotenzial. Daraus entsteht eine klare KI-Roadmap, die Ihr Team wirklich umsetzen kann.",
    proof: "ROI-gefuehrte Roadmap",
  },
  {
    step: "02",
    label: "Custom Agent Build",
    title: "Bauen Sie private Agenten, die wie starke Operator arbeiten.",
    copy: "CONLYRA entwirft Agenten entlang von Rollen, Tools, Berechtigungen und Business-Regeln, damit sie mit Kontext denken und in echten Systemen handeln.",
    proof: "Agentische Ausfuehrung",
  },
  {
    step: "03",
    label: "Workflow Automation",
    title: "Verwandeln Sie langsame Ablaeufe in eine lebendige Ausfuehrungsschicht.",
    copy: "Inbox, CRM, Wissensbasen, APIs und Freigaben werden zu einem kontrollierten Flow mit Routing, Status, Eskalation und messbarem Output.",
    proof: "Arbeit bewegt sich schneller",
  },
  {
    step: "04",
    label: "Private Data Intelligence",
    title: "Machen Sie Unternehmenswissen sofort nutzbar.",
    copy: "Wir verbinden Dokumente, Datenbanken und interne Tools zu agentenbereitem Kontext, ohne sensibles Wissen in eine Blackbox zu verwandeln.",
    proof: "Kontext auf Abruf",
  },
  {
    step: "05",
    label: "Governance Launch",
    title: "Launchen Sie KI, der Ihre Fuehrung in Produktion vertraut.",
    copy: "Human Gates, Audit Trails, Rollenlogik und operative Dashboards machen Automation sichtbar, steuerbar und skalierbar.",
    proof: "Enterprise-Kontrolle",
  },
];

const outcomeProofs = [
  ["42%", "weniger manuelle Arbeit", "durch Agenten-Routing und klare Review-Gates"],
  ["3.8x", "schnellere Reaktion", "wenn CRM, Inbox und Wissen in einem Flow laufen"],
  ["99.9%", "Betriebsziel", "fuer Workflows, die jeden Tag liefern muessen"],
];

const salesPillars = [
  {
    label: "01 / Connect",
    title: "Alle Signale an einem Ort.",
    copy: "CRM, Dokumente, Inbox und interne Tools werden zu einem lesbaren Arbeitskontext.",
  },
  {
    label: "02 / Decide",
    title: "Agents handeln mit Guardrails.",
    copy: "Policy, Memory, Risiko und Freigaben sind Teil jedes kritischen Workflows.",
  },
  {
    label: "03 / Scale",
    title: "Output wird messbar.",
    copy: "Teams sehen Durchlaufzeit, Kosten, Reviews und Wirkung direkt im System.",
  },
];

const signalBloomSteps = [
  ["01", "Signal", "CRM + Dokument"],
  ["02", "Kontext", "Policy + Verlauf"],
  ["03", "Review", "Mensch gibt frei"],
  ["04", "Action", "Audit inklusive"],
];

const capabilities = [
  {
    label: "01 / Strategy",
    title: "AI-Strategie",
    copy: "Finden Sie die Workflows, die echten ROI liefern.",
    tags: ["Roadmap", "Governance", "Potenzialanalyse"],
  },
  {
    label: "02 / Agents",
    title: "Custom AI-Agenten",
    copy: "Agenten fuer Rollen, Tools und Entscheidungen.",
    tags: ["Agenten-Design", "Memory", "Tool-Nutzung"],
  },
  {
    label: "03 / Automation",
    title: "Workflow Automation",
    copy: "Wiederholbare Arbeit laeuft sauber, schnell und messbar.",
    tags: ["Routing", "Freigaben", "Audit-Trail"],
  },
  {
    label: "04 / Data",
    title: "Data Intelligence",
    copy: "Wissen wird auffindbar, nutzbar und agentenbereit.",
    tags: ["Knowledge Graph", "Suche", "Erkenntnisse"],
  },
];

const impactStats = [
  ["-42", "%", "Manuelle Arbeit", "Potenzial fuer weniger Handarbeit", "0"],
  ["3.8", "x", "Schnellere Reaktion", "Routing-Speed im Modell", "1"],
  ["99.9", "%", "Uptime-Ziel", "Ziel fuer Live-Systeme", "1"],
  ["24", "/7", "Agent Layer", "Aktive Prozesslogik", "0"],
];

const useCases = [
  {
    status: "2026 / Vorschau",
    industry: "Support",
    title: "Support skalieren",
    copy: "Tickets routen. Antworten vorbereiten. Faelle sauber eskalieren.",
    cta: "Case ansehen",
    video: "/media/AdobeStock_1516198647.mp4",
  },
  {
    status: "2026 / Vorschau",
    industry: "Wissen",
    title: "Knowledge Agent",
    copy: "Dokumente, Richtlinien und Historie werden sofort nutzbar.",
    cta: "System ansehen",
    video: "/media/AdobeStock_1525614966.mp4",
  },
  {
    status: "2026 / Vorschau",
    industry: "Vertrieb",
    title: "Sales Follow-up",
    copy: "Calls, CRM-Updates und naechste Schritte bleiben in Bewegung.",
    cta: "Flow ansehen",
    video: "/media/AdobeStock_1535809490.mp4",
  },
  {
    status: "2026 / Vorschau",
    industry: "Operations",
    title: "Operations Copilot",
    copy: "Tasks, Reviews und Exceptions laufen in einem System.",
    cta: "Workflow ansehen",
    video: "/media/AdobeStock_1558014909.mp4",
  },
];

const workflowNodes = [
  ["input", "Eingang", "Quellpaket", "LIVE"],
  ["classify", "Klassifikation", "Absicht + Prioritaet", "AUTO"],
  ["agent", "Agent", "Entscheidungsweg", "HOST"],
  ["tool", "Tool-Aufruf", "CRM + API", "SYNC"],
  ["approval", "Freigabe", "Menschliche Pruefung", "OFFEN"],
  ["output", "Ergebnis", "Aktion protokolliert", "BEREIT"],
];

const dashboardCards = [
  ["Systemlast", "68", "%", "Aktive Kapazitaet"],
  ["Token-Nutzung", "42", "k", "Gerouteter Kontext"],
  ["Workflow-Laeufe", "1.8", "k", "Abgeschlossene Runs"],
  ["SLA-Reaktion", "312", "ms", "Median Routing"],
  ["Effizienzpfad", "18", "%", "Automation-Potenzial"],
  ["Aktive Knoten", "124", "", "Verbundene Komponenten"],
];

const approachSteps = [
  ["01", "Audit", "Systeme, Quellen und Entscheidungen werden sichtbar."],
  ["02", "Build", "Agenten, Reviews und Tool-Grenzen werden gesetzt."],
  ["03", "Launch", "Workflows starten dort, wo Tempo zaehlt."],
  ["04", "Scale", "Leistung, Kontrolle und Wirkung wachsen mit."],
];

const featureTabs = [
  {
    title: "ANALYSE",
    copy: "Quellen, Workflows und Luecken werden sichtbar.",
    meta: ["Quellenkarte", "Prozessinventar", "Zugriffsmodell"],
  },
  {
    title: "BEWERTUNG",
    copy: "ROI, Risiko und Hebel werden priorisiert.",
    meta: ["Signalbewertung", "Risikopruefung", "Wertprognose"],
  },
  {
    title: "MODELLIERUNG",
    copy: "Agenten lernen Regeln, Tools und Grenzen.",
    meta: ["Policy Memory", "Regeln", "Entscheidungswege"],
  },
  {
    title: "BETRIEB",
    copy: "Live-Workflows laufen mit Reviews und Telemetrie.",
    meta: ["Live-Laeufe", "Telemetrie", "Review-Gates"],
  },
];

const integrations = [
  "Slack",
  "Gmail",
  "Google Drive",
  "Notion",
  "HubSpot",
  "Salesforce",
  "GitHub",
  "Stripe",
  "Zapier",
  "Make",
  "Airtable",
  "Webhooks",
  "Interne APIs",
  "SQL-Datenbanken",
];

const provenSolutions = [
  {
    brand: "Core",
    year: "2024",
    title: "Private Agent Logic",
    copy: "Rollen, Memory und Tool-Grenzen bleiben klar.",
    video: "/media/AdobeStock_444039087.mp4",
  },
  {
    brand: "Flow",
    year: "2025",
    title: "Workflow Automation",
    copy: "Tasks laufen mit Status, SLA und Eskalation.",
    video: "/media/AdobeStock_1516198647.mp4",
  },
  {
    brand: "Trust",
    year: "2026",
    title: "Review Governance",
    copy: "Kritische Aktionen brauchen ein klares Go.",
    video: "/media/AdobeStock_517331471.mp4",
  },
  {
    brand: "Signal",
    year: "2026",
    title: "Signal Intelligence",
    copy: "Dokumente, Tickets und Events werden lesbar.",
    video: "/media/AdobeStock_534758496.mp4",
  },
];

const filmReels = {
  hero: "/media/AdobeStock_444039087.mp4",
  platform: "/media/AdobeStock_444039087.mp4",
  scrub: "/media/AdobeStock_1558014909.mp4",
  blend: "/media/AdobeStock_1499424979.mp4",
  type: "/media/AdobeStock_1525614966.mp4",
  approach: "/media/AdobeStock_517331471.mp4",
  contact: "/media/AdobeStock_534758496.mp4",
};

const storySteps = [
  ["01", "Capture", "Daten, Dokumente und Events werden zu Signalen."],
  ["02", "Decide", "Agenten pruefen Kontext, Policy und Risiko."],
  ["03", "Act", "Tools, APIs und Follow-ups starten sichtbar."],
  ["04", "Learn", "Logs und Telemetrie verbessern jeden Lauf."],
];

const fullscreenFilms = [
  {
    eyebrow: "Private AI Layer",
    title: "Daten werden zu Signalen.",
    copy: "Grosses Bild. Klare Logik. Keine Ablenkung.",
    src: "/media/AdobeStock_444039087.mp4",
    tone: "matrix",
  },
  {
    eyebrow: "Agent Execution",
    title: "Automation braucht Kontext.",
    copy: "Reduzierte Motion macht komplexe Systeme fuehrbar.",
    src: "/media/AdobeStock_517331471.mp4",
    tone: "contrast",
  },
  {
    eyebrow: "Controlled Automation",
    title: "Enterprise AI muss liefern.",
    copy: "Ruhig im Look. Direkt in der Wirkung.",
    src: "/media/AdobeStock_534758496.mp4",
    tone: "noir",
  },
];

const systemFilms = [
  {
    label: "01 / Signal",
    title: "Aus Input wird Absicht.",
    src: "/media/AdobeStock_1516198647.mp4",
  },
  {
    label: "02 / Routing",
    title: "Kontext findet den Pfad.",
    src: "/media/AdobeStock_1525614966.mp4",
  },
  {
    label: "03 / Action",
    title: "Jede Aktion bleibt belegbar.",
    src: "/media/AdobeStock_1535809490.mp4",
  },
];

const pinnedChapters = [
  {
    label: "01 / Eingang",
    title: "Signale landen in einem System.",
    copy: "Dokumente, Tools und Kundenkontext werden steuerbar.",
    src: "/media/AdobeStock_1516198647.mp4",
  },
  {
    label: "02 / Bewertung",
    title: "Agenten pruefen den Kontext.",
    copy: "Policy, Memory und Grenzen bleiben sichtbar.",
    src: "/media/AdobeStock_1525614966.mp4",
  },
  {
    label: "03 / Ausfuehrung",
    title: "Aufgaben werden Infrastruktur.",
    copy: "Calls, Reviews und Follow-ups laufen mit Status.",
    src: "/media/AdobeStock_1535809490.mp4",
  },
  {
    label: "04 / Optimierung",
    title: "Jeder Zyklus macht es smarter.",
    copy: "Telemetrie verbessert den naechsten Lauf.",
    src: "/media/AdobeStock_534758496.mp4",
  },
];

const maskWords = [
  ["AUTOMATION", "Workflow-Bewegung"],
  ["AGENTEN", "Private Bewertung"],
  ["SYSTEME", "Live-Betrieb"],
];

const commandMetrics = [
  ["87%", "Confidence"],
  ["312ms", "Routing"],
  ["42k", "Tokens"],
  ["99.9", "SLA"],
];

const commandNodes = [
  ["Source", "Dokument rein", "LIVE"],
  ["Policy", "Guardrail aktiv", "LOCKED"],
  ["Agent", "Risiko-Check", "AKTIV"],
  ["Tool", "API bereit", "SYNC"],
  ["Review", "Freigabe offen", "BEREIT"],
  ["Output", "Aktion geloggt", "FERTIG"],
];

const commandLogs = [
  "source.normalized / packet ready",
  "policy.match / review gate",
  "agent.score / route selected",
  "tool.call / crm_update queued",
  "audit.write / workflow saved",
];

const workflowLabNodes = [
  ["Email Trigger", "IMAP", "1 item", "inbox"],
  ["Edit Fields", "Manuell", "1 item", "edit"],
  ["AI Agent", "Tools Agent", "1 item", "agent"],
  ["Code", "Sandbox", "1 item", "code"],
  ["Telegram", "sendAndWait", "", "send"],
  ["If", "Rule Gate", "", "if"],
  ["Send Email", "Send", "", "mail"],
];

const workflowChat = [
  ["agent", "Ich pruefe Kontext und Risiko vor dem Tool-Call."],
  ["user", "Nur bestaetigte CRM-Daten. Danach eine Reply-Vorlage."],
  ["agent", "Route steht: CRM lesen, Risiko checken, Review an Ops."],
];

const customerRatings = [
  {
    company: "Vertex Labs",
    title: "Support, der skaliert",
    comment:
      "Unsere Flows reagieren schneller, ohne Qualitaet zu verlieren.",
  },
  {
    company: "Flowsate AI",
    title: "Monate R&D gespart",
    comment:
      "Wir konnten in Wochen testen, statt Agentenlogik neu zu bauen.",
  },
  {
    company: "Neural Sync",
    title: "Trust in jeder Inferenz",
    comment:
      "Review-Punkte machen Agentenentscheidungen fuer Teams klar.",
  },
  {
    company: "Sentinel Ops",
    title: "Enterprise-ready",
    comment:
      "Auch nicht-technische Teams verstehen komplexe Prozesse sofort.",
  },
];

const customerLogos = ["Aetna", "Cigna", "Anthem", "CVS Pharmacy", "United Healthcare", "Vertex", "Neural Sync"];

function KineticWords({ text }: { text: string }) {
  const words = text.split(" ");

  return words.map((word, index) => (
    <Fragment key={`${word}-${index}`}>
      <span className="conlyra-word-clip">
        <span data-conlyra-word style={{ "--word-index": index, "--word-delay": `${index * 38}ms` } as CSSProperties}>
          {word}
        </span>
      </span>
      {index < words.length - 1 ? " " : null}
    </Fragment>
  ));
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = () => setReduced(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const sync = () => {
      frame = 0;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setProgress(Math.min(1, Math.max(0, window.scrollY / max)));
    };

    const requestSync = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(sync);
      }
    };

    sync();
    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);

    return () => {
      window.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", requestSync);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return progress;
}

function useActiveSection(sectionIds: string[]) {
  const [active, setActive] = useState(sectionIds[0] ?? "top");

  useEffect(() => {
    let frame = 0;

    const sync = () => {
      frame = 0;
      const anchor = window.innerHeight * 0.35;
      let next = sectionIds[0] ?? "top";

      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (!section) {
          return;
        }
        const rect = section.getBoundingClientRect();
        if (rect.top <= anchor && rect.bottom > anchor * 0.5) {
          next = id;
        }
      });

      setActive(next);
    };

    const requestSync = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(sync);
      }
    };

    sync();
    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);

    return () => {
      window.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", requestSync);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [sectionIds]);

  return active;
}

function useMenuState() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("conlyra-menu-open", isOpen);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("conlyra-menu-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  return { isOpen, setIsOpen };
}

function animateCounter(element: HTMLElement) {
  const target = Number(element.dataset.conlyraCounter ?? "0");
  const decimals = Number(element.dataset.conlyraDecimals ?? "0");
  const duration = 1200;
  const start = performance.now();

  const tick = (now: number) => {
    const elapsed = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - elapsed, 3);
    const value = target * eased;
    element.textContent = value.toFixed(decimals);

    if (elapsed < 1) {
      window.requestAnimationFrame(tick);
    }
  };

  window.requestAnimationFrame(tick);
}

function useConlyraMotion(rootRef: RefObject<HTMLDivElement | null>, reducedMotion: boolean) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const revealItems = Array.from(root.querySelectorAll<HTMLElement>("[data-conlyra-reveal]"));
    revealItems.forEach((item) => {
      const delay = item.dataset.conlyraDelay;
      if (delay) {
        item.style.setProperty("--conlyra-delay", `${delay}ms`);
      }
    });

    if (reducedMotion) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      root.querySelectorAll<HTMLElement>("[data-conlyra-counter]").forEach((counter) => {
        counter.textContent = Number(counter.dataset.conlyraCounter ?? "0").toFixed(
          Number(counter.dataset.conlyraDecimals ?? "0"),
        );
      });
      return;
    }

    const counterSet = new WeakSet<HTMLElement>();

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const item = entry.target as HTMLElement;
          item.classList.add("is-visible");
          item.querySelectorAll<HTMLElement>("[data-conlyra-counter]").forEach((counter) => {
            if (!counterSet.has(counter)) {
              counterSet.add(counter);
              animateCounter(counter);
            }
          });
          revealObserver.unobserve(item);
        });
      },
      { rootMargin: "0px 0px -14% 0px", threshold: 0.12 },
    );

    revealItems.forEach((item) => revealObserver.observe(item));

    return () => revealObserver.disconnect();
  }, [reducedMotion, rootRef]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-conlyra-card]"));

    const cleanup = cards.map((card) => {
      const onMove = (event: PointerEvent) => {
        const rect = card.getBoundingClientRect();
        const localX = event.clientX - rect.left;
        const localY = event.clientY - rect.top;
        const normalizedX = rect.width ? localX / rect.width - 0.5 : 0;
        const normalizedY = rect.height ? localY / rect.height - 0.5 : 0;

        card.style.setProperty("--mx", `${localX}px`);
        card.style.setProperty("--my", `${localY}px`);
        card.style.setProperty("--card-shift-x", `${(normalizedX * 3.6).toFixed(2)}px`);
        card.style.setProperty("--card-shift-y", `${(normalizedY * 2.8).toFixed(2)}px`);
        card.style.setProperty("--card-media-x", `${(normalizedX * -12).toFixed(2)}px`);
        card.style.setProperty("--card-media-y", `${(normalizedY * -10).toFixed(2)}px`);
        card.classList.add("is-hot");
      };

      const onLeave = () => {
        card.classList.remove("is-hot");
        card.style.removeProperty("--card-shift-x");
        card.style.removeProperty("--card-shift-y");
        card.style.removeProperty("--card-media-x");
        card.style.removeProperty("--card-media-y");
      };

      card.addEventListener("pointermove", onMove, { passive: true });
      card.addEventListener("pointerleave", onLeave);

      return () => {
        card.removeEventListener("pointermove", onMove);
        card.removeEventListener("pointerleave", onLeave);
      };
    });

    return () => cleanup.forEach((dispose) => dispose());
  }, [reducedMotion, rootRef]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const buttons = Array.from(root.querySelectorAll<HTMLElement>(".conlyra-btn"));

    const cleanup = buttons.map((button) => {
      const onEnter = () => button.classList.add("is-hot");
      const onMove = (event: PointerEvent) => {
        const rect = button.getBoundingClientRect();
        button.style.setProperty("--btn-x", `${event.clientX - rect.left}px`);
        button.style.setProperty("--btn-y", `${event.clientY - rect.top}px`);
        button.classList.add("is-hot");
      };
      const onLeave = () => button.classList.remove("is-hot");

      button.addEventListener("pointerenter", onEnter);
      button.addEventListener("pointermove", onMove, { passive: true });
      button.addEventListener("pointerleave", onLeave);

      return () => {
        button.removeEventListener("pointerenter", onEnter);
        button.removeEventListener("pointermove", onMove);
        button.removeEventListener("pointerleave", onLeave);
      };
    });

    return () => cleanup.forEach((dispose) => dispose());
  }, [reducedMotion, rootRef]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    let frame = 0;
    let x = 0;
    let y = 0;

    const sync = () => {
      frame = 0;
      root.style.setProperty("--hero-x", `${x.toFixed(2)}px`);
      root.style.setProperty("--hero-y", `${y.toFixed(2)}px`);
    };

    const onMove = (event: PointerEvent) => {
      x = (event.clientX / window.innerWidth - 0.5) * 28;
      y = (event.clientY / window.innerHeight - 0.5) * 20;
      if (!frame) {
        frame = window.requestAnimationFrame(sync);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [reducedMotion, rootRef]);
}

function useSmoothHashNavigation(
  rootRef: RefObject<HTMLDivElement | null>,
  reducedMotion: boolean,
  closeMenu: () => void,
) {
  const closeMenuRef = useRef(closeMenu);

  useEffect(() => {
    closeMenuRef.current = closeMenu;
  }, [closeMenu]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const scrollToHash = (hash: string, shouldPushState = false) => {
      const target = document.getElementById(hash.replace("#", ""));
      if (!target) {
        return false;
      }

      target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
      if (shouldPushState && window.location.hash !== hash) {
        window.history.pushState(null, "", hash);
      }
      return true;
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest<HTMLAnchorElement>("a[href^='#']");
      const hash = link?.getAttribute("href");
      if (!hash || hash === "#") {
        return;
      }
      if (scrollToHash(hash, true)) {
        event.preventDefault();
        closeMenuRef.current();
      }
    };

    const timeoutIds: number[] = [];
    root.addEventListener("click", onClick);

    if (window.location.hash) {
      timeoutIds.push(window.setTimeout(() => scrollToHash(window.location.hash), 120));
    }

    return () => {
      root.removeEventListener("click", onClick);
      timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, [reducedMotion, rootRef]);
}

function useApproachStep(rootRef: RefObject<HTMLDivElement | null>) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const steps = Array.from(root.querySelectorAll<HTMLElement>("[data-conlyra-step]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          setActiveStep(Number((visible.target as HTMLElement).dataset.conlyraStep ?? "0"));
        }
      },
      { threshold: [0.35, 0.55, 0.75] },
    );

    steps.forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, [rootRef]);

  return activeStep;
}

function useVideoPlayback(rootRef: RefObject<HTMLDivElement | null>, reducedMotion: boolean) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const videos = Array.from(root.querySelectorAll<HTMLVideoElement>("video"));
    const ambientVideos = videos.filter((video) => !video.hasAttribute("data-conlyra-scrub-video"));

    if (reducedMotion) {
      videos.forEach((video) => video.pause());
      return;
    }

    const playVideo = (video: HTMLVideoElement) => {
      video.play().catch(() => {
        // Autoplay can be blocked by local browser settings; muted inline video remains the intended path.
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            playVideo(video);
          } else {
            video.pause();
          }
        });
      },
      { rootMargin: "24% 0px", threshold: 0.08 },
    );

    let frame = 0;
    const syncVisibleVideos = () => {
      frame = 0;
      ambientVideos.forEach((video) => {
        const rect = video.getBoundingClientRect();
        const isNearViewport = rect.bottom > -window.innerHeight * 0.24 && rect.top < window.innerHeight * 1.24;
        if (isNearViewport) {
          playVideo(video);
        } else {
          video.pause();
        }
      });
    };

    const requestSync = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(syncVisibleVideos);
      }
    };

    ambientVideos.forEach((video) => {
      observer.observe(video);
    });

    syncVisibleVideos();
    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", requestSync);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [reducedMotion, rootRef]);
}

function useAmbientMotionDirector(rootRef: RefObject<HTMLDivElement | null>, reducedMotion: boolean) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion) {
      return;
    }

    let frame = 0;
    const started = performance.now();
    let isVisible = true;

    const tick = (now: number) => {
      if (!isVisible) {
        frame = window.requestAnimationFrame(tick);
        return;
      }

      const position = ((now - started) / 1000) % 5;
      const cycle = (Math.sin(position * Math.PI * 0.55) + 1) / 2;
      const slowCycle = (Math.sin(position * Math.PI * 0.24 + 0.8) + 1) / 2;

      root.style.setProperty("--conlyra-video-opacity", (0.31 + cycle * 0.11).toFixed(3));
      root.style.setProperty("--conlyra-film-lift", `${((slowCycle - 0.5) * 18).toFixed(2)}px`);
      root.style.setProperty("--conlyra-grain-opacity", (0.045 + cycle * 0.032).toFixed(3));
      root.style.setProperty("--conlyra-scan-opacity", (0.11 + slowCycle * 0.12).toFixed(3));

      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);

    const onVisibilityChange = () => {
      isVisible = document.visibilityState === "visible";
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [reducedMotion, rootRef]);
}

function useVideoProjection(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  videoRef: RefObject<HTMLVideoElement | null>,
  reducedMotion: boolean,
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video || reducedMotion) {
      return;
    }

    let disposed = false;
    let animationFrame = 0;
    let cleanup: (() => void) | undefined;

    const setup = async () => {
      const THREE = await import("three");
      const currentCanvas = canvasRef.current;
      const currentVideo = videoRef.current;
      if (disposed || !currentCanvas || !currentVideo) {
        return;
      }

      let contextLost = false;
      const stopAnimation = () => {
        if (animationFrame) {
          window.cancelAnimationFrame(animationFrame);
          animationFrame = 0;
        }
      };
      const handleContextLost = (event: Event) => {
        contextLost = true;
        disposed = true;
        stopAnimation();
        event.stopImmediatePropagation();
      };
      const handleContextRestored = (event: Event) => {
        event.stopImmediatePropagation();
      };

      currentCanvas.addEventListener("webglcontextlost", handleContextLost, { capture: true });
      currentCanvas.addEventListener("webglcontextrestored", handleContextRestored, { capture: true });

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          canvas: currentCanvas,
          powerPreference: "high-performance",
        });
      } catch {
        currentCanvas.removeEventListener("webglcontextlost", handleContextLost, { capture: true });
        currentCanvas.removeEventListener("webglcontextrestored", handleContextRestored, { capture: true });
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
      camera.position.set(0, 0, 7.2);

      const texture = new THREE.VideoTexture(videoRef.current);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;

      const group = new THREE.Group();
      scene.add(group);

      const meshes = [] as import("three").Mesh[];
      const panelGeometry = new THREE.PlaneGeometry(4.6, 2.58, 40, 22);
      const panelPositions = [
        [-1.45, 0.18, 0, -0.2, 0.36, -0.08, 0.72],
        [1.28, -0.1, -0.72, 0.1, -0.34, 0.07, 0.48],
        [0.05, 0.88, -1.34, -0.28, 0.02, 0.02, 0.28],
      ];

      panelPositions.forEach(([x, y, z, rotX, rotY, rotZ, opacity]) => {
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          opacity,
          side: THREE.DoubleSide,
          transparent: true,
        });
        const mesh = new THREE.Mesh(panelGeometry.clone(), material);
        mesh.position.set(x, y, z);
        mesh.rotation.set(rotX, rotY, rotZ);
        group.add(mesh);
        meshes.push(mesh);
      });

      const wireMaterial = new THREE.MeshBasicMaterial({
        color: 0xb7ff2d,
        opacity: 0.09,
        transparent: true,
        wireframe: true,
      });
      const wire = new THREE.Mesh(new THREE.PlaneGeometry(6.8, 3.8, 34, 18), wireMaterial);
      wire.position.set(0, -0.04, 0.16);
      wire.rotation.set(-0.18, 0.08, 0);
      group.add(wire);

      const pointPositions: number[] = [];
      for (let x = -3.4; x <= 3.4; x += 0.36) {
        for (let y = -1.8; y <= 1.8; y += 0.36) {
          pointPositions.push(x, y, -1.9 + Math.sin((x + y) * 1.4) * 0.08);
        }
      }

      const pointsGeometry = new THREE.BufferGeometry();
      pointsGeometry.setAttribute("position", new THREE.Float32BufferAttribute(pointPositions, 3));
      const pointsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        opacity: 0.34,
        size: 0.018,
        transparent: true,
      });
      const points = new THREE.Points(pointsGeometry, pointsMaterial);
      group.add(points);

      const resize = () => {
        if (disposed || contextLost) {
          return;
        }

        const rect = canvasRef.current?.parentElement?.getBoundingClientRect();
        const width = Math.max(320, Math.floor(rect?.width ?? window.innerWidth));
        const height = Math.max(360, Math.floor(rect?.height ?? window.innerHeight));
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };

      const startedAt = performance.now();
      const render = () => {
        if (disposed || contextLost) {
          return;
        }

        const time = (performance.now() - startedAt) / 1000;
        group.rotation.y = Math.sin(time * 0.28) * 0.08;
        group.rotation.x = -0.05 + Math.sin(time * 0.18) * 0.035;
        points.rotation.z = time * 0.035;
        meshes.forEach((mesh, index) => {
          mesh.position.z += Math.sin(time * 0.58 + index) * 0.0008;
          mesh.rotation.z += Math.sin(time * 0.34 + index * 0.7) * 0.0007;
        });
        try {
          renderer.render(scene, camera);
        } catch {
          contextLost = true;
          stopAnimation();
          return;
        }
        animationFrame = window.requestAnimationFrame(render);
      };

      void currentVideo.play().catch(() => {
        // Muted inline video feeds the projection when autoplay is available.
      });

      resize();
      render();
      window.addEventListener("resize", resize);

      cleanup = () => {
        disposed = true;
        window.removeEventListener("resize", resize);
        currentCanvas.removeEventListener("webglcontextlost", handleContextLost, { capture: true });
        currentCanvas.removeEventListener("webglcontextrestored", handleContextRestored, { capture: true });
        stopAnimation();
        texture.dispose();
        meshes.forEach((mesh) => {
          mesh.geometry.dispose();
          const material = mesh.material;
          if (Array.isArray(material)) {
            material.forEach((item) => item.dispose());
          } else {
            material.dispose();
          }
        });
        panelGeometry.dispose();
        wire.geometry.dispose();
        wireMaterial.dispose();
        pointsGeometry.dispose();
        pointsMaterial.dispose();
        renderer.dispose();
      };
    };

    void setup();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [canvasRef, reducedMotion, videoRef]);
}

function useGsapCinematics(rootRef: RefObject<HTMLDivElement | null>, reducedMotion: boolean) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion) {
      return;
    }

    let cleanup: (() => void) | undefined;
    let disposed = false;

    const setup = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (disposed) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      const context = gsap.context(() => {
        const mm = gsap.matchMedia();
        mm.add(
          {
            isDesktop: "(min-width: 900px)",
            reduceMotion: "(prefers-reduced-motion: reduce)",
          },
          (mediaContext) => {
            const conditions = mediaContext.conditions as { isDesktop?: boolean; reduceMotion?: boolean } | undefined;
            if (conditions?.reduceMotion) {
              return;
            }

            const isDesktop = Boolean(conditions?.isDesktop);

            const hero = root.querySelector<HTMLElement>(".conlyra-hero");
            const heroVideo = hero?.querySelector<HTMLElement>(".conlyra-hero-video");
            const heroVideoAsset = hero?.querySelector<HTMLElement>(".conlyra-hero-video video");
            const heroCopy = hero?.querySelector<HTMLElement>(".conlyra-hero-copy");
            const heroPill = hero?.querySelector<HTMLElement>(".conlyra-pill");
            const heroTitle = hero?.querySelector<HTMLElement>(".conlyra-hero-title");
            const heroSubline = hero?.querySelector<HTMLElement>(".conlyra-hero-subline");
            const heroActions = hero?.querySelector<HTMLElement>(".conlyra-actions");
            const heroAura = hero?.querySelector<HTMLElement>(".conlyra-hero-aura");
            const heroLateTargets = [heroPill, heroSubline, heroActions].filter((item): item is HTMLElement => Boolean(item));

            if (hero && heroVideo && heroVideoAsset && heroCopy && heroTitle) {
              const setHeroProgress = (progress: number) => {
                const bridgeProgress = Math.min(1, Math.max(0, (progress - 0.78) / 0.22));
                hero.style.setProperty("--hero-sequence-progress", progress.toFixed(4));
                hero.style.setProperty("--hero-bridge-opacity", bridgeProgress.toFixed(4));
              };

              setHeroProgress(0);

              gsap.set(heroVideoAsset, {
                scale: isDesktop ? 1.04 : 1.025,
                filter: "grayscale(1) contrast(1.08) brightness(0.78)",
                transformOrigin: "50% 50%",
              });

              gsap.set([heroVideo, heroVideoAsset, heroCopy, heroTitle], {
                willChange: "transform, opacity, filter",
              });

              const heroTimeline = gsap.timeline({
                defaults: { ease: "none" },
                scrollTrigger: {
                  trigger: hero,
                  start: "top top",
                  end: () => `+=${Math.round(window.innerHeight * (isDesktop ? 1.85 : 0.95))}`,
                  pin: true,
                  pinSpacing: true,
                  scrub: isDesktop ? 0.72 : 0.42,
                  anticipatePin: 1,
                  invalidateOnRefresh: true,
                  onRefresh: (self) => setHeroProgress(self.progress),
                  onUpdate: (self) => setHeroProgress(self.progress),
                },
              });

              heroTimeline
                .to({}, { duration: 0.15 })
                .to(
                  heroVideoAsset,
                  {
                    scale: isDesktop ? 1.032 : 1.018,
                    filter: "grayscale(1) contrast(1.1) brightness(0.76)",
                    duration: 0.3,
                    ease: "power2.out",
                  },
                  0.15,
                )
                .to(heroVideo, { yPercent: isDesktop ? 2.8 : 1.4, duration: 0.3, ease: "power2.out" }, 0.15)
                .to(heroCopy, { y: isDesktop ? -10 : -5, duration: 0.3, ease: "power2.out" }, 0.15)
                .to(
                  heroVideoAsset,
                  {
                    scale: 1.01,
                    filter: "grayscale(1) contrast(1.16) brightness(0.66)",
                    duration: 0.3,
                    ease: "power2.inOut",
                  },
                  0.45,
                )
                .to(heroVideo, { yPercent: isDesktop ? 7.2 : 3.2, opacity: 0.74, duration: 0.3 }, 0.45)
                .to(heroTitle, { y: isDesktop ? -14 : -7, scale: isDesktop ? 0.985 : 1, duration: 0.3 }, 0.45)
                .to(heroLateTargets, { opacity: 0.42, y: isDesktop ? -20 : -10, duration: 0.17 }, 0.75)
                .to(heroTitle, { y: isDesktop ? -34 : -15, scale: isDesktop ? 0.955 : 0.982, duration: 0.17 }, 0.75)
                .to(heroVideo, { opacity: 0.52, yPercent: isDesktop ? 10 : 5, duration: 0.17 }, 0.75)
                .to(heroVideoAsset, { filter: "grayscale(1) contrast(1.22) brightness(0.54)", duration: 0.17 }, 0.75)
                .to(heroCopy, { opacity: isDesktop ? 0.82 : 0.9, duration: 0.08 }, 0.92)
                .to(heroVideo, { opacity: 0.42, yPercent: isDesktop ? 12 : 5.5, duration: 0.08 }, 0.92);

              if (heroAura) {
                heroTimeline.to(heroAura, { opacity: 0.72, duration: 0.3 }, 0.45);
              }

              if (heroSubline) {
                heroTimeline.to(heroSubline, { color: "rgba(255,255,255,0.86)", y: isDesktop ? -6 : -3, duration: 0.3 }, 0.45);
              }

              if (heroActions) {
                heroTimeline.to(heroActions, { y: isDesktop ? -8 : -4, duration: 0.3 }, 0.45);
              }
            }

            gsap.utils.toArray<HTMLElement>("[data-conlyra-wave]").forEach((section) => {
              const words = gsap.utils.toArray<HTMLElement>("[data-conlyra-wave-word]", section);

              gsap.fromTo(
                words,
                { opacity: 0.38, y: 18, filter: "blur(5px)" },
                {
                  opacity: 1,
                  y: (index) => Math.sin(index * 0.82) * -10,
                  filter: "blur(0px)",
                  stagger: 0.025,
                  ease: "sine.inOut",
                  scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "top 34%",
                    scrub: 0.9,
                  },
                },
              );

              gsap.to(words, {
                y: (index) => Math.sin(index * 0.9 + 1.4) * 14,
                ease: "none",
                scrollTrigger: {
                  trigger: section,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              });
            });

            gsap.utils.toArray<HTMLElement>("[data-conlyra-type-fill]").forEach((section) => {
              const words = gsap.utils.toArray<HTMLElement>("[data-conlyra-type-word]", section);

              if (!words.length) {
                return;
              }

              ScrollTrigger.create({
                trigger: section,
                start: isDesktop ? "top 46%" : "top 64%",
                end: isDesktop ? "bottom 42%" : "bottom 54%",
                scrub: isDesktop ? 0.8 : 0.45,
                onUpdate: (self) => {
                  const total = words.length;

                  words.forEach((word, index) => {
                    const localProgress = Math.min(
                      1,
                      Math.max(0, self.progress * (total + 0.65) - index + 0.02),
                    );
                    word.style.setProperty("--word-fill", `${Math.round(localProgress * 100)}%`);
                    word.classList.toggle("is-filled", localProgress >= 0.92);
                  });
                },
              });
            });

            gsap.utils.toArray<HTMLElement>("[data-conlyra-offer]").forEach((section) => {
              const cards = gsap.utils.toArray<HTMLElement>("[data-conlyra-offer-card]", section);
              const nodes = gsap.utils.toArray<HTMLElement>("[data-conlyra-offer-node]", section);
              const status = section.querySelector<HTMLElement>("[data-conlyra-offer-status]");
              const progress = section.querySelector<HTMLElement>("[data-conlyra-offer-progress]");

              if (!cards.length) {
                return;
              }

              const setOffer = (value: number) => {
                const activeIndex = Math.round(value * (cards.length - 1));
                section.style.setProperty("--offer-progress", value.toFixed(4));

                cards.forEach((card, index) => {
                  card.classList.toggle("is-active", index === activeIndex);
                  card.classList.toggle("is-before", index < activeIndex);
                  card.classList.toggle("is-after", index > activeIndex);
                });

                nodes.forEach((node, index) => {
                  node.classList.toggle("is-active", index === activeIndex);
                  node.classList.toggle("is-complete", index < activeIndex);
                });

                if (status && cards[activeIndex]?.dataset.conlyraOfferStatus) {
                  status.textContent = cards[activeIndex].dataset.conlyraOfferStatus ?? "";
                }

                if (progress) {
                  progress.style.transform = `scaleX(${value})`;
                }
              };

              setOffer(0);

              ScrollTrigger.create({
                trigger: section,
                start: isDesktop ? "top top" : "top 76%",
                end: "bottom bottom",
                scrub: 0.55,
                onUpdate: (self) => setOffer(self.progress),
              });
            });

            gsap.utils
              .toArray<HTMLElement>(
                ".conlyra-film-frame[data-conlyra-film], .conlyra-video-panel[data-conlyra-film], .conlyra-use-media[data-conlyra-film]",
              )
              .forEach((element, index) => {
                gsap.fromTo(
                  element,
                  {
                    clipPath: "inset(18% 0% 18% 0%)",
                    y: isDesktop ? 70 : 28,
                    scale: 1.04,
                  },
                  {
                    clipPath: "inset(0% 0% 0% 0%)",
                    y: 0,
                    scale: 1,
                    duration: 1.1,
                    ease: "power3.out",
                    delay: index * 0.04,
                    scrollTrigger: {
                      trigger: element,
                      start: "top 86%",
                      end: "bottom 56%",
                      scrub: isDesktop ? 0.8 : false,
                    },
                  },
                );
              });

            gsap.utils.toArray<HTMLElement>(".conlyra-section").forEach((section) => {
              const header = section.querySelector<HTMLElement>(".conlyra-section-header");
              if (header) {
                gsap.to(header, {
                  y: isDesktop ? -22 : -10,
                  ease: "none",
                  scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                  },
                });
              }
            });

            gsap.utils.toArray<HTMLElement>(".conlyra-video-panel").forEach((panel, index) => {
              gsap.to(panel, {
                yPercent: index % 2 === 0 ? -8 : 8,
                ease: "none",
                scrollTrigger: {
                  trigger: panel,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              });
            });

            gsap.utils.toArray<HTMLElement>(".conlyra-fullscreen-film").forEach((chapter) => {
              const video = chapter.querySelector("video");
              const metaLine = chapter.querySelector(".conlyra-fullscreen-film-meta i");

              if (video) {
                gsap.fromTo(
                  video,
                  { scale: 1.16, yPercent: -5 },
                  {
                    scale: 1.03,
                    yPercent: 5,
                    ease: "none",
                    scrollTrigger: {
                      trigger: chapter,
                      start: "top bottom",
                      end: "bottom top",
                      scrub: true,
                    },
                  },
                );
              }

              if (metaLine) {
                gsap.fromTo(
                  metaLine,
                  { scaleX: 0.12, transformOrigin: "left center" },
                  {
                    scaleX: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                      trigger: chapter,
                      start: "top 60%",
                      end: "top 20%",
                      scrub: 0.7,
                    },
                  },
                );
              }
            });

            gsap.utils.toArray<HTMLElement>("[data-conlyra-director]").forEach((section) => {
              const stage = section.querySelector<HTMLElement>(".conlyra-pinned-director-stage");
              const video = section.querySelector<HTMLVideoElement>("[data-conlyra-director-video]");
              const ghostVideo = section.querySelector<HTMLElement>(".conlyra-pinned-director-ghost");
              const cards = gsap.utils.toArray<HTMLElement>(".conlyra-director-card", section);
              const bars = gsap.utils.toArray<HTMLElement>(".conlyra-director-timeline i", section);

              if (stage) {
                ScrollTrigger.create({
                  trigger: section,
                  start: "top top",
                  end: "bottom bottom",
                  pin: stage,
                  pinSpacing: false,
                  anticipatePin: 1,
                  invalidateOnRefresh: true,
                  onUpdate: (self) => section.style.setProperty("--director-progress", self.progress.toFixed(4)),
                });
              }

              if (video) {
                const createDirectorScrub = () => {
                  const duration = video.duration && Number.isFinite(video.duration) ? video.duration : 1;
                  const startAt = duration * 0.1;
                  const endAt = duration * 0.86;
                  video.pause();
                  video.currentTime = startAt;
                  ScrollTrigger.create({
                    trigger: section,
                    start: "top 82%",
                    end: "bottom bottom",
                    scrub: true,
                    onUpdate: (self) => {
                      video.currentTime = Math.min(endAt, Math.max(startAt, startAt + self.progress * (endAt - startAt)));
                    },
                  });
                };

                if (video.readyState >= 1) {
                  createDirectorScrub();
                } else {
                  video.addEventListener("loadedmetadata", createDirectorScrub, { once: true });
                }
              }

              if (ghostVideo) {
                gsap.to(ghostVideo, {
                  opacity: 0.34,
                  scale: 1.18,
                  ease: "none",
                  scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                  },
                });
              }

              if (cards.length) {
                const directorTimeline = gsap.timeline({
                  scrollTrigger: {
                    trigger: section,
                    start: "top 78%",
                    end: "bottom bottom",
                    scrub: true,
                  },
                });

                gsap.set(cards, { opacity: 0.24, y: 26 });
                gsap.set(bars, { scaleX: 0.18, transformOrigin: "left center" });
                cards.forEach((card, index) => {
                  directorTimeline.to(card, { opacity: 1, y: 0, duration: 0.22, ease: "power2.out" }, index * 0.24);
                  directorTimeline.to(bars[index], { scaleX: 1, duration: 0.18, ease: "power2.out" }, index * 0.24);
                  if (index > 0) {
                    directorTimeline.to(cards[index - 1], { opacity: 0.34, y: -10, duration: 0.16, ease: "power2.out" }, index * 0.24);
                  }
                });
              }
            });

            gsap.utils.toArray<HTMLElement>("[data-conlyra-scroll-story]").forEach((story) => {
              const sticky = story.querySelector<HTMLElement>(".conlyra-scroll-story-sticky");
              const scrubVideo = story.querySelector<HTMLVideoElement>("[data-conlyra-scrub-video]");
              const blendVideo = story.querySelector<HTMLElement>(".conlyra-scroll-story-blend");
              const progress = story.querySelector<HTMLElement>(".conlyra-scroll-story-progress i");
              const steps = gsap.utils.toArray<HTMLElement>(".conlyra-scroll-story-step", story);

              if (sticky) {
                ScrollTrigger.create({
                  trigger: story,
                  start: "top top",
                  end: "bottom bottom",
                  pin: sticky,
                  pinSpacing: false,
                  anticipatePin: 1,
                  invalidateOnRefresh: true,
                });
              }

              const createScrub = () => {
                const duration = scrubVideo?.duration && Number.isFinite(scrubVideo.duration) ? scrubVideo.duration : 1;
                const scrubStart = duration * 0.14;
                const scrubEnd = duration * 0.82;
                if (scrubVideo) {
                  scrubVideo.pause();
                  scrubVideo.currentTime = scrubStart;
                }

                ScrollTrigger.create({
                  trigger: story,
                  start: "top 72%",
                  end: "bottom bottom",
                  scrub: true,
                  onUpdate: (self) => {
                    root.style.setProperty("--story-progress", self.progress.toFixed(4));
                    if (scrubVideo && duration > 0) {
                      scrubVideo.currentTime = Math.min(scrubEnd, Math.max(scrubStart, scrubStart + self.progress * (scrubEnd - scrubStart)));
                    }
                  },
                });
              };

              if (scrubVideo) {
                if (scrubVideo.readyState >= 1) {
                  createScrub();
                } else {
                  scrubVideo.addEventListener("loadedmetadata", createScrub, { once: true });
                }
              }

              if (blendVideo) {
                gsap.to(blendVideo, {
                  opacity: 0.28,
                  scale: 1.22,
                  ease: "none",
                  scrollTrigger: {
                    trigger: story,
                    start: "top 72%",
                    end: "bottom bottom",
                    scrub: true,
                  },
                });
              }

              if (progress) {
                gsap.fromTo(
                  progress,
                  { scaleX: 0, transformOrigin: "left center" },
                  {
                    scaleX: 1,
                    ease: "none",
                    scrollTrigger: {
                      trigger: story,
                      start: "top 72%",
                      end: "bottom bottom",
                      scrub: true,
                    },
                  },
                );
              }

              if (steps.length) {
                const timeline = gsap.timeline({
                  scrollTrigger: {
                    trigger: story,
                    start: "top 72%",
                    end: "bottom bottom",
                    scrub: true,
                  },
                });

                gsap.set(steps, { opacity: 0.26, y: 18 });
                steps.forEach((step, index) => {
                  timeline.to(step, { opacity: 1, y: 0, duration: 0.32, ease: "power2.out" }, index * 0.24);
                  if (index > 0) {
                    timeline.to(steps[index - 1], { opacity: 0.3, y: -10, duration: 0.28, ease: "power2.out" }, index * 0.24);
                  }
                });
              }
            });

            gsap.utils.toArray<HTMLElement>("[data-conlyra-type-mask]").forEach((section) => {
              const lines = gsap.utils.toArray<HTMLElement>(".conlyra-type-mask-line", section);
              const wordmark = section.querySelector<HTMLElement>(".conlyra-type-mask-word span");
              const scrollTrigger = {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              };

              gsap.to(section, {
                "--type-mask-progress": 1,
                ease: "none",
                scrollTrigger,
              });

              lines.forEach((line, index) => {
                const direction = index % 2 === 0 ? -1 : 1;
                const word = line.querySelector<HTMLElement>("span");
                const video = line.querySelector<HTMLElement>("video");

                gsap.fromTo(
                  line,
                  { xPercent: direction * 7 },
                  {
                    xPercent: direction * -7,
                    ease: "none",
                    scrollTrigger,
                  },
                );

                if (word) {
                  gsap.fromTo(
                    word,
                    { xPercent: direction * -4, opacity: 0.78 },
                    {
                      xPercent: direction * 4,
                      opacity: 1,
                      ease: "none",
                      scrollTrigger,
                    },
                  );
                }

                if (video) {
                  gsap.fromTo(
                    video,
                    { xPercent: direction * -3, scale: 1.18 },
                    {
                      xPercent: direction * 3,
                      scale: 1.08,
                      ease: "none",
                      scrollTrigger,
                    },
                  );
                }
              });

              if (wordmark) {
                gsap.fromTo(
                  wordmark,
                  { yPercent: 14, scale: 1.06 },
                  {
                    yPercent: -10,
                    scale: 1,
                    ease: "none",
                    scrollTrigger,
                  },
                );
              }
            });

            gsap.to(".conlyra-product-window", {
              "--product-depth": 1,
              scrollTrigger: {
                trigger: ".conlyra-product-window",
                start: "top 78%",
                end: "bottom 35%",
                scrub: true,
              },
            });

            gsap.utils.toArray<HTMLElement>("[data-conlyra-command]").forEach((section) => {
              const nodes = gsap.utils.toArray<HTMLElement>(".conlyra-command-node", section);
              const logs = gsap.utils.toArray<HTMLElement>(".conlyra-command-log", section);

              gsap.to(section, {
                "--command-progress": 1,
                ease: "none",
                scrollTrigger: {
                  trigger: section,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              });

              gsap.fromTo(
                nodes,
                { opacity: 0.38, scale: 0.94, y: 22 },
                {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  stagger: 0.08,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: section,
                    start: "top 68%",
                    end: "center 38%",
                    scrub: 0.8,
                  },
                },
              );

              gsap.fromTo(
                logs,
                { opacity: 0.22, x: -18 },
                {
                  opacity: 1,
                  x: 0,
                  stagger: 0.06,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: section,
                    start: "top 58%",
                    end: "bottom 72%",
                    scrub: 0.7,
                  },
                },
              );
            });

            gsap.utils.toArray<HTMLElement>("[data-conlyra-projection]").forEach((section) => {
              gsap.to(section, {
                "--projection-progress": 1,
                ease: "none",
                scrollTrigger: {
                  trigger: section,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              });

              gsap.fromTo(
                section.querySelector(".conlyra-projection-copy"),
                { y: 64, opacity: 0.2 },
                {
                  y: 0,
                  opacity: 1,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: section,
                    start: "top 66%",
                    end: "top 20%",
                    scrub: 0.8,
                  },
                },
              );
            });

            gsap.utils.toArray<HTMLElement>("[data-conlyra-footer]").forEach((footer) => {
              const logo = footer.querySelector(".conlyra-footer-mark");
              const headline = footer.querySelector(".conlyra-footer-subscribe-copy h2");
              const wordmark = footer.querySelector(".conlyra-final-wordmark");
              const navItems = gsap.utils.toArray<HTMLElement>(".conlyra-final-column, .conlyra-final-bottom", footer);

              gsap.to(footer, {
                "--footer-progress": 1,
                ease: "none",
                scrollTrigger: {
                  trigger: footer,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              });

              gsap.fromTo(
                [logo, headline].filter(Boolean),
                { opacity: 0, y: 34, filter: "blur(10px)" },
                {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  stagger: 0.08,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: footer,
                    start: "top 72%",
                    end: "top 28%",
                    scrub: 0.9,
                  },
                },
              );

              if (wordmark) {
                gsap.fromTo(
                  wordmark,
                  { opacity: 0.08, yPercent: 20, scale: 1.06 },
                  {
                    opacity: 1,
                    yPercent: 0,
                    scale: 1,
                    ease: "none",
                    scrollTrigger: {
                      trigger: footer,
                      start: "top 88%",
                      end: "bottom bottom",
                      scrub: true,
                    },
                  },
                );
              }

              if (navItems.length) {
                gsap.fromTo(
                  navItems,
                  { opacity: 0, y: 22 },
                  {
                    opacity: 1,
                    y: 0,
                    stagger: 0.05,
                    ease: "power2.out",
                    scrollTrigger: {
                      trigger: footer,
                      start: "center 84%",
                      end: "center 46%",
                      scrub: 0.8,
                    },
                  },
                );
              }
            });
          },
        );

        cleanup = () => mm.revert();
      }, root);

      const previousCleanup = cleanup;
      cleanup = () => {
        previousCleanup?.();
        context.revert();
      };
    };

    void setup();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [reducedMotion, rootRef]);
}

function ArrowIcon() {
  return (
    <svg className="conlyra-btn-icon" aria-hidden="true" viewBox="0 0 18 18">
      <path d="M3.5 9h10M10 5l4 4-4 4" />
    </svg>
  );
}

function LineIcon({ index }: { index: number }) {
  const paths = [
    "M5 12h14M12 5v14",
    "M6 8l6 8 6-8",
    "M5 15c4-6 10-6 14 0",
    "M5 12h4l3-5 3 10 3-5h1",
  ];

  return (
    <svg className="conlyra-line-icon" aria-hidden="true" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="8" />
      <path d={paths[index % paths.length]} />
    </svg>
  );
}

function LogoMark({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <span className={`conlyra-logo-mark${className ? ` ${className}` : ""}`} aria-hidden="true">
      <Image src="/conlyra-logo.svg" alt="" width={641} height={529} priority={priority} unoptimized />
    </span>
  );
}

function FilmFrame({
  src,
  label,
  title,
  className = "",
  priority = false,
}: {
  src: string;
  label: string;
  title: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <figure
      className={`conlyra-film-frame${className ? ` ${className}` : ""}`}
      data-conlyra-card
      data-conlyra-film
    >
      <video autoPlay loop muted playsInline preload={priority ? "auto" : "none"} aria-label={title}>
        <source src={src} type="video/mp4" />
      </video>
      <figcaption>
        <span>{label}</span>
        <strong>{title}</strong>
      </figcaption>
    </figure>
  );
}

function Header({
  activeSection,
  isMenuOpen,
  onMenuToggle,
  progress,
}: {
  activeSection: string;
  isMenuOpen: boolean;
  onMenuToggle: () => void;
  progress: number;
}) {
  return (
    <header
      className={`conlyra-header${progress > 0.018 ? " is-scrolled" : ""}`}
      style={{ "--conlyra-progress": progress } as CSSProperties}
    >
      <a className="conlyra-logo" href="#top" aria-label="CONLYRA Startseite">
        <LogoMark priority />
        <strong>CONLYRA</strong>
      </a>

      <nav className="conlyra-header-nav" aria-label="Hauptnavigation">
        {navLinks.map(([label, href]) => {
          const id = href.replace("#", "");
          return (
            <a className={activeSection === id ? "is-active" : ""} href={href} key={href}>
              {label}
            </a>
          );
        })}
      </nav>

      <a className="conlyra-btn conlyra-btn-primary conlyra-btn-shine conlyra-header-cta" href="#contact">
        <span>Demo</span>
        <ArrowIcon />
      </a>

      <button
        className="conlyra-menu-toggle"
        type="button"
        aria-label={isMenuOpen ? "Menue schliessen" : "Menue oeffnen"}
        aria-controls="conlyra-menu"
        aria-expanded={isMenuOpen}
        onClick={onMenuToggle}
      >
        <span />
        <span />
      </button>
      <i className="conlyra-header-progress" aria-hidden="true" />
    </header>
  );
}

function MenuOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const quickLinks = navLinks.slice(0, 6);
  const secondaryLinks = [
    ["Datenschutz", "mailto:hello@conlyra.ai?subject=Datenschutz"],
    ["Impressum", "mailto:hello@conlyra.ai?subject=Impressum"],
    ["Pilot anfragen", "#contact"],
    ["Workflow-Check", "#workflow-lab"],
  ];

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) {
      return;
    }

    const videos = Array.from(menu.querySelectorAll<HTMLVideoElement>("video"));

    if (!isOpen) {
      videos.forEach((video) => video.pause());
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      videos.forEach((video) => {
        video.load();
        void video.play().catch(() => undefined);
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isOpen]);

  return (
    <div
      ref={menuRef}
      id="conlyra-menu"
      className={`conlyra-menu${isOpen ? " is-open" : ""}`}
      aria-hidden={!isOpen}
      inert={!isOpen}
      role="dialog"
      aria-modal="true"
    >
      <div className="conlyra-menu-shell">
        <section className="conlyra-menu-visual" aria-label="CONLYRA Navigationsfenster">
          <video autoPlay loop muted playsInline preload="metadata" aria-hidden="true">
            <source src="/media/AdobeStock_1499424979.mp4" type="video/mp4" />
          </video>
          <a className="conlyra-logo" href="#top" onClick={onClose} aria-label="CONLYRA Startseite">
            <LogoMark />
            <strong>CONLYRA</strong>
          </a>
          <div>
            <span>CONLYRA 2026</span>
            <h2>Deploy private AI agents across the work that slows teams down.</h2>
          </div>
          <small>Agents / Workflows / Trust Layer</small>
        </section>

        <section className="conlyra-menu-link-panel">
          <button className="conlyra-menu-close" type="button" aria-label="Menue schliessen" onClick={onClose}>
            <span />
            <span />
          </button>
          <nav aria-label="Quick Links">
            <span>Quick Links</span>
            {quickLinks.map(([label, href]) => (
              <a href={href} key={href} onClick={onClose}>
                {label}
                <ArrowIcon />
              </a>
            ))}
          </nav>
          <nav aria-label="Weitere Links">
            <span>Other Links</span>
            {secondaryLinks.map(([label, href]) => (
              <a href={href} key={href} onClick={onClose}>
                {label}
                <ArrowIcon />
              </a>
            ))}
          </nav>
        </section>

        <section className="conlyra-menu-media" aria-label="Systemvorschau">
          <video autoPlay loop muted playsInline preload="metadata" aria-hidden="true">
            <source src="/media/AdobeStock_444039087.mp4" type="video/mp4" />
          </video>
          <div>
            <span>Live Preview</span>
            <strong>Control agents in production</strong>
          </div>
          <small>Jul 6, 2026</small>
        </section>
      </div>
    </div>
  );
}

function TrustWaveSection() {
  const words = trustWaveText.split(" ");

  return (
    <section className="conlyra-trust-wave" id="trust" aria-labelledby="trust-wave-title" data-conlyra-wave>
      <div className="conlyra-container">
        <p className="conlyra-kicker" data-conlyra-reveal>
          Trust first
        </p>
        <h2 id="trust-wave-title" aria-label={trustWaveText}>
          {words.map((word, index) => (
            <span
              aria-hidden="true"
              data-conlyra-wave-word
              key={`${word}-${index}`}
              style={{ "--word-index": index } as CSSProperties}
            >
              {word}
            </span>
          ))}
        </h2>
        <div className="conlyra-trust-proof" aria-label="Vertrauensmetriken">
          {[
            ["100%", "sichtbare Gates"],
            ["0", "Blackbox-Aktionen"],
            ["24/7", "Audit-Logs"],
          ].map(([value, label]) => (
            <article key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroSection() {
  return (
    <section className="conlyra-hero" id="top" aria-labelledby="hero-title">
      <div className="conlyra-hero-video" data-conlyra-film aria-hidden="true">
        <video autoPlay loop muted playsInline preload="auto">
          <source src={filmReels.hero} type="video/mp4" />
        </video>
        <span />
      </div>
      <div className="conlyra-hero-aura" aria-hidden="true" />
      <div className="conlyra-container conlyra-hero-grid">
        <div className="conlyra-hero-copy">
          <p className="conlyra-pill" data-conlyra-reveal>
            PRIVATE KI-AGENTEN / WORKFLOW OS
          </p>
          <h1
            id="hero-title"
            className="conlyra-kinetic-heading conlyra-hero-title"
            data-conlyra-reveal="text"
            aria-label="KI-Agenten einsetzen. Prozesse skalieren."
          >
            {["KI-Agenten einsetzen.", "Prozesse skalieren."].map((line, index) => (
              <Fragment key={line}>
                <span
                  className="conlyra-heading-line"
                  aria-hidden="true"
                  data-conlyra-line
                  style={{ "--line-index": index, "--line-delay": `${index * 95}ms` } as CSSProperties}
                >
                  <KineticWords text={line} />
                </span>
                {index === 0 ? " " : null}
              </Fragment>
            ))}
          </h1>
          <p className="conlyra-hero-subline" data-conlyra-reveal data-conlyra-delay="110">
            CONLYRA verbindet Daten, Tools und Teams zu kontrollierten Workflows mit messbarem Output.
          </p>
          <div className="conlyra-actions" data-conlyra-reveal data-conlyra-delay="190">
            <a className="conlyra-btn conlyra-btn-primary conlyra-btn-shine" href="#contact">
              <span>Demo starten</span>
              <ArrowIcon />
            </a>
            <a className="conlyra-btn conlyra-btn-secondary conlyra-btn-shine" href="#platform">
              <span>Produkt ansehen</span>
              <ArrowIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ManifestoTypeSection() {
  return (
    <section
      className="conlyra-type-manifesto"
      id="manifesto"
      data-conlyra-type-fill
      aria-labelledby="manifesto-title"
    >
      <div className="conlyra-container conlyra-type-manifesto-inner">
        <div className="conlyra-type-badges" aria-label="CONLYRA Engines">
          {conlyraEngineBadges.map((badge) => (
            <span key={badge}>{badge}</span>
          ))}
        </div>

        <h2 id="manifesto-title" className="conlyra-type-fill-headline">
          {conlyraManifestoWords.map((word, index) => (
            <Fragment key={`${word}-${index}`}>
              <span
                data-conlyra-type-word
                style={{ "--word-fill": "0%" } as CSSProperties}
              >
                {word}
              </span>
              {index < conlyraManifestoWords.length - 1 ? " " : null}
            </Fragment>
          ))}
        </h2>

        <p className="conlyra-type-manifesto-copy">
          Schnelle KI-Workflows, privater Kontext und produktionsreife
          Guardrails fuer Unternehmen, die Automation nicht testen, sondern
          fuehren wollen.
        </p>
      </div>
    </section>
  );
}

function ServiceOfferSection() {
  const firstOffer = serviceOffers[0];

  return (
    <section
      className="conlyra-offer-command"
      id="services"
      data-conlyra-offer
      aria-labelledby="services-title"
    >
      <div className="conlyra-offer-pin">
        <div className="conlyra-container conlyra-offer-layout">
          <div className="conlyra-offer-copy" data-conlyra-reveal>
            <p className="conlyra-kicker">Leistungen</p>
            <h2 id="services-title">
              Das KI-Betriebssystem, das operative Arbeit spuerbar schneller
              macht.
            </h2>
            <p>
              Wir verkaufen keine generische Automation. Wir bauen die
              Ausfuehrungsschicht, die private Daten, Agenten, Tools und
              menschliche Kontrolle zu einem echten operativen Vorteil
              verbindet.
            </p>
          </div>

          <div className="conlyra-offer-stage" data-conlyra-reveal data-conlyra-card>
            <div className="conlyra-offer-topbar">
              <span>CONLYRA / LEISTUNGEN</span>
              <strong data-conlyra-offer-status>{firstOffer.proof}</strong>
            </div>

            <div className="conlyra-offer-orbit" aria-hidden="true">
              {serviceOffers.map((offer, index) => (
                <span
                  key={offer.step}
                  className={index === 0 ? "is-active" : undefined}
                  data-conlyra-offer-node
                >
                  {offer.step}
                </span>
              ))}
            </div>

            <div className="conlyra-offer-cards">
              {serviceOffers.map((offer, index) => (
                <article
                  key={offer.step}
                  className={index === 0 ? "is-active" : undefined}
                  data-conlyra-offer-card
                  data-conlyra-offer-title={offer.title}
                  data-conlyra-offer-status={offer.proof}
                  style={{ "--offer-index": index } as CSSProperties}
                >
                  <span>{offer.step}</span>
                  <p className="conlyra-kicker">{offer.label}</p>
                  <h3>{offer.title}</h3>
                  <p>{offer.copy}</p>
                  <strong>{offer.proof}</strong>
                </article>
              ))}
            </div>

            <div className="conlyra-offer-progress" aria-hidden="true">
              <span data-conlyra-offer-progress />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OutcomeProofSection() {
  return (
    <section className="conlyra-outcome-strip" aria-label="CONLYRA Business Outcomes">
      <div className="conlyra-container conlyra-outcome-grid">
        <div className="conlyra-outcome-intro" data-conlyra-reveal>
          <p className="conlyra-kicker">Product-led AI Automation</p>
          <h2>Vom Pilot zum produktiven Workflow.</h2>
          <p>
            Nicht noch ein Chatbot. CONLYRA baut private Agents, die echte Arbeit steuern, freigeben und messen.
          </p>
        </div>

        <div className="conlyra-outcome-metrics" aria-label="Outcome Metriken">
          {outcomeProofs.map(([value, label, copy], index) => (
            <article data-conlyra-card data-conlyra-reveal data-conlyra-delay={index * 70} key={label}>
              <span>{value}</span>
              <strong>{label}</strong>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="conlyra-container conlyra-pillar-grid">
        {salesPillars.map((pillar, index) => (
          <article data-conlyra-reveal data-conlyra-delay={index * 80} key={pillar.title}>
            <span>{pillar.label}</span>
            <h3>{pillar.title}</h3>
            <p>{pillar.copy}</p>
          </article>
        ))}
      </div>

      <div className="conlyra-container conlyra-logo-proof" aria-label="Enterprise Logos">
        <span>Trusted workflow patterns for teams inspired by</span>
        <div>
          {customerLogos.slice(0, 6).map((logo) => (
            <strong key={logo}>{logo}</strong>
          ))}
        </div>
      </div>
    </section>
  );
}

function SignalBloomSection() {
  return (
    <section className="conlyra-signal-bloom" aria-labelledby="signal-bloom-title">
      <div className="conlyra-signal-bloom-video" data-conlyra-film aria-hidden="true">
        <video autoPlay loop muted playsInline preload="none">
          <source src={filmReels.blend} type="video/mp4" />
        </video>
      </div>
      <div className="conlyra-container conlyra-signal-bloom-grid">
        <div className="conlyra-signal-bloom-copy" data-conlyra-reveal>
          <p className="conlyra-kicker">Live Signal</p>
          <h2 id="signal-bloom-title">Signal rein. Aktion raus.</h2>
          <p>
            CONLYRA macht aus Kontext einen klaren, freigegebenen naechsten Schritt.
          </p>
        </div>

        <div className="conlyra-signal-bloom-stage" data-conlyra-card data-conlyra-reveal data-conlyra-delay="120">
          <div className="conlyra-bloom-core" aria-hidden="true">
            <LogoMark className="is-signal" />
            <i />
            <i />
            <i />
          </div>
          <svg className="conlyra-bloom-lines" viewBox="0 0 760 420" aria-hidden="true">
            <path d="M94 90 C206 90 214 196 326 196 H380" />
            <path d="M380 196 H438 C540 196 548 90 666 90" />
            <path d="M380 224 C302 274 238 336 118 336" />
            <path d="M430 224 C506 276 576 336 660 336" />
          </svg>
          {signalBloomSteps.map(([number, title, copy], index) => (
            <article className={`conlyra-bloom-node node-${index + 1}`} key={title}>
              <span>{number}</span>
              <strong>{title}</strong>
              <p>{copy}</p>
            </article>
          ))}
          <div className="conlyra-bloom-verdict" aria-label="CONLYRA Entscheidungspfad">
            <span>decision.path</span>
            <strong>Ready for execution</strong>
            <i aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}

function MarqueeStrip() {
  const line = "CONNECT DATA · DEPLOY AGENTS · AUTOMATE WORKFLOWS · MEASURE ROI · SCALE AI ·";
  return (
    <section className="conlyra-marquee" aria-label="CONLYRA Systemleistungen">
      <div className="conlyra-marquee-track">
        {[0, 1, 2].map((item) => (
          <span key={item}>{line}</span>
        ))}
      </div>
    </section>
  );
}

function SystemFilmSection() {
  return (
    <section className="conlyra-section conlyra-system-films" aria-label="CONLYRA cineastische Systemebene">
      <div className="conlyra-container">
        <div className="conlyra-system-film-header">
          <p className="conlyra-kicker" data-conlyra-reveal>
            System View
          </p>
          <h2 data-conlyra-reveal>Jeder Workflow wird sichtbar.</h2>
        </div>
        <div className="conlyra-video-panel-grid">
          {systemFilms.map((film, index) => (
            <article
              className="conlyra-video-panel group relative overflow-hidden transition-transform duration-500 ease-out will-change-transform"
              data-conlyra-card
              data-conlyra-film
              data-conlyra-reveal
              data-conlyra-delay={index * 90}
              key={film.title}
            >
              <video autoPlay loop muted playsInline preload="none" aria-label={film.title}>
                <source src={film.src} type="video/mp4" />
              </video>
              <div className="conlyra-video-panel-copy">
                <span>{film.label}</span>
                <h3>{film.title}</h3>
              </div>
              <i aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FullscreenVideoChapter({ index }: { index: number }) {
  const chapter = fullscreenFilms[index];

  if (!chapter) {
    return null;
  }

  return (
    <section
      className={`conlyra-fullscreen-film is-${chapter.tone}`}
      aria-labelledby={`fullscreen-film-title-${index}`}
      data-conlyra-film
    >
      <video autoPlay loop muted playsInline preload={index === 0 ? "metadata" : "none"} aria-hidden="true">
        <source src={chapter.src} type="video/mp4" />
      </video>
      <div className="conlyra-fullscreen-filter" aria-hidden="true" />
      <div className="conlyra-container conlyra-fullscreen-film-content">
        <p className="conlyra-kicker" data-conlyra-reveal>
          {chapter.eyebrow}
        </p>
        <h2 id={`fullscreen-film-title-${index}`} data-conlyra-reveal>
          {chapter.title}
        </h2>
        <p data-conlyra-reveal data-conlyra-delay="120">
          {chapter.copy}
        </p>
        <div className="conlyra-fullscreen-film-meta" data-conlyra-reveal data-conlyra-delay="190">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <i aria-hidden="true" />
          <strong>CONLYRA / AI OPS</strong>
        </div>
      </div>
    </section>
  );
}

function PinnedVideoDirectorSection() {
  return (
    <section className="conlyra-pinned-director" aria-labelledby="director-title" data-conlyra-director>
      <div className="conlyra-pinned-director-stage">
        <video className="conlyra-pinned-director-video" muted playsInline preload="auto" data-conlyra-director-video aria-hidden="true">
          <source src="/media/AdobeStock_444039087.mp4" type="video/mp4" />
        </video>
        <video className="conlyra-pinned-director-ghost" autoPlay loop muted playsInline preload="none" aria-hidden="true">
          <source src="/media/AdobeStock_517331471.mp4" type="video/mp4" />
        </video>
        <div className="conlyra-pinned-director-filter" aria-hidden="true" />
        <div className="conlyra-container conlyra-pinned-director-content">
          <div className="conlyra-director-copy">
            <p className="conlyra-kicker">Pinned Story</p>
            <h2 id="director-title">Vier Schritte. Ein System.</h2>
            <p>
              Video, Logik und Status rasten sichtbar zusammen.
            </p>
          </div>
          <div className="conlyra-director-stack" aria-label="Gepinnte CONLYRA Videokapitel">
            {pinnedChapters.map((chapter, index) => (
              <article className="conlyra-director-card" key={chapter.title}>
                <span>{chapter.label}</span>
                <h3>{chapter.title}</h3>
                <p>{chapter.copy}</p>
                <i aria-hidden="true" />
                <small>{String(index + 1).padStart(2, "0")}</small>
              </article>
            ))}
          </div>
          <div className="conlyra-director-timeline" aria-hidden="true">
            {pinnedChapters.map((chapter) => (
              <i key={chapter.title} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ScrollScrubStorySection() {
  return (
    <section className="conlyra-scroll-story" aria-labelledby="scroll-story-title" data-conlyra-scroll-story>
      <div className="conlyra-scroll-story-sticky">
        <video className="conlyra-scroll-story-video" muted playsInline preload="auto" data-conlyra-scrub-video aria-hidden="true">
          <source src={filmReels.scrub} type="video/mp4" />
        </video>
        <video className="conlyra-scroll-story-blend" autoPlay loop muted playsInline preload="none" aria-hidden="true">
          <source src={filmReels.blend} type="video/mp4" />
        </video>
        <div className="conlyra-scroll-story-filter" aria-hidden="true" />
        <div className="conlyra-container conlyra-scroll-story-content">
          <div className="conlyra-scroll-story-copy">
            <p className="conlyra-kicker">Scroll Story</p>
            <h2 id="scroll-story-title">Vom Eingang bis zum Ergebnis.</h2>
            <p>
              Der Scroll fuehrt durch den Workflow. Jeder Zustand bleibt sichtbar.
            </p>
          </div>
          <div className="conlyra-scroll-story-steps" aria-label="CONLYRA Systemsequenz">
            {storySteps.map(([number, title, copy]) => (
              <article className="conlyra-scroll-story-step" key={title}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
          <div className="conlyra-scroll-story-progress" aria-hidden="true">
            <i />
          </div>
        </div>
      </div>
    </section>
  );
}

function TypeMaskVideoSection() {
  return (
    <section className="conlyra-type-mask-section" aria-labelledby="type-mask-title" data-conlyra-type-mask>
      <div className="conlyra-type-mask-video" data-conlyra-film aria-hidden="true">
        <video autoPlay loop muted playsInline preload="none">
          <source src={filmReels.type} type="video/mp4" />
        </video>
      </div>
      <div className="conlyra-container">
        <div className="conlyra-type-mask-copy">
          <p className="conlyra-kicker">Brand Layer</p>
          <h2 id="type-mask-title">CONLYRA wird Interface.</h2>
        </div>
        <div className="conlyra-type-mask-reel" aria-hidden="true">
          {maskWords.map(([word, label], index) => (
            <article className="conlyra-type-mask-line" key={word} style={{ "--line-index": index } as CSSProperties}>
              <span>{word}</span>
              <video autoPlay loop muted playsInline preload="none">
                <source src={index === 1 ? filmReels.platform : filmReels.type} type="video/mp4" />
              </video>
              <p>{label}</p>
            </article>
          ))}
        </div>
        <div className="conlyra-type-mask-word" aria-hidden="true">
          <span>CONLYRA</span>
          <video autoPlay loop muted playsInline preload="none">
            <source src={filmReels.type} type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}

function CommandCenterSection() {
  return (
    <section className="conlyra-command-center" aria-labelledby="command-title" data-conlyra-command>
      <div className="conlyra-command-video" data-conlyra-film aria-hidden="true">
        <video autoPlay loop muted playsInline preload="none">
          <source src="/media/AdobeStock_1499424979.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="conlyra-container conlyra-command-layout">
        <div className="conlyra-command-copy" data-conlyra-reveal>
          <p className="conlyra-kicker">Command Center</p>
          <h2 id="command-title">AI-Agenten wie Infrastruktur fuehren.</h2>
          <p>
            Queues, Routing, Reviews und Logs in einer operativen SaaS-Oberflaeche.
          </p>
        </div>
        <div className="conlyra-command-window" data-conlyra-card data-conlyra-reveal>
          <header className="conlyra-command-topbar">
            <span>CONLYRA / CONTROL ROOM</span>
            <div>
              <strong>LIVE</strong>
              <i aria-hidden="true" />
            </div>
          </header>
          <aside className="conlyra-command-rail" aria-label="Command-Center-Module">
            {["Betrieb", "Agenten", "Daten", "Policy", "Logs"].map((item, index) => (
              <span className={index === 1 ? "is-active" : ""} key={item}>
                <LineIcon index={index} />
                {item}
              </span>
            ))}
          </aside>
          <main className="conlyra-command-map" aria-label="Agentenkarte">
            <svg viewBox="0 0 760 430" aria-hidden="true">
              <path d="M88 92 H222 C260 92 260 170 302 170 H392" />
              <path d="M454 170 H542 C590 170 590 92 652 92" />
              <path d="M382 210 V298 H258 C214 298 214 354 144 354" />
              <path d="M436 300 H562 C606 300 606 354 682 354" />
            </svg>
            {commandNodes.map(([title, label, status], index) => (
              <article className={`conlyra-command-node node-${index + 1}`} key={title}>
                <small>{status}</small>
                <LineIcon index={index} />
                <h3>{title}</h3>
                <p>{label}</p>
              </article>
            ))}
          </main>
          <aside className="conlyra-command-inspector" aria-label="Command-Metriken">
            {commandMetrics.map(([value, label], index) => (
              <article key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
                <i style={{ transform: `scaleX(${0.42 + index * 0.13})` }} aria-hidden="true" />
              </article>
            ))}
          </aside>
          <footer className="conlyra-command-logs" aria-label="Agenten-Logs">
            {commandLogs.map((log) => (
              <span className="conlyra-command-log" key={log}>
                {log}
              </span>
            ))}
          </footer>
        </div>
      </div>
    </section>
  );
}

function VideoProjectionSection({ reducedMotion }: { reducedMotion: boolean }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isProjectionActive, setProjectionActive] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setProjectionActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: "36% 0px", threshold: 0.01 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [reducedMotion]);

  useVideoProjection(canvasRef, videoRef, reducedMotion || !isProjectionActive);

  return (
    <section ref={sectionRef} className="conlyra-video-projection" aria-labelledby="projection-title" data-conlyra-projection>
      <video className="conlyra-projection-source" ref={videoRef} autoPlay loop muted playsInline preload="auto" aria-hidden="true">
        <source src="/media/AdobeStock_534758496.mp4" type="video/mp4" />
      </video>
      <canvas className="conlyra-projection-canvas" ref={canvasRef} aria-hidden="true" />
      <div className="conlyra-projection-filter" aria-hidden="true" />
      <div className="conlyra-container conlyra-projection-copy">
        <p className="conlyra-kicker">3D Signal Layer</p>
        <h2 id="projection-title">Video wird zur Systemebene.</h2>
        <p>
          Bewegung, Geometrie und Signale formen eine raeumliche Produktflaeche.
        </p>
        <div aria-label="Projektionsfunktionen">
          <span>VideoTexture</span>
          <span>3D-Ebenen</span>
          <span>Signalpunkte</span>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  copy,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  copy: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`conlyra-section-header is-${align}`}>
      <p className="conlyra-kicker" data-conlyra-reveal>
        {eyebrow}
      </p>
      <h2 className="conlyra-kinetic-heading" data-conlyra-reveal="text">
        <KineticWords text={title} />
      </h2>
      <p data-conlyra-reveal>{copy}</p>
    </div>
  );
}

function CapabilitiesSection() {
  return (
    <section className="conlyra-section" id="capabilities" aria-labelledby="capabilities-title">
      <div className="conlyra-container">
        <SectionHeader
          eyebrow="Leistungen"
          title="AI, die Arbeit bewegt."
          copy="Strategie, Agents, Automation und Daten. Alles in einer kontrollierten Ausfuehrungsebene."
        />
        <div className="conlyra-card-grid conlyra-capability-grid">
          {capabilities.map((item, index) => (
            <article className="conlyra-card conlyra-capability-card" data-conlyra-card data-conlyra-reveal key={item.title}>
              <LineIcon index={index} />
              <span>{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <div className="conlyra-tag-row">
                {item.tags.map((tag) => (
                  <small key={tag}>{tag}</small>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProvenSolutionsSection() {
  return (
    <section className="conlyra-section conlyra-proven" id="solutions" aria-labelledby="proven-title">
      <div className="conlyra-container conlyra-proven-layout">
        <div className="conlyra-proven-copy">
          <p className="conlyra-kicker" data-conlyra-reveal>
            Proven Modules
          </p>
          <h2 id="proven-title" data-conlyra-reveal>
            Gebaut fuer Kontrolle. Gemacht fuer Wirkung.
          </h2>
          <p data-conlyra-reveal data-conlyra-delay="100">
            Daten rein. Kontext pruefen. Agent entscheidet. Freigabe sichern.
          </p>
        </div>
        <div className="conlyra-proven-list">
          {provenSolutions.map((item, index) => (
            <article className="conlyra-proven-row" data-conlyra-card data-conlyra-reveal data-conlyra-delay={index * 70} key={item.title}>
              <div className="conlyra-proven-brand">
                <LogoMark />
                <span>{item.brand}</span>
              </div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
              <time>{item.year}</time>
              <div className="conlyra-proven-preview" aria-hidden="true">
                <video autoPlay loop muted playsInline preload="none">
                  <source src={item.video} type="video/mp4" />
                </video>
                <LogoMark className="is-signal" />
                <strong>{item.brand}</strong>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImpactSection() {
  return (
    <section className="conlyra-section conlyra-impact" id="platform" aria-labelledby="impact-title">
      <div className="conlyra-container conlyra-impact-layout">
        <div>
          <SectionHeader
            eyebrow="ROI Preview"
            title="Sehen, wo AI wirklich wirkt."
            copy="Modellieren Sie Aufwand, Geschwindigkeit und Stabilitaet vor dem Launch."
          />
        </div>
        <div className="conlyra-stat-grid">
          {impactStats.map(([value, suffix, label, note, decimals], index) => (
            <article className="conlyra-card conlyra-stat-card" data-conlyra-card data-conlyra-reveal key={label}>
              <small>0{index + 1}</small>
              <strong>
                <span data-conlyra-counter={value} data-conlyra-decimals={decimals}>
                  0
                </span>
                <em>{suffix}</em>
              </strong>
              <p>{label}</p>
              <span>{note}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCasesSection() {
  return (
    <section className="conlyra-section conlyra-use-cases" id="use-cases" aria-labelledby="use-cases-title">
      <div className="conlyra-container">
        <SectionHeader
          eyebrow="Use Cases"
          title="Mehr Tempo fuer Teams, die liefern muessen."
          copy="Jeder Case startet mit Eingang, Agent, Review und messbarem Ergebnis."
        />
        <div className="conlyra-use-case-grid">
          {useCases.map((item, index) => (
            <article className="conlyra-card conlyra-use-card" data-conlyra-card data-conlyra-reveal key={item.title}>
              <div className="conlyra-use-media" data-conlyra-film aria-hidden="true">
                <video autoPlay loop muted playsInline preload="none">
                  <source src={item.video} type="video/mp4" />
                </video>
              </div>
              <div className="conlyra-use-pattern" aria-hidden="true" />
              <small>{item.status}</small>
              <span>{item.industry}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <a href="#workflow-lab">
                {item.cta}
                <ArrowIcon />
              </a>
              <i aria-hidden="true" style={{ "--index": index } as CSSProperties} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CinematicBandSection() {
  return (
    <section className="conlyra-cinematic-band" aria-labelledby="cinematic-title">
      <div className="conlyra-container conlyra-cinematic-layout">
        <FilmFrame
          className="conlyra-cinematic-film"
          src={filmReels.platform}
          label="04 / Systemfeld"
          title="Private AI fuer Ihre Workflows."
        />
        <div className="conlyra-cinematic-copy" data-conlyra-reveal>
          <p className="conlyra-kicker">Enterprise Motion</p>
          <h2 id="cinematic-title">Premium Look. Operational Core.</h2>
          <p>
            Cinematic Motion macht das System gross, klar und entscheidungsreif.
          </p>
          <div>
            <span>Scroll-Tiefe</span>
            <span>Motion-Timeline</span>
            <span>GSAP-Clips</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductCanvas({ activeTab, onTabChange }: { activeTab: number; onTabChange: (index: number) => void }) {
  const tabs = ["AI-AGENT", "AI-CHAT", "STACK", "AGENT-MODUS"];

  return (
    <section className="conlyra-section conlyra-product-section" id="workflow-preview" aria-labelledby="workflow-title">
      <div className="conlyra-container">
        <SectionHeader
          eyebrow="Product"
          title="Build AI Workflows."
          copy="Entwerfen, verbinden und ueberwachen Sie Agents in einer klaren Arbeitsflaeche."
          align="center"
        />
        <div className="conlyra-product-scroll" data-conlyra-reveal>
          <div className="conlyra-product-window" data-conlyra-card>
            <header className="conlyra-product-topbar">
              <div className="conlyra-product-tabs" role="tablist" aria-label="Produktmodi">
                {tabs.map((tab, index) => (
                  <button
                    aria-selected={index === activeTab}
                    className={index === activeTab ? "is-active" : ""}
                    key={tab}
                    onClick={() => onTabChange(index)}
                    role="tab"
                    type="button"
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="conlyra-status-pills">
                {["AUTO", "HOST", "SYNCED", "LIVE"].map((pill) => (
                  <span key={pill}>{pill}</span>
                ))}
              </div>
            </header>
            <aside className="conlyra-product-sidebar" aria-label="Workflow-Navigation">
              {["Uebersicht", "Quellen", "Agenten", "Freigaben", "Logs"].map((item, index) => (
                <span className={index === activeTab ? "is-active" : ""} key={item}>
                  <LineIcon index={index} />
                  {item}
                </span>
              ))}
            </aside>
            <main className="conlyra-product-board" aria-label="Node-basierte Workflow-Vorschau">
              <svg className="conlyra-product-lines" viewBox="0 0 900 520" aria-hidden="true">
                <path d="M108 128 H250 C292 128 292 196 336 196 H426" />
                <path d="M492 196 H610 C650 196 650 128 700 128 H800" />
                <path d="M458 232 V324 H336 C286 324 286 394 238 394 H132" />
                <path d="M498 324 H620 C670 324 670 394 724 394 H820" />
                <circle cx="250" cy="128" r="4" />
              </svg>
              {workflowNodes.map(([id, title, label, status], index) => (
                <article className={`conlyra-flow-node is-${id}`} data-conlyra-card key={id}>
                  <small>{status}</small>
                  <LineIcon index={index} />
                  <h3>{title}</h3>
                  <p>{label}</p>
                  <em>{title} Ebene aktiv</em>
                </article>
              ))}
            </main>
            <aside className="conlyra-inspector" aria-label="Workflow-Inspektor">
              <span>Inspector</span>
              {["Modell", "Kontext", "Tools", "Memory", "Output"].map((item, index) => (
                <div key={item}>
                  <strong>{item}</strong>
                  <i style={{ transform: `scaleX(${0.44 + index * 0.11})` }} />
                </div>
              ))}
            </aside>
            <footer className="conlyra-terminal" aria-label="Workflow-Logs">
              <span>conlyra.agent.route</span>
              <strong>tool_call freigegeben</strong>
              <span>Latenz 312ms</span>
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkflowLabSection() {
  return (
    <section className="conlyra-workflow-lab" id="workflow-lab" aria-labelledby="workflow-lab-title">
      <div className="conlyra-container">
        <div className="conlyra-workflow-lab-header">
          <p className="conlyra-kicker" data-conlyra-reveal>
            Builder Preview
          </p>
          <h2 id="workflow-lab-title" data-conlyra-reveal>
            Agenten bauen. Workflows testen.
          </h2>
        </div>

        <div className="conlyra-lab-shell" data-conlyra-card data-conlyra-reveal>
          <aside className="conlyra-lab-rail" aria-label="Agentenmodi">
            <button className="is-active" type="button">AI Agent</button>
            <button type="button">AI Chat</button>
            <span>Stack</span>
            <div className="conlyra-lab-stack" aria-hidden="true">
              {[0, 1, 2, 3, 4, 5].map((item) => (
                <i key={item}>
                  <LineIcon index={item} />
                </i>
              ))}
            </div>
            <em>Auto</em>
          </aside>

          <main className="conlyra-lab-stage">
            <header className="conlyra-lab-toolbar">
              <div>
                <button type="button" aria-label="Rueckgaengig">↶</button>
                <button type="button" aria-label="Wiederholen">↷</button>
              </div>
              <span>Agent Mode</span>
              <strong>Untitled Flow</strong>
            </header>

            <div className="conlyra-lab-board" aria-label="Workflow-Testmodell">
              <svg viewBox="0 0 960 360" aria-hidden="true">
                <path d="M90 84 H182 C216 84 216 88 246 88" />
                <path d="M326 88 H425 C455 88 455 88 490 88" />
                <path d="M590 88 H674 C704 88 704 88 738 88" />
                <path d="M817 88 H850 C885 88 885 126 885 155 V218 H740" />
                <path d="M520 126 V210 H500 C462 210 462 238 418 238 H344" />
                <path d="M438 238 H520 H614" />
              </svg>
              <div className="conlyra-lab-dashed" aria-hidden="true" />
              {workflowLabNodes.map(([title, meta, count, type], index) => (
                <article className={`conlyra-lab-node is-${type}`} key={`${title}-${index}`}>
                  <LineIcon index={index} />
                  <strong>{title}</strong>
                  <span>{meta}</span>
                  {count ? <small>{count}</small> : null}
                </article>
              ))}
              <span className="conlyra-lab-plus">+</span>
              <span className="conlyra-lab-cursor">You</span>
            </div>

            <section className="conlyra-lab-chat" aria-label="AI-Agentenchat">
              <div>
                {workflowChat.map(([role, message]) => (
                  <p className={`is-${role}`} key={message}>
                    <span>{role === "agent" ? "Agent" : "Sie"}</span>
                    {message}
                  </p>
                ))}
              </div>
              <form>
                <input aria-label="Agentenfrage" placeholder="Ask CONLYRA AI anything..." />
                <button type="button" aria-label="Nachricht senden">
                  <ArrowIcon />
                </button>
              </form>
            </section>
          </main>

          <aside className="conlyra-lab-host" aria-label="Host-Status">
            <span>Host</span>
            <i />
            <i />
          </aside>
        </div>
      </div>
    </section>
  );
}

function TelemetrySection() {
  return (
    <section className="conlyra-section conlyra-telemetry" id="telemetry" aria-labelledby="telemetry-title">
      <div className="conlyra-container">
        <SectionHeader
          eyebrow="Live Metrics"
          title="Alles steuern. In Echtzeit."
          copy="Leistung, Last, Reaktion und Fortschritt bleiben sichtbar."
        />
        <div className="conlyra-dashboard-grid">
          {dashboardCards.map(([title, value, suffix, copy], index) => (
            <article className="conlyra-card conlyra-dashboard-card" data-conlyra-card data-conlyra-reveal key={title}>
              <header>
                <LineIcon index={index} />
                <span>{title}</span>
              </header>
              <strong>
                <span data-conlyra-counter={value} data-conlyra-decimals={value.includes(".") ? "1" : "0"}>
                  0
                </span>
                <em>{suffix}</em>
              </strong>
              <p>{copy}</p>
              <div className={`conlyra-chart chart-${(index % 3) + 1}`} aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ApproachSection({ activeStep }: { activeStep: number }) {
  return (
    <section className="conlyra-section conlyra-approach" aria-labelledby="approach-title">
      <div className="conlyra-container conlyra-approach-layout">
        <div className="conlyra-approach-sticky">
          <SectionHeader
            eyebrow="Launch Plan"
            title="Von Idee zu Live-System."
            copy="Ein klarer Weg von Strategie ueber Build bis Optimierung."
          />
          <FilmFrame
            className="conlyra-approach-film"
            src={filmReels.approach}
            label="Implementierung"
            title="Build, Launch und Monitoring in einem System."
          />
        </div>
        <div className="conlyra-approach-steps" style={{ "--active-step": activeStep } as CSSProperties}>
          {approachSteps.map(([number, title, copy], index) => (
            <article
              className={activeStep === index ? "is-active" : ""}
              data-conlyra-card
              data-conlyra-reveal
              data-conlyra-step={index}
              key={title}
            >
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureTabsSection() {
  const [active, setActive] = useState(0);
  const current = featureTabs[active] ?? featureTabs[0];

  return (
    <section className="conlyra-section conlyra-feature-tabs" aria-labelledby="feature-tabs-title">
      <div className="conlyra-container">
        <SectionHeader
          eyebrow="Lifecycle"
          title="Analyse. Build. Betrieb."
          copy="Jede Phase haelt Kontext, Regeln und Wirkung zusammen."
          align="center"
        />
        <div className="conlyra-tabs-shell" data-conlyra-reveal data-conlyra-card>
          <div className="conlyra-tabs" role="tablist" aria-label="Workflow-Lifecycle-Tabs">
            {featureTabs.map((tab, index) => (
              <button
                aria-selected={active === index}
                className={active === index ? "is-active" : ""}
                key={tab.title}
                onClick={() => setActive(index)}
                onMouseEnter={() => setActive(index)}
                role="tab"
                type="button"
              >
                {tab.title}
              </button>
            ))}
          </div>
          <article className="conlyra-tab-panel" role="tabpanel">
            <span>{current.title}</span>
            <h3>{current.copy}</h3>
            <div>
              {current.meta.map((item) => (
                <small key={item}>{item}</small>
              ))}
            </div>
          </article>
          <div className="conlyra-tab-visual" aria-hidden="true">
            <LogoMark />
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
    </section>
  );
}

function IntegrationsSection() {
  return (
    <section className="conlyra-section conlyra-integrations" id="integrations" aria-labelledby="integrations-title">
      <div className="conlyra-container">
        <SectionHeader
          eyebrow="Integrationen"
          title="Arbeiten, wo Ihre Tools leben."
          copy="CONLYRA verbindet Apps, Daten und Teams zu einem AI-Workflow."
          align="center"
        />
        <div className="conlyra-integration-wall" data-conlyra-reveal>
          {integrations.map((item, index) => (
            <span data-conlyra-card key={item}>
              <LineIcon index={index} />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="conlyra-customer-trust" id="ratings" aria-labelledby="testimonials-title">
      <div className="conlyra-container">
        <div className="conlyra-customer-heading">
          <p className="conlyra-kicker" data-conlyra-reveal>
            Customer Ratings
          </p>
          <h2 id="testimonials-title" data-conlyra-reveal>
            Trusted by Operators.
          </h2>
          <p data-conlyra-reveal data-conlyra-delay="90">
            Teams nutzen CONLYRA, wenn Service, Speed und Trust messbar werden muessen.
          </p>
        </div>

        <div className="conlyra-customer-grid">
          {customerRatings.map((item, index) => (
            <article className="conlyra-customer-card" data-conlyra-reveal data-conlyra-delay={index * 70} key={item.company}>
              <header>
                <LineIcon index={index} />
                <h3>{item.title}</h3>
              </header>
              <div aria-label="Fuenf-Sterne-Bewertung">★★★★★</div>
              <span>Comment</span>
              <p>{item.comment}</p>
              <small>{item.company}</small>
            </article>
          ))}
        </div>

        <div className="conlyra-customer-logo-rail" aria-label="Kundenlogos">
          <div>
            {[...customerLogos, ...customerLogos].map((logo, index) => (
              <span key={`${logo}-${index}`}>{logo}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <section className="conlyra-section conlyra-contact" id="contact" aria-labelledby="contact-title">
      <div className="conlyra-contact-video" data-conlyra-film aria-hidden="true">
        <video autoPlay loop muted playsInline preload="none">
          <source src={filmReels.contact} type="video/mp4" />
        </video>
      </div>
      <div className="conlyra-container conlyra-contact-layout">
        <div>
          <SectionHeader
            eyebrow="Kontakt"
            title="Starten wir mit einem Workflow."
            copy="Zeigen Sie uns, wo Zeit, Kontext oder Kontrolle verloren geht. Wir bauen den AI-Pfad darum."
          />
          <div className="conlyra-contact-proof" data-conlyra-reveal>
            <span>Private Datenlogik</span>
            <span>Review vor Action</span>
            <span>Enterprise Launch</span>
          </div>
        </div>
        <form className="conlyra-form conlyra-card" data-conlyra-card data-conlyra-reveal onSubmit={onSubmit}>
          <label>
            Name
            <input name="name" autoComplete="name" required />
          </label>
          <label>
            Unternehmen
            <input name="company" autoComplete="organization" required />
          </label>
          <label>
            E-Mail
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label>
            Workflow-Fokus
            <select name="focus" defaultValue="Agenten-Workflow">
              <option>Agenten-Workflow</option>
              <option>Wissenssystem</option>
              <option>Prozessautomatisierung</option>
              <option>AI-Infrastruktur</option>
            </select>
          </label>
          <label className="is-wide">
            Nachricht
            <textarea name="message" placeholder="Welchen Workflow soll CONLYRA automatisieren?" />
          </label>
          <button className="conlyra-btn conlyra-btn-primary conlyra-btn-shine is-wide" type="submit">
            <span>Projekt starten</span>
            <ArrowIcon />
          </button>
          <p className="is-wide" aria-live="polite">
            {submitted ? "Danke. Ihre Anfrage ist bereit." : ""}
          </p>
        </form>
      </div>
    </section>
  );
}

const finalFooterColumns = [
  {
    title: "Loesungen",
    links: [
      ["AI-Agenten", "#capabilities"],
      ["Prozessautomatisierung", "#use-cases"],
      ["Wissenssysteme", "#platform"],
      ["Integrationen", "#integrations"],
    ],
  },
  {
    title: "Unternehmen",
    links: [
      ["Plattform", "#platform"],
      ["Canvas", "#workflow-lab"],
      ["Anwendungen", "#use-cases"],
      ["Kontakt", "#contact"],
    ],
  },
  {
    title: "Kontakt",
    links: [
      ["hello@conlyra.ai", "mailto:hello@conlyra.ai"],
      ["Erstgespraech starten", "#contact"],
    ],
  },
  {
    title: "Rechtliches",
    links: [
      ["Datenschutz", "mailto:hello@conlyra.ai?subject=Datenschutz"],
      ["Impressum", "mailto:hello@conlyra.ai?subject=Impressum"],
    ],
  },
];

function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubscribed(true);
    event.currentTarget.reset();
  }

  return (
    <footer className="conlyra-final-scene" aria-labelledby="footer-title" data-conlyra-footer>
      <section className="conlyra-footer-subscribe">
        <div className="conlyra-final-video" data-conlyra-film aria-hidden="true">
          <video autoPlay loop muted playsInline preload="none">
            <source src={filmReels.contact} type="video/mp4" />
          </video>
        </div>
        <div className="conlyra-final-shade" aria-hidden="true" />
        <div className="conlyra-container conlyra-footer-subscribe-copy" data-conlyra-reveal>
          <p className="conlyra-kicker">Start smarter</p>
          <h2 id="footer-title">AI-Systeme, die liefern.</h2>
          <p>
            Updates zu Agents, Automation und echten Builds. Kurz. Klar. Nutzbar.
          </p>
          <form className="conlyra-subscribe-form" onSubmit={onSubmit}>
            <input name="email" type="email" placeholder="jane@firma.de" autoComplete="email" aria-label="E-Mail Adresse" required />
            <button type="submit">
              <span>{subscribed ? "Eingetragen" : "Join"}</span>
              <ArrowIcon />
            </button>
          </form>
          <span className="conlyra-subscribe-status" aria-live="polite">
            {subscribed ? "Danke. Sie sind eingetragen." : ""}
          </span>
        </div>
      </section>

      <section className="conlyra-footer-index" aria-label="Footer Navigation">
        <div className="conlyra-container conlyra-final-content">
          <a className="conlyra-footer-mark" href="#top" aria-label="CONLYRA Startseite">
            <LogoMark className="is-signal" />
          </a>

          <nav className="conlyra-final-nav" aria-label="Footer-Navigation">
          {finalFooterColumns.map((column) => (
            <div className="conlyra-final-column" key={column.title}>
              <span>{column.title}</span>
              {column.links.map(([label, href]) => (
                <a href={href} key={`${column.title}-${href}`}>
                  {label}
                </a>
              ))}
            </div>
          ))}
          </nav>

          <strong className="conlyra-final-wordmark" aria-hidden="true">
            CONLYRA
          </strong>

          <div className="conlyra-final-bottom">
            <span>© 2026 CONLYRA. Alle Rechte vorbehalten.</span>
            <span>AI Agents / Automation / Data Intelligence</span>
            <a href="mailto:hello@conlyra.ai">hello@conlyra.ai</a>
          </div>
        </div>
      </section>
    </footer>
  );
}

export function ConlyraExperience() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const sectionIds = useMemo(
    () => navLinks.map(([, href]) => href.replace("#", "")),
    [],
  );
  const activeSection = useActiveSection(sectionIds);
  const progress = useScrollProgress();
  const { isOpen, setIsOpen } = useMenuState();
  const [activeCanvasTab, setActiveCanvasTab] = useState(0);
  const activeApproachStep = useApproachStep(rootRef);

  useConlyraMotion(rootRef, reducedMotion);
  useVideoPlayback(rootRef, reducedMotion);
  useAmbientMotionDirector(rootRef, reducedMotion);
  useGsapCinematics(rootRef, reducedMotion);
  useSmoothHashNavigation(rootRef, reducedMotion, () => setIsOpen(false));

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveCanvasTab((current) => (current + 1) % 4);
    }, 3200);

    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  return (
    <div className="conlyra-page" ref={rootRef}>
      <div className="conlyra-noise" aria-hidden="true" />
      <Header
        activeSection={activeSection}
        isMenuOpen={isOpen}
        onMenuToggle={() => setIsOpen((open) => !open)}
        progress={progress}
      />
      <MenuOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <main id="main">
        <HeroSection />
        <ManifestoTypeSection />
        <ServiceOfferSection />
        <OutcomeProofSection />
        <MarqueeStrip />
        <ProductCanvas activeTab={activeCanvasTab} onTabChange={setActiveCanvasTab} />
        <CommandCenterSection />
        <SignalBloomSection />
        <ImpactSection />
        <CapabilitiesSection />
        <UseCasesSection />
        <WorkflowLabSection />
        <TrustWaveSection />
        <TelemetrySection />
        <FeatureTabsSection />
        <IntegrationsSection />
        <ProvenSolutionsSection />
        <ApproachSection activeStep={activeApproachStep} />
        {showCinematicShowcase ? (
          <>
            <SystemFilmSection />
            <FullscreenVideoChapter index={0} />
            <PinnedVideoDirectorSection />
            <ScrollScrubStorySection />
            <FullscreenVideoChapter index={1} />
            <VideoProjectionSection reducedMotion={reducedMotion} />
            <CinematicBandSection />
            <TypeMaskVideoSection />
            <FullscreenVideoChapter index={2} />
          </>
        ) : null}
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
