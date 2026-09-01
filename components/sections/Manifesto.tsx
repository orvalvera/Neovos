"use client";

import { useRef } from "react";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";

export default function Manifesto() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduced) return;

      SplitText.create(".manifesto-text", {
        type: "words",
        autoSplit: true,
        onSplit: (self) =>
          gsap.fromTo(
            self.words,
            { opacity: 0.14 },
            {
              opacity: 1,
              stagger: 0.06,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top 62%",
                end: "center 45%",
                scrub: 0.4,
              },
            }
          ),
      });

      gsap.fromTo(
        ".manifesto-footer",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".manifesto-footer", start: "top 85%" },
        }
      );
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="relative pb-[8vh] pt-[16vh] text-center">
      <div className="container-x flex flex-col items-center">
        <p className="mb-8 font-mono text-xs uppercase tracking-[0.3em] text-ember">
          A diferencia de la mayoría
        </p>

        <h2 className="manifesto-text max-w-[22ch] font-display text-[clamp(1.9rem,4.6vw,3.8rem)] font-bold leading-[1.12] tracking-tight text-theme">
          En Neovos no somos pasapapeles. Traducimos tu realidad al idioma de
          los fondeadores.
        </h2>

        <p className="manifesto-footer mt-10 max-w-xl text-base leading-relaxed text-theme-muted md:text-lg">
          Estructuramos tus finanzas para construir la solicitud que consigue
          el sí, y la presentamos únicamente donde tiene sentido para tu
          negocio.
        </p>
      </div>
    </section>
  );
}
