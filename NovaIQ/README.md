# NovaIQ Website

Premium B2B-SaaS-Website für NovaIQ. Gebaut mit Next.js App Router, TypeScript, Tailwind CSS, GSAP ScrollTrigger und Lenis für die clientseitige Scroll-Orchestration. Vue und Svelte werden gezielt als Motion-Islands für TransitionGroup- und Spring-Effekte eingebunden.

## Start ohne Docker

```bash
npm install
npm run dev
```

Die Website läuft danach unter `http://localhost:3000`.

## Start mit Docker

```bash
docker compose up --build
```

Der Container startet die Next.js-App im Dev-Modus unter `http://localhost:3000`.

## Build

```bash
npm run build
npm run start
```

## Lint

```bash
npm run lint
```

## Projektstruktur

```text
app/
  globals.css       Globale Styles, Designsystem, Motion-Sicherungen
  layout.tsx        Metadata, Viewport, Root Layout
  page.tsx          Landingpage-Komposition
  produkt/          Produkt-Unterseite
  use-cases/        Use-Case-Unterseite
  pilot/            Pilot-Unterseite
components/
  SiteHeader.tsx
  SiteFooter.tsx
  AwwwardsDirector.tsx
  HorizontalRouteAtlas.tsx
  FrameworkEffects.tsx
  Header.tsx
  Hero.tsx
  ScrollScrubHero.tsx
  HeroVisual.tsx
  VideoFrame.tsx
  StockImageFrame.tsx
  MediaStorySection.tsx
  MaterialProofSection.tsx
  ProblemSection.tsx
  WorkflowSection.tsx
  ProductDemo.tsx
  Benefits.tsx
  ChapterRail.tsx
  CinematicWalkthrough.tsx
  SecuritySection.tsx
  HorizontalStory.tsx
  KineticMarquee.tsx
  UseCases.tsx
  EarlyAccess.tsx
  FinalCTA.tsx
  Footer.tsx
  MagneticButton.tsx
  RevealText.tsx
  SmoothHashNavigation.tsx
data/
  landing.ts        Content- und Section-Daten
lib/
  utils.ts          Kleine Utilities
public/
  robots.txt
  site.webmanifest
```

## Hinweise

- Animationen respektieren `prefers-reduced-motion`.
- GSAP und Lenis werden nur in Client-Komponenten geladen.
- Die Demo ist bewusst fake, aber interaktiv und realistisch aufgebaut.
- Impressum und Datenschutz sind Platzhalterlinks und sollten vor Veröffentlichung ersetzt werden.
