"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./ConlyraOperationsReality.module.css";

const stages = [
  { id: "signal", label: "Signal", detail: "Request received" },
  { id: "context", label: "Context", detail: "Data enriched" },
  { id: "reason", label: "Reason", detail: "Agent analysis" },
  { id: "decision", label: "Decision", detail: "Action selected" },
  { id: "control", label: "Control", detail: "Policy verified" },
  { id: "execute", label: "Execute", detail: "Systems updated" },
] as const;

const workflows = [
  {
    id: "sales-intake",
    no: "01",
    team: "SALES OPS",
    title: "Inbound lead orchestration",
    signal: "Website inquiry",
    entity: "Müller Maschinenbau GmbH",
    action: "CRM update + follow-up draft",
    confidence: "96.4%",
    latency: "1.8s",
    owner: "Revenue Agent",
    status: "RUNNING",
  },
  {
    id: "support-escalation",
    no: "02",
    team: "CUSTOMER OPS",
    title: "Support escalation routing",
    signal: "Priority ticket",
    entity: "Enterprise customer / SLA 01",
    action: "Route expert + prepare context",
    confidence: "93.1%",
    latency: "2.1s",
    owner: "Service Agent",
    status: "RUNNING",
  },
  {
    id: "finance-check",
    no: "03",
    team: "FINANCE OPS",
    title: "Invoice anomaly check",
    signal: "ERP event",
    entity: "Invoice #CN-4831",
    action: "Flag deviation + request review",
    confidence: "88.7%",
    latency: "1.4s",
    owner: "Finance Agent",
    status: "CONTROL",
  },
] as const;

const activityByStage = [
  "signal.received / source verified",
  "context.loaded / crm + knowledge",
  "agent.reasoned / workflow fit calculated",
  "decision.created / next action prepared",
  "policy.checked / permissions verified",
  "execution.completed / systems synchronized",
] as const;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function ConlyraOperationsReality() {
  const [activeWorkflowId, setActiveWorkflowId] = useState<(typeof workflows)[number]["id"]>(workflows[0].id);
  const [stageIndex, setStageIndex] = useState(2);
  const [isLive, setIsLive] = useState(true);
  const [cycle, setCycle] = useState(14);

  const activeWorkflow = useMemo(
    () => workflows.find((workflow) => workflow.id === activeWorkflowId) ?? workflows[0],
    [activeWorkflowId],
  );

  useEffect(() => {
    if (!isLive) return;

    const timer = window.setInterval(() => {
      setStageIndex((current) => (current + 1) % stages.length);
      setCycle((current) => current + 1);
    }, 1900);

    return () => window.clearInterval(timer);
  }, [isLive]);

  const stepForward = () => {
    setIsLive(false);
    setStageIndex((current) => (current + 1) % stages.length);
    setCycle((current) => current + 1);
  };

  const resetSystem = () => {
    setIsLive(false);
    setStageIndex(0);
    setCycle(1);
  };

  return (
    <section className={styles.root} id="operations-reality" aria-labelledby="conlyra-operations-reality-title">
      <div className={styles.container}>
        <div className={styles.intro}>
          <p>PRODUCT REALITY / PHASE 01</p>
          <h2 id="conlyra-operations-reality-title">
            Arbeit wird sichtbar.
            <span>Bevor sie ausgeführt wird.</span>
          </h2>
          <div className={styles.introMeta}>
            <span>CONLYRA OPERATIONS REALITY</span>
            <p>
              Ein operativer Blick auf Agenten, Workflows, Entscheidungen und Systemzustände — in einer kontrollierten Oberfläche.
            </p>
          </div>
        </div>

        <div className={styles.shell}>
          <header className={styles.topbar}>
            <div className={styles.brandLockup}>
              <i aria-hidden="true" />
              <strong>CONLYRA / OPERATIONS REALITY</strong>
            </div>
            <nav aria-label="Operations Reality Bereiche">
              <span className={styles.navActive}>OPERATIONS</span>
              <span>AGENTS</span>
              <span>DECISIONS</span>
              <span>SYSTEM</span>
            </nav>
            <button
              className={styles.liveControl}
              type="button"
              data-live={isLive ? "true" : "false"}
              onClick={() => setIsLive((current) => !current)}
              aria-pressed={isLive}
            >
              <i aria-hidden="true" />
              {isLive ? "LIVE SYSTEM" : "SYSTEM PAUSED"}
            </button>
          </header>

          <div className={styles.metrics}>
            <article>
              <span>ACTIVE AGENTS</span>
              <strong>07</strong>
              <small>+2 THIS WEEK</small>
            </article>
            <article>
              <span>WORKFLOWS / 24H</span>
              <strong>1,284</strong>
              <small>99.2% SUCCESS</small>
            </article>
            <article>
              <span>HUMAN GATES</span>
              <strong>12</strong>
              <small>3 OPEN</small>
            </article>
            <article>
              <span>SYSTEM HEALTH</span>
              <strong>99.98</strong>
              <small>ALL SERVICES ONLINE</small>
            </article>
          </div>

          <div className={styles.commandGrid}>
            <aside className={styles.workflowRail}>
              <div className={styles.railHeader}>
                <span>RUNNING WORKFLOWS</span>
                <b>03</b>
              </div>

              <div className={styles.workflowList}>
                {workflows.map((workflow) => {
                  const active = workflow.id === activeWorkflow.id;
                  return (
                    <button
                      type="button"
                      key={workflow.id}
                      className={active ? styles.workflowActive : ""}
                      onClick={() => {
                        setActiveWorkflowId(workflow.id);
                        setStageIndex(0);
                        setCycle((current) => current + 1);
                      }}
                      aria-pressed={active}
                    >
                      <span>{workflow.no}</span>
                      <div>
                        <small>{workflow.team}</small>
                        <strong>{workflow.title}</strong>
                      </div>
                      <i>{workflow.status}</i>
                    </button>
                  );
                })}
              </div>

              <div className={styles.railFooter}>
                <span>AUTONOMY MODE</span>
                <strong>CONTROLLED</strong>
                <small>Human approval remains active for defined actions.</small>
              </div>
            </aside>

            <div className={styles.workspace}>
              <div className={styles.workspaceHeader}>
                <div>
                  <span>WORKFLOW / {activeWorkflow.no}</span>
                  <h3>{activeWorkflow.title}</h3>
                </div>
                <div className={styles.workspaceMeta}>
                  <span>OWNER</span>
                  <strong>{activeWorkflow.owner}</strong>
                </div>
              </div>

              <div className={styles.pipeline} aria-label="Workflow execution pipeline">
                {stages.map((stage, index) => {
                  const state = index < stageIndex ? "complete" : index === stageIndex ? "active" : "waiting";
                  return (
                    <button
                      key={stage.id}
                      type="button"
                      data-state={state}
                      onClick={() => {
                        setIsLive(false);
                        setStageIndex(index);
                      }}
                    >
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <strong>{stage.label}</strong>
                      <small>{stage.detail}</small>
                      <i aria-hidden="true" />
                    </button>
                  );
                })}
              </div>

              <div className={styles.realityGrid}>
                <article className={styles.signalCard}>
                  <header>
                    <span>INPUT SIGNAL</span>
                    <b>VERIFIED</b>
                  </header>
                  <div>
                    <small>SOURCE</small>
                    <strong>{activeWorkflow.signal}</strong>
                  </div>
                  <div>
                    <small>ENTITY</small>
                    <strong>{activeWorkflow.entity}</strong>
                  </div>
                  <footer>
                    <span>EVENT ID</span>
                    <code>CLY-{activeWorkflow.no}-8F{cycle}</code>
                  </footer>
                </article>

                <article className={styles.reasonCard}>
                  <header>
                    <span>AGENT REASONING</span>
                    <b>{stages[stageIndex].label.toUpperCase()}</b>
                  </header>
                  <div className={styles.reasonCore}>
                    <span className={styles.orbit} aria-hidden="true" />
                    <i aria-hidden="true" />
                    <strong>{activeWorkflow.confidence}</strong>
                    <small>CONFIDENCE</small>
                  </div>
                  <div className={styles.reasonFacts}>
                    <span>CONTEXT <b>LOADED</b></span>
                    <span>POLICY <b>MATCH</b></span>
                    <span>RISK <b>LOW</b></span>
                  </div>
                </article>

                <article className={styles.actionCard}>
                  <header>
                    <span>NEXT ACTION</span>
                    <b>PREPARED</b>
                  </header>
                  <h4>{activeWorkflow.action}</h4>
                  <p>Die Aktion bleibt sichtbar, nachvollziehbar und innerhalb der definierten Berechtigungen.</p>
                  <div className={styles.actionMeta}>
                    <span>LATENCY <b>{activeWorkflow.latency}</b></span>
                    <span>TRACE <b>ACTIVE</b></span>
                  </div>
                </article>
              </div>

              <div className={styles.activityPanel}>
                <div className={styles.activityHeader}>
                  <span>LIVE EXECUTION TRACE</span>
                  <b>CYCLE / {String(cycle).padStart(3, "0")}</b>
                </div>
                <div className={styles.activityRows}>
                  {activityByStage.map((activity, index) => (
                    <div key={activity} data-state={index < stageIndex ? "complete" : index === stageIndex ? "active" : "waiting"}>
                      <span>{`14:32:${String(8 + index).padStart(2, "0")}`}</span>
                      <code>{activity}</code>
                      <b>{index < stageIndex ? "DONE" : index === stageIndex ? "RUNNING" : "QUEUED"}</b>
                    </div>
                  ))}
                </div>
              </div>

              <footer className={styles.commandBar}>
                <div>
                  <span>RUN MODE</span>
                  <strong>{isLive ? "AUTONOMOUS / CONTROLLED" : "MANUAL INSPECTION"}</strong>
                </div>
                <div className={styles.commandActions}>
                  <button type="button" onClick={() => setIsLive((current) => !current)}>
                    {isLive ? "PAUSE SYSTEM" : "RESUME SYSTEM"}
                  </button>
                  <button type="button" onClick={stepForward}>STEP FORWARD</button>
                  <button type="button" onClick={resetSystem}>RESET</button>
                  <a href="#system">VIEW SYSTEM MAP <Arrow /></a>
                </div>
              </footer>
            </div>
          </div>
        </div>

        <div className={styles.outroLine}>
          <span>NOT A BLACK BOX.</span>
          <strong>INTELLIGENCE YOU CAN SEE, GUIDE AND CONTROL.</strong>
        </div>
      </div>
    </section>
  );
}
