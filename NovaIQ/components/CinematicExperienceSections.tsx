import Image from "next/image";
import Link from "next/link";

const choices = [
  {
    label: "Before",
    title: "Content Chaos",
    copy: "Momente liegen in Chats, Kamerarollen und Notizen. Der Kalender bleibt leer.",
    image: "/media/novaiq-capture-wall.png",
  },
  {
    label: "After",
    title: "Control Room",
    copy: "Quelle, Route, Review und Queue werden zu einem sichtbaren Betriebsablauf.",
    image: "/media/novaiq-control-room-hero.png",
  },
];

const readingWords =
  "Aus Momenten wird ein freigegebener Content Flow mit Quelle Review Gate und klarem Output".split(
    " ",
  );

const hallItems = [
  {
    label: "Case 01",
    title: "Source Wall",
    meta: "Capture / Context",
    image: "/media/novaiq-capture-wall.png",
  },
  {
    label: "Case 02",
    title: "Route Map",
    meta: "Narrative / Channel",
    image: "/media/novaiq-control-room-hero.png",
  },
  {
    label: "Case 03",
    title: "Review Gate",
    meta: "Stakeholder / Risk",
    image: "/media/novaiq-review-gate.png",
  },
  {
    label: "Case 04",
    title: "Locked Queue",
    meta: "Timing / Approval",
    image: "/media/novaiq-output-queue.png",
  },
];

const mediaWall = [
  ["/media/novaiq-capture-wall.png", "Source"],
  ["/media/novaiq-review-gate.png", "Review"],
  ["/media/novaiq-control-room-hero.png", "Route"],
  ["/media/novaiq-output-queue.png", "Queue"],
  ["/media/novaiq-capture-wall.png", "Signal"],
  ["/media/novaiq-review-gate.png", "Gate"],
];

export function CinematicExperienceSections() {
  return (
    <>
      <section className="nova-choice" aria-labelledby="nova-choice-title">
        <div className="section-inner nova-choice__top" data-reveal>
          <p className="eyebrow">Split Choice</p>
          <h2 id="nova-choice-title">
            Weg vom Zufall. Hin zum <span className="type-contrast">System.</span>
          </h2>
        </div>
        <div className="nova-choice__grid">
          {choices.map((choice) => (
            <article
              className="nova-choice-card"
              data-cursor-label="explore"
              data-reveal
              data-tilt-card
              key={choice.title}
            >
              <Image src={choice.image} alt="" fill sizes="(min-width: 1040px) 50vw, 100vw" />
              <div>
                <span>{choice.label}</span>
                <h3>{choice.title}</h3>
                <p>{choice.copy}</p>
              </div>
              <i aria-hidden="true">+</i>
            </article>
          ))}
        </div>
      </section>

      <section className="nova-reading" aria-labelledby="nova-reading-title">
        <div className="section-inner nova-reading__layout">
          <div className="nova-reading__text" data-reveal>
            <p className="eyebrow">Scroll Story</p>
            <h2 id="nova-reading-title" aria-label={readingWords.join(" ")}>
              {readingWords.map((word, index) => (
                <span data-reading-word key={`${word}-${index}`}>
                  {word}
                </span>
              ))}
            </h2>
          </div>
          <div className="nova-reading__media" aria-hidden="true">
            {[
              "/media/novaiq-capture-wall.png",
              "/media/novaiq-review-gate.png",
              "/media/novaiq-output-queue.png",
            ].map((src, index) => (
              <div className={`nova-reading__float nova-reading__float--${index + 1}`} key={src}>
                <Image src={src} alt="" fill sizes="18rem" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="nova-hall" aria-labelledby="nova-hall-title">
        <div className="section-inner nova-hall__top" data-reveal>
          <p className="eyebrow">Hall of Systems</p>
          <h2 id="nova-hall-title">
            Die wichtigsten Module bekommen eigene Trophäen.
          </h2>
        </div>
        <div className="section-inner nova-hall__grid">
          {hallItems.map((item) => (
            <article
              className="nova-hall-card"
              data-cursor-label="view"
              data-reveal
              data-tilt-card
              key={item.title}
            >
              <div className="nova-hall-card__media">
                <Image src={item.image} alt="" fill sizes="(min-width: 1040px) 25vw, 90vw" />
              </div>
              <span>{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.meta}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="nova-media-wall" aria-labelledby="nova-media-wall-title">
        <div className="section-inner nova-media-wall__top" data-reveal>
          <p className="eyebrow">Media Wall</p>
          <h2 id="nova-media-wall-title">Mehr Bewegung. Weniger Erklärung.</h2>
          <Link className="button button-primary" href="/pilot" data-cursor-label="open">
            Pilot starten
          </Link>
        </div>
        <div className="nova-media-wall__grid" aria-label="NovaIQ Media Tiles">
          {mediaWall.map(([src, label], index) => (
            <article
              className={`nova-media-tile nova-media-tile--${(index % 3) + 1}`}
              data-cursor-label="view"
              data-reveal
              key={`${src}-${label}-${index}`}
            >
              <Image src={src} alt="" fill sizes="(min-width: 1040px) 18vw, 44vw" />
              <span>{label}</span>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
