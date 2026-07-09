"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./AiVertriebExperience.module.css";

const pipeline = [
  ["01", "SIGNAL", "Lead erkannt"],
  ["02", "RESEARCH", "Unternehmen analysiert"],
  ["03", "CRM CONTEXT", "Historie geladen"],
  ["04", "QUALIFY", "Fit bewertet"],
  ["05", "DECISION", "Nächster Schritt vorbereitet"],
  ["06", "APPROVAL", "Freigabe geprüft"],
  ["07", "FOLLOW-UP", "Nachricht vorbereitet"],
  ["08", "CRM UPDATE", "System aktualisiert"],
] as const;

const leads = [
  {
    id: "industrial",
    company: "Müller Maschinenbau GmbH",
    source: "Website inquiry",
    employeeRange: "250–500",
    market: "Industrial B2B",
    fit: 92,
    intent: "Workflow Automation",
    action: "Discovery Call vorbereiten",
    owner: "Revenue Agent / DACH",
    priority: "HIGH",
    context: ["3 CRM Touchpoints", "Pricing Page besucht", "DACH Account", "Use Case Match"],
  },
  {
    id: "services",
    company: "Nordstern Consulting AG",
    source: "LinkedIn campaign",
    employeeRange: "100–250",
    market: "Professional Services",
    fit: 84,
    intent: "Private Intelligence",
    action: "Use-Case Workshop vorschlagen",
    owner: "Revenue Agent / Enterprise",
    priority: "MEDIUM",
    context: ["1 CRM Touchpoint", "AI Agents Content", "Existing Lead", "Knowledge Use Case"],
  },
  {
    id: "commerce",
    company: "Luma Commerce GmbH",
    source: "Partner referral",
    employeeRange: "50–100",
    market: "Commerce",
    fit: 88,
    intent: "Voice AI + Service",
    action: "Voice Pilot qualifizieren",
    owner: "Revenue Agent / Growth",
    priority: "HIGH",
    context: ["Partner Source", "Support Volume high", "CRM verified", "Voice Use Case"],
  },
] as const;

const frictionRows = [
  ["01", "Lead kommt rein", "Inbox wird geprüft", "Signal wird sofort erkannt"],
  ["02", "Recherche beginnt", "Tabs und Tools werden geöffnet", "Unternehmenskontext wird geladen"],
  ["03", "CRM wird geprüft", "Historie wird manuell zusammengesucht", "Kontext ist vor der Entscheidung sichtbar"],
  ["04", "Follow-up entsteht", "Jeder schreibt anders und zu spät", "Nächster Schritt wird vorbereitet"],
] as const;

const salesSystems = [
  {
    no: "01",
    title: "Lead Intake",
    copy: "Signale aus Formularen, E-Mail, Kampagnen oder Partnerkanälen werden strukturiert erkannt und weitergegeben.",
    meta: "FORM / MAIL / ADS / PARTNER",
  },
  {
    no: "02",
    title: "Research & Enrichment",
    copy: "Unternehmensdaten, Website-Signale und interne Informationen werden zu einem verwertbaren Sales-Kontext verbunden.",
    meta: "COMPANY / INTENT / CRM / CONTEXT",
  },
  {
    no: "03",
    title: "Qualification",
    copy: "Fit, Relevanz, Timing und Risiko werden sichtbar bewertet, bevor eine Aktion vorgeschlagen wird.",
    meta: "FIT / PRIORITY / CONFIDENCE / RISK",
  },
  {
    no: "04",
    title: "Controlled Follow-up",
    copy: "Follow-ups, Aufgaben und CRM-Updates werden vorbereitet oder kontrolliert ausgeführt — mit Human Gates dort, wo sie nötig sind.",
    meta: "DRAFT / APPROVAL / SEND / TRACE",
  },
] as const;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function AiVertriebExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeLeadId, setActiveLeadId] = useState<(typeof leads)[number]["id"]>(leads[0].id);
  const [stage, setStage] = useState(3);
  const [running, setRunning] = useState(true);
  const [approvalState, setApprovalState] = useState<"pending" | "approved" | "rejected">("pending");

  const activeLead = useMemo(
    () => leads.find((lead) => lead.id === activeLeadId) ?? leads[0],
    [activeLeadId],
  );

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setStage((current) => {
        const next = (current + 1) % pipeline.length;
        if (next === 5) setApprovalState("pending");
        return next;
      });
    }, 1750);
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
        root.querySelectorAll<HTMLElement>("[data-sales-reveal]").forEach((element) => {
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

        root.querySelectorAll<HTMLElement>("[data-sales-row]").forEach((row, index) => {
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

  const chooseLead = (id: (typeof leads)[number]["id"]) => {
    setActiveLeadId(id);
    setStage(0);
    setRunning(true);
    setApprovalState("pending");
  };

  return (
    <div className={styles.root} ref={rootRef}>
      <section className={styles.hero} aria-labelledby="sales-ai-hero-title">
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.signalBeam} aria-hidden="true" />
        <div className={styles.container}>
          <div className={styles.heroTopbar}>
            <span>CONLYRA / SOLUTION 01 / AI SALES</span>
            <strong>REVENUE OPERATIONS / DACH</strong>
          </div>

          <div className={styles.heroLayout}>
            <div className={styles.heroCopy} data-sales-reveal>
              <p>FROM SIGNAL TO NEXT BEST ACTION</p>
              <h1 id="sales-ai-hero-title">
                Ihr Vertrieb verliert keine Leads.
                <span>Er versteht sie.</span>
              </h1>
            </div>

            <aside className={styles.heroAside} data-sales-reveal>
              <p>
                CONLYRA verbindet Lead-Signale, Unternehmensrecherche, CRM-Kontext, Qualifizierung und Follow-up zu einem kontrollierten Revenue-System.
              </p>
              <a href="#revenue-system">Revenue System ansehen <Arrow /></a>
            </aside>
          </div>

          <div className={styles.heroSignalStrip}>
            <span>LEAD SIGNAL</span><i />
            <span>CONTEXT</span><i />
            <span>QUALIFICATION</span><i />
            <span>DECISION</span><i />
            <span>ACTION</span>
          </div>
        </div>
      </section>

      <section className={styles.friction} aria-labelledby="sales-friction-title">
        <div className={styles.container}>
          <div className={styles.sectionIntro} data-sales-reveal>
            <p>THE REVENUE GAP</p>
            <h2 id="sales-friction-title">Zwischen Interesse und Reaktion geht zu viel verloren.</h2>
            <span>
              Nicht weil Teams zu wenig arbeiten. Sondern weil Signale, Kontext und nächste Schritte in zu vielen Systemen getrennt sind.
            </span>
          </div>

          <div className={styles.frictionTable}>
            <div className={styles.frictionHead}>
              <span>STEP</span><span>TODAY</span><span>MANUAL REALITY</span><span>WITH CONLYRA</span>
            </div>
            {frictionRows.map(([no, today, manual, future]) => (
              <div className={styles.frictionRow} key={no} data-sales-row>
                <small>{no}</small>
                <strong>{today}</strong>
                <span>{manual}</span>
                <em>{future}</em>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.systemSection} id="revenue-system" aria-labelledby="revenue-system-title">
        <div className={styles.container}>
          <div className={styles.systemIntro} data-sales-reveal>
            <p>CONLYRA REVENUE SYSTEM</p>
            <h2 id="revenue-system-title">Ein Lead ist kein Formular. Er ist ein Kontext.</h2>
            <span>Sehen Sie, wie ein Signal durch Research, CRM-Kontext, Bewertung, Freigabe und Aktion läuft.</span>
          </div>

          <div className={styles.revenueShell}>
            <header className={styles.shellTopbar}>
              <div><i /><strong>CONLYRA / REVENUE OPERATIONS</strong></div>
              <nav aria-label="Lead Szenarien">
                {leads.map((lead) => (
                  <button
                    key={lead.id}
                    type="button"
                    data-active={lead.id === activeLead.id}
                    onClick={() => chooseLead(lead.id)}
                  >
                    {lead.company}
                  </button>
                ))}
              </nav>
              <button
                className={styles.runButton}
                type="button"
                onClick={() => setRunning((current) => !current)}
                data-running={running}
              >
                <i /> {running ? "LIVE RUN" : "PAUSED"}
              </button>
            </header>

            <div className={styles.shellBody}>
              <aside className={styles.leadRail}>
                <span>INBOUND OPPORTUNITY</span>
                <h3>{activeLead.company}</h3>
                <dl>
                  <div><dt>SOURCE</dt><dd>{activeLead.source}</dd></div>
                  <div><dt>SIZE</dt><dd>{activeLead.employeeRange}</dd></div>
                  <div><dt>MARKET</dt><dd>{activeLead.market}</dd></div>
                  <div><dt>INTENT</dt><dd>{activeLead.intent}</dd></div>
                  <div><dt>PRIORITY</dt><dd>{activeLead.priority}</dd></div>
                </dl>
                <div className={styles.fitScore}>
                  <span>FIT SCORE</span>
                  <strong>{activeLead.fit}</strong>
                  <small>/ 100</small>
                </div>
              </aside>

              <div className={styles.workspace}>
                <div className={styles.contextGrid}>
                  <article className={styles.agentCard}>
                    <header><span>AGENT OWNER</span><b>ONLINE</b></header>
                    <h4>{activeLead.owner}</h4>
                    <p>Research, Qualification, CRM Context und nächste Aktion werden als ein sichtbarer Ablauf verbunden.</p>
                    <div className={styles.agentPulse}><i /><span>REASONING WITH CONTROL</span></div>
                  </article>

                  <article className={styles.contextCard}>
                    <header><span>LOADED CONTEXT</span><b>{activeLead.context.length} SOURCES</b></header>
                    <ul>
                      {activeLead.context.map((item, index) => (
                        <li key={item}><small>{String(index + 1).padStart(2, "0")}</small><strong>{item}</strong><i>✓</i></li>
                      ))}
                    </ul>
                  </article>

                  <article className={styles.actionCard}>
                    <header><span>NEXT BEST ACTION</span><b>{approvalState.toUpperCase()}</b></header>
                    <h4>{activeLead.action}</h4>
                    <p>Die Aktion bleibt kontrolliert, bis Regeln und Freigaben erfüllt sind.</p>
                    <div className={styles.approvalActions}>
                      <button type="button" onClick={() => { setRunning(false); setApprovalState("rejected"); }}>REJECT</button>
                      <button type="button" onClick={() => { setRunning(false); setApprovalState("approved"); setStage(6); }}>APPROVE <Arrow /></button>
                    </div>
                  </article>
                </div>

                <div className={styles.pipeline} aria-label="Revenue Workflow Pipeline">
                  {pipeline.map(([no, label, detail], index) => {
                    const state = index < stage ? "complete" : index === stage ? "active" : "waiting";
                    return (
                      <button
                        key={no}
                        type="button"
                        data-state={state}
                        onClick={() => { setRunning(false); setStage(index); }}
                      >
                        <small>{no}</small>
                        <strong>{label}</strong>
                        <span>{detail}</span>
                        <i />
                      </button>
                    );
                  })}
                </div>

                <div className={styles.tracePanel}>
                  <div className={styles.traceHeader}>
                    <span>LIVE REVENUE TRACE</span>
                    <b>WORKFLOW / SALES-{activeLead.fit}</b>
                  </div>
                  <div className={styles.traceRows}>
                    {pipeline.slice(0, 6).map(([no, label], index) => (
                      <div key={no} data-state={index < stage ? "complete" : index === stage ? "active" : "waiting"}>
                        <span>14:3{index}:0{index}</span>
                        <code>{label.toLowerCase().replaceAll(" ", "_")}.processed / {activeLead.company.toLowerCase().replaceAll(" ", "_")}</code>
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

      <section className={styles.systems} aria-labelledby="sales-systems-title">
        <div className={styles.container}>
          <div className={styles.sectionIntro} data-sales-reveal>
            <p>REVENUE CAPABILITIES</p>
            <h2 id="sales-systems-title">Ein Revenue-System statt einzelner AI-Tools.</h2>
            <span>Die stärkste Wirkung entsteht dort, wo Signale, Kontext, Entscheidungen und Aktionen zusammenspielen.</span>
          </div>

          <div className={styles.systemCards}>
            {salesSystems.map((item) => (
              <article key={item.no} data-sales-reveal>
                <div><small>{item.no}</small><span>{item.meta}</span></div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <footer><span>REVENUE SYSTEM</span><i /></footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.architecture} aria-labelledby="sales-architecture-title">
        <div className={styles.container}>
          <div className={styles.architectureHeader} data-sales-reveal>
            <p>CONNECTED REVENUE ARCHITECTURE</p>
            <h2 id="sales-architecture-title">Der Sales-Move entsteht aus verbundenem Kontext.</h2>
          </div>

          <div className={styles.architectureMap} data-sales-reveal>
            <div className={styles.archGrid} aria-hidden="true" />
            <div className={`${styles.archNode} ${styles.archSignal}`}><small>INPUT</small><strong>FORM / MAIL / ADS</strong></div>
            <div className={`${styles.archNode} ${styles.archResearch}`}><small>RESEARCH</small><strong>COMPANY + INTENT</strong></div>
            <div className={`${styles.archNode} ${styles.archCrm}`}><small>CONTEXT</small><strong>CRM + HISTORY</strong></div>
            <div className={`${styles.archNode} ${styles.archAgent}`}><small>INTELLIGENCE</small><strong>REVENUE AGENT</strong></div>
            <div className={`${styles.archNode} ${styles.archControl}`}><small>CONTROL</small><strong>POLICY + APPROVAL</strong></div>
            <div className={`${styles.archNode} ${styles.archAction}`}><small>OUTPUT</small><strong>FOLLOW-UP + CRM</strong></div>
            <svg viewBox="0 0 1200 600" aria-hidden="true">
              <path d="M120 300 C250 300 250 120 420 120" />
              <path d="M120 300 C250 300 250 480 420 480" />
              <path d="M540 120 C650 120 650 300 760 300" />
              <path d="M540 480 C650 480 650 300 760 300" />
              <path d="M870 300 C980 300 980 150 1080 150" />
              <path d="M870 300 C980 300 980 450 1080 450" />
            </svg>
            <span className={styles.archPulse} aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className={styles.closing} aria-labelledby="sales-closing-title">
        <div className={styles.container}>
          <div className={styles.closingMeta}><span>FROM LEAD</span><i /><span>TO CONTEXT</span><i /><span>TO ACTION</span></div>
          <div className={styles.closingLayout}>
            <div data-sales-reveal>
              <p>BUILD YOUR REVENUE SYSTEM</p>
              <h2 id="sales-closing-title">Der nächste Sales-Move sollte nicht am Zufall hängen.</h2>
            </div>
            <aside data-sales-reveal>
              <p>Wir analysieren Ihre Lead-Quellen, CRM-Prozesse, manuelle Übergaben und Follow-up-Logik und definieren daraus einen kontrollierten AI-Sales-Pilot.</p>
              <Link href="/#contact">Workflow Audit starten <Arrow /></Link>
              <Link className={styles.secondaryLink} href="/loesungen">Alle Lösungen ansehen <Arrow /></Link>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
