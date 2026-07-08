import type { Metadata } from "next";
import Image from "next/image";
import { AwwwardsDirector } from "@/components/AwwwardsDirector";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SubpageKineticShowcase } from "@/components/SubpageKineticShowcase";

export const metadata: Metadata = {
  title: "Produkt",
  description:
    "Der NovaIQ Content Control Room verbindet Source Wall, Draft Engine, Review Room und gesperrte Output Queue.",
};

const productPillars = [
  {
    label: "Source Wall",
    title: "Material wird sortiert, bevor es verloren geht.",
    copy: "Fotos, Clips, O-Töne und Notizen bekommen Quelle, Anlass, Risiko und Zielgruppe.",
  },
  {
    label: "Draft Engine",
    title: "Ein Moment wird zu mehreren kanalgenauen Routen.",
    copy: "LinkedIn, Instagram und Facebook erhalten eigene Hooks, Beweise und CTAs.",
  },
  {
    label: "Review Room",
    title: "Freigabe passiert mit Kontext, nicht per Chat-Nachricht.",
    copy: "Stakeholder kommentieren direkt am Draft. Brand Memory und No-Gos bleiben sichtbar.",
  },
  {
    label: "Output Queue",
    title: "Planung ist vorbereitet. Veröffentlichung bleibt menschlich.",
    copy: "NovaIQ zeigt Status, Varianten und Timing, ohne automatisch zu posten.",
  },
];

const interfaceRows = [
  ["09:12", "Messefoto erkannt", "3 Content-Routen"],
  ["10:35", "Kundenfrage markiert", "LinkedIn Hook"],
  ["14:20", "Teamclip hochgeladen", "Carousel Draft"],
  ["16:05", "Founder Note ergänzt", "Review offen"],
];

const modules = [
  ["Capture", "Quellen aufnehmen, clustern und mit Kampagnenkontext verbinden."],
  ["Memory", "Brand Voice, No-Gos, Zielgruppen und Beispiele dauerhaft verfügbar halten."],
  ["Draft", "Varianten nach Kanal, Ziel und Tonalität erzeugen."],
  ["Review", "Kommentare, Rollen und Entscheidungen am Draft halten."],
  ["Queue", "Freigegebene Beiträge sichtbar planen, ohne Auto-Publish."],
];

const productKinetic = [
  {
    label: "Source Wall",
    title: "Jede Idee startet mit Herkunft.",
    copy: "Bilder, Clips und O-Töne bleiben sichtbar mit Anlass, Kontext und Zielgruppe.",
    image: "/media/novaiq-capture-wall.png",
  },
  {
    label: "Review Gate",
    title: "Entscheidung passiert direkt am Draft.",
    copy: "Freigaben, Kommentare und No-Gos wirken wie ein Interface, nicht wie ein Chat-Anhang.",
    image: "/media/novaiq-review-gate.png",
  },
  {
    label: "Locked Queue",
    title: "Planung bleibt kontrolliert.",
    copy: "Die Queue zeigt Varianten und Timing, aber kein Beitrag verlässt das System automatisch.",
    image: "/media/novaiq-output-queue.png",
  },
];

export default function ProductPage() {
  return (
    <>
      <AwwwardsDirector />
      <SiteHeader />
      <main id="main" className="subpage-main">
        <section id="top" className="subpage-hero" aria-labelledby="product-page-title">
          <Image
            src="/media/novaiq-control-room-hero.png"
            alt="NovaIQ Produktoberfläche mit Source Wall, Review Room und Queue"
            fill
            priority
            sizes="100vw"
            className="subpage-hero__image"
          />
          <div className="subpage-hero__shade" aria-hidden="true" />
          <div className="section-inner subpage-hero__content">
            <div className="subpage-hero__copy" data-reveal>
              <p className="eyebrow">Produkt</p>
              <h1 id="product-page-title">
                Der Control Room für Content, der durch Teams muss.
              </h1>
              <p>
                NovaIQ macht aus Unternehmensmomenten eine nachvollziehbare
                Route: Quelle sichern, Kontext lesen, Draft erzeugen, Review
                sichtbar halten und Output gesperrt planen.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="/pilot">
                  Pilot starten
                </a>
                <a className="button button-secondary" href="/use-cases">
                  Use Cases ansehen
                </a>
              </div>
            </div>

            <aside className="subpage-command" data-reveal data-tilt-card>
              <div className="subpage-command__topbar">
                <span>Control Room</span>
                <strong>Live</strong>
              </div>
              <div className="subpage-command__rows">
                {interfaceRows.map(([time, event, result]) => (
                  <article key={event}>
                    <span>{time}</span>
                    <p>{event}</p>
                    <strong>{result}</strong>
                  </article>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <SubpageKineticShowcase
          eyebrow="Product Motion"
          title="Das Produkt muss wie ein Raum wirken, nicht wie eine Feature-Liste."
          items={productKinetic}
        />

        <section className="page-section page-section--light" aria-labelledby="pillars-title">
          <div className="section-inner page-section__split">
            <div className="section-heading" data-reveal>
              <p className="eyebrow">Produktmodule</p>
              <h2 id="pillars-title">
                Nicht mehr Tool-Sammlung. Ein{" "}
                <span className="type-contrast">Arbeitsraum.</span>
              </h2>
              <p>
                Die Module greifen ineinander, damit Content nicht zwischen
                Ablage, Chat, KI-Tab und Freigabe-Mail zerfällt.
              </p>
            </div>
            <div className="page-grid page-grid--two">
              {productPillars.map((pillar) => (
                <article className="page-card" key={pillar.label} data-reveal>
                  <span>{pillar.label}</span>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section page-section--dark" aria-labelledby="interface-title">
          <div className="section-inner product-showcase">
            <div className="large-product-frame" data-reveal data-tilt-card>
              <Image
                src="/media/novaiq-review-gate.png"
                alt="NovaIQ Review Gate Interface"
                fill
                sizes="(min-width: 1040px) 54vw, 100vw"
              />
            </div>
            <div className="section-heading" data-reveal>
              <p className="eyebrow">Interface</p>
              <h2 id="interface-title">
                Man sieht jederzeit, warum ein Beitrag existiert.
              </h2>
              <p>
                Jeder Draft zeigt Quelle, Brand-Kontext, Reviewer, Risiko und
                nächsten Schritt. Genau dort entsteht Vertrauen in KI-Workflows.
              </p>
              <a className="button button-secondary" href="/pilot">
                Workflow testen
              </a>
            </div>
          </div>
        </section>

        <section className="page-section page-section--light" aria-labelledby="modules-title">
          <div className="section-inner">
            <div className="section-heading" data-reveal>
              <p className="eyebrow">System Map</p>
              <h2 id="modules-title">
                Fünf Module, ein sauberer Content-Betrieb.
              </h2>
            </div>
            <div className="module-strip" aria-label="NovaIQ Module">
              {modules.map(([title, copy]) => (
                <article className="module-card" key={title} data-reveal>
                  <span>{title}</span>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
