"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./ConlyraCommandCenter.module.css";

type CommandItem = {
  code: string;
  title: string;
  command: string;
  href: string;
  category: "PRODUCT" | "SYSTEM" | "ACTION";
  description: string;
  stack: string;
  signal: string;
  keywords: string[];
};

const commands: CommandItem[] = [
  {
    code: "01",
    title: "AI Agents",
    command: "Explore AI Agents",
    href: "/ai-agenten",
    category: "PRODUCT",
    description: "Rollenbasierte AI-Systeme, die Kontext verstehen, Werkzeuge nutzen und kontrolliert handeln.",
    stack: "ROLE / CONTEXT / TOOLS / CONTROL",
    signal: "AGENT SYSTEM READY",
    keywords: ["agent", "agents", "ai", "rollen", "tools"],
  },
  {
    code: "02",
    title: "Workflow Automation",
    command: "Open Flow Engine",
    href: "/workflow-automatisierung",
    category: "PRODUCT",
    description: "Operative Abläufe, Signale und Systemaktionen als kontrollierte, nachvollziehbare Flows.",
    stack: "SIGNAL / LOGIC / ACTION / TRACE",
    signal: "FLOW ENGINE READY",
    keywords: ["workflow", "automation", "flow", "prozesse"],
  },
  {
    code: "03",
    title: "Private Intelligence",
    command: "Ask Private Intelligence",
    href: "/private-intelligence",
    category: "PRODUCT",
    description: "Unternehmenswissen als private, kontextbezogene Intelligenzschicht für sichere Entscheidungen.",
    stack: "DATA / CONTEXT / ACCESS / ANSWER",
    signal: "PRIVATE CONTEXT ONLINE",
    keywords: ["private", "intelligence", "daten", "wissen", "context"],
  },
  {
    code: "04",
    title: "Voice AI",
    command: "Open Voice Channel",
    href: "/voice-ai",
    category: "PRODUCT",
    description: "Natürliche Gespräche, Intent-Erkennung, Systemaktionen und Human Handoff in einem Voice-System.",
    stack: "LISTEN / UNDERSTAND / ACT / TRACE",
    signal: "VOICE CHANNEL READY",
    keywords: ["voice", "telefon", "anruf", "call", "sprache"],
  },
  {
    code: "S1",
    title: "System Architecture",
    command: "Explore CONLYRA System",
    href: "/#system",
    category: "SYSTEM",
    description: "Die Systemlogik hinter Agenten, Workflows, Kontext und kontrollierter Ausführung.",
    stack: "AGENTS / FLOWS / INTELLIGENCE / CONTROL",
    signal: "SYSTEM MAP AVAILABLE",
    keywords: ["system", "architecture", "os", "plattform"],
  },
  {
    code: "S2",
    title: "Applications",
    command: "View Use Cases",
    href: "/#use-cases",
    category: "SYSTEM",
    description: "Konkrete Einsatzfelder für Sales, Service, Operations und weitere operative Bereiche.",
    stack: "SALES / SUPPORT / OPS / PEOPLE",
    signal: "APPLICATION MAP READY",
    keywords: ["use cases", "anwendungen", "sales", "support", "operations"],
  },
  {
    code: "A1",
    title: "Workflow Audit",
    command: "Start Workflow Audit",
    href: "/#contact",
    category: "ACTION",
    description: "Ein erster strukturierter Blick auf Prozesse, Potenziale, Risiken und sinnvolle AI-Automatisierung.",
    stack: "PROCESS / POTENTIAL / CONTROL / PILOT",
    signal: "AUDIT CHANNEL OPEN",
    keywords: ["audit", "kontakt", "demo", "beratung", "pilot"],
  },
];

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT" ||
    target.isContentEditable
  );
}

export function ConlyraCommandCenter() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredCommands = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return commands;

    return commands.filter((item) =>
      [item.title, item.command, item.category, item.description, item.stack, ...item.keywords]
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    );
  }, [query]);

  const activeCommand = filteredCommands[activeIndex] ?? filteredCommands[0] ?? commands[0];

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    const handleGlobalKeydown = (event: KeyboardEvent) => {
      const commandShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
      const slashShortcut = event.key === "/" && !isTypingTarget(event.target);

      if (commandShortcut || slashShortcut) {
        event.preventDefault();
        setOpen((current) => !current);
        return;
      }

      if (!open) return;

      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((current) =>
          filteredCommands.length ? (current + 1) % filteredCommands.length : 0,
        );
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((current) =>
          filteredCommands.length
            ? (current - 1 + filteredCommands.length) % filteredCommands.length
            : 0,
        );
      }

      if (event.key === "Enter" && filteredCommands.length) {
        event.preventDefault();
        const activeLink = document.querySelector<HTMLAnchorElement>(
          `[data-conlyra-command-index="${activeIndex}"]`,
        );
        activeLink?.click();
      }
    };

    window.addEventListener("keydown", handleGlobalKeydown);
    return () => window.removeEventListener("keydown", handleGlobalKeydown);
  }, [activeIndex, filteredCommands.length, open]);

  useEffect(() => {
    if (!open) return;

    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    const focusFrame = window.requestAnimationFrame(() => inputRef.current?.focus());

    return () => {
      window.cancelAnimationFrame(focusFrame);
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
    };
  }, [open]);

  const openCenter = () => {
    setQuery("");
    setActiveIndex(0);
    setOpen(true);
  };

  const closeCenter = () => setOpen(false);

  return (
    <>
      <button
        className={styles.trigger}
        type="button"
        onClick={openCenter}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className={styles.triggerDot} aria-hidden="true" />
        <span>PRESS / TO COMMAND</span>
        <kbd>⌘ K</kbd>
      </button>

      <div className={styles.shell} data-open={open} aria-hidden={!open}>
        <button className={styles.backdrop} type="button" onClick={closeCenter} aria-label="Command Center schließen" />

        <section
          className={styles.panel}
          role="dialog"
          aria-modal="true"
          aria-label="CONLYRA Command Center"
        >
          <header className={styles.header}>
            <div className={styles.identity}>
              <img src="/conlyra-logo.svg" alt="" />
              <div>
                <small>CONLYRA OS / GLOBAL COMMAND</small>
                <strong>COMMAND CENTER</strong>
              </div>
            </div>

            <button className={styles.close} type="button" onClick={closeCenter} aria-label="Command Center schließen">
              <span />
              <span />
            </button>
          </header>

          <div className={styles.searchRow}>
            <span aria-hidden="true">›</span>
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search systems, products or actions..."
              aria-label="Command Center durchsuchen"
            />
            <kbd>ESC</kbd>
          </div>

          <div className={styles.body}>
            <div className={styles.commandList} role="listbox" aria-label="CONLYRA Befehle">
              <div className={styles.listMeta}>
                <span>AVAILABLE COMMANDS</span>
                <strong>{String(filteredCommands.length).padStart(2, "0")}</strong>
              </div>

              <div className={styles.rows}>
                {filteredCommands.map((item, index) => (
                  <Link
                    href={item.href}
                    key={item.code}
                    data-conlyra-command-index={index}
                    className={styles.row}
                    data-active={index === activeIndex}
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    onClick={closeCenter}
                    role="option"
                    aria-selected={index === activeIndex}
                  >
                    <small>{item.code}</small>
                    <div>
                      <strong>{item.command}</strong>
                      <span>{item.category}</span>
                    </div>
                    <i aria-hidden="true">↗</i>
                  </Link>
                ))}

                {!filteredCommands.length && (
                  <div className={styles.emptyState}>
                    <small>NO MATCH</small>
                    <strong>No system command found.</strong>
                    <span>Try agent, workflow, voice, private or audit.</span>
                  </div>
                )}
              </div>
            </div>

            <aside className={styles.preview} aria-live="polite">
              <div className={styles.previewTopline}>
                <span>ACTIVE SYSTEM PREVIEW</span>
                <strong><i /> ONLINE</strong>
              </div>

              <div className={styles.previewCore}>
                <small>PRODUCT / {activeCommand.code}</small>
                <h2>{activeCommand.title}</h2>
                <p>{activeCommand.description}</p>

                <div className={styles.stackLine}>
                  <span>STACK</span>
                  <strong>{activeCommand.stack}</strong>
                </div>
              </div>

              <div className={styles.systemGraph} aria-hidden="true">
                <span>INPUT</span>
                <i />
                <strong>CONLYRA</strong>
                <i />
                <span>ACTION</span>
              </div>

              <div className={styles.previewFooter}>
                <span>{activeCommand.signal}</span>
                <b>OPEN PRODUCT ↗</b>
              </div>
            </aside>
          </div>

          <footer className={styles.footer}>
            <div><kbd>↑</kbd><kbd>↓</kbd><span>NAVIGATE</span></div>
            <div><kbd>↵</kbd><span>OPEN</span></div>
            <div><kbd>/</kbd><span>COMMAND</span></div>
            <strong>CONLYRA SYSTEMS / 2026</strong>
          </footer>
        </section>
      </div>
    </>
  );
}
