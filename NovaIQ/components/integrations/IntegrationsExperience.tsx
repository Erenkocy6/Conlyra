"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./IntegrationsExperience.module.css";

type Capability = "READ" | "WRITE" | "TRIGGER";

type StackNode = {
  code: string;
  name: string;
  group: string;
  description: string;
  capabilities: Capability[];
  endpoint: string;
  latency: string;
  position: { x: number; y: number };
};

const nodes: StackNode[] = [
  {
    code: "N01",
    name: "CRM",
    group: "CUSTOMER DATA",
    description: "Kunden, Deals, Aktivitäten und Pipeline-Kontext als operative Signalquelle.",
    capabilities: ["READ", "WRITE", "TRIGGER"],
    endpoint: "crm.contacts / crm.deals",
    latency: "180ms",
    position: { x: 18, y: 28 },
  },
  {
    code: "N02",
    name: "ERP",
    group: "OPERATIONS",
    description: "Aufträge, Bestände, Lieferstatus und operative Stammdaten kontrolliert verfügbar machen.",
    capabilities: ["READ", "WRITE"],
    endpoint: "erp.orders / erp.inventory",
    latency: "260ms",
    position: { x: 17, y: 72 },
  },
  {
    code: "N03",
    name: "EMAIL",
    group: "COMMUNICATION",
    description: "Nachrichten verstehen, Entwürfe vorbereiten und freigegebene Kommunikation auslösen.",
    capabilities: ["READ", "WRITE", "TRIGGER"],
    endpoint: "mail.messages / mail.drafts",
    latency: "140ms",
    position: { x: 82, y: 24 },
  },
  {
    code: "N04",
    name: "MESSAGING",
    group: "COLLABORATION",
    description: "Teams und Kanäle als Echtzeit-Signal für Freigaben, Routing und Human Handoff.",
    capabilities: ["READ", "WRITE", "TRIGGER"],
    endpoint: "chat.channels / chat.messages",
    latency: "110ms",
    position: { x: 84, y: 68 },
  },
  {
    code: "N05",
    name: "COMMERCE",
    group: "TRANSACTIONS",
    description: "Bestellungen, Kundenstatus und Transaktionssignale mit Service- und Sales-Flows verbinden.",
    capabilities: ["READ", "TRIGGER"],
    endpoint: "commerce.orders / customers",
    latency: "210ms",
    position: { x: 36, y: 86 },
  },
  {
    code: "N06",
    name: "PAYMENTS",
    group: "FINANCE SIGNALS",
    description: "Zahlungsstatus und Events lesen, ohne sensible Aktionen unkontrolliert freizugeben.",
    capabilities: ["READ", "TRIGGER"],
    endpoint: "payments.events / invoices",
    latency: "190ms",
    position: { x: 64, y: 87 },
  },
  {
    code: "N07",
    name: "KNOWLEDGE",
    group: "PRIVATE CONTEXT",
    description: "Dokumente, Richtlinien und internes Wissen als kontrollierte Kontextschicht anbinden.",
    capabilities: ["READ"],
    endpoint: "knowledge.search / documents",
    latency: "320ms",
    position: { x: 50, y: 12 },
  },
];

const flowSteps = [
  ["00:00", "TRIGGER RECEIVED", "crm.deal.updated"],
  ["00:01", "CONTEXT READ", "crm + knowledge"],
  ["00:02", "POLICY CHECK", "action.scope / approved"],
  ["00:03", "ACTION PREPARED", "mail.draft.create"],
  ["00:04", "HUMAN APPROVAL", "sales.owner / confirmed"],
  ["00:05", "WRITE EXECUTED", "crm.activity.create"],
  ["00:06", "TRACE COMPLETE", "flow / 7C31"],
] as const;

const patterns = [
  ["01", "SYNC", "Systeme abgleichen", "Relevante Daten zwischen Quellen synchronisieren, ohne manuelle Doppelpflege."],
  ["02", "ENRICH", "Kontext ergänzen", "Ein Signal aus einem System mit Wissen und Daten aus anderen Quellen anreichern."],
  ["03", "ROUTE", "Arbeit verteilen", "Anliegen, Leads oder Exceptions automatisch an den richtigen Prozess oder Menschen routen."],
  ["04", "ACT", "Kontrolliert ausführen", "Freigegebene Systemaktionen schreiben, bestätigen und als Trace dokumentieren."],
] as const;

function capabilityActive(node: StackNode, capability: Capability) {
  return node.capabilities.includes(capability);
}

export function IntegrationsExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState(0);
  const [flowState, setFlowState] = useState<"idle" | "running" | "done">("idle");
  const [activeFlowStep, setActiveFlowStep] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-integrations-reveal]"));
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
    if (flowState !== "running") return;

    const timer = window.setInterval(() => {
      setActiveFlowStep((current) => {
        const next = current + 1;
        if (next >= flowSteps.length - 1) {
          window.clearInterval(timer);
          setFlowState("done");
          return flowSteps.length - 1;
        }
        return next;
      });
    }, 720);

    return () => window.clearInterval(timer);
  }, [flowState]);

  const selectedNode = nodes[activeNode];
  const flowStatus = useMemo(() => flowState.toUpperCase(), [flowState]);

  const runFlow = () => {
    setActiveFlowStep(0);
    setFlowState("running");
  };

  return (
    <div className={styles.root} ref={rootRef} data-integrations-experience>
      <section className={styles.hero} aria-labelledby="integrations-hero-title">
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroGlow} aria-hidden="true" />

        <div className={styles.heroLayout}>
          <div className={styles.heroCopy}>
            <p>CONLYRA / PRODUCT 06 / INTEGRATIONS</p>
            <h1 id="integrations-hero-title">
              <span>Ihre Systeme.</span>
              <span>Ein verbundener</span>
              <span>Operating Stack.</span>
            </h1>
            <div className={styles.heroSubline}>
              <span>
                CONLYRA verbindet Datenquellen, operative Systeme und Kommunikationskanäle über kontrollierte Read-, Write- und Trigger-Schnittstellen.
              </span>
              <a href="#stack-map">Stack Map öffnen <span aria-hidden="true">↗</span></a>
            </div>
          </div>

          <aside className={styles.heroConsole} aria-label="Integration Stack Status">
            <header>
              <span>OPERATING STACK</span>
              <strong><i /> CONNECTED</strong>
            </header>
            <div className={styles.consoleCore}>
              <div className={styles.consoleHub}>
                <span>CONLYRA</span>
                <strong>06</strong>
                <small>INTEGRATION LAYER</small>
              </div>
              <div className={styles.consoleLines} aria-hidden="true">
                {Array.from({ length: 6 }).map((_, index) => <i key={index} style={{ "--r": `${index * 60}deg` } as React.CSSProperties} />)}
              </div>
            </div>
            <div className={styles.consoleSignals}>
              <div><span>READ CHANNELS</span><strong>07 ACTIVE</strong></div>
              <div><span>WRITE SCOPES</span><strong>04 CONTROLLED</strong></div>
              <div><span>TRIGGERS</span><strong>05 LISTENING</strong></div>
            </div>
            <footer>
              <span>MODE / CONTROLLED</span>
              <span>TRACE / ON</span>
            </footer>
          </aside>
        </div>

        <div className={styles.heroRail}>
          <span>INTEGRATIONS / DACH</span>
          <span>SIGNAL → CONTEXT → POLICY → ACTION → TRACE</span>
        </div>
      </section>

      <section className={styles.stack} id="stack-map" aria-labelledby="stack-title">
        <div className={styles.container}>
          <div className={styles.sectionHead} data-integrations-reveal>
            <p>INTERACTIVE OPERATING STACK</p>
            <h2 id="stack-title">Ein Netzwerk aus Systemen. Nicht aus Silos.</h2>
            <span>
              Wählen Sie einen Node und sehen Sie, welche Daten gelesen, Aktionen geschrieben und Ereignisse als Trigger genutzt werden können.
            </span>
          </div>

          <div className={styles.stackShell} data-integrations-reveal>
            <div className={styles.stackMap}>
              <div className={styles.mapGrid} aria-hidden="true" />
              <div className={styles.centerNode}>
                <span>CONLYRA</span>
                <strong>OS</strong>
                <small>INTEGRATION CORE</small>
              </div>

              {nodes.map((node, index) => (
                <button
                  key={node.code}
                  type="button"
                  className={styles.node}
                  data-active={activeNode === index}
                  style={{ left: `${node.position.x}%`, top: `${node.position.y}%` }}
                  onClick={() => setActiveNode(index)}
                >
                  <small>{node.code}</small>
                  <strong>{node.name}</strong>
                  <span>{node.group}</span>
                </button>
              ))}

              <svg className={styles.connectionSvg} viewBox="0 0 1000 700" preserveAspectRatio="none" aria-hidden="true">
                {nodes.map((node, index) => (
                  <line
                    key={node.code}
                    x1="500"
                    y1="350"
                    x2={node.position.x * 10}
                    y2={node.position.y * 7}
                    data-active={activeNode === index}
                  />
                ))}
              </svg>
            </div>

            <aside className={styles.inspector}>
              <header>
                <span>CAPABILITY INSPECTOR</span>
                <strong>{selectedNode.code}</strong>
              </header>
              <div className={styles.inspectorCore}>
                <small>{selectedNode.group}</small>
                <h3>{selectedNode.name}</h3>
                <p>{selectedNode.description}</p>
              </div>

              <div className={styles.capabilities}>
                {(["READ", "WRITE", "TRIGGER"] as Capability[]).map((capability) => (
                  <div key={capability} data-active={capabilityActive(selectedNode, capability)}>
                    <span>{capability}</span>
                    <strong>{capabilityActive(selectedNode, capability) ? "ENABLED" : "LOCKED"}</strong>
                    <i />
                  </div>
                ))}
              </div>

              <div className={styles.endpoint}>
                <small>ACTIVE ENDPOINT</small>
                <code>{selectedNode.endpoint}</code>
                <span>LATENCY / {selectedNode.latency}</span>
              </div>

              <footer>
                <span>POLICY / ENFORCED</span>
                <strong>TRACE / ACTIVE</strong>
              </footer>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.flow} aria-labelledby="integration-flow-title">
        <div className={styles.container}>
          <div className={styles.sectionHead} data-integrations-reveal>
            <p>LIVE FLOW TRACE</p>
            <h2 id="integration-flow-title">Sehen Sie, wie ein Signal Arbeit bewegt.</h2>
            <span>Frontend simulation / Beispiel eines kontrollierten CRM-to-Action-Flows.</span>
          </div>

          <div className={styles.flowShell} data-integrations-reveal>
            <aside className={styles.flowMission}>
              <small>FLOW MISSION</small>
              <h3>Deal-Update erkennen, Kontext laden, Aktion vorbereiten und dokumentieren.</h3>
              <button type="button" onClick={runFlow} disabled={flowState === "running"}>
                RUN FLOW <span aria-hidden="true">↗</span>
              </button>
              <div className={styles.flowState}><span>STATUS</span><strong><i /> {flowStatus}</strong></div>
            </aside>

            <div className={styles.flowTrace}>
              <header><span>SYSTEM TRACE</span><strong>FLOW / 7C31</strong></header>
              {flowSteps.map(([time, eventName, detail], index) => (
                <div key={time} data-active={index <= activeFlowStep} data-current={index === activeFlowStep}>
                  <time>{time}</time>
                  <strong>{eventName}</strong>
                  <code>{detail}</code>
                  <i>{index <= activeFlowStep ? "✓" : "—"}</i>
                </div>
              ))}
              <footer><span>7 EVENTS</span><span>0 POLICY VIOLATIONS</span></footer>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.patterns} aria-labelledby="integration-patterns-title">
        <div className={styles.container}>
          <div className={styles.sectionHead} data-integrations-reveal>
            <p>INTEGRATION PATTERNS</p>
            <h2 id="integration-patterns-title">Verbinden ist nur der Anfang.</h2>
            <span>Der Wert entsteht, wenn Systeme gemeinsam Kontext aufbauen, Entscheidungen vorbereiten und Arbeit kontrolliert bewegen.</span>
          </div>

          <div className={styles.patternGrid} data-integrations-reveal>
            {patterns.map(([code, label, title, text]) => (
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

      <section className={styles.boundary} aria-labelledby="integration-boundary-title">
        <div className={styles.boundaryGrid} aria-hidden="true" />
        <div className={styles.boundaryContent} data-integrations-reveal>
          <p>CONTROLLED CONNECTIONS</p>
          <h2 id="integration-boundary-title">Nicht jede Verbindung braucht dieselben Rechte.</h2>
          <div className={styles.boundaryMatrix}>
            <div><span>READ</span><strong>Kontext kontrolliert verfügbar machen.</strong></div>
            <div><span>WRITE</span><strong>Nur freigegebene Aktionen in Systeme schreiben.</strong></div>
            <div><span>TRIGGER</span><strong>Relevante Ereignisse als Startpunkt nutzen.</strong></div>
            <div><span>TRACE</span><strong>Jeden Schritt sichtbar und nachvollziehbar halten.</strong></div>
          </div>
        </div>
      </section>

      <section className={styles.finalCta} aria-labelledby="integration-cta-title">
        <div className={styles.finalGrid} aria-hidden="true" />
        <div className={styles.finalContent} data-integrations-reveal>
          <p>CONLYRA / INTEGRATIONS</p>
          <h2 id="integration-cta-title">Machen Sie aus Systemen einen Operating Stack.</h2>
          <span>
            Wir analysieren Ihre Systemlandschaft, definieren sichere Datenflüsse und bauen kontrollierte Verbindungen für Agenten und Workflows.
          </span>
          <a href="mailto:hello@conlyra.ai?subject=Integration%20Assessment">
            Integration Assessment anfragen <b aria-hidden="true">↗</b>
          </a>
        </div>
        <div className={styles.finalRail}>
          <span>PRODUCT 06 / ONLINE</span>
          <span>CONNECT → READ → ACT → TRACE</span>
        </div>
      </section>
    </div>
  );
}
