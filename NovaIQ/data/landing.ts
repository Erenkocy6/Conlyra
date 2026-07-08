export const navItems = [
  { label: "Rundgang", href: "#system" },
  { label: "Video", href: "#media-system" },
  { label: "Material", href: "#material" },
  { label: "Problem", href: "#problem" },
  { label: "Workflow", href: "#workflow" },
  { label: "Systeme", href: "#selected-systems" },
  { label: "Produkt", href: "#produkt" },
  { label: "FAQ", href: "#angebot" },
  { label: "Demo", href: "#kontakt" },
];

export const chapterItems = [
  { label: "Hero", href: "#top" },
  { label: "Rundgang", href: "#system" },
  { label: "Video", href: "#media-system" },
  { label: "Material", href: "#material" },
  { label: "Problem", href: "#problem" },
  { label: "Workflow", href: "#workflow" },
  { label: "Systeme", href: "#selected-systems" },
  { label: "Branchen", href: "#cases" },
  { label: "Features", href: "#features" },
  { label: "Feed", href: "#feed" },
  { label: "Produkt", href: "#produkt" },
  { label: "Sicherheit", href: "#sicherheit" },
  { label: "FAQ", href: "#angebot" },
];

export const heroProofPoints = [
  {
    value: "3 Kanäle",
    label: "Kanalgenaue Drafts",
  },
  {
    value: "0 Auto-Posts",
    label: "Freigabe bleibt Pflicht",
  },
  {
    value: "1 OS",
    label: "Ein Flow bis Review",
  },
];

export const contentMoments = [
  "Meetings",
  "Projekte",
  "Events",
  "Produktupdates",
  "Team-Momente",
  "Client Success",
];

export const aiWorkflowSteps = [
  {
    step: "01",
    label: "Detect",
    title: "Content-Chancen erkennen",
    copy: "NovaIQ scannt Signale aus Projekten, Meetings und Updates und erkennt, was erzählenswert ist.",
    metric: "Opportunity erkannt",
  },
  {
    step: "02",
    label: "Idea",
    title: "Post-Ideen vorbereiten",
    copy: "Aus Rohmaterial entstehen Hook, Angle und Kanalidee, bevor Ihr Team auf eine leere Seite schaut.",
    metric: "3 Varianten",
  },
  {
    step: "03",
    label: "Approve",
    title: "Brand-sicher freigeben",
    copy: "Tonalität, No-Gos und Rollen bleiben sichtbar. Jeder Beitrag wartet auf Entscheidung.",
    metric: "Human Gate",
  },
  {
    step: "04",
    label: "Publish",
    title: "Geplant veröffentlichen",
    copy: "Freigegebene Posts wandern in die Queue für LinkedIn, Instagram und Facebook.",
    metric: "Ready",
  },
];

export const productOpportunities = [
  {
    source: "Sales Call",
    title: "Kunde beschreibt neuen Use Case",
    channel: "LinkedIn",
    score: "96%",
    status: "Idee bereit",
  },
  {
    source: "Projektupdate",
    title: "Go-live Moment mit Teamfoto",
    channel: "Instagram",
    score: "91%",
    status: "Review",
  },
  {
    source: "Founder Note",
    title: "Positionierung aus internem Memo",
    channel: "LinkedIn",
    score: "88%",
    status: "Entwurf",
  },
];

export const platformPreviews = {
  LinkedIn: {
    hook: "Was B2B-Content wirklich skalierbar macht",
    body: "Nicht mehr Ideen. Sondern ein System, das relevante Momente erkennt, sauber übersetzt und kontrolliert freigibt.",
    status: "Review erforderlich",
  },
  Instagram: {
    hook: "Aus Projektalltag wird Marke",
    body: "Ein Teamfoto, ein Satz aus dem Meeting, ein sichtbarer Fortschritt. NovaIQ macht daraus ein Carousel mit Haltung.",
    status: "Design Review",
  },
  Facebook: {
    hook: "Projektmoment vorbereitet",
    body: "Ein kurzer Einblick aus dem Unternehmen, verständlich formuliert und bereit für die Freigabe.",
    status: "Planbar",
  },
};

export const approvalPrinciples = [
  "Posts werden vorbereitet, nicht ungefragt veröffentlicht.",
  "Jeder Beitrag bleibt vor Veröffentlichung freigabepflichtig.",
  "Brand Voice, Rollen und Status bleiben nachvollziehbar.",
];

export const problemPoints = [
  {
    kicker: "Material",
    title: "Es gibt genug Stoff.",
    copy: "Fotos, Notizen, Clips und Kundensätze entstehen jeden Tag. Nur werden sie selten zu Beiträgen.",
  },
  {
    kicker: "Kontext",
    title: "Der Zusammenhang fehlt.",
    copy: "Die Quelle liegt im Chat, das Bild im Drive, die Aussage im Kopf des Teams.",
  },
  {
    kicker: "Takt",
    title: "Der Feed bleibt leiser als das Unternehmen.",
    copy: "Nicht wegen zu wenig Content. Sondern weil niemand Zeit hat, ihn sauber zu übersetzen.",
  },
];

export const workflowSteps = [
  {
    step: "01",
    label: "Capture",
    title: "Rohsignal rein.",
    copy: "Bilder, Clips und Stichpunkte landen in einem Brief statt im nächsten Chatverlauf.",
    signal: "Quelle gesichert",
  },
  {
    step: "02",
    label: "Brand Sense",
    title: "Kontext wird lesbar.",
    copy: "NovaIQ erkennt Anlass, Zielgruppe, Ton und No-Gos, bevor ein Wort geschrieben wird.",
    signal: "94% Brand Fit",
  },
  {
    step: "03",
    label: "Draft Desk",
    title: "Vorschläge entstehen.",
    copy: "LinkedIn, Instagram und Facebook bekommen eigene Hooks, Captions und Varianten.",
    signal: "3 Kanäle",
  },
  {
    step: "04",
    label: "Human Gate",
    title: "Menschen geben frei.",
    copy: "Status, Feedback und Planung bleiben sichtbar. Keine Veröffentlichung ohne Entscheidung.",
    signal: "Review Pflicht",
  },
];

export const postSuggestions = {
  LinkedIn: [
    {
      hook: "Launchmoment mit Substanz",
      body: "Neue Website vorgestellt, Teamfeedback gesichert, nächste Inhalte geplant. Aus dem Go-live wird ein sichtbarer Kommunikationsmoment.",
      meta: "Management + Marketing",
      score: "94%",
    },
    {
      hook: "Positionierung statt Projektabschluss",
      body: "Ein Weblaunch ist nicht nur Technik. Es geht um Struktur, Sprache und klarere Sichtbarkeit im Markt.",
      meta: "Strategisch",
      score: "88%",
    },
    {
      hook: "Teamfeedback als Signal",
      body: "Feedback, Bilder, O-Ton: genau daraus entsteht B2B-Kommunikation, bevor sie im Feed sichtbar wird.",
      meta: "Behind the scenes",
      score: "86%",
    },
  ],
  Instagram: [
    {
      hook: "Launch-Tag bei Kayserberg",
      body: "Neue Website, ehrliches Feedback, kleine Details. Der Moment ist schon da.",
      meta: "Kurz + visuell",
      score: "91%",
    },
    {
      hook: "Aus Strategie wird Oberfläche",
      body: "Struktur, Design, Auftritt. Aus Arbeit wird ein Bild, das geteilt werden kann.",
      meta: "Carousel geeignet",
      score: "87%",
    },
    {
      hook: "Projektmoment statt Archivbild",
      body: "Ein Foto. Eine Notiz. Ein Anlass. Mehr braucht ein guter Post oft nicht.",
      meta: "Behind the scenes",
      score: "84%",
    },
  ],
  Facebook: [
    {
      hook: "Projektupdate",
      body: "Neue Website vorgestellt, Feedback gesammelt, nächste Schritte besprochen.",
      meta: "Community Update",
      score: "89%",
    },
    {
      hook: "Danke an das Projektteam",
      body: "Ein guter Termin mit ehrlichem Feedback und vielen Details. Danke an alle Beteiligten.",
      meta: "Wertschätzend",
      score: "85%",
    },
    {
      hook: "Nächster Schritt vorbereitet",
      body: "Website live, Inhalte geplant, Kommunikationsstrecke vorbereitet.",
      meta: "Planung",
      score: "83%",
    },
  ],
};

export const demoSignals = [
  { label: "Quelle", value: "Drehnotiz + 3 Projektbilder" },
  { label: "Brand Voice", value: "Klar, sachlich, mit Haltung" },
  { label: "Freigabe", value: "Marketing Lead vor Planung" },
];

export const demoOutcomes = [
  "Briefing aus Rohmaterial",
  "Kanalvarianten statt Kopien",
  "Review Gate vor Planung",
];

export const marqueeLines = [
  [
    "Field Notes",
    "Brand Voice",
    "Review Gate",
    "Content Queue",
    "LinkedIn Drafts",
  ],
  [
    "Projektbilder",
    "Drehmomente",
    "Kundenbesuche",
    "Teamupdates",
    "Launchsignale",
  ],
];

export const videoScenes = {
  hero: {
    eyebrow: "Live Signal Film",
    label: "Company moments",
    title: "Review bleibt menschlich.",
    src: "https://assets.mixkit.co/videos/46443/46443-720.mp4",
    mobileSrc: "https://assets.mixkit.co/videos/46443/46443-360.mp4",
    poster: "https://assets.mixkit.co/videos/46443/46443-thumb-720-0.jpg",
    source: "Mixkit placeholder",
  },
  capture: {
    eyebrow: "Capture",
    label: "Raw material",
    title: "Material landet im System.",
    src: "https://assets.mixkit.co/videos/8766/8766-720.mp4",
    mobileSrc: "https://assets.mixkit.co/videos/8766/8766-360.mp4",
    poster: "https://assets.mixkit.co/videos/8766/8766-thumb-720-1.jpg",
    source: "Mixkit placeholder",
  },
  workspace: {
    eyebrow: "Workspace",
    label: "Draft desk",
    title: "Ein Draft entsteht.",
    src: "https://assets.mixkit.co/videos/9756/9756-720.mp4",
    mobileSrc: "https://assets.mixkit.co/videos/9756/9756-360.mp4",
    poster: "https://assets.mixkit.co/videos/9756/9756-thumb-720-0.jpg",
    source: "Mixkit placeholder",
  },
  network: {
    eyebrow: "Signal map",
    label: "Context engine",
    title: "Kontext wird gelesen.",
    src: "https://assets.mixkit.co/videos/31590/31590-720.mp4",
    mobileSrc: "https://assets.mixkit.co/videos/31590/31590-360.mp4",
    poster: "https://assets.mixkit.co/videos/31590/31590-thumb-720-0.jpg",
    source: "Mixkit placeholder",
  },
};

export const stockImageScenes = [
  {
    label: "Team Moment",
    title: "Ein echter Austausch, der normalerweise im Alltag verschwindet.",
    metric: "Meeting Signal",
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    source: "Unsplash placeholder",
  },
  {
    label: "Workspace",
    title: "Notizen, Screens und Kontext werden zum verwertbaren Briefing.",
    metric: "Context Brief",
    src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    source: "Unsplash placeholder",
  },
  {
    label: "Digital Desk",
    title: "Aus Oberfläche und Fortschritt entsteht ein kanalgenauer Draft.",
    metric: "Draft Ready",
    src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    source: "Unsplash placeholder",
  },
];

export const mediaStory = [
  {
    step: "01",
    title: "Rohmaterial wird sichtbar.",
    copy: "Clips und Notizen werden zu Signalen.",
    metric: "Assets rein",
    scene: videoScenes.capture,
  },
  {
    step: "02",
    title: "Kontext wird gelesen.",
    copy: "Anlass, Zielgruppe und Ton werden klar.",
    metric: "Brand Sense",
    scene: videoScenes.network,
  },
  {
    step: "03",
    title: "Ein Draft entsteht.",
    copy: "Hook und Kanalidee entstehen aus echtem Material.",
    metric: "Draft Desk",
    scene: videoScenes.workspace,
  },
  {
    step: "04",
    title: "Freigabe bleibt menschlich.",
    copy: "Das System wartet auf Review.",
    metric: "Human Gate",
    scene: videoScenes.hero,
  },
];

export const motionStoryPanels = [
  {
    step: "01",
    label: "Capture",
    title: "Moment rein.",
    copy: "Foto, Clip, Sprachnotiz. NovaIQ sichert das Signal.",
    metric: "03 Assets",
    tags: ["Quelle erkannt", "Kontext ergänzt"],
  },
  {
    step: "02",
    label: "Brand Sense",
    title: "Marke verstehen.",
    copy: "Ton, Zielgruppe und No-Gos kommen vor dem Entwurf.",
    metric: "94% Fit",
    tags: ["nicht werblich", "B2B-klar"],
  },
  {
    step: "03",
    label: "Draft Desk",
    title: "Kanäle bauen.",
    copy: "LinkedIn bekommt Tiefe. Instagram Verdichtung. Facebook Nähe.",
    metric: "3 Kanäle",
    tags: ["Hook", "Variante", "Kanalgefühl"],
  },
  {
    step: "04",
    label: "Human Gate",
    title: "Freigabe halten.",
    copy: "Planung passiert erst, wenn das Team entscheidet.",
    metric: "Review",
    tags: ["Rollen", "Freigabe", "Planung"],
  },
];

export const cinematicScenes = [
  {
    chapter: "Scene 01",
    eyebrow: "Signal Capture",
    title: "Alles beginnt im Unternehmen.",
    copy: "Ein Projektmoment wird zum Field Signal.",
    stat: "3 Quellen",
    detail: "Chat, Drive, Kamerarolle",
    tags: ["Moment erkannt", "Quelle gesichert", "Brief angelegt"],
  },
  {
    chapter: "Scene 02",
    eyebrow: "Context Engine",
    title: "Das System liest Kontext.",
    copy: "Anlass, Zielgruppe, Tonalität und No-Gos werden sichtbar.",
    stat: "94% Fit",
    detail: "Brand Voice aktiv",
    tags: ["Tonalität", "Zielgruppe", "No-Gos"],
  },
  {
    chapter: "Scene 03",
    eyebrow: "Draft Cinema",
    title: "Jeder Kanal bekommt eine Richtung.",
    copy: "NovaIQ macht Varianten, keine Kopien.",
    stat: "3 Kanäle",
    detail: "LinkedIn, Instagram, Facebook",
    tags: ["Hook", "Caption", "Variante"],
  },
  {
    chapter: "Scene 04",
    eyebrow: "Human Gate",
    title: "Der letzte Schritt bleibt menschlich.",
    copy: "Review, Feedback und Planung bleiben kontrolliert.",
    stat: "0 Auto-Posts",
    detail: "Freigabe bleibt Pflicht",
    tags: ["Review", "Rollen", "Queue"],
  },
];

export const toneOptions = ["Professionell", "Locker", "Mutig", "Technisch"];

export const approvalStates = ["Entwurf", "Review", "Geplant"];

export const benefits = [
  {
    value: "01",
    title: "Der Feed bekommt Rhythmus",
    copy: "Mehr Sichtbarkeit aus Momenten, die ohnehin entstehen.",
  },
  {
    value: "02",
    title: "Rohmaterial wird verwertbar",
    copy: "Aus Bild und Notiz wird Brief, Hook und Kanalidee.",
  },
  {
    value: "03",
    title: "Die Marke bleibt hörbar",
    copy: "Vorschläge bleiben nah an Ton, Zielgruppe und No-Gos.",
  },
  {
    value: "04",
    title: "Abstimmung wird sichtbar",
    copy: "Status, Varianten und Feedback hängen am Beitrag.",
  },
  {
    value: "05",
    title: "Der erste Entwurf steht schneller",
    copy: "Marketing startet mit Substanz statt leerer Seite.",
  },
  {
    value: "06",
    title: "Mehr Wert aus vorhandenen Assets",
    copy: "Stories bleiben nicht im Drive, Chat oder Smartphone liegen.",
  },
];

export const securityItems = [
  "Keine automatische Veröffentlichung ohne Freigabe",
  "Rollen, Status und Review bleiben sichtbar",
  "Vorschläge sind editierbar, nicht endgültig",
  "Menschliche Entscheidung vor Planung",
];

export const useCases = [
  {
    title: "Messen",
    copy: "Standmomente werden zu täglichen Updates.",
    accent: "cyan",
  },
  {
    title: "Baustellen & Projekte",
    copy: "Fortschritt wird verständlich erzählbar.",
    accent: "acid",
  },
  {
    title: "Videodrehs",
    copy: "Behind the scenes wird direkt verwertbar.",
    accent: "violet",
  },
  {
    title: "Kundenbesuche",
    copy: "Notizen und Bilder werden zu Einblicken.",
    accent: "signal",
  },
  {
    title: "Produktlaunches",
    copy: "Features und Stimmen werden kanalgenau.",
    accent: "cyan",
  },
  {
    title: "Employer Branding",
    copy: "Alltag zeigt Kultur ohne Kampagnenton.",
    accent: "acid",
  },
  {
    title: "Behind the Scenes",
    copy: "Prozesse und Details werden sichtbar.",
    accent: "violet",
  },
  {
    title: "Management Updates",
    copy: "Gedanken werden schneller zu klaren Posts.",
    accent: "signal",
  },
];

export const pilotQualifiers = [
  "Marketingteam mit wiederkehrenden Content-Anlässen",
  "Bestehende Bilder, Clips, Notizen oder Projektupdates",
  "Klare Freigabewege statt automatischer Veröffentlichung",
];

export const systemTimeline = [
  {
    time: "09:30",
    label: "Kundentermin erkannt",
    title: "Aus Gespräch wird Content-Chance",
    copy: "Ein Moment wird erkannt und eingeordnet.",
    status: "Opportunity",
  },
  {
    time: "11:00",
    label: "Asset hochgeladen",
    title: "Bild, Notiz und Kontext verbunden",
    copy: "Quelle und Brand Voice werden verbunden.",
    status: "Briefing",
  },
  {
    time: "13:20",
    label: "Post vorgeschlagen",
    title: "Kanalidee statt leerer Seite",
    copy: "Jeder Kanal bekommt eine eigene Richtung.",
    status: "Draft",
  },
  {
    time: "15:10",
    label: "Freigabe wartet",
    title: "Automatisiert vorbereitet. Menschlich freigegeben.",
    copy: "Der Beitrag stoppt sauber vor dem Gate.",
    status: "Approval",
  },
];

export const manifestoLines = [
  {
    lead: "Content entsteht nicht im Meeting.",
    accent: "Content entsteht im Alltag.",
  },
  {
    lead: "NovaIQ erkennt ihn.",
    accent: "Bevor er im Feed fehlt.",
  },
  {
    lead: "Aus Alltag wird Content.",
    accent: "Aus Content wird Sichtbarkeit.",
  },
];

export const industryUseCases = [
  {
    industry: "Industrie",
    signal: "Messekalender + Standfoto",
    title: "Messepost aus echtem Vertriebsalltag",
    copy: "NovaIQ erkennt relevante Messe-Momente, verdichtet sie zu LinkedIn-Updates und hält die Freigabe beim Marketing.",
    output: "12 Chancen gefunden",
  },
  {
    industry: "Hochschule",
    signal: "Event, Vortrag, Alumni-Zitat",
    title: "Eventrückblick ohne leere Seite",
    copy: "Aus Veranstaltungsmaterial entstehen Carousel-Ideen, kurze Recaps und Posts für mehrere Zielgruppen.",
    output: "3 Zielgruppen",
  },
  {
    industry: "Agentur",
    signal: "Kundenprojekt + Teamnotiz",
    title: "Projektarbeit wird sichtbar",
    copy: "Cases, Learnings und Behind-the-Scenes werden vorbereitet, ohne dass das Team jedes Mal neu briefen muss.",
    output: "Case Draft",
  },
  {
    industry: "Handwerk",
    signal: "Baustellenfoto + Fortschritt",
    title: "Baustellenupdate mit professioneller Stimme",
    copy: "NovaIQ macht aus Fortschritt, Material und Teamleistung einen Post, der nicht nach Werbung klingt.",
    output: "Ready for Review",
  },
];

export const selectedSystems = [
  {
    name: "Messe Content System",
    tags: ["Industrie", "LinkedIn", "Event"],
    copy: "Aus Kalendertermin, Standfoto und Vertriebsnotiz entsteht ein sichtbarer Messe-Workflow mit täglichen Post-Vorschlägen.",
    signal: "09:30 Messekalender aktualisiert",
    output: "12 Chancen gefunden",
  },
  {
    name: "Thought Leadership Engine",
    tags: ["Founder", "Brand Voice", "Review"],
    copy: "Interne Gedanken, Kundenfragen und strategische Notizen werden zu LinkedIn-Posts mit klarer Positionierung.",
    signal: "11:40 Founder Note erkannt",
    output: "3 Hooks vorbereitet",
  },
  {
    name: "Recruiting Content Loop",
    tags: ["HR", "Instagram", "Team"],
    copy: "Team-Momente, Office-Alltag und Projektfortschritt werden in Arbeitgeberkommunikation übersetzt, ohne Kampagnenton.",
    signal: "14:15 Teamfoto hochgeladen",
    output: "Carousel im Review",
  },
  {
    name: "Client Success Feed",
    tags: ["Sales", "Case", "Facebook"],
    copy: "Kundenfeedback, Go-live-Momente und Projektergebnisse werden als Social Proof verwertbar gemacht.",
    signal: "16:05 Kundenfeedback markiert",
    output: "Case Draft ready",
  },
];

export const bentoFeatures = [
  {
    title: "Kalender-Erkennung",
    copy: "Termine, Events und Launches werden als Content-Signale sichtbar.",
    metric: "Live Signals",
    size: "large",
  },
  {
    title: "Brand Voice",
    copy: "Tonalität, No-Gos und Zielgruppen bleiben im System.",
    metric: "96% Fit",
    size: "medium",
  },
  {
    title: "Multi-Channel Drafts",
    copy: "Ein Anlass, drei Plattformlogiken.",
    metric: "3 Channels",
    size: "medium",
  },
  {
    title: "Review Rollen",
    copy: "Marketing, Geschäftsführung und Fachbereiche arbeiten im selben Freigabeprozess.",
    metric: "Human Gate",
    size: "small",
  },
  {
    title: "Content Archiv",
    copy: "Chancen bleiben auffindbar, auch wenn der Moment vorbei ist.",
    metric: "Memory",
    size: "small",
  },
  {
    title: "Analytics Loop",
    copy: "Erkenntnisse fließen zurück in die nächsten Vorschläge.",
    metric: "Learning",
    size: "small",
  },
];

export const feedTransform = {
  before: [
    "Keine Idee für diese Woche",
    "Projektfoto liegt im Chat",
    "Freigabe unklar",
  ],
  after: [
    "12 Content Opportunities found",
    "LinkedIn-Post vorbereitet",
    "Review Gate aktiv",
  ],
};

export const offerPlans = [
  {
    name: "Pilot",
    copy: "Für Teams, die NovaIQ mit echten Content-Signalen testen wollen.",
    detail: "30 Tage Setup, Brand Voice, erster Workflow",
  },
  {
    name: "Growth",
    copy: "Für Marketingteams mit regelmäßigem Content-Bedarf.",
    detail: "Mehrere Kanäle, Rollen, Content Queue",
  },
  {
    name: "Enterprise",
    copy: "Für Standorte, Fachbereiche und komplexe Freigabeprozesse.",
    detail: "Custom Workflows, Governance, Team-Struktur",
  },
];

export const faqItems = [
  {
    question: "Postet NovaIQ automatisch?",
    answer:
      "Nein. NovaIQ bereitet Beiträge vor und wartet auf Freigabe. Veröffentlichung bleibt bewusst kontrolliert.",
  },
  {
    question: "Kann NovaIQ unsere Brand Voice lernen?",
    answer:
      "Ja. Tonalität, No-Gos, Zielgruppen und Freigabeanforderungen werden im Workflow berücksichtigt.",
  },
  {
    question: "Funktioniert es mit LinkedIn, Instagram und Facebook?",
    answer:
      "Ja. NovaIQ erzeugt kanalgenaue Vorschläge statt einen Text für alle Plattformen.",
  },
  {
    question: "Können mehrere Teammitglieder freigeben?",
    answer:
      "Ja. Rollen, Status und Review-Schritte sind so gedacht, dass Marketing und Fachbereiche zusammenarbeiten können.",
  },
  {
    question: "Wie startet ein Pilotprojekt?",
    answer:
      "Wir starten mit echten Quellen, definieren Brand Voice und bauen einen ersten wiederholbaren Content-Workflow auf.",
  },
];
