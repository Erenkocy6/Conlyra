import { MagneticButton } from "@/components/MagneticButton";
import { RevealText } from "@/components/RevealText";

export function FinalCTA() {
  return (
    <section
      id="kontakt"
      className="relative overflow-hidden py-20 sm:py-28 lg:py-36"
      aria-labelledby="final-cta-title"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/28 to-transparent" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_20%,rgba(124,58,237,0.2),transparent_34rem),radial-gradient(ellipse_at_50%_72%,rgba(34,211,238,0.12),transparent_30rem)]"
      />
      <div className="container-page">
        <RevealText
          as="h2"
          id="final-cta-title"
          className="mx-auto max-w-6xl break-words text-center font-display text-[clamp(2.45rem,11vw,8rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-paper [overflow-wrap:anywhere] sm:leading-[0.9]"
        >
          Verwandeln Sie Unternehmensalltag in sichtbare Marke.
        </RevealText>
        <p className="mx-auto mt-7 max-w-3xl text-center text-lg leading-8 text-paper/62">
          NovaIQ erkennt Content-Chancen, bereitet Posts kanalgenau vor und
          wartet auf Ihre Freigabe.
        </p>
        <div className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-3">
          {[
            ["01", "Chancen erkennen"],
            ["02", "Posts vorbereiten"],
            ["03", "Menschlich freigeben"],
          ].map(([step, label]) => (
            <div
              key={step}
              className="rounded-[18px] border border-white/10 bg-white/[0.045] p-4 text-center backdrop-blur-md"
            >
              <p className="text-xs font-bold text-cyan">{step}</p>
              <p className="mt-2 text-sm font-semibold text-muted">
                {label}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-9 flex justify-center">
          <MagneticButton href="mailto:hello@novaiq.ai?subject=NovaIQ%20Demo">
            Demo anfragen
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
