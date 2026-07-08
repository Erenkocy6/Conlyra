import type { Metadata } from "next";
import Image from "next/image";
import { AwwwardsDirector } from "@/components/AwwwardsDirector";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SubpageKineticShowcase } from "@/components/SubpageKineticShowcase";

export const metadata: Metadata = {
  title: "Pilot",
  description:
    "Starten Sie einen NovaIQ Pilot mit Source Map, Brand Memory, Review Room und ersten kanalgenauen Drafts.",
};

const pilotPlan = [
  {
    day: "Tag 01",
    title: "Source Intake",
    copy: "Wir sammeln echte Fotos, Clips, Notizen, Kundenfragen und Produktmomente aus Ihrem Alltag.",
  },
  {
    day: "Tag 02-03",
    title: "Brand Memory",
    copy: "Wir definieren Tonalität, No-Gos, Zielgruppen, Freigaberollen und Beispiele.",
  },
  {
    day: "Tag 04-05",
    title: "Route Building",
    copy: "NovaIQ übersetzt die Quellen in kanalgenaue Drafts mit sichtbarer Begründung.",
  },
  {
    day: "Tag 06-07",
    title: "Review Room",
    copy: "Ihr Team kommentiert, prüft und entscheidet direkt am Draft. Keine Blackbox.",
  },
];

const deliverables = [
  ["Source Map", "Welche Momente in Ihrem Unternehmen regelmäßig Content-Potenzial haben."],
  ["Brand Memory", "Tonalität, No-Gos, Zielgruppen, Fachbegriffe und Beispielposts."],
  ["Draft Set", "Erste kanalgenaue Varianten für LinkedIn, Instagram und Facebook."],
  ["Review Flow", "Ein sichtbarer Ablauf für Kommentare, Freigabe und gesperrte Queue."],
];

const pilotKinetic = [
  {
    label: "Day 01",
    title: "Echte Quellen statt Dummy-Demo.",
    copy: "Wir sammeln Material aus Alltag, Sales, Produkt und Team, damit der Pilot Reibung zeigt.",
    image: "/media/novaiq-capture-wall.png",
  },
  {
    label: "Day 04",
    title: "Der erste Draft geht ins Gate.",
    copy: "Stakeholder prüfen Ton, Risiko und Kanalrichtung an einem echten Beitrag.",
    image: "/media/novaiq-review-gate.png",
  },
  {
    label: "Day 07",
    title: "Die Queue zeigt, ob es trägt.",
    copy: "Am Ende steht kein Screenshot, sondern ein testbarer Ablauf mit Freigabe.",
    image: "/media/novaiq-output-queue.png",
  },
];

export default function PilotPage() {
  return (
    <>
      <AwwwardsDirector />
      <SiteHeader />
      <main id="main" className="subpage-main">
        <section id="top" className="subpage-hero" aria-labelledby="pilot-page-title">
          <Image
            src="/media/novaiq-output-queue.png"
            alt="NovaIQ Output Queue mit gesperrten Beiträgen"
            fill
            priority
            sizes="100vw"
            className="subpage-hero__image"
          />
          <div className="subpage-hero__shade" aria-hidden="true" />
          <div className="section-inner subpage-hero__content">
            <div className="subpage-hero__copy" data-reveal>
              <p className="eyebrow">Pilot</p>
              <h1 id="pilot-page-title">
                In sieben Tagen sehen Sie, ob NovaIQ in Ihrem Alltag trägt.
              </h1>
              <p>
                Kein theoretischer Demo-Call. Wir arbeiten mit Ihren echten
                Quellen, bauen eine erste Content-Route und testen das Review
                Gate mit den Menschen, die später wirklich freigeben.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="mailto:hello@novaiq.ai">
                  hello@novaiq.ai
                </a>
                <a className="button button-secondary" href="/produkt">
                  Produkt ansehen
                </a>
              </div>
            </div>

            <aside className="subpage-command" data-reveal data-tilt-card>
              <div className="subpage-command__topbar">
                <span>Pilot Scope</span>
                <strong>7 Tage</strong>
              </div>
              <div className="pilot-scope">
                <div>
                  <strong>15+</strong>
                  <span>Quellen</span>
                </div>
                <div>
                  <strong>3</strong>
                  <span>Kanäle</span>
                </div>
                <div>
                  <strong>1</strong>
                  <span>Review Room</span>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <SubpageKineticShowcase
          eyebrow="Pilot Motion"
          title="Sie sehen den Workflow, bevor Sie sich entscheiden."
          items={pilotKinetic}
        />

        <section className="page-section page-section--light" aria-labelledby="pilot-plan-title">
          <div className="section-inner">
            <div className="section-heading" data-reveal>
              <p className="eyebrow">Pilot Ablauf</p>
              <h2 id="pilot-plan-title">
                Ein kurzer Sprint, aber mit echtem{" "}
                <span className="type-contrast">Material.</span>
              </h2>
              <p>
                Wir bauen keinen hübschen Dummy. Der Pilot zeigt, ob NovaIQ Ihre
                Quellen, Ihre Stimme und Ihre Freigabewege wirklich tragen kann.
              </p>
            </div>
            <div className="pilot-timeline">
              {pilotPlan.map((item) => (
                <article key={item.day} data-reveal>
                  <span>{item.day}</span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section page-section--dark" aria-labelledby="deliverables-title">
          <div className="section-inner page-section__split">
            <div className="large-product-frame" data-reveal data-tilt-card>
              <Image
                src="/media/novaiq-control-room-hero.png"
                alt="NovaIQ Pilot Control Room"
                fill
                sizes="(min-width: 1040px) 54vw, 100vw"
              />
            </div>
            <div className="section-heading" data-reveal>
              <p className="eyebrow">Was am Ende steht</p>
              <h2 id="deliverables-title">
                Ihr erster Content-Betrieb, nicht nur ein Screenshot.
              </h2>
              <div className="deliverable-list">
                {deliverables.map(([title, copy]) => (
                  <article key={title}>
                    <span>{title}</span>
                    <p>{copy}</p>
                  </article>
                ))}
              </div>
              <a className="button button-secondary" href="mailto:hello@novaiq.ai">
                Pilot anfragen
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
