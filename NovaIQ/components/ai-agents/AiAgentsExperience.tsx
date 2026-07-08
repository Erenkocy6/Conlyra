"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./AiAgentsExperience.module.css";

const roles = [
  {
    no: "01",
    name: "Sales Agent",
    mission: "Qualifiziert Signale, lädt CRM-Kontext und bereitet den nächsten Schritt vor.",
    context: ["CRM HISTORY", "PRICING RULES", "COMPANY PROFILE", "MAIL THREAD"],
    tools: ["GMAIL", "HUBSPOT", "CALENDAR", "INTERNAL API"],
    limits: ["NO PRICE CHANGES", "NO DELETE ACTIONS", "SEND REQUIRES APPROVAL"],
  },
  {
    no: "02",
    name: "Support Agent",
    mission: "Versteht Anfragen, prüft Wissen und eskaliert Unsicherheit statt sie zu verstecken.",
    context: ["HELP CENTER", "CUSTOMER HISTORY", "ORDER STATUS", "POLICIES"],
    tools: ["GMAIL", "ZENDESK", "SHOP API", "SLACK"],
    limits: ["NO REFUNDS", "SLA ESCALATION", "LOW CONFIDENCE → HUMAN"],
  },
  {
    no: "03",
    name: "Operations Agent",
    mission: "Prüft Dokumente, aktualisiert Systeme und bewegt wiederkehrende Arbeit durch klare Regeln.",
    context: ["PROCESS RULES", "DOCUMENTS", "STATUS DATA", "ROLE POLICY"],
    tools: ["DRIVE", "SQL", "WEBHOOKS", "INTERNAL API"],
    limits: ["NO MASS UPDATE", "EXCEPTION → HOLD", "WRITE ACTIONS LOGGED"],
  },
  {
    no: "04",
    name: "Knowledge Agent",
    mission: "Findet verlässlichen Kontext, nennt Quellen und macht internes Wissen operativ nutzbar.",
    context: ["NOTION", "DRIVE", "POLICIES", "PROJECT DOCS"],
    tools: ["SEARCH", "RAG", "CITATIONS", "SLACK"],
    limits: ["SOURCE REQUIRED", "ROLE-BASED ACCESS", "NO UNGROUNDED ANSWERS"],
  },
] as const;

const demoSteps = [
  ["01", "SIGNAL", "Neue Anfrage erkannt", "inbound_request"],
  ["02", "RESEARCH", "Unternehmenskontext geladen", "context_verified"],
  ["03", "CRM", "Historie und Pipeline geprüft", "crm_context"],
  ["04", "DECISION", "Priorität HIGH vorgeschlagen", "decision_ready"],
  ["05", "HUMAN GATE", "Freigabe erforderlich", "approval_required"],
  ["06", "ACTION", "Follow-up vorbereitet", "action_prepared"],
  ["07", "TRACE", "Aktion protokolliert", "trace_complete"],
] as const;

const memorySources = [
  ["CRM", "3 TOUCHPOINTS", "Relationship history, stage, owner"],
  ["EMAIL", "12 MESSAGES", "Intent, objections, open questions"],
  ["KNOWLEDGE", "8 SOURCES", "Product rules, pricing, policies"],
  ["COMPANY", "VERIFIED", "Industry, size, public context"],
] as const;

const toolGroups = [
  {
    group: "COMMUNICATION",
    tools: [
      ["GMAIL", "READ / DRAFT", "SEND → APPROVAL"],
      ["SLACK", "READ / NOTIFY", "POST → POLICY"],
      ["CALENDAR", "READ / SUGGEST", "BOOK → APPROVAL"],
    ],
  },
  {
    group: "SYSTEMS",
    tools: [
      ["HUBSPOT", "READ / ENRICH", "WRITE → LOGGED"],
      ["SQL", "QUERY", "WRITE → BLOCKED"],
      ["INTERNAL API", "GET / VALIDATE", "POST → POLICY"],
    ],
  },
  {
    group: "KNOWLEDGE",
    tools: [
      ["DRIVE", "SEARCH / READ", "ROLE FILTER"],
      ["NOTION", "SEARCH / CITE", "ROLE FILTER"],
      ["POLICY LAYER", "READ / ENFORCE", "ALWAYS ACTIVE"],
    ],
  },
] as const;

const flowCases = [
  {
    no: "01",
    label: "SALES",
    title: "Vom Inbound-Signal zum qualifizierten nächsten Schritt.",
    video: "/media/AdobeStock_1535809490.mp4",
  },
  {
    no: "02",
    label: "SUPPORT",
    title: "Von der Anfrage zur verlässlichen Antwort oder gezielten Eskalation.",
    video: "/media/AdobeStock_1516198647.mp4",
  },
  {
    no: "03",
    label: "OPERATIONS",
    title: "Von Dokumenten und Statuswechseln zu kontrollierten Aktionen.",
    video: "/media/AdobeStock_1558014909.mp4",
  },
] as const;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function AiAgentsExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeRole, setActiveRole] = useState(0);
  const [demoStep, setDemoStep] = useState(-1);
  const [demoState, setDemoState] = useState<"idle" | "running" | "approval" | "approved" | "rejected">("idle");
  const [activeSource, setActiveSource] = useState(0);
  const [traceFilter, setTraceFilter] = useState<"all" | "context" | "action">("all");

  const role = roles[activeRole];

  const traceRows = useMemo(
    () => [
      ["14:32:08.114", "context", "signal.received", "inbound_request / web_form"],
      ["14:32:08.441", "context", "identity.resolved", "crm_contact / existing"],
      ["14:32:09.028", "context", "memory.loaded", "12 messages / 8 knowledge sources"],
      ["14:32:09.604", "action", "decision.proposed", "priority_high / confidence_0.91"],
      ["14:32:10.031", "action", "policy.checked", "external_send / approval_required"],
      ["14:32:10.448", "action", "action.prepared", "follow_up_draft / crm_update"],
    ] as const,
    [],
  );

  const filteredTraceRows = traceRows.filter((row) => traceFilter === "all" || row[1] === traceFilter);

  useEffect(() => {
    if (demoState !== "running") return;

    const timer = window.setInterval(() => {
      setDemoStep((current) => {
        const next = current + 1;
        if (next >= 4) {
          window.clearInterval(timer);
          setDemoState("approval");
          return 4;
        }
        return next;
      });
    }, 820);

    return () => window.clearInterval(timer);
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
        root.querySelectorAll<HTMLElement>("[data-aa-reveal]").forEach((element) => {
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

        const roleStory = root.querySelector<HTMLElement>("[data-role-story]");
        if (roleStory && window.matchMedia("(min-width: 901px)").matches) {
          ScrollTrigger.create({
            trigger: roleStory,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const next = Math.min(roles.length - 1, Math.floor(self.progress * roles.length));
              setActiveRole((current) => (current === next ? current : next));
            },
          });
        }

        const heroVideo = root.querySelector<HTMLVideoElement>("[data-aa-hero-video]");
        if (heroVideo) {
          gsap.fromTo(
            heroVideo,
            { scale: 1.08 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger: heroVideo.closest("section"), start: "top top", end: "bottom top", scrub: 0.8 },
            },
          );
        }

        const trace = root.querySelector<HTMLElement>("[data-agent-trace]");
        if (trace) {
          const rows = Array.from(trace.querySelectorAll<HTMLElement>("[data-trace-row]"));
          rows.forEach((row, index) => {
            gsap.fromTo(
              row,
              { x: -18, autoAlpha: 0 },
              {
                x: 0,
                autoAlpha: 1,
                duration: 0.55,
                delay: index * 0.04,
                ease: "power2.out",
                scrollTrigger: { trigger: trace, start: "top 68%", once: true },
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

  const startDemo = () => {
    setDemoStep(-1);
    setDemoState("running");
  };

  const approveDemo = () => {
    setDemoState("approved");
    setDemoStep(6);
  };

  return (
    <div className={styles.root} ref={rootRef}>
      <header className={styles.nav}>
        <a className={styles.brand} href="/" aria-label="CONLYRA Startseite">
          <img src="/conlyra-logo.svg" alt="CONLYRA" />
        </a>
        <div className={styles.navMeta}><span>PRODUCT / 01</span><strong>AI AGENTS</strong></div>
        <a className={styles.navBack} href="/">Zur Startseite <Arrow /></a>
      </header>

      <section className={styles.hero} aria-labelledby="aa-hero-title">
        <div className={styles.heroMedia} aria-hidden="true">
          <video data-aa-hero-video autoPlay muted loop playsInline preload="metadata">
            <source src="/media/AdobeStock_517331471.mp4" type="video/mp4" />
          </video>
        </div>
        <div className={styles.heroShade} aria-hidden="true" />
        <div className={styles.heroGrid} aria-hidden="true" />

        <div className={styles.heroContent}>
          <div className={styles.heroCopy}>
            <p>CONLYRA / AI AGENTS</p>
            <h1 id="aa-hero-title">Agenten, die verstehen, bevor sie handeln.</h1>
            <span>
              Rolle. Kontext. Tools. Grenzen. CONLYRA entwickelt AI-Agenten für reale Unternehmensprozesse — kontrolliert, nachvollziehbar und eingebettet in Ihre Systeme.
            </span>
            <div className={styles.heroActions}>
              <a href="#role-builder">Agent konfigurieren <Arrow /></a>
              <a href="#live-agent">Live Demo ansehen <Arrow /></a>
            </div>
          </div>

          <aside className={styles.heroBlueprint} aria-label="Agent Blueprint">
            <div className={styles.blueprintTop}><span>AGENT BLUEPRINT</span><b><i /> READY</b></div>
            <div className={styles.blueprintIdentity}>
              <small>ROLE / 01</small>
              <strong>SALES OPERATIONS AGENT</strong>
              <span>PRIVATE CONTEXT / CONTROLLED ACTIONS</span>
            </div>
            <div className={styles.blueprintRows}>
              <div><span>CONTEXT</span><strong>CRM / EMAIL / KNOWLEDGE</strong><b>04</b></div>
              <div><span>TOOLS</span><strong>GMAIL / HUBSPOT / CALENDAR</strong><b>03</b></div>
              <div><span>AUTHORITY</span><strong>READ / DRAFT / UPDATE</strong><b>03</b></div>
              <div><span>HUMAN GATES</span><strong>SEND / PRICE / DELETE</strong><b>03</b></div>
            </div>
            <div className={styles.blueprintFooter}><span>TRACE ACTIVE</span><strong>POLICY LAYER / ON</strong></div>
          </aside>
        </div>

        <div className={styles.heroRail}><span>AI AGENTS / DACH</span><span>SCROLL TO CONFIGURE ↓</span></div>
      </section>

      <section className={styles.roleStory} id="role-builder" data-role-story aria-labelledby="role-title">
        <div className={styles.roleSticky}>
          <div className={styles.container}>
            <div className={styles.roleIntro}>
              <p>ROLE BUILDER / 01—04</p>
              <h2 id="role-title">Ein Agent braucht mehr als einen Prompt.</h2>
              <span>Jeder CONLYRA Agent beginnt mit einer klaren Rolle, privatem Kontext, erlaubten Tools und sichtbaren Grenzen.</span>
            </div>

            <div className={styles.roleStage}>
              <nav className={styles.roleTabs} aria-label="Agent Rollen">
                {roles.map((item, index) => (
                  <button
                    key={item.no}
                    type="button"
                    className={index === activeRole ? styles.roleTabActive : ""}
                    onClick={() => setActiveRole(index)}
                  >
                    <small>{item.no}</small><span>{item.name}</span><Arrow />
                  </button>
                ))}
              </nav>

              <article className={styles.rolePanel} key={role.no}>
                <div className={styles.rolePanelTop}><span>ACTIVE ROLE / {role.no}</span><b>POLICY LAYER ON</b></div>
                <div className={styles.rolePanelBody}>
                  <div>
                    <small>MISSION</small>
                    <h3>{role.name}</h3>
                    <p>{role.mission}</p>
                  </div>
                  <div className={styles.roleSpecs}>
                    <section><small>CONTEXT</small>{role.context.map((item) => <span key={item}>{item}<i>✓</i></span>)}</section>
                    <section><small>TOOLS</small>{role.tools.map((item) => <span key={item}>{item}<i>↗</i></span>)}</section>
                    <section><small>LIMITS</small>{role.limits.map((item) => <span key={item}>{item}<i>!</i></span>)}</section>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.liveAgent} id="live-agent" aria-labelledby="live-agent-title">
        <div className={styles.container}>
          <div className={styles.sectionHead} data-aa-reveal>
            <p>LIVE AGENT / FRONTEND SIMULATION</p>
            <h2 id="live-agent-title">Beobachten Sie eine Entscheidung, bevor sie zur Aktion wird.</h2>
            <span>Keine Live-Kundendaten. Simulierter Produktablauf.</span>
          </div>

          <div className={styles.demoShell} data-aa-reveal>
            <div className={styles.demoTopbar}>
              <span>CONLYRA AGENT RUN / 7F2A</span>
              <b data-state={demoState}>{demoState.toUpperCase()}</b>
            </div>

            <div className={styles.demoBody}>
              <aside className={styles.demoBrief}>
                <small>MISSION</small>
                <h3>Qualifiziere die Anfrage und bereite den nächsten sinnvollen Schritt vor.</h3>
                <dl>
                  <div><dt>ROLE</dt><dd>Sales Agent</dd></div>
                  <div><dt>RISK MODE</dt><dd>Conservative</dd></div>
                  <div><dt>EXTERNAL SEND</dt><dd>Approval required</dd></div>
                </dl>
                <button type="button" onClick={startDemo} disabled={demoState === "running"}>
                  {demoState === "idle" ? "RUN AGENT" : "RUN AGAIN"} <Arrow />
                </button>
              </aside>

              <div className={styles.demoTimeline}>
                {demoSteps.map(([no, label, title, code], index) => {
                  const active = demoStep >= index;
                  const current = demoStep === index;
                  return (
                    <div className={`${styles.demoStep} ${active ? styles.demoStepActive : ""} ${current ? styles.demoStepCurrent : ""}`} key={no}>
                      <small>{no}</small>
                      <div><span>{label}</span><strong>{title}</strong><code>{code}</code></div>
                      <i>{active ? "✓" : "—"}</i>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={styles.approvalBar} data-state={demoState}>
              <div><span>HUMAN GATE</span><strong>{demoState === "approval" ? "ACTION WAITING FOR APPROVAL" : demoState === "approved" ? "APPROVED / TRACE COMPLETE" : demoState === "rejected" ? "REJECTED / NO ACTION" : "WAITING FOR AGENT RUN"}</strong></div>
              <div>
                <button type="button" onClick={() => setDemoState("rejected")} disabled={demoState !== "approval"}>REJECT</button>
                <button type="button" onClick={approveDemo} disabled={demoState !== "approval"}>APPROVE <Arrow /></button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.memory} aria-labelledby="memory-title">
        <div className={`${styles.container} ${styles.memoryLayout}`}>
          <div className={styles.memoryCopy} data-aa-reveal>
            <p>AGENT MEMORY</p>
            <h2 id="memory-title">Kontext ist keine Chat-History.</h2>
            <span>Der Agent erhält nur den Kontext, den seine Rolle und die aktuelle Aufgabe wirklich benötigen — mit Quellen, Zugriffsregeln und Trace.</span>
          </div>

          <div className={styles.memorySystem} data-aa-reveal>
            <div className={styles.memorySources}>
              {memorySources.map(([name, count, description], index) => (
                <button
                  type="button"
                  key={name}
                  className={activeSource === index ? styles.memorySourceActive : ""}
                  onPointerEnter={() => setActiveSource(index)}
                  onFocus={() => setActiveSource(index)}
                  onClick={() => setActiveSource(index)}
                >
                  <span>{name}</span><strong>{count}</strong><small>{description}</small><Arrow />
                </button>
              ))}
            </div>

            <aside className={styles.memoryTrace}>
              <div><span>RETRIEVAL TRACE</span><b>SOURCE VERIFIED</b></div>
              <h3>{memorySources[activeSource][0]}</h3>
              <p>{memorySources[activeSource][2]}</p>
              <ol>
                <li><small>01</small><span>Permission check</span><b>PASS</b></li>
                <li><small>02</small><span>Relevant context retrieved</span><b>PASS</b></li>
                <li><small>03</small><span>Source attached to decision</span><b>PASS</b></li>
              </ol>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.tools} aria-labelledby="tools-title">
        <div className={styles.container}>
          <div className={styles.sectionHead} data-aa-reveal>
            <p>TOOL ACCESS</p>
            <h2 id="tools-title">Ein Agent darf nicht alles. Und genau das ist der Punkt.</h2>
            <span>Jedes Tool erhält eigene Rechte, Aktionen und Approval-Regeln.</span>
          </div>

          <div className={styles.toolMatrix} data-aa-reveal>
            {toolGroups.map((group) => (
              <section key={group.group}>
                <small>{group.group}</small>
                {group.tools.map(([tool, permission, gate]) => (
                  <div key={tool}>
                    <strong>{tool}</strong><span>{permission}</span><b>{gate}</b>
                  </div>
                ))}
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.gates} aria-labelledby="gates-title">
        <div className={`${styles.container} ${styles.gatesLayout}`}>
          <div className={styles.gatesCopy} data-aa-reveal>
            <p>HUMAN GATES</p>
            <h2 id="gates-title">Autonomie endet dort, wo Verantwortung beginnt.</h2>
            <span>Freigaben sind kein nachträglicher Notausgang. Sie sind Teil des Systemdesigns.</span>
          </div>

          <div className={styles.gateStack} data-aa-reveal>
            <article><small>LOW RISK</small><h3>CRM-Feld aktualisieren</h3><p>Innerhalb definierter Felder automatisch ausführbar.</p><span>AUTO EXECUTE</span></article>
            <article><small>MEDIUM RISK</small><h3>Externes Follow-up senden</h3><p>Inhalt vorbereitet, Versand erst nach menschlicher Freigabe.</p><span>HUMAN APPROVAL</span></article>
            <article><small>HIGH RISK</small><h3>Preis oder Vertrag ändern</h3><p>Für den Agenten vollständig blockiert oder an definierte Rollen eskaliert.</p><span>BLOCK / ESCALATE</span></article>
          </div>
        </div>
      </section>

      <section className={styles.trace} data-agent-trace aria-labelledby="trace-title">
        <div className={styles.container}>
          <div className={styles.traceHead} data-aa-reveal>
            <div><p>AGENT TRACE</p><h2 id="trace-title">Jede Entscheidung hinterlässt eine Spur.</h2></div>
            <nav aria-label="Trace Filter">
              {(["all", "context", "action"] as const).map((filter) => (
                <button key={filter} type="button" onClick={() => setTraceFilter(filter)} data-active={traceFilter === filter}>{filter.toUpperCase()}</button>
              ))}
            </nav>
          </div>

          <div className={styles.traceConsole} data-aa-reveal>
            <div className={styles.traceTopbar}><span>TRACE / RUN 7F2A</span><strong><i /> LIVE OBSERVABILITY</strong></div>
            <div className={styles.traceRows}>
              {filteredTraceRows.map(([time, type, event, detail]) => (
                <div key={`${time}-${event}`} data-trace-row>
                  <time>{time}</time><span>{type.toUpperCase()}</span><strong>{event}</strong><code>{detail}</code><i>✓</i>
                </div>
              ))}
            </div>
            <div className={styles.traceFooter}><span>6 EVENTS</span><span>0 POLICY VIOLATIONS</span><span>1 HUMAN GATE</span></div>
          </div>
        </div>
      </section>

      <section className={styles.flows} aria-labelledby="flows-title">
        <div className={styles.container}>
          <div className={styles.sectionHead} data-aa-reveal>
            <p>REAL FLOWS</p>
            <h2 id="flows-title">Agenten werden wertvoll, wenn sie Arbeit bewegen.</h2>
            <span>Sales / Support / Operations</span>
          </div>

          <div className={styles.flowRows}>
            {flowCases.map((flow) => (
              <a href="/#use-cases" key={flow.no} data-aa-reveal>
                <div className={styles.flowMedia}><video autoPlay muted loop playsInline preload="none"><source src={flow.video} type="video/mp4" /></video><span>{flow.no} / {flow.label}</span></div>
                <div className={styles.flowBody}><small>{flow.label}</small><h3>{flow.title}</h3><span>FLOW ANSEHEN <Arrow /></span></div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.finalCta} aria-labelledby="aa-final-title">
        <div className={styles.finalMedia} aria-hidden="true"><video autoPlay muted loop playsInline preload="none"><source src="/media/AdobeStock_534758496.mp4" type="video/mp4" /></video></div>
        <div className={styles.finalShade} aria-hidden="true" />
        <div className={styles.finalContent}>
          <p>BUILD YOUR FIRST AGENT.</p>
          <h2 id="aa-final-title">Der erste Agent beginnt mit einem echten Prozess.</h2>
          <span>Wir identifizieren Rolle, Kontext, Tools und Human Gates für einen ersten kontrollierten Pilot.</span>
          <a href="mailto:hello@conlyra.ai">Agent-Pilot anfragen <Arrow /></a>
        </div>
      </section>
    </div>
  );
}
