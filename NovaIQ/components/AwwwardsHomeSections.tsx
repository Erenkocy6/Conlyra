import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

const frameDeck = [
  {
    label: "01 / Capture",
    title: "Material bekommt Schwerkraft.",
    image: "/media/novaiq-capture-wall.png",
  },
  {
    label: "02 / Review",
    title: "Entscheidungen bleiben am Draft.",
    image: "/media/novaiq-review-gate.png",
  },
  {
    label: "03 / Queue",
    title: "Output bleibt kontrolliert.",
    image: "/media/novaiq-output-queue.png",
  },
];

const launchpad = [
  {
    href: "/produkt",
    label: "Produkt",
    title: "Control Room öffnen",
    image: "/media/novaiq-control-room-hero.png",
  },
  {
    href: "/use-cases",
    label: "Use Cases",
    title: "Momente nach Team lesen",
    image: "/media/novaiq-capture-wall.png",
  },
  {
    href: "/pilot",
    label: "Pilot",
    title: "Mit echten Quellen testen",
    image: "/media/novaiq-output-queue.png",
  },
];

export function AwwwardsHomeSections() {
  return (
    <>
      <section className="director-section" aria-labelledby="director-title">
        <div className="section-inner director-layout">
          <div className="section-heading director-heading" data-reveal>
            <p className="eyebrow">Art Direction</p>
            <h2 id="director-title">
              Die Seite muss sich wie ein{" "}
              <span className="type-contrast">laufendes System</span> anfühlen.
            </h2>
            <p>
              Mehr Bild, mehr Bewegung, weniger Baukasten. Jede Section bekommt
              eine Aufgabe: Spannung aufbauen, Route zeigen, Entscheidung
              sichtbar machen.
            </p>
          </div>

          <div className="director-board" aria-label="NovaIQ Bildregie">
            {frameDeck.map((frame, index) => (
              <article
                className="director-frame"
                data-reveal
                data-tilt-card
                key={frame.label}
                style={{ "--frame-index": index } as CSSProperties}
              >
                <Image src={frame.image} alt="" fill sizes="(min-width: 1040px) 34vw, 90vw" />
                <div>
                  <span>{frame.label}</span>
                  <strong>{frame.title}</strong>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="launchpad-section" aria-labelledby="launchpad-title">
        <div className="section-inner launchpad-top" data-reveal>
          <p className="eyebrow">Unterseiten</p>
          <h2 id="launchpad-title">
            Produkt, Use Cases und Pilot werden eigene Bühnen.
          </h2>
        </div>

        <div className="launchpad-strip" aria-label="NovaIQ Unterseiten">
          {launchpad.map((item) => (
            <Link className="launchpad-card" href={item.href} key={item.href} data-reveal>
              <Image src={item.image} alt="" fill sizes="(min-width: 1040px) 34vw, 92vw" />
              <span>{item.label}</span>
              <strong>{item.title}</strong>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
