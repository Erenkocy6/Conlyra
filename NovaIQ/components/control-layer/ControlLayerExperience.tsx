"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./ControlLayerExperience.module.css";

type Decision = "ALLOW" | "APPROVE" | "BLOCK" | "ESCALATE";

type Identity = {
  code: string;
  name: string;
  role: string;
  scope: string;
  permissions: string[];
  risk: "LOW" | "MEDIUM" | "HIGH";
};

const identities: Identity[] = [
  {
    code: "ID01",
    name: "Sales Agent",
    role: "REVENUE SYSTEM",
    scope: "CRM / EMAIL / KNOWLEDGE",
    permissions: ["READ CRM", "READ KNOWLEDGE", "DRAFT EMAIL", "WRITE ACTIVITY"],
    risk: "MEDIUM",
  },
  {
    code: "ID02",
    name: "Support Agent",
    role: "SERVICE SYSTEM",
    scope: "TICKETS / KNOWLEDGE / MESSAGING",
    permissions: ["READ TICKETS", "READ KNOWLEDGE", "WRITE DRAFT", "ESCALATE CASE"],
    risk: "LOW",
  },
  {
    code: "ID03",
    name: "Operations Agent",
    role: "OPERATIONS SYSTEM",
    scope: "ERP / ORDERS / INVENTORY",
    permissions: ["READ ERP", "READ ORDERS", "PREPARE UPDATE", "REQUEST APPROVAL"],
    risk: "HIGH",
  },
  {
    code: "ID04",
    name: "Voice Agent",
    role: "VOICE SYSTEM",
    scope: "CRM / CALENDAR / POLICY",
    permissions: ["READ CUSTOMER", "READ CALENDAR", "UPDATE SLOT", "HUMAN HANDOFF"],
    risk: "MEDIUM",
  },
];

const actions = [
  { code: "A01", action: "Read customer context", system: "CRM", risk: "LOW", decision: "ALLOW" as Decision },
  { code: "A02", action: "Create email draft", system: "EMAIL", risk: "LOW", decision: "ALLOW" as Decision },
  { code: "A03", action: "Change order status", system: "ERP", risk: "MEDIUM", decision: "APPROVE" as Decision },
  { code: "A04", action: "Apply special discount", system: "CRM", risk: "HIGH", decision: "ESCALATE" as Decision },
  { code: "A05", action: "Export private dataset", system: "DATA", risk: "HIGH", decision: "BLOCK" as Decision },
  { code: "A06", action: "Reschedule appointment", system: "CALENDAR", risk: "LOW", decision: "ALLOW" as Decision },
] as const;

const approvals = [
  { id: "AP-208", agent: "Operations Agent", action: "Update delivery date", target: "ERP / ORDER 4812", risk: "MEDIUM" },
  { id: "AP-209", agent: "Sales Agent", action: "Apply custom discount", target: "CRM / DEAL 7F21", risk: "HIGH" },
  { id: "AP-210", agent: "Voice Agent", action: "Override booking policy", target: "CALENDAR / SLOT 14:30", risk: "MEDIUM" },
] as const;

const traces = [
  ["10:42:11", "INPUT RECEIVED", "voice.intent / reschedule_appointment", "ALLOW"],
  ["10:42:12", "CONTEXT READ", "crm.customer + calendar.availability", "ALLOW"],
  ["10:42:13", "POLICY CHECK", "booking.policy / standard_window", "ALLOW"],
  ["10:42:14", "ACTION PREPARED", "calendar.update / slot 14:30", "APPROVE"],
  ["10:42:18", "HUMAN CONFIRMATION", "service.owner / confirmed", "ALLOW"],
  ["10:42:19", "ACTION EXECUTED", "calendar.update / success", "ALLOW"],
  ["10:42:20", "TRACE SEALED", "trace / CL-8A91", "ALLOW"],
] as const;

const principles = [
  ["01", "IDENTITY", "Jedes System hat eine Rolle", "Agenten handeln nicht anonym. Jede Aktion gehört zu einer definierten Systemidentität."],
  ["02", "SCOPE", "Rechte bleiben begrenzt", "Zugriff gilt nur für die Systeme, Daten und Aktionen, die für die Aufgabe wirklich nötig sind."],
  ["03", "APPROVAL", "Risiko entscheidet über Freigabe", "Sensible Aktionen werden vorbereitet, aber erst nach menschlicher Bestätigung ausgeführt."],
  ["04", "TRACE", "Jeder Schritt bleibt sichtbar", "Input, Kontext, Entscheidung, Aktion und Ergebnis werden als nachvollziehbarer Trace dokumentiert."],
] as const;

function decisionLabel(decision: Decision) {
  const map: Record<Decision, string> = {
    ALLOW: "AUTO EXECUTE",
    APPROVE: "HUMAN APPROVAL",
    BLOCK: "BLOCK ACTION",
    ESCALATE: "ESCALATE OWNER",
  };
  return map[decision];
}

export function ControlLayerExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeIdentity, setActiveIdentity] = useState(0);
  const [activeAction, setActiveAction] = useState(2);
  const [approvalStates, setApprovalStates] = useState<Record<string, "PENDING" | "APPROVED" | "REJECTED">>({
    "AP-208": "PENDING",
    "AP-209": "PENDING",
    "AP-210": "PENDING",
  });
  const [traceStep, setTraceStep] = useState(0);
  const [traceState, setTraceState] = useState<"idle" | "running" | "done">("idle");

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-control-reveal]"));
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

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (traceState !== "running") return;

    const timer = window.setInterval(() => {
      setTraceStep((current) => {
        const next = current + 1;
        if (next >= traces.length - 1) {
          window.clearInterval(timer);
          setTraceState("done");
          return traces.length - 1;
        }
        return next;
      });
    }, 760);

    return () => window.clearInterval(timer);
  }, [traceState]);

  const selectedIdentity = identities[activeIdentity];
  const selectedAction = actions[activeAction];
  const pendingCount = useMemo(
    () => Object.values(approvalStates).filter((state) => state === "PENDING").length,
    [approvalStates],
  );

  const decideApproval = (id: string, next: "APPROVED" | "REJECTED") => {
    setApprovalStates((current) => ({ ...current, [id]: next }));
  };

  const runTrace = () => {
    setTraceStep(0);
    setTraceState("running");
  };

  return (
    <div className={styles.root} ref={rootRef} data-control-layer-experience>
      <section className={styles.hero} aria-labelledby="control-hero-title">
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroGlow} aria-hidden="true" />

        <div className={styles.heroLayout}>
          <div className={styles.heroCopy}>
            <p>CONLYRA / PRODUCT 07 / CONTROL LAYER</p>
            <h1 id="control-hero-title">
              <span>AI handeln lassen.</span>
              <span>Ohne Kontrolle</span>
              <span>abzugeben.</span>
            </h1>
            <div className={styles.heroSubline}>
              <span>
                CONLYRA definiert Identitäten, Rechte, Freigaben, Risikostufen und nachvollziehbare Trace-Logik für kontrollierte AI-Systeme.
              </span>
              <a href="#permission-graph">Control Room öffnen <span aria-hidden="true">↗</span></a>
            </div>
          </div>

          <aside className={styles.heroConsole} aria-label="Control Layer Status">
            <header>
              <span>CONTROL LAYER</span>
              <strong><i /> ENFORCING</strong>
            </header>
            <div className={styles.controlCore}>
              <div className={styles.controlRing}>
                <span>CONLYRA</span>
                <strong>07</strong>
                <small>POLICY ENGINE</small>
              </div>
              <div className={styles.riskOrbit} aria-hidden="true">
                <i data-risk="low" />
                <i data-risk="medium" />
                <i data-risk="high" />
              </div>
            </div>
            <div className={styles.consoleStats}>
              <div><span>IDENTITIES</span><strong>04 ACTIVE</strong></div>
              <div><span>POLICIES</span><strong>18 ENFORCED</strong></div>
              <div><span>APPROVALS</span><strong>{String(pendingCount).padStart(2, "0")} PENDING</strong></div>
            </div>
            <footer><span>TRACE / ON</span><span>MODE / CONTROLLED</span></footer>
          </aside>
        </div>

        <div className={styles.heroRail}>
          <span>CONTROL LAYER / DACH</span>
          <span>IDENTITY → SCOPE → POLICY → APPROVAL → TRACE</span>
        </div>
      </section>

      <section className={styles.permission} id="permission-graph" aria-labelledby="permission-title">
        <div className={styles.container}>
          <div className={styles.sectionHead} data-control-reveal>
            <p>PERMISSION GRAPH</p>
            <h2 id="permission-title">Jedes System sieht nur, was es braucht.</h2>
            <span>Wählen Sie eine Systemidentität und sehen Sie Rolle, Scope, Risikoprofil und erlaubte Fähigkeiten.</span>
          </div>

          <div className={styles.permissionShell} data-control-reveal>
            <nav className={styles.identityList} aria-label="System identities">
              <header><span>SYSTEM IDENTITIES</span><strong>04 ACTIVE</strong></header>
              {identities.map((identity, index) => (
                <button key={identity.code} type="button" data-active={activeIdentity === index} onClick={() => setActiveIdentity(index)}>
                  <small>{identity.code}</small>
                  <span>{identity.name}</span>
                  <strong>{identity.risk}</strong>
                </button>
              ))}
            </nav>

            <div className={styles.permissionGraph}>
              <div className={styles.graphGrid} aria-hidden="true" />
              <div className={styles.identityCore}>
                <small>{selectedIdentity.code}</small>
                <strong>{selectedIdentity.name}</strong>
                <span>{selectedIdentity.role}</span>
              </div>
              <div className={styles.permissionNodes}>
                {selectedIdentity.permissions.map((permission, index) => (
                  <div key={permission} style={{ "--i": index } as React.CSSProperties}>
                    <small>P0{index + 1}</small>
                    <strong>{permission}</strong>
                    <span>ALLOWED</span>
                  </div>
                ))}
              </div>
              <svg className={styles.graphLines} viewBox="0 0 1000 620" preserveAspectRatio="none" aria-hidden="true">
                <line x1="500" y1="310" x2="220" y2="150" />
                <line x1="500" y1="310" x2="780" y2="150" />
                <line x1="500" y1="310" x2="220" y2="470" />
                <line x1="500" y1="310" x2="780" y2="470" />
              </svg>
            </div>

            <aside className={styles.identityInspector}>
              <header><span>IDENTITY INSPECTOR</span><strong>{selectedIdentity.code}</strong></header>
              <div>
                <small>ROLE</small>
                <h3>{selectedIdentity.name}</h3>
                <p>{selectedIdentity.role}</p>
              </div>
              <dl>
                <div><dt>SCOPE</dt><dd>{selectedIdentity.scope}</dd></div>
                <div><dt>RISK PROFILE</dt><dd>{selectedIdentity.risk}</dd></div>
                <div><dt>EXECUTION</dt><dd>POLICY BOUND</dd></div>
              </dl>
              <footer><span>LEAST PRIVILEGE</span><strong>ENFORCED</strong></footer>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.matrix} aria-labelledby="matrix-title">
        <div className={styles.container}>
          <div className={styles.sectionHead} data-control-reveal>
            <p>ACTION CONTROL MATRIX</p>
            <h2 id="matrix-title">Nicht jede Aktion wird gleich behandelt.</h2>
            <span>Risiko, Systemkontext und Policy entscheiden, ob eine Aktion automatisch läuft, Freigabe braucht, eskaliert oder blockiert wird.</span>
          </div>

          <div className={styles.matrixShell} data-control-reveal>
            <div className={styles.actionRows}>
              <header><span>ACTIONS</span><strong>06 POLICIES</strong></header>
              {actions.map((item, index) => (
                <button key={item.code} type="button" data-active={activeAction === index} onClick={() => setActiveAction(index)}>
                  <small>{item.code}</small>
                  <span>{item.action}</span>
                  <b>{item.system}</b>
                  <strong data-decision={item.decision}>{item.decision}</strong>
                </button>
              ))}
            </div>

            <aside className={styles.decisionPanel} data-decision={selectedAction.decision}>
              <header><span>POLICY DECISION</span><strong>{selectedAction.code}</strong></header>
              <div className={styles.decisionCore}>
                <small>{selectedAction.risk} RISK / {selectedAction.system}</small>
                <h3>{selectedAction.decision}</h3>
                <p>{selectedAction.action}</p>
                <div><span>ACTION MODE</span><strong>{decisionLabel(selectedAction.decision)}</strong></div>
              </div>
              <footer><span>POLICY ENGINE</span><strong>DECISION SEALED</strong></footer>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.approvals} aria-labelledby="approval-title">
        <div className={styles.container}>
          <div className={styles.sectionHead} data-control-reveal>
            <p>HUMAN APPROVAL QUEUE</p>
            <h2 id="approval-title">Automatisieren Sie Arbeit. Nicht Verantwortung.</h2>
            <span>Sensible Aktionen können vollständig vorbereitet werden — die Entscheidung bleibt trotzdem beim zuständigen Menschen.</span>
          </div>

          <div className={styles.approvalShell} data-control-reveal>
            <header><span>APPROVAL QUEUE</span><strong>{String(pendingCount).padStart(2, "0")} PENDING</strong></header>
            {approvals.map((approval) => {
              const state = approvalStates[approval.id];
              return (
                <article key={approval.id} data-state={state}>
                  <small>{approval.id}</small>
                  <div><span>{approval.agent}</span><strong>{approval.action}</strong><p>{approval.target}</p></div>
                  <b>{approval.risk}</b>
                  <em>{state}</em>
                  <div className={styles.approvalActions}>
                    <button type="button" onClick={() => decideApproval(approval.id, "APPROVED")} disabled={state !== "PENDING"}>APPROVE</button>
                    <button type="button" onClick={() => decideApproval(approval.id, "REJECTED")} disabled={state !== "PENDING"}>REJECT</button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.trace} aria-labelledby="trace-title">
        <div className={styles.container}>
          <div className={styles.sectionHead} data-control-reveal>
            <p>LIVE TRACE EXPLORER</p>
            <h2 id="trace-title">Jede Entscheidung bekommt eine Geschichte.</h2>
            <span>Ein Trace verbindet Input, Kontext, Policy, Freigabe und Ausführung zu einer nachvollziehbaren Ereigniskette.</span>
          </div>

          <div className={styles.traceShell} data-control-reveal>
            <aside className={styles.traceMission}>
              <small>TRACE CASE / CL-8A91</small>
              <h3>Terminänderung mit kontrollierter Freigabe.</h3>
              <p>Voice Agent erkennt Intent, lädt Kontext, prüft Policy, bereitet die Aktion vor und wartet auf Bestätigung.</p>
              <button type="button" onClick={runTrace} disabled={traceState === "running"}>RUN TRACE <span aria-hidden="true">↗</span></button>
              <div><span>STATUS</span><strong><i /> {traceState.toUpperCase()}</strong></div>
            </aside>

            <div className={styles.traceRows}>
              <header><span>TRACE EXPLORER</span><strong>CL-8A91</strong></header>
              {traces.map(([time, eventName, detail, decision], index) => (
                <div key={`${time}-${eventName}`} data-active={index <= traceStep} data-current={index === traceStep}>
                  <time>{time}</time>
                  <strong>{eventName}</strong>
                  <code>{detail}</code>
                  <span data-decision={decision}>{decision}</span>
                  <i>{index <= traceStep ? "✓" : "—"}</i>
                </div>
              ))}
              <footer><span>7 EVENTS</span><span>TRACE SEALED / 0 VIOLATIONS</span></footer>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.principles} aria-labelledby="principles-title">
        <div className={styles.container}>
          <div className={styles.sectionHead} data-control-reveal>
            <p>CONTROL PRINCIPLES</p>
            <h2 id="principles-title">Autonomie braucht Grenzen, die sichtbar bleiben.</h2>
            <span>Das Control Layer trennt Geschwindigkeit von Kontrollverlust — über klare Identitäten, begrenzte Scopes, Freigaben und Traceability.</span>
          </div>

          <div className={styles.principleGrid} data-control-reveal>
            {principles.map(([code, label, title, text]) => (
              <article key={code}>
                <small>{code}</small>
                <span>{label}</span>
                <h3>{title}</h3>
                <p>{text}</p>
                <footer>CONLYRA / {label}</footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.finalCta} aria-labelledby="control-cta-title">
        <div className={styles.finalGrid} aria-hidden="true" />
        <div className={styles.finalContent} data-control-reveal>
          <p>CONLYRA / CONTROL LAYER</p>
          <h2 id="control-cta-title">Geben Sie AI Handlungsspielraum. Mit klaren Grenzen.</h2>
          <span>Wir definieren Rollen, Scopes, Freigaben und Trace-Logik für AI-Agenten und automatisierte Prozesse in Ihrer Systemlandschaft.</span>
          <a href="mailto:hello@conlyra.ai?subject=Control%20Layer%20Assessment">Control Assessment anfragen <b aria-hidden="true">↗</b></a>
        </div>
        <div className={styles.finalRail}><span>PRODUCT 07 / ONLINE</span><span>IDENTITY → POLICY → APPROVAL → ACTION → TRACE</span></div>
      </section>
    </div>
  );
}
