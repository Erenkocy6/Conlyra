import type { Metadata } from "next";
import { PrivateIntelligenceExperience } from "@/components/private-intelligence/PrivateIntelligenceExperience";

export const metadata: Metadata = {
  title: "Private Intelligence für Unternehmen",
  description:
    "CONLYRA verbindet internes Unternehmenswissen, Berechtigungen und Quellen zu einem privaten Intelligence Layer für Teams, Workflows und AI-Agenten.",
  alternates: {
    canonical: "/private-intelligence",
  },
  openGraph: {
    title: "CONLYRA Private Intelligence — Unternehmenswissen kontrolliert nutzbar",
    description:
      "Verbinden Sie Dokumente, Systeme und Unternehmenskontext mit Berechtigungen, Evidenz und nachvollziehbaren Antworten.",
    url: "https://conlyra.ai/private-intelligence",
    type: "website",
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "CONLYRA Private Intelligence",
  serviceType: "Private Enterprise Intelligence und Knowledge Systems",
  provider: {
    "@type": "Organization",
    name: "CONLYRA",
    url: "https://conlyra.ai",
  },
  areaServed: ["Deutschland", "Österreich", "Schweiz", "Europa"],
  description:
    "Konzeption und Integration privater Intelligence Layer für Unternehmenswissen mit verbundenen Quellen, Berechtigungen, Retrieval, Evidenz und nachvollziehbaren Antworten.",
};

export default function PrivateIntelligencePage() {
  return (
    <>
      <main id="main">
        <PrivateIntelligenceExperience />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
    </>
  );
}
