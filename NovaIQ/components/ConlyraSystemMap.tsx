"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./ConlyraSystemMap.module.css";

type Product = {
  code: string;
  name: string;
  label: string;
  href: string;
  command: string;
  stack: string;
  description: string;
  question: string;
  signal: string;
  position: { x: number; y: number };
};

const products: Product[] = [
  { code: "01", name: "AI Agents", label: "EXECUTION", href: "/ai-agenten", command: "EXPLORE AI AGENTS", stack: "ROLE / CONTEXT / TOOLS / CONTROL", description: "Rollenbasierte AI-Systeme, die Kontext verstehen, Werkzeuge nutzen und kontrolliert handeln.", question: "WER ARBEITET?", signal: "AGENT SYSTEM READY", position: { x: 15, y: 21 } },
  { code: "02", name: "Workflow Automation", label: "ORCHESTRATION", href: "/workflow-automatisierung", command: "OPEN FLOW ENGINE", stack: "SIGNAL / LOGIC / ACTION / TRACE", description: "Operative Abläufe, Signale und Aktionen als kontrollierte, nachvollziehbare Systemflüsse.", question: "WIE LÄUFT ARBEIT?", signal: "FLOW ENGINE READY", position: { x: 15, y: 74 } },
  { code: "03", name: "Private Intelligence", label: "CONTEXT", href: "/private-intelligence", command: "ASK PRIVATE INTELLIGENCE", stack: "DATA / CONTEXT / ACCESS / ANSWER", description: "Unternehmenswissen als private, kontrollierte Kontextschicht für Menschen und Agenten.", question: "WELCHER KONTEXT?", signal: "PRIVATE CONTEXT ONLINE", position: { x: 34, y: 10 } },
  { code: "04", name: "Voice AI", label: "INTERACTION", href: "/voice-ai", command: "OPEN VOICE CHANNEL", stack: "LISTEN / UNDERSTAND / ACT / TRACE", description: "Natürliche Gespräche, Intent-Erkennung, Systemaktionen und Human Handoff in einem Voice-System.", question: "WIE INTERAGIERT DAS SYSTEM?", signal: "VOICE CHANNEL READY", position: { x: 66, y: 10 } },
  { code: "05", name: "AI Readiness", label: "STRATEGY", href: "/ai-strategy", command: "START READINESS SCAN", stack: "PEOPLE / DATA / PROCESS / GOVERNANCE", description: "Menschen, Daten, Prozesse und Governance bewerten, um die richtigen AI-Piloten zu priorisieren.", question: "WO SOLLTE AI STARTEN?", signal: "READINESS ENGINE ONLINE", position: { x: 85, y: 21 } },
  { code: "06", name: "Integrations", label: "CONNECTIONS", href: "/integrationen", command: "OPEN OPERATING STACK", stack: "CONNECT / READ / WRITE / TRIGGER / TRACE", description: "CRM, ERP, Kommunikation und Datenquellen als kontrollierter Operating Stack verbinden.", question: "WOMIT ARBEITET DAS SYSTEM?", signal: "OPERATING STACK ONLINE", position: { x: 85, y: 74 } },
  { code: "07", name: "Control Layer", label: "GOVERNANCE", href: "/governance-security", command: "OPEN CONTROL ROOM", stack: "IDENTITY / SCOPE / POLICY / APPROVAL / TRACE", description: "Identitäten, Rechte, Freigaben, Risiken und Traceability für kontrollierte AI-Ausführung.", question: "WAS DARF DAS SYSTEM?", signal: "CONTROL LAYER ENFORCING", position: { x: 50, y: 88 } },
];

const pathSequence = ["05", "03", "01", "02", "06", "04", "07"] as const;

export function ConlyraSystemMap() {
  const rootRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = products[activeIndex];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const elements = Array.from(root.querySelectorAll<HTMLElement>("[data-system-map-reveal]"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).dataset.visible = "true";
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % products.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [paused]);

  const activePathIndex = useMemo(() => pathSequence.findIndex((code) => code === active.code), [active.code]);

  return (
    <section
      className={styles.root}
      id="system-map"
      ref={rootRef}
      aria-labelledby="conlyra-system-map-title"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
      }}
    >
      <div className={styles.backGrid} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.container}>
        <header className={styles.head} data-system-map-reveal>
          <div>
            <p>CONLYRA SYSTEM MAP / 07 OF 07 ONLINE</p>
            <h2 id="conlyra-system-map-title">Sieben Product Worlds.<span>Ein Operating System.</span></h2>
          </div>
          <aside>
            <span>COMPLETE SYSTEM ARC</span>
            <strong>STRATEGY → CONTEXT → EXECUTION → CONTROL</strong>
            <small>Wählen Sie einen Node, um das System zu erkunden.</small>
          </aside>
        </header>

        <div className={styles.systemShell} data-system-map-reveal>
          <div className={styles.mapPanel}>
            <div className={styles.mapTopbar}><span>CONLYRA / GLOBAL SYSTEM GRAPH</span><strong><i /> 07 / 07 ONLINE</strong></div>
            <div className={styles.mapStage}>
              <div className={styles.grid} aria-hidden="true" />
              <svg className={styles.paths} viewBox="0 0 1000 700" preserveAspectRatio="none" aria-hidden="true">
                <path d="M150 147 C270 150 300 250 500 350" />
                <path d="M150 518 C285 510 320 420 500 350" />
                <path d="M340 70 C400 160 430 220 500 350" />
                <path d="M660 70 C600 160 570 220 500 350" />
                <path d="M850 147 C730 150 700 250 500 350" />
                <path d="M850 518 C715 510 680 420 500 350" />
                <path d="M500 616 C500 530 500 455 500 350" />
                <path className={styles.orbitPath} d="M150 147 C330 10 670 10 850 147 C980 280 980 470 850 518 C660 700 340 700 150 518 C20 420 20 250 150 147Z" />
              </svg>
              <div className={styles.coreNode}><span>CONLYRA</span><strong>OS</strong><small>CONTROLLED INTELLIGENCE</small><i aria-hidden="true" /></div>
              {products.map((product, index) => (
                <button key={product.code} type="button" className={styles.productNode} data-active={activeIndex === index} style={{ left: `${product.position.x}%`, top: `${product.position.y}%` }} onClick={() => setActiveIndex(index)} onMouseEnter={() => setActiveIndex(index)} aria-pressed={activeIndex === index} aria-label={`${product.name} auswählen`}>
                  <small>{product.code}</small><strong>{product.name}</strong><span>{product.label}</span><i aria-hidden="true" />
                </button>
              ))}
              <div className={styles.activeSignal} key={active.code} aria-hidden="true"><span>{active.code}</span><strong>{active.signal}</strong></div>
            </div>
            <div className={styles.mapFooter}><span>GRAPH / INTERACTIVE</span><span>ACTIVE / {active.code}</span><span>STATUS / ALL SYSTEMS ONLINE</span></div>
          </div>

          <aside className={styles.previewPanel}>
            <header><span>ACTIVE PRODUCT WORLD</span><strong>{active.code} / 07</strong></header>
            <div className={styles.previewCore} key={active.code}>
              <small>{active.label}</small><h3>{active.name}</h3><p>{active.description}</p>
              <div className={styles.questionBlock}><span>SYSTEM QUESTION</span><strong>{active.question}</strong></div>
              <div className={styles.stackBlock}><span>PRODUCT STACK</span><strong>{active.stack}</strong></div>
            </div>
            <div className={styles.sequence}>
              <span>SYSTEM ARC</span>
              <div>
                {pathSequence.map((code, index) => (
                  <button key={code} type="button" data-active={activePathIndex === index} onClick={() => setActiveIndex(products.findIndex((product) => product.code === code))} aria-label={`Product ${code} auswählen`}>{code}</button>
                ))}
              </div>
            </div>
            <Link href={active.href} className={styles.openProduct}><span>{active.command}</span><b>OPEN PRODUCT ↗</b></Link>
          </aside>
        </div>

        <div className={styles.systemArc} data-system-map-reveal>
          {pathSequence.map((code, index) => {
            const product = products.find((item) => item.code === code)!;
            return (
              <button type="button" key={product.code} data-active={active.code === product.code} onClick={() => setActiveIndex(products.findIndex((item) => item.code === product.code))}>
                <small>{String(index + 1).padStart(2, "0")}</small><span>{product.question}</span><strong>{product.name}</strong><i aria-hidden="true">→</i>
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.rail}><span>CONLYRA SYSTEM MAP / COMPLETE</span><span>07 PRODUCTS / 01 OPERATING SYSTEM</span></div>
    </section>
  );
}
