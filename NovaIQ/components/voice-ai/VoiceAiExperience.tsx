"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./VoiceAiExperience.module.css";

const callSteps = [
  ["00:00", "CALL CONNECTED", "voice_channel / inbound"],
  ["00:02", "SPEECH DETECTED", "language / de-DE"],
  ["00:04", "INTENT RESOLVED", "reschedule_appointment"],
  ["00:05", "CONTEXT LOADED", "calendar + crm + policy"],
  ["00:07", "ACTION PREPARED", "calendar.lookup"],
  ["00:09", "CONFIRMATION", "slot / 14:30"],
] as const;

const transcript = [
  ["CUSTOMER", "Guten Tag, ich möchte meinen Termin morgen verschieben."],
  ["VOICE AGENT", "Natürlich. Ich prüfe direkt, welche Alternativen verfügbar sind."],
  ["SYSTEM", "calendar.lookup → 14:30 / 16:00"],
  ["VOICE AGENT", "Ich kann Ihnen morgen 14:30 Uhr oder 16:00 Uhr anbieten. Was passt besser?"],
  ["CUSTOMER", "14:30 passt perfekt."],
  ["VOICE AGENT", "Erledigt. Ihr Termin ist auf 14:30 Uhr verschoben."],
] as const;

const voiceLayers = [
  ["01", "LISTEN", "Sprache erkennen", "audio.stream / de-DE / active"],
  ["02", "UNDERSTAND", "Intent und Kontext", "intent / reschedule_appointment"],
  ["03", "REASON", "Regeln prüfen", "policy / reschedule_allowed"],
  ["04", "ACT", "Systemaktion", "calendar.update / prepared"],
  ["05", "CONFIRM", "Ergebnis bestätigen", "confirmation / customer"],
  ["06", "TRACE", "Gespräch dokumentieren", "trace / complete"],
] as const;

const useCases = [
  ["01", "APPOINTMENTS", "Termin vereinbaren, verschieben und bestätigen", "CALENDAR + CRM"],
  ["02", "SUPPORT", "Anliegen verstehen, lösen oder kontrolliert weitergeben", "KNOWLEDGE + TICKETS"],
  ["03", "LEAD QUALIFICATION", "Bedarf erfassen, qualifizieren und an Sales routen", "CRM + ROUTING"],
  ["04", "ORDER STATUS", "Status prüfen, erklären und nächste Schritte auslösen", "ERP + SUPPORT"],
] as const;

const handoffRules = [
  ["LOW RISK", "Standardtermin verschieben", "AUTO EXECUTE"],
  ["MEDIUM RISK", "Sonderkondition anfragen", "HUMAN HANDOFF"],
  ["HIGH RISK", "Vertragsänderung verlangen", "BLOCK + ESCALATE"],
] as const;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function VoiceAiExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [callState, setCallState] = useState<"idle" | "active" | "done">("idle");
  const [transcriptIndex, setTranscriptIndex] = useState(1);
  const [activeLayer, setActiveLayer] = useState(0);
  const [activeUseCase, setActiveUseCase] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-voice-reveal]"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).dataset.visible = "true";
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (callState !== "active") return;
    const timer = window.setInterval(() => {
      setActiveStep((current) => {
        const next = current + 1;
        if (next >= callSteps.length - 1) {
          window.clearInterval(timer);
          setCallState("done");
          return callSteps.length - 1;
        }
        return next;
      });
      setTranscriptIndex((current) => Math.min(transcript.length, current + 1));
    }, 850);
    return () => window.clearInterval(timer);
  }, [callState]);

  const activeLayerData = voiceLayers[activeLayer];
  const activeCase = useCases[activeUseCase];
  const status = useMemo(() => callState.toUpperCase(), [callState]);

  const runCall = () => {
    setActiveStep(0);
    setTranscriptIndex(1);
    setCallState("active");
  };

  return (
    <div className={styles.root} ref={rootRef} data-voice-ai-experience>
      <section className={styles.hero} aria-labelledby="voice-hero-title">
        <div className={styles.heroVideo} aria-hidden="true">
          <video autoPlay muted loop playsInline preload="auto">
            <source src="/media/AdobeStock_1516198647.mp4" type="video/mp4" />
          </video>
        </div>
        <div className={styles.heroShade} aria-hidden="true" />
        <div className={styles.heroGrid} aria-hidden="true" />

        <div className={styles.heroLayout}>
          <div className={styles.heroCopy}>
            <p>CONLYRA / PRODUCT 04 / VOICE AI</p>
            <h1 id="voice-hero-title"><span>Ihr Unternehmen.</span><span>Immer</span><span>erreichbar.</span></h1>
            <div className={styles.heroSubline}>
              <span>CONLYRA Voice Agents führen natürliche Gespräche, verstehen Anliegen, nutzen Unternehmenskontext und führen kontrollierte Aktionen aus.</span>
              <a href="#voice-demo">Voice Demo starten <Arrow /></a>
            </div>
          </div>

          <div className={styles.callCard}>
            <header><span>INCOMING CALL</span><strong><i /> VOICE CHANNEL OPEN</strong></header>
            <div className={styles.caller}><small>CALLER / DE</small><strong>+49 6428 •••••</strong><span>00:18</span></div>
            <div className={styles.waveform} aria-hidden="true">
              {Array.from({ length: 56 }).map((_, index) => <i key={index} style={{ "--h": `${22 + ((index * 17) % 66)}%`, "--d": `${index * -0.035}s` } as React.CSSProperties} />)}
            </div>
            <div className={styles.liveIntent}><small>LIVE INTENT</small><strong>reschedule_appointment</strong><span>0.94</span></div>
            <div className={styles.liveAction}><small>SYSTEM ACTION</small><strong>calendar.lookup</strong><span>READY</span></div>
            <footer><span>LATENCY / 410ms</span><span>LANGUAGE / de-DE</span><span>TRACE / ACTIVE</span></footer>
          </div>
        </div>

        <div className={styles.heroRail}><span>VOICE SYSTEMS / DACH</span><span>LISTEN → UNDERSTAND → ACT → CONFIRM</span></div>
      </section>

      <section className={styles.problem} aria-labelledby="voice-problem-title">
        <div className={styles.container}>
          <div className={styles.sectionHead} data-voice-reveal>
            <p>THE AVAILABILITY GAP</p>
            <h2 id="voice-problem-title">Anrufe warten nicht.<span>Ihre Kunden auch nicht.</span></h2>
            <span>Verpasste Gespräche, Warteschleifen und manuelle Rückrufe bremsen Service und Vertrieb genau dann, wenn Aufmerksamkeit am wertvollsten ist.</span>
          </div>

          <div className={styles.callWall} data-voice-reveal>
            <article><small>08:12 / MISSED CALL</small><strong>Termin verschieben</strong><span>No callback yet</span></article>
            <article><small>11:46 / QUEUE</small><strong>04:32 waiting</strong><span>Customer dropped</span></article>
            <article><small>15:07 / SALES</small><strong>Lead intent unknown</strong><span>Manual follow-up required</span></article>
            <article><small>18:34 / CLOSED</small><strong>Outside opening hours</strong><span>Request not captured</span></article>
            <div className={styles.wallCore}><span>CONLYRA VOICE</span><strong>ALWAYS AVAILABLE</strong><i /></div>
          </div>
        </div>
      </section>

      <section className={styles.architecture} aria-labelledby="voice-architecture-title">
        <div className={styles.container}>
          <div className={styles.sectionHead} data-voice-reveal>
            <p>VOICE ARCHITECTURE</p>
            <h2 id="voice-architecture-title">Ein Gespräch ist ein operativer Prozess.</h2>
            <span>Voice AI wird erst dann wertvoll, wenn Verstehen, Kontext, Regeln und Aktionen in einem kontrollierten System zusammenlaufen.</span>
          </div>

          <div className={styles.architectureShell} data-voice-reveal>
            <nav>
              {voiceLayers.map(([no,label],index) => <button type="button" key={no} data-active={index === activeLayer} onClick={() => setActiveLayer(index)}><small>{no}</small><span>{label}</span><i>↗</i></button>)}
            </nav>
            <article className={styles.architectureStage} key={activeLayerData[0]}>
              <header><span>LAYER / {activeLayerData[0]}</span><strong>{activeLayerData[1]}</strong></header>
              <div className={styles.stageBody}>
                <div><small>{activeLayerData[1]}</small><h3>{activeLayerData[2]}</h3><p>Jede Ebene des Gesprächs bleibt sichtbar und kontrollierbar, bevor der Voice Agent den nächsten Schritt ausführt.</p></div>
                <div className={styles.voiceConsole}><header><span>VOICE ENGINE</span><strong><i /> ACTIVE</strong></header><code><small>01</small><span>{activeLayerData[3]}</span><b>✓</b></code><code><small>02</small><span>context / connected</span><b>✓</b></code><code><small>03</small><span>policy / evaluated</span><b>✓</b></code><footer><span>VOICE / LIVE</span><span>TRACE / ON</span></footer></div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.cinematic} aria-labelledby="voice-film-title">
        <div className={styles.cinematicMedia}><video autoPlay muted loop playsInline preload="metadata"><source src="/media/AdobeStock_517331471.mp4" type="video/mp4" /></video></div>
        <div className={styles.cinematicShade} />
        <div className={styles.cinematicCopy}>
          <p>EVERY CONVERSATION CAN MOVE WORK.</p>
          <h2 id="voice-film-title">Von Sprache zu Handlung — in einem kontrollierten System.</h2>
          <div><span>VOICE AGENT SYSTEM</span><strong>INTENT / CONTEXT / ACTION / TRACE</strong></div>
        </div>
      </section>

      <section className={styles.demo} id="voice-demo" aria-labelledby="voice-demo-title">
        <div className={styles.container}>
          <div className={styles.sectionHead} data-voice-reveal>
            <p>LIVE CALL SIMULATION</p>
            <h2 id="voice-demo-title">Sehen Sie, wie aus einem Gespräch eine Aktion wird.</h2>
            <span>Frontend simulation / no real phone connection.</span>
          </div>

          <div className={styles.demoShell} data-voice-reveal>
            <aside>
              <small>CALL MISSION</small>
              <h3>Termin verschieben und im Kalender bestätigen.</h3>
              <button type="button" onClick={runCall} disabled={callState === "active"}>RUN CALL <Arrow /></button>
              <div className={styles.demoStatus}><span>STATUS</span><strong><i /> {status}</strong></div>
            </aside>

            <div className={styles.transcriptPanel}>
              <header><span>LIVE TRANSCRIPT</span><strong>CALL / 8F21</strong></header>
              <div className={styles.transcriptRows}>
                {transcript.slice(0, transcriptIndex).map(([speaker,text],index) => <div key={`${speaker}-${index}`} data-speaker={speaker}><small>{speaker}</small><p>{text}</p><span>{String(index + 1).padStart(2,"0")}</span></div>)}
              </div>
            </div>

            <div className={styles.actionPanel}>
              <header><span>SYSTEM TRACE</span><strong><i /> LIVE</strong></header>
              {callSteps.map(([time,event,detail],index) => <div key={time} data-active={index <= activeStep} data-current={index === activeStep}><time>{time}</time><strong>{event}</strong><code>{detail}</code><i>{index <= activeStep ? "✓" : "—"}</i></div>)}
              <footer><span>6 EVENTS</span><span>0 VIOLATIONS</span></footer>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.handoff} aria-labelledby="voice-handoff-title">
        <div className={styles.container}>
          <div className={styles.sectionHead} data-voice-reveal>
            <p>HUMAN HANDOFF</p>
            <h2 id="voice-handoff-title">Automatisieren Sie Gespräche.<span>Nicht Verantwortung.</span></h2>
            <span>Voice Agents erkennen, wann sie selbst handeln dürfen und wann ein Mensch übernehmen muss.</span>
          </div>

          <div className={styles.handoffGrid} data-voice-reveal>
            <div className={styles.ruleRows}>{handoffRules.map(([risk,caseName,action],index) => <div key={risk}><small>0{index + 1}</small><strong>{risk}</strong><span>{caseName}</span><b>{action}</b></div>)}</div>
            <aside className={styles.handoffConsole}><header><span>HANDOFF ENGINE</span><strong><i /> ACTIVE</strong></header><code><b>✓</b><span>identity verified</span><small>PASS</small></code><code><b>✓</b><span>intent confidence</span><small>0.94</small></code><code className={styles.warn}><b>!</b><span>special pricing requested</span><small>HANDOFF</small></code><code><b>→</b><span>sales queue</span><small>ROUTED</small></code><footer><span>OWNER / SALES</span><span>CONTEXT / ATTACHED</span></footer></aside>
          </div>
        </div>
      </section>

      <section className={styles.useCasesSection} aria-labelledby="voice-usecases-title">
        <div className={styles.container}>
          <div className={styles.sectionHead} data-voice-reveal>
            <p>WHERE VOICE WORKS</p>
            <h2 id="voice-usecases-title">Gespräche, die direkt Arbeit bewegen.</h2>
            <span>Vom ersten Anliegen bis zur bestätigten Aktion kann Voice AI operative Prozesse verbinden.</span>
          </div>

          <div className={styles.useCaseShell} data-voice-reveal>
            <div className={styles.useCaseRows}>{useCases.map(([no,title,flow,meta],index) => <button type="button" key={no} data-active={index === activeUseCase} onMouseEnter={() => setActiveUseCase(index)} onFocus={() => setActiveUseCase(index)} onClick={() => setActiveUseCase(index)}><small>{no}</small><div><strong>{title}</strong><span>{flow}</span></div><b>{meta}</b><i>↗</i></button>)}</div>
            <article className={styles.casePreview} key={activeCase[0]}><header><span>{activeCase[1]} / VOICE PREVIEW</span><strong><i /> READY</strong></header><h3>{activeCase[2]}</h3><div className={styles.caseWave}>{Array.from({ length: 28 }).map((_,index) => <i key={index} style={{ "--h": `${25 + ((index * 23) % 68)}%` } as React.CSSProperties} />)}</div><p>{activeCase[3]}</p><footer><span>VOICE / LIVE</span><span>HANDOFF / CONFIGURABLE</span><span>TRACE / ACTIVE</span></footer></article>
          </div>
        </div>
      </section>

      <section className={styles.finalScene} aria-labelledby="voice-final-title">
        <div className={styles.finalMedia}><video autoPlay muted loop playsInline preload="none"><source src="/media/AdobeStock_1499424979.mp4" type="video/mp4" /></video></div>
        <div className={styles.finalShade} />
        <div className={styles.finalContent}>
          <p>OPEN YOUR FIRST VOICE CHANNEL.</p>
          <h2 id="voice-final-title">Machen Sie aus Anrufen kontrollierte Prozesse.</h2>
          <span>Wir analysieren Gesprächsvolumen, typische Anliegen, Systemzugriffe und Handoff-Regeln für einen ersten Voice-Pilot.</span>
          <a href="mailto:hello@conlyra.ai">Voice Pilot anfragen <Arrow /></a>
          <div className={styles.finalProof}><div><strong>01</strong><span>CALL AUDIT</span></div><div><strong>01</strong><span>VOICE FLOW</span></div><div><strong>01</strong><span>LIVE PILOT</span></div></div>
        </div>
      </section>
    </div>
  );
}
