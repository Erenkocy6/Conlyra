import type { CSSProperties } from "react";
import { useCases } from "@/data/landing";
import { RevealText } from "@/components/RevealText";
import { cn } from "@/lib/utils";

const accentColors = {
  cyan: "rgba(255, 255, 255, 0.22)",
  acid: "rgba(255, 255, 255, 0.18)",
  violet: "rgba(207, 207, 207, 0.2)",
  signal: "rgba(255, 255, 255, 0.14)",
};

export function UseCases() {
  return (
    <section
      className="section-pad relative overflow-hidden"
      aria-labelledby="use-cases-title"
    >
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <RevealText as="p" className="eyebrow mb-5 text-violet">
              Anwendungsfälle
            </RevealText>
            <RevealText
              as="h2"
              id="use-cases-title"
              className="section-title max-w-3xl text-paper"
            >
              Use Cases, die nicht nach Kampagne aussehen.
            </RevealText>
          </div>
          <p className="max-w-xl text-lg leading-8 text-paper/62 lg:justify-self-end">
            Für die Momente, die schon passieren und nur noch übersetzt werden
            müssen.
          </p>
        </div>

        <div className="mt-14 grid auto-rows-[18rem] gap-4 md:grid-cols-4">
          {useCases.map((useCase, index) => (
            <article
              key={useCase.title}
              className={cn(
                "use-case-card content-card relative overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.04] p-6",
                index === 0 && "md:col-span-2",
                index === 2 && "md:row-span-2",
                index === 5 && "md:col-span-2",
              )}
              style={
                {
                  "--case-accent":
                    accentColors[useCase.accent as keyof typeof accentColors],
                } as CSSProperties
              }
            >
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-paper/46">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px w-16 bg-paper/24" />
                </div>
                <div>
                  <h3 className="text-3xl font-semibold text-paper">
                    {useCase.title}
                  </h3>
                  <p className="mt-4 max-w-sm text-base leading-7 text-paper/62">
                    {useCase.copy}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
