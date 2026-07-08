import { MagneticButton } from "@/components/MagneticButton";
import { RevealText } from "@/components/RevealText";
import { pilotQualifiers } from "@/data/landing";

export function EarlyAccess() {
  return (
    <section
      id="pilot"
      className="section-pad relative overflow-hidden"
      aria-labelledby="pilot-title"
    >
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[8px] border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.045)_38%,rgba(255,255,255,0.03))] p-6 shadow-panel-glow sm:p-10 lg:p-14">
          <div className="absolute right-0 top-0 h-full w-1/2 bg-fine-grid bg-[length:34px_34px] opacity-20" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_0.78fr] lg:items-end">
            <div>
              <RevealText as="p" className="eyebrow mb-5 text-acid">
                Pilotphase
              </RevealText>
              <RevealText
                as="h2"
                id="pilot-title"
                className="section-title max-w-3xl text-paper"
              >
                Für Teams, die aus Momenten einen Prozess machen wollen.
              </RevealText>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-paper/66">
                Wir setzen Quellen, Brand Voice und Freigabewege gemeinsam mit
                euren echten Content-Anlässen auf. Der Pilot ist für Teams
                gedacht, die aus vorhandenen Momenten einen wiederholbaren
                Social-Workflow bauen wollen.
              </p>
            </div>

            <div className="rounded-[8px] border border-white/10 bg-ink/68 p-5 backdrop-blur-md">
              <p className="mb-4 text-sm font-bold text-paper">
                Pilot passt, wenn ihr habt:
              </p>
              <div className="space-y-4">
                {pilotQualifiers.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="size-2 rounded-full bg-acid" />
                    <p className="text-paper/74">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-[8px] border border-white/10 bg-white/[0.045] p-4">
                <p className="text-xs font-bold uppercase text-paper/42">
                  Ergebnis des Piloten
                </p>
                <p className="mt-2 text-sm leading-6 text-paper/66">
                  Ein erster NovaIQ-Workflow mit echten Quellen, Brand Voice und
                  Review Gate für eure wiederholbaren Posts.
                </p>
              </div>
              <div className="mt-7">
                <MagneticButton href="mailto:hello@novaiq.ai?subject=NovaIQ%20Pilotprojekt">
                  Pilot-Check anfragen
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
