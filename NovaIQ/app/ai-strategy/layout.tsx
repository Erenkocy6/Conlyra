import type { ReactNode } from "react";
import { ConlyraGlobalNav } from "@/components/ConlyraGlobalNav";

export default function AiStrategyLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ConlyraGlobalNav />
      {children}
    </>
  );
}
