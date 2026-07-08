import type { Metadata } from "next";
import { WorkflowExperience } from "@/components/workflow/WorkflowExperience";

export const metadata: Metadata = {
  title: "Workflow-Automatisierung für Unternehmen",
  description:
    "CONLYRA verbindet Signale, Unternehmensdaten, Entscheidungen, Human Gates und Aktionen zu kontrollierten Workflow-Systemen für operative Prozesse.",
  alternates: {
    canonical: "/workflow-automatisierung",
  },
  openGraph: {
    title: "CONLYRA FLOW — kontrollierte Workflow-Automatisierung",
    description:
      "Von Signal und Kontext bis Freigabe, Aktion und Trace: CONLYRA entwickelt kontrollierte Workflow-Systeme für reale Unternehmensprozesse.",
    url: "https://conlyra.ai/workflow-automatisierung",
    type: "website",
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "CONLYRA Workflow-Automatisierung",
  serviceType: "Workflow-Automatisierung und AI Workflow Systems",
  provider: {
    "@type": "Organization",
    name: "CONLYRA",
    url: "https://conlyra.ai",
  },
  areaServed: ["Deutschland", "Österreich", "Schweiz", "Europa"],
  description:
    "Konzeption, Entwicklung und Integration kontrollierter Workflow-Systeme mit Triggern, Unternehmenskontext, Logik, Human Gates, Aktionen und Audit Trace.",
};

export default function WorkflowAutomationPage() {
  return (
    <>
      <main id="main">
        <WorkflowExperience />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
    </>
  );
}
