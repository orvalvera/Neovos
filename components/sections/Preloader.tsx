"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";

export const REVEAL_EVENT = "neovos:reveal";
const VISITED_KEY = "neovos-visited";

export default function Preloader() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const done = () => {
        sessionStorage.setItem(VISITED_KEY, "1");
        window.dispatchEvent(new Event(REVEAL_EVENT));
      };

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (sessionStorage.getItem(VISITED_KEY) || reduced) {
        gsap.set(el, { display: "none" });
        done();
        return;
      }

      document.documentElement.style.overflow = "hidden";

      const tl = gsap.timeline({
        onComplete: () => {
          document.documentElement.style.overflow = "";
          gsap.set(el, { display: "none" });
        },
      });

      tl.fromTo(
        ".pl-logo",
        { opacity: 0, scale: 0.82, y: 14 },
        { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.1 }
      )
        .fromTo(
          ".pl-tag",
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.35"
        )
        .add(done, "+=0.4")
        .to(el, {
          yPercent: -100,
          duration: 0.85,
          ease: "power4.inOut",
        });
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
    >
      <Image
        src="/images/neovos-logo.png"
        alt=""
        width={120}
        height={128}
        priority
        className="pl-logo h-24 w-auto md:h-28"
      />
      <p className="pl-tag mt-6 font-mono text-xs uppercase tracking-[0.3em] text-stone">
        Asesoría financiera independiente
      </p>
    </div>
  );
}
