import Image from "next/image";

export type StickyProductStep = {
  step: string;
  label: string;
  title: string;
  copy: string;
  signal: string;
  image: string;
  videoSrc?: string;
  mobileVideoSrc?: string;
  poster?: string;
};

type StickyProductSequenceProps = {
  steps: StickyProductStep[];
};

export function StickyProductSequence({ steps }: StickyProductSequenceProps) {
  const firstStep = steps[0];

  return (
    <section
      id="product-sequence"
      className="sticky-product"
      data-sticky-product
      aria-labelledby="product-sequence-title"
    >
      <div className="section-inner sticky-product__layout">
        <div
          className="sticky-product__stage"
          data-sticky-product-stage
          data-reveal
          data-cursor-label="scroll flow"
          aria-label="NovaIQ Produktsequenz"
        >
          <div className="sticky-product__topbar">
            <span>Product sequence</span>
            <strong data-sticky-product-status>{firstStep?.signal}</strong>
          </div>

          <div className="sticky-product__media">
            {steps.map((item, index) => (
              <div
                key={item.step}
                className={`sticky-product__visual${index === 0 ? " is-active" : ""}`}
                data-sticky-product-media
              >
                {item.videoSrc ? (
                  <video
                    className="sticky-product__video"
                    data-sticky-product-video
                    muted
                    loop
                    playsInline
                    preload="none"
                    poster={item.poster}
                    aria-hidden="true"
                  >
                    {item.mobileVideoSrc ? (
                      <source
                        media="(max-width: 767px)"
                        src={item.mobileVideoSrc}
                        type="video/mp4"
                      />
                    ) : null}
                    <source src={item.videoSrc} type="video/mp4" />
                  </video>
                ) : null}
                <Image
                  src={item.image}
                  alt={`${item.label} im NovaIQ Produktflow`}
                  fill
                  sizes="(min-width: 1040px) 48vw, 100vw"
                  className="sticky-product__image"
                />
              </div>
            ))}
            <div className="sticky-product__scan" aria-hidden="true" />
          </div>

          <div className="sticky-product__console">
            <div>
              <span>Active gate</span>
              <strong data-sticky-product-headline>{firstStep?.title}</strong>
            </div>
            <i aria-hidden="true">
              <span data-sticky-product-progress />
            </i>
          </div>

          <div className="sticky-product__nodes" aria-hidden="true">
            {steps.map((item, index) => (
              <span
                key={item.step}
                className={index === 0 ? "is-active" : undefined}
                data-sticky-product-node
              >
                {item.step}
              </span>
            ))}
          </div>

          <div className="sticky-product__micro" aria-label="NovaIQ Live Checks">
            {["Source", "Brand", "Review", "Queue"].map((item, index) => (
              <article
                key={item}
                className={index === 0 ? "is-active" : undefined}
                data-sticky-product-micro
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item}</strong>
              </article>
            ))}
          </div>
        </div>

        <div className="sticky-product__copy">
          <div className="section-heading" data-reveal>
            <p className="eyebrow">Product Demo</p>
            <h2 id="product-sequence-title">
              Eine Demo, die beim Scrollen{" "}
              <span className="type-contrast">arbeitet.</span>
            </h2>
            <p>
              Die Produktstory bleibt sticky, während rechts die Schritte
              wechseln. So fühlt sich NovaIQ mehr wie ein echter Workspace als
              wie eine Sammlung einzelner Screens an.
            </p>
          </div>

          <div className="sticky-product__steps">
            {steps.map((item, index) => (
              <article
                key={item.step}
                className={index === 0 ? "is-active" : undefined}
                data-sticky-product-step
                data-product-signal={item.signal}
                data-product-title={item.title}
                data-cursor-label={`step ${item.step}`}
                data-inspect-title={item.title}
                data-inspect-meta={item.label}
                data-inspect-status={item.signal}
              >
                <span>{item.step}</span>
                <p className="eyebrow">{item.label}</p>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <strong>{item.signal}</strong>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
