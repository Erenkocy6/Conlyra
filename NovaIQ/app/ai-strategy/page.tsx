import type { Metadata } from "next";
import { AiReadinessExperience } from "@/components/ai-readiness/AiReadinessExperience";

export const metadata: Metadata = {
  title: "AI Readiness für Unternehmen",
  description:
    "CONLYRA analysiert Menschen, Daten, Prozesse und Governance, um AI-Potenziale zu priorisieren und aus Ideen kontrollierte Pilotprojekte zu machen.",
  alternates: {
    canonical: "/ai-strategy",
  },
  openGraph: {
    title: "CONLYRA AI Readiness — Wo AI wirklich Wirkung entfaltet",
    description:
      "Ein strukturiertes Readiness-System für Menschen, Daten, Prozesse und Governance — mit Priorisierung, Opportunity Mapping und Pilot-Roadmap.",
    url: "https://conlyra.ai/ai-strategy",
    type: "website",
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "CONLYRA AI Readiness",
  serviceType: "AI Readiness Assessment und AI Strategie für Unternehmen",
  provider: {
    "@type": "Organization",
    name: "CONLYRA",
    url: "https://conlyra.ai",
  },
  areaServed: ["Deutschland", "Österreich", "Schweiz", "Europa"],
  description:
    "Analyse von Menschen, Daten, Prozessen und Governance zur Priorisierung sinnvoller AI-Initiativen und Entwicklung einer kontrollierten Pilot-Roadmap.",
};

export default function AiStrategyPage() {
  return (
    <>
      <main id="main">
        <AiReadinessExperience />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
    </>
  );
}
