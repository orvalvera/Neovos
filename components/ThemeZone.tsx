"use client";

import { useRef } from "react";
import { useGSAP, createThemeTrigger } from "@/lib/gsap";

/**
 * Wraps the sections that live on the dark background.
 * Entering/leaving this zone morphs the whole page white ⇄ black.
 */
export default function ThemeZone({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      createThemeTrigger(ref.current);
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
