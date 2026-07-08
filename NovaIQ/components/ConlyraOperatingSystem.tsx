"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./ConlyraOperatingSystem.module.css";

const systemSteps = [
  {
    id: "connect",
    no: "01",
    title: "Connect",
    headline: "Signale kommen dort an, wo Arbeit beginnt.",
    copy: "Inbox, CRM, Dokumente, Datenbanken und interne APIs werden zu einem gemeinsamen operativen Kontext.",
    status: "12 SOURCES / ONLINE",
    nodes: ["GMAIL", "HUBSPOT", "DRIVE", "INTERNAL API"],
  },
  {
    id: "understand",
    no: "02",
    title: "Understand",
    headline: "Kontext wird gelesen, bevor etwas passiert.",
    copy: "Agenten prüfen Verlauf, Rollen, Policies und Unternehmenswissen, bevor ein nächster Schritt entsteht.",
    status: "CONTEXT / VERIFIED",
    nodes: ["HISTORY", "POLICY", "KNOWLEDGE", "ROLE"],
  },
  {
    id: "decide",
    no: "03",
    title: "Decide",
    headline: "Entscheidungen werden vorbereitet, nicht versteckt.",
    copy: "Priorität, Risiko und nächste Aktion bleiben sichtbar und können vor Ausführung freigegeben werden.",
    status: "RISK / LOW",
    nodes: ["PRIORITY", "RISK", "NEXT ACTION", "CONFIDENCE"],
  },
  {
    id: "act",
    no: "04",
    title: "Act",
    headline: "Aktionen bewegen sich kontrolliert durch Ihre Tools.",
    copy: "CONLYRA kann Follow-ups vorbereiten, Systeme aktualisieren und weitere Workflows auslösen — nachvollziehbar und begrenzt.",
    status: "ACTION / READY",
    nodes: ["DRAFT", "CRM UPDATE", "CREATE TASK", "WEBHOOK"],
  },
  {
    id: "control",
    no: "05",
    title: "Control",
    headline: "Menschen behalten die wichtigen Entscheidungen.",
    copy: "Human Gates, Rollenrechte und Audit Trails machen aus Agenten produktive Systeme statt unkontrollierter Blackboxes.",
    status: "HUMAN GATE / ACTIVE",
    nodes: ["APPROVE", "REJECT", "TRACE", "AUDIT"],
  },
] as const;

const shiftRows = [
  ["01", "DATEN", "VERSTANDEN"],
  ["02", "ENTSCHEIDUNGEN", "VORBEREITET"],
  ["03", "ARBEIT", "AUSGEFÜHRT"],
] as const;

const traceLines = [
  "14:32:08  signal.received / inbound_request",
  "14:32:09  context.loaded / crm + knowledge",
  "14:32:10  agent.decided / priority_high",
  "14:32:11  approval.requested / human_gate",
] as const;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function ConlyraOperatingSystem() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [demoState, setDemoState] = useState<"pending" | "approved" | "rejected">("pending");
  const [traceOpen, setTraceOpen] = useState(false);
  const [contextOpen, setContextOpen] = useState(false);

  const active = systemSteps[activeStep];

  const demoStatus = useMemo(() => {
    if (demoState === "approved") return "APPROVED / EXECUTION READY";
    if (demoState === "rejected") return "REJECTED / NO ACTION TAKEN";
    return "PENDING / HUMAN APPROVAL";
  }, [demoState]);

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
        const story = root.querySelector<HTMLElement>("[data-conlyra-os-story]");
        if (story) {
          ScrollTrigger.create({
            trigger: story,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const next = Math.min(systemSteps.length - 1, Math.floor(self.progress * systemSteps.length));
              setActiveStep((current) => (current === next ? current : next));
              story.style.setProperty("--os-progress", self.progress.toFixed(4));
            },
          });
        }

        root.querySelectorAll<HTMLElement>("[data-shift-line]").forEach((row, index) => {
          gsap.fromTo(
            row,
            { xPercent: index % 2 === 0 ? -5 : 5, autoAlpha: 0.42 },
            {
              xPercent: 0,
              autoAlpha: 1,
              ease: "none",
              scrollTrigger: {
                trigger: row,
                start: "top 92%",
                end: "top 48%",
                scrub: 0.7,
              },
            },
          );
        });

        root.querySelectorAll<HTMLElement>("[data-os-reveal]").forEach((element) => {
          gsap.fromTo(
            element,
            { y: 28, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 86%",
                once: true,
              },
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

  return (
    <div className={styles.root} ref={rootRef}>
      <section className={styles.shift} aria-labelledby="conlyra-shift-title">
        <div className={styles.container}>
          <div className={styles.shiftHead} data-os-reveal>
            <p>THE SHIFT / 2026</p>
            <h2 id="conlyra-shift-title">
              Unternehmen brauchen nicht mehr KI-Tools.
              <span>Sie brauchen Systeme.</span>
            </h2>
            <aside>
              <span>FROM TOOLS</span>
              <strong>TO CONTROLLED OPERATIONS</strong>
            </aside>
          </div>

          <div className={styles.shiftRows}>
            {shiftRows.map(([no, from, to]) => (
              <div className={styles.shiftRow} data-shift-line key={no}>
                <small>{no}</small>
                <strong>{from}</strong>
                <span>→</span>
                <em>{to}</em>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.osStory} id="system" data-conlyra-os-story aria-labelledby="conlyra-os-title">
        <div className={styles.osSticky}>
          <div className={`${styles.container} ${styles.osLayout}`}>
            <div className={styles.osCopy}>
              <p>CONLYRA OS / CONTROLLED INTELLIGENCE</p>
              <h2 id="conlyra-os-title">Ein System vom Signal bis zur Aktion.</h2>
              <div className={styles.stepTabs} role="tablist" aria-label="CONLYRA OS Schritte">
                {systemSteps.map((step, index) => (
                  <button
                    key={step.id}
                    type="button"
                    role="tab"
                    aria-selected={activeStep === index}
                    className={activeStep === index ? styles.stepActive : ""}
                    onClick={() => setActiveStep(index)}
                  >
                    <small>{step.no}</small>
                    <span>{step.title}</span>
                  </button>
                ))}
              </div>

              <div className={styles.activeCopy} key={active.id}>
                <span>{active.status}</span>
                <h3>{active.headline}</h3>
                <p>{active.copy}</p>
              </div>
            </div>

            <div className={styles.canvas} aria-label="CONLYRA Operations Graph">
              <div className={styles.canvasTopbar}>
                <span>CONLYRA / OPERATIONS GRAPH</span>
                <strong><i /> LIVE SYSTEM</strong>
              </div>

              <div className={styles.canvasStage}>
                <div className={styles.grid} aria-hidden="true" />
                <svg className={styles.paths} viewBox="0 0 1000 620" aria-hidden="true">
                  <path d="M85 310 C235 310 210 115 405 115 S600 310 760 310" />
                  <path d="M85 310 C235 310 210 505 405 505 S600 310 760 310" />
                  <path d="M405 115 C510 210 510 410 405 505" />
                  <path d="M760 310 L915 310" />
                </svg>

                <div className={`${styles.node} ${styles.nodeInput}`} data-state={activeStep >= 0 ? "active" : "idle"}>
                  <small>SIGNAL / 01</small>
                  <strong>INBOUND REQUEST</strong>
                  <span>RECEIVED</span>
                </div>

                <div className={`${styles.node} ${styles.nodeContext}`} data-state={activeStep >= 1 ? "active" : "idle"}>
                  <small>CONTEXT / 02</small>
                  <strong>CRM + KNOWLEDGE</strong>
                  <span>{activeStep >= 1 ? "VERIFIED" : "WAITING"}</span>
                </div>

                <div className={`${styles.node} ${styles.nodeDecision}`} data-state={activeStep >= 2 ? "active" : "idle"}>
                  <small>DECISION / 03</small>
                  <strong>PRIORITY HIGH</strong>
                  <span>{activeStep >= 2 ? "READY" : "WAITING"}</span>
                </div>

                <div className={`${styles.node} ${styles.nodeAction}`} data-state={activeStep >= 3 ? "active" : "idle"}>
                  <small>ACTION / 04</small>
                  <strong>FOLLOW-UP DRAFT</strong>
                  <span>{activeStep >= 3 ? "PREPARED" : "WAITING"}</span>
                </div>

                <div className={`${styles.node} ${styles.nodeControl}`} data-state={activeStep >= 4 ? "active" : "idle"}>
                  <small>CONTROL / 05</small>
                  <strong>HUMAN GATE</strong>
                  <span>{activeStep >= 4 ? "APPROVAL REQUIRED" : "WAITING"}</span>
                </div>

                <div className={styles.activeNodePanel} key={`panel-${active.id}`}>
                  <div><span>{active.no}</span><strong>{active.title.toUpperCase()}</strong></div>
                  <p>{active.status}</p>
                  <ul>
                    {active.nodes.map((node) => <li key={node}>{node}<i>✓</i></li>)}
                  </ul>
                </div>

                <div className={styles.signalPulse} aria-hidden="true" />
              </div>

              <div className={styles.canvasFooter}>
                <span>RUN 2F9A / PROD</span>
                <span>TRACE ACTIVE</span>
                <span>LATENCY / SIMULATED UI</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.demo} aria-labelledby="conlyra-demo-title">
        <div className={styles.container}>
          <div className={styles.demoHead} data-os-reveal>
            <p>INTERACTIVE PRODUCT DEMO</p>
            <h2 id="conlyra-demo-title">Eine Entscheidung. Vollständig sichtbar.</h2>
            <span>Frontend simulation / no live customer data</span>
          </div>

          <div className={styles.demoShell} data-os-reveal>
            <div className={styles.demoNav}>
              <div><i /><strong>CONLYRA CONTROL ROOM</strong></div>
              <span>WORKSPACE / SALES OPS</span>
              <b>{demoStatus}</b>
            </div>

            <div className={styles.demoBody}>
              <aside className={styles.demoSidebar}>
                <small>QUEUE / 04</small>
                <button className={styles.queueActive} type="button"><span>01</span><strong>Inbound lead</strong><i>NEW</i></button>
                <button type="button"><span>02</span><strong>Support escalation</strong><i>WAIT</i></button>
                <button type="button"><span>03</span><strong>Contract review</strong><i>HOLD</i></button>
                <button type="button"><span>04</span><strong>CRM cleanup</strong><i>AUTO</i></button>
              </aside>

              <div className={styles.demoWorkspace}>
                <div className={styles.demoSignal}>
                  <div>
                    <span>INBOUND SIGNAL / SALES</span>
                    <strong>Neue Anfrage von Müller Maschinenbau GmbH</strong>
                  </div>
                  <b>14:32:08</b>
                </div>

                <div className={styles.demoColumns}>
                  <article>
                    <small>AGENT ANALYSIS</small>
                    <h3>High-fit opportunity detected.</h3>
                    <p>Bestehender CRM-Kontakt, klarer Prozessbedarf und relevanter Use Case für einen ersten Workflow-Pilot.</p>
                    <dl>
                      <div><dt>FIT SCORE</dt><dd>91 / 100</dd></div>
                      <div><dt>CRM HISTORY</dt><dd>3 TOUCHPOINTS</dd></div>
                      <div><dt>RISK</dt><dd>LOW</dd></div>
                    </dl>
                  </article>

                  <article>
                    <small>NEXT ACTION</small>
                    <h3>Follow-up vorbereiten und CRM aktualisieren.</h3>
                    <p>Keine Aktion wird ausgeführt, bevor die Freigabe erteilt wurde.</p>
                    <div className={styles.requirements}>
                      <span>✓ ROLE PERMISSION</span>
                      <span>✓ POLICY MATCH</span>
                      <span>✓ CONTEXT VALIDATION</span>
                    </div>
                  </article>
                </div>

                <div className={styles.approvalBar} data-state={demoState}>
                  <div>
                    <span>HUMAN APPROVAL</span>
                    <strong>{demoStatus}</strong>
                  </div>
                  <div className={styles.approvalActions}>
                    <button type="button" onClick={() => setContextOpen((open) => !open)}>VIEW CONTEXT</button>
                    <button type="button" onClick={() => setTraceOpen((open) => !open)}>OPEN TRACE</button>
                    <button className={styles.reject} type="button" onClick={() => setDemoState("rejected")}>REJECT</button>
                    <button className={styles.approve} type="button" onClick={() => setDemoState("approved")}>APPROVE <Arrow /></button>
                  </div>
                </div>

                {contextOpen ? (
                  <div className={styles.drawer}>
                    <div><span>CONTEXT SNAPSHOT</span><button type="button" onClick={() => setContextOpen(false)}>CLOSE ×</button></div>
                    <p>CRM history / website inquiry / company profile / previous touchpoints / workflow fit assessment.</p>
                  </div>
                ) : null}

                {traceOpen ? (
                  <div className={styles.tracePanel}>
                    <div><span>EXECUTION TRACE</span><button type="button" onClick={() => setTraceOpen(false)}>CLOSE ×</button></div>
                    {traceLines.map((line) => <code key={line}>{line}</code>)}
                    <code className={styles.traceActive}>14:32:12  status.current / {demoState}</code>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
