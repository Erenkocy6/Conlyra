"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./ConlyraStoryChapters.module.css";

const flows = [
  {
    no: "01",
    category: "SALES",
    title: "Vom Signal zum nächsten Schritt.",
    copy: "CONLYRA verbindet Anfrage, CRM-Kontext und Unternehmenswissen. Der Agent bereitet Recherche, Priorisierung und Follow-up vor — der Mensch entscheidet über die Ausführung.",
    sequence: ["SIGNAL", "CONTEXT", "PRIORITY", "FOLLOW-UP", "APPROVAL"],
    video: "/media/AdobeStock_1535809490.mp4",
  },
  {
    no: "02",
    category: "SUPPORT",
    title: "Tickets verstehen, bevor sie eskalieren.",
    copy: "Anfragen werden klassifiziert, relevante Wissensquellen geprüft und Antworten vorbereitet. Unsichere Fälle bleiben sichtbar und werden gezielt an Menschen übergeben.",
    sequence: ["TICKET", "CLASSIFY", "KNOWLEDGE", "DRAFT", "ESCALATE"],
    video: "/media/AdobeStock_1516198647.mp4",
  },
  {
    no: "03",
    category: "OPERATIONS",
    title: "Arbeit bewegt sich, ohne dass jemand nachfassen muss.",
    copy: "Dokumente, Statuswechsel und Exceptions laufen durch einen kontrollierten Prozess mit Rollen, Regeln und nachvollziehbaren Aktionen.",
    sequence: ["DOCUMENT", "VALIDATE", "UPDATE", "NOTIFY", "AUDIT"],
    video: "/media/AdobeStock_1558014909.mp4",
  },
  {
    no: "04",
    category: "KNOWLEDGE",
    title: "Unternehmenswissen wird ausführbar.",
    copy: "Richtlinien, Dokumente und interne Daten werden zu sicherem Kontext für Teams und Agenten — mit klaren Zugriffsrechten und Quellenbezug.",
    sequence: ["SEARCH", "RETRIEVE", "GROUND", "ANSWER", "TRACE"],
    video: "/media/AdobeStock_1525614966.mp4",
  },
] as const;

const integrations = [
  {
    category: "COMMUNICATION",
    items: [
      ["GMAIL", "READ SIGNAL / CLASSIFY / DRAFT / APPROVAL"],
      ["SLACK", "LISTEN / ROUTE / SUMMARIZE / NOTIFY"],
      ["TEAMS", "CAPTURE / ASSIGN / ESCALATE / LOG"],
    ],
  },
  {
    category: "CRM",
    items: [
      ["HUBSPOT", "READ CONTEXT / SCORE / UPDATE / FOLLOW-UP"],
      ["SALESFORCE", "QUERY / ENRICH / ASSIGN / AUDIT"],
    ],
  },
  {
    category: "KNOWLEDGE",
    items: [
      ["NOTION", "SEARCH / RETRIEVE / GROUND / TRACE"],
      ["GOOGLE DRIVE", "INDEX / PARSE / REFERENCE / CONTROL"],
    ],
  },
  {
    category: "OPERATIONS",
    items: [
      ["WEBHOOKS", "TRIGGER / VALIDATE / EXECUTE / REPORT"],
      ["SQL", "QUERY / CHECK / WRITE / LOG"],
      ["INTERNAL API", "AUTH / CALL / VERIFY / AUDIT"],
    ],
  },
] as const;

const proofItems = [
  ["01", "HUMAN APPROVAL", "Kritische Aktionen können vor der Ausführung gestoppt, geprüft und freigegeben werden."],
  ["02", "AUDIT TRAILS", "Entscheidungen, Quellen und Aktionen bleiben als nachvollziehbare Systemspur sichtbar."],
  ["03", "ROLE PERMISSIONS", "Agenten handeln nur innerhalb definierter Rollen, Werkzeuge und Zugriffsrechte."],
  ["04", "PRIVATE CONTEXT", "Unternehmensdaten werden als kontrollierter Kontext statt als offene Blackbox behandelt."],
  ["05", "FAILURE STATES", "Unsicherheit und Fehlerzustände werden sichtbar gemacht und gezielt eskaliert."],
  ["06", "OBSERVABILITY", "Systemzustände, Ausführung und Freigaben lassen sich in einem operativen Layer überwachen."],
] as const;

const potentialMetrics = [
  ["-42%", "MANUAL TOUCHPOINTS", "Illustratives Automatisierungspotenzial in geeigneten Prozessen — kein Kundenversprechen."],
  ["3.8×", "RESPONSE VELOCITY", "Beispielhafte Szenario-Darstellung bei verbundenen Daten- und Freigabewegen."],
  ["24/7", "PROCESS AVAILABILITY", "Systemlogik kann dauerhaft verfügbar sein; menschliche Gates bleiben dort bestehen, wo sie benötigt werden."],
] as const;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function ConlyraStoryChapters() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeIntegration, setActiveIntegration] = useState("GMAIL");
  const [controlState, setControlState] = useState<"pending" | "approved" | "blocked">("pending");

  const integrationDetail = useMemo(() => {
    for (const group of integrations) {
      const found = group.items.find(([name]) => name === activeIntegration);
      if (found) return found[1];
    }
    return "READ / UNDERSTAND / ACT / CONTROL";
  }, [activeIntegration]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let disposed = false;
    let cleanup: () => void = () => {};

    const setup = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (disposed) return;

      gsap.registerPlugin(ScrollTrigger);
      const context = gsap.context(() => {
        root.querySelectorAll<HTMLElement>("[data-story-reveal]").forEach((element) => {
          gsap.fromTo(
            element,
            { y: 30, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: element, start: "top 86%", once: true },
            },
          );
        });

        const film = root.querySelector<HTMLElement>("[data-film-chapter]");
        if (film) {
          const video = film.querySelector("video");
          const words = Array.from(film.querySelectorAll<HTMLElement>("[data-film-word]"));
          if (video) {
            gsap.fromTo(
              video,
              { scale: 1.08 },
              {
                scale: 1,
                ease: "none",
                scrollTrigger: { trigger: film, start: "top top", end: "bottom bottom", scrub: 0.9 },
              },
            );
          }
          words.forEach((word, index) => {
            gsap.fromTo(
              word,
              { autoAlpha: 0.14 },
              {
                autoAlpha: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: film,
                  start: `${index * 18}% top`,
                  end: `${index * 18 + 28}% top`,
                  scrub: true,
                },
              },
            );
          });
        }
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

  return (
    <div className={styles.root} ref={rootRef}>
      <section className={styles.flows} id="use-cases" aria-labelledby="flows-title">
        <div className={styles.container}>
          <div className={styles.flowsHead} data-story-reveal>
            <p>REAL BUSINESS FLOWS</p>
            <h2 id="flows-title">KI dort, wo Arbeit wirklich passiert.</h2>
            <span>Operational chapters / 01—04</span>
          </div>

          <div className={styles.flowList}>
            {flows.map((flow, index) => (
              <article className={styles.flowChapter} key={flow.no} data-story-reveal>
                <div className={styles.flowMedia}>
                  <video autoPlay loop muted playsInline preload={index === 0 ? "metadata" : "none"}>
                    <source src={flow.video} type="video/mp4" />
                  </video>
                  <div><span>{flow.no} / {flow.category}</span><strong>CONTROLLED FLOW</strong></div>
                </div>
                <div className={styles.flowCopy}>
                  <div className={styles.flowIndex}><span>{flow.no}</span><strong>{flow.category}</strong></div>
                  <h3>{flow.title}</h3>
                  <p>{flow.copy}</p>
                  <div className={styles.flowSequence}>
                    {flow.sequence.map((step, stepIndex) => (
                      <div key={step}><small>{String(stepIndex + 1).padStart(2, "0")}</small><span>{step}</span>{stepIndex < flow.sequence.length - 1 ? <i>→</i> : null}</div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.filmChapter} data-film-chapter aria-labelledby="film-title">
        <div className={styles.filmSticky}>
          <video autoPlay loop muted playsInline preload="metadata" aria-hidden="true">
            <source src="/media/AdobeStock_1499424979.mp4" type="video/mp4" />
          </video>
          <div className={styles.filmShade} aria-hidden="true" />
          <div className={styles.filmCopy}>
            <p>THE SYSTEM BEHIND THE ACTION</p>
            <h2 id="film-title">THE SYSTEM<br />BEHIND<br />THE ACTION.</h2>
            <div className={styles.filmWords}>
              {["CONTEXT", "DECISION", "ACTION", "CONTROL"].map((word, index) => (
                <span data-film-word key={word}><small>0{index + 1}</small>{word}</span>
              ))}
            </div>
          </div>
          <div className={styles.filmMeta}><span>CONLYRA / SYSTEM FILM</span><span>SCROLL TO TRACE ↓</span></div>
        </div>
      </section>

      <section className={styles.impact} id="impact" aria-labelledby="impact-title">
        <div className={styles.container}>
          <div className={styles.sectionHead} data-story-reveal>
            <p>BUSINESS IMPACT / SCENARIO MODELS</p>
            <h2 id="impact-title">Wirkung, die sich im Betrieb messen lassen muss.</h2>
            <span>Illustrative scenarios — validate in pilot projects.</span>
          </div>

          <div className={styles.metricRows}>
            {potentialMetrics.map(([value, label, note], index) => (
              <article key={label} data-story-reveal>
                <small>0{index + 1}</small>
                <strong>{value}</strong>
                <h3>{label}</h3>
                <p>{note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.control} id="trust" aria-labelledby="control-title">
        <div className={`${styles.container} ${styles.controlLayout}`}>
          <div className={styles.controlCopy} data-story-reveal>
            <p>CONTROL BY DESIGN</p>
            <h2 id="control-title">Automation ohne Kontrollverlust.</h2>
            <span>CONLYRA macht Freigaben, Rollen und Systemzustände zu sichtbaren Teilen des Produkts.</span>
          </div>

          <div className={styles.actionRequest} data-story-reveal data-state={controlState}>
            <div className={styles.requestTopbar}>
              <span>AGENT ACTION REQUEST / 7F2A</span>
              <b>{controlState.toUpperCase()}</b>
            </div>
            <div className={styles.requestBody}>
              <small>REQUESTED ACTIONS</small>
              <h3>Update CRM.<br />Send follow-up.<br />Create task.</h3>
              <div className={styles.policyChecks}>
                <span><i>✓</i> ROLE PERMISSION</span>
                <span><i>✓</i> POLICY MATCH</span>
                <span><i>✓</i> CONTEXT VALIDATION</span>
              </div>
            </div>
            <div className={styles.requestFooter}>
              <div><span>HUMAN APPROVAL</span><strong>{controlState === "pending" ? "PENDING" : controlState === "approved" ? "APPROVED" : "BLOCKED"}</strong></div>
              <div>
                <button type="button" onClick={() => setControlState("blocked")}>BLOCK</button>
                <button type="button" onClick={() => setControlState("approved")}>APPROVE <Arrow /></button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.integration} aria-labelledby="integration-title">
        <div className={styles.container}>
          <div className={styles.sectionHead} data-story-reveal>
            <p>INTEGRATION SYSTEM</p>
            <h2 id="integration-title">Agenten arbeiten dort, wo Ihr Unternehmen arbeitet.</h2>
            <span>Hover or focus to inspect operational capability.</span>
          </div>

          <div className={styles.integrationLayout} data-story-reveal>
            <div className={styles.integrationMatrix}>
              {integrations.map((group) => (
                <div className={styles.integrationGroup} key={group.category}>
                  <small>{group.category}</small>
                  {group.items.map(([name]) => (
                    <button
                      key={name}
                      type="button"
                      className={activeIntegration === name ? styles.integrationActive : ""}
                      onPointerEnter={() => setActiveIntegration(name)}
                      onFocus={() => setActiveIntegration(name)}
                      onClick={() => setActiveIntegration(name)}
                    >
                      <span>{name}</span><Arrow />
                    </button>
                  ))}
                </div>
              ))}
            </div>

            <aside className={styles.integrationPreview}>
              <span>ACTIVE INTEGRATION</span>
              <h3>{activeIntegration}</h3>
              <p>{integrationDetail}</p>
              <div className={styles.integrationTrace}>
                {integrationDetail.split(" / ").map((step, index) => (
                  <div key={`${step}-${index}`}><small>0{index + 1}</small><strong>{step}</strong><i>{index < integrationDetail.split(" / ").length - 1 ? "↓" : "✓"}</i></div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.proof} aria-labelledby="proof-title">
        <div className={styles.container}>
          <div className={styles.sectionHead} data-story-reveal>
            <p>SYSTEM PROOF</p>
            <h2 id="proof-title">Gebaut für den Schritt von Demo zu Betrieb.</h2>
            <span>No fake testimonials. System principles instead.</span>
          </div>

          <div className={styles.proofRows}>
            {proofItems.map(([no, title, copy]) => (
              <article key={no} data-story-reveal>
                <small>{no}</small><h3>{title}</h3><p>{copy}</p><span>✓</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.finalScene} id="contact" aria-labelledby="final-title">
        <div className={styles.finalMedia} aria-hidden="true">
          <video autoPlay loop muted playsInline preload="none"><source src="/media/AdobeStock_534758496.mp4" type="video/mp4" /></video>
        </div>
        <div className={styles.finalShade} aria-hidden="true" />
        <div className={`${styles.container} ${styles.finalContent}`}>
          <p data-story-reveal>LET'S BUILD THE FIRST WORKFLOW</p>
          <h2 id="final-title" data-story-reveal>YOUR FIRST<br />AI WORKFLOW<br />STARTS HERE.</h2>
          <div className={styles.finalAction} data-story-reveal>
            <a href="mailto:hello@conlyra.ai">hello@conlyra.ai <Arrow /></a>
            <span>GERMANY / DACH / EUROPE</span>
          </div>
          <div className={styles.finalWordmark} aria-hidden="true">CONLYRA</div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <span>© 2026 CONLYRA</span>
          <nav><a href="#system">System</a><a href="#use-cases">Flows</a><a href="#trust">Control</a><a href="#contact">Contact</a></nav>
          <strong>CONTROLLED INTELLIGENCE.</strong>
        </div>
      </footer>
    </div>
  );
}
