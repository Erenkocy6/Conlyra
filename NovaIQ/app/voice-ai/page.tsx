import type { Metadata } from "next";
import { VoiceAiExperience } from "@/components/voice-ai/VoiceAiExperience";

export const metadata: Metadata = {
  title: "Voice AI für Unternehmen",
  description:
    "CONLYRA entwickelt Voice Agents für Terminmanagement, Support, Lead-Qualifizierung und operative Anrufprozesse — mit Kontext, Systemaktionen, Human Handoff und vollständigem Trace.",
  alternates: {
    canonical: "/voice-ai",
  },
  openGraph: {
    title: "CONLYRA Voice AI — Gespräche, die Arbeit bewegen",
    description:
      "Natürliche Gespräche, Unternehmenskontext und kontrollierte Aktionen in einem Voice Agent System.",
    url: "https://conlyra.ai/voice-ai",
    type: "website",
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "CONLYRA Voice AI",
  serviceType: "Voice Agents und AI Telefonassistenten für Unternehmen",
  provider: {
    "@type": "Organization",
    name: "CONLYRA",
    url: "https://conlyra.ai",
  },
  areaServed: ["Deutschland", "Österreich", "Schweiz", "Europa"],
  description:
    "Konzeption und Integration kontrollierter Voice Agents mit natürlicher Sprache, Unternehmenskontext, Systemaktionen, Human Handoff und Gesprächs-Trace.",
};

export default function VoiceAiPage() {
  return (
    <>
      <main id="main">
        <VoiceAiExperience />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
    </>
  );
}
