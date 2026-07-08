"use client";

import { usePathname } from "next/navigation";
import { ConlyraGlobalNav } from "./ConlyraGlobalNav";

export function ConlyraNavRouter() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return <ConlyraGlobalNav />;
}
