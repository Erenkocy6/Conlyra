"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./AiOperationsExperience.module.css";

const operationCases = [
  {
    id: "invoice",
    event: "INVOICE DEVIATION",
    source: "ERP / SAP",
    entity: "Invoice #CN-4831",
    owner: "Finance Operations",
    severity: "HIGH",
    confidence: 91,
    rule: "Deviation > 8% requires review",
    exception: "+12.4% vs. purchase order",
    action: "Hold payment + request review",
    trace: ["ERP event received", "PO matched", "Deviation detected", "Policy checked"],
  },
  {
    id: "procurement",
    event: "PROCUREMENT REQUEST",
    source: "FORM / ERP",
    entity: "Request #PR-2094",
    owner: "Procurement Operations",
    severity: "MEDIUM",
    confidence: 96,
    rule: "Amount > €10k requires approval",
    exception: "No exception / approval gate active",
    action: "Route to budget owner",
    trace: ["Request normalized", "Vendor verified", "Budget checked", "Approval route built"],
  },
  {
    id: "document",
    event: "DOCUMENT VALIDATION",
    source: "MAIL / DRIVE",
    entity: "Supplier Contract V7",
    owner: "Legal Operations",
    severity: "HIGH",
    confidence: 87,
    rule: "Missing appendix blocks execution",
    exception: "Appendix B missing",
    action: "Block execution + request document",
    trace: ["Document ingested", "Fields extracted", "Version compared", "Missing appendix found"],
  },
  {
    id: "status",
    event: "ERP STATUS CHANGE",
    source: "ERP EVENT",
    entity: "Order #SO-7781",
    owner: "Supply Operations",
    severity: "LOW",
    confidence: 98,
    rule: "Delivered status triggers CRM update",
    exception: "None",
    action: "Update CRM + close service task",
    trace: ["Status event received", "Order context loaded", "Customer matched", "Actions queued"],
  },
] as const;

const pipeline = [
  ["01", "TRIGGER", "Event erkannt"],
  ["02", "INGEST", "Daten normalisiert"],
  ["03", "VALIDATE", "Kontext geprüft"],
  ["04", "RULES", "Regeln angewendet"],
  ["05", "EXCEPTION", "Abweichung bewertet"],
  ["06", "APPROVAL", "Freigabe kontrolliert"],
  ["07", "SYSTEM WRITE", "Aktion ausgeführt"],
  ["08", "AUDIT TRACE", "Nachweis gespeichert"],
] as const;

const controlLayers = [
  ["01", "Event Intake", "ERP Events, Dokumente, Formulare und Statusänderungen werden als strukturierte Operations-Signale verarbeitet.", "ERP / DOC / FORM / EVENT"],
  ["02", "Validation & Rules", "Kontext, Vollständigkeit und Geschäftsregeln werden geprüft, bevor ein System handeln darf.", "VALIDATE / POLICY / RULES"],
  ["03", "Exception Control", "Abweichungen werden sichtbar bewertet und entweder automatisch behandelt oder gezielt eskaliert.", "RISK / DEVIATION / ESCALATION"],
  ["04", "System Execution", "Freigegebene Aktionen schreiben kontrolliert in CRM, ERP oder andere operative Systeme und erzeugen einen Trace.", "APPROVAL / WRITE / AUDIT"],
] as const;

const problemRows = [
  ["01", "Event entsteht", "Ein Mensch bemerkt ihn später", "Signal wird sofort aufgenommen"],
  ["02", "Prüfung beginnt", "Daten und Regeln werden manuell verglichen", "Kontext und Regeln laufen systematisch zusammen"],
  ["03", "Abweichung taucht auf", "Sie bleibt in Inbox oder Tabelle hängen", "Exception wird bewertet und geroutet"],
  ["04", "System wird aktualisiert", "Mehrere Tools werden nacheinander gepflegt", "Freigegebene Aktion schreibt kontrolliert zurück"],
] as const;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function AiOperationsExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeCaseId, setActiveCaseId] = useState<(typeof operationCases)[number]["id"]>(operationCases[0].id);
  const [stage, setStage] = useState(4);
  const [running, setRunning] = useState(true);
  const [decision, setDecision] = useState<"pending" | "approved" | "blocked">("pending");

  const activeCase = useMemo(
    () => operationCases.find((item) => item.id === activeCaseId) ?? operationCases[0],
    [activeCaseId],
  );

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setStage((current) => (current + 1) % pipeline.length);
    }, 1650);
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
        root.querySelectorAll<HTMLElement>("[data-ops-reveal]").forEach((element) => {
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

        root.querySelectorAll<HTMLElement>("[data-ops-row]").forEach((row, index) => {
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

  const selectCase = (id: (typeof operationCases)[number]["id"]) => {
    setActiveCaseId(id);
    setStage(0);
    setRunning(true);
    setDecision("pending");
  };

  return (
    <div className={styles.root} ref={rootRef}>
      <section className={styles.hero} aria-labelledby="ops-hero-title">
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.controlField} aria-hidden="true"><i /><i /><i /><i /><i /></div>
        <div className={styles.container}>
          <div className={styles.heroTopbar}>
            <span>CONLYRA / SOLUTION 03 / AI OPERATIONS</span>
            <strong>PROCESS CONTROL / EXCEPTION LOGIC / SYSTEM EXECUTION</strong>
          </div>
          <div className={styles.heroLayout}>
            <div className={styles.heroCopy} data-ops-reveal>
              <p>FROM EVENT TO CONTROLLED EXECUTION</p>
              <h1 id="ops-hero-title">Routine wird zu kontrollierter Ausführung.<span>Exceptions werden sichtbar.</span></h1>
            </div>
            <aside className={styles.heroAside} data-ops-reveal>
              <p>CONLYRA verbindet ERP-Events, Dokumente, Regeln, Freigaben und Systemaktionen zu einem nachvollziehbaren Operations-System.</p>
              <a href="#process-control">Process Control Grid ansehen <Arrow /></a>
            </aside>
          </div>
          <div className={styles.heroRail}>
            <span>EVENT</span><i /><span>VALIDATE</span><i /><span>RULES</span><i /><span>EXCEPTION</span><i /><span>APPROVAL</span><i /><span>EXECUTION</span>
          </div>
        </div>
      </section>

      <section className={styles.friction} aria-labelledby="ops-friction-title">
        <div className={styles.container}>
          <div className={styles.sectionIntro} data-ops-reveal>
            <p>THE OPERATIONS GAP</p>
            <h2 id="ops-friction-title">Operative Arbeit scheitert selten an der Aufgabe. Sondern an Übergaben.</h2>
            <span>Zwischen Event, Prüfung, Freigabe und Systemupdate entstehen Reibung, Medienbrüche und unsichtbare Exceptions.</span>
          </div>
          <div className={styles.frictionTable}>
            <div className={styles.frictionHead}><span>STEP</span><span>OPERATIONS MOMENT</span><span>MANUAL REALITY</span><span>WITH CONLYRA</span></div>
            {problemRows.map(([no, moment, manual, future]) => (
              <div className={styles.frictionRow} key={no} data-ops-row>
                <small>{no}</small><strong>{moment}</strong><span>{manual}</span><em>{future}</em>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.controlSection} id="process-control" aria-labelledby="process-control-title">
        <div className={styles.container}>
          <div className={styles.systemIntro} data-ops-reveal>
            <p>CONLYRA PROCESS CONTROL GRID</p>
            <h2 id="process-control-title">Jeder Prozesszustand wird sichtbar, bevor etwas geschrieben wird.</h2>
            <span>Wählen Sie einen Operations-Fall und verfolgen Sie Event, Prüfung, Regeln, Exception, Approval und System Write.</span>
          </div>

          <div className={styles.controlShell}>
            <header className={styles.shellTopbar}>
              <div><i /><strong>CONLYRA / OPERATIONS CONTROL GRID</strong></div>
              <nav aria-label="Operations Cases">
                {operationCases.map((item) => (
                  <button key={item.id} type="button" data-active={item.id === activeCase.id} onClick={() => selectCase(item.id)}>{item.event}</button>
                ))}
              </nav>
              <button className={styles.runButton} type="button" onClick={() => setRunning((value) => !value)} data-running={running}>
                <i /> {running ? "LIVE GRID" : "PAUSED"}
              </button>
            </header>

            <div className={styles.shellBody}>
              <aside className={styles.eventRail}>
                <span>ACTIVE OPERATIONS EVENT</span>
                <div className={styles.severityTag}>{activeCase.severity}</div>
                <h3>{activeCase.event}</h3>
                <dl>
                  <div><dt>SOURCE</dt><dd>{activeCase.source}</dd></div>
                  <div><dt>ENTITY</dt><dd>{activeCase.entity}</dd></div>
                  <div><dt>OWNER</dt><dd>{activeCase.owner}</dd></div>
                  <div><dt>RULE</dt><dd>{activeCase.rule}</dd></div>
                  <div><dt>EXCEPTION</dt><dd>{activeCase.exception}</dd></div>
                </dl>
                <div className={styles.confidenceScore}><span>CONFIDENCE</span><strong>{activeCase.confidence}</strong><small>%</small></div>
              </aside>

              <div className={styles.workspace}>
                <div className={styles.statusGrid}>
                  <article className={styles.eventCard}>
                    <header><span>EVENT SNAPSHOT</span><b>{activeCase.source}</b></header>
                    <h4>{activeCase.entity}</h4>
                    <p>{activeCase.event} wurde erkannt und dem Operations-Kontext zugeordnet.</p>
                    <div className={styles.signalRows}>
                      {activeCase.trace.map((item, index) => <div key={item}><small>{String(index + 1).padStart(2, "0")}</small><strong>{item}</strong><i>✓</i></div>)}
                    </div>
                  </article>

                  <article className={styles.exceptionCard}>
                    <header><span>EXCEPTION CONTROL</span><b>{activeCase.severity}</b></header>
                    <div className={styles.exceptionCore}><span>DETECTED</span><strong>{activeCase.exception}</strong></div>
                    <div className={styles.ruleBox}><small>ACTIVE RULE</small><strong>{activeCase.rule}</strong></div>
                    <footer><span>POLICY CHECK</span><strong>VERIFIED</strong></footer>
                  </article>

                  <article className={styles.actionCard}>
                    <header><span>RECOMMENDED ACTION</span><b>{decision.toUpperCase()}</b></header>
                    <h4>{activeCase.action}</h4>
                    <p>Systemaktionen werden erst ausgeführt, wenn Regeln und Freigaben erfüllt sind.</p>
                    <div className={styles.actionButtons}>
                      <button type="button" onClick={() => { setRunning(false); setDecision("blocked"); setStage(5); }}>BLOCK</button>
                      <button type="button" onClick={() => { setRunning(false); setDecision("approved"); setStage(6); }}>APPROVE <Arrow /></button>
                    </div>
                  </article>
                </div>

                <div className={styles.pipeline} aria-label="Operations Workflow Pipeline">
                  {pipeline.map(([no, label, detail], index) => {
                    const state = index < stage ? "complete" : index === stage ? "active" : "waiting";
                    return (
                      <button key={no} type="button" data-state={state} onClick={() => { setRunning(false); setStage(index); }}>
                        <small>{no}</small><strong>{label}</strong><span>{detail}</span><i />
                      </button>
                    );
                  })}
                </div>

                <div className={styles.auditPanel}>
                  <div className={styles.auditHeader}><span>IMMUTABLE OPERATION TRACE</span><b>OPS-{activeCase.confidence} / {activeCase.id.toUpperCase()}</b></div>
                  <div className={styles.auditRows}>
                    {pipeline.slice(0, 7).map(([no, label], index) => (
                      <div key={no} data-state={index < stage ? "complete" : index === stage ? "active" : "waiting"}>
                        <span>11:4{index}:2{index}</span>
                        <code>{label.toLowerCase().replaceAll(" ", "_")}.processed / {activeCase.entity.toLowerCase().replaceAll(" ", "_")}</code>
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

      <section className={styles.layers} aria-labelledby="ops-layers-title">
        <div className={styles.container}>
          <div className={styles.sectionIntro} data-ops-reveal>
            <p>OPERATIONS CAPABILITIES</p>
            <h2 id="ops-layers-title">Ein Control Layer statt einzelner Automationen.</h2>
            <span>Stabilität entsteht dort, wo Events, Regeln, Exceptions, Approvals und System Writes als ein System gedacht werden.</span>
          </div>
          <div className={styles.layerGrid}>
            {controlLayers.map(([no, title, copy, meta]) => (
              <article key={no} data-ops-reveal>
                <div><small>{no}</small><span>{meta}</span></div>
                <h3>{title}</h3><p>{copy}</p>
                <footer><span>CONTROL LAYER</span><i /></footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.network} aria-labelledby="ops-network-title">
        <div className={styles.container}>
          <div className={styles.networkHeader} data-ops-reveal>
            <p>PROCESS NETWORK</p>
            <h2 id="ops-network-title">Events werden zu Entscheidungen. Entscheidungen zu Aktionen.</h2>
          </div>
          <div className={styles.networkMap} data-ops-reveal>
            <div className={styles.networkGrid} aria-hidden="true" />
            <div className={`${styles.node} ${styles.nodeEvent}`}><small>INPUT</small><strong>ERP / DOC / EVENT</strong></div>
            <div className={`${styles.node} ${styles.nodeValidate}`}><small>VALIDATE</small><strong>CONTEXT + DATA</strong></div>
            <div className={`${styles.node} ${styles.nodeRules}`}><small>CONTROL</small><strong>RULES + POLICY</strong></div>
            <div className={`${styles.node} ${styles.nodeDecision}`}><small>DECISION</small><strong>OPS AGENT</strong></div>
            <div className={`${styles.node} ${styles.nodeApproval}`}><small>GATE</small><strong>HUMAN APPROVAL</strong></div>
            <div className={`${styles.node} ${styles.nodeWrite}`}><small>OUTPUT</small><strong>SYSTEM WRITE + TRACE</strong></div>
            <svg viewBox="0 0 1200 600" aria-hidden="true">
              <path d="M130 300 C250 300 260 120 430 120" />
              <path d="M130 300 C250 300 260 480 430 480" />
              <path d="M540 120 C650 120 650 300 760 300" />
              <path d="M540 480 C650 480 650 300 760 300" />
              <path d="M870 300 C980 300 980 160 1080 160" />
              <path d="M870 300 C980 300 980 440 1080 440" />
            </svg>
            <span className={styles.networkPulse} aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className={styles.closing} aria-labelledby="ops-closing-title">
        <div className={styles.container}>
          <div className={styles.closingMeta}><span>FROM EVENT</span><i /><span>TO CONTROL</span><i /><span>TO EXECUTION</span></div>
          <div className={styles.closingLayout}>
            <div data-ops-reveal><p>BUILD YOUR OPERATIONS SYSTEM</p><h2 id="ops-closing-title">Automatisierung wird wertvoll, wenn Kontrolle mit skaliert.</h2></div>
            <aside data-ops-reveal>
              <p>Wir analysieren Ihre operativen Events, Regeln, Freigaben, Exceptions und Systemübergaben und definieren daraus einen kontrollierten Operations-Pilot.</p>
              <Link href="/#contact">Workflow Audit starten <Arrow /></Link>
              <Link className={styles.secondaryLink} href="/loesungen">Alle Lösungen ansehen <Arrow /></Link>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
