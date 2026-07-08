import { contentMoments } from "@/data/landing";
import { RevealText } from "@/components/RevealText";

export function ProblemSection() {
  return (
    <section
      id="problem"
      className="section-pad relative overflow-hidden"
      aria-labelledby="problem-title"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent" />
      <div className="nova-orb -left-28 top-28 size-72 bg-cyan/16" />
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <RevealText as="p" className="eyebrow mb-5 text-cyan">
              Das Problem
            </RevealText>
            <RevealText
              as="h2"
              id="problem-title"
              className="section-title max-w-4xl text-paper"
            >
              Content entsteht jeden Tag. Nur wird er selten genutzt.
            </RevealText>
          </div>

          <RevealText
            as="p"
            className="max-w-2xl text-2xl font-semibold leading-tight tracking-[-0.03em] text-muted sm:text-3xl lg:justify-self-end"
            delay={0.1}
          >
            Die wertvollsten Markenmomente verschwinden in Kalendern, Chats,
            Kamerarollen und Projektordnern.
          </RevealText>
        </div>

        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {contentMoments.map((moment, index) => (
            <RevealText
              key={moment}
              as="div"
              className="group relative min-h-36 overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.04] p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan/30 hover:bg-cyan/[0.06]"
              delay={index * 0.04}
            >
              <div className="absolute right-4 top-4 h-px w-16 bg-gradient-to-r from-transparent to-cyan/50" />
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-muted">
                Signal {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-8 text-3xl font-semibold tracking-[-0.04em] text-paper">
                {moment}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                Passiert ohnehin. Wird aber selten systematisch zu Social
                Content.
              </p>
            </RevealText>
          ))}
        </div>

        <RevealText
          as="p"
          className="mt-14 max-w-5xl font-display text-[clamp(2.3rem,5.8vw,6.2rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-paper"
          delay={0.08}
        >
          NovaIQ erkennt Momente, aus denen Marke wird.
        </RevealText>
      </div>
    </section>
  );
}
