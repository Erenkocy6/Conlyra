import type { Metadata } from "next";
import { AiVertriebExperience } from "@/components/ai-vertrieb/AiVertriebExperience";

export const metadata: Metadata = {
  title: "AI für Vertrieb und Sales Automation",
  description:
    "CONLYRA verbindet Lead Intake, Unternehmensrecherche, CRM-Kontext, Qualifizierung, Follow-up und Human Approval zu kontrollierten AI-Sales-Workflows.",
  alternates: {
    canonical: "/ai-vertrieb",
  },
  openGraph: {
    title: "CONLYRA AI für Vertrieb — vom Signal zum nächsten Sales-Move",
    description:
      "Lead Intake, Research, CRM-Kontext, Qualification und Follow-up als kontrolliertes Revenue-System.",
    url: "https://conlyra.ai/ai-vertrieb",
    type: "website",
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://conlyra.ai/ai-vertrieb/#service",
      name: "AI für Vertrieb und Sales Automation",
      serviceType: "AI Sales Automation, Lead Qualification und Revenue Workflow Automation",
      provider: {
        "@type": "Organization",
        "@id": "https://conlyra.ai/#organization",
        name: "CONLYRA",
        url: "https://conlyra.ai",
      },
      areaServed: ["Deutschland", "Österreich", "Schweiz", "Europa"],
      description:
        "CONLYRA entwickelt kontrollierte AI-Sales-Workflows für Lead Intake, Unternehmensrecherche, CRM-Enrichment, Lead Qualification, Next-Best-Action, Human Approval, Follow-up und CRM-Updates.",
    },
    {
      "@type": "WebPage",
      "@id": "https://conlyra.ai/ai-vertrieb/#webpage",
      url: "https://conlyra.ai/ai-vertrieb",
      name: "AI für Vertrieb",
      headline: "Vom ersten Signal bis zum nächsten Sales-Move",
      inLanguage: "de-DE",
      about: { "@id": "https://conlyra.ai/ai-vertrieb/#service" },
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
          name: "AI für Vertrieb",
          item: "https://conlyra.ai/ai-vertrieb",
        },
      ],
    },
  ],
};

export default function AiVertriebPage() {
  return (
    <>
      <main id="main">
        <AiVertriebExperience />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
    </>
  );
}
