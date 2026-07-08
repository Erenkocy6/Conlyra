# NovaIQ media placeholders

Aktuell nutzt die Landingpage externe Mixkit-Video-Platzhalter und Unsplash-Bild-Platzhalter aus `data/landing.ts`.

Wenn eigene Videos fertig sind:

1. MP4/WebM-Dateien hier ablegen, zum Beispiel `hero-signal.mp4`.
2. Posterbilder oder Stockfotos ergänzen, zum Beispiel `hero-signal.jpg`.
3. In `data/landing.ts` bei `videoScenes` die `src`- und `poster`-Werte ersetzen:

```ts
src: "/media/hero-signal.mp4",
poster: "/media/hero-signal.jpg",
```

4. Bei `stockImageScenes` die `src`-Werte ersetzen:

```ts
src: "/media/team-moment.jpg",
```

Empfohlen:

- Hero: 12 bis 20 Sekunden Loop, 16:9, ohne Ton.
- Product Demo: kurzer Screen-Recording-Loop, 16:9.
- Story Clips: 4:5 oder 16:9, ruhig, hell genug fuer dunklen Overlay-Look.
- Bilder: echte Team-, Workspace- oder Projektmomente, keine zu generischen Symbolbilder.
- Alle Videos: komprimiert, muted-tauglich, keine harten Schnitte am Loop-Ende.
