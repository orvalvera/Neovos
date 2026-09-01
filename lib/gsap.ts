"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin, SplitText);

if (typeof window !== "undefined") {
  // Exposed for debugging/QA tooling
  (window as unknown as Record<string, unknown>).gsap = gsap;
  (window as unknown as Record<string, unknown>).ScrollTrigger = ScrollTrigger;
}

export { gsap, useGSAP, ScrollTrigger, SplitText };

export const EASE_OUT = "power3.out";
export const EASE_INOUT = "power3.inOut";

export const THEME = {
  light: {
    "--bg": "#ffffff",
    "--fg": "#0f0e0c",
    "--fg-muted": "#78746c",
    "--hairline": "rgba(15, 14, 12, 0.14)",
    "--logo-invert": 0,
  },
  dark: {
    "--bg": "#121110",
    "--fg": "#fafaf8",
    "--fg-muted": "#a3a099",
    "--hairline": "rgba(250, 250, 248, 0.16)",
    "--logo-invert": 1,
  },
} as const;

/**
 * Morph the whole page between light and dark as a section enters/leaves.
 * Attach to a section that "owns" a dark stretch of the page.
 */
export function createThemeTrigger(section: Element) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const toTheme = (theme: keyof typeof THEME) =>
    gsap.to(document.body, {
      ...THEME[theme],
      duration: reduced ? 0 : 0.7,
      ease: "power2.inOut",
      overwrite: "auto",
    });

  return ScrollTrigger.create({
    trigger: section,
    start: "top 55%",
    end: "bottom 55%",
    onEnter: () => toTheme("dark"),
    onEnterBack: () => toTheme("dark"),
    onLeave: () => toTheme("light"),
    onLeaveBack: () => toTheme("light"),
  });
}
