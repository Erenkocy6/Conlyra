import styles from "./ConlyraMegaFooter.module.css";

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function ConlyraMegaFooter() {
  return (
    <footer className={styles.footer} data-conlyra-mega-footer>
      <div className={styles.inner}>
        <div className={styles.topline}>
          <a className={styles.brand} href="/" aria-label="Zur CONLYRA Startseite">
            <img src="/conlyra-logo.svg" alt="CONLYRA" />
          </a>

          <p>
            AI-Agenten, private Daten und kontrollierte Workflows — verbunden zu einem System für operative Intelligenz.
          </p>

          <a className={styles.cta} href="/#contact">
            Workflow starten <Arrow />
          </a>
        </div>

        <div className={styles.wordmark} aria-hidden="true">CONLYRA</div>

        <div className={styles.bottomline}>
          <span>© 2026 CONLYRA</span>
          <nav aria-label="Footer Navigation">
            <a href="/ai-agenten">AI-Agenten</a>
            <a href="/#system">System</a>
            <a href="/#use-cases">Anwendungen</a>
            <a href="/#impact">Wirkung</a>
            <a href="/#trust">Vertrauen</a>
            <a href="/#contact">Kontakt</a>
          </nav>
          <span>GERMANY / DACH / EUROPE</span>
        </div>
      </div>
    </footer>
  );
}
