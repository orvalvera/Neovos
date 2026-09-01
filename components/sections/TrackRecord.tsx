"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";

const STATS = [
  {
    value: 30,
    suffix: "+",
    label: "Años en el sector financiero",
    body: "Conocemos cómo deciden los comités de crédito porque venimos de ahí.",
  },
  {
    value: 20,
    suffix: "+",
    label: "Alianzas — bancos y fintechs",
    body: "Opciones de fondeo en México y el extranjero para cada tipo de necesidad.",
  },
];

export default function TrackRecord() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduced) return;

      gsap.fromTo(
        ".tr-copy",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".tr-copy", start: "top 80%" },
        }
      );

      gsap.utils.toArray<HTMLElement>(".tr-num").forEach((num) => {
        const value = Number(num.dataset.value ?? 0);
        const obj = { n: 0 };
        gsap.to(obj, {
          n: value,
          duration: 1.6,
          ease: "power2.out",
          snap: { n: 1 },
          onUpdate: () => {
            num.textContent = String(Math.round(obj.n));
          },
          scrollTrigger: { trigger: num, start: "top 85%", once: true },
        });
      });

      gsap.fromTo(
        ".tr-card",
        { opacity: 0, y: 34 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".tr-grid", start: "top 80%" },
        }
      );

      // Slow parallax inside the photo
      gsap.fromTo(
        ".tr-photo",
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: ".tr-grid",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="nosotros" className="py-[12vh] scroll-mt-20">
      <div className="container-x">
        <div className="tr-copy mb-14 grid gap-8 md:grid-cols-2 md:items-end">
          <div>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.28em] text-ember">
              Nuestro enfoque
            </p>
            <h2 className="max-w-[16ch] font-display text-[clamp(1.7rem,3.4vw,2.9rem)] font-bold leading-[1.1] tracking-tight text-theme">
              Trabajamos contigo, no para las financieras.
            </h2>
          </div>
          <p className="max-w-md text-lg leading-relaxed text-theme-muted md:justify-self-end">
            Buscamos tus intereses. Analizamos cada opción disponible
            protegiendo tus finanzas y tus activos, y encontramos la que mejor
            se acomoda a tus necesidades.
          </p>
        </div>

        <div className="tr-grid grid gap-4 md:grid-cols-[1fr_1.5fr]">
          <div className="flex flex-col gap-4">
            {STATS.map((s, i) => (
              <div
                key={i}
                className="tr-card flex flex-1 flex-col justify-between rounded-3xl bg-carbon p-8 md:p-10"
              >
                <span className="font-display text-6xl font-extrabold tracking-tight text-paper md:text-7xl">
                  <span className="tr-num" data-value={s.value}>
                    0
                  </span>
                  <span className="text-ember">{s.suffix}</span>
                </span>
                <div className="mt-8">
                  <p className="mb-2 text-lg font-bold text-paper">{s.label}</p>
                  <p className="text-base leading-relaxed text-ash">{s.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="tr-card relative min-h-[340px] overflow-hidden rounded-3xl md:min-h-[560px]">
            <div className="tr-photo absolute -inset-y-[10%] inset-x-0">
              <Image
                src="/images/handshake.jpg"
                alt="Cierre de un acuerdo de financiamiento con un apretón de manos"
                fill
                sizes="(min-width: 768px) 60vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
