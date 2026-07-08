import Link from "next/link";
import { NovaSignalCore } from "@/components/NovaSignalCore";

type SiteFooterProps = {
  topHref?: string;
};

const footerLinks = [
  ["Produkt", "/#produkt"],
  ["Automationen", "/#automationen"],
  ["Kontakt", "/#kontakt"],
];

export function SiteFooter({ topHref = "#top" }: SiteFooterProps) {
  return (
    <footer className="final-footer">
      <div className="final-footer__bg" data-footer-orbit aria-hidden="true" />
      <NovaSignalCore className="footer-signal-core" intensity="footer" />
      <div className="final-footer__wordmark" aria-hidden="true">
        NovaIQ
      </div>
      <div className="section-inner final-footer__inner">
        <div className="final-footer__grid">
          <div>
            <p className="eyebrow">NovaIQ / AI Agents</p>
            <h2 data-footer-word>
              Arbeit, die sich <em>automatisiert.</em>
            </h2>
            <div className="final-footer__actions">
              <Link className="button button-primary" href="/#kontakt" data-cursor-label="start call">
                Erstgespräch sichern
              </Link>
              <a
                className="button button-secondary"
                href="mailto:hello@novaiq.ai"
                data-cursor-label="send mail"
              >
                hello@novaiq.ai
              </a>
            </div>
          </div>

          <nav className="final-footer__nav" aria-label="Footer Navigation">
            {footerLinks.map(([label, href]) => (
              <Link key={href} href={href} data-cursor-label={label}>
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div
          className="final-footer__finale"
          data-reveal
          data-cursor-label="final signal"
          aria-label="NovaIQ Finale"
        >
          <span>Final signal</span>
          <strong>Dein erster KI-Workflow ist näher, als dein Team denkt.</strong>
        </div>

        <div className="final-footer__bottom">
          <span>NovaIQ</span>
          <p>AI agents for marketing, support, leads and operations.</p>
          <a href={topHref} data-cursor-label="top">Zurück nach oben</a>
        </div>
      </div>
    </footer>
  );
}
