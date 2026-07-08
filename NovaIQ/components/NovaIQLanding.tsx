"use client";

import Image from "next/image";
import { motion, useReducedMotion as useMotionReduced } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, FormEvent, PropsWithChildren, RefObject } from "react";
import type Lenis from "lenis";

const trustSignals = [
  "Für Marketingteams",
  "Für mittelständische Unternehmen",
  "Freigabeprozess inklusive",
  "DSGVO-bewusst geplant",
];

const navItems = [
  { label: "Produkt", shortLabel: "Produkt", href: "#produkt-demo", id: "produkt-demo", meta: "Demo" },
  { label: "Workflow", shortLabel: "Flow", href: "#workflow", id: "workflow", meta: "System" },
  { label: "Use Cases", shortLabel: "Cases", href: "#usecases", id: "usecases", meta: "Teams" },
  { label: "Vertrauen", shortLabel: "Trust", href: "#vertrauen", id: "vertrauen", meta: "B2B" },
  { label: "FAQ", shortLabel: "FAQ", href: "#faq", id: "faq", meta: "Klarheit" },
];

const mobileDockItems = [
  navItems[0],
  navItems[1],
  navItems[3],
  { label: "Demo", shortLabel: "Demo", href: "#kontakt", id: "kontakt", meta: "Call" },
];

const dashboardCards = [
  ["Content Chance erkannt", "Kundenprojekt, 09:42"],
  ["Hook generiert", "3 Varianten bereit"],
  ["Caption bereit", "LinkedIn + Instagram"],
  ["Freigabe ausstehend", "Marketing Lead"],
  ["Post geplant", "Donnerstag, 08:30"],
  ["Brand Voice aktiv", "B2B Klarheit"],
  ["LinkedIn Format empfohlen", "Carousel Draft"],
];

const painPoints = [
  "Gute Momente verschwinden im Alltag",
  "Marketing erfährt zu spät von Projekten",
  "Social Media wird unregelmäßig",
];

const mediaAssets = {
  controlRoom: "/media/novaiq-control-room-hero.png",
  captureWall: "/media/novaiq-capture-wall.png",
  reviewGate: "/media/novaiq-review-gate.png",
  outputQueue: "/media/novaiq-output-queue.png",
};

const processSteps = [
  {
    title: "Erkennen",
    copy: "NovaIQ erkennt relevante Ereignisse, Termine, Projekte und Content-Möglichkeiten.",
    status: "Signal erkannt",
  },
  {
    title: "Vorschlagen",
    copy: "Der Agent erstellt passende Content-Ideen, Hooks, Captions und Formate.",
    status: "Hook + Angle",
  },
  {
    title: "Vorbereiten",
    copy: "Beiträge werden strukturiert, geplant und für verschiedene Kanäle angepasst.",
    status: "Draft bereit",
  },
  {
    title: "Freigeben",
    copy: "Das Team prüft, ergänzt Medien und gibt Inhalte final frei.",
    status: "Approval offen",
  },
  {
    title: "Veröffentlichen",
    copy: "Beiträge können vorbereitet oder automatisiert ausgespielt werden.",
    status: "Post geplant",
  },
];

const workflowNodes = [
  "Kalender / Projekt / Ereignis",
  "NovaIQ erkennt Content-Potenzial",
  "Idee + Hook + Caption + Format",
  "Team ergänzt Bild oder Video",
  "Freigabe",
  "Posting / Planung / Kampagne",
];

const demoSteps = [
  {
    title: "Kalenderereignis erkannt",
    copy: "Ein Termin, Projektupdate oder internes Ereignis wird als möglicher Content-Moment sichtbar.",
    state: "Signal aus Kalender",
    image: mediaAssets.captureWall,
    alt: "NovaIQ Capture Wall mit erkannten Content-Signalen",
    preview: ["Termin erkannt", "Kontext gelesen", "Quelle: Kalender"],
  },
  {
    title: "Content-Potenzial bewertet",
    copy: "NovaIQ priorisiert, ob der Moment zu LinkedIn, Recruiting, Vertrieb oder Thought Leadership passt.",
    state: "Potenzial bewertet",
    image: mediaAssets.controlRoom,
    alt: "NovaIQ Dashboard zur Bewertung von Content-Potenzial",
    preview: ["B2B-Relevanz hoch", "Format: LinkedIn", "Ziel: Vertrauen"],
  },
  {
    title: "Hook und Caption erstellt",
    copy: "Aus dem Kontext entstehen Hook, Caption und ein klarer Beitragwinkel.",
    state: "Draft erstellt",
    image: mediaAssets.outputQueue,
    alt: "NovaIQ Output Queue mit vorbereiteten Hooks und Captions",
    preview: ["Hook Variante A", "Caption bereit", "CTA vorgeschlagen"],
  },
  {
    title: "Brand Voice angewendet",
    copy: "Der Vorschlag wird an Tonalität, Wortwahl und Kommunikationsregeln des Unternehmens angepasst.",
    state: "Brand Voice aktiv",
    image: mediaAssets.reviewGate,
    alt: "NovaIQ Review Gate mit Brand Voice und Freigabehinweisen",
    preview: ["B2B klar", "Keine Floskeln", "Fachlich geprüft"],
  },
  {
    title: "Team-Freigabe vorbereitet",
    copy: "Rollen, Kommentare und Medienhinweise werden gebundelt, bevor ein Beitrag live geht.",
    state: "Freigabe offen",
    image: mediaAssets.reviewGate,
    alt: "NovaIQ Approval Workflow für Team-Freigaben",
    preview: ["Marketing Lead", "Medien fehlen", "Kommentar offen"],
  },
  {
    title: "Beitrag geplant",
    copy: "Der freigegebene Inhalt landet in der Pipeline und bleibt für das Team nachvollziehbar.",
    state: "Post geplant",
    image: mediaAssets.outputQueue,
    alt: "NovaIQ Content Pipeline mit geplantem Beitrag",
    preview: ["Donnerstag 08:30", "LinkedIn Post", "Status: bereit"],
  },
];

const useCases = [
  {
    title: "Geschäftsführer",
    copy: "Sichtbarkeit aufbauen, ohne jeden Post selbst planen zu müssen.",
    preview: ["Leadership Angle", "Projektmoment", "Freigabe: CEO"],
  },
  {
    title: "Marketingteams",
    copy: "Weniger Ideenchaos, mehr Struktur und schnellere Content-Produktion.",
    preview: ["Content Pipeline", "9 Ideen priorisiert", "Brand Voice geprüft"],
  },
  {
    title: "Vertrieb",
    copy: "Aus Projekten, Kundenfragen und Erfolgen werden verwertbare Inhalte.",
    preview: ["Kundenfrage erkannt", "Proof-Post", "Lead-Nurture Hook"],
  },
  {
    title: "HR & Recruiting",
    copy: "Arbeitgebermarke sichtbar machen, ohne künstliche Recruiting-Kampagnen.",
    preview: ["Team Moment", "Culture Caption", "Recruiting CTA"],
  },
];

const proofItems = [
  "Für B2B-Marketingteams entwickelt",
  "Freigabeprozess statt Blackbox",
  "Brand Voice statt generischer KI",
  "Content-Chancen statt leere Prompts",
];

const trustBlocks = [
  ["Freigabeprozess", "Inhalte werden vorbereitet und bleiben vor der Veröffentlichung prüfbar."],
  ["Brand Voice Kontrolle", "Tonalität, Begriffe und Formulierungsregeln sind Teil des Workflows."],
  ["Teamrollen", "Marketing, Vertrieb, Recruiting und Führung können klare Rollen erhalten."],
  ["DSGVO-bewusste Planung", "NovaIQ ist auf kontrollierte, nachvollziehbare Prozesse ausgelegt."],
  ["Menschliche Prüfung", "KI liefert Vorschläge. Die finale Verantwortung bleibt beim Team."],
  ["Strukturierte Workflows", "Ideen, Medien, Kommentare und Freigaben liegen nicht verstreut."],
  ["Kein Auto-Posting ohne Freigabe", "Automatisches Veröffentlichen passiert nur, wenn es bewusst konfiguriert ist."],
  ["Transparente Content-Pipeline", "Teams sehen, was erkannt, vorbereitet, geprüft und geplant ist."],
];

const caseStudies = [
  {
    tag: "Mittelstand · Platzhalter",
    title: "Mittelständisches Unternehmen",
    problem: "Zu wenige regelmäßige Inhalte trotz vieler Projekte.",
    impact: "Content-Chancen werden früher erkannt und als Beiträge vorbereitet.",
    image: mediaAssets.captureWall,
    alt: "Case Study Platzhalter für mittelständisches Unternehmen",
  },
  {
    tag: "Recruiting · Platzhalter",
    title: "Recruiting-Team",
    problem: "Arbeitgebermarke wirkt unregelmäßig und zu kampagnenhaft.",
    impact: "Echte Einblicke aus dem Alltag werden in Recruiting-Content übersetzt.",
    image: mediaAssets.reviewGate,
    alt: "Case Study Platzhalter für Recruiting Content",
  },
  {
    tag: "B2B-Vertrieb · Platzhalter",
    title: "B2B-Vertrieb",
    problem: "Kundenfragen und Projekterfolge bleiben intern.",
    impact: "Vertriebsmomente werden als Content-Ideen nutzbar gemacht.",
    image: mediaAssets.outputQueue,
    alt: "Case Study Platzhalter für B2B Vertrieb",
  },
];

const comparisonRows = [
  ["Wartet auf Prompts", "Erkennt Content-Chancen"],
  ["Kennt den Unternehmensalltag nicht", "Arbeitet mit Kontext"],
  ["Liefert generische Texte", "Erstellt strukturierte Vorschläge"],
  ["Hat keinen Freigabeprozess", "Unterstützt Freigabeprozesse"],
  ["Ist schwer ins Team einzubinden", "Macht Content planbarer"],
];

const objections = [
  [
    "Wir haben schon ChatGPT.",
    "ChatGPT schreibt Texte, wenn jemand einen Prompt eingibt. NovaIQ denkt als Workflow: erkennen, vorbereiten, freigeben, planen.",
  ],
  [
    "Unser Team hat keine Zeit.",
    "Genau dafür ist NovaIQ gedacht: weniger leere Starts, weniger Ideenchaos, klarere Vorschläge.",
  ],
  [
    "Wir wollen keine unkontrollierte KI.",
    "NovaIQ soll Inhalte vorbereiten, nicht ungeprüft veröffentlichen. Der Freigabeprozess bleibt zentral.",
  ],
  [
    "Passt das zu B2B?",
    "Ja. B2B-Unternehmen haben oft starke Inhalte in Projekten, Kundenfragen, Vertrieb, Recruiting und internen Abläufen. NovaIQ macht diese Momente sichtbar.",
  ],
];

const answerBlocks = [
  [
    "What is NovaIQ?",
    "NovaIQ is an AI Social Media Agent for companies that detects content opportunities from daily business activity and turns them into structured content ideas, captions and approval-ready workflows.",
  ],
  [
    "Who is NovaIQ for?",
    "NovaIQ is built for B2B companies, marketing teams, managing directors, HR teams, sales teams and agencies that want to make content planning more systematic.",
  ],
  [
    "How is NovaIQ different from ChatGPT?",
    "NovaIQ is not only a text generator. It is designed as a content workflow system that connects content opportunities, ideas, brand voice, team approval and planning.",
  ],
];

const seoTopics = [
  ["How an AI Social Media Agent works", "Ein AI Social Media Agent verbindet Signale aus dem Unternehmensalltag mit Ideen, Entwürfen, Brand Voice und Freigaben."],
  ["Why B2B companies need content automation", "B2B-Unternehmen haben viele relevante Momente, aber oft keinen Prozess, der sie rechtzeitig in Content übersetzt."],
  ["How NovaIQ supports marketing teams", "NovaIQ reduziert leere Starts, strukturiert Vorschläge und macht Freigaben für Marketingteams klarer."],
  ["How NovaIQ supports recruiting content", "Recruiting-Teams können echte Einblicke aus dem Alltag als planbare Arbeitgebermarken-Inhalte vorbereiten."],
  ["Content workflow automation for companies", "Content Workflow Software hilft, Ideen, Medien, Kommentare und Planung in einem nachvollziehbaren Prozess zu halten."],
  ["Social Media automation with human approval", "NovaIQ ist auf Social Media Automatisierung mit menschlicher Prüfung und kontrollierter Freigabe ausgelegt."],
];

const faqs = [
  [
    "Was ist NovaIQ?",
    "NovaIQ ist ein AI Social Media Agent und KI Marketing Agent, der Content-Chancen im Unternehmensalltag erkennt und daraus Ideen, Hooks, Captions und Freigabe-Workflows vorbereitet.",
  ],
  [
    "Für welche Unternehmen ist NovaIQ geeignet?",
    "NovaIQ eignet sich für mittelständische Unternehmen, B2B-Teams, Agenturen und Organisationen, die Social Media Automatisierung und planbare Content-Prozesse aufbauen möchten.",
  ],
  [
    "Ersetzt NovaIQ ein Marketingteam?",
    "Nein. NovaIQ unterstützt Marketingteams bei Recherche, Ideen, Struktur und Vorbereitung. Strategie, Tonalität und finale Verantwortung bleiben beim Team.",
  ],
  [
    "Kann NovaIQ Beiträge automatisch vorbereiten?",
    "Ja. NovaIQ kann Content-Ideen, Hook-Varianten, kanaloptimierte Captions und Posting-Workflows vorbereiten, damit Ihr Team schneller zur finalen Veröffentlichung kommt.",
  ],
  [
    "Gibt es einen Freigabeprozess?",
    "Ja. NovaIQ ist auf kontrollierte Content Automatisierung für Unternehmen ausgelegt und kann Freigaben, Kommentare und Rollenlogik in den Workflow integrieren.",
  ],
  [
    "Ist NovaIQ für B2B-Unternehmen geeignet?",
    "Ja. NovaIQ ist besonders für B2B-Unternehmen geeignet, weil Projekte, Kundenfragen, Events und interne Expertise strukturiert in Marketing-Content übersetzt werden können.",
  ],
  [
    "Wie hilft NovaIQ bei Social Media Automatisierung?",
    "NovaIQ erkennt relevante Momente, schlägt Formate vor, erstellt Entwürfe und führt diese durch einen Freigabeprozess. So wird Social Media Automatisierung planbar statt beliebig.",
  ],
  [
    "Ist NovaIQ auch für Recruiting-Content geeignet?",
    "Ja. NovaIQ kann interne Momente, Team-Updates und Arbeitgeberthemen in Recruiting-Content übersetzen, ohne künstliche Kampagnen zu erzwingen.",
  ],
];

function useReducedMotion() {
  return Boolean(useMotionReduced());
}

function useLenis(enabled: boolean) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    let lenis: Lenis | undefined;
    let active = true;
    let removeTicker: ((time: number) => void) | undefined;

    async function setup() {
      const [{ gsap }, { ScrollTrigger }, { default: LenisClass }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("lenis"),
      ]);

      if (!active) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);
      lenis = new LenisClass({
        anchors: true,
        lerp: window.innerWidth < 768 ? 0.16 : 0.075,
        smoothWheel: window.innerWidth >= 768,
        syncTouch: false,
      });

      lenis.on("scroll", ScrollTrigger.update);
      removeTicker = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(removeTicker);
      gsap.ticker.lagSmoothing(0);
    }

    void setup();

    return () => {
      active = false;
      const ticker = removeTicker;
      if (ticker) {
        void import("gsap").then(({ gsap }) => gsap.ticker.remove(ticker));
      }
      lenis?.destroy();
    };
  }, [enabled]);
}

function useMouseParallax(rootRef: RefObject<HTMLElement | null>, disabled: boolean) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || disabled || window.innerWidth < 768) {
      return;
    }

    let frame = 0;
    let x = 0;
    let y = 0;

    const sync = () => {
      frame = 0;
      root.style.setProperty("--novaiq-mouse-x", String(x));
      root.style.setProperty("--novaiq-mouse-y", String(y));
    };

    const onMove = (event: PointerEvent) => {
      x = Math.round((event.clientX / window.innerWidth - 0.5) * 18);
      y = Math.round((event.clientY / window.innerHeight - 0.5) * 14);
      if (!frame) {
        frame = window.requestAnimationFrame(sync);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [disabled, rootRef]);
}

function useActiveNavigation(rootRef: RefObject<HTMLElement | null>) {
  const [activeId, setActiveId] = useState(navItems[0].id);
  const [pageProgress, setPageProgress] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const items = [...navItems, mobileDockItems[mobileDockItems.length - 1]];

    const sync = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const nextProgress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      setPageProgress((current) => (Math.abs(current - nextProgress) > 0.004 ? nextProgress : current));

      const viewportAnchor = window.innerHeight * 0.34;
      let nextActiveId = items[0].id;

      for (const item of items) {
        const element = document.getElementById(item.id);
        if (!element) {
          continue;
        }

        const rect = element.getBoundingClientRect();
        if (rect.top <= viewportAnchor && rect.bottom >= 0) {
          nextActiveId = item.id;
        }
      }

      setActiveId((current) => (current === nextActiveId ? current : nextActiveId));
    };

    sync();
    const interval = window.setInterval(sync, 220);
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [rootRef]);

  return { activeId, pageProgress };
}

function useDemoScrollState(
  rootRef: RefObject<HTMLElement | null>,
  setActiveDemo: (index: number) => void,
) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const section = root.querySelector<HTMLElement>("[data-demo-section]");
    const line = root.querySelector<HTMLElement>("[data-demo-progress]");
    const steps = Array.from(root.querySelectorAll<HTMLElement>("[data-demo-step]"));
    if (!section || !steps.length) {
      return;
    }

    let current = -1;

    const sync = () => {
      const rect = section.getBoundingClientRect();
      const range = Math.max(1, rect.height - window.innerHeight * 0.36);
      const rawProgress = (window.innerHeight * 0.58 - rect.top) / range;
      const progress = Math.min(1, Math.max(0, rawProgress));
      const next = Math.min(demoSteps.length - 1, Math.floor(progress * demoSteps.length));

      line?.style.setProperty("--novaiq-demo-progress", String(progress));
      steps.forEach((step, index) => step.classList.toggle("is-active", index === next));

      if (next !== current) {
        current = next;
        setActiveDemo(next);
      }
    };

    sync();
    const interval = window.setInterval(sync, 180);
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [rootRef, setActiveDemo]);
}

function useGsapContext(
  rootRef: RefObject<HTMLElement | null>,
  reducedMotion: boolean,
  setActiveProcess: (index: number) => void,
  setActiveDemo: (index: number) => void,
) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }
    const rootElement = root;

    let active = true;
    let currentProcess = -1;
    let currentDemo = -1;

    async function setup() {
      const [{ gsap }, { ScrollTrigger }, { Flip }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("gsap/Flip"),
      ]);

      if (!active) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger, Flip);

      if (reducedMotion) {
        rootElement.querySelectorAll(".novaiq-reveal").forEach((item) => item.classList.add("novaiq-is-visible"));
        return;
      }

      const ctx = gsap.context(() => {
        gsap.to(".novaiq-dashboard", {
          scale: 0.94,
          y: -34,
          ease: "none",
          scrollTrigger: {
            trigger: ".novaiq-hero",
            start: "top top",
            end: "bottom top",
            scrub: 0.65,
          },
        });

        const processSection = rootElement.querySelector<HTMLElement>("[data-process-section]");
        const processLine = rootElement.querySelector<HTMLElement>("[data-process-line]");

        if (processSection) {
          ScrollTrigger.create({
            trigger: processSection,
            start: "top 55%",
            end: "bottom 45%",
            scrub: true,
            onUpdate: (self) => {
              const next = Math.min(processSteps.length - 1, Math.floor(self.progress * processSteps.length));
              if (next !== currentProcess) {
                currentProcess = next;
                setActiveProcess(next);
              }
              processLine?.style.setProperty("--novaiq-process-progress", String(self.progress));
            },
          });
        }

        const demoSection = rootElement.querySelector<HTMLElement>("[data-demo-section]");
        const demoLine = rootElement.querySelector<HTMLElement>("[data-demo-progress]");
        const demoStepsElements = Array.from(rootElement.querySelectorAll<HTMLElement>("[data-demo-step]"));

        if (demoSection && demoStepsElements.length) {
          ScrollTrigger.create({
            trigger: demoSection,
            start: "top 58%",
            end: "bottom 44%",
            scrub: 0.55,
            onUpdate: (self) => {
              const next = Math.min(demoSteps.length - 1, Math.floor(self.progress * demoSteps.length));
              demoLine?.style.setProperty("--novaiq-demo-progress", String(self.progress));
              demoStepsElements.forEach((step, index) => step.classList.toggle("is-active", index === next));

              if (next !== currentDemo) {
                const demoVisual = rootElement.querySelector<HTMLElement>("[data-demo-visual]");
                const state = demoVisual ? Flip.getState(demoVisual.querySelectorAll("[data-demo-flip]")) : undefined;
                currentDemo = next;
                setActiveDemo(next);
                if (state) {
                  window.requestAnimationFrame(() => {
                    Flip.from(state, { duration: 0.42, ease: "power3.out", absolute: false });
                  });
                }
              }
            },
          });
        }

        const workflow = rootElement.querySelector<HTMLElement>("[data-workflow]");
        const workflowLine = rootElement.querySelector<HTMLElement>("[data-workflow-line]");
        const nodes = Array.from(rootElement.querySelectorAll<HTMLElement>("[data-workflow-node]"));

        if (workflow && nodes.length) {
          ScrollTrigger.create({
            trigger: workflow,
            start: "top 64%",
            end: "bottom 42%",
            scrub: 0.5,
            onUpdate: (self) => {
              const activeIndex = Math.min(nodes.length - 1, Math.floor(self.progress * nodes.length));
              workflowLine?.style.setProperty("--novaiq-workflow-progress", String(self.progress));
              nodes.forEach((node, index) => node.classList.toggle("is-active", index <= activeIndex));
            },
          });
        }

        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((item) => {
          const value = Number(item.dataset.count || "0");
          const proxy = { value: 0 };
          gsap.to(proxy, {
            value,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 86%", once: true },
            onUpdate: () => {
              item.textContent = String(Math.round(proxy.value));
            },
          });
        });

        gsap.fromTo(
          "[data-problem-pin] mark",
          { backgroundPosition: "100% 0%" },
          {
            backgroundPosition: "0% 0%",
            ease: "none",
            scrollTrigger: {
              trigger: "[data-problem-pin]",
              start: "top 72%",
              end: "bottom 46%",
              scrub: true,
            },
          },
        );
      }, rootElement);

      return () => ctx.revert();
    }

    let cleanup: (() => void) | undefined;
    void setup().then((result) => {
      cleanup = result;
    });

    return () => {
      active = false;
      cleanup?.();
    };
  }, [reducedMotion, rootRef, setActiveDemo, setActiveProcess]);
}

function SplitWords({ text }: { text: string }) {
  const words = text.split(" ");

  return (
    <>
      {words.map((word, index) => (
        <span className="novaiq-hero-word-wrap" key={`${word}-${index}`}>
          <span className="novaiq-hero-word">{word}</span>
          {index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

function ShaderBackground({ reducedMotion }: { reducedMotion: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion || window.innerWidth < 768) {
      return;
    }

    let active = true;
    let frame = 0;
    let cleanup = () => undefined;

    async function setup() {
      const THREE = await import("three");
      if (!active || !canvas) {
        return;
      }

      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
      });
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const uniforms = {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uResolution: { value: new THREE.Vector2(1, 1) },
      };
      const material = new THREE.ShaderMaterial({
        transparent: true,
        uniforms,
        vertexShader: "void main(){gl_Position=vec4(position,1.0);}",
        fragmentShader: `
          precision mediump float;
          uniform float uTime;
          uniform vec2 uMouse;
          uniform vec2 uResolution;
          void main(){
            vec2 uv = gl_FragCoord.xy / uResolution.xy;
            float d1 = distance(uv, vec2(0.22 + uMouse.x * 0.08, 0.72 + sin(uTime*.18)*.025));
            float d2 = distance(uv, vec2(0.76 - uMouse.y * 0.05, 0.28 + cos(uTime*.16)*.02));
            float d3 = distance(uv, vec2(0.52, 0.52));
            vec3 cyan = vec3(0.36, 0.94, 1.0) * smoothstep(.62, .0, d1);
            vec3 violet = vec3(0.68, 0.38, 1.0) * smoothstep(.54, .0, d2);
            vec3 blue = vec3(0.34, 0.42, 1.0) * smoothstep(.72, .0, d3) * .55;
            float alpha = clamp((cyan.r + violet.b + blue.b) * .25, 0.0, .34);
            gl_FragColor = vec4(cyan + violet + blue, alpha);
          }
        `,
      });
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
      scene.add(mesh);

      const resize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.4));
        renderer.setSize(width, height, false);
        uniforms.uResolution.value.set(width, height);
      };

      const mouse = (event: PointerEvent) => {
        uniforms.uMouse.value.set(event.clientX / window.innerWidth, 1 - event.clientY / window.innerHeight);
      };

      const render = (time: number) => {
        uniforms.uTime.value = time * 0.001;
        renderer.render(scene, camera);
        frame = window.requestAnimationFrame(render);
      };

      resize();
      window.addEventListener("resize", resize);
      window.addEventListener("pointermove", mouse, { passive: true });
      frame = window.requestAnimationFrame(render);

      cleanup = () => {
        window.removeEventListener("resize", resize);
        window.removeEventListener("pointermove", mouse);
        window.cancelAnimationFrame(frame);
        geometryDispose(mesh.geometry);
        material.dispose();
        renderer.dispose();
      };
    }

    function geometryDispose(geometry: { dispose: () => void }) {
      geometry.dispose();
    }

    void setup();

    return () => {
      active = false;
      cleanup();
    };
  }, [reducedMotion]);

  return <canvas className="novaiq-shader" ref={canvasRef} aria-hidden="true" />;
}

function MagneticLink({
  children,
  className,
  href,
}: PropsWithChildren<{ className?: string; href: string }>) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.a
      className={`novaiq-button ${className ?? ""}`}
      href={href}
      whileHover={reducedMotion ? undefined : { scale: 1.025 }}
      whileTap={reducedMotion ? undefined : { scale: 0.985 }}
    >
      {children}
    </motion.a>
  );
}

function MagneticButton({ children }: PropsWithChildren) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.button
      className="novaiq-button novaiq-button-primary"
      type="submit"
      whileHover={reducedMotion ? undefined : { scale: 1.025 }}
      whileTap={reducedMotion ? undefined : { scale: 0.985 }}
    >
      {children}
    </motion.button>
  );
}

function GlassDashboard({ activeProcess }: { activeProcess: number }) {
  return (
    <aside className="novaiq-dashboard novaiq-reveal" aria-label="NovaIQ AI Dashboard Mockup">
      <div className="novaiq-dashboard-top">
        <span>NovaIQ Content OS</span>
        <strong>{processSteps[activeProcess]?.status ?? "Live"}</strong>
      </div>
      <div className="novaiq-dashboard-core" aria-hidden="true" />
      <div className="novaiq-dashboard-list">
        {dashboardCards.map(([title, meta], index) => (
          <article
            className={`novaiq-panel${index === activeProcess ? " is-active" : ""}`}
            data-dashboard-panel
            key={title}
            style={{ "--novaiq-panel-index": index } as CSSProperties}
          >
            <small>{String(index + 1).padStart(2, "0")}</small>
            <strong>{title}</strong>
            <p>{meta}</p>
          </article>
        ))}
      </div>
    </aside>
  );
}

function HeroSection({ activeProcess }: { activeProcess: number }) {
  return (
    <section id="top" className="novaiq-hero" aria-labelledby="hero-title">
      <div className="novaiq-container novaiq-hero-grid">
        <div className="novaiq-hero-copy novaiq-reveal">
          <p className="novaiq-eyebrow">AI Social Media Agent</p>
          <h1 id="hero-title">
            <SplitWords text="Der AI Social Media Agent für Unternehmen, die sichtbar bleiben wollen." />
          </h1>
          <p className="novaiq-hero-alt">
            Ihr Unternehmen erlebt täglich Content-Momente. NovaIQ macht daraus automatisch Marketing.
          </p>
          <p className="novaiq-copy">
            NovaIQ erkennt Content-Chancen in Ihrem Unternehmensalltag, entwickelt Content-Ideen,
            bereitet Beiträge vor und unterstützt Ihr Marketingteam mit einem intelligenten Workflow
            von der Idee bis zur Freigabe.
          </p>
          <p className="novaiq-micro-proof">Für Teams, die Content nicht mehr zufällig planen wollen.</p>
          <div className="novaiq-actions" aria-label="NovaIQ Handlungsoptionen">
            <MagneticLink className="novaiq-button-primary" href="#kontakt">Demo anfragen</MagneticLink>
            <MagneticLink className="novaiq-button-secondary" href="#produkt-demo">Watch product workflow</MagneticLink>
          </div>
          <ul className="novaiq-trust" aria-label="NovaIQ Vertrauenssignale">
            {trustSignals.map((signal) => (
              <li key={signal}>{signal}</li>
            ))}
          </ul>
        </div>
        <GlassDashboard activeProcess={activeProcess} />
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section id="problem" className="novaiq-section novaiq-problem" aria-labelledby="problem-title">
      <div className="novaiq-container novaiq-problem-layout">
        <div className="novaiq-problem-pin novaiq-reveal" data-problem-pin>
          <p className="novaiq-eyebrow">Das eigentliche Problem</p>
          <h2 id="problem-title" className="novaiq-problem-line">
            Das Problem ist nicht, dass Unternehmen nichts zu erzählen haben.
            <mark> Das Problem ist, dass niemand es rechtzeitig erkennt.</mark>
          </h2>
        </div>
        <ul className="novaiq-pain-list novaiq-reveal">
          {painPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function SolutionTimeline({ activeProcess }: { activeProcess: number }) {
  return (
    <section id="loesung" className="novaiq-section novaiq-solution" aria-labelledby="solution-title" data-process-section>
      <div className="novaiq-container">
        <div className="novaiq-section-header novaiq-reveal">
          <p className="novaiq-eyebrow">KI Content Planung</p>
          <h2 id="solution-title" className="novaiq-section-title">
            NovaIQ verbindet Alltag, Kalender, Ideen und Freigabe zu einem intelligenten Content-System.
          </h2>
          <p className="novaiq-section-lede">
            Aus Content-Zufall wird ein planbarer Workflow für Social Media Automatisierung,
            Marketing Automation Mittelstand und automatisierte Content-Erstellung.
          </p>
        </div>
        <div className="novaiq-process-shell">
          <div className="novaiq-process-line" data-process-line aria-hidden="true" />
          <div className="novaiq-steps" aria-label="NovaIQ Prozess">
            {processSteps.map((step, index) => (
              <article className={`novaiq-step novaiq-reveal${index === activeProcess ? " is-active" : ""}`} key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="novaiq-process-preview novaiq-reveal" aria-live="polite">
            <span>Dashboard State</span>
            <strong>{processSteps[activeProcess]?.status}</strong>
            <p>{processSteps[activeProcess]?.copy}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductDemoSection({ activeDemo }: { activeDemo: number }) {
  const step = demoSteps[activeDemo] ?? demoSteps[0];

  return (
    <section
      id="produkt-demo"
      className="novaiq-section novaiq-demo"
      aria-labelledby="produkt-demo-title"
      data-demo-section
    >
      <div className="novaiq-container">
        <div className="novaiq-section-header novaiq-reveal">
          <p className="novaiq-eyebrow">Product Demo</p>
          <h2 id="produkt-demo-title" className="novaiq-section-title">
            Sehen Sie, wie aus einem Termin ein fertiger Beitrag wird.
          </h2>
          <p className="novaiq-section-lede">
            NovaIQ erkennt den Kontext, erstellt Content-Ideen, formuliert Vorschläge
            und führt Ihr Team bis zur Freigabe.
          </p>
        </div>

        <div className="novaiq-demo-grid">
          <div className="novaiq-demo-sticky novaiq-reveal" data-demo-visual>
            <figure className="novaiq-demo-card" data-demo-flip>
              <div className="novaiq-demo-toolbar">
                <span>Produktdemo Video · Platzhalter</span>
                <strong>{step.state}</strong>
              </div>
              <div className="novaiq-demo-viewport">
                <Image
                  src={step.image}
                  alt={step.alt}
                  width={1672}
                  height={941}
                  loading="lazy"
                  sizes="(max-width: 700px) 100vw, 52vw"
                  data-demo-flip
                />
                <div className="novaiq-demo-overlay" data-demo-flip>
                  <span>{String(activeDemo + 1).padStart(2, "0")}</span>
                  <strong>{step.title}</strong>
                  <div>
                    {step.preview.map((item) => (
                      <p key={item}>{item}</p>
                    ))}
                  </div>
                </div>
                <span className="novaiq-media-badge">Workflow-Animation Platzhalter</span>
              </div>
              <figcaption>
                Video-Platzhalter mit Posterbild. Später kann hier ein komprimiertes WebM/MP4-Demo
                mit Untertiteln und Kontrollen eingesetzt werden.
              </figcaption>
            </figure>
          </div>

          <div className="novaiq-demo-steps" aria-label="NovaIQ Produktdemo Schritte">
            <div className="novaiq-demo-progress" data-demo-progress aria-hidden="true" />
            {demoSteps.map((item, index) => (
              <article
                className={`novaiq-demo-step novaiq-reveal${index === activeDemo ? " is-active" : ""}`}
                data-demo-step
                key={item.title}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="novaiq-actions novaiq-section-actions">
          <MagneticLink className="novaiq-button-primary" href="#kontakt">NovaIQ für mein Unternehmen prüfen</MagneticLink>
          <MagneticLink className="novaiq-button-secondary" href="#workflow">Workflow ansehen</MagneticLink>
        </div>
      </div>
    </section>
  );
}

function InsideSystemWorkflow() {
  return (
    <section id="workflow" className="novaiq-section novaiq-inside" aria-labelledby="workflow-title">
      <div className="novaiq-container">
        <div className="novaiq-section-header novaiq-reveal">
          <p className="novaiq-eyebrow">Inside NovaIQ</p>
          <h2 id="workflow-title" className="novaiq-section-title">
            Von der Content-Chance zum fertigen Beitrag. Ohne Chaos im Team.
          </h2>
        </div>
        <div className="novaiq-workflow novaiq-reveal" data-workflow aria-label="NovaIQ AI Workflow">
          <div className="novaiq-workflow-core" aria-hidden="true">AI</div>
          <div className="novaiq-workflow-line" data-workflow-line aria-hidden="true" />
          <div className="novaiq-workflow-grid">
            {workflowNodes.map((node, index) => (
              <article className="novaiq-workflow-node" data-workflow-node key={node}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{node}</strong>
              </article>
            ))}
          </div>
        </div>
        <div className="novaiq-actions novaiq-section-actions">
          <MagneticLink className="novaiq-button-secondary" href="#kontakt">Use Case besprechen</MagneticLink>
        </div>
      </div>
    </section>
  );
}

function UseCasesSection() {
  const [activeCase, setActiveCase] = useState(0);
  const caseRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  const changeCase = useCallback(
    async (index: number) => {
      if (index === activeCase) {
        return;
      }
      const root = caseRef.current;
      if (!root || reducedMotion) {
        setActiveCase(index);
        return;
      }

      const [{ gsap }, { Flip }] = await Promise.all([import("gsap"), import("gsap/Flip")]);
      gsap.registerPlugin(Flip);
      const state = Flip.getState(root.querySelectorAll("[data-flip-case]"));
      setActiveCase(index);
      window.requestAnimationFrame(() => {
        Flip.from(state, { duration: 0.46, ease: "power3.out", absolute: false });
      });
    },
    [activeCase, reducedMotion],
  );

  return (
    <section id="usecases" className="novaiq-section novaiq-cases" aria-labelledby="usecases-title">
      <div className="novaiq-container">
        <div className="novaiq-section-header novaiq-reveal">
          <p className="novaiq-eyebrow">Use Cases</p>
          <h2 id="usecases-title" className="novaiq-section-title">
            Gebaut für Unternehmen, die Content nicht mehr dem Zufall überlassen wollen.
          </h2>
        </div>
        <div className="novaiq-case-shell novaiq-reveal" ref={caseRef}>
          <div className="novaiq-case-tabs" role="tablist" aria-label="NovaIQ Use Cases">
            {useCases.map((useCase, index) => (
              <button
                aria-controls="novaiq-case-panel"
                aria-selected={activeCase === index}
                className={activeCase === index ? "is-active" : ""}
                key={useCase.title}
                onClick={() => void changeCase(index)}
                role="tab"
                type="button"
              >
                {useCase.title}
              </button>
            ))}
          </div>
          <article className="novaiq-case-panel" data-flip-case id="novaiq-case-panel" role="tabpanel">
            <span>{useCases[activeCase]?.title}</span>
            <h3>{useCases[activeCase]?.copy}</h3>
            <div className="novaiq-case-preview" data-flip-case aria-label="Use Case Dashboard Preview">
              {useCases[activeCase]?.preview.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function MediaFrame({
  alt,
  caption,
  image,
  label,
  title,
}: {
  alt: string;
  caption: string;
  image: string;
  label: string;
  title: string;
}) {
  return (
    <figure className="novaiq-media-frame">
      <div className="novaiq-media-viewport">
        <Image src={image} alt={alt} width={1672} height={941} loading="lazy" sizes="(max-width: 700px) 100vw, 38vw" />
        <span className="novaiq-media-badge">{label}</span>
      </div>
      <figcaption>
        <strong>{title}</strong>
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}

function TrustSection() {
  return (
    <section id="vertrauen" className="novaiq-section novaiq-trust-section" aria-labelledby="trust-title">
      <div className="novaiq-container">
        <div className="novaiq-trust-hero novaiq-reveal">
          <div>
            <p className="novaiq-eyebrow">Vertrauen</p>
            <h2 id="trust-title" className="novaiq-section-title">
              Vertrauen entsteht nicht durch KI-Versprechen. Sondern durch klare Prozesse.
            </h2>
          </div>
          <ul className="novaiq-proof-chips" aria-label="NovaIQ Proof Chips">
            {proofItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="novaiq-trust-grid">
          {trustBlocks.map(([title, copy]) => (
            <article className="novaiq-trust-card novaiq-reveal" key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>

        <div className="novaiq-actions novaiq-section-actions">
          <MagneticLink className="novaiq-button-primary" href="#kontakt">Beratungsgespräch sichern</MagneticLink>
        </div>
      </div>
    </section>
  );
}

function CaseStudySection() {
  return (
    <section className="novaiq-section novaiq-proof-cases" aria-labelledby="case-study-title">
      <div className="novaiq-container">
        <div className="novaiq-section-header novaiq-reveal">
          <p className="novaiq-eyebrow">Customer Proof</p>
          <h2 id="case-study-title" className="novaiq-section-title">
            Wie NovaIQ Unternehmen im Marketingalltag unterstützt.
          </h2>
          <p className="novaiq-section-lede">
            Die folgenden Karten sind bewusst als Platzhalter markiert, bis echte Kundenstories,
            Logos und Kennzahlen freigegeben sind.
          </p>
        </div>

        <div className="novaiq-case-study-grid">
          {caseStudies.map((item) => (
            <article className="novaiq-case-study-card novaiq-reveal" key={item.title}>
              <MediaFrame
                alt={item.alt}
                caption="Thumbnail-Platzhalter für spätere Kundenstory."
                image={item.image}
                label="Case Video Platzhalter"
                title={item.title}
              />
              <div className="novaiq-case-study-copy">
                <span>{item.tag}</span>
                <h3>{item.title}</h3>
                <p><strong>Problem:</strong> {item.problem}</p>
                <p><strong>NovaIQ Impact:</strong> {item.impact}</p>
                <a href="#kontakt">Demo für Ihren Use Case anfragen</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HumanProofSection() {
  return (
    <section className="novaiq-section novaiq-human-proof" aria-labelledby="human-proof-title">
      <div className="novaiq-container">
        <div className="novaiq-section-header novaiq-reveal">
          <p className="novaiq-eyebrow">Human Trust</p>
          <h2 id="human-proof-title" className="novaiq-section-title">
            Gemacht für Teams, die schneller von der Idee zur Veröffentlichung kommen wollen.
          </h2>
        </div>

        <div className="novaiq-human-grid">
          <article className="novaiq-testimonial-card novaiq-reveal">
            <MediaFrame
              alt="Video Testimonial Platzhalter für NovaIQ"
              caption="Platzhalter für ein späteres Kundenvideo mit Untertiteln."
              image={mediaAssets.controlRoom}
              label="Video Testimonial Platzhalter"
              title="Kundenstimme"
            />
            <blockquote>
              "NovaIQ hilft unserem Team, Content-Ideen schneller zu strukturieren und Freigaben klarer vorzubereiten."
            </blockquote>
            <p>Marketing Lead, B2B-Unternehmen · Platzhalter</p>
          </article>

          <article className="novaiq-founder-card novaiq-reveal">
            <MediaFrame
              alt="Founder Video Platzhalter für NovaIQ"
              caption="30-60 Sekunden Intro: Problem, Produktidee und menschliche Freigabe."
              image={mediaAssets.reviewGate}
              label="Founder Video Platzhalter"
              title="Founder Intro"
            />
            <div>
              <h3>Hinter NovaIQ steht ein klares Ziel: Marketingprozesse einfacher, schneller und planbarer machen.</h3>
              <p>
                NovaIQ ist für Unternehmen gebaut, die bereits Geschichten, Projekte und Expertise haben,
                denen aber ein verlässlicher Content-Prozess fehlt. Die KI bereitet vor, der Mensch gibt frei.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function ComparisonObjectionSection() {
  return (
    <section className="novaiq-section novaiq-comparison" aria-labelledby="comparison-title">
      <div className="novaiq-container">
        <div className="novaiq-section-header novaiq-reveal">
          <p className="novaiq-eyebrow">Vergleich</p>
          <h2 id="comparison-title" className="novaiq-section-title">
            NovaIQ ist kein weiteres KI-Texttool.
          </h2>
        </div>

        <div className="novaiq-comparison-table novaiq-reveal" role="table" aria-label="NovaIQ Vergleich">
          <div role="row">
            <strong role="columnheader">Normales KI-Texttool</strong>
            <strong role="columnheader">NovaIQ</strong>
          </div>
          {comparisonRows.map(([generic, novaiq]) => (
            <div role="row" key={generic}>
              <span role="cell">{generic}</span>
              <span role="cell">{novaiq}</span>
            </div>
          ))}
        </div>

        <div className="novaiq-objections">
          {objections.map(([question, answer]) => (
            <details className="novaiq-reveal" key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnswerEngineSection() {
  return (
    <section className="novaiq-section novaiq-answer-engine" aria-labelledby="answer-engine-title">
      <div className="novaiq-container">
        <div className="novaiq-section-header novaiq-reveal">
          <p className="novaiq-eyebrow">AI Search Ready</p>
          <h2 id="answer-engine-title" className="novaiq-section-title">
            Klare Antworten für Menschen, Google und AI Search.
          </h2>
          <p className="novaiq-section-lede">
            NovaIQ wird konsequent als AI Social Media Agent, KI Marketing Agent und Content Workflow Software
            für Unternehmen beschrieben.
          </p>
        </div>

        <div className="novaiq-answer-grid">
          {answerBlocks.map(([question, answer]) => (
            <article className="novaiq-answer-card novaiq-reveal" key={question}>
              <h3>{question}</h3>
              <p>{answer}</p>
            </article>
          ))}
        </div>

        <div className="novaiq-seo-accordion">
          {seoTopics.map(([topic, answer]) => (
            <details className="novaiq-reveal" key={topic}>
              <summary>{topic}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function GermanySeoSection() {
  return (
    <section className="novaiq-section novaiq-germany" aria-labelledby="germany-title">
      <div className="novaiq-container novaiq-germany-panel novaiq-reveal">
        <div>
          <p className="novaiq-eyebrow">Für Deutschland</p>
          <h2 id="germany-title" className="novaiq-section-title">
            KI-gestützte Content-Prozesse für Unternehmen in Deutschland.
          </h2>
        </div>
        <div>
          <p className="novaiq-section-lede">
            NovaIQ richtet sich an Unternehmen, die ihre Social-Media-Planung professionalisieren möchten:
            vom regionalen Mittelstand bis zum wachsenden B2B-Team.
          </p>
          <p>
            Relevant für Agenturen, Dienstleister, Industrie, Handwerk, Immobilien, Recruiting,
            B2B-Vertrieb und regionale Unternehmen mit wachsendem Marketingbedarf.
          </p>
          <div className="novaiq-actions">
            <MagneticLink className="novaiq-button-secondary" href="#kontakt">Demo anfragen</MagneticLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function LeadFormSection() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <section id="kontakt" className="novaiq-section novaiq-contact" aria-labelledby="contact-title">
      <div className="novaiq-container novaiq-contact-grid">
        <div className="novaiq-reveal">
          <p className="novaiq-eyebrow">Demo anfragen</p>
          <h2 id="contact-title" className="novaiq-section-title">
            Bereit, aus Ihrem Unternehmensalltag ein Content-System zu machen?
          </h2>
          <p className="novaiq-section-lede">
            Lassen Sie uns gemeinsam prüfen, wie NovaIQ Ihre Marketingprozesse automatisieren
            und Ihre Sichtbarkeit planbarer machen kann.
          </p>
          <p className="novaiq-form-microcopy">
            Wir prüfen gemeinsam, ob NovaIQ zu Ihrem Team, Ihren Prozessen und Ihren Marketingzielen passt.
          </p>
          <div className="novaiq-actions">
            <MagneticLink className="novaiq-button-secondary" href="mailto:hello@novaiq.ai">
              Beratungsgespräch sichern
            </MagneticLink>
          </div>
        </div>
        <div className="novaiq-contact-card novaiq-reveal">
          <form className="novaiq-form" aria-label="NovaIQ Demo Formular" onSubmit={onSubmit}>
            <div className="novaiq-form-row">
              <div className="novaiq-field">
                <label htmlFor="novaiq-name">Name</label>
                <input id="novaiq-name" name="name" autoComplete="name" required />
              </div>
              <div className="novaiq-field">
                <label htmlFor="novaiq-company">Unternehmen</label>
                <input id="novaiq-company" name="company" autoComplete="organization" required />
              </div>
            </div>
            <div className="novaiq-form-row">
              <div className="novaiq-field">
                <label htmlFor="novaiq-email">E-Mail</label>
                <input id="novaiq-email" name="email" type="email" autoComplete="email" required />
              </div>
              <div className="novaiq-field">
                <label htmlFor="novaiq-website">Website</label>
                <input id="novaiq-website" name="website" type="url" inputMode="url" placeholder="https://" />
              </div>
            </div>
            <div className="novaiq-form-row">
              <div className="novaiq-field">
                <label htmlFor="novaiq-role">Rolle</label>
                <input id="novaiq-role" name="role" autoComplete="organization-title" />
              </div>
              <div className="novaiq-field">
                <label htmlFor="novaiq-company-size">Unternehmensgröße</label>
                <select id="novaiq-company-size" name="companySize" defaultValue="11-50">
                  <option>1-10</option>
                  <option>11-50</option>
                  <option>51-200</option>
                  <option>201-1000</option>
                  <option>1000+</option>
                </select>
              </div>
            </div>
            <div className="novaiq-field">
              <label htmlFor="novaiq-challenge">Aktuelle Herausforderung</label>
              <select id="novaiq-challenge" name="challenge" defaultValue="Zu wenig regelmäßiger Content">
                <option>Zu wenig regelmäßiger Content</option>
                <option>Zu wenig Zeit im Marketing</option>
                <option>Keine klare Content-Struktur</option>
                <option>Recruiting-Sichtbarkeit verbessern</option>
                <option>Social Media professionalisieren</option>
                <option>KI sinnvoll in Prozesse integrieren</option>
              </select>
            </div>
            <div className="novaiq-field">
              <label htmlFor="novaiq-goal">Ziel</label>
              <select id="novaiq-goal" name="goal" defaultValue="Mehr Content">
                <option>Mehr Content</option>
                <option>Mehr Leads</option>
                <option>Recruiting</option>
                <option>Marketing-Automatisierung</option>
              </select>
            </div>
            <div className="novaiq-field">
              <label htmlFor="novaiq-message">Nachricht</label>
              <textarea id="novaiq-message" name="message" placeholder="Was soll NovaIQ für Ihr Marketing vorbereiten?" />
            </div>
            <MagneticButton>Demo anfragen</MagneticButton>
            <p className="novaiq-form-status" aria-live="polite">
              {submitted ? "Danke. Ihre Demo-Anfrage ist vorbereitet." : ""}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section id="faq" className="novaiq-section novaiq-faq" aria-labelledby="faq-title">
      <div className="novaiq-container novaiq-faq-inner">
        <div className="novaiq-section-header novaiq-reveal">
          <p className="novaiq-eyebrow">FAQ</p>
          <h2 id="faq-title" className="novaiq-section-title">
            Fragen, die vor einer Demo meistens wichtig sind.
          </h2>
        </div>
        <div className="novaiq-faq-list">
          {faqs.map(([question, answer]) => (
            <details className="novaiq-reveal" key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="novaiq-section novaiq-final" aria-labelledby="final-title">
      <div className="novaiq-container novaiq-reveal">
        <h2 id="final-title">
          Content entsteht jeden Tag. NovaIQ sorgt dafür, dass er nicht verloren geht.
        </h2>
        <p>
          Starten Sie mit einem System, das Content-Chancen erkennt, Ideen vorbereitet und Freigaben einfacher macht.
        </p>
        <div className="novaiq-actions">
          <MagneticLink className="novaiq-button-primary" href="#kontakt">Jetzt Demo anfragen</MagneticLink>
        </div>
      </div>
    </section>
  );
}

function CommandNavigation({
  activeId,
  pageProgress,
}: {
  activeId: string;
  pageProgress: number;
}) {
  const activeItem = [...navItems, mobileDockItems[mobileDockItems.length - 1]].find((item) => item.id === activeId) ?? navItems[0];

  return (
    <>
      <header
        className="novaiq-nav"
        aria-label="NovaIQ Navigation"
        style={{ "--novaiq-page-progress": pageProgress } as CSSProperties}
      >
        <div className="novaiq-nav-main">
          <a className="novaiq-brand" href="#top" aria-label="NovaIQ Startseite">
            <span className="novaiq-brand-mark" aria-hidden="true">N</span>
            <span>
              <strong>NovaIQ</strong>
              <small>Content OS</small>
            </span>
          </a>

          <nav className="novaiq-nav-links" aria-label="Hauptnavigation">
            {navItems.map((item) => (
              <a
                aria-current={activeId === item.id ? "page" : undefined}
                className={activeId === item.id ? "is-active" : ""}
                href={item.href}
                key={item.id}
              >
                <span>{item.label}</span>
                <small>{item.meta}</small>
              </a>
            ))}
          </nav>

          <div className="novaiq-nav-status" aria-live="polite">
            <span>Live Section</span>
            <strong>{activeItem.label}</strong>
          </div>

          <a className="novaiq-nav-cta" href="#kontakt">
            Demo prüfen
          </a>
        </div>
        <span className="novaiq-nav-progress" aria-hidden="true" />
      </header>

      <nav className="novaiq-mobile-dock" aria-label="NovaIQ Schnellnavigation">
        {mobileDockItems.map((item) => (
          <a
            aria-current={activeId === item.id ? "page" : undefined}
            className={activeId === item.id ? "is-active" : ""}
            href={item.href}
            key={item.id}
          >
            <span aria-hidden="true" />
            <strong>{item.shortLabel}</strong>
          </a>
        ))}
      </nav>
    </>
  );
}

export function NovaIQLanding() {
  const rootRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();
  const [activeProcess, setActiveProcess] = useState(0);
  const [activeDemo, setActiveDemo] = useState(0);
  const { activeId, pageProgress } = useActiveNavigation(rootRef);

  useLenis(!reducedMotion);
  useMouseParallax(rootRef, reducedMotion);
  useDemoScrollState(rootRef, setActiveDemo);
  useGsapContext(rootRef, reducedMotion, setActiveProcess, setActiveDemo);

  return (
    <main id="main" className="novaiq-page" ref={rootRef}>
      <ShaderBackground reducedMotion={reducedMotion} />
      <div className="novaiq-ambient" aria-hidden="true" />

      <CommandNavigation activeId={activeId} pageProgress={pageProgress} />

      <HeroSection activeProcess={activeProcess} />
      <ProblemSection />
      <SolutionTimeline activeProcess={activeProcess} />
      <ProductDemoSection activeDemo={activeDemo} />
      <InsideSystemWorkflow />
      <UseCasesSection />
      <TrustSection />
      <CaseStudySection />
      <HumanProofSection />
      <ComparisonObjectionSection />
      <AnswerEngineSection />
      <GermanySeoSection />
      <LeadFormSection />
      <FAQSection />
      <FinalCTA />

      <footer className="novaiq-footer">
        <div className="novaiq-container">
          <span>NovaIQ · AI Agent für Marketing</span>
          <a href="#top">Zurück nach oben</a>
        </div>
      </footer>
    </main>
  );
}
