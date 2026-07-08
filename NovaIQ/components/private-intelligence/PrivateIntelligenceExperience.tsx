"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./PrivateIntelligenceExperience.module.css";

const searchQueries = [
  "Was wurde dem Kunden zur Lieferzeit zugesagt?",
  "Welche Preisregel gilt für Enterprise-Verträge?",
  "Was wissen wir über Projekt Atlas?",
] as const;

const answerSets = [
  {
    answer: "Dem Kunden wurde im letzten Angebotsstand eine Lieferzeit von 8–10 Wochen nach technischer Freigabe zugesagt.",
    confidence: "0.96",
    sources: [
      ["01", "Angebot_Atlas_v4.pdf", "Seite 7 / Lieferbedingungen"],
      ["02", "CRM / Opportunity Atlas", "Note / 14.05.2026"],
      ["03", "Sales Thread / Atlas", "Mail / 16.05.2026"],
    ],
  },
  {
    answer: "Für Enterprise-Verträge über 36 Monate gilt die aktuelle Preisregel mit jährlicher Indexierung und individueller Freigabe ab 15 % Sonderrabatt.",
    confidence: "0.93",
    sources: [
      ["01", "Pricing_Policy_2026.pdf", "Abschnitt 4.2"],
      ["02", "Commercial Playbook", "Enterprise / Discounts"],
      ["03", "Approval Matrix", "Finance / Sales VP"],
    ],
  },
  {
    answer: "Projekt Atlas ist eine laufende Enterprise-Opportunity mit technischer Evaluation, drei offenen Anforderungen und einem geplanten Pilotstart nach Security Review.",
    confidence: "0.91",
    sources: [
      ["01", "CRM / Opportunity Atlas", "Stage / Evaluation"],
      ["02", "Technical Notes", "Open Requirements / 3"],
      ["03", "Security Review", "Status / Pending"],
    ],
  },
] as const;

const ingestionStages = [
  ["01", "CONNECT", "Sources become available"],
  ["02", "PARSE", "Structure is preserved"],
  ["03", "PERMISSIONS", "Access remains respected"],
  ["04", "INDEX", "Knowledge becomes retrievable"],
  ["05", "RETRIEVE", "Relevant evidence is selected"],
  ["06", "ANSWER", "Response stays grounded"],
] as const;

const sourceSystems = ["DRIVE", "SHAREPOINT", "NOTION", "SLACK", "GMAIL", "CRM", "DATABASE", "API"] as const;

const useCases = [
  {
    no: "01",
    label: "SALES",
    title: "Antworten, bevor der Kunde warten muss.",
    copy: "Angebote, Gesprächsverläufe, Pricing-Regeln und CRM-Kontext werden in einer Antwort zusammengeführt.",
    query: "Was wurde vereinbart und was ist der nächste sinnvolle Schritt?",
  },
  {
    no: "02",
    label: "SUPPORT",
    title: "Probleme mit dem Wissen aus vergangenen Fällen lösen.",
    copy: "Tickets, Dokumentation und technische Hinweise werden durchsucht, ohne Quellen und Berechtigungen zu verlieren.",
    query: "Gab es diesen Fehler schon einmal und wie wurde er gelöst?",
  },
  {
    no: "03",
    label: "OPERATIONS",
    title: "Prozesse mit aktuellem Unternehmenswissen versorgen.",
    copy: "Policies, SOPs und Systemdaten liefern Agenten und Teams den Kontext für kontrollierte operative Entscheidungen.",
    query: "Welche Regel gilt in diesem Fall und wer muss freigeben?",
  },
  {
    no: "04",
    label: "KNOWLEDGE",
    title: "Wissen bleibt nutzbar, auch wenn Teams wachsen.",
    copy: "Verteilte Informationen werden auffindbar, zitierbar und über Teams hinweg kontrolliert zugänglich.",
    query: "Wo steht die aktuellste Information und wer hat sie bestätigt?",
  },
] as const;

const graphNodes = [
  ["CUSTOMER", "Atlas GmbH", 50, 50],
  ["PROJECT", "Atlas Pilot", 26, 25],
  ["DOCUMENT", "Proposal v4", 74, 20],
  ["PERSON", "M. Weber", 15, 64],
  ["POLICY", "Pricing 2026", 82, 62],
  ["SYSTEM", "CRM Record", 42, 82],
  ["EVENT", "Security Review", 68, 84],
] as const;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function PrivateIntelligenceExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [queryIndex, setQueryIndex] = useState(0);
  const [typing, setTyping] = useState(0);
  const [answerState, setAnswerState] = useState<"idle" | "searching" | "ready">("ready");
  const [activeIngestion, setActiveIngestion] = useState(5);
  const [activeUseCase, setActiveUseCase] = useState(0);
  const [permissionView, setPermissionView] = useState<"sales" | "finance" | "engineering">("sales");

  const activeQuery = searchQueries[queryIndex];
  const activeAnswer = answerSets[queryIndex];
  const activeCase = useCases[activeUseCase];

  useEffect(() => {
    if (answerState !== "searching") return;
    setTyping(0);
    const timer = window.setInterval(() => {
      setTyping((current) => {
        const next = current + 1;
        if (next >= activeAnswer.answer.length) {
          window.clearInterval(timer);
          setAnswerState("ready");
          return activeAnswer.answer.length;
        }
        return next;
      });
    }, 12);
    return () => window.clearInterval(timer);
  }, [answerState, activeAnswer.answer]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-pi-reveal]"));
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

  const runQuery = (index: number) => {
    setQueryIndex(index);
    setAnswerState("searching");
  };

  const displayedAnswer = useMemo(() => {
    if (answerState === "searching") return activeAnswer.answer.slice(0, typing);
    return activeAnswer.answer;
  }, [answerState, activeAnswer.answer, typing]);

  return (
    <div className={styles.root} ref={rootRef} data-private-intelligence-experience>
      <section className={styles.hero} aria-labelledby="pi-hero-title">
        <div className={styles.heroMedia} aria-hidden="true">
          <video autoPlay muted loop playsInline preload="auto">
            <source src="/media/AdobeStock_1525614966.mp4" type="video/mp4" />
          </video>
        </div>
        <div className={styles.heroShade} aria-hidden="true" />
        <div className={styles.heroGrid} aria-hidden="true" />

        <div className={styles.heroLayout}>
          <div className={styles.heroCopy}>
            <p>CONLYRA / PRODUCT 03 / PRIVATE INTELLIGENCE</p>
            <h1 id="pi-hero-title"><span>Ihr Wissen.</span><span>Endlich</span><span>ausführbar.</span></h1>
            <div className={styles.heroSubline}>
              <span>Verbinden Sie Unternehmenswissen, Berechtigungen und Quellen zu einem privaten Intelligence Layer für Teams, Workflows und AI-Agenten.</span>
              <a href="#intelligence-demo">Intelligence Layer erkunden <Arrow /></a>
            </div>
          </div>

          <div className={styles.askPanel}>
            <header><span>ASK YOUR COMPANY</span><strong><i /> PRIVATE CONTEXT ONLINE</strong></header>
            <div className={styles.askInput}><small>QUERY / 01</small><strong>{activeQuery}</strong><span>↵</span></div>
            <div className={styles.askStatus}><span>SEARCHING ACROSS</span><div>{sourceSystems.slice(0,5).map((source) => <i key={source}>{source}</i>)}</div></div>
            <div className={styles.askAnswer}>
              <small>GROUNDED ANSWER</small>
              <p>{displayedAnswer}<i className={answerState === "searching" ? styles.cursor : ""} /></p>
            </div>
            <footer><span>3 SOURCES CITED</span><span>CONFIDENCE / {activeAnswer.confidence}</span><span>PERMISSIONS / RESPECTED</span></footer>
          </div>
        </div>

        <div className={styles.heroRail}><span>PRIVATE KNOWLEDGE / DACH / EUROPE</span><span>SEARCH → GROUND → ANSWER → CITE</span></div>
      </section>

      <section className={styles.problem} aria-labelledby="pi-problem-title">
        <div className={styles.container}>
          <div className={styles.sectionHead} data-pi-reveal>
            <p>THE KNOWLEDGE GAP</p>
            <h2 id="pi-problem-title">Ihr Unternehmen weiß mehr.<span>Als es finden kann.</span></h2>
            <span>Wissen steckt in Dokumenten, Nachrichten, Systemen und Köpfen — verteilt, unterschiedlich aktuell und nicht immer zugänglich.</span>
          </div>

          <div className={styles.knowledgeWall} data-pi-reveal>
            <article className={styles.wallDrive}><small>DRIVE / 14,282 FILES</small><strong>Welche Version ist aktuell?</strong><span>proposal_final_v7_REAL.pdf</span></article>
            <article className={styles.wallSlack}><small>SLACK / 2.8M MESSAGES</small><strong>Wer hat das schon einmal gelöst?</strong><span>Search returned 184 results</span></article>
            <article className={styles.wallCrm}><small>CRM / 18,104 RECORDS</small><strong>Was weiß Sales bereits?</strong><span>Context distributed across activities</span></article>
            <article className={styles.wallDocs}><small>WIKI / POLICIES</small><strong>Welche Regel gilt wirklich?</strong><span>Last verified / unknown</span></article>
            <div className={styles.wallCore}><span>CONLYRA PRIVATE INTELLIGENCE</span><strong>ONE CONTEXT LAYER</strong><i /></div>
          </div>
        </div>
      </section>

      <section className={styles.ingestion} aria-labelledby="pi-ingestion-title">
        <div className={styles.container}>
          <div className={styles.sectionHead} data-pi-reveal>
            <p>THE INTELLIGENCE PIPELINE</p>
            <h2 id="pi-ingestion-title">Von verteilten Quellen zu belastbarem Kontext.</h2>
            <span>Private Intelligence verarbeitet Wissen nicht als einfachen Textpool, sondern als kontrollierte Kette aus Quelle, Struktur, Berechtigung und Evidenz.</span>
          </div>

          <div className={styles.ingestionShell} data-pi-reveal>
            <div className={styles.sourceColumn}>
              <small>CONNECTED SOURCES / 08</small>
              {sourceSystems.map((source, index) => <div key={source}><i>{String(index + 1).padStart(2,"0")}</i><strong>{source}</strong><span>ONLINE</span></div>)}
            </div>
            <div className={styles.pipelineStage}>
              <div className={styles.pipelineTop}><span>INTELLIGENCE PIPELINE / RUN 82A4</span><strong><i /> PROCESSING</strong></div>
              <div className={styles.pipelineTrack}>
                {ingestionStages.map(([no,label,copy], index) => (
                  <button key={no} type="button" data-active={index <= activeIngestion} data-current={index === activeIngestion} onClick={() => setActiveIngestion(index)}>
                    <small>{no}</small><i /><strong>{label}</strong><span>{copy}</span>
                  </button>
                ))}
              </div>
              <footer><span>DOCUMENTS / 18,204</span><span>PERMISSIONS / SYNCED</span><span>INDEX / CURRENT</span></footer>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.demo} id="intelligence-demo" aria-labelledby="pi-demo-title">
        <div className={styles.container}>
          <div className={styles.sectionHead} data-pi-reveal>
            <p>ASK YOUR COMPANY</p>
            <h2 id="pi-demo-title">Eine Antwort ist nur so gut wie ihre Evidenz.</h2>
            <span>Frontend simulation / no live customer data.</span>
          </div>

          <div className={styles.demoShell} data-pi-reveal>
            <aside className={styles.queryList}>
              <small>SAVED QUERIES</small>
              {searchQueries.map((query,index) => <button type="button" key={query} data-active={index === queryIndex} onClick={() => runQuery(index)}><i>0{index + 1}</i><span>{query}</span><b>↗</b></button>)}
            </aside>

            <article className={styles.answerPanel}>
              <header><span>ANSWER / PRIVATE CONTEXT</span><strong data-state={answerState}><i /> {answerState.toUpperCase()}</strong></header>
              <div className={styles.answerBody}>
                <small>ANSWER</small>
                <h3>{displayedAnswer}<i className={answerState === "searching" ? styles.cursor : ""} /></h3>
                <div className={styles.confidence}><span>CONFIDENCE</span><strong>{activeAnswer.confidence}</strong><i><b style={{ width: `${Number(activeAnswer.confidence) * 100}%` }} /></i></div>
              </div>
              <div className={styles.sources}>
                <small>SOURCES / {activeAnswer.sources.length}</small>
                {activeAnswer.sources.map(([no,title,meta]) => <div key={no}><i>{no}</i><strong>{title}</strong><span>{meta}</span><b>OPEN ↗</b></div>)}
              </div>
              <footer><span>PERMISSIONS VERIFIED</span><span>3 SOURCES USED</span><span>0 UNSUPPORTED CLAIMS / SIMULATED</span></footer>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.cinematic} aria-labelledby="pi-film-title">
        <div className={styles.cinematicMedia}><video autoPlay muted loop playsInline preload="metadata"><source src="/media/AdobeStock_1535809490.mp4" type="video/mp4" /></video></div>
        <div className={styles.cinematicShade} />
        <div className={styles.cinematicCopy}>
          <p>CONTEXT, NOT CONTENT.</p>
          <h2 id="pi-film-title">Wissen wird wertvoll, wenn es im richtigen Moment verfügbar ist.</h2>
          <div><span>PRIVATE CONTEXT LAYER</span><strong>SEARCH / RETRIEVAL / EVIDENCE / ACTION</strong></div>
        </div>
      </section>

      <section className={styles.permissions} aria-labelledby="pi-permissions-title">
        <div className={styles.container}>
          <div className={styles.sectionHead} data-pi-reveal>
            <p>ACCESS BY DESIGN</p>
            <h2 id="pi-permissions-title">Intelligence ohne Berechtigung ist kein System.</h2>
            <span>Antworten respektieren Rollen und Zugriffe. Unterschiedliche Teams sehen unterschiedliche Evidenz — aus derselben Knowledge Layer.</span>
          </div>

          <div className={styles.permissionShell} data-pi-reveal>
            <nav>
              {(["sales","finance","engineering"] as const).map((role) => <button key={role} type="button" data-active={permissionView === role} onClick={() => setPermissionView(role)}>{role.toUpperCase()}</button>)}
            </nav>
            <div className={styles.permissionGrid}>
              {["CRM Accounts","Sales Threads","Pricing Policy","Finance Forecast","Technical Docs","Source Code","Security Review","Contracts"].map((item,index) => {
                const accessMap = {
                  sales: [1,1,1,0,1,0,0,0],
                  finance: [1,0,1,1,0,0,0,1],
                  engineering: [0,0,0,0,1,1,1,0],
                } as const;
                const allowed = accessMap[permissionView][index] === 1;
                return <div key={item} data-access={allowed ? "allowed" : "blocked"}><span>{item}</span><strong>{allowed ? "ACCESS" : "BLOCKED"}</strong><i>{allowed ? "✓" : "×"}</i></div>;
              })}
            </div>
            <footer><span>ROLE / {permissionView.toUpperCase()}</span><span>DOCUMENT ENTITLEMENTS / RESPECTED</span><span>ACCESS GRAPH / CURRENT</span></footer>
          </div>
        </div>
      </section>

      <section className={styles.graphSection} aria-labelledby="pi-graph-title">
        <div className={styles.container}>
          <div className={styles.sectionHead} data-pi-reveal>
            <p>KNOWLEDGE RELATIONSHIPS</p>
            <h2 id="pi-graph-title">Wissen besteht nicht aus Dateien. Sondern aus Beziehungen.</h2>
            <span>Kunden, Projekte, Personen, Dokumente, Regeln und Ereignisse ergeben gemeinsam den Kontext einer Entscheidung.</span>
          </div>

          <div className={styles.graph} data-pi-reveal>
            <svg viewBox="0 0 1000 620" aria-hidden="true">
              <line x1="500" y1="310" x2="260" y2="155" />
              <line x1="500" y1="310" x2="740" y2="124" />
              <line x1="500" y1="310" x2="150" y2="397" />
              <line x1="500" y1="310" x2="820" y2="385" />
              <line x1="500" y1="310" x2="420" y2="508" />
              <line x1="500" y1="310" x2="680" y2="520" />
              <line x1="260" y1="155" x2="150" y2="397" />
              <line x1="740" y1="124" x2="820" y2="385" />
            </svg>
            {graphNodes.map(([type,label,x,y],index) => <div className={styles.graphNode} data-core={index === 0} key={label} style={{ "--x": `${x}%`, "--y": `${y}%` } as CSSProperties}><small>{type}</small><strong>{label}</strong><span>{index === 0 ? "ACTIVE CONTEXT" : "CONNECTED"}</span></div>)}
            <div className={styles.graphPulse} />
          </div>
        </div>
      </section>

      <section className={styles.cinematicSplit} aria-label="Private Intelligence in motion">
        <div className={styles.splitMedia}><video autoPlay muted loop playsInline preload="none"><source src="/media/AdobeStock_444039087.mp4" type="video/mp4" /></video><div /></div>
        <div className={styles.splitCopy}><p>PRIVATE BY DEFAULT.</p><h2>Ihr Unternehmenswissen bleibt Ihr Kontext.</h2><span>CONLYRA verbindet private Quellen mit kontrollierten Zugriffsregeln, nachvollziehbaren Antworten und sichtbarer Evidenz.</span><div><i /><strong>PRIVATE CONTEXT ACTIVE</strong></div></div>
      </section>

      <section className={styles.useCasesSection} aria-labelledby="pi-usecases-title">
        <div className={styles.container}>
          <div className={styles.sectionHead} data-pi-reveal>
            <p>WHERE INTELLIGENCE WORKS</p>
            <h2 id="pi-usecases-title">Ein Context Layer. Mehrere operative Welten.</h2>
            <span>Private Intelligence wird dort wertvoll, wo Entscheidungen heute von verteiltem Wissen abhängen.</span>
          </div>

          <div className={styles.useCaseShell} data-pi-reveal>
            <div className={styles.useCaseRows}>
              {useCases.map((item,index) => <button type="button" key={item.no} data-active={index === activeUseCase} onMouseEnter={() => setActiveUseCase(index)} onFocus={() => setActiveUseCase(index)} onClick={() => setActiveUseCase(index)}><small>{item.no}</small><div><strong>{item.label}</strong><span>{item.title}</span></div><i>↗</i></button>)}
            </div>
            <article className={styles.useCasePreview} key={activeCase.no}>
              <header><span>{activeCase.label} / PRIVATE INTELLIGENCE</span><strong><i /> READY</strong></header>
              <h3>{activeCase.title}</h3>
              <p>{activeCase.copy}</p>
              <div className={styles.previewQuery}><small>EXAMPLE QUERY</small><strong>{activeCase.query}</strong></div>
              <footer><span>SOURCES / CONNECTED</span><span>PERMISSIONS / ON</span><span>CITATIONS / ON</span></footer>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.finalScene} aria-labelledby="pi-final-title">
        <div className={styles.finalMedia}><video autoPlay muted loop playsInline preload="none"><source src="/media/AdobeStock_1516198647.mp4" type="video/mp4" /></video></div>
        <div className={styles.finalShade} />
        <div className={styles.finalContent}>
          <p>BUILD YOUR PRIVATE INTELLIGENCE LAYER.</p>
          <h2 id="pi-final-title">Machen Sie Wissen nutzbar, ohne Kontrolle abzugeben.</h2>
          <span>Wir analysieren Ihre wichtigsten Wissensquellen, Zugriffsregeln und Use Cases für einen ersten kontrollierten Intelligence Pilot.</span>
          <a href="mailto:hello@conlyra.ai">Intelligence Pilot anfragen <Arrow /></a>
          <div className={styles.finalProof}><div><strong>01</strong><span>KNOWLEDGE AUDIT</span></div><div><strong>01</strong><span>CONTEXT LAYER</span></div><div><strong>01</strong><span>PRIVATE PILOT</span></div></div>
        </div>
      </section>
    </div>
  );
}
