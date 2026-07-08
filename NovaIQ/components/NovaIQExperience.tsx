"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, FormEvent, RefObject } from "react";

const media = {
  control: "/media/novaiq-control-room-hero.png",
  capture: "/media/novaiq-capture-wall.png",
  review: "/media/novaiq-review-gate.png",
  output: "/media/novaiq-output-queue.png",
};

const navLinks = [
  ["Funktionen", "#funktionen"],
  ["Workflow", "#workflow"],
  ["Cases", "#cases"],
  ["Preise", "#preise"],
  ["FAQ", "#faq"],
];

const showExtendedProofSections = process.env.NEXT_PUBLIC_NOVAIQ_EXTENDED === "true";

const heroCapabilities = ["Content Detection", "AI Ideation", "Approval Flow", "Auto Publishing"];

const capabilities = [
  ["Content Chancen erkennen", "NovaIQ erkennt Termine, Bilder, Projekte und Ereignisse, die sich für Content eignen."],
  ["Post-Ideen generieren", "Aus Rohmaterial entstehen strukturierte Vorschläge für LinkedIn, Instagram und weitere Kanäle."],
  ["Freigabe steuern", "Teams prüfen, kommentieren und bestätigen Beiträge in einem klaren Workflow."],
  ["Automatisch veröffentlichen", "Nach Freigabe plant NovaIQ Inhalte ein und veröffentlicht sie kanaloptimiert."],
];

const stats = [
  ["80", "%", "weniger manuelle Content-Planung", "Workflow-Ziel"],
  ["3", "x", "schnellere Post-Produktion", "Pilot-Zielbild"],
  ["24", "/7", "Content-Monitoring", "Signal-System"],
  ["1", "", "zentraler Freigabeprozess", "Team-Kontrolle"],
];

const cases = [
  {
    year: "2026",
    industry: "Fitness",
    title: "Fitnessstudio Content Workflow",
    copy: "Kurse, Trainingsflächen und Mitglieder-Momente werden automatisch zu Content-Vorschlägen.",
    image: media.capture,
  },
  {
    year: "2026",
    industry: "Industrie",
    title: "Industrie Recruiting Content",
    copy: "Projekte, Maschinen, Teams und Baustellen werden als Arbeitgeber-Content sichtbar.",
    image: media.review,
  },
  {
    year: "2026",
    industry: "Immobilien",
    title: "Immobilien Social Proof",
    copy: "Objekte, Besichtigungen und Kundenerfolge werden strukturiert aufbereitet.",
    image: media.output,
  },
  {
    year: "2026",
    industry: "Regional",
    title: "Lokales Unternehmen Automation",
    copy: "Alltagsmomente werden zu planbaren Beiträgen für Instagram und LinkedIn.",
    image: media.control,
  },
];

const workflowTabs = ["Detection", "Ideation", "Approval", "Publishing"];

const workflowNodes = [
  ["Source", "Google Calendar Trigger", "Termin / Event erkannt", "Live"],
  ["Detection", "Content Chance erkannt", "NovaIQ bewertet Relevanz", "Score 92"],
  ["AI", "AI Agent erstellt Idee", "Caption, Hook, Format", "Draft"],
  ["Asset", "Bild/Video Input", "Medien ergänzen", "Ready"],
  ["Approval", "Team Freigabe", "Prüfen & bestätigen", "Open"],
  ["Output", "LinkedIn Post", "B2B Veröffentlichung", "Queue"],
  ["Output", "Instagram Post", "Reel / Feed / Story", "Queue"],
];

const dashboardMetrics = [
  ["Content Queue", "42", "Beiträge", "stack"],
  ["Approval Rate", "91", "%", "gauge"],
  ["Publishing Status", "Live", "", "pulse"],
  ["Time Saved", "12", "h / Woche", "chart"],
];

const productTabs = [
  ["Erkennen", "NovaIQ erkennt Content-Chancen aus Kalendern, Projekten, Medien und wiederkehrenden Unternehmensereignissen.", media.capture],
  ["Vorschlagen", "Der Agent erstellt Hooks, Captions, Formatideen und Kanalvorschläge.", media.output],
  ["Freigeben", "Das Team prüft Inhalte, ergänzt Medien und gibt Beiträge mit einem Klick frei.", media.review],
  ["Veröffentlichen", "Nach Freigabe werden Beiträge eingeplant und kanaloptimiert veröffentlicht.", media.control],
];

const integrations = [
  "Instagram",
  "LinkedIn",
  "Google Calendar",
  "Google Drive",
  "Notion",
  "Slack",
  "Canva",
  "Meta Business Suite",
  "WordPress",
  "HubSpot",
  "Airtable",
  "Make / n8n",
];

const testimonials = [
  ["NovaIQ hat uns geholfen, Content nicht mehr spontan zu erzwingen, sondern aus echten Momenten zu entwickeln.", "Marketing Lead, B2B Dienstleister"],
  ["Der Freigabeprozess ist der größte Unterschied. Ideen, Medien und Veröffentlichung liegen nicht mehr in fünf Tools verteilt.", "Geschäftsführung, lokales Unternehmen"],
  ["Für LinkedIn und Instagram haben wir jetzt einen klaren Ablauf statt wöchentlichem Content-Stress.", "Teamleitung, Industrieunternehmen"],
];

const articles = [
  ["Strategie", "5 Min.", "Warum B2B Content ohne System immer liegen bleibt"],
  ["Automation", "4 Min.", "Wie KI Content-Chancen im Alltag erkennt"],
  ["Workflow", "6 Min.", "Warum Freigaben der Schlüssel zu skalierbarer Sichtbarkeit sind"],
];

const faqGroups = {
  "Übersicht": [
    ["Ersetzt NovaIQ unser Marketing-Team?", "Nein. NovaIQ automatisiert wiederkehrende Content-Prozesse und unterstützt bei Ideen, Struktur und Veröffentlichung. Strategie, Markenstimme und finale Kontrolle bleiben beim Team."],
    ["Für wen ist NovaIQ gedacht?", "Für B2B-Unternehmen, Agenturen und Teams, die regelmäßig sichtbar sein wollen, aber keine sauberen Content-Prozesse haben."],
  ],
  "Sicherheit": [
    ["Werden Inhalte automatisch ohne Freigabe gepostet?", "Nur wenn der Kunde es ausdrücklich so einrichtet. Standardmäßig arbeitet NovaIQ mit einem Freigabeprozess."],
    ["Können wir kontrollieren, was veröffentlicht wird?", "Ja. Beiträge können geprüft, kommentiert, angepasst und erst danach freigegeben werden."],
  ],
  "Plattformen": [
    ["Welche Plattformen werden unterstützt?", "LinkedIn, Instagram und weitere Kanäle können angebunden werden. Kalender, Dateien und Teamtools können als Content-Quellen dienen."],
  ],
  "Preise": [
    ["Gibt es feste Pakete?", "Die Pakete können nach Umfang, Integrationen und Automatisierungsgrad aufgebaut werden."],
  ],
};

const pricing = [
  ["Content Assist", "Kleine Teams, die Ideen und Struktur brauchen.", ["Content-Chancen manuell hinzufügen", "AI-Ideen & Caption-Vorschläge", "Basis-Freigabe", "LinkedIn/Instagram Planung"], "Anfragen"],
  ["Auto Workflow", "Teams, die Content systematisch automatisieren wollen.", ["Kalender-/Medien-Signale", "Automatisierte Vorschläge", "Team-Freigaben", "Publishing Queue", "Dashboard"], "Demo anfragen"],
  ["Custom Agent System", "Unternehmen mit individuellen Prozessen und Integrationen.", ["Custom AI Agent", "Individuelle Datenquellen", "Rollen & Rechte", "API/Tool-Integrationen", "Persönliches Setup"], "Beratung starten"],
];

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

function useActiveSection(sectionIds: string[]) {
  const [active, setActive] = useState(sectionIds[0] ?? "top");

  useEffect(() => {
    const sync = () => {
      const anchor = window.innerHeight * 0.32;
      let next = sectionIds[0] ?? "top";

      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (!element) {
          return;
        }
        const rect = element.getBoundingClientRect();
        if (rect.top <= anchor && rect.bottom > 0) {
          next = id;
        }
      });

      setActive((current) => (current === next ? current : next));
    };

    sync();
    const interval = window.setInterval(sync, 220);
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sectionIds]);

  return active;
}

function useScrollProgress(rootRef: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const sync = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const next = Math.min(1, Math.max(0, window.scrollY / max));
      setProgress((current) => (Math.abs(current - next) > 0.004 ? next : current));
    };

    sync();
    const interval = window.setInterval(sync, 200);
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [rootRef]);

  return progress;
}

function useMenuState() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  return { isOpen, setIsOpen };
}

function useCursor(rootRef: RefObject<HTMLElement | null>, disabled: boolean) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || disabled || window.innerWidth < 900) {
      return;
    }

    let frame = 0;
    let x = 0;
    let y = 0;

    const sync = () => {
      root.style.setProperty("--nq-cursor-x", `${x}px`);
      root.style.setProperty("--nq-cursor-y", `${y}px`);
      frame = 0;
    };

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!frame) {
        frame = window.requestAnimationFrame(sync);
      }
    };

    const interactiveSelector = "a, button, [data-nq-tilt], [data-nq-workflow-node]";
    const onOver = (event: PointerEvent) => {
      if ((event.target as Element | null)?.closest(interactiveSelector)) {
        root.classList.add("is-cursor-active");
      }
    };
    const onOut = (event: PointerEvent) => {
      if ((event.target as Element | null)?.closest(interactiveSelector)) {
        root.classList.remove("is-cursor-active");
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    root.addEventListener("pointerover", onOver);
    root.addEventListener("pointerout", onOut);

    return () => {
      window.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerover", onOver);
      root.removeEventListener("pointerout", onOut);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [disabled, rootRef]);
}

function useNovaIQMotion(
  rootRef: RefObject<HTMLElement | null>,
  reducedMotion: boolean,
  setActiveWorkflowStep: (index: number) => void,
) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }
    const rootElement = root;

    if (reducedMotion) {
      root.querySelectorAll("[data-nq-reveal]").forEach((item) => item.classList.add("is-revealed"));
      return;
    }

    let active = true;
    let cleanup: (() => void) | undefined;

    async function setup() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (!active) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".nq-header",
          { y: -14, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out" },
        );

        gsap.fromTo(
          ".nq-hero-line span",
          { yPercent: 110, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 1, stagger: 0.08, ease: "power4.out" },
        );

        gsap.fromTo(
          ".nq-hero [data-nq-reveal]",
          { y: 18, autoAlpha: 0, filter: "blur(8px)" },
          { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.9, stagger: 0.08, ease: "power3.out", delay: 0.2 },
        );

        gsap.utils.toArray<HTMLElement>("[data-nq-reveal]").forEach((item, index) => {
          if (item.closest(".nq-hero")) {
            return;
          }
          gsap.fromTo(
            item,
            { y: 34, autoAlpha: 0, filter: "blur(10px)" },
            {
              y: 0,
              autoAlpha: 1,
              filter: "blur(0px)",
              duration: 0.9,
              delay: Math.min(index % 3, 2) * 0.04,
              ease: "power3.out",
              scrollTrigger: { trigger: item, start: "top 84%" },
            },
          );
        });

        gsap.to(".nq-hero-visual", {
          yPercent: -8,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".nq-hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(".nq-hero-copy", {
          y: -70,
          autoAlpha: 0.38,
          ease: "none",
          scrollTrigger: {
            trigger: ".nq-hero",
            start: "35% top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.utils.toArray<HTMLElement>("[data-nq-count]").forEach((item) => {
          const end = Number(item.dataset.nqCount ?? "0");
          const proxy = { value: 0 };
          gsap.to(proxy, {
            value: end,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 88%", once: true },
            onUpdate: () => {
              item.textContent = String(Math.round(proxy.value));
            },
          });
        });

        gsap.to(".nq-media-core", {
          scale: 1,
          y: -28,
          ease: "none",
          scrollTrigger: {
            trigger: ".nq-media-cta",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        const workflowSection = rootElement.querySelector<HTMLElement>(".nq-workflow-section");
        if (workflowSection && window.innerWidth >= 768) {
          ScrollTrigger.create({
            trigger: workflowSection,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const next = Math.min(workflowTabs.length - 1, Math.floor(self.progress * workflowTabs.length));
              setActiveWorkflowStep(next);
              rootElement.style.setProperty("--nq-workflow-progress", String(self.progress));
            },
          });
        }

        gsap.utils.toArray<HTMLElement>("[data-nq-line]").forEach((line) => {
          gsap.fromTo(
            line,
            { strokeDashoffset: 1 },
            {
              strokeDashoffset: 0,
              ease: "none",
              scrollTrigger: {
                trigger: ".nq-workflow-canvas",
                start: "top 70%",
                end: "bottom 38%",
                scrub: 1,
              },
            },
          );
        });

        gsap.fromTo(
          ".nq-editorial-panel",
          { x: 120, y: 60, autoAlpha: 0 },
          {
            x: 0,
            y: 0,
            autoAlpha: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: ".nq-system", start: "top 66%" },
          },
        );

        window.requestAnimationFrame(() => ScrollTrigger.refresh());
      }, rootElement);

      cleanup = () => ctx.revert();
    }

    void setup();

    return () => {
      active = false;
      cleanup?.();
    };
  }, [reducedMotion, rootRef, setActiveWorkflowStep]);
}

function IconMark({ index }: { index: number }) {
  const paths = [
    "M5 12h14M12 5v14",
    "M6 8l6 8 6-8",
    "M6 12h6l3-5 3 10",
    "M5 16c5-8 9-8 14 0",
  ];
  return (
    <svg aria-hidden="true" className="nq-icon" viewBox="0 0 24 24">
      <path d={paths[index % paths.length]} />
      <circle cx="12" cy="12" r="8" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 18 18">
      <path d="M4 9h9M10 5l4 4-4 4" />
    </svg>
  );
}

function BrandMark({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/brand-mark.svg"
      alt=""
      width={192}
      height={192}
      className={`nq-brand-mark${className ? ` ${className}` : ""}`}
      unoptimized
    />
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
    <header className="nq-header" style={{ "--nq-scroll-progress": progress } as CSSProperties}>
      <a className="nq-logo" href="#top" aria-label="NovaIQ Startseite">
        <BrandMark />
        <strong>NovaIQ</strong>
      </a>
      <nav className="nq-header-nav" aria-label="Hauptnavigation">
        {navLinks.map(([label, href]) => {
          const id = href.replace("#", "");
          return (
            <a className={activeSection === id ? "is-active" : ""} href={href} key={href}>
              {label}
            </a>
          );
        })}
      </nav>
      <a className="nq-header-cta" href="#kontakt">
        <span>Demo anfragen</span>
        <ArrowIcon />
      </a>
      <button
        className="nq-menu-button"
        type="button"
        aria-label={isMenuOpen ? "Menü schließen" : "Menü öffnen"}
        aria-expanded={isMenuOpen}
        onClick={onMenuToggle}
      >
        <span />
        <span />
      </button>
      <i className="nq-header-progress" aria-hidden="true" />
    </header>
  );
}

function MenuOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <div className={`nq-menu-overlay${isOpen ? " is-open" : ""}`} aria-hidden={!isOpen}>
      <div className="nq-menu-left">
        <a className="nq-menu-brand" href="#top" onClick={onClose} aria-label="NovaIQ Startseite">
          <BrandMark />
          NovaIQ
        </a>
        <div className="nq-menu-preview" aria-hidden="true">
          <i />
          <i />
          <strong>2026</strong>
        </div>
        <p>Autonomous Content System</p>
        <h2>Verwandle Alltag in planbare Sichtbarkeit.</h2>
        <span>NovaIQ verbindet Signale, Ideen, Freigaben und Publishing zu einem kontrollierbaren AI-Workflow.</span>
        <small>Berlin · B2B Content Automation</small>
        <a className="nq-menu-cta" href="#kontakt" onClick={onClose}>
          Demo anfragen <ArrowIcon />
        </a>
      </div>
      <div className="nq-menu-right">
        <button type="button" className="nq-menu-close" aria-label="Menü schließen" onClick={onClose}>
          ×
        </button>
        {[
          ["Home", "#top"],
          ["Funktionen", "#funktionen"],
          ["Workflow", "#workflow"],
          ["Cases", "#cases"],
          ["Preise", "#preise"],
          ["FAQ", "#faq"],
          ["Kontakt", "#kontakt"],
        ].map(([label, href]) => (
          <a href={href} key={href} onClick={onClose}>
            <span>{label}</span>
            <ArrowIcon />
          </a>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="nq-hero" id="top" aria-labelledby="hero-title">
      <div className="nq-hero-capabilities" aria-label="NovaIQ Fähigkeiten">
        {heroCapabilities.map((item) => (
          <span data-nq-reveal key={item}>{item}</span>
        ))}
      </div>

      <div className="nq-hero-visual" aria-hidden="true">
        <div className="nq-system-field">
          <div className="nq-hero-brand-moment">
            <BrandMark />
            <span>NovaIQ</span>
            <small>AI Content System</small>
          </div>
          {["Chance erkannt", "Post bereit zur Freigabe", "LinkedIn Queue", "Instagram Entwurf"].map((item, index) => (
            <span className={`nq-float-panel nq-float-${index + 1}`} key={item}>{item}</span>
          ))}
          <i className="nq-ring nq-ring-one" />
          <i className="nq-ring nq-ring-two" />
          <i className="nq-ring nq-ring-three" />
        </div>
      </div>

      <div className="nq-container nq-hero-copy">
        <p className="nq-kicker" data-nq-reveal>KI Social Media Manager</p>
        <h1 id="hero-title">
          <span className="nq-hero-line"><span>Dein Social Media</span></span>{" "}
          <span className="nq-hero-line"><span>Manager arbeitet</span></span>{" "}
          <span className="nq-hero-line"><span>jetzt autonom.</span></span>
        </h1>
        <p className="nq-hero-subline" data-nq-reveal>
          NovaIQ erkennt Content-Chancen im Alltag, erstellt Post-Vorschläge und bringt Inhalte
          nach Freigabe automatisch auf LinkedIn, Instagram und Co.
        </p>
        <div className="nq-actions" data-nq-reveal>
          <a className="nq-button nq-button-primary" href="#kontakt">
            <span>Demo anfragen</span>
            <ArrowIcon />
          </a>
          <a className="nq-button nq-button-secondary" href="#workflow">
            <span>Workflow ansehen</span>
            <ArrowIcon />
          </a>
        </div>
      </div>

      <div className="nq-scroll-indicator" aria-hidden="true">
        <span />
        Scroll
      </div>
    </section>
  );
}

function NeuralText() {
  return (
    <section className="nq-neural" aria-labelledby="neural-title">
      <div className="nq-container">
        <div className="nq-dot-row" aria-hidden="true">
          <span /><span /><span />
        </div>
        <h2 id="neural-title" data-nq-reveal>
          NovaIQ verbindet Kalender, Medien, Freigaben und Plattformen zu einem Content-System,
          das Chancen erkennt, bevor sie verloren gehen.
        </h2>
      </div>
    </section>
  );
}

function CapabilityRow() {
  return (
    <section className="nq-section nq-capabilities" id="funktionen" aria-labelledby="capabilities-title">
      <div className="nq-container">
        <p className="nq-kicker" data-nq-reveal>Funktionen</p>
        <h2 className="nq-section-title" id="capabilities-title" data-nq-reveal>Autonomie, die dein Team kontrolliert.</h2>
        <div className="nq-capability-grid">
          {capabilities.map(([title, copy], index) => (
            <article className="nq-capability-card" data-nq-reveal data-nq-tilt key={title}>
              <IconMark index={index} />
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImpactStats() {
  return (
    <section className="nq-section nq-impact" aria-labelledby="impact-title">
      <div className="nq-container nq-impact-grid">
        <div>
          <p className="nq-kicker" data-nq-reveal>Messbare Entlastung</p>
          <h2 className="nq-section-title" id="impact-title" data-nq-reveal>
            Content-Prozesse, die nicht mehr jeden Tag neu erfunden werden müssen.
          </h2>
          <p className="nq-section-copy" data-nq-reveal>
            NovaIQ macht aus einzelnen Ideen einen wiederholbaren Workflow: von der Chance bis zur Veröffentlichung.
          </p>
        </div>
        <div className="nq-stat-grid">
          {stats.map(([value, suffix, label, note]) => (
            <article className="nq-stat-card" data-nq-reveal key={label}>
              <strong>
                <span data-nq-count={value}>0</span>
                <em>{suffix}</em>
              </strong>
              <p>{label}</p>
              <small>{note}</small>
            </article>
          ))}
        </div>
      </div>
      <div className="nq-container">
        <div className="nq-impact-media" data-nq-reveal aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
    </section>
  );
}

function MediaCTA() {
  return (
    <section className="nq-media-cta" aria-labelledby="media-cta-title">
      <div className="nq-container">
        <div className="nq-media-panel" data-nq-reveal>
          <div className="nq-media-core" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <a className="nq-media-pill" href="#workflow" id="media-cta-title">
            Workflow ansehen <ArrowIcon />
          </a>
          <p>Vom Alltagssignal zum fertigen Beitrag.</p>
        </div>
      </div>
    </section>
  );
}

function CaseStudies() {
  const [activeCase, setActiveCase] = useState(0);
  const active = cases[activeCase] ?? cases[0];

  return (
    <section className="nq-light nq-cases" id="cases" aria-labelledby="cases-title">
      <div className="nq-light-container">
        <div className="nq-light-header">
          <p>Anwendungsfälle</p>
          <h2 id="cases-title">Content-Systeme, die im Alltag funktionieren.</h2>
          <span>Für Teams, die regelmäßig sichtbar sein müssen, ohne jeden Post manuell neu zu planen.</span>
        </div>
        <div className="nq-case-layout">
          <figure className="nq-case-preview">
            <Image src={active.image} alt={`${active.title} in der NovaIQ Produktoberfläche`} width={1672} height={941} sizes="(max-width: 700px) 100vw, 48vw" />
            <figcaption>{active.title}</figcaption>
          </figure>
          <div className="nq-case-rows">
            {cases.map((item, index) => (
              <button
                className={index === activeCase ? "is-active" : ""}
                type="button"
                key={item.title}
                onClick={() => setActiveCase(index)}
                onMouseEnter={() => setActiveCase(index)}
              >
                <span>{item.year}</span>
                <small>{item.industry}</small>
                <strong>{item.title}</strong>
                <em>{item.copy}</em>
                <ArrowIcon />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkflowCanvas({ activeStep }: { activeStep: number }) {
  return (
    <section className="nq-section nq-workflow-section" id="workflow" aria-labelledby="workflow-title">
      <div className="nq-workflow-sticky">
        <div className="nq-container">
          <div className="nq-workflow-heading">
            <p className="nq-kicker" data-nq-reveal>Workflow Canvas</p>
            <h2 id="workflow-title" data-nq-reveal>Vom Moment zum fertigen Post.</h2>
            <p data-nq-reveal>NovaIQ baut aus Kalenderdaten, Bildern, Videos und Teamfreigaben einen klaren Content-Workflow.</p>
          </div>
          <div className="nq-workflow-canvas" data-nq-reveal>
            <aside className="nq-agent-sidebar" aria-label="Agent Status">
              <i className="nq-side-stripe" aria-hidden="true" />
              <div className="nq-agent-toggle">
                <button type="button">AI Agent</button>
                <button className="is-active" type="button">AI Chat</button>
                <span>You</span>
              </div>
              <p>Stack</p>
              <div className="nq-stack-grid" aria-hidden="true">
                {["✺", "✦", "◆", "⌁", "M", "+"].map((item) => <span key={item}>{item}</span>)}
              </div>
              <div className="nq-auto-mark" aria-hidden="true">
                <span />
                Auto
              </div>
            </aside>
            <div className="nq-agent-board">
              <div className="nq-agent-topbar" aria-label="Canvas Navigation">
                <button type="button" aria-label="Zurück">↶</button>
                <button type="button" aria-label="Vorwärts">↷</button>
                <span>Agent Mode <i>✦</i></span>
                <strong><BrandMark className="nq-app-mark" />NovaIQ Queue</strong>
              </div>
              <div className="nq-canvas-tabs">
                {workflowTabs.map((tab, index) => (
                  <span className={index === activeStep ? "is-active" : ""} key={tab}>{tab}</span>
                ))}
              </div>
              <span className="nq-live-chip">Host · NovaIQ</span>
              <svg className="nq-flow-lines" viewBox="0 0 1000 560" aria-hidden="true">
                <path data-nq-line pathLength="1" d="M118 120 H246 C278 120 278 165 310 165 H432" />
                <path data-nq-line pathLength="1" d="M520 165 H650 C682 165 682 120 714 120 H840" />
                <path data-nq-line pathLength="1" d="M456 205 V316 H300 C270 316 270 386 238 386" />
                <path data-nq-line pathLength="1" d="M505 318 H640 C690 318 690 402 760 402 H880" />
              </svg>
              <div className="nq-agent-group nq-agent-group-primary" aria-hidden="true" />
              <div className="nq-agent-group nq-agent-group-secondary" aria-hidden="true" />
              <div className="nq-node-grid">
                {workflowNodes.map(([type, title, label, status], index) => (
                  <article className={`nq-workflow-node nq-node-${index + 1}`} data-nq-workflow-node key={title}>
                    <small>{type}</small>
                    <IconMark index={index} />
                    <h3>{title}</h3>
                    <p>{label}</p>
                    <span>{status}</span>
                    <em>{label}</em>
                  </article>
                ))}
              </div>
              <div className="nq-chat-dock" aria-hidden="true">
                <span>Frag NovaIQ nach dem nächsten Post...</span>
                <i>Tools</i>
                <strong>↗</strong>
              </div>
              <div className="nq-zoom-controls" aria-hidden="true">x 18 · y 42 · 72%</div>
            </div>
          </div>
          <div className="nq-workflow-features">
            {["Infinite Content Canvas", "Kontrollierte Autonomie", "Team-Freigabe", "Publishing Stack"].map((item, index) => (
              <article data-nq-reveal key={item}>
                <IconMark index={index} />
                <span>{item}</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PerformanceDashboard() {
  return (
    <section className="nq-section nq-dashboard-section" aria-labelledby="dashboard-title">
      <div className="nq-container">
        <p className="nq-kicker" data-nq-reveal>Performance Dashboard</p>
        <h2 className="nq-section-title" id="dashboard-title" data-nq-reveal>Optimiert für wiederholbare Content-Prozesse.</h2>
        <p className="nq-section-copy" data-nq-reveal>
          NovaIQ zeigt, was geplant, geprüft und veröffentlicht wird, ohne Excel-Listen, Chat-Chaos oder verlorene Ideen.
        </p>
        <div className="nq-ops-dashboard">
          {dashboardMetrics.slice(0, 3).map(([title, value, suffix, kind], index) => (
            <article className={`nq-ops-card is-${kind}`} data-nq-reveal key={title}>
              <header>
                <IconMark index={index} />
                <span>{title}</span>
                <em>{index === 0 ? "98.7%" : index === 1 ? "91.0%" : "Live"}</em>
              </header>
              <div className="nq-ops-visual" aria-hidden="true">
                <strong>{Number.isNaN(Number(value)) ? value : <span data-nq-count={value}>0</span>}</strong>
                <small>{suffix}</small>
              </div>
            </article>
          ))}
          <article className="nq-ops-card nq-ops-growth" data-nq-reveal>
            <header>
              <IconMark index={3} />
              <span>{dashboardMetrics[3][0]}</span>
              <em>30 Tage</em>
            </header>
            <strong><span data-nq-count={dashboardMetrics[3][1]}>0</span>{dashboardMetrics[3][2]}</strong>
            <div className="nq-growth-chart" aria-hidden="true">
              <svg viewBox="0 0 760 220">
                <path d="M0 178 C58 120 86 216 136 156 S226 92 282 132 S358 142 408 104 S505 54 574 110 S676 162 760 42" />
              </svg>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function LongTermSystem() {
  return (
    <section className="nq-light nq-system nq-system-editorial" aria-labelledby="system-title">
      <div className="nq-system-split">
        <div className="nq-system-visual" aria-hidden="true">
          <Image src={media.control} alt="" width={1672} height={941} sizes="(max-width: 980px) 100vw, 50vw" />
          <span />
          <span />
          <i>NovaIQ 2026</i>
        </div>
        <article className="nq-editorial-panel">
          <p>System statt Zufall</p>
          <h2 id="system-title">Gebaut für konstante Sichtbarkeit.</h2>
          <span>NovaIQ ersetzt nicht deine Markenstimme. Es strukturiert die Momente, Ideen und Freigaben, die sonst im Alltag liegen bleiben.</span>
          <div className="nq-approach-grid">
            {[
              ["Signal Logic", "Ereignisse, Projekte und Medien werden als Content-Chancen erkannt."],
              ["Brand Control", "Ton, Freigaben und Rollen bleiben nachvollziehbar steuerbar."],
              ["Fast Cycles", "Aus Alltagssignalen entstehen schneller fertige Beiträge."],
              ["Clear Output", "LinkedIn, Instagram und weitere Kanäle laufen aus einer Queue."],
            ].map(([title, copy], index) => (
              <div key={title}>
                <IconMark index={index} />
                <strong>{title}</strong>
                <small>{copy}</small>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

function ProductTabs() {
  const [active, setActive] = useState(0);
  const current = productTabs[active] ?? productTabs[0];

  return (
    <section className="nq-section nq-product-tabs" aria-labelledby="product-tabs-title">
      <div className="nq-container">
        <p className="nq-kicker" data-nq-reveal>Autonomie</p>
        <h2 className="nq-section-title" id="product-tabs-title" data-nq-reveal>Ein autonomer Workflow, der trotzdem kontrollierbar bleibt.</h2>
        <p className="nq-section-copy" data-nq-reveal>NovaIQ automatisiert nicht blind. Jede Veröffentlichung bleibt nachvollziehbar, prüfbar und steuerbar.</p>
        <div className="nq-tabs-layout">
          <div className="nq-tab-list" role="tablist" aria-label="NovaIQ Produktbereiche">
            {productTabs.map(([title], index) => (
              <button
                aria-selected={active === index}
                className={active === index ? "is-active" : ""}
                key={title}
                onClick={() => setActive(index)}
                role="tab"
                type="button"
              >
                {title}
              </button>
            ))}
          </div>
          <figure className="nq-tab-visual">
            <Image src={current[2]} alt={`${current[0]} NovaIQ Produktansicht`} width={1672} height={941} sizes="(max-width: 700px) 100vw, 48vw" />
          </figure>
          <article className="nq-tab-copy">
            <h3>{current[0]}</h3>
            <p>{current[1]}</p>
          </article>
        </div>
      </div>
    </section>
  );
}

function Integrations() {
  return (
    <section className="nq-section nq-integrations" aria-labelledby="integrations-title">
      <div className="nq-container">
        <h2 className="nq-section-title" id="integrations-title" data-nq-reveal>
          NovaIQ verbindet die Orte, an denen Content entsteht, mit den Plattformen, auf denen deine Marke sichtbar wird.
        </h2>
        <p className="nq-section-copy" data-nq-reveal>
          Kalender, Dateien, Teamkommunikation und Social Channels werden zu einem steuerbaren Veröffentlichungsprozess.
        </p>
        <div className="nq-integration-grid">
          {integrations.map((item, index) => (
            <span data-nq-reveal key={item}>
              <IconMark index={index} />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="nq-light nq-testimonials" aria-labelledby="testimonials-title">
      <div className="nq-light-container">
        <div className="nq-light-header">
          <p>Trust</p>
          <h2 id="testimonials-title">Vertraut von Teams, die Content endlich systematisch denken.</h2>
        </div>
        <div className="nq-testimonial-row">
          {testimonials.map(([quote, role]) => (
            <article key={role}>
              <span>“</span>
              <p>{quote}</p>
              <strong>{role}</strong>
            </article>
          ))}
        </div>
        <div className="nq-logo-placeholders" aria-label="Platzhalter Logos">
          {["B2B Team", "Agentur", "Industrie", "Regional"].map((item) => <span key={item}>{item}</span>)}
        </div>
      </div>
    </section>
  );
}

function Insights() {
  return (
    <section className="nq-light nq-insights" aria-labelledby="insights-title">
      <div className="nq-light-container">
        <div className="nq-light-header">
          <p>Insights</p>
          <h2 id="insights-title">Wissen über KI, Content und wiederholbare Sichtbarkeit.</h2>
        </div>
        <div className="nq-article-grid">
          {articles.map(([category, readTime, title], index) => (
            <article className={index === 0 ? "is-featured" : ""} key={title}>
              <div aria-hidden="true" />
              <span>{category} · {readTime}</span>
              <h3>{title}</h3>
              <a href="#kontakt">Lesen <ArrowIcon /></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const categories = Object.keys(faqGroups) as Array<keyof typeof faqGroups>;
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="nq-light nq-faq" id="faq" aria-labelledby="faq-title">
      <div className="nq-light-container nq-faq-layout">
        <div className="nq-light-header">
          <p>FAQ</p>
          <h2 id="faq-title">Häufige Fragen</h2>
        </div>
        <div>
          <div className="nq-faq-tabs" role="tablist" aria-label="FAQ Kategorien">
            {categories.map((category) => (
              <button
                className={category === activeCategory ? "is-active" : ""}
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setOpenIndex(0);
                }}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>
          <div className="nq-faq-list">
            {faqGroups[activeCategory].map(([question, answer], index) => (
              <div className={index === openIndex ? "is-open" : ""} key={question}>
                <button
                  aria-expanded={index === openIndex}
                  onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
                  type="button"
                >
                  {question}
                  <span>+</span>
                </button>
                <p>{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section className="nq-light nq-pricing" id="preise" aria-labelledby="pricing-title">
      <div className="nq-light-container">
        <div className="nq-light-header">
          <p>Preise</p>
          <h2 id="pricing-title">Flexible Pakete für skalierbare Content-Automation.</h2>
          <span>Vom ersten AI-Content-Workflow bis zum individuellen Agentensystem.</span>
        </div>
        <div className="nq-pricing-grid">
          {pricing.map(([title, description, features, cta], index) => (
            <article className={index === 1 ? "is-highlighted" : ""} key={String(title)}>
              <small>{index === 0 ? "Starter" : index === 1 ? "Growth" : "Enterprise"}</small>
              <h3>{title as string}</h3>
              <p>{description as string}</p>
              <ul>
                {(features as string[]).map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
              <a href="#kontakt">{cta as string}</a>
            </article>
          ))}
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
    <section className="nq-section nq-contact" id="kontakt" aria-labelledby="contact-title">
      <div className="nq-container nq-contact-grid">
        <div>
          <p className="nq-kicker" data-nq-reveal>Demo anfragen</p>
          <h2 className="nq-section-title" id="contact-title" data-nq-reveal>Prüfe, ob NovaIQ zu deinem Content-Prozess passt.</h2>
          <p className="nq-section-copy" data-nq-reveal>
            In der Demo zeigen wir, wie NovaIQ Content-Chancen erkennt, Freigaben organisiert und Veröffentlichungen vorbereitet.
          </p>
        </div>
        <form className="nq-contact-form" onSubmit={onSubmit} data-nq-reveal>
          <label>Name<input name="name" autoComplete="name" required /></label>
          <label>Unternehmen<input name="company" autoComplete="organization" required /></label>
          <label>E-Mail<input name="email" type="email" autoComplete="email" required /></label>
          <label>Herausforderung<select name="challenge" defaultValue="Content regelmäßig planen"><option>Content regelmäßig planen</option><option>Freigaben organisieren</option><option>KI sinnvoll einführen</option><option>LinkedIn/Instagram automatisieren</option></select></label>
          <label className="is-wide">Nachricht<textarea name="message" placeholder="Was soll NovaIQ für dein Team vorbereiten?" /></label>
          <button type="submit">Demo anfragen <ArrowIcon /></button>
          <p aria-live="polite">{submitted ? "Danke. Deine Anfrage ist vorbereitet." : ""}</p>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="nq-footer">
      <div className="nq-container">
        <div className="nq-footer-top">
          <a className="nq-footer-logo" href="#top" aria-label="NovaIQ Startseite">
            <BrandMark />
            <span>NovaIQ</span>
          </a>
          <nav aria-label="Quick Links">
            <p>Quick Links</p>
            {["Home", "Funktionen", "Workflow", "Cases"].map((item) => (
              <a href={item === "Home" ? "#top" : `#${item.toLowerCase()}`} key={item}>{item}</a>
            ))}
          </nav>
          <nav aria-label="Company Links">
            <p>Company</p>
            {["Preise", "FAQ", "Demo", "Kontakt"].map((item) => (
              <a href={item === "Demo" || item === "Kontakt" ? "#kontakt" : `#${item.toLowerCase()}`} key={item}>{item}</a>
            ))}
          </nav>
          <div className="nq-newsletter">
            <p>System Notes</p>
            <h2>Smarter werden über KI, Content und Automatisierung.</h2>
            <form onSubmit={(event) => event.preventDefault()}>
              <input type="email" placeholder="E-Mail-Adresse" aria-label="E-Mail-Adresse" />
              <button type="submit">Eintragen</button>
            </form>
          </div>
        </div>
        <strong aria-hidden="true">NovaIQ</strong>
        <div className="nq-footer-bottom">
          <p>AI Content Workflows für B2B Teams.</p>
          <span>© 2026 NovaIQ</span>
        </div>
      </div>
    </footer>
  );
}

export function NovaIQExperience() {
  const rootRef = useRef<HTMLElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const sectionIds = useMemo(() => ["funktionen", "workflow", "cases", "preise", "faq", "kontakt"], []);
  const activeSection = useActiveSection(sectionIds);
  const progress = useScrollProgress(rootRef);
  const { isOpen, setIsOpen } = useMenuState();
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0);

  useCursor(rootRef, reducedMotion);
  useNovaIQMotion(rootRef, reducedMotion, setActiveWorkflowStep);

  useEffect(() => {
    const rootElement = rootRef.current;
    if (!rootElement) return undefined;

    const scrollToHash = (hash: string, shouldPushState = false) => {
      const id = hash.replace("#", "");
      const target = document.getElementById(id);
      if (!target) return false;

      target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
      if (shouldPushState && window.location.hash !== hash) {
        window.history.pushState(null, "", hash);
      }
      return true;
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest<HTMLAnchorElement>("a[href^='#']");
      const hash = link?.getAttribute("href");

      if (!hash || hash === "#") return;
      if (scrollToHash(hash, true)) {
        event.preventDefault();
        setIsOpen(false);
      }
    };

    rootElement.addEventListener("click", handleClick);

    const timeoutIds: number[] = [];

    if (window.location.hash) {
      [0, 180, 700].forEach((delay) => {
        const timeoutId = window.setTimeout(() => {
          scrollToHash(window.location.hash);
        }, delay);
        timeoutIds.push(timeoutId);
      });
    }

    return () => {
      rootElement.removeEventListener("click", handleClick);
      timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, [reducedMotion, setIsOpen]);

  return (
    <main className="nq-page" ref={rootRef}>
      <div className="nq-noise" aria-hidden="true" />
      <div className="nq-cursor" aria-hidden="true" />
      <Header
        activeSection={activeSection}
        isMenuOpen={isOpen}
        onMenuToggle={() => setIsOpen((current) => !current)}
        progress={progress}
      />
      <MenuOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <Hero />
      <NeuralText />
      <CapabilityRow />
      {showExtendedProofSections ? <ImpactStats /> : null}
      <MediaCTA />
      <CaseStudies />
      <WorkflowCanvas activeStep={activeWorkflowStep} />
      <PerformanceDashboard />
      <LongTermSystem />
      {showExtendedProofSections ? (
        <>
          <ProductTabs />
          <Integrations />
          <Testimonials />
          <Insights />
        </>
      ) : null}
      <FAQ />
      <Pricing />
      <ContactSection />
      <Footer />
    </main>
  );
}
