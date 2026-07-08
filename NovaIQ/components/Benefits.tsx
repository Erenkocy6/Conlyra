import { benefits } from "@/data/landing";
import { RevealText } from "@/components/RevealText";

export function Benefits() {
  return (
    <section
      className="section-pad relative overflow-hidden"
      aria-labelledby="benefits-title"
    >
      <div className="container-page">
        <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <div>
            <RevealText as="p" className="eyebrow mb-5 text-signal">
              Warum es zählt
            </RevealText>
            <RevealText
              as="h2"
              id="benefits-title"
              className="section-title max-w-3xl text-paper"
            >
              Mehr Output aus dem, was längst da ist.
            </RevealText>
          </div>
          <p className="max-w-md text-lg leading-8 text-paper/62">
            NovaIQ ersetzt nicht das Marketingteam. Es nimmt ihm die leere Seite
            und das Sortieren ab.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {benefits.map((benefit) => (
            <article
              key={benefit.title}
              className="content-card relative min-h-[18rem] overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.045] p-6"
            >
              <div className="absolute right-0 top-0 h-32 w-32 border-b border-l border-white/10">
                <svg
                  viewBox="0 0 128 128"
                  className="h-full w-full text-paper/20"
                  aria-hidden="true"
                >
                  <path
                    d="M18 104 C42 56 74 86 110 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M30 28 H98 M30 48 H72 M30 68 H88"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                </svg>
              </div>
              <p className="text-sm font-bold text-acid">{benefit.value}</p>
              <h3 className="mt-16 max-w-sm text-2xl font-semibold leading-tight text-paper">
                {benefit.title}
              </h3>
              <p className="mt-5 max-w-sm text-base leading-7 text-paper/58">
                {benefit.copy}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
