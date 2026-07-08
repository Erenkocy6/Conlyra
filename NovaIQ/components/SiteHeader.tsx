"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const navItems = [
  ["Produkt", "/#produkt"],
  ["Lösungen", "/#loesungen"],
  ["Automationen", "/#automationen"],
  ["Branchen", "/#branchen"],
  ["Preise", "/#preise"],
  ["Kontakt", "/#kontakt"],
];

const menuLinks = [
  ["Produkt", "/#produkt", "/media/novaiq-control-room-hero.png", "System ansehen"],
  ["Automationen", "/#automationen", "/media/novaiq-capture-wall.png", "Workflows entdecken"],
  ["Branchen", "/#branchen", "/media/novaiq-review-gate.png", "Zielgruppen ansehen"],
  ["Kontakt", "/#kontakt", "/media/novaiq-output-queue.png", "Erstgespräch sichern"],
];

const menuDock = [
  ["01", "Marketing", "Content automatisiert"],
  ["02", "Support", "Antworten vorbereitet"],
  ["03", "Leads", "Follow-up aktiv"],
  ["04", "Ops", "Tasks geroutet"],
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", menuOpen);

    return () => {
      document.documentElement.classList.remove("menu-open");
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <header className="site-header">
        <Link
          href="/#top"
          className="brand-mark"
          aria-label="NovaIQ Startseite"
          data-cursor-label="home"
        >
          <span aria-hidden="true" />
          NovaIQ
        </Link>
        <nav aria-label="Hauptnavigation">
          {navItems.map(([label, href]) => (
            <Link key={href} href={href} data-cursor-label={label}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="site-header__actions">
          <Link className="header-cta" href="/#kontakt" data-cursor-label="call">
            Erstgespräch
          </Link>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={menuOpen}
            data-cursor-label={menuOpen ? "close" : "menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={`site-menu${menuOpen ? " is-open" : ""}`} aria-hidden={!menuOpen}>
        <div className="site-menu__inner">
          <div className="site-menu__meta">
            <p className="eyebrow">NovaIQ Navigation</p>
            <p>Marketing, Support, Leads und interne Prozesse in einem AI-Agent-System.</p>
          </div>
          <nav className="site-menu__links" aria-label="Menü Navigation">
            {menuLinks.map(([label, href, image, cursor]) => (
              <Link
                href={href}
                key={href}
                onClick={closeMenu}
                data-cursor-label={cursor}
              >
                <span data-menu-link>{label}</span>
                <span data-menu-link aria-hidden="true">
                  {label}
                </span>
                <Image src={image} alt="" width={320} height={220} aria-hidden="true" />
              </Link>
            ))}
          </nav>
          <div className="site-menu__preview" aria-label="NovaIQ Menü Flow">
            <span>Agent route</span>
            <i aria-hidden="true" />
            <strong>Input &rarr; Agent &rarr; Approval &rarr; Output</strong>
          </div>
          <div className="site-menu__dock" aria-label="NovaIQ Menü Status">
            {menuDock.map(([index, title, value]) => (
              <article key={title}>
                <span>{index}</span>
                <strong>{title}</strong>
                <p>{value}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
