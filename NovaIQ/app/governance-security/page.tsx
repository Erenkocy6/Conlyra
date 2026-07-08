import type { Metadata } from "next";
import { ControlLayerExperience } from "@/components/control-layer/ControlLayerExperience";

export const metadata: Metadata = {
  title: "AI Governance und Control Layer für Unternehmen",
  description:
    "CONLYRA definiert Rollen, Rechte, Freigaben, Risikostufen und nachvollziehbare Trace-Logik für kontrollierte AI-Agenten und Workflow-Systeme.",
  alternates: {
    canonical: "/governance-security",
  },
  openGraph: {
    title: "CONLYRA Control Layer — AI handeln lassen, ohne Kontrolle abzugeben",
    description:
      "Permission Graph, Action Control Matrix, Human Approval Queue und Trace Explorer für kontrollierte AI-Systeme.",
    url: "https://conlyra.ai/governance-security",
    type: "website",
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "CONLYRA Control Layer",
  serviceType: "AI Governance, AI Control Layer und Governance für autonome Systeme",
  provider: {
    "@type": "Organization",
    name: "CONLYRA",
    url: "https://conlyra.ai",
  },
  areaServed: ["Deutschland", "Österreich", "Schweiz", "Europa"],
  description:
    "Konzeption und Integration von Rollen, Berechtigungen, Freigaben, Risikostufen, Human Handoff und Traceability für AI-Agenten und Workflow-Automatisierung.",
};

export default function GovernanceSecurityPage() {
  return (
    <>
      <main id="main">
        <ControlLayerExperience />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
    </>
  );
}
