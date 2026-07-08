"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import styles from "./ConlyraPremierExperience.module.css";

const manifesto =
  "Verbinden Sie Daten Tools und Teams mit KI-Agenten die Kontext verstehen Entscheidungen vorbereiten und Arbeit kontrolliert ausführen".split(
    " ",
  );

const navItems = [
  ["System", "#system"],
  ["Anwendungen", "#use-cases"],
  ["Wirkung", "#impact"],
  ["Vertrauen", "#trust"],
  ["Kontakt", "#contact"],
];

const systemSteps = [
  {
    no: "01",
    title: "Connect",
    copy: "CRM, Inbox, Dokumente, Datenbanken und APIs werden zu einem gemeinsamen Arbeitskontext.",
    status: "12 Quellen verbunden",
  },
  {
    no: "02",
    title: "Understand",
    copy: "Agenten lesen Kontext, Rollen, Regeln und Historie, bevor eine Aktion entsteht.",
    status: "Policy geprüft",
  },
  {
    no: "03",
    title: "Decide",
    copy: "Entscheidungswege werden priorisiert, bewertet und bei Bedarf zur Freigabe vorgelegt.",
    status: "Risiko 02 / niedrig",
  },
  {
    no: "04",
    title: "Act",
    copy: "Tools, APIs und Follow-ups werden kontrolliert ausgeführt und vollständig protokolliert.",
    status: "Action ready",
  },
  {
    no: "05",
    title: "Control",
    copy: "Menschen behalten Freigaben, Audit Trails und operative Kennzahlen jederzeit im Blick.",
    status: "Human gate aktiv",
  },
];

const capabilities = [
  {
    label: "01 / Strategy",
    title: "AI Strategy",
    copy: "Wir identifizieren die Prozesse, in denen KI messbar Zeit spart oder Umsatz bewegt.",
    tags: ["Potenzialanalyse", "Roadmap", "Governance"],
  },
  {
    label: "02 / Agents",
    title: "Custom Agents",
    copy: "Individuelle Agenten arbeiten mit Rollen, Kontext, Tools und klaren Handlungsgrenzen.",
    tags: ["Memory", "Tool Use", "Policy"],
  },
  {
    label: "03 / Automation",
    title: "Workflow Systems",
    copy: "Wiederkehrende Arbeit wird geroutet, geprüft, ausgeführt und in Echtzeit messbar.",
    tags: ["Routing", "Reviews", "Audit"],
  },
  {
    label: "04 / Data",
    title: "Private Intelligence",
    copy: "Unternehmenswissen wird auffindbar, nutzbar und für Agenten sicher zugänglich.",
    tags: ["RAG", "Search", "Private Data"],
  },
];

const useCases = [
  {
    eyebrow: "Sales",
    title: "Vom Lead bis zum Follow-up.",
    copy: "Recherche, CRM-Kontext, Angebotsvorbereitung und Follow-up bewegen sich in einem kontrollierten Flow.",
    video: "/media/AdobeStock_1535809490.mp4",
    metric: "3.8× schnellere Reaktion",
  },
  {
    eyebrow: "Support",
    title: "Tickets verstehen, bevor sie eskalieren.",
    copy: "Anfragen werden klassifiziert, Wissen wird abgerufen und Antworten werden mit klaren Eskalationsregeln vorbereitet.",
    video: "/media/AdobeStock_1516198647.mp4",
    metric: "42% weniger Handarbeit",
  },
  {
    eyebrow: "Operations",
    title: "Arbeit bewegt sich ohne Nachfassen.",
    copy: "Dokumente, Statuswechsel und Exceptions laufen durch ein System mit Verantwortlichkeiten und Audit Trail.",
    video: "/media/AdobeStock_1558014909.mp4",
    metric: "24/7 Prozesslogik",
  },
  {
    eyebrow: "Knowledge",
    title: "Unternehmenswissen wird ausführbar.",
    copy: "Richtlinien, Dokumente und interne Daten werden zu sicherem Kontext für Teams und Agenten.",
    video: "/media/AdobeStock_1525614966.mp4",
    metric: "Kontext in Sekunden",
  },
];

const workflowSteps = [
  ["01", "Signal", "Neue Anfrage eingegangen", "LIVE"],
  ["02", "Context", "CRM + Wissensbasis synchronisiert", "SYNC"],
  ["03", "Agent", "Priorität und nächster Schritt bewertet", "AUTO"],
  ["04", "Review", "Menschliche Freigabe angefordert", "OPEN"],
  ["05", "Action", "Follow-up und CRM Update bereit", "READY"],
];

const integrations = [
  "Slack",
  "Gmail",
  "Google Drive",
  "Notion",
  "HubSpot",
  "Salesforce",
  "GitHub",
  "Stripe",
  "Make",
  "Zapier",
  "Airtable",
  "Webhooks",
  "SQL",
  "Interne APIs",
];

const proofCards = [
  {
    quote:
      "CONLYRA denkt nicht in einzelnen Bots, sondern in belastbaren Systemen. Genau das macht den Unterschied zwischen Demo und Betrieb.",
    role: "Operations Lead",
    company: "B2B Services",
  },
  {
    quote:
      "Die Kombination aus Agentenlogik, menschlichen Freigaben und messbarem Output macht Automation erstmals wirklich steuerbar.",
    role: "Digital Lead",
    company: "Mid-Market Company",
  },
];

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

export function ConlyraPremierExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSystemStep, setActiveSystemStep] = useState(0);
  const [headerSolid, setHeaderSolid] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let cleanup = () => undefined;

    const setup = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      gsap.registerPlugin(ScrollTrigger);

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const context = gsap.context(() => {
        if (reduced) {
          gsap.set(root.querySelectorAll("[data-reveal]"), { autoAlpha: 1, y: 0 });
          return;
        }

        const heroItems = root.querySelectorAll("[data-hero-enter]");
        gsap.fromTo(
          heroItems,
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 1, stagger: 0.09, ease: "power3.out", delay: 0.12 },
        );

        root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.fromTo(
            element,
            { autoAlpha: 0, y: 34 },
            {
              autoAlpha: 1,
              y: 0,
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

        const manifestoSection = root.querySelector<HTMLElement>("[data-manifesto]");
        const manifestoWords = root.querySelectorAll<HTMLElement>("[data-manifesto-word]");
        if (manifestoSection && manifestoWords.length) {
          ScrollTrigger.create({
            trigger: manifestoSection,
            start: "top 72%",
            end: "bottom 34%",
            scrub: 0.65,
            onUpdate: (self) => {
              const total = manifestoWords.length;
              manifestoWords.forEach((word, index) => {
                const value = Math.min(1, Math.max(0, self.progress * (total + 1.1) - index));
                word.style.setProperty("--fill", `${Math.round(value * 100)}%`);
              });
            },
          });
        }

        const systemSection = root.querySelector<HTMLElement>("[data-system-story]");
        if (systemSection) {
          ScrollTrigger.create({
            trigger: systemSection,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            onUpdate: (self) => {
              const index = Math.min(systemSteps.length - 1, Math.floor(self.progress * systemSteps.length));
              setActiveSystemStep(index);
              systemSection.style.setProperty("--system-progress", self.progress.toFixed(4));
            },
          });
        }

        root.querySelectorAll<HTMLElement>("[data-media-shift]").forEach((media) => {
          const video = media.querySelector("video");
          if (!video) return;
          gsap.fromTo(
            video,
            { scale: 1.055 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: media,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
              },
            },
          );
        });

        const shiftRows = root.querySelectorAll<HTMLElement>("[data-shift-row]");
        shiftRows.forEach((row, index) => {
          gsap.fromTo(
            row,
            { xPercent: index % 2 === 0 ? -4 : 4, autoAlpha: 0.45 },
            {
              xPercent: 0,
              autoAlpha: 1,
              ease: "none",
              scrollTrigger: {
                trigger: row,
                start: "top 92%",
                end: "top 48%",
                scrub: 0.6,
              },
            },
          );
        });
      }, root);

      cleanup = () => context.revert();
      ScrollTrigger.refresh();
    };

    void setup();
    return () => cleanup();
  }, []);

  useEffect(() => {
    const onScroll = () => setHeaderSolid(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("conlyra-menu-open", menuOpen);
    return () => document.documentElement.classList.remove("conlyra-menu-open");
  }, [menuOpen]);

  return (
    <div className={styles.root} ref={rootRef}>
      <header className={`${styles.header} ${headerSolid ? styles.headerSolid : ""}`}>
        <a className={styles.logo} href="#top" aria-label="CONLYRA Startseite">
          <img src="/conlyra-logo.svg" alt="CONLYRA" />
        </a>
        <nav className={styles.desktopNav} aria-label="Hauptnavigation">
          {navItems.map(([label, href]) => (
            <a href={href} key={href}>{label}</a>
          ))}
        </nav>
        <a className={styles.headerCta} href="#contact">
          Gespräch starten <ArrowIcon />
        </a>
        <button
          className={styles.menuButton}
          type="button"
          aria-label="Menü öffnen"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </header>

      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`} aria-hidden={!menuOpen}>
        {navItems.map(([label, href], index) => (
          <a href={href} key={href} onClick={() => setMenuOpen(false)}>
            <small>0{index + 1}</small>{label}<ArrowIcon />
          </a>
        ))}
      </div>

      <main id="main">
        <section className={styles.hero} id="top" aria-labelledby="hero-title">
          <div className={styles.heroMedia} aria-hidden="true">
            <video autoPlay loop muted playsInline preload="metadata">
              <source src="/media/AdobeStock_444039087.mp4" type="video/mp4" />
            </video>
            <span className={styles.heroMediaShade} />
          </div>

          <div className={`${styles.container} ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow} data-hero-enter>AI OPERATING LAYER / DACH</p>
              <h1 id="hero-title" data-hero-enter>
                Arbeit, die sich
                <span>intelligent bewegt.</span>
              </h1>
              <p className={styles.heroLead} data-hero-enter>
                CONLYRA verbindet Daten, Tools und Teams mit individuellen KI-Agenten und kontrollierten Workflows.
              </p>
              <div className={styles.heroActions} data-hero-enter>
                <a className={styles.primaryButton} href="#contact">Demo starten <ArrowIcon /></a>
                <a className={styles.textLink} href="#system">System entdecken <span>↓</span></a>
              </div>
              <div className={styles.heroProof} data-hero-enter>
                <span><i /> Private Daten</span>
                <span><i /> Human-in-the-loop</span>
                <span><i /> Auditierbare Actions</span>
              </div>
            </div>

            <aside className={styles.liveCard} data-hero-enter aria-label="Beispiel eines CONLYRA Workflows">
              <div className={styles.liveCardTop}>
                <span>LIVE WORKFLOW</span>
                <strong><i /> RUNNING</strong>
              </div>
              <div className={styles.liveFlow}>
                {[
                  ["01", "Neue Anfrage", "Signal erkannt"],
                  ["02", "CRM geprüft", "Kontext geladen"],
                  ["03", "Antwort vorbereitet", "Agent output"],
                  ["04", "Freigabe", "Waiting for approval"],
                ].map(([no, title, meta], index) => (
                  <div className={`${styles.liveFlowRow} ${index === 3 ? styles.liveFlowActive : ""}`} key={no}>
                    <span>{no}</span>
                    <div><strong>{title}</strong><small>{meta}</small></div>
                    <b>{index < 3 ? "✓" : "•••"}</b>
                  </div>
                ))}
              </div>
              <div className={styles.liveCardBottom}>
                <span>Human gate</span><strong>CONTROLLED EXECUTION</strong>
              </div>
            </aside>
          </div>

          <div className={styles.heroFooter} data-hero-enter>
            <span>SCROLL TO EXPLORE</span><span>CONLYRA / 2026</span>
          </div>
        </section>

        <section className={styles.manifesto} data-manifesto aria-labelledby="manifesto-title">
          <div className={`${styles.container} ${styles.manifestoSticky}`}>
            <p className={styles.eyebrow}>THE OPERATING SHIFT</p>
            <h2 id="manifesto-title" className={styles.manifestoTitle}>
              {manifesto.map((word, index) => (
                <Fragment key={`${word}-${index}`}>
                  <span data-manifesto-word style={{ "--fill": "0%" } as CSSProperties}>{word}</span>
                  {index < manifesto.length - 1 ? " " : null}
                </Fragment>
              ))}
            </h2>
            <p className={styles.manifestoCopy}>Nicht noch ein KI-Tool. Ein kontrollierbares System für operative Arbeit.</p>
          </div>
        </section>

        <section className={styles.shiftSection} aria-labelledby="shift-title">
          <div className={styles.container}>
            <div className={styles.sectionIntro} data-reveal>
              <p className={styles.eyebrow}>THE SHIFT</p>
              <h2 id="shift-title">Unternehmen brauchen nicht mehr KI-Tools. <span>Sie brauchen Systeme.</span></h2>
            </div>
            <div className={styles.shiftRows}>
              {[
                ["Daten", "verstanden", "01"],
                ["Entscheidungen", "vorbereitet", "02"],
                ["Arbeit", "ausgeführt", "03"],
              ].map(([from, to, no]) => (
                <div className={styles.shiftRow} data-shift-row key={no}>
                  <small>{no}</small><strong>{from}</strong><span>→</span><em>{to}</em>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.systemStory} id="system" data-system-story aria-labelledby="system-title">
          <div className={styles.systemSticky}>
            <div className={`${styles.container} ${styles.systemGrid}`}>
              <div className={styles.systemCopy}>
                <p className={styles.eyebrow}>CONLYRA OS</p>
                <h2 id="system-title">Ein System vom Signal bis zur Aktion.</h2>
                <p>Jeder Schritt bleibt sichtbar. Jeder kritische Moment kontrollierbar.</p>
                <div className={styles.systemStepList}>
                  {systemSteps.map((step, index) => (
                    <button
                      type="button"
                      className={index === activeSystemStep ? styles.systemStepActive : ""}
                      key={step.no}
                      onClick={() => setActiveSystemStep(index)}
                    >
                      <small>{step.no}</small><span>{step.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.systemCanvas}>
                <div className={styles.canvasTopbar}>
                  <span>CONLYRA / OPERATIONS GRAPH</span>
                  <strong><i /> LIVE</strong>
                </div>
                <div className={styles.canvasStage}>
                  <div className={styles.canvasGrid} />
                  <svg className={styles.canvasLines} viewBox="0 0 900 580" aria-hidden="true">
                    <path d="M120 290 C260 290 250 145 410 145 S590 290 720 290" />
                    <path d="M120 290 C260 290 250 435 410 435 S590 290 720 290" />
                    <path d="M410 145 L410 435" />
                  </svg>
                  {systemSteps.map((step, index) => {
                    const positions = [styles.node1, styles.node2, styles.node3, styles.node4, styles.node5];
                    return (
                      <div className={`${styles.systemNode} ${positions[index]} ${index === activeSystemStep ? styles.systemNodeActive : ""}`} key={step.no}>
                        <small>{step.no} / {step.title}</small>
                        <strong>{step.status}</strong>
                        <span>{index === activeSystemStep ? "ACTIVE" : "READY"}</span>
                      </div>
                    );
                  })}
                  <div className={styles.systemPulse} aria-hidden="true" />
                </div>
                <div className={styles.canvasFooter}>
                  <span>RUN 2F9A / PROD</span><span>TRACE ACTIVE</span><span>LATENCY 312MS</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.capabilitiesSection} aria-labelledby="capabilities-title">
          <div className={styles.container}>
            <div className={styles.sectionHeader} data-reveal>
              <div><p className={styles.eyebrow}>CAPABILITIES</p><h2 id="capabilities-title">Von Strategie bis Betrieb.</h2></div>
              <p>CONLYRA baut keine losen Automationen. Wir verbinden Analyse, Agenten, Daten und Governance zu produktionsreifen Systemen.</p>
            </div>
            <div className={styles.capabilityGrid}>
              {capabilities.map((item) => (
                <article className={styles.capabilityCard} key={item.label} data-reveal>
                  <small>{item.label}</small><h3>{item.title}</h3><p>{item.copy}</p>
                  <div>{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.useCasesSection} id="use-cases" aria-labelledby="use-cases-title">
          <div className={styles.container}>
            <div className={styles.sectionHeader} data-reveal>
              <div><p className={styles.eyebrow}>REAL BUSINESS FLOWS</p><h2 id="use-cases-title">KI dort, wo Arbeit wirklich passiert.</h2></div>
              <p>Keine abstrakten Bots. Konkrete Workflows mit Kontext, Freigaben und messbarem Output.</p>
            </div>
            <div className={styles.useCaseGrid}>
              {useCases.map((item, index) => (
                <article className={styles.useCaseCard} key={item.eyebrow} data-reveal>
                  <div className={styles.useCaseMedia} data-media-shift>
                    <video autoPlay loop muted playsInline preload={index < 2 ? "metadata" : "none"}>
                      <source src={item.video} type="video/mp4" />
                    </video>
                    <div className={styles.useCaseMediaTop}><span>{item.eyebrow}</span><small>0{index + 1}</small></div>
                    <div className={styles.useCaseMetric}>{item.metric}</div>
                  </div>
                  <div className={styles.useCaseBody}><h3>{item.title}</h3><p>{item.copy}</p><a href="#contact">Workflow besprechen <ArrowIcon /></a></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.workflowSection} aria-labelledby="workflow-title">
          <div className={styles.container}>
            <div className={styles.workflowHeader} data-reveal>
              <p className={styles.eyebrow}>LIVE WORKFLOW</p>
              <h2 id="workflow-title">Vom Signal zur kontrollierten Aktion.</h2>
              <p>Ein operativer Prozess, lesbar gemacht. Keine Blackbox.</p>
            </div>
            <div className={styles.workflowShell} data-reveal>
              <div className={styles.workflowTopbar}><span>FLOW / SALES FOLLOW-UP</span><strong><i /> PROD</strong></div>
              <div className={styles.workflowTrack}>
                {workflowSteps.map(([no, title, copy, status], index) => (
                  <Fragment key={no}>
                    <article className={styles.workflowNode}>
                      <div><span>{no}</span><b>{status}</b></div><h3>{title}</h3><p>{copy}</p>
                    </article>
                    {index < workflowSteps.length - 1 ? <div className={styles.workflowConnector}><span /></div> : null}
                  </Fragment>
                ))}
              </div>
              <div className={styles.workflowLog}>
                <span>14:32:08 signal.received</span><span>14:32:09 context.loaded</span><span>14:32:10 agent.decided</span><strong>14:32:11 approval.requested</strong>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.impactSection} id="impact" aria-labelledby="impact-title">
          <div className={styles.container}>
            <div className={styles.sectionIntro} data-reveal>
              <p className={styles.eyebrow}>BUSINESS IMPACT</p>
              <h2 id="impact-title">Wirkung, die man im Betrieb sieht.</h2>
            </div>
            <div className={styles.impactGrid}>
              {[
                ["-42", "%", "Manuelle Arbeit", "Potenzial durch Routing und Agenten-Unterstützung"],
                ["3.8", "×", "Schnellere Reaktion", "Wenn CRM, Inbox und Wissen in einem Flow laufen"],
                ["24", "/7", "Aktive Prozesslogik", "Systeme bewegen Arbeit auch außerhalb manueller Übergaben"],
              ].map(([value, suffix, title, copy]) => (
                <article className={styles.impactCard} key={title} data-reveal>
                  <div><strong>{value}</strong><span>{suffix}</span></div><h3>{title}</h3><p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.trustSection} id="trust" aria-labelledby="trust-title">
          <div className={`${styles.container} ${styles.trustGrid}`}>
            <div className={styles.trustCopy} data-reveal>
              <p className={styles.eyebrow}>CONTROL BY DESIGN</p>
              <h2 id="trust-title">Automation ohne Kontrollverlust.</h2>
              <p>CONLYRA trennt Geschwindigkeit nicht von Verantwortung. Kritische Aktionen bleiben nachvollziehbar, freigabefähig und auditierbar.</p>
              <a className={styles.primaryButton} href="#contact">Systemarchitektur besprechen <ArrowIcon /></a>
            </div>
            <div className={styles.trustPanel} data-reveal>
              {[
                ["01", "Private Context", "Unternehmensdaten bleiben Teil einer kontrollierten Zugriffslogik."],
                ["02", "Human Gates", "Kritische Aktionen warten auf explizite Freigabe."],
                ["03", "Audit Trails", "Jede Entscheidung und Aktion bleibt nachvollziehbar."],
                ["04", "Role Logic", "Agenten handeln nur innerhalb definierter Rollen und Rechte."],
              ].map(([no, title, copy]) => (
                <div className={styles.trustRow} key={no}><small>{no}</small><div><strong>{title}</strong><p>{copy}</p></div><span>✓</span></div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.integrationSection} aria-labelledby="integration-title">
          <div className={styles.container}>
            <div className={styles.integrationIntro} data-reveal>
              <p className={styles.eyebrow}>INTEGRATIONS</p>
              <h2 id="integration-title">Agenten arbeiten dort, wo Ihr Unternehmen arbeitet.</h2>
            </div>
            <div className={styles.integrationGrid} data-reveal>
              {integrations.map((integration, index) => (
                <div key={integration}><span>{String(index + 1).padStart(2, "0")}</span><strong>{integration}</strong><i>↗</i></div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.proofSection} aria-labelledby="proof-title">
          <div className={styles.container}>
            <div className={styles.sectionHeader} data-reveal>
              <div><p className={styles.eyebrow}>PROOF / PERSPECTIVE</p><h2 id="proof-title">Gebaut für den Schritt von Demo zu Betrieb.</h2></div>
              <p>Enterprise AI gewinnt nicht durch mehr Prompts, sondern durch bessere Systemarchitektur.</p>
            </div>
            <div className={styles.proofGrid}>
              {proofCards.map((item, index) => (
                <blockquote className={styles.proofCard} key={item.role} data-reveal>
                  <span>“</span><p>{item.quote}</p><footer><div><strong>{item.role}</strong><small>{item.company}</small></div><b>0{index + 1}</b></footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.contactSection} id="contact" aria-labelledby="contact-title">
          <div className={styles.contactMedia} aria-hidden="true">
            <video autoPlay loop muted playsInline preload="none"><source src="/media/AdobeStock_534758496.mp4" type="video/mp4" /></video>
          </div>
          <div className={`${styles.container} ${styles.contactContent}`}>
            <p className={styles.eyebrow} data-reveal>LET'S BUILD THE SYSTEM</p>
            <h2 id="contact-title" data-reveal>Wo beginnt Ihr stärkster AI-Workflow?</h2>
            <p data-reveal>Wir starten mit einem Prozess- und Datencheck und identifizieren den ersten Workflow, der messbar Wirkung erzeugen kann.</p>
            <div className={styles.contactActions} data-reveal>
              <a className={styles.contactPrimary} href="mailto:hello@conlyra.ai">hello@conlyra.ai <ArrowIcon /></a>
              <span>Deutschland / DACH / Europa</span>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerTop}><img src="/conlyra-logo.svg" alt="CONLYRA" /><p>AI-Agenten, Daten und Workflows. In einem kontrollierbaren System.</p></div>
          <div className={styles.footerBottom}><span>© 2026 CONLYRA</span><nav>{navItems.slice(0, 4).map(([label, href]) => <a href={href} key={href}>{label}</a>)}</nav><span>Built for controlled intelligence.</span></div>
        </div>
      </footer>
    </div>
  );
}
