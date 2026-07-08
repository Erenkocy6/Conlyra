import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Poppins } from "next/font/google";
import { ConlyraCommandCenter } from "@/components/ConlyraCommandCenter";
import { ConlyraMegaFooter } from "@/components/ConlyraMegaFooter";
import { ConlyraRouteBoundary } from "@/components/ConlyraRouteBoundary";
import { ConlyraScrollDirector } from "@/components/ConlyraScrollDirector";
import "./globals.css";
import "./director-patch.css";
import "./experience-polish.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://conlyra.ai"),
  applicationName: "CONLYRA",
  category: "AI Automation",
  creator: "CONLYRA",
  publisher: "CONLYRA",
  title: {
    default: "CONLYRA — AI-Agenten, KI-Automatisierung und Workflow-Systeme fuer Unternehmen",
    template: "%s | CONLYRA",
  },
  description:
    "CONLYRA baut AI-Agenten, KI-Automatisierung und kontrollierte Workflow-Systeme fuer Unternehmen in Deutschland, Oesterreich, der Schweiz und Europa.",
  keywords: [
    "CONLYRA",
    "AI-Agenten",
    "KI-Agenten",
    "KI Automatisierung",
    "AI Automatisierung",
    "AI SaaS",
    "AI Agentur",
    "KI Agentur",
    "AI Workflow Beratung",
    "AI Systems Beratung",
    "AI-Infrastruktur",
    "Agentenautomatisierung",
    "individuelle AI-Workflows",
    "intelligente Systeme",
    "Workflow-Automatisierung",
    "Enterprise-Automatisierung",
    "Datenintelligenz",
    "Prozessautomatisierung",
    "AI-Ausfuehrungsebene",
    "DACH AI Automation",
    "Enterprise KI Systeme",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CONLYRA — AI-Agenten und KI-Automatisierung fuer moderne Unternehmen",
    description:
      "Bauen Sie intelligente Systeme, die Daten, Workflows und AI-Agenten kontrolliert verbinden. Fuer Unternehmen in DACH und Europa.",
    url: "https://conlyra.ai",
    siteName: "CONLYRA",
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: "/conlyra-logo.svg",
        width: 1200,
        height: 630,
        alt: "CONLYRA Logo fuer AI-Agenten, KI-Automatisierung und Workflow-Systeme",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CONLYRA — AI-Agenten und KI-Automatisierung",
    description:
      "Kontrollierte AI-Agenten, Workflow-Automatisierung und intelligente Ausfuehrungssysteme fuer Unternehmen.",
    images: ["/conlyra-logo.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "geo.region": "DE",
    "geo.placename": "Deutschland, Oesterreich, Schweiz, Europa",
    "business:contact_data:region": "DACH",
    "ai:topic": "AI agents, KI automation, workflow automation, enterprise AI systems",
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [{ url: "/conlyra-logo.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "192x192", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0A0B",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${poppins.variable} ${cormorant.variable}`}>
      <body>
        <a href="#main" className="conlyra-skip-link">
          Zum Inhalt springen
        </a>
        {children}
        <ConlyraCommandCenter />
        <ConlyraRouteBoundary />
        <ConlyraScrollDirector />
        <ConlyraMegaFooter />
      </body>
    </html>
  );
}
