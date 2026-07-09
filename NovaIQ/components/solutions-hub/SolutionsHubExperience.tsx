"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./SolutionsHubExperience.module.css";

const solutions = [
  {
    id: "sales",
    no: "01",
    eyebrow: "SALES / REVENUE OPERATIONS",
    title: "AI für Vertrieb",
    statement: "Vom ersten Signal bis zum nächsten Sales-Move.",
    copy: "CONLYRA verbindet Lead Intake, Unternehmensrecherche, CRM-Kontext, Qualifizierung, Follow-up und Human Approval zu einem sichtbaren Sales-System.",
    productHref: "/ai-vertrieb",
    productLabel: "AI Vertrieb entdecken",
    pain: ["Leads werden zu spät bearbeitet", "CRM-Daten bleiben unvollständig", "Follow-ups hängen an manuellen Routinen"],
    stages: ["SIGNAL", "RESEARCH", "CRM CONTEXT", "QUALIFY", "APPROVAL", "FOLLOW-UP"],
    metrics: [
      ["RESPONSE FLOW", "CONNECTED"],
      ["HUMAN GATE", "ACTIVE"],
      ["TRACE", "COMPLETE"],
    ],
    nodeA: "WEBSITE / EMAIL / ADS",
    nodeB: "REVENUE AGENT",
    nodeC: "CRM + KNOWLEDGE",
    nodeD: "FOLLOW-UP + TASK",
  },
  {
    id: "service",
    no: "02",
    eyebrow: "CUSTOMER SERVICE / EXPERIENCE",
    title: "AI für Kundenservice",
    statement: "Anfragen verstehen. Kontext laden. Sicher lösen.",
    copy: "Voice, E-Mail und Chat werden mit Kundenhistorie, Wissensquellen, Policies und kontrollierten Eskalationen verbunden.",
    productHref: "/ai-kundenservice",
    productLabel: "AI Kundenservice entdecken",
    pain: ["Kontext liegt in mehreren Systemen", "Antwortqualität hängt von Einzelwissen ab", "Eskalationen kommen zu spät"],
    stages: ["REQUEST", "INTENT", "CONTEXT", "KNOWLEDGE", "RESOLUTION", "HANDOFF"],
    metrics: [
      ["CHANNELS", "CONNECTED"],
      ["CONFIDENCE", "VISIBLE"],
      ["HANDOFF", "CONTROLLED"],
    ],
    nodeA: "VOICE / MAIL / CHAT",
    nodeB: "SERVICE AGENT",
    nodeC: "CUSTOMER + POLICY",
    nodeD: "RESOLVE / ESCALATE",
  },
  {
    id: "operations",
    no: "03",
    eyebrow: "OPERATIONS / PROCESS EXECUTION",
    title: "AI für Operations",
    statement: "Routine wird zu kontrollierter Ausführung.",
    copy: "Dokumente, Freigaben, Datenübertragung, Statusupdates und Exceptions bewegen sich durch ein nachvollziehbares Operations-System.",
    productHref: "/workflow-automatisierung",
    productLabel: "Workflow Automation entdecken",
    pain: ["Übergaben kosten Zeit", "Systeme werden doppelt gepflegt", "Exceptions bleiben unsichtbar"],
    stages: ["TRIGGER", "VALIDATE", "DECIDE", "APPROVE", "UPDATE", "TRACE"],
    metrics: [
      ["WORKFLOW", "ORCHESTRATED"],
      ["EXCEPTIONS", "VISIBLE"],
      ["SYSTEM WRITE", "CONTROLLED"],
    ],
    nodeA: "ERP / DOC / EVENT",
    nodeB: "OPS AGENT",
    nodeC: "RULES + STATUS DATA",
    nodeD: "UPDATE / ESCALATE",
  },
  {
    id: "knowledge",
    no: "04",
    eyebrow: "KNOWLEDGE / PRIVATE INTELLIGENCE",
    title: "AI für Wissensarbeit",
    statement: "Unternehmenswissen wird nutzbar, ohne Kontrolle zu verlieren.",
    copy: "Dokumente, Policies, Projektwissen und interne Systeme werden als private Intelligence-Schicht mit Quellen, Rollenrechten und Evidenz verbunden.",
    productHref: "/private-intelligence",
    productLabel: "Private Intelligence entdecken",
    pain: ["Wissen ist verteilt", "Antworten sind schwer prüfbar", "Zugriffsrechte fehlen im AI-Kontext"],
    stages: ["QUESTION", "ACCESS", "RETRIEVE", "GROUND", "ANSWER", "CITATION"],
    metrics: [
      ["SOURCES", "GROUNDED"],
      ["ACCESS", "ROLE BASED"],
      ["EVIDENCE", "VISIBLE"],
    ],
    nodeA: "DRIVE / NOTION / DB",
    nodeB: "KNOWLEDGE AGENT",
    nodeC: "PRIVATE CONTEXT",
    nodeD: "ANSWER + EVIDENCE",
  },
] as const;

const capabilityMatrix = [
  ["AI AGENTS", "Rollenbasierte Systeme, die Kontext verstehen, Tools nutzen und kontrolliert handeln.", "/ai-agenten"],
  ["WORKFLOW AUTOMATION", "Signale, Logik, Freigaben und Aktionen als nachvollziehbare Prozessarchitektur.", "/workflow-automatisierung"],
  ["PRIVATE INTELLIGENCE", "Unternehmenswissen mit Quellen, Berechtigungen und Evidenz als Intelligence Layer.", "/private-intelligence"],
  ["VOICE AI", "Natürliche Gespräche mit Kontext, Systemaktionen und sauberem Human Handoff.", "/voice-ai"],
] as const;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function SolutionsHubExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<(typeof solutions)[number]["id"]>(solutions[0].id);
  const [runIndex, setRunIndex] = useState(2);
  const [isRunning, setIsRunning] = useState(true);

  const active = useMemo(
    () => solutions.find((solution) => solution.id === activeId) ?? solutions[0],
    [activeId],
  );

  useEffect(() => {
    if (!isRunning) return;
    const timer = window.setInterval(() => {
      setRunIndex((current) => (current + 1) % active.stages.length);
    }, 1750);
    return () => window.clearInterval(timer);
  }, [active.id, active.stages.length, isRunning]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let cleanup = () => {};

    const setup = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (disposed) return;

      gsap.registerPlugin(ScrollTrigger);
      const context = gsap.context(() => {
        root.querySelectorAll<HTMLElement>("[data-sol-reveal]").forEach((element) => {
          gsap.fromTo(
            element,
            { y: 30, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: .9,
              ease: "power3.out",
              scrollTrigger: { trigger: element, start: "top 86%", once: true },
            },
          );
        });

        root.querySelectorAll<HTMLElement>("[data-sol-line]").forEach((line, index) => {
          gsap.fromTo(
            line,
            { xPercent: index % 2 === 0 ? -4 : 4, autoAlpha: .4 },
            {
              xPercent: 0,
              autoAlpha: 1,
              ease: "none",
              scrollTrigger: { trigger: line, start: "top 92%", end: "top 56%", scrub: .6 },
            },
          );
        });
      }, root);

      cleanup = () => context.revert();
      ScrollTrigger.refresh();
    };

    void setup();
    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  const selectSolution = (id: (typeof solutions)[number]["id"]) => {
    setActiveId(id);
    setRunIndex(0);
    setIsRunning(true);
  };

  return (
    <div className={styles.root} ref={rootRef}>
      <section className={styles.hero} aria-labelledby="solutions-hero-title">
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroOrb} aria-hidden="true" />
        <div className={styles.container}>
          <div className={styles.heroTopline}>
            <span>CONLYRA / SOLUTIONS</span>
            <strong>AI SYSTEMS FOR REAL WORK</strong>
          </div>
          <div className={styles.heroLayout}>
            <div className={styles.heroCopy} data-sol-reveal>
              <p>WHERE DOES WORK SLOW DOWN?</p>
              <h1 id="solutions-hero-title">
                Nicht jede Aufgabe braucht AI.
                <span>Die richtigen schon.</span>
              </h1>
            </div>
            <div className={styles.heroAside} data-sol-reveal>
              <p>
                CONLYRA verbindet Agenten, Workflows, Unternehmenswissen und Kontrollmechanismen dort, wo reale Arbeit messbar schneller, konsistenter und nachvollziehbarer werden kann.
              </p>
              <a href="#solution-system">Lösungsräume entdecken <Arrow /></a>
            </div>
          </div>
          <div className={styles.heroRail}>
            <span>SALES</span><i />
            <span>SERVICE</span><i />
            <span>OPERATIONS</span><i />
            <span>KNOWLEDGE</span>
          </div>
        </div>
      </section>

      <section className={styles.shift} aria-labelledby="solutions-shift-title">
        <div className={styles.container}>
          <div className={styles.shiftHeader} data-sol-reveal>
            <p>THE REAL QUESTION</p>
            <h2 id="solutions-shift-title">Wo verliert Ihr Unternehmen heute Zeit, Kontext oder Kontrolle?</h2>
          </div>

          <div className={styles.shiftRows}>
            {solutions.map((solution) => (
              <button
                id={solution.id}
                key={solution.id}
                type="button"
                data-sol-line
                className={solution.id === active.id ? styles.shiftRowActive : ""}
                onClick={() => selectSolution(solution.id)}
              >
                <small>{solution.no}</small>
                <strong>{solution.title.replace("AI für ", "")}</strong>
                <span>{solution.statement}</span>
                <i><Arrow /></i>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.systemSection} id="solution-system" aria-labelledby="solution-system-title">
        <div className={styles.container}>
          <div className={styles.systemIntro} data-sol-reveal>
            <p>{active.eyebrow}</p>
            <h2 id="solution-system-title">{active.statement}</h2>
            <span>{active.copy}</span>
          </div>

          <div className={styles.systemShell}>
            <header className={styles.systemTopbar}>
              <div><i /><strong>CONLYRA / SOLUTION ENGINE</strong></div>
              <nav aria-label="Lösungsbereiche">
                {solutions.map((solution) => (
                  <button
                    key={solution.id}
                    type="button"
                    onClick={() => selectSolution(solution.id)}
                    data-active={solution.id === active.id}
                  >
                    {solution.no} / {solution.title.replace("AI für ", "")}
                  </button>
                ))}
              </nav>
              <button
                className={styles.runControl}
                type="button"
                onClick={() => setIsRunning((current) => !current)}
                data-running={isRunning}
              >
                <i /> {isRunning ? "LIVE RUN" : "PAUSED"}
              </button>
            </header>

            <div className={styles.systemBody}>
              <aside className={styles.painPanel}>
                <span>DETECTED FRICTION</span>
                <h3>{active.title}</h3>
                <div className={styles.painList}>
                  {active.pain.map((item, index) => (
                    <div key={item}>
                      <small>{String(index + 1).padStart(2, "0")}</small>
                      <strong>{item}</strong>
                    </div>
                  ))}
                </div>
                <Link href={active.productHref}>{active.productLabel} <Arrow /></Link>
              </aside>

              <div className={styles.executionStage}>
                <div className={styles.stageGrid} aria-hidden="true" />
                <div className={styles.nodeMap}>
                  <div className={`${styles.mapNode} ${styles.nodeA}`}><small>INPUT</small><strong>{active.nodeA}</strong></div>
                  <div className={`${styles.mapNode} ${styles.nodeB}`}><small>AGENT</small><strong>{active.nodeB}</strong></div>
                  <div className={`${styles.mapNode} ${styles.nodeC}`}><small>CONTEXT</small><strong>{active.nodeC}</strong></div>
                  <div className={`${styles.mapNode} ${styles.nodeD}`}><small>ACTION</small><strong>{active.nodeD}</strong></div>
                  <svg viewBox="0 0 1000 500" aria-hidden="true">
                    <path d="M120 250 C250 250 250 120 430 120" />
                    <path d="M120 250 C250 250 250 380 430 380" />
                    <path d="M540 120 C650 120 650 250 780 250" />
                    <path d="M540 380 C650 380 650 250 780 250" />
                  </svg>
                  <span className={styles.travelPulse} aria-hidden="true" />
                </div>

                <div className={styles.pipeline}>
                  {active.stages.map((stage, index) => {
                    const state = index < runIndex ? "complete" : index === runIndex ? "active" : "waiting";
                    return (
                      <button
                        key={stage}
                        type="button"
                        data-state={state}
                        onClick={() => {
                          setIsRunning(false);
                          setRunIndex(index);
                        }}
                      >
                        <small>{String(index + 1).padStart(2, "0")}</small>
                        <strong>{stage}</strong>
                        <i />
                      </button>
                    );
                  })}
                </div>

                <div className={styles.metricsBar}>
                  {active.metrics.map(([label, value]) => (
                    <div key={label}><span>{label}</span><strong>{value}</strong></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.capabilities} aria-labelledby="solution-capabilities-title">
        <div className={styles.container}>
          <div className={styles.capabilityHeader} data-sol-reveal>
            <p>ONE SYSTEM / MULTIPLE CAPABILITIES</p>
            <h2 id="solution-capabilities-title">Lösungen entstehen nicht aus einem Tool.</h2>
            <span>Sie entstehen aus dem richtigen Zusammenspiel von Intelligenz, Daten, Ausführung und Kontrolle.</span>
          </div>

          <div className={styles.capabilityGrid}>
            {capabilityMatrix.map(([title, copy, href], index) => (
              <Link href={href} key={title} className={styles.capabilityCard} data-sol-reveal>
                <div><small>{String(index + 1).padStart(2, "0")}</small><span>CAPABILITY</span></div>
                <h3>{title}</h3>
                <p>{copy}</p>
                <footer><span>EXPLORE SYSTEM</span><Arrow /></footer>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.closing} aria-labelledby="solutions-closing-title">
        <div className={styles.container}>
          <div className={styles.closingLine}><span>PROCESS</span><i /> <span>INTELLIGENCE</span><i /> <span>CONTROL</span></div>
          <div className={styles.closingLayout}>
            <div data-sol-reveal>
              <p>START WITH THE WORK</p>
              <h2 id="solutions-closing-title">Der beste AI-Startpunkt ist nicht ein Tool. Es ist ein echter Prozess.</h2>
            </div>
            <aside data-sol-reveal>
              <p>Wir analysieren, wo manuelle Übergaben, fehlender Kontext oder wiederkehrende Entscheidungen ein sinnvolles Automatisierungspotenzial schaffen.</p>
              <Link href="/#contact">Workflow Audit anfragen <Arrow /></Link>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
