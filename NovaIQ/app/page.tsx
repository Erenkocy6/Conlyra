import { ConlyraExperience } from "@/components/ConlyraExperience";
import { HeroSectionFix } from "@/components/HeroSectionFix";

const siteUrl = "https://conlyra.ai";

const softwareSchema = {
  "@type": "SoftwareApplication",
  "@id": `${siteUrl}/#software`,
  name: "CONLYRA",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "CONLYRA verbindet Daten, Workflows und AI-Agenten zu einer praezisen Ausfuehrungsebene fuer intelligente Automatisierung, private Datenlogik und enterprise-ready Agentensysteme.",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    price: "0",
    priceCurrency: "EUR",
    description: "CONLYRA Workflow-Beratung anfragen.",
  },
  provider: {
    "@id": `${siteUrl}/#organization`,
  },
};

const organizationSchema = {
  "@type": ["Organization", "ProfessionalService"],
  "@id": `${siteUrl}/#organization`,
  name: "CONLYRA",
  url: siteUrl,
  logo: `${siteUrl}/conlyra-logo.svg`,
  email: "hello@conlyra.ai",
  description:
    "CONLYRA entwickelt AI-Agenten, KI-Automatisierung und Workflow-Systeme fuer Unternehmen in Deutschland, Oesterreich, der Schweiz und Europa.",
  areaServed: [
    { "@type": "Country", name: "Deutschland" },
    { "@type": "Country", name: "Oesterreich" },
    { "@type": "Country", name: "Schweiz" },
    { "@type": "AdministrativeArea", name: "DACH" },
    { "@type": "Continent", name: "Europa" },
  ],
  knowsAbout: [
    "AI-Agenten",
    "KI-Automatisierung",
    "Workflow-Automatisierung",
    "Agentic AI",
    "Enterprise AI Systems",
    "Datenintelligenz",
    "Prozessautomatisierung",
  ],
};

const websiteSchema = {
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: "CONLYRA",
  url: siteUrl,
  inLanguage: "de-DE",
  description:
    "CONLYRA ist eine premium AI-SaaS-Plattform fuer individuelle AI-Workflows, Agentenautomatisierung und intelligente Systeminfrastruktur.",
  publisher: {
    "@id": `${siteUrl}/#organization`,
  },
};

const webPageSchema = {
  "@type": "WebPage",
  "@id": `${siteUrl}/#webpage`,
  url: siteUrl,
  name: "CONLYRA - AI-Agenten und KI-Automatisierung fuer Unternehmen",
  headline: "AI-Agenten und kontrollierte Workflow-Systeme fuer Unternehmen",
  inLanguage: "de-DE",
  isPartOf: {
    "@id": `${siteUrl}/#website`,
  },
  about: {
    "@id": `${siteUrl}/#organization`,
  },
  audience: {
    "@type": "BusinessAudience",
    audienceType: "Unternehmen, Teams und Entscheider fuer KI-Automatisierung",
  },
  mainEntity: [
    { "@id": `${siteUrl}/#services` },
    { "@id": `${siteUrl}/#faq` },
  ],
};

const serviceCatalogSchema = {
  "@type": "OfferCatalog",
  "@id": `${siteUrl}/#services`,
  name: "CONLYRA Leistungen fuer AI-Agenten und KI-Automatisierung",
  itemListElement: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "AI-Agenten entwickeln",
        serviceType: "AI-Agenten und Agentic Workflows",
        description:
          "Konzeption, Bau und Integration von AI-Agenten fuer interne Prozesse, Kundenservice, Operations und Wissensarbeit.",
        provider: { "@id": `${siteUrl}/#organization` },
        areaServed: "DACH und Europa",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "KI-Automatisierung fuer Unternehmen",
        serviceType: "Workflow-Automatisierung",
        description:
          "Automatisierte Workflows, Datenlogik und sichere Ausfuehrungsebenen fuer wiederkehrende Unternehmensprozesse.",
        provider: { "@id": `${siteUrl}/#organization` },
        areaServed: "DACH und Europa",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "AI Systems Beratung",
        serviceType: "AI-Infrastruktur und Systemdesign",
        description:
          "Strategie, technische Architektur und Pilotprojekte fuer kontrollierbare AI-Systeme in bestehenden Software-Landschaften.",
        provider: { "@id": `${siteUrl}/#organization` },
        areaServed: "DACH und Europa",
      },
    },
  ],
};

const faqSchema = {
  "@type": "FAQPage",
  "@id": `${siteUrl}/#faq`,
  mainEntity: [
    {
      "@type": "Question",
      name: "Was macht CONLYRA?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "CONLYRA baut AI-Agenten, KI-Automatisierung und Workflow-Systeme, die Unternehmensdaten, Tools und Entscheidungen kontrolliert verbinden.",
      },
    },
    {
      "@type": "Question",
      name: "Fuer welche Unternehmen ist CONLYRA geeignet?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "CONLYRA richtet sich an Unternehmen in Deutschland, Oesterreich, der Schweiz und Europa, die Prozesse mit AI-Agenten automatisieren und gleichzeitig Kontrolle, Nachvollziehbarkeit und Integrationen behalten wollen.",
      },
    },
    {
      "@type": "Question",
      name: "Wie startet ein CONLYRA Projekt?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Der Einstieg beginnt mit einem Prozess- und Datencheck. Danach entsteht ein Pilot-Workflow, der messbar zeigt, welche Aufgaben AI-Agenten uebernehmen koennen.",
      },
    },
    {
      "@type": "Question",
      name: "Welche Systeme kann CONLYRA verbinden?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "CONLYRA kann CRM-, Support-, Wissens-, Datenbank-, API- und interne Tool-Landschaften verbinden, sofern Zugriff und Sicherheitsanforderungen geklaert sind.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Startseite",
      item: siteUrl,
    },
  ],
};

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    organizationSchema,
    websiteSchema,
    webPageSchema,
    softwareSchema,
    serviceCatalogSchema,
    faqSchema,
    breadcrumbSchema,
  ],
};

export default function Home() {
  return (
    <>
      <ConlyraExperience />
      <HeroSectionFix />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
    </>
  );
}
