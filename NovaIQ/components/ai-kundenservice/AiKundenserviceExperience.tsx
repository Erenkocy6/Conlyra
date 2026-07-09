"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./AiKundenserviceExperience.module.css";

const serviceCases = [
  {
    id: "voice",
    channel: "VOICE",
    customer: "Bergmann Industrie AG",
    intent: "Lieferstatus & Eskalation",
    priority: "HIGH",
    confidence: 94,
    sla: "00:18",
    status: "RESOLVING",
    sentiment: "FRUSTRATED → CALM",
    action: "Lieferstatus bestätigen + Eskalation vorbereiten",
    agent: "Service Agent / Enterprise",
    knowledge: ["Order #BG-2941", "SLA Enterprise", "Delivery Policy", "CRM History"],
  },
  {
    id: "mail",
    channel: "EMAIL",
    customer: "Rheinwerk Mobility GmbH",
    intent: "Vertragsfrage",
    priority: "MEDIUM",
    confidence: 81,
    sla: "01:42",
    status: "REVIEW REQUIRED",
    sentiment: "NEUTRAL",
    action: "Antwortentwurf + Human Review",
    agent: "Knowledge Agent / Legal Context",
    knowledge: ["Master Agreement", "Renewal Clause", "Pricing Appendix", "Previous Ticket"],
  },
  {
    id: "chat",
    channel: "CHAT",
    customer: "Nova Retail Group",
    intent: "Account Access",
    priority: "HIGH",
    confidence: 97,
    sla: "00:07",
    status: "RESOLVED",
    sentiment: "CONFUSED → POSITIVE",
    action: "Access Flow auslösen + Session dokumentieren",
    agent: "Service Agent / Digital Support",
    knowledge: ["Identity Policy", "Account Status", "Access Runbook", "Session Context"],
  },
] as const;

const servicePipeline = [
  ["01", "REQUEST", "Anfrage erkannt"],
  ["02", "INTENT", "Absicht erkannt"],
  ["03", "CONTEXT", "Kundenkontext geladen"],
  ["04", "KNOWLEDGE", "Quellen gefunden"],
  ["05", "CONFIDENCE", "Sicherheit bewertet"],
  ["06", "DECISION", "Lösung gewählt"],
  ["07", "RESOLUTION", "Aktion vorbereitet"],
  ["08", "HANDOFF", "Übergabe kontrolliert"],
] as const;

const painRows = [
  ["01", "Anfrage kommt rein", "Kanäle laufen getrennt", "Alle Kanäle werden als ein Service-Signal verarbeitet"],
  ["02", "Kontext fehlt", "Mitarbeitende suchen in mehreren Systemen", "Kundenhistorie und Policies werden vor der Antwort geladen"],
  ["03", "Antwort entsteht", "Qualität hängt von Einzelwissen ab", "Antworten werden mit Quellen und Confidence vorbereitet"],
  ["04", "Eskalation beginnt", "Übergaben sind langsam und unvollständig", "Human Handoff enthält Kontext, Status und nächste Schritte"],
] as const;

const serviceCapabilities = [
  ["01", "Omnichannel Intake", "Voice, E-Mail und Chat werden als strukturierte Requests erfasst und einem Service-Kontext zugeordnet.", "VOICE / MAIL / CHAT / FORM"],
  ["02", "Intent & Context", "Anliegen, Kundentyp, Historie, SLA und relevante Policies werden vor einer Entscheidung zusammengeführt.", "INTENT / CRM / SLA / POLICY"],
  ["03", "Knowledge Retrieval", "Der Agent greift auf freigegebene Wissensquellen zu und macht Evidenz sichtbar.", "SEARCH / RAG / SOURCES / ACCESS"],
  ["04", "Controlled Resolution", "Antwort, Aktion oder Eskalation wird anhand von Confidence, Regeln und Human Gates gesteuert.", "CONFIDENCE / ACTION / REVIEW / TRACE"],
] as const;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function AiKundenserviceExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeCaseId, setActiveCaseId] = useState<(typeof serviceCases)[number]["id"]>(serviceCases[0].id);
  const [stage, setStage] = useState(3);
  const [running, setRunning] = useState(true);
  const [handoff, setHandoff] = useState<"idle" | "prepared" | "accepted">("idle");

  const activeCase = useMemo(
    () => serviceCases.find((item) => item.id === activeCaseId) ?? serviceCases[0],
    [activeCaseId],
  );

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setStage((current) => (current + 1) % servicePipeline.length);
    }, 1700);
    return () => window.clearInterval(timer);
  }, [running]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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
        root.querySelectorAll<HTMLElement>("[data-service-reveal]").forEach((element) => {
          gsap.fromTo(
            element,
            { y: 28, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: .9,
              ease: "power3.out",
              scrollTrigger: { trigger: element, start: "top 86%", once: true },
            },
          );
        });

        root.querySelectorAll<HTMLElement>("[data-service-row]").forEach((row, index) => {
          gsap.fromTo(
            row,
            { xPercent: index % 2 === 0 ? -3 : 3, autoAlpha: .45 },
            {
              xPercent: 0,
              autoAlpha: 1,
              ease: "none",
              scrollTrigger: { trigger: row, start: "top 94%", end: "top 58%", scrub: .6 },
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

  const selectCase = (id: (typeof serviceCases)[number]["id"]) => {
    setActiveCaseId(id);
    setStage(0);
    setRunning(true);
    setHandoff("idle");
  };

  return (
    <div className={styles.root} ref={rootRef}>
      <section className={styles.hero} aria-labelledby="service-ai-hero-title">
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.signalField} aria-hidden="true">
          <i /><i /><i /><i />
        </div>
        <div className={styles.container}>
          <div className={styles.heroTopbar}>
            <span>CONLYRA / SOLUTION 02 / AI SERVICE</span>
            <strong>VOICE / MAIL / CHAT / HUMAN HANDOFF</strong>
          </div>

          <div className={styles.heroLayout}>
            <div className={styles.heroCopy} data-service-reveal>
              <p>UNDERSTAND / RESOLVE / ESCALATE</p>
              <h1 id="service-ai-hero-title">
                Kundenservice, der Kontext versteht.
                <span>Bevor er antwortet.</span>
              </h1>
            </div>
            <aside className={styles.heroAside} data-service-reveal>
              <p>
                CONLYRA verbindet Voice, E-Mail und Chat mit Kundenhistorie, Wissensquellen, Confidence Checks und kontrollierter Eskalation.
              </p>
              <a href="#service-operations">Service Operations ansehen <Arrow /></a>
            </aside>
          </div>

          <div className={styles.heroSignalStrip}>
            <span>REQUEST</span><i />
            <span>INTENT</span><i />
            <span>CONTEXT</span><i />
            <span>KNOWLEDGE</span><i />
            <span>RESOLUTION</span><i />
            <span>HANDOFF</span>
          </div>
        </div>
      </section>

      <section className={styles.friction} aria-labelledby="service-friction-title">
        <div className={styles.container}>
          <div className={styles.sectionIntro} data-service-reveal>
            <p>THE SERVICE GAP</p>
            <h2 id="service-friction-title">Schnelle Antworten reichen nicht. Richtiger Kontext entscheidet.</h2>
            <span>
              Guter Service entsteht dort, wo Anfrage, Historie, Wissen und Eskalationslogik zusammenkommen — nicht in isolierten Postfächern.
            </span>
          </div>

          <div className={styles.frictionTable}>
            <div className={styles.frictionHead}>
              <span>STEP</span><span>SERVICE MOMENT</span><span>MANUAL REALITY</span><span>WITH CONLYRA</span>
            </div>
            {painRows.map(([no, moment, manual, future]) => (
              <div className={styles.frictionRow} key={no} data-service-row>
                <small>{no}</small>
                <strong>{moment}</strong>
                <span>{manual}</span>
                <em>{future}</em>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.operations} id="service-operations" aria-labelledby="service-operations-title">
        <div className={styles.container}>
          <div className={styles.systemIntro} data-service-reveal>
            <p>CONLYRA SERVICE OPERATIONS</p>
            <h2 id="service-operations-title">Jede Anfrage wird zu einem sichtbaren Service-Prozess.</h2>
            <span>Kanäle, Kontext, Wissen, Confidence und Handoff werden in einem kontrollierten Ablauf verbunden.</span>
          </div>

          <div className={styles.serviceShell}>
            <header className={styles.shellTopbar}>
              <div><i /><strong>CONLYRA / SERVICE OPERATIONS CENTER</strong></div>
              <nav aria-label="Service Cases">
                {serviceCases.map((item) => (
                  <button key={item.id} type="button" data-active={item.id === activeCase.id} onClick={() => selectCase(item.id)}>
                    {item.channel} / {item.customer}
                  </button>
                ))}
              </nav>
              <button className={styles.runButton} type="button" onClick={() => setRunning((current) => !current)} data-running={running}>
                <i /> {running ? "LIVE QUEUE" : "PAUSED"}
              </button>
            </header>

            <div className={styles.shellBody}>
              <aside className={styles.caseRail}>
                <span>ACTIVE SERVICE CASE</span>
                <div className={styles.channelTag}>{activeCase.channel}</div>
                <h3>{activeCase.customer}</h3>
                <dl>
                  <div><dt>INTENT</dt><dd>{activeCase.intent}</dd></div>
                  <div><dt>PRIORITY</dt><dd>{activeCase.priority}</dd></div>
                  <div><dt>SLA</dt><dd>{activeCase.sla}</dd></div>
                  <div><dt>STATUS</dt><dd>{activeCase.status}</dd></div>
                  <div><dt>SENTIMENT</dt><dd>{activeCase.sentiment}</dd></div>
                </dl>
                <div className={styles.confidenceScore}>
                  <span>CONFIDENCE</span><strong>{activeCase.confidence}</strong><small>%</small>
                </div>
              </aside>

              <div className={styles.workspace}>
                <div className={styles.workspaceGrid}>
                  <article className={styles.conversationCard}>
                    <header><span>LIVE INTERACTION</span><b>{activeCase.channel}</b></header>
                    <div className={styles.waveform} aria-hidden="true">
                      {Array.from({ length: 42 }).map((_, index) => <i key={index} style={{ "--h": `${18 + ((index * 13) % 64)}%` } as React.CSSProperties} />)}
                    </div>
                    <p>„Ich brauche eine verlässliche Antwort und möchte nicht noch einmal alles erklären.“</p>
                    <footer><span>INTENT DETECTED</span><strong>{activeCase.intent}</strong></footer>
                  </article>

                  <article className={styles.knowledgeCard}>
                    <header><span>KNOWLEDGE RETRIEVAL</span><b>{activeCase.knowledge.length} SOURCES</b></header>
                    <ul>
                      {activeCase.knowledge.map((item, index) => (
                        <li key={item}><small>{String(index + 1).padStart(2, "0")}</small><strong>{item}</strong><i>✓</i></li>
                      ))}
                    </ul>
                    <footer><span>SOURCE ACCESS</span><strong>VERIFIED</strong></footer>
                  </article>

                  <article className={styles.resolutionCard}>
                    <header><span>RECOMMENDED RESOLUTION</span><b>{handoff.toUpperCase()}</b></header>
                    <h4>{activeCase.action}</h4>
                    <p>Die nächste Aktion wird anhand von Confidence, Policies und Service-Rollen kontrolliert vorbereitet.</p>
                    <div className={styles.resolutionActions}>
                      <button type="button" onClick={() => { setRunning(false); setHandoff("prepared"); setStage(7); }}>PREPARE HANDOFF</button>
                      <button type="button" onClick={() => { setRunning(false); setHandoff("accepted"); setStage(6); }}>RESOLVE <Arrow /></button>
                    </div>
                  </article>
                </div>

                <div className={styles.pipeline} aria-label="Service Workflow Pipeline">
                  {servicePipeline.map(([no, label, detail], index) => {
                    const state = index < stage ? "complete" : index === stage ? "active" : "waiting";
                    return (
                      <button key={no} type="button" data-state={state} onClick={() => { setRunning(false); setStage(index); }}>
                        <small>{no}</small><strong>{label}</strong><span>{detail}</span><i />
                      </button>
                    );
                  })}
                </div>

                <div className={styles.tracePanel}>
                  <div className={styles.traceHeader}><span>LIVE SERVICE TRACE</span><b>CASE / {activeCase.channel}-{activeCase.confidence}</b></div>
                  <div className={styles.traceRows}>
                    {servicePipeline.slice(0, 6).map(([no, label], index) => (
                      <div key={no} data-state={index < stage ? "complete" : index === stage ? "active" : "waiting"}>
                        <span>09:2{index}:1{index}</span>
                        <code>{label.toLowerCase().replaceAll(" ", "_")}.processed / {activeCase.customer.toLowerCase().replaceAll(" ", "_")}</code>
                        <b>{index < stage ? "DONE" : index === stage ? "RUNNING" : "QUEUED"}</b>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.capabilities} aria-labelledby="service-capabilities-title">
        <div className={styles.container}>
          <div className={styles.sectionIntro} data-service-reveal>
            <p>SERVICE CAPABILITIES</p>
            <h2 id="service-capabilities-title">Ein Service-System statt isolierter Bots.</h2>
            <span>Die Qualität entsteht aus dem Zusammenspiel von Kanälen, Kontext, Wissen, Confidence und kontrollierter Übergabe.</span>
          </div>

          <div className={styles.capabilityGrid}>
            {serviceCapabilities.map(([no, title, copy, meta]) => (
              <article key={no} data-service-reveal>
                <div><small>{no}</small><span>{meta}</span></div>
                <h3>{title}</h3>
                <p>{copy}</p>
                <footer><span>SERVICE SYSTEM</span><i /></footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.routing} aria-labelledby="service-routing-title">
        <div className={styles.container}>
          <div className={styles.routingHeader} data-service-reveal>
            <p>RESOLUTION LOGIC</p>
            <h2 id="service-routing-title">Nicht jede Anfrage braucht dieselbe Antwort. Oder denselben Weg.</h2>
          </div>

          <div className={styles.routingMap} data-service-reveal>
            <div className={styles.routingGrid} aria-hidden="true" />
            <div className={`${styles.routeNode} ${styles.routeInput}`}><small>CHANNELS</small><strong>VOICE / MAIL / CHAT</strong></div>
            <div className={`${styles.routeNode} ${styles.routeIntent}`}><small>UNDERSTAND</small><strong>INTENT + SENTIMENT</strong></div>
            <div className={`${styles.routeNode} ${styles.routeContext}`}><small>CONTEXT</small><strong>CRM + SLA + POLICY</strong></div>
            <div className={`${styles.routeNode} ${styles.routeAgent}`}><small>INTELLIGENCE</small><strong>SERVICE AGENT</strong></div>
            <div className={`${styles.routeNode} ${styles.routeResolve}`}><small>ACTION</small><strong>RESOLVE</strong></div>
            <div className={`${styles.routeNode} ${styles.routeHandoff}`}><small>CONTROL</small><strong>HUMAN HANDOFF</strong></div>
            <svg viewBox="0 0 1200 600" aria-hidden="true">
              <path d="M130 300 C250 300 260 120 430 120" />
              <path d="M130 300 C250 300 260 480 430 480" />
              <path d="M540 120 C650 120 650 300 760 300" />
              <path d="M540 480 C650 480 650 300 760 300" />
              <path d="M870 300 C980 300 980 160 1080 160" />
              <path d="M870 300 C980 300 980 440 1080 440" />
            </svg>
            <span className={styles.routePulse} aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className={styles.closing} aria-labelledby="service-closing-title">
        <div className={styles.container}>
          <div className={styles.closingMeta}><span>FROM REQUEST</span><i /><span>TO CONTEXT</span><i /><span>TO RESOLUTION</span></div>
          <div className={styles.closingLayout}>
            <div data-service-reveal>
              <p>BUILD YOUR SERVICE SYSTEM</p>
              <h2 id="service-closing-title">Service wird skalierbar, wenn Kontext mitwächst.</h2>
            </div>
            <aside data-service-reveal>
              <p>Wir analysieren Ihre Service-Kanäle, Wissensquellen, Übergaben und Eskalationslogik und definieren daraus einen kontrollierten AI-Service-Pilot.</p>
              <Link href="/#contact">Workflow Audit starten <Arrow /></Link>
              <Link className={styles.secondaryLink} href="/loesungen">Alle Lösungen ansehen <Arrow /></Link>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
