import type { Metadata } from "next";
import { AiOperationsExperience } from "@/components/ai-operations/AiOperationsExperience";

export const metadata: Metadata = {
  title: "AI für Operations und Prozessautomatisierung",
  description:
    "CONLYRA verbindet ERP-Events, Dokumente, Geschäftsregeln, Exception Detection, Freigaben, System Updates und Audit Traces zu kontrollierten AI-Operations-Workflows.",
  alternates: {
    canonical: "/ai-operations",
  },
  openGraph: {
    title: "CONLYRA AI Operations — Prozesse kontrolliert ausführen",
    description:
      "Von ERP Events und Dokumenten über Rules und Exceptions bis zu Approval, System Write und Audit Trace.",
    url: "https://conlyra.ai/ai-operations",
    type: "website",
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://conlyra.ai/ai-operations/#service",
      name: "AI für Operations und Prozessautomatisierung",
      serviceType: "AI Operations Automation, Workflow Automation und Process Orchestration",
      provider: {
        "@type": "Organization",
        "@id": "https://conlyra.ai/#organization",
        name: "CONLYRA",
        url: "https://conlyra.ai",
      },
      areaServed: ["Deutschland", "Österreich", "Schweiz", "Europa"],
      description:
        "CONLYRA entwickelt kontrollierte AI-Operations-Workflows für ERP Events, Dokumentenprüfung, Business Rules, Exception Detection, Human Approval, System Updates und Audit Traces.",
    },
    {
      "@type": "WebPage",
      "@id": "https://conlyra.ai/ai-operations/#webpage",
      url: "https://conlyra.ai/ai-operations",
      name: "AI für Operations",
      headline: "Routine wird zu kontrollierter Ausführung.",
      inLanguage: "de-DE",
      about: { "@id": "https://conlyra.ai/ai-operations/#service" },
      isPartOf: { "@id": "https://conlyra.ai/#website" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Startseite", item: "https://conlyra.ai" },
        { "@type": "ListItem", position: 2, name: "Lösungen", item: "https://conlyra.ai/loesungen" },
        { "@type": "ListItem", position: 3, name: "AI für Operations", item: "https://conlyra.ai/ai-operations" },
      ],
    },
  ],
};

export default function AiOperationsPage() {
  return (
    <>
      <main id="main">
        <AiOperationsExperience />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
    </>
  );
}
