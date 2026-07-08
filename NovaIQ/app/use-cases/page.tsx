import type { Metadata } from "next";
import Image from "next/image";
import { AwwwardsDirector } from "@/components/AwwwardsDirector";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SubpageKineticShowcase } from "@/components/SubpageKineticShowcase";

export const metadata: Metadata = {
  title: "Use Cases",
  description:
    "NovaIQ Use Cases für B2B SaaS, Industrie, Agenturen, Beratung, Education und Event-Teams.",
};

const useCases = [
  {
    team: "B2B SaaS",
    title: "Produktupdates werden zu Launch-Narrativen.",
    copy: "Release Notes, Roadmap-Momente und Customer Success Signale werden zu Kanälen, Hooks und Review-Routen.",
    proof: "Product + GTM",
  },
  {
    team: "Industrie",
    title: "Projektfortschritt wird sichtbar, ohne Fachlichkeit zu verlieren.",
    copy: "Baustellen, Maschinen, Messen und Kundenbesuche werden mit technischer Präzision in Content übersetzt.",
    proof: "Sales + Marketing",
  },
  {
    team: "Agenturen",
    title: "Case-Material bleibt nicht im Projektordner hängen.",
    copy: "Workshops, Kundenzitate und Kampagnenbeweise werden in wiederverwendbare Storylines verwandelt.",
    proof: "Client Teams",
  },
  {
    team: "Education",
    title: "Events und Alumni-Stimmen werden zu Kampagnen.",
    copy: "Vorträge, Seminare, Partnerformate und Lernmomente bekommen eine wiederholbare Content-Route.",
    proof: "Comms + Brand",
  },
];

const moments = [
  ["Messegespräch", "Aus einer Kundenfrage entsteht ein fachlicher LinkedIn-Post."],
  ["Produktdemo", "Ein Feature-Clip wird zu Carousel, Reel und Sales Enablement Snippet."],
  ["Workshop", "Whiteboard, Zitat und Ergebnis werden als Thought-Leadership Route gesichert."],
  ["Kundenbesuch", "Foto, O-Ton und Projektkontext werden reviewfähig aufbereitet."],
  ["Founder Note", "Eine interne Beobachtung wird zu Haltung mit Brand Guardrails."],
];

const useCaseKinetic = [
  {
    label: "B2B SaaS",
    title: "Roadmap wird Narrativ.",
    copy: "Produktmomente werden nicht gepostet, sie werden begründet, geroutet und freigegeben.",
    image: "/media/novaiq-control-room-hero.png",
  },
  {
    label: "Industrie",
    title: "Fachlichkeit bleibt im Bild.",
    copy: "Projektfortschritt, Maschine und Kundensignal werden zu Content mit Kontext.",
    image: "/media/novaiq-capture-wall.png",
  },
  {
    label: "Agentur",
    title: "Case-Material bekommt zweite Luft.",
    copy: "Workshop-Output, Zitate und Ergebnisse werden als wiederverwendbare Storyline gesichert.",
    image: "/media/novaiq-review-gate.png",
  },
];

export default function UseCasesPage() {
  return (
    <>
      <AwwwardsDirector />
      <SiteHeader />
      <main id="main" className="subpage-main">
        <section id="top" className="subpage-hero" aria-labelledby="use-cases-title">
          <Image
            src="/media/novaiq-capture-wall.png"
            alt="NovaIQ Source Wall mit vielen Content-Momenten"
            fill
            priority
            sizes="100vw"
            className="subpage-hero__image"
          />
          <div className="subpage-hero__shade" aria-hidden="true" />
          <div className="section-inner subpage-hero__content">
            <div className="subpage-hero__copy" data-reveal>
              <p className="eyebrow">Use Cases</p>
              <h1 id="use-cases-title">
                Für Teams, die genug Momente haben, aber zu wenig System.
              </h1>
              <p>
                NovaIQ ist für B2B-Organisationen gebaut, in denen Content aus
                echten Quellen entsteht und trotzdem durch Rollen, Fachlichkeit
                und Freigabewege muss.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="/pilot">
                  Pilot starten
                </a>
                <a className="button button-secondary" href="/produkt">
                  Produkt ansehen
                </a>
              </div>
            </div>

            <aside className="subpage-command" data-reveal data-tilt-card>
              <div className="subpage-command__topbar">
                <span>Use Case Radar</span>
                <strong>5 Signale</strong>
              </div>
              <div className="subpage-command__rows">
                {moments.slice(0, 4).map(([title, copy]) => (
                  <article key={title}>
                    <span>{title}</span>
                    <p>{copy}</p>
                  </article>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <SubpageKineticShowcase
          eyebrow="Use Case Motion"
          title="Jeder Markt bekommt sein eigenes Bildtempo."
          items={useCaseKinetic}
        />

        <section className="page-section page-section--light" aria-labelledby="matrix-title">
          <div className="section-inner">
            <div className="section-heading" data-reveal>
              <p className="eyebrow">Use Case Matrix</p>
              <h2 id="matrix-title">
                Unterschiedliche Teams. Derselbe Engpass:{" "}
                <span className="type-contrast">Freigabe.</span>
              </h2>
              <p>
                Die Rohmomente unterscheiden sich. Das Muster bleibt gleich:
                Content braucht Kontext, Route und menschliche Entscheidung.
              </p>
            </div>
            <div className="page-grid page-grid--four">
              {useCases.map((item) => (
                <article className="page-card page-card--tall" key={item.team} data-reveal>
                  <span>{item.proof}</span>
                  <h3>{item.team}</h3>
                  <strong>{item.title}</strong>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section page-section--dark" aria-labelledby="moment-title">
          <div className="section-inner page-section__split">
            <div className="section-heading" data-reveal>
              <p className="eyebrow">Moment Library</p>
              <h2 id="moment-title">
                Die besten Content-Ideen sind schon im Unternehmen.
              </h2>
              <p>
                NovaIQ fängt sie ab, bevor sie in Chatverläufen, Kamerarollen
                und Meeting-Notizen verschwinden.
              </p>
            </div>
            <div className="module-strip module-strip--dark" aria-label="Content Momente">
              {moments.map(([title, copy]) => (
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
