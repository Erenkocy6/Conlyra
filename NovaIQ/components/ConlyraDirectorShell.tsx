"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import styles from "./ConlyraDirectorShell.module.css";

const navItems = [
  ["System", "#system"],
  ["Anwendungen", "#use-cases"],
  ["Wirkung", "#impact"],
  ["Vertrauen", "#trust"],
  ["Kontakt", "#contact"],
];

const manifestoWords =
  "Verbinden Sie Daten Tools und Teams mit KI-Agenten die Kontext verstehen Entscheidungen vorbereiten und Arbeit kontrolliert ausführen".split(
    " ",
  );

const hoverReels = [
  {
    no: "01",
    label: "AI Strategy",
    title: "Potenzial wird zur Roadmap.",
    meta: "Audit / Priorisierung / Governance",
    video: "/media/AdobeStock_444039087.mp4",
  },
  {
    no: "02",
    label: "Custom Agents",
    title: "Agenten mit Rolle, Kontext und Grenzen.",
    meta: "Memory / Tools / Human Gates",
    video: "/media/AdobeStock_517331471.mp4",
  },
  {
    no: "03",
    label: "Workflow Systems",
    title: "Arbeit bewegt sich durch ein System.",
    meta: "Routing / Actions / Audit Trail",
    video: "/media/AdobeStock_1558014909.mp4",
  },
  {
    no: "04",
    label: "Private Intelligence",
    title: "Unternehmenswissen wird ausführbar.",
    meta: "Search / RAG / Private Context",
    video: "/media/AdobeStock_1525614966.mp4",
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function ConlyraDirectorShell() {
  const shellRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("system");
  const [activeReel, setActiveReel] = useState(0);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        setScrollProgress(Math.min(1, Math.max(0, window.scrollY / max)));

        const sections = ["system", "use-cases", "impact", "trust", "contact"];
        let current = sections[0];
        sections.forEach((id) => {
          const section = document.getElementById(id);
          if (section && section.getBoundingClientRect().top <= window.innerHeight * 0.42) {
            current = id;
          }
        });
        setActiveSection(current);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("conlyra-director-menu-open", menuOpen);
    return () => document.documentElement.classList.remove("conlyra-director-menu-open");
  }, [menuOpen]);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    let disposed = false;
    let cleanup: () => void = () => {};

    const setup = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (disposed) return;

      gsap.registerPlugin(ScrollTrigger);
      const section = shell.querySelector<HTMLElement>("[data-director-manifesto]");
      const words = Array.from(shell.querySelectorAll<HTMLElement>("[data-director-word]"));
      if (!section || !words.length) return;

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top 72%",
        end: "bottom 34%",
        scrub: 0.72,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const total = words.length;
          words.forEach((word, index) => {
            const progress = Math.min(1, Math.max(0, self.progress * (total + 1.15) - index));
            word.style.setProperty("--director-fill", `${Math.round(progress * 100)}%`);
          });
        },
      });

      cleanup = () => trigger.kill(true);
      ScrollTrigger.refresh();
    };

    void setup();
    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  useEffect(() => {
    const preview = previewRef.current;
    const section = shellRef.current?.querySelector<HTMLElement>("[data-hover-reel]");
    if (!preview || !section) return;

    let disposed = false;
    let cleanup: () => void = () => {};

    const setup = async () => {
      const { default: gsap } = await import("gsap");
      if (disposed) return;

      const xTo = gsap.quickTo(preview, "x", { duration: 0.5, ease: "power3.out" });
      const yTo = gsap.quickTo(preview, "y", { duration: 0.5, ease: "power3.out" });

      const onMove = (event: PointerEvent) => {
        const rect = section.getBoundingClientRect();
        xTo(event.clientX - rect.left + 24);
        yTo(event.clientY - rect.top - preview.offsetHeight * 0.5);
      };

      section.addEventListener("pointermove", onMove, { passive: true });
      cleanup = () => section.removeEventListener("pointermove", onMove);
    };

    void setup();
    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  const activateReel = (index: number) => {
    setActiveReel(index);
    setPreviewVisible(true);
  };

  return (
    <div className={styles.shell} ref={shellRef}>
      <header
        className={styles.nav}
        data-conlyra-director-nav
        style={{ "--director-progress": scrollProgress } as CSSProperties}
      >
        <a className={styles.brand} href="#director-top" aria-label="CONLYRA Startseite">
          <img src="/conlyra-logo.svg" alt="" aria-hidden="true" />
          <strong>CONLYRA</strong>
        </a>

        <nav className={styles.navLinks} aria-label="Hauptnavigation">
          {navItems.map(([label, href]) => {
            const id = href.slice(1);
            return (
              <a className={activeSection === id ? styles.navActive : ""} href={href} key={href}>
                {label}
              </a>
            );
          })}
        </nav>

        <a className={styles.navCta} href="#contact">
          Demo <Arrow />
        </a>

        <button
          className={styles.menuToggle}
          type="button"
          aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>

        <i className={styles.navProgress} aria-hidden="true" />
      </header>

      <div className={`${styles.menu} ${menuOpen ? styles.menuOpen : ""}`} aria-hidden={!menuOpen}>
        <div className={styles.menuVisual}>
          <video autoPlay loop muted playsInline preload="metadata">
            <source src="/media/AdobeStock_1499424979.mp4" type="video/mp4" />
          </video>
          <div className={styles.menuVisualCopy}>
            <span>CONLYRA / 2026</span>
            <h2>Private AI agents across the work that slows teams down.</h2>
          </div>
        </div>

        <div className={styles.menuLinksPanel}>
          <button className={styles.menuClose} type="button" aria-label="Menü schließen" onClick={() => setMenuOpen(false)}>
            <span />
            <span />
          </button>
          <small>QUICK LINKS</small>
          <nav>
            {navItems.map(([label, href], index) => (
              <a href={href} key={href} onClick={() => setMenuOpen(false)}>
                <span>0{index + 1}</span>
                <strong>{label}</strong>
                <Arrow />
              </a>
            ))}
          </nav>
          <div className={styles.menuMeta}>
            <span>AI AGENTS</span>
            <span>WORKFLOW SYSTEMS</span>
            <span>PRIVATE INTELLIGENCE</span>
          </div>
        </div>

        <div className={styles.menuPreview}>
          <video autoPlay loop muted playsInline preload="metadata">
            <source src="/media/AdobeStock_444039087.mp4" type="video/mp4" />
          </video>
          <div><span>LIVE PREVIEW</span><strong>CONTROLLED EXECUTION</strong></div>
        </div>
      </div>

      <section className={styles.hero} id="director-top" aria-labelledby="director-hero-title">
        <div className={styles.heroVideo} aria-hidden="true">
          <video autoPlay loop muted playsInline preload="auto">
            <source src="/media/AdobeStock_444039087.mp4" type="video/mp4" />
          </video>
        </div>
        <div className={styles.heroOverlay} aria-hidden="true" />
        <div className={styles.heroGrid} aria-hidden="true" />

        <div className={styles.heroInner}>
          <p className={styles.heroKicker}>PRIVATE KI-AGENTEN / WORKFLOW OS</p>
          <h1 id="director-hero-title">
            <span>KI-Agenten einsetzen.</span>
            <span>Prozesse skalieren.</span>
          </h1>
          <p className={styles.heroSubline}>
            CONLYRA verbindet Daten, Tools und Teams zu kontrollierten Workflows mit messbarem Output.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.heroPrimary} href="#contact">Demo starten <Arrow /></a>
            <a className={styles.heroSecondary} href="#system">Produkt ansehen <Arrow /></a>
          </div>
        </div>

        <div className={styles.heroRail} aria-hidden="true">
          <span>AI SYSTEMS / DACH</span>
          <span>SCROLL TO EXPLORE ↓</span>
        </div>
      </section>

      <section className={styles.manifesto} data-director-manifesto aria-labelledby="director-manifesto-title">
        <div className={styles.manifestoSticky}>
          <p>THE OPERATING SHIFT</p>
          <h2 id="director-manifesto-title">
            {manifestoWords.map((word, index) => (
              <span key={`${word}-${index}`} data-director-word>
                {word}{index < manifestoWords.length - 1 ? " " : ""}
              </span>
            ))}
          </h2>
          <div className={styles.manifestoFooter}>
            <span>NOT ANOTHER AI TOOL.</span>
            <strong>Ein kontrollierbares System für operative Arbeit.</strong>
          </div>
        </div>
      </section>

      <section
        className={styles.hoverReel}
        data-hover-reel
        aria-labelledby="director-capabilities-title"
        onPointerLeave={() => setPreviewVisible(false)}
      >
        <div className={styles.hoverReelHead}>
          <p>WHAT WE BUILD</p>
          <h2 id="director-capabilities-title">Systeme, nicht Spielereien.</h2>
          <span>Hover to explore / 01—04</span>
        </div>

        <div className={styles.hoverReelRows}>
          {hoverReels.map((item, index) => (
            <a
              href="#system"
              className={index === activeReel ? styles.reelActive : ""}
              key={item.no}
              onPointerEnter={() => activateReel(index)}
              onFocus={() => activateReel(index)}
            >
              <small>{item.no}</small>
              <div><strong>{item.label}</strong><span>{item.meta}</span></div>
              <h3>{item.title}</h3>
              <Arrow />
            </a>
          ))}
        </div>

        <div
          className={`${styles.hoverPreview} ${previewVisible ? styles.hoverPreviewVisible : ""}`}
          ref={previewRef}
          aria-hidden="true"
        >
          <video key={hoverReels[activeReel].video} ref={videoRef} autoPlay muted loop playsInline preload="metadata">
            <source src={hoverReels[activeReel].video} type="video/mp4" />
          </video>
          <div><span>{hoverReels[activeReel].label}</span><strong>CONLYRA / 0{activeReel + 1}</strong></div>
        </div>
      </section>
    </div>
  );
}
