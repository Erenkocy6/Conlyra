"use client";

import { useState } from "react";
import { faqItems, offerPlans } from "@/data/landing";
import { MagneticButton } from "@/components/MagneticButton";
import { RevealText } from "@/components/RevealText";
import { cn } from "@/lib/utils";

export function OfferFaq() {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="angebot"
      className="section-pad relative overflow-hidden"
      aria-labelledby="offer-title"
    >
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <RevealText as="p" className="eyebrow mb-5 text-cyan">
              Pilot & FAQ
            </RevealText>
            <RevealText
              as="h2"
              id="offer-title"
              className="section-title max-w-3xl text-paper"
            >
              Starten Sie mit einem Workflow, nicht mit einem Tool.
            </RevealText>
          </div>
          <p className="max-w-xl text-lg leading-8 text-muted lg:justify-self-end">
            NovaIQ wird mit echten Quellen, echter Brand Voice und realen
            Freigabewegen aufgesetzt.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {offerPlans.map((plan, index) => (
            <RevealText
              key={plan.name}
              as="div"
              delay={index * 0.06}
              className={cn(
                "nova-card rounded-[24px] p-5",
                index === 1 && "border-cyan/26 bg-cyan/[0.055]",
              )}
            >
              <p className="text-sm font-bold uppercase tracking-[0.08em] text-cyan">
                {plan.name}
              </p>
              <p className="mt-5 text-2xl font-semibold leading-tight text-paper">
                {plan.copy}
              </p>
              <p className="mt-5 text-base leading-7 text-muted">
                {plan.detail}
              </p>
            </RevealText>
          ))}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="rounded-[24px] border border-white/10 bg-white/[0.045] p-5">
            <p className="text-sm font-bold text-paper">
              Häufige Fragen vor dem Pilot
            </p>
            <p className="mt-3 text-sm leading-6 text-muted">
              Kurz, direkt und auf B2B-Entscheidung ausgelegt.
            </p>
            <div className="mt-6">
              <MagneticButton href="mailto:hello@novaiq.ai?subject=NovaIQ%20Pilot">
                Pilot besprechen
              </MagneticButton>
            </div>
          </div>

          <div className="divide-y divide-white/10 rounded-[24px] border border-white/10 bg-white/[0.035]">
            {faqItems.map((item, index) => (
              <div key={item.question}>
                <button
                  type="button"
                  onClick={() => setOpen(open === index ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                  aria-expanded={open === index}
                >
                  <span className="text-lg font-semibold text-paper">
                    {item.question}
                  </span>
                  <span
                    className={cn(
                      "grid size-8 shrink-0 place-items-center rounded-full border border-white/10 text-muted transition duration-300",
                      open === index && "border-cyan/30 text-cyan",
                    )}
                  >
                    {open === index ? "-" : "+"}
                  </span>
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300",
                    open === index
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-base leading-7 text-muted">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
