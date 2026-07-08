"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./ConlyraDirectorShell.module.css";

const manifestoWords =
  "Verbinden Sie Daten Tools und Teams mit KI-Agenten die Kontext verstehen Entscheidungen vorbereiten und Arbeit kontrolliert ausführen".split(
    " ",
  );

const heroCapabilities = [
  ["01", "AI Strategy", "#system"],
  ["02", "Custom Agents", "/ai-agenten"],
  ["03", "Workflow Systems", "#use-cases"],
  ["04", "Private Intelligence", "#trust"],
] as const;

const quickLinks = [
  ["Home", "#director-top"],
  ["AI-Agenten", "/ai-agenten"],
  ["System", "#system"],
  ["Anwendungen", "#use-cases"],
  ["Wirkung", "#impact"],
  ["Integrationen", "#integrations"],
  ["Kontakt", "#contact"],
] as const;

const systemLinks = [
  ["Über CONLYRA", "#director-manifesto"],
  ["Demo buchen", "#contact"],
  ["Datenschutz", "/datenschutz"],
  ["Impressum", "/impressum"],
  ["Workflow Audit", "#contact"],
] as const;

const hoverReels = [
  {
    no: "01",
    label: "AI Strategy",
    title: "Potenzial wird zur Roadmap.",
    meta: "Audit / Priorisierung / Governance",
    video: "/media/AdobeStock_444039087.mp4",
    href: "#system",
  },
  {
    no: "02",
    label: "Custom Agents",
    title: "Agenten mit Rolle, Kontext und Grenzen.",
    meta: "Memory / Tools / Human Gates",
    video: "/media/AdobeStock_517331471.mp4",
    href: "/ai-agenten",
  },
  {
    no: "03",
    label: "Workflow Systems",
    title: "Arbeit bewegt sich durch ein System.",
    meta: "Routing / Actions / Audit Trail",
    video: "/media/AdobeStock_1558014909.mp4",
    href: "#use-cases",
  },
  {
    no: "04",
    label: "Private Intelligence",
    title: "Unternehmenswissen wird ausführbar.",
    meta: "Search / RAG / Private Context",
    video: "/media/AdobeStock_1525614966.mp4",
    href: "#trust",
  },
] as const;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function ConlyraDirectorShell() {
  const shellRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeReel, setActiveReel] = useState(0);
  const [previewVisible, setPreviewVisible] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle("conlyra-director-menu-open", menuOpen);

    if (menuOpen) {
      const closeOnEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") setMenuOpen(false);
      };
      window.addEventListener("keydown", closeOnEscape);
      return () => {
        html.classList.remove("conlyra-director-menu-open");
        window.removeEventListener("keydown", closeOnEscape);
      };
    }

    return () => html.classList.remove("conlyra-director-menu-open");
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

  const closeMenuAndNavigate = () => setMenuOpen(false);

  return (
    <div className={styles.shell} ref={shellRef}>
      <header className={styles.nav} data-conlyra-director-nav>
        <a className={styles.brand} href="#director-top" aria-label="CONLYRA Startseite">
          <img src="/conlyra-logo.svg" alt="CONLYRA" />
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
          <span />
        </button>
      </header>

      <div className={`${styles.menu} ${menuOpen ? styles.menuOpen : ""}`} aria-hidden={!menuOpen}>
        <section className={styles.menuLeft} aria-label="CONLYRA Menü Intro">
          <video autoPlay loop muted playsInline preload="metadata" aria-hidden="true">
            <source src="/media/AdobeStock_1499424979.mp4" type="video/mp4" />
          </video>
          <div className={styles.menuLeftShade} aria-hidden="true" />

          <a className={styles.menuBrand} href="#director-top" onClick={closeMenuAndNavigate}>
            <img src="/conlyra-logo.svg" alt="CONLYRA" />
          </a>

          <div className={styles.menuEditorial}>
            <p><span>CONLYRA</span> / MENU / 2026</p>
            <h2>Verbinden Sie Daten, Tools und Workflows zu kontrollierter Intelligenz<span>.</span></h2>
          </div>

          <div className={styles.menuSystemMeta}>
            <div><i /><span>SYSTEM ONLINE</span><strong>24 / 7 / 365</strong></div>
            <div><i /><span>REGION</span><strong>GERMANY / DACH</strong></div>
            <div><i /><span>STATUS</span><strong>CONTROLLED INTELLIGENCE</strong></div>
          </div>
        </section>

        <section className={styles.menuRight} aria-label="CONLYRA Navigation">
          <div className={styles.menuLinksPanel}>
            <button className={styles.menuClose} type="button" aria-label="Menü schließen" onClick={() => setMenuOpen(false)}>
              <span />
              <span />
            </button>

            <div className={styles.menuLinkColumns}>
              <nav aria-label="Quick Links">
                <small>QUICK LINKS</small>
                {quickLinks.map(([label, href]) => (
                  <Link href={href} key={label} onClick={closeMenuAndNavigate}>
                    <span>{label}</span><Arrow />
                  </Link>
                ))}
              </nav>

              <nav aria-label="System Links">
                <small>SYSTEM LINKS</small>
                {systemLinks.map(([label, href]) => (
                  <Link href={href} key={label} onClick={closeMenuAndNavigate}>
                    <span>{label}</span><Arrow />
                  </Link>
                ))}
              </nav>
            </div>

            <div className={styles.menuCtaLine}>
              <span>BEREIT FÜR DEN NÄCHSTEN SCHRITT?</span>
              <a href="#contact" onClick={closeMenuAndNavigate}>Demo anfordern <Arrow /></a>
            </div>
          </div>

          <Link className={styles.menuVideoPanel} href="/ai-agenten" onClick={closeMenuAndNavigate}>
            <video autoPlay loop muted playsInline preload="metadata" aria-hidden="true">
              <source src="/media/AdobeStock_517331471.mp4" type="video/mp4" />
            </video>
            <div className={styles.menuVideoShade} aria-hidden="true" />
            <div className={styles.menuVideoTopline}>
              <span>CONLYRA SYSTEMS</span>
              <strong>AI AGENT SYSTEMS</strong>
            </div>
            <div className={styles.menuVideoFooter}>
              <div><i>▶</i><span>PRODUCT CHAPTER</span><strong>ROLE / CONTEXT / CONTROL</strong></div>
              <div><span>AI-AGENTEN ÖFFNEN</span><Arrow /></div>
            </div>
          </Link>
        </section>
      </div>

      <section className={styles.hero} id="director-top" aria-labelledby="director-hero-title">
        <div className={styles.heroVideo} aria-hidden="true">
          <video autoPlay loop muted playsInline preload="auto">
            <source src="/media/AdobeStock_444039087.mp4" type="video/mp4" />
          </video>
        </div>
        <div className={styles.heroOverlay} aria-hidden="true" />
        <div className={styles.heroGrid} aria-hidden="true" />

        <div className={styles.heroLayout}>
          <div className={styles.heroCopy}>
            <p className={styles.heroKicker}>CONLYRA / AI SYSTEMS</p>
            <h1 id="director-hero-title">
              <span>KI-Agenten einsetzen.</span>
              <span>Prozesse skalieren.</span>
            </h1>
            <p className={styles.heroSubline}>
              Intelligente Workflows, autonome Agenten und private Daten — sicher orchestriert, kontrollierbar und messbar im Geschäftsbetrieb.
            </p>
            <a className={styles.heroPrimary} href="#contact">
              <span><Arrow /></span>
              Workflow starten
            </a>
          </div>

          <nav className={styles.heroCapabilities} aria-label="CONLYRA Leistungen">
            {heroCapabilities.map(([no, label, href]) => (
              <Link href={href} key={no}>
                <small>{no}</small>
                <i />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className={styles.heroScroll} aria-hidden="true">
          <span>SCROLL</span>
          <i />
        </div>

        <div className={styles.heroSystemMeta} aria-hidden="true">
          <span>SYS&nbsp;&nbsp;CONLYRA-OS 1.0</span>
          <span>SEC&nbsp;&nbsp;PRIVATE INFRASTRUCTURE</span>
          <span>REG&nbsp;&nbsp;DACH / EUROPE</span>
        </div>
      </section>

      <section
        className={styles.manifesto}
        id="director-manifesto"
        data-director-manifesto
        aria-labelledby="director-manifesto-title"
      >
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
            <Link
              href={item.href}
              className={index === activeReel ? styles.reelActive : ""}
              key={item.no}
              onPointerEnter={() => {
                setActiveReel(index);
                setPreviewVisible(true);
              }}
              onFocus={() => {
                setActiveReel(index);
                setPreviewVisible(true);
              }}
            >
              <small>{item.no}</small>
              <div><strong>{item.label}</strong><span>{item.meta}</span></div>
              <h3>{item.title}</h3>
              <Arrow />
            </Link>
          ))}
        </div>

        <div
          className={`${styles.hoverPreview} ${previewVisible ? styles.hoverPreviewVisible : ""}`}
          ref={previewRef}
          aria-hidden="true"
        >
          <video key={hoverReels[activeReel].video} autoPlay muted loop playsInline preload="metadata">
            <source src={hoverReels[activeReel].video} type="video/mp4" />
          </video>
          <div><span>{hoverReels[activeReel].label}</span><strong>CONLYRA / 0{activeReel + 1}</strong></div>
        </div>
      </section>
    </div>
  );
}
