"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./ConlyraGlobalNav.module.css";

const quickLinks = [
  ["Startseite", "/"],
  ["AI-Agenten", "/ai-agenten"],
  ["Workflow-Automatisierung", "/workflow-automatisierung"],
  ["System", "/#system"],
  ["Anwendungen", "/#use-cases"],
  ["Wirkung", "/#impact"],
  ["Kontakt", "/#contact"],
] as const;

const systemLinks = [
  ["Private Intelligence", "/#trust"],
  ["Integrationen", "/#integrations"],
  ["Workflow Audit", "/#contact"],
  ["Datenschutz", "/datenschutz"],
  ["Impressum", "/impressum"],
] as const;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function ConlyraGlobalNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle("conlyra-global-menu-open", open);

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      html.classList.remove("conlyra-global-menu-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <header className={styles.nav} data-conlyra-global-nav>
        <Link className={styles.brand} href="/" aria-label="CONLYRA Startseite">
          <img src="/conlyra-logo.svg" alt="CONLYRA" />
        </Link>

        <button
          className={styles.toggle}
          type="button"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <div className={`${styles.menu} ${open ? styles.menuOpen : ""}`} aria-hidden={!open}>
        <section className={styles.menuLeft}>
          <video autoPlay loop muted playsInline preload="metadata" aria-hidden="true">
            <source src="/media/AdobeStock_1499424979.mp4" type="video/mp4" />
          </video>
          <div className={styles.menuLeftShade} aria-hidden="true" />

          <Link className={styles.menuBrand} href="/" onClick={closeMenu}>
            <img src="/conlyra-logo.svg" alt="CONLYRA" />
          </Link>

          <div className={styles.menuEditorial}>
            <p><span>CONLYRA</span> / SYSTEM NAVIGATION / 2026</p>
            <h2>Ein System für Agenten, Daten und operative Arbeit<span>.</span></h2>
          </div>

          <div className={styles.menuMeta}>
            <div><i /><span>SYSTEM</span><strong>CONLYRA OS</strong></div>
            <div><i /><span>REGION</span><strong>GERMANY / DACH</strong></div>
            <div><i /><span>STATUS</span><strong>CONTROLLED INTELLIGENCE</strong></div>
          </div>
        </section>

        <section className={styles.menuRight}>
          <div className={styles.linksPanel}>
            <button className={styles.close} type="button" aria-label="Menü schließen" onClick={() => setOpen(false)}>
              <span />
              <span />
            </button>

            <div className={styles.linkColumns}>
              <nav aria-label="Quick Links">
                <small>QUICK LINKS</small>
                {quickLinks.map(([label, href]) => (
                  <Link href={href} key={label} onClick={closeMenu}>
                    <span>{label}</span><Arrow />
                  </Link>
                ))}
              </nav>

              <nav aria-label="System Links">
                <small>SYSTEM LINKS</small>
                {systemLinks.map(([label, href]) => (
                  <Link href={href} key={label} onClick={closeMenu}>
                    <span>{label}</span><Arrow />
                  </Link>
                ))}
              </nav>
            </div>

            <div className={styles.menuCta}>
              <span>START WITH A REAL WORKFLOW.</span>
              <Link href="/#contact" onClick={closeMenu}>Demo anfordern <Arrow /></Link>
            </div>
          </div>

          <Link className={styles.videoPanel} href="/ai-agenten" onClick={closeMenu}>
            <video autoPlay loop muted playsInline preload="metadata" aria-hidden="true">
              <source src="/media/AdobeStock_517331471.mp4" type="video/mp4" />
            </video>
            <div className={styles.videoShade} aria-hidden="true" />
            <div className={styles.videoTopline}>
              <span>PRODUCT / 01</span>
              <strong>AI AGENTS</strong>
            </div>
            <div className={styles.videoFooter}>
              <div><i>▶</i><span>AGENT SYSTEMS</span><strong>ROLE / CONTEXT / CONTROL</strong></div>
              <div><span>UNTERSEITE ÖFFNEN</span><Arrow /></div>
            </div>
          </Link>
        </section>
      </div>
    </>
  );
}
