import type { Metadata } from "next";
import { AiAgentsExperience } from "@/components/ai-agents/AiAgentsExperience";

export const metadata: Metadata = {
  title: "AI-Agenten für Unternehmen",
  description:
    "CONLYRA entwickelt kontrollierte AI-Agenten für Sales, Support, Operations und Wissensarbeit — mit privatem Kontext, Tool-Zugriff, Human Gates und vollständigem Trace.",
  alternates: {
    canonical: "/ai-agenten",
  },
  openGraph: {
    title: "CONLYRA — AI-Agenten für reale Unternehmensprozesse",
    description:
      "Agenten mit Rolle, Kontext, Tools und Grenzen. Entwickelt für kontrollierte operative Arbeit.",
    url: "https://conlyra.ai/ai-agenten",
    type: "website",
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "CONLYRA AI-Agenten",
  serviceType: "AI-Agenten und Agentic Workflows",
  provider: {
    "@type": "Organization",
    name: "CONLYRA",
    url: "https://conlyra.ai",
  },
  areaServed: ["Deutschland", "Österreich", "Schweiz", "Europa"],
  description:
    "Konzeption, Entwicklung und Integration kontrollierter AI-Agenten mit Unternehmenskontext, Tool-Zugriff, Human Gates und Audit Trails.",
};

export default function AiAgentsPage() {
  return (
    <>
      <main id="main">
        <AiAgentsExperience />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
    </>
  );
}
