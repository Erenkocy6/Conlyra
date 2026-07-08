"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./AiAgentsExperience.module.css";
import "./AiAgentsDirectorCut.module.css";

const manifestoWords =
  "Ein Agent ist kein Prompt sondern ein System aus Rolle Kontext Werkzeugen Grenzen Freigaben und einer sichtbaren Spur".split(" ");

const agentProfiles = [
  {
    no: "01",
    label: "Sales Agent",
    title: "Vom Signal zum nächsten Schritt.",
    meta: "CRM / Research / Follow-up / Approval",
    video: "/media/AdobeStock_1535809490.mp4",
    mission: "Qualifiziert neue Signale, lädt CRM- und Unternehmenskontext und bereitet einen kontrollierten nächsten Schritt vor.",
    context: ["CRM HISTORY", "MAIL THREAD", "PRICING RULES", "COMPANY PROFILE"],
    tools: ["GMAIL", "HUBSPOT", "CALENDAR", "INTERNAL API"],
    gates: ["EXTERNAL SEND", "PRICE CHANGE", "DELETE ACTION"],
  },
  {
    no: "02",
    label: "Support Agent",
    title: "Antworten mit Kontext. Eskalation bei Unsicherheit.",
    meta: "Ticket / Knowledge / Draft / Escalation",
    video: "/media/AdobeStock_1516198647.mp4",
    mission: "Versteht Anfragen, prüft verlässliche Wissensquellen und eskaliert Unsicherheit statt sie zu verstecken.",
    context: ["CUSTOMER HISTORY", "HELP CENTER", "ORDER STATUS", "POLICIES"],
    tools: ["GMAIL", "ZENDESK", "SHOP API", "SLACK"],
    gates: ["REFUND", "SLA ESCALATION", "LOW CONFIDENCE"],
  },
  {
    no: "03",
    label: "Operations Agent",
    title: "Arbeit bewegt sich durch ein System.",
    meta: "Document / Validate / Update / Audit",
    video: "/media/AdobeStock_1558014909.mp4",
    mission: "Prüft Dokumente, validiert Regeln, aktualisiert Systeme und hält Exceptions sichtbar.",
    context: ["PROCESS RULES", "DOCUMENTS", "STATUS DATA", "ROLE POLICY"],
    tools: ["DRIVE", "SQL", "WEBHOOKS", "INTERNAL API"],
    gates: ["MASS UPDATE", "EXCEPTION STATE", "WRITE ACCESS"],
  },
  {
    no: "04",
    label: "Knowledge Agent",
    title: "Unternehmenswissen wird ausführbar.",
    meta: "Search / Retrieve / Ground / Trace",
    video: "/media/AdobeStock_1525614966.mp4",
    mission: "Findet verlässlichen Kontext, nennt Quellen und macht internes Wissen für Teams und Agenten nutzbar.",
    context: ["NOTION", "DRIVE", "POLICIES", "PROJECT DOCS"],
    tools: ["SEARCH", "RAG", "CITATIONS", "SLACK"],
    gates: ["SOURCE REQUIRED", "ROLE ACCESS", "UNGROUNDED ANSWER"],
  },
] as const;

const demoSteps = [
  ["01", "SIGNAL", "Neue Anfrage erkannt", "inbound_request"],
  ["02", "CONTEXT", "CRM und Unternehmenswissen geladen", "context_verified"],
  ["03", "DECISION", "Priorität HIGH vorgeschlagen", "confidence_0.91"],
  ["04", "POLICY", "Externer Versand erfordert Kontrolle", "approval_required"],
  ["05", "HUMAN GATE", "Aktion wartet auf Freigabe", "human_review_pending"],
  ["06", "ACTION", "Follow-up und CRM-Update ausgeführt", "action_executed"],
  ["07", "TRACE", "Entscheidung und Quellen protokolliert", "trace_complete"],
] as const;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function AiAgentsExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [activeAgent, setActiveAgent] = useState(0);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [demoStep, setDemoStep] = useState(-1);
  const [demoState, setDemoState] = useState<"idle" | "running" | "approval" | "approved" | "rejected">("idle");

  const active = agentProfiles[activeAgent];

  useEffect(() => {
    if (demoState !== "running") return;

    const timer = window.setInterval(() => {
      setDemoStep((current) => {
        const next = current + 1;
        if (next >= 5) {
          window.clearInterval(timer);
          setDemoState("approval");
          return 4;
        }
        return next;
      });
    }, 760);

    return () => window.clearInterval(timer);
  }, [demoState]);

  useEffect(() => {
    if (demoState !== "approved") return;

    setDemoStep(5);
    const timer = window.setTimeout(() => setDemoStep(demoSteps.length - 1), 680);
    return () => window.clearTimeout(timer);
  }, [demoState]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      root.querySelectorAll<HTMLElement>("[data-aa-word]").forEach((word) => {
        word.style.setProperty("--aa-fill", "100%");
      });
      return;
    }

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
            { y: 28, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: element, start: "top 86%", once: true },
            },
          );
        });

        const manifesto = root.querySelector<HTMLElement>("[data-aa-manifesto]");
        const words = manifesto ? Array.from(manifesto.querySelectorAll<HTMLElement>("[data-aa-word]")) : [];
        if (manifesto && words.length) {
          ScrollTrigger.create({
            trigger: manifesto,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.75,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const total = words.length;
              words.forEach((word, index) => {
                const progress = Math.min(1, Math.max(0, self.progress * (total + 1) - index));
                word.style.setProperty("--aa-fill", `${Math.round(progress * 100)}%`);
              });
            },
          });
        }

        const system = root.querySelector<HTMLElement>("[data-agent-system]");
        if (system && window.matchMedia("(min-width: 1101px)").matches) {
          ScrollTrigger.create({
            trigger: system,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const next = Math.min(agentProfiles.length - 1, Math.floor(self.progress * agentProfiles.length));
              setActiveAgent((current) => current === next ? current : next);
            },
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

  useEffect(() => {
    const preview = previewRef.current;
    const section = rootRef.current?.querySelector<HTMLElement>("[data-agent-index]");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!preview || !section || !finePointer) return;

    let disposed = false;
    let cleanup: () => void = () => {};

    const setup = async () => {
      const { default: gsap } = await import("gsap");
      if (disposed) return;

      const xTo = gsap.quickTo(preview, "x", { duration: 0.52, ease: "power3.out" });
      const yTo = gsap.quickTo(preview, "y", { duration: 0.52, ease: "power3.out" });

      const move = (event: PointerEvent) => {
        const rect = section.getBoundingClientRect();
        xTo(event.clientX - rect.left + 24);
        yTo(event.clientY - rect.top - preview.offsetHeight * 0.5);
      };

      section.addEventListener("pointermove", move, { passive: true });
      cleanup = () => section.removeEventListener("pointermove", move);
    };

    void setup();
    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  const runDemo = () => {
    setDemoStep(-1);
    setDemoState("running");
  };

  const approveDemo = () => setDemoState("approved");

  return (
    <div className={styles.root} ref={rootRef} data-ai-agents-experience>
      <section className={styles.hero} data-aa-hero aria-labelledby="aa-hero-title">
        <div className={styles.heroMedia} aria-hidden="true">
          <video autoPlay muted loop playsInline preload="auto">
            <source src="/media/AdobeStock_517331471.mp4" type="video/mp4" />
          </video>
        </div>
        <div className={styles.heroShade} aria-hidden="true" />
        <div className={styles.heroGrid} aria-hidden="true" />

        <div className={styles.heroLayout}>
          <div className={styles.heroCopy}>
            <p>CONLYRA / PRODUCT 01 / AI AGENTS</p>
            <h1 id="aa-hero-title">Agenten, die verstehen, bevor sie handeln.</h1>
            <span>Rolle, Kontext, Tools und Grenzen — verbunden zu einem kontrollierten System für reale operative Arbeit.</span>
            <a href="#agent-system">Agenten entdecken <Arrow /></a>
          </div>

          <nav className={styles.heroIndex} aria-label="AI Agent System">
            <a href="#agent-system"><small>01</small><i /><span>Role</span></a>
            <a href="#agent-system"><small>02</small><i /><span>Context</span></a>
            <a href="#live-agent"><small>03</small><i /><span>Action</span></a>
            <a href="#control"><small>04</small><i /><span>Control</span></a>
          </nav>
        </div>

        <div className={styles.heroRail}><span>AI AGENTS / DACH</span><span>SCROLL TO EXPLORE ↓</span></div>
      </section>

      <section className={styles.manifesto} data-aa-manifesto aria-labelledby="aa-manifesto-title">
        <div className={styles.manifestoSticky}>
          <p>THE AGENT SYSTEM</p>
          <h2 id="aa-manifesto-title">
            {manifestoWords.map((word, index) => (
              <span key={`${word}-${index}`} data-aa-word>{word}{index < manifestoWords.length - 1 ? " " : ""}</span>
            ))}
          </h2>
          <div><span>NOT A CHATBOT.</span><strong>Ein Agent ist eine kontrollierte operative Rolle innerhalb Ihres Systems.</strong></div>
        </div>
      </section>

      <section
        className={styles.agentIndex}
        data-agent-index
        aria-labelledby="agent-index-title"
        onPointerLeave={() => setPreviewVisible(false)}
      >
        <div className={styles.sectionHead}>
          <p>AGENT ROLES / 01—04</p>
          <h2 id="agent-index-title">Agenten werden entworfen, nicht nur gepromptet.</h2>
          <span>Hover to inspect.</span>
        </div>

        <div className={styles.agentRows}>
          {agentProfiles.map((agent, index) => (
            <button
              type="button"
              key={agent.no}
              className={index === activeAgent ? styles.agentRowActive : ""}
              onPointerEnter={() => { setActiveAgent(index); setPreviewVisible(true); }}
              onFocus={() => { setActiveAgent(index); setPreviewVisible(true); }}
              onClick={() => setActiveAgent(index)}
            >
              <small>{agent.no}</small>
              <div><strong>{agent.label}</strong><span>{agent.meta}</span></div>
              <h3>{agent.title}</h3>
              <Arrow />
            </button>
          ))}
        </div>

        <div className={`${styles.preview} ${previewVisible ? styles.previewVisible : ""}`} ref={previewRef} aria-hidden="true">
          <video key={active.video} autoPlay muted loop playsInline preload="metadata">
            <source src={active.video} type="video/mp4" />
          </video>
          <img src="/conlyra-logo.svg" alt="" />
          <div><span>{active.label}</span><strong>CONLYRA / {active.no}</strong></div>
        </div>
      </section>

      <section className={styles.agentSystem} id="agent-system" data-agent-system aria-labelledby="agent-system-title">
        <div className={styles.systemSticky}>
          <div className={styles.container}>
            <div className={styles.systemHead}>
              <p>BUILD AN AGENT</p>
              <h2 id="agent-system-title">Rolle. Kontext. Werkzeuge. Grenzen.</h2>
              <span>Vier Ebenen bestimmen, wie ein Agent arbeitet und wo seine Autonomie endet.</span>
            </div>

            <div className={styles.systemStage}>
              <nav className={styles.systemTabs} aria-label="Agent Rollen">
                {agentProfiles.map((agent, index) => (
                  <button type="button" key={agent.no} onClick={() => setActiveAgent(index)} data-active={index === activeAgent}>
                    <small>{agent.no}</small><span>{agent.label}</span>
                  </button>
                ))}
              </nav>

              <article className={styles.systemPanel} key={active.no}>
                <div className={styles.panelTop}><span>ACTIVE ROLE / {active.no}</span><b><i /> POLICY LAYER ON</b></div>
                <div className={styles.panelBody}>
                  <div className={styles.panelMission}>
                    <small>MISSION</small>
                    <h3>{active.label}</h3>
                    <p>{active.mission}</p>
                  </div>
                  <div className={styles.panelGrid}>
                    <section><small>CONTEXT</small>{active.context.map((item) => <span key={item}>{item}<i>✓</i></span>)}</section>
                    <section><small>TOOLS</small>{active.tools.map((item) => <span key={item}>{item}<i>↗</i></span>)}</section>
                    <section><small>HUMAN GATES</small>{active.gates.map((item) => <span key={item}>{item}<i>!</i></span>)}</section>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.liveAgent} id="live-agent" aria-labelledby="live-title">
        <div className={styles.container}>
          <div className={styles.sectionHead} data-aa-reveal>
            <p>LIVE AGENT / SIMULATION</p>
            <h2 id="live-title">Eine Entscheidung, bevor sie zur Aktion wird.</h2>
            <span>Frontend simulation / no live customer data.</span>
          </div>

          <div className={styles.demo} data-aa-reveal data-live-demo>
            <div className={styles.demoTop}><span>AGENT RUN / 7F2A</span><strong data-state={demoState} aria-live="polite">{demoState.toUpperCase()}</strong></div>
            <div className={styles.demoGrid}>
              <aside>
                <small>MISSION</small>
                <h3>Qualifiziere die Anfrage und bereite den nächsten sinnvollen Schritt vor.</h3>
                <button type="button" onClick={runDemo} disabled={demoState === "running"}>RUN AGENT <Arrow /></button>
              </aside>
              <div className={styles.demoSteps}>
                {demoSteps.map(([no, label, title, code], index) => {
                  const activeStep = demoStep >= index;
                  return (
                    <div key={no} data-demo-step data-active={activeStep} data-current={demoStep === index}>
                      <small>{no}</small><span>{label}</span><strong>{title}</strong><code>{code}</code><i>{activeStep ? "✓" : "—"}</i>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles.approval} data-approval-gate data-state={demoState}>
              <div><span>HUMAN GATE</span><strong aria-live="polite">{demoState === "approval" ? "ACTION WAITING FOR APPROVAL" : demoState === "approved" ? "APPROVED / ACTION EXECUTED" : demoState === "rejected" ? "REJECTED / NO ACTION" : "WAITING FOR AGENT RUN"}</strong></div>
              <div><button type="button" disabled={demoState !== "approval"} onClick={() => setDemoState("rejected")}>REJECT</button><button type="button" disabled={demoState !== "approval"} onClick={approveDemo}>APPROVE <Arrow /></button></div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.control} id="control" data-aa-control aria-labelledby="control-title">
        <div className={styles.controlMedia} aria-hidden="true"><video autoPlay muted loop playsInline preload="none"><source src="/media/AdobeStock_1499424979.mp4" type="video/mp4" /></video></div>
        <div className={styles.controlShade} aria-hidden="true" />
        <div className={styles.controlContent}>
          <p>CONTROL BY DESIGN</p>
          <h2 id="control-title">Autonomie endet dort, wo Verantwortung beginnt.</h2>
          <div className={styles.controlRows}>
            <div data-risk-row><small>01</small><strong>LOW RISK</strong><span>CRM-Feld aktualisieren</span><b>AUTO EXECUTE</b></div>
            <div data-risk-row><small>02</small><strong>MEDIUM RISK</strong><span>Externes Follow-up senden</span><b>HUMAN APPROVAL</b></div>
            <div data-risk-row><small>03</small><strong>HIGH RISK</strong><span>Preis oder Vertrag ändern</span><b>BLOCK / ESCALATE</b></div>
          </div>
        </div>
      </section>

      <section className={styles.trace} data-agent-trace aria-labelledby="trace-title">
        <div className={styles.container}>
          <div className={styles.sectionHead} data-aa-reveal>
            <p>AGENT TRACE</p>
            <h2 id="trace-title">Jede Entscheidung hinterlässt eine Spur.</h2>
            <span>Context, decision, policy and action remain visible.</span>
          </div>

          <div className={styles.traceConsole} data-aa-reveal data-trace-console>
            <div className={styles.traceTop}><span>TRACE / RUN 7F2A</span><strong><i /> LIVE OBSERVABILITY</strong></div>
            {[
              ["14:32:08.114", "signal.received", "inbound_request / web_form"],
              ["14:32:08.441", "identity.resolved", "crm_contact / existing"],
              ["14:32:09.028", "memory.loaded", "12 messages / 8 knowledge sources"],
              ["14:32:09.604", "decision.proposed", "priority_high / confidence_0.91"],
              ["14:32:10.031", "policy.checked", "external_send / approval_required"],
              ["14:32:10.448", "action.prepared", "follow_up_draft / crm_update"],
            ].map(([time, event, detail]) => (
              <div className={styles.traceRow} key={`${time}-${event}`}><time>{time}</time><strong>{event}</strong><code>{detail}</code><i>✓</i></div>
            ))}
            <div className={styles.traceFooter}><span>6 EVENTS</span><span>0 POLICY VIOLATIONS</span><span>1 HUMAN GATE</span></div>
          </div>
        </div>
      </section>

      <section className={styles.finalScene} data-aa-final aria-labelledby="final-title">
        <div className={styles.finalMedia} aria-hidden="true"><video autoPlay muted loop playsInline preload="none"><source src="/media/AdobeStock_534758496.mp4" type="video/mp4" /></video></div>
        <div className={styles.finalShade} aria-hidden="true" />
        <div className={styles.finalContent}>
          <p>BUILD YOUR FIRST AGENT.</p>
          <h2 id="final-title">Der erste Agent beginnt mit einem echten Prozess.</h2>
          <span>Wir identifizieren Rolle, Kontext, Tools und Human Gates für einen ersten kontrollierten Pilot.</span>
          <a href="mailto:hello@conlyra.ai">Agent-Pilot anfragen <Arrow /></a>
        </div>
      </section>
    </div>
  );
}
