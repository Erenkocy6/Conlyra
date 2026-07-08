import styles from "./SubpageVideoChapters.module.css";

type Chapter = {
  no: string;
  eyebrow: string;
  title: string;
  copy: string;
  video: string;
  meta: string;
};

type Props = {
  variant: "agents" | "workflow";
};

const chapters: Record<Props["variant"], Chapter[]> = {
  agents: [
    {
      no: "01",
      eyebrow: "AGENT IN CONTEXT",
      title: "Ein Agent arbeitet nicht im leeren Raum.",
      copy: "Er liest freigegebenen Kontext, versteht die aktuelle Situation und bereitet einen kontrollierten nächsten Schritt vor.",
      video: "/media/AdobeStock_1535809490.mp4",
      meta: "CONTEXT / MEMORY / ROLE",
    },
    {
      no: "02",
      eyebrow: "AGENT IN MOTION",
      title: "Entscheidungen werden sichtbar, bevor etwas passiert.",
      copy: "CONLYRA verbindet Reasoning, Policies und Human Gates zu einem nachvollziehbaren operativen Ablauf.",
      video: "/media/AdobeStock_1516198647.mp4",
      meta: "DECISION / POLICY / CONTROL",
    },
    {
      no: "03",
      eyebrow: "AGENT IN SYSTEM",
      title: "Aus einzelnen Aktionen wird ein verlässlicher Prozess.",
      copy: "Tools, Daten und Teams bleiben verbunden, während der Agent innerhalb klar definierter Grenzen arbeitet.",
      video: "/media/AdobeStock_517331471.mp4",
      meta: "TOOLS / ACTION / TRACE",
    },
  ],
  workflow: [
    {
      no: "01",
      eyebrow: "SIGNALS IN MOTION",
      title: "Jeder Prozess beginnt mit einem Signal.",
      copy: "Anfragen, Dokumente, Events und Systemzustände werden zu klaren Startpunkten für kontrollierte Workflows.",
      video: "/media/AdobeStock_1558014909.mp4",
      meta: "TRIGGER / ROUTING / CONTEXT",
    },
    {
      no: "02",
      eyebrow: "OPERATIONS CONNECTED",
      title: "Arbeit bewegt sich durch ein verbundenes System.",
      copy: "Daten werden geladen, Regeln geprüft, Verantwortungen berücksichtigt und nächste Schritte sauber vorbereitet.",
      video: "/media/AdobeStock_1499424979.mp4",
      meta: "LOGIC / GATES / ACTIONS",
    },
    {
      no: "03",
      eyebrow: "FLOW OBSERVABLE",
      title: "Jeder Schritt bleibt sichtbar.",
      copy: "Von der ersten Entscheidung bis zur letzten Aktion bleibt der gesamte Run nachvollziehbar und kontrollierbar.",
      video: "/media/AdobeStock_534758496.mp4",
      meta: "TRACE / AUDIT / CONTROL",
    },
  ],
};

export function SubpageVideoChapters({ variant }: Props) {
  const items = chapters[variant];
  const isAgents = variant === "agents";

  return (
    <section className={styles.root} data-video-chapters={variant} aria-labelledby={`${variant}-video-title`}>
      <div className={styles.head}>
        <p>{isAgents ? "AGENTS IN THE REAL WORLD" : "FLOW IN MOTION"}</p>
        <h2 id={`${variant}-video-title`}>
          {isAgents ? "Systeme werden verständlich, wenn man sie in Bewegung sieht." : "Workflows werden klar, wenn Bewegung sichtbar wird."}
        </h2>
        <span>{isAgents ? "Role / Context / Decision / Action" : "Signal / Context / Logic / Gate / Action / Trace"}</span>
      </div>

      <div className={styles.chapters}>
        {items.map((chapter, index) => (
          <article className={styles.chapter} data-side={index % 2 === 0 ? "left" : "right"} key={chapter.no}>
            <div className={styles.media}>
              <video autoPlay muted loop playsInline preload={index === 0 ? "metadata" : "none"}>
                <source src={chapter.video} type="video/mp4" />
              </video>
              <div className={styles.shade} />
              <div className={styles.mediaRail}>
                <span>CONLYRA / {chapter.no}</span>
                <strong>{chapter.meta}</strong>
              </div>
            </div>

            <div className={styles.copy}>
              <small>{chapter.no}</small>
              <p>{chapter.eyebrow}</p>
              <h3>{chapter.title}</h3>
              <span>{chapter.copy}</span>
              <div className={styles.signal}><i /><b>SYSTEM ACTIVE</b></div>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.final}>
        <p>{isAgents ? "BUILD YOUR FIRST AGENT." : "START WITH A REAL PROCESS."}</p>
        <h2>{isAgents ? "Der erste Agent beginnt mit einer klaren operativen Rolle." : "Der erste Workflow beginnt dort, wo heute noch Zeit verloren geht."}</h2>
        <span>{isAgents ? "Wir identifizieren Rolle, Kontext, Tools und Human Gates für einen ersten kontrollierten Pilot." : "Wir analysieren einen realen Prozess und definieren den ersten kontrollierten Workflow."}</span>
        <a href="mailto:hello@conlyra.ai">{isAgents ? "Agent-Pilot anfragen" : "Workflow Audit starten"}<b aria-hidden="true">↗</b></a>
      </div>
    </section>
  );
}
