"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";
import Magnetic from "@/components/Magnetic";
import { REVEAL_EVENT } from "@/components/sections/Preloader";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const el = ref.current;
      if (!el) return;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const intro = contextSafe!(() => {
        if (reduced) {
          gsap.set(".hero-copy, .hero-scroll", { opacity: 1 });
          return;
        }
        gsap.fromTo(
          ".hero-img",
          { scale: 1.1 },
          { scale: 1.03, duration: 2.2, ease: "power2.out" },
        );

        SplitText.create(".hero-title", {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.fromTo(
              self.lines,
              { yPercent: 115 },
              {
                yPercent: 0,
                duration: 1.1,
                stagger: 0.09,
                ease: "power4.out",
                delay: 0.1,
              },
            ),
        });

        gsap.fromTo(
          ".hero-copy",
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.9, delay: 0.65, ease: "power3.out" },
        );
        gsap.fromTo(
          ".hero-scroll",
          { opacity: 0 },
          { opacity: 1, duration: 0.8, delay: 1.2, ease: "power2.out" },
        );
      });

      let fired = false;
      const onReveal = contextSafe!(() => {
        if (fired) return;
        fired = true;
        intro();
      });
      window.addEventListener(REVEAL_EVENT, onReveal);
      const fallback = window.setTimeout(onReveal, 2600);

      if (!reduced) {
        gsap.to(".hero-img", {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.to(".hero-content", {
          yPercent: -12,
          opacity: 0.3,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom 30%",
            scrub: true,
          },
        });
      }

      return () => {
        window.removeEventListener(REVEAL_EVENT, onReveal);
        window.clearTimeout(fallback);
      };
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex h-svh min-h-[600px] flex-col justify-end overflow-hidden bg-carbon"
    >
      <div className="hero-img absolute inset-0 will-change-transform">
        <Image
          src="/images/hero-towers.jpg"
          alt="Torres corporativas del distrito financiero vistas desde abajo"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="hero-content container-x relative z-10 pb-14 md:pb-20">
        <h1 className="hero-title mb-5 max-w-[20ch] font-display text-[clamp(1.8rem,3.3vw,3.2rem)] font-semibold leading-[1.14] tracking-tight text-white">
          <span className="text-ember">Tu empresa necesita capital.</span>{" "}
          <span className="text-white">Nosotros sabemos cómo conseguirlo.</span>
        </h1>

        <p className="hero-copy mb-8 max-w-xl text-[15px] leading-relaxed text-white/85 md:text-base">
          Analizamos tu empresa, estructuramos tu solicitud y te conectamos con
          bancos, fondos y fintechs alineados a lo que realmente necesitas.
        </p>

        <div className="hero-copy">
          <Magnetic>
            <a
              href="#contacto"
              className="inline-block rounded-full bg-ember px-7 py-4 text-base font-semibold text-paper transition-colors hover:bg-ember-deep"
            >
              Hablemos de tu financiamiento
            </a>
          </Magnetic>
        </div>
      </div>

      <div className="hero-scroll pointer-events-none absolute bottom-6 right-6 hidden items-center gap-3 md:flex">
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/60">
          Scroll
        </span>
        <span className="relative block h-10 w-px overflow-hidden bg-white/25">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollhint_1.6s_ease-in-out_infinite] bg-white" />
        </span>
      </div>
    </section>
  );
}
