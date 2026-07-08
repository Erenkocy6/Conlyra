type ScrollFilmScene = {
  eyebrow: string;
  label: string;
  title: string;
  src: string;
  mobileSrc?: string;
  poster: string;
  source: string;
};

type ScrollFilmChapter = {
  step: string;
  title: string;
  copy: string;
};

type ScrollFilmSectionProps = {
  scene: ScrollFilmScene;
  chapters: ScrollFilmChapter[];
};

export function ScrollFilmSection({ scene, chapters }: ScrollFilmSectionProps) {
  const firstChapter = chapters[0];

  return (
    <section
      id="signal-film"
      className="scroll-film"
      data-scroll-film
      data-chapter-section="Signal Film"
      aria-labelledby="scroll-film-title"
    >
      <div className="scroll-film__pin">
        <video
          className="scroll-film__video"
          data-scroll-film-video
          muted
          playsInline
          preload="metadata"
          poster={scene.poster}
          aria-label={scene.title}
        >
          {scene.mobileSrc ? (
            <source media="(max-width: 767px)" src={scene.mobileSrc} type="video/mp4" />
          ) : null}
          <source src={scene.src} type="video/mp4" />
        </video>

        <div className="scroll-film__shade" aria-hidden="true" />
        <div className="scroll-film__grain" aria-hidden="true" />

        <div className="section-inner scroll-film__content">
          <div className="scroll-film__copy" data-reveal>
            <p className="eyebrow">{scene.eyebrow}</p>
            <h2 id="scroll-film-title">
              Scroll <span className="type-contrast">Film.</span>
            </h2>
            <p>
              Stoppt der Scroll, stoppt das Bild. Der Content-Flow wird
              körperlich erfahrbar.
            </p>
          </div>

          <div className="scroll-film__status" aria-live="polite">
            <span>Scroll-to-play</span>
            <strong data-scroll-film-status>{firstChapter?.title}</strong>
            <i aria-hidden="true">
              <span data-scroll-film-playhead />
            </i>
          </div>

          <div className="scroll-film__word" aria-hidden="true">
            <span>Signal</span>
            <span>Film</span>
          </div>

          <div className="scroll-film__chapters" aria-label="Signal Film Kapitel">
            {chapters.map((chapter, index) => (
              <article
                key={chapter.step}
                className={index === 0 ? "is-active" : undefined}
                data-scroll-film-step
                data-scroll-film-title={chapter.title}
                data-cursor-label={`film ${chapter.step}`}
                data-inspect-title={chapter.title}
                data-inspect-meta="Scroll Film"
                data-inspect-status={chapter.copy}
              >
                <span>{chapter.step}</span>
                <strong>{chapter.title}</strong>
                <p>{chapter.copy}</p>
              </article>
            ))}
          </div>

          <div className="scroll-film__source">
            <span>{scene.label}</span>
            <strong>{scene.source}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
