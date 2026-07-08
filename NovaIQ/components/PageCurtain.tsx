"use client";

import { useEffect, useState } from "react";

export function PageCurtain() {
  const [done, setDone] = useState(false);
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const hasSeenLoader = window.sessionStorage.getItem("novaiq-loader-seen") === "true";
    const doneDelay = hasSeenLoader ? 560 : 1480;
    const removeDelay = doneDelay + 780;
    const startedAt = Date.now();
    const progressTimer = window.setInterval(() => {
      const elapsed = Date.now() - startedAt;
      setProgress(Math.min(100, Math.round((elapsed / doneDelay) * 100)));
    }, 40);
    const doneTimer = window.setTimeout(() => {
      window.sessionStorage.setItem("novaiq-loader-seen", "true");
      setProgress(100);
      setDone(true);
    }, doneDelay);
    const removeTimer = window.setTimeout(() => setVisible(false), removeDelay);

    return () => {
      window.clearInterval(progressTimer);
      window.clearTimeout(doneTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className={`page-curtain${done ? " is-done" : ""}`} aria-hidden="true">
      <span />
      <span />
      <span />
      <strong>NovaIQ</strong>
      <em>{String(progress).padStart(2, "0")}</em>
    </div>
  );
}
