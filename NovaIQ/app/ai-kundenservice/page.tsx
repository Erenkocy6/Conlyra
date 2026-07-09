import type { Metadata } from "next";
import { AiKundenserviceExperience } from "@/components/ai-kundenservice/AiKundenserviceExperience";

export const metadata: Metadata = {
  title: "AI für Kundenservice und Service Automation",
  description:
    "CONLYRA verbindet Voice, E-Mail und Chat mit Kundenkontext, Wissensquellen, Confidence Checks, Resolution und Human Handoff zu kontrollierten AI-Service-Workflows.",
  alternates: {
    canonical: "/ai-kundenservice",
  },
  openGraph: {
    title: "CONLYRA AI für Kundenservice — verstehen, lösen, kontrolliert eskalieren",
    description:
      "Service-Anfragen über Voice, E-Mail und Chat mit Kundenkontext, Knowledge Retrieval, Confidence und Human Handoff verbinden.",
    url: "https://conlyra.ai/ai-kundenservice",
    type: "website",
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://conlyra.ai/ai-kundenservice/#service",
      name: "AI für Kundenservice und Service Automation",
      serviceType: "AI Customer Service Automation, Voice AI und Service Workflow Automation",
      provider: {
        "@type": "Organization",
        "@id": "https://conlyra.ai/#organization",
        name: "CONLYRA",
        url: "https://conlyra.ai",
      },
      areaServed: ["Deutschland", "Österreich", "Schweiz", "Europa"],
      description:
        "CONLYRA entwickelt kontrollierte AI-Service-Workflows für Voice, E-Mail und Chat mit Intent Detection, Kundenkontext, Knowledge Retrieval, Confidence Checks, Resolution und Human Handoff.",
    },
    {
      "@type": "WebPage",
      "@id": "https://conlyra.ai/ai-kundenservice/#webpage",
      url: "https://conlyra.ai/ai-kundenservice",
      name: "AI für Kundenservice",
      headline: "Anfragen verstehen. Kontext laden. Sicher lösen.",
      inLanguage: "de-DE",
      about: { "@id": "https://conlyra.ai/ai-kundenservice/#service" },
      isPartOf: { "@id": "https://conlyra.ai/#website" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Startseite",
          item: "https://conlyra.ai",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Lösungen",
          item: "https://conlyra.ai/loesungen",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "AI für Kundenservice",
          item: "https://conlyra.ai/ai-kundenservice",
        },
      ],
    },
  ],
};

export default function AiKundenservicePage() {
  return (
    <>
      <main id="main">
        <AiKundenserviceExperience />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
    </>
  );
}
