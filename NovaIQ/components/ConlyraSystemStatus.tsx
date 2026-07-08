"use client";

import { useState } from "react";
import styles from "./ConlyraSystemStatus.module.css";

type SystemItem = {
  code: string;
  label: string;
  state: "ONLINE" | "PLANNED";
  commandCode?: string;
};

const systems: SystemItem[] = [
  { code: "01", label: "AI AGENTS", state: "ONLINE", commandCode: "01" },
  { code: "02", label: "FLOW ENGINE", state: "ONLINE", commandCode: "02" },
  { code: "03", label: "PRIVATE INTELLIGENCE", state: "ONLINE", commandCode: "03" },
  { code: "04", label: "VOICE", state: "ONLINE", commandCode: "04" },
  { code: "05", label: "AI READINESS", state: "ONLINE", commandCode: "05" },
  { code: "06", label: "INTEGRATIONS", state: "ONLINE", commandCode: "06" },
  { code: "07", label: "CONTROL LAYER", state: "PLANNED" },
];

const onlineCount = systems.filter((system) => system.state === "ONLINE").length;

export function ConlyraSystemStatus() {
  const [open, setOpen] = useState(false);

  const openSystem = (commandCode?: string) => {
    if (!commandCode) return;

    setOpen(false);
    window.dispatchEvent(
      new CustomEvent("conlyra:command-center-open", {
        detail: { code: commandCode },
      }),
    );
  };

  return (
    <aside
      className={styles.status}
      data-open={open}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocusCapture={() => setOpen(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setOpen(false);
        }
      }}
    >
      <div className={styles.panel} aria-hidden={!open}>
        <header>
          <div>
            <small>CONLYRA OS / SYSTEM MAP</small>
            <strong>PRODUCT STATUS</strong>
          </div>
          <span>07 SYSTEMS</span>
        </header>

        <div className={styles.rows}>
          {systems.map((system) => {
            const interactive = Boolean(system.commandCode);

            return (
              <button
                key={system.code}
                type="button"
                className={styles.row}
                data-state={system.state}
                disabled={!interactive}
                onClick={() => openSystem(system.commandCode)}
                aria-label={
                  interactive
                    ? `${system.label} im Command Center öffnen`
                    : `${system.label} ist geplant`
                }
              >
                <small>{system.code}</small>
                <span>{system.label}</span>
                <strong><i aria-hidden="true" /> {system.state}</strong>
                <b aria-hidden="true">{interactive ? "↗" : "—"}</b>
              </button>
            );
          })}
        </div>

        <footer>
          <span>CLICK ONLINE SYSTEM TO COMMAND</span>
          <strong>{String(onlineCount).padStart(2, "0")} / {String(systems.length).padStart(2, "0")}</strong>
        </footer>
      </div>

      <button
        className={styles.trigger}
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-label="CONLYRA System Status öffnen"
      >
        <span className={styles.liveDot} aria-hidden="true" />
        <span>CONLYRA SYSTEMS</span>
        <strong>{String(onlineCount).padStart(2, "0")} / {String(systems.length).padStart(2, "0")} ONLINE</strong>
        <i aria-hidden="true">⌃</i>
      </button>
    </aside>
  );
}
