import type { Metadata } from "next";
import { IntegrationsExperience } from "@/components/integrations/IntegrationsExperience";

export const metadata: Metadata = {
  title: "AI Integrationen für Unternehmen",
  description:
    "CONLYRA verbindet CRM, ERP, Kommunikation, Commerce und Datenquellen mit kontrollierten AI-Systemen — inklusive Read-, Write- und Trigger-Capabilities.",
  alternates: {
    canonical: "/integrationen",
  },
  openGraph: {
    title: "CONLYRA Integrations — Ihr Operating Stack als verbundenes System",
    description:
      "Systeme verbinden, Daten lesen, Aktionen schreiben und Ereignisse kontrolliert auslösen — in einem sichtbaren Operating Stack.",
    url: "https://conlyra.ai/integrationen",
    type: "website",
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "CONLYRA Integrations",
  serviceType: "AI System Integration und Workflow Integration für Unternehmen",
  provider: {
    "@type": "Organization",
    name: "CONLYRA",
    url: "https://conlyra.ai",
  },
  areaServed: ["Deutschland", "Österreich", "Schweiz", "Europa"],
  description:
    "Integration von CRM-, ERP-, Kommunikations-, Commerce- und Datensystemen in kontrollierte AI-Agenten und Workflow-Automatisierung.",
};

export default function IntegrationenPage() {
  return (
    <>
      <main id="main">
        <IntegrationsExperience />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
    </>
  );
}
