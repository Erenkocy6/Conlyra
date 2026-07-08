"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./WorkflowExperience.module.css";

const liveStages = [
  ["01", "SIGNAL", "NEW CUSTOMER REQUEST", "00:00.000"],
  ["02", "CONTEXT", "CRM + EMAIL + PRICING", "00:00.284"],
  ["03", "LOGIC", "PRIORITY HIGH / 0.91", "00:00.611"],
  ["04", "POLICY", "EXTERNAL SEND CHECK", "00:01.043"],
  ["05", "HUMAN GATE", "APPROVAL REQUIRED", "00:01.388"],
  ["06", "ACTION", "FOLLOW-UP PREPARED", "00:01.844"],
  ["07", "TRACE", "RUN FULLY RECORDED", "00:02.118"],
] as const;

const engineLayers = [
  {
    no: "01",
    label: "SIGNAL",
    title: "Was startet den Prozess?",
    copy: "E-Mails, Formulare, CRM-Events, Dokumente, Zeitpläne oder Webhooks lösen einen kontrollierten Ablauf aus.",
    preview: ["inbound_request", "source / website", "contact / resolved", "status / accepted"],
  },
  {
    no: "02",
    label: "CONTEXT",
    title: "Welche Informationen werden benötigt?",
    copy: "Der Workflow lädt nur den Kontext, der für diesen Prozess nötig ist — aus verbundenen, freigegebenen Quellen.",
    preview: ["crm.history / 18 events", "mail.thread / 9 messages", "pricing.rules / current", "company.profile / verified"],
  },
  {
    no: "03",
    label: "LOGIC",
    title: "Welche Regeln bestimmen den nächsten Schritt?",
    copy: "Priorität, Confidence, Bedingungen und Ausnahmen werden sichtbar ausgewertet, bevor eine Aktion vorbereitet wird.",
    preview: ["priority / HIGH", "confidence / 0.91", "condition / enterprise", "next_action / outreach"],
  },
  {
    no: "04",
    label: "HUMAN GATE",
    title: "Wo bleibt der Mensch in Kontrolle?",
    copy: "Kritische Aktionen warten auf Freigabe. Risiko und Verantwortung bestimmen, wie weit Autonomie gehen darf.",
    preview: ["risk / MEDIUM", "policy / external_send", "approval / REQUIRED", "owner / sales_ops"],
  },
  {
    no: "05",
    label: "ACTION",
    title: "Was darf das System ausführen?",
    copy: "Nach Freigabe führt CONLYRA definierte Aktionen in den verbundenen Tools aus und hält den Zustand konsistent.",
    preview: ["mail.draft / created", "crm.status / updated", "task / assigned", "webhook / emitted"],
  },
  {
    no: "06",
    label: "TRACE",
    title: "Wie bleibt alles nachvollziehbar?",
    copy: "Jeder Kontextzugriff, jede Entscheidung und jede Aktion bleibt in einer sichtbaren Prozessspur erhalten.",
    preview: ["run / F8A2", "events / 14", "violations / 0", "trace / COMPLETE"],
  },
] as const;

const builderSteps = [
  ["01", "TRIGGER", "NEW LEAD"],
  ["02", "CONTEXT", "LOAD CRM"],
  ["03", "ENRICH", "RESEARCH COMPANY"],
  ["04", "LOGIC", "SCORE OPPORTUNITY"],
  ["05", "GATE", "APPROVE OUTREACH"],
  ["06", "ACTION", "CREATE FOLLOW-UP"],
] as const;

const useCases = [
  ["01", "NEW LEAD ARRIVES", "Research → Enrich → Qualify → Route", "SALES OPS"],
  ["02", "CUSTOMER NEEDS HELP", "Identify → Retrieve → Resolve → Escalate", "SUPPORT"],
  ["03", "DOCUMENT ENTERS PROCESS", "Read → Validate → Classify → Update", "OPERATIONS"],
  ["04", "TEAM NEEDS KNOWLEDGE", "Search → Ground → Answer → Cite", "KNOWLEDGE"],
  ["05", "APPROVAL IS REQUIRED", "Detect → Prepare → Review → Execute", "CONTROL"],
] as const;

const integrations = ["GMAIL", "HUBSPOT", "SLACK", "NOTION", "DRIVE", "SQL", "ERP", "REST API", "WEBHOOKS"] as const;

const simulationSteps = [
  ["00:00.000", "signal.received", "inbound_request / website"],
  ["00:00.284", "identity.resolved", "crm_contact / existing"],
  ["00:00.611", "context.loaded", "crm + mail + pricing"],
  ["00:01.043", "decision.proposed", "priority_high / confidence_0.91"],
  ["00:01.388", "policy.checked", "external_send / approval_required"],
  ["00:01.844", "action.prepared", "follow_up + crm_update"],
  ["00:02.118", "trace.persisted", "run_complete / 0 violations"],
] as const;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function WorkflowExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const builderRef = useRef<HTMLElement>(null);
  const [liveStage, setLiveStage] = useState(0);
  const [activeLayer, setActiveLayer] = useState(0);
  const [builderProgress, setBuilderProgress] = useState(0);
  const [activeUseCase, setActiveUseCase] = useState(0);
  const [simulationState, setSimulationState] = useState<"idle" | "running" | "approval" | "approved" | "rejected">("idle");
  const [simulationStep, setSimulationStep] = useState(-1);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const timer = window.setInterval(() => setLiveStage((current) => (current + 1) % liveStages.length), 1150);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const section = builderRef.current;
    if (!section) return;

    const update = () => {
      if (window.innerWidth <= 900) {
        setBuilderProgress(builderSteps.length - 1);
        return;
      }
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / travel));
      const step = Math.min(builderSteps.length - 1, Math.floor(progress * builderSteps.length));
      setBuilderProgress(step);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (simulationState !== "running") return;
    const timer = window.setInterval(() => {
      setSimulationStep((current) => {
        const next = current + 1;
        if (next >= 5) {
          window.clearInterval(timer);
          setSimulationState("approval");
          return 4;
        }
        return next;
      });
    }, 620);
    return () => window.clearInterval(timer);
  }, [simulationState]);

  useEffect(() => {
    if (simulationState !== "approved") return;
    setSimulationStep(5);
    const timer = window.setTimeout(() => setSimulationStep(6), 760);
    return () => window.clearTimeout(timer);
  }, [simulationState]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const revealItems = Array.from(root.querySelectorAll<HTMLElement>("[data-flow-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.visible = "true";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const activeEngine = engineLayers[activeLayer];
  const activeCase = useCases[activeUseCase];
  const simulationStatus = useMemo(() => simulationState.toUpperCase(), [simulationState]);

  const runSimulation = () => {
    setSimulationStep(-1);
    setSimulationState("running");
  };

  return (
    <div className={styles.root} ref={rootRef} data-conlyra-flow-experience>
      <section className={styles.hero} aria-labelledby="flow-hero-title">
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroNoise} aria-hidden="true" />
        <div className={styles.heroLayout}>
          <div className={styles.heroCopy}>
            <p>CONLYRA / PRODUCT 02 / FLOW</p>
            <h1 id="flow-hero-title"><span>Arbeit sollte</span><span>fließen.</span><span>Nicht warten.</span></h1>
            <div className={styles.heroBottom}>
              <span>CONLYRA verbindet Signale, Daten, Entscheidungen, Freigaben und Aktionen zu kontrollierten Workflows.</span>
              <a href="#workflow-audit">Workflow analysieren <Arrow /></a>
            </div>
          </div>

          <div className={styles.liveCanvas} aria-label="Live Workflow Canvas">
            <div className={styles.canvasTopbar}><span>CONLYRA FLOW / LIVE RUN</span><strong><i /> SYSTEM ONLINE</strong></div>
            <div className={styles.liveStages}>
              {liveStages.map(([no, label, detail, time], index) => (
                <div className={styles.liveStage} data-active={index === liveStage} data-passed={index < liveStage} key={no}>
                  <small>{no}</small>
                  <i />
                  <div><strong>{label}</strong><span>{detail}</span></div>
                  <time>{time}</time>
                </div>
              ))}
            </div>
            <div className={styles.canvasFooter}><span>RUN / 8F2A</span><span>7 STAGES</span><span>TRACE ACTIVE</span></div>
          </div>
        </div>
        <div className={styles.heroRail}><span>WORKFLOW AUTOMATION / DACH</span><span>SCROLL TO ENTER THE SYSTEM ↓</span></div>
      </section>

      <section className={styles.problem} aria-labelledby="flow-problem-title">
        <div className={styles.container}>
          <div className={styles.problemHead} data-flow-reveal>
            <p>THE REAL PROBLEM</p>
            <h2 id="flow-problem-title">Ihre Tools sind verbunden.<span>Ihre Arbeit noch nicht.</span></h2>
          </div>

          <div className={styles.fragmentWall} data-flow-reveal>
            <article className={styles.fragmentMail}><small>GMAIL / INBOX</small><strong>12 unread</strong><span>Can someone qualify this lead?</span></article>
            <article className={styles.fragmentCrm}><small>CRM / PIPELINE</small><strong>Lead status outdated</strong><span>Last activity / 4 days ago</span></article>
            <article className={styles.fragmentSlack}><small>SLACK / SALES-OPS</small><strong>@team can someone check this?</strong><span>3 replies / no owner</span></article>
            <article className={styles.fragmentExcel}><small>SPREADSHEET / LOCAL</small><strong>final_v7_REAL_final.xlsx</strong><span>Last edited / yesterday</span></article>
            <div className={styles.fragmentCore}><span>CONLYRA FLOW</span><strong>SYSTEM CONNECTED</strong><i /></div>
          </div>
        </div>
      </section>

      <section className={styles.engine} aria-labelledby="flow-engine-title">
        <div className={styles.container}>
          <div className={styles.engineHead} data-flow-reveal>
            <p>THE WORKFLOW ENGINE</p>
            <h2 id="flow-engine-title">Ein Workflow ist mehr als eine Automation.</h2>
            <span>Sechs Ebenen machen aus einzelnen Triggern ein kontrolliertes operatives System.</span>
          </div>

          <div className={styles.engineShell} data-flow-reveal>
            <nav className={styles.engineTabs} aria-label="Workflow Engine Ebenen">
              {engineLayers.map((layer, index) => (
                <button type="button" key={layer.no} data-active={index === activeLayer} onClick={() => setActiveLayer(index)}>
                  <small>{layer.no}</small><span>{layer.label}</span><i>↗</i>
                </button>
              ))}
            </nav>
            <article className={styles.engineStage} key={activeEngine.no}>
              <div className={styles.engineStageTop}><span>LAYER / {activeEngine.no}</span><strong>{activeEngine.label}</strong></div>
              <div className={styles.engineStageBody}>
                <div className={styles.engineCopy}>
                  <small>{activeEngine.label}</small>
                  <h3>{activeEngine.title}</h3>
                  <p>{activeEngine.copy}</p>
                </div>
                <div className={styles.engineTerminal}>
                  <div><span>FLOW ENGINE</span><strong><i /> ACTIVE</strong></div>
                  {activeEngine.preview.map((line, index) => <code key={line}><small>0{index + 1}</small><span>{line}</span><b>✓</b></code>)}
                  <footer><span>POLICY / ON</span><span>TRACE / ON</span></footer>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.transformation} aria-labelledby="flow-transform-title">
        <div className={styles.container}>
          <div className={styles.transformHead} data-flow-reveal>
            <p>FROM CHAOS TO FLOW</p>
            <h2 id="flow-transform-title">Weniger Übergaben. Mehr Bewegung.</h2>
          </div>
          <div className={styles.transformGrid}>
            <article className={styles.before} data-flow-reveal>
              <div className={styles.transformLabel}><span>BEFORE CONLYRA</span><strong>MANUAL OPERATIONS</strong></div>
              <ol>
                {["Email öffnen", "Daten kopieren", "CRM suchen", "Excel prüfen", "Kollegen fragen", "Warten", "E-Mail senden", "CRM aktualisieren"].map((item, index) => <li key={item}><small>0{index + 1}</small><span>{item}</span><i>{index < 7 ? "↓" : "■"}</i></li>)}
              </ol>
              <footer><div><strong>18 MIN</strong><span>SIMULATED EXAMPLE</span></div><div><strong>7 TOOLS</strong><span>CONTEXT SWITCHING</span></div><div><strong>4</strong><span>MANUAL HANDOFFS</span></div></footer>
            </article>
            <article className={styles.after} data-flow-reveal>
              <div className={styles.transformLabel}><span>WITH CONLYRA</span><strong>CONTROLLED FLOW</strong></div>
              <div className={styles.afterFlow}>
                {["SIGNAL", "CONTEXT", "DECISION", "APPROVAL", "ACTION"].map((item, index) => <div key={item}><small>0{index + 1}</small><strong>{item}</strong><span>{index < 4 ? "→" : "✓"}</span></div>)}
              </div>
              <div className={styles.afterCore}><span>CONLYRA FLOW ENGINE</span><strong>ONE CONTROLLED RUN</strong><i /></div>
              <footer><div><strong>43 SEC</strong><span>SIMULATED EXAMPLE</span></div><div><strong>1 FLOW</strong><span>CONTROLLED SYSTEM</span></div><div><strong>FULL</strong><span>TRACE</span></div></footer>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.builder} ref={builderRef} aria-labelledby="flow-builder-title">
        <div className={styles.builderSticky}>
          <div className={styles.container}>
            <div className={styles.builderHead}>
              <p>BUILD A FLOW</p>
              <h2 id="flow-builder-title">Aus einem Trigger wird ein System.</h2>
              <span>Scroll to construct / 01—06</span>
            </div>
            <div className={styles.builderTrack}>
              {builderSteps.map(([no, label, title], index) => (
                <div className={styles.builderNode} data-active={index <= builderProgress} data-current={index === builderProgress} key={no}>
                  <small>{no}</small><i /><span>{label}</span><strong>{title}</strong>
                </div>
              ))}
              <div className={styles.builderLine}><i style={{ width: `${(builderProgress / (builderSteps.length - 1)) * 100}%` }} /></div>
            </div>
            <div className={styles.builderStatus}><span>FLOW / SALES QUALIFICATION</span><strong><i /> {builderProgress + 1} OF {builderSteps.length} LAYERS CONNECTED</strong></div>
          </div>
        </div>
      </section>

      <section className={styles.useCaseSection} aria-labelledby="flow-usecase-title">
        <div className={styles.container}>
          <div className={styles.useCaseHead} data-flow-reveal>
            <p>WHAT SHOULD HAPPEN AUTOMATICALLY?</p>
            <h2 id="flow-usecase-title">Starten Sie dort, wo Arbeit heute liegen bleibt.</h2>
          </div>
          <div className={styles.useCaseGrid}>
            <div className={styles.useCaseRows}>
              {useCases.map(([no, title, flow, category], index) => (
                <button type="button" key={no} data-active={index === activeUseCase} onMouseEnter={() => setActiveUseCase(index)} onFocus={() => setActiveUseCase(index)} onClick={() => setActiveUseCase(index)}>
                  <small>{no}</small><div><strong>{title}</strong><span>{flow}</span></div><b>{category}</b><i>↗</i>
                </button>
              ))}
            </div>
            <aside className={styles.casePreview} key={activeCase[0]}>
              <div className={styles.casePreviewTop}><span>{activeCase[3]} / FLOW PREVIEW</span><strong><i /> READY</strong></div>
              <h3>{activeCase[1]}</h3>
              <p>{activeCase[2]}</p>
              <div className={styles.caseSignal}><span>TRIGGER RECEIVED</span><i /></div>
              <footer><span>HUMAN GATES / CONFIGURABLE</span><span>TRACE / ACTIVE</span></footer>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.control} aria-labelledby="flow-control-title">
        <div className={styles.container}>
          <div className={styles.controlHead} data-flow-reveal>
            <p>HUMAN CONTROL</p>
            <h2 id="flow-control-title">Automatisieren Sie Arbeit.<span>Nicht Verantwortung.</span></h2>
          </div>
          <div className={styles.controlGrid} data-flow-reveal>
            <div className={styles.riskRows}>
              <div><small>01</small><strong>LOW RISK</strong><span>CRM-Feld aktualisieren</span><b>AUTO EXECUTE</b></div>
              <div><small>02</small><strong>MEDIUM RISK</strong><span>Externes Follow-up senden</span><b>HUMAN APPROVAL</b></div>
              <div><small>03</small><strong>HIGH RISK</strong><span>Preis oder Vertrag ändern</span><b>BLOCK + ESCALATE</b></div>
            </div>
            <aside className={styles.policyConsole}>
              <header><span>POLICY ENGINE / LIVE</span><strong><i /> ACTIVE</strong></header>
              <code><b>✓</b><span>CRM update</span><small>AUTO</small></code>
              <code><b>✓</b><span>Internal classification</span><small>AUTO</small></code>
              <code><b>✓</b><span>Draft generation</span><small>AUTO</small></code>
              <code className={styles.policyWarn}><b>!</b><span>External email</span><small>APPROVAL</small></code>
              <code className={styles.policyBlock}><b>×</b><span>Contract modification</span><small>BLOCKED</small></code>
              <footer><span>5 RULES CHECKED</span><span>1 GATE / 1 BLOCK</span></footer>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.integrationsSection} aria-labelledby="flow-integrations-title">
        <div className={styles.container}>
          <div className={styles.integrationHead} data-flow-reveal>
            <p>INTEGRATION LAYER</p>
            <h2 id="flow-integrations-title">Ein Flow. Ihre bestehende Infrastruktur.</h2>
          </div>
          <div className={styles.network} data-flow-reveal>
            <div className={styles.networkCore}><span>CONLYRA</span><strong>FLOW ENGINE</strong><i /></div>
            {integrations.map((item, index) => <div className={styles.integrationNode} style={{ "--node-index": index } as React.CSSProperties} key={item}><span>{item}</span><small>CONNECTED</small></div>)}
            <svg viewBox="0 0 1000 620" aria-hidden="true"><g>{integrations.map((_, index) => { const angle = (Math.PI * 2 * index) / integrations.length - Math.PI / 2; const x = 500 + Math.cos(angle) * 355; const y = 310 + Math.sin(angle) * 235; return <line key={index} x1="500" y1="310" x2={x} y2={y} />; })}</g></svg>
          </div>
        </div>
      </section>

      <section className={styles.simulation} aria-labelledby="flow-simulation-title">
        <div className={styles.container}>
          <div className={styles.simHead} data-flow-reveal>
            <p>LIVE WORKFLOW SIMULATION</p>
            <h2 id="flow-simulation-title">Sehen Sie, wie ein Prozess durch das System läuft.</h2>
            <span>Frontend simulation / no live customer data.</span>
          </div>
          <div className={styles.simShell} data-flow-reveal>
            <header><span>RUN / 9C4F</span><strong data-state={simulationState}><i /> {simulationStatus}</strong></header>
            <div className={styles.simBody}>
              <aside><small>MISSION</small><h3>Qualifiziere eine neue Anfrage und bereite den nächsten kontrollierten Schritt vor.</h3><button type="button" onClick={runSimulation} disabled={simulationState === "running"}>RUN WORKFLOW <Arrow /></button></aside>
              <div className={styles.simLog}>
                {simulationSteps.map(([time, event, detail], index) => <div key={time} data-active={simulationStep >= index} data-current={simulationStep === index}><time>{time}</time><strong>{event}</strong><code>{detail}</code><i>{simulationStep >= index ? "✓" : "—"}</i></div>)}
              </div>
            </div>
            <footer className={styles.approvalBar} data-state={simulationState}>
              <div><span>HUMAN GATE</span><strong>{simulationState === "approval" ? "ACTION WAITING FOR APPROVAL" : simulationState === "approved" ? "APPROVED / ACTION EXECUTED" : simulationState === "rejected" ? "REJECTED / NO ACTION" : "WAITING FOR WORKFLOW RUN"}</strong></div>
              <div><button type="button" disabled={simulationState !== "approval"} onClick={() => setSimulationState("rejected")}>REJECT</button><button type="button" disabled={simulationState !== "approval"} onClick={() => setSimulationState("approved")}>APPROVE <Arrow /></button></div>
            </footer>
          </div>
        </div>
      </section>

      <section className={styles.finalScene} id="workflow-audit" aria-labelledby="flow-final-title">
        <div className={styles.finalGrid} aria-hidden="true" />
        <div className={styles.finalContent}>
          <p>START WITH A REAL PROCESS.</p>
          <h2 id="flow-final-title">Finden Sie die Arbeit, die sich längst selbst bewegen sollte.</h2>
          <span>Wir analysieren einen realen Prozess und definieren den ersten kontrollierten Workflow.</span>
          <a href="mailto:hello@conlyra.ai">Workflow Audit starten <Arrow /></a>
          <div className={styles.finalProof}><div><strong>01</strong><span>PROCESS</span></div><div><strong>01</strong><span>WORKSHOP</span></div><div><strong>01</strong><span>PILOT</span></div><div><strong>01</strong><span>MEASURABLE OUTCOME</span></div></div>
        </div>
      </section>
    </div>
  );
}
