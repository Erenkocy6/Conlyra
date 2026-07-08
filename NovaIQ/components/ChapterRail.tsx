"use client";

import { useEffect, useState } from "react";
import { chapterItems } from "@/data/landing";
import { cn } from "@/lib/utils";

export function ChapterRail() {
  const [active, setActive] = useState(chapterItems[0]?.href ?? "#top");

  useEffect(() => {
    const sections = chapterItems
      .map((item) => document.querySelector(item.href))
      .filter((section): section is Element => section !== null);

    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActive(`#${visible.target.id}`);
        }
      },
      {
        rootMargin: "-42% 0px -42% 0px",
        threshold: [0, 0.2, 0.45, 0.7],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <aside
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 items-center gap-4 xl:flex"
      aria-label="Seitenkapitel"
    >
      <div className="relative h-56 w-px overflow-hidden rounded-full bg-white/12">
        <div
          className="h-full w-full origin-top rounded-full bg-acid"
          style={{ transform: "scaleY(var(--scroll-progress))" }}
        />
      </div>
      <nav className="flex flex-col gap-2">
        {chapterItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            data-cursor-label={item.label}
            className={cn(
              "group flex items-center gap-2 text-[0.68rem] font-bold uppercase transition-colors duration-300",
              active === item.href ? "text-paper" : "text-paper/32",
            )}
          >
            <span
              className={cn(
                "h-px transition-all duration-300",
                active === item.href ? "w-7 bg-acid" : "w-3 bg-paper/24",
              )}
            />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
}
