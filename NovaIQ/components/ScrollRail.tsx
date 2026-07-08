"use client";

import { useEffect, useState } from "react";

const railItems = [
  ["top", "Intro"],
  ["outcomes", "Impact"],
  ["route-atlas", "Route"],
  ["b2b", "Teams"],
  ["produkt", "Produkt"],
  ["review-room", "Review"],
  ["pilot", "Pilot"],
];

export function ScrollRail() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("top");

  useEffect(() => {
    function update() {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(maxScroll > 0 ? window.scrollY / maxScroll : 0);

      const current = railItems
        .map(([id]) => {
          const element = document.getElementById(id);
          if (!element) {
            return null;
          }

          return {
            id,
            distance: Math.abs(element.getBoundingClientRect().top - window.innerHeight * 0.28),
          };
        })
        .filter(Boolean)
        .sort((a, b) => a!.distance - b!.distance)[0];

      if (current) {
        setActive(current.id);
      }
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <aside className="scroll-rail" aria-label="Scroll Position">
      <div className="scroll-rail__line">
        <span style={{ transform: `scaleY(${progress})` }} />
      </div>
      <nav>
        {railItems.map(([id, label]) => (
          <a
            href={`/#${id}`}
            key={id}
            className={active === id ? "is-active" : undefined}
            aria-label={label}
          >
            <i aria-hidden="true" />
            <span>{label}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
}
