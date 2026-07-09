"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./AiReadinessExperience.module.css";

type DimensionKey = "people" | "data" | "process" | "governance";

type Dimension = {
  key: DimensionKey;
  code: string;
  label: string;
  title: string;
  detail: string;
  signal: string;
};

const dimensions: Dimension[] = [
  {
    key: "people",
    code: "01",
    label: "PEOPLE",
    title: "Rollen, Akzeptanz und operative Verantwortung",
    detail: "Wer arbeitet mit dem System, wer entscheidet und wo braucht es Human Handoff?",
    signal: "OWNERSHIP / ENABLEMENT / HANDOFF",
  },
  {
    key: "data",
    code: "02",
    label: "DATA",
    title: "Zugriff, Qualität und nutzbarer Kontext",
    detail: "Welche Daten sind verlässlich, erreichbar und für AI-Systeme kontrolliert nutzbar?",
    signal: "ACCESS / QUALITY / CONTEXT",
  },
  {
    key: "process",
    code: "03",
    label: "PROCESS",
    title: "Klare Abläufe, Entscheidungen und Systemaktionen",
    detail: "Wo entstehen wiederkehrende Arbeit, Medienbrüche oder manuelle Entscheidungsschleifen?",
    signal: "FLOW / LOGIC / ACTION",
  },
  {
    key: "governance",
    code: "04",
    label: "GOVERNANCE",
    title: "Rechte, Risiken und nachvollziehbare Kontrolle",
    detail: "Welche Regeln definieren, was AI sehen, entscheiden, ausführen und eskalieren darf?",
    signal: "ACCESS / POLICY / TRACE",
  },
];

const opportunities = [
  { code: "A1", title: "Lead Qualification", impact: 86, effort: 34, tag: "QUICK WIN" },
  { code: "A2", title: "Support Triage", impact: 78, effort: 28, tag: "QUICK WIN" },
  { code: "A3", title: "Knowledge Assistant", impact: 74, effort: 46, tag: "FOUNDATION" },
  { code: "A4", title: "Offer Preparation", impact: 68, effort: 57, tag: "PILOT" },
  { code: "A5", title: "Voice Intake", impact: 88, effort: 66, tag: "STRATEGIC" },
  { code: "A6", title: "Autonomous Operations", impact: 96, effort: 91, tag: "LONG TERM" },
] as const;

const phases = [
  ["01", "DISCOVER", "Arbeit beobachten", "Prozesse, Rollen, Systeme und Reibungspunkte sichtbar machen."],
  ["02", "MAP", "AI-Chancen strukturieren", "Potenziale mit Datenzugang, Aufwand, Risiko und Wirkung verbinden."],
  ["03", "PRIORITIZE", "Fokus entscheiden", "Nicht alles automatisieren — die richtigen Systeme zuerst bauen."],
  ["04", "PILOT", "Kontrolliert beweisen", "Mit einem messbaren Use Case starten, lernen und gezielt skalieren."],
] as const;

function stageFromScore(score: number) {
  if (score < 35) return "FOUNDATION";
  if (score < 55) return "CONNECTED";
  if (score < 75) return "READY";
  return "SCALE";
}

function recommendationFor(key: DimensionKey) {
  const map: Record<DimensionKey, string> = {
    people: "Ownership und Human-Handoff-Regeln zuerst klären.",
    data: "Datenzugriff und Kontextqualität vor Automatisierung stabilisieren.",
    process: "Einen klaren, wiederkehrenden Prozess als ersten Pilot isolieren.",
    governance: "Berechtigungen, Freigaben und Trace-Logik vor Skalierung definieren.",
  };

  return map[key];
}

export function AiReadinessExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [scores, setScores] = useState<Record<DimensionKey, number>>({
    people: 58,
    data: 44,
    process: 67,
    governance: 39,
  });
  const [activeDimension, setActiveDimension] = useState<DimensionKey>("people");
  const [activeOpportunity, setActiveOpportunity] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-readiness-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.visible = "true";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const readinessScore = useMemo(() => {
    const values = Object.values(scores);
    return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
  }, [scores]);

  const weakestDimension = useMemo(() => {
    return dimensions.reduce((weakest, dimension) =>
      scores[dimension.key] < scores[weakest.key] ? dimension : weakest,
    );
  }, [scores]);

  const activeDimensionData = dimensions.find((dimension) => dimension.key === activeDimension) ?? dimensions[0];
  const activeOpportunityData = opportunities[activeOpportunity];

  const updateScore = (key: DimensionKey, value: number) => {
    setScores((current) => ({ ...current, [key]: value }));
    setActiveDimension(key);
  };

  return (
    <div className={styles.root} ref={rootRef} data-ai-readiness-experience>
      <section className={styles.hero} aria-labelledby="readiness-hero-title">
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroLayout}>
          <div className={styles.heroCopy}>
            <p>CONLYRA / PRODUCT 05 / AI READINESS</p>
            <h1 id="readiness-hero-title">
              <span>Wissen, wo AI</span>
              <span>wirklich</span>
              <span>Wirkung entfaltet.</span>
            </h1>
            <div className={styles.heroSubline}>
              <span>
                CONLYRA bewertet Menschen, Daten, Prozesse und Governance, priorisiert echte Chancen und übersetzt Potenziale in kontrollierte Pilot-Systeme.
              </span>
              <a href="#readiness-scan">Readiness Scan starten <span aria-hidden="true">↗</span></a>
            </div>
          </div>

          <aside className={styles.heroConsole} aria-label="AI Readiness Systemübersicht">
            <header>
              <span>AI READINESS ENGINE</span>
              <strong><i /> SCAN READY</strong>
            </header>
            <div className={styles.scoreDial}>
              <div style={{ "--score": `${readinessScore * 3.6}deg` } as React.CSSProperties}>
                <span>{readinessScore}</span>
                <small>/ 100</small>
              </div>
            </div>
            <div className={styles.heroSignals}>
              {dimensions.map((dimension) => (
                <div key={dimension.key}>
                  <small>{dimension.label}</small>
                  <span><i style={{ width: `${scores[dimension.key]}%` }} /></span>
                  <strong>{scores[dimension.key]}</strong>
                </div>
              ))}
            </div>
            <footer>
              <span>STAGE / {stageFromScore(readinessScore)}</span>
              <span>PRIORITY / {weakestDimension.label}</span>
            </footer>
          </aside>
        </div>
        <div className={styles.heroRail}>
          <span>AI READINESS / DACH</span>
          <span>PEOPLE → DATA → PROCESS → GOVERNANCE</span>
        </div>
      </section>

      <section className={styles.context} aria-labelledby="readiness-context-title">
        <div className={styles.container}>
          <div className={styles.sectionHead} data-readiness-reveal>
            <p>BEFORE AUTOMATION</p>
            <h2 id="readiness-context-title">Nicht jede AI-Idee ist ein gutes System.</h2>
            <span>
              Wirkung entsteht dort, wo klare Arbeit, nutzbare Daten, verantwortliche Menschen und kontrollierte Ausführung zusammenkommen.
            </span>
          </div>

          <div className={styles.contextGrid} data-readiness-reveal>
            {dimensions.map((dimension) => (
              <article key={dimension.key}>
                <small>{dimension.code} / {dimension.label}</small>
                <h3>{dimension.title}</h3>
                <p>{dimension.detail}</p>
                <footer>{dimension.signal}</footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.scan} id="readiness-scan" aria-labelledby="readiness-scan-title">
        <div className={styles.container}>
          <div className={styles.sectionHead} data-readiness-reveal>
            <p>INTERACTIVE READINESS SCAN</p>
            <h2 id="readiness-scan-title">Vier Dimensionen. Ein klarer nächster Schritt.</h2>
            <span>Verschieben Sie die Werte und sehen Sie, wie sich Readiness, Priorität und Empfehlung verändern.</span>
          </div>

          <div className={styles.scanShell} data-readiness-reveal>
            <div className={styles.scanControls}>
              <header>
                <span>ASSESSMENT INPUT</span>
                <strong>04 DIMENSIONS</strong>
              </header>
              {dimensions.map((dimension) => (
                <div className={styles.controlRow} key={dimension.key} data-active={activeDimension === dimension.key}>
                  <button type="button" onClick={() => setActiveDimension(dimension.key)}>
                    <small>{dimension.code}</small>
                    <span>{dimension.label}</span>
                    <strong>{scores[dimension.key]}</strong>
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={scores[dimension.key]}
                    onChange={(event) => updateScore(dimension.key, Number(event.target.value))}
                    aria-label={`${dimension.label} Readiness Wert`}
                    style={{ "--value": `${scores[dimension.key]}%` } as React.CSSProperties}
                  />
                </div>
              ))}
            </div>

            <div className={styles.scanResult}>
              <header>
                <span>LIVE READINESS RESULT</span>
                <strong><i /> ACTIVE</strong>
              </header>
              <div className={styles.resultCore}>
                <div className={styles.bigScore}>
                  <span>{readinessScore}</span>
                  <small>READINESS SCORE</small>
                </div>
                <div className={styles.resultMeta}>
                  <small>CURRENT STAGE</small>
                  <strong>{stageFromScore(readinessScore)}</strong>
                  <p>{recommendationFor(weakestDimension.key)}</p>
                </div>
              </div>
              <div className={styles.dimensionPreview}>
                <small>ACTIVE DIMENSION / {activeDimensionData.code}</small>
                <h3>{activeDimensionData.label}</h3>
                <p>{activeDimensionData.detail}</p>
                <footer>{activeDimensionData.signal}</footer>
              </div>
              <footer className={styles.resultFooter}>
                <span>PRIORITY SIGNAL</span>
                <strong>{weakestDimension.label} / {scores[weakestDimension.key]}</strong>
              </footer>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.matrix} aria-labelledby="readiness-matrix-title">
        <div className={styles.container}>
          <div className={styles.sectionHead} data-readiness-reveal>
            <p>OPPORTUNITY MATRIX</p>
            <h2 id="readiness-matrix-title">Nicht die lauteste Idee zuerst. Die sinnvollste.</h2>
            <span>AI-Chancen werden nach Wirkung, Aufwand und strategischer Rolle geordnet — bevor Budget in Technik fließt.</span>
          </div>

          <div className={styles.matrixShell} data-readiness-reveal>
            <div className={styles.matrixBoard}>
              <span className={styles.axisY}>IMPACT ↑</span>
              <span className={styles.axisX}>EFFORT →</span>
              <div className={styles.matrixCross} aria-hidden="true" />
              {opportunities.map((item, index) => (
                <button
                  key={item.code}
                  type="button"
                  className={styles.matrixNode}
                  data-active={activeOpportunity === index}
                  style={{ left: `${item.effort}%`, bottom: `${item.impact}%` }}
                  onClick={() => setActiveOpportunity(index)}
                >
                  <span>{item.code}</span>
                </button>
              ))}
              <div className={styles.quadrantLabel} data-position="top-left">HIGH IMPACT / LOWER EFFORT</div>
              <div className={styles.quadrantLabel} data-position="top-right">STRATEGIC SYSTEMS</div>
              <div className={styles.quadrantLabel} data-position="bottom-left">LOW PRIORITY</div>
              <div className={styles.quadrantLabel} data-position="bottom-right">REVIEW FIRST</div>
            </div>

            <aside className={styles.opportunityPanel}>
              <header>
                <span>SELECTED OPPORTUNITY</span>
                <strong>{activeOpportunityData.code}</strong>
              </header>
              <div>
                <small>{activeOpportunityData.tag}</small>
                <h3>{activeOpportunityData.title}</h3>
                <p>Diese Opportunity wird im Assessment gegen Datenzugang, Prozessklarheit, Risiko und erwartete Wirkung geprüft.</p>
              </div>
              <dl>
                <div><dt>IMPACT</dt><dd>{activeOpportunityData.impact}</dd></div>
                <div><dt>EFFORT</dt><dd>{activeOpportunityData.effort}</dd></div>
                <div><dt>STATUS</dt><dd>ASSESS</dd></div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.method} aria-labelledby="readiness-method-title">
        <div className={styles.container}>
          <div className={styles.sectionHead} data-readiness-reveal>
            <p>FROM POTENTIAL TO PILOT</p>
            <h2 id="readiness-method-title">Strategie endet nicht in einem PDF.</h2>
            <span>Der Readiness-Prozess führt von beobachteter Arbeit zu einer priorisierten, kontrollierten Pilot-Roadmap.</span>
          </div>

          <div className={styles.phaseGrid} data-readiness-reveal>
            {phases.map(([code, label, title, text]) => (
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

      <section className={styles.finalCta} aria-labelledby="readiness-cta-title">
        <div className={styles.finalGrid} aria-hidden="true" />
        <div className={styles.finalContent} data-readiness-reveal>
          <p>CONLYRA / AI READINESS</p>
          <h2 id="readiness-cta-title">Finden Sie den richtigen ersten AI-Schritt.</h2>
          <span>Keine Tool-Liste. Keine generische Roadmap. Ein klarer Blick auf Prozesse, Potenziale, Risiken und den sinnvollsten Pilot.</span>
          <a href="mailto:hello@conlyra.ai?subject=AI%20Readiness%20Assessment">Readiness Assessment anfragen <b aria-hidden="true">↗</b></a>
        </div>
        <div className={styles.finalRail}>
          <span>PRODUCT 05 / ONLINE</span>
          <span>READINESS → PRIORITY → PILOT → SCALE</span>
        </div>
      </section>
    </div>
  );
}
