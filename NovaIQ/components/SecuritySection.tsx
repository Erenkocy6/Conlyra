import { approvalPrinciples } from "@/data/landing";
import { RevealText } from "@/components/RevealText";

export function SecuritySection() {
  return (
    <section
      id="sicherheit"
      className="section-pad relative overflow-hidden bg-[linear-gradient(180deg,rgba(17,24,39,0.56),rgba(7,8,13,0.92))]"
      aria-labelledby="security-title"
    >
      <div className="control-room-grid absolute inset-0 opacity-50" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/35 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet/28 to-transparent" />
      <div className="nova-orb right-[-12rem] top-1/4 size-96 bg-acid/10" />

      <div className="container-page relative">
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <RevealText as="p" className="eyebrow mb-5 text-cyan">
              Trust Layer
            </RevealText>
            <RevealText
              as="h2"
              id="security-title"
              className="section-title max-w-3xl text-paper"
            >
              Automatisierung mit Kontrolle.
            </RevealText>
            <p className="mt-7 max-w-xl text-lg leading-8 text-paper/64">
              Posts werden vorbereitet, nicht ungefragt veröffentlicht. Jeder
              Beitrag bleibt vor Veröffentlichung freigabepflichtig.
            </p>
          </div>

          <div className="nova-card relative overflow-hidden rounded-[28px] p-5 sm:p-7">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(163,230,53,0.12),transparent_24rem)]" />
            <div className="relative mb-8 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-paper">Human Approval Gate</p>
                <p className="mt-1 text-sm text-muted">
                  Enterprise-ready Prüfpfad für Social Posts
                </p>
              </div>
              <span className="rounded-full border border-acid/25 bg-acid/[0.1] px-4 py-2 text-xs font-bold uppercase text-acid">
                publish locked
              </span>
            </div>

            <div className="relative grid gap-3">
              {approvalPrinciples.map((item, index) => (
                <div
                  key={item}
                  className="flex items-start gap-4 rounded-[18px] border border-white/10 bg-white/[0.045] p-4"
                >
                  <span className="mt-1 grid size-8 shrink-0 place-items-center rounded-full border border-acid/30 bg-acid/[0.1] text-xs font-bold text-acid">
                    0{index + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-paper">{item}</p>
                    <p className="mt-1 text-sm leading-6 text-muted">
                      Für B2B-Teams, die Geschwindigkeit wollen, aber Kontrolle
                      nicht aus der Hand geben.
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative mt-7 grid gap-3 sm:grid-cols-3">
              {["Prepared", "Approved", "Scheduled"].map((item, index) => (
                <div
                  key={item}
                  className="rounded-[18px] border border-white/10 bg-ink/58 p-4"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-muted">
                    Gate {index + 1}
                  </p>
                  <p className="mt-2 font-semibold text-paper">{item}</p>
                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-[linear-gradient(90deg,#7C3AED,#22D3EE,#A3E635)]"
                      style={{ width: `${42 + index * 24}%` }}
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
