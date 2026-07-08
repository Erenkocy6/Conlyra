import { feedTransform } from "@/data/landing";
import { RevealText } from "@/components/RevealText";

export function FeedTransformation() {
  return (
    <section
      id="feed"
      className="section-pad relative overflow-hidden bg-[linear-gradient(180deg,rgba(17,24,39,0.38),rgba(7,8,13,0.78))]"
      aria-labelledby="feed-title"
    >
      <div className="nova-orb left-[-10rem] top-20 size-80 bg-violet/14" />
      <div className="container-page">
        <div className="mx-auto max-w-5xl text-center">
          <RevealText as="p" className="eyebrow mb-5 text-cyan">
            Before / After
          </RevealText>
          <RevealText
            as="h2"
            id="feed-title"
            className="section-title mx-auto max-w-4xl text-paper"
          >
            Von leerem Feed zu planbarer Sichtbarkeit.
          </RevealText>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-4 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-muted">
              Ohne System
            </p>
            <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-paper">
              Gute Momente bleiben intern.
            </h3>
            <div className="mt-7 space-y-3">
              {feedTransform.before.map((item) => (
                <div
                  key={item}
                  className="rounded-[18px] border border-white/10 bg-ink/48 p-4 opacity-62"
                >
                  <div className="h-2 w-24 rounded-full bg-white/10" />
                  <p className="mt-4 text-muted">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="nova-card rounded-[28px] p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-cyan">
                Mit NovaIQ
              </p>
              <span className="rounded-full border border-acid/25 bg-acid/[0.1] px-3 py-1.5 text-xs font-bold uppercase text-acid">
                Review Gate
              </span>
            </div>
            <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-paper">
              Jeder relevante Moment bekommt eine Route.
            </h3>
            <div className="mt-7 space-y-3">
              {feedTransform.after.map((item, index) => (
                <div
                  key={item}
                  className="rounded-[18px] border border-cyan/20 bg-cyan/[0.06] p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-paper">
                      {item}
                    </span>
                    <span className="text-xs font-bold text-cyan">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-[linear-gradient(90deg,#7C3AED,#22D3EE,#A3E635)]"
                      style={{ width: `${58 + index * 18}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
