import type { Metadata } from "next";
import { SolutionsHubExperience } from "@/components/solutions-hub/SolutionsHubExperience";

export const metadata: Metadata = {
  title: "AI-Lösungen für Vertrieb, Service und Operations",
  description:
    "CONLYRA entwickelt kontrollierte AI-Lösungen für Vertrieb, Kundenservice, Operations und Wissensarbeit — mit Agenten, Workflows, Integrationen und Human Control.",
  alternates: {
    canonical: "/loesungen",
  },
  openGraph: {
    title: "CONLYRA Lösungen — AI für reale Unternehmensarbeit",
    description:
      "Entdecken Sie kontrollierte AI-Systeme für Sales, Service, Operations und Unternehmenswissen.",
    url: "https://conlyra.ai/loesungen",
    type: "website",
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://conlyra.ai/loesungen/#webpage",
      url: "https://conlyra.ai/loesungen",
      name: "AI-Lösungen für Unternehmen",
      description:
        "CONLYRA verbindet AI-Agenten, Workflow-Automatisierung, Voice AI, Private Intelligence, Integrationen und Governance zu kontrollierten Lösungen für reale Unternehmensprozesse.",
      inLanguage: "de-DE",
      isPartOf: { "@id": "https://conlyra.ai/#website" },
      about: { "@id": "https://conlyra.ai/#organization" },
      mainEntity: { "@id": "https://conlyra.ai/loesungen/#solutions" },
    },
    {
      "@type": "ItemList",
      "@id": "https://conlyra.ai/loesungen/#solutions",
      name: "CONLYRA Lösungsbereiche",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "AI für Vertrieb",
          description: "Lead Intake, Research, Qualification, Follow-up und CRM-Automatisierung.",
          url: "https://conlyra.ai/ai-vertrieb",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "AI für Kundenservice",
          description: "Anfragen verstehen, Kontext laden, Antworten vorbereiten und kontrolliert eskalieren.",
          url: "https://conlyra.ai/loesungen#service",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "AI für Operations",
          description: "Dokumente, Freigaben, Systemupdates und operative Routinen automatisieren.",
          url: "https://conlyra.ai/loesungen#operations",
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "AI für Wissensarbeit",
          description: "Unternehmenswissen verbinden, Quellen prüfen und Antworten nachvollziehbar machen.",
          url: "https://conlyra.ai/loesungen#knowledge",
        },
      ],
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
      ],
    },
  ],
};

export default function SolutionsPage() {
  return (
    <>
      <main id="main">
        <SolutionsHubExperience />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
    </>
  );
}
