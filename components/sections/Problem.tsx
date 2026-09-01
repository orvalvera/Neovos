"use client";

import { useRef } from "react";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";

const PROBLEMS = [
  {
    n: "01",
    title: "Solicitudes incompletas",
    body: "Se pide capital sin ordenar estados financieros, flujo, garantías ni la narrativa que el fondeador necesita leer.",
    icon: (
      <svg viewBox="0 0 32 32" className="size-9" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M8 4 h12 l6 6 v18 h-18 z M20 4 v6 h6" />
        <path d="M12 17 h8 M12 22 h5" strokeDasharray="2 3" />
      </svg>
    ),
  },
  {
    n: "02",
    title: "Fondeadores equivocados",
    body: "No todos los bancos, fondos o fintechs sirven para el mismo perfil, plazo o destino del recurso.",
    icon: (
      <svg viewBox="0 0 32 32" className="size-9" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M4 12 L16 5 L28 12 H4 Z" />
        <path d="M7 12 v10 M13 12 v10 M19 12 v10 M25 12 v10" />
        <path d="M4 22 H28 M3 26 H29" />
      </svg>
    ),
  },
  {
    n: "03",
    title: "Buró y tiempo en riesgo",
    body: "Cada intento sin estrategia quema consultas de buró y desgasta oportunidades, condiciones y credibilidad.",
    icon: (
      <svg viewBox="0 0 32 32" className="size-9" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="16" cy="17" r="10" />
        <path d="M16 11 v6 l4 3 M13 3 h6" />
      </svg>
    ),
  },
];

export default function Problem() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduced) return;

      SplitText.create(".problem-title", {
        type: "words",
        autoSplit: true,
        onSplit: (self) =>
          gsap.fromTo(
            self.words,
            { opacity: 0.14 },
            {
              opacity: 1,
              stagger: 0.05,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top 60%",
                end: "top 25%",
                scrub: 0.4,
              },
            }
          ),
      });

      gsap.fromTo(
        ".problem-sub",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".problem-sub", start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".problem-card",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".problem-grid", start: "top 80%" },
        }
      );
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="pt-[10vh] pb-[14vh]">
      <div className="container-x">
        <p className="mb-8 font-mono text-xs uppercase tracking-[0.26em] text-ember">
          Lo que casi nadie te dice
        </p>

        <div className="mb-14 grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-end">
          <h2 className="problem-title max-w-[18ch] font-display text-[clamp(1.8rem,4vw,3.3rem)] font-bold leading-[1.1] tracking-tight text-theme">
            Una mala solicitud no solo te rechaza. También te cierra puertas.
          </h2>
          <p className="problem-sub max-w-md text-base leading-relaxed text-theme-muted md:text-lg">
            La mayoría de las solicitudes no se rechazan por falta de
            solvencia, sino por cómo se presentan. Llegar al fondeador con
            urgencia y sin estrategia suele terminar igual:
          </p>
        </div>

        <div className="problem-grid grid gap-4 md:grid-cols-3">
          {PROBLEMS.map((p) => (
            <div
              key={p.n}
              className="problem-card rounded-3xl border border-hairline p-8 md:p-9"
            >
              <div className="mb-10 flex items-start justify-between">
                <span className="text-ember">{p.icon}</span>
                <span className="font-mono text-xs tracking-[0.25em] text-theme-muted">
                  {p.n}
                </span>
              </div>
              <h3 className="mb-3 font-display text-2xl font-bold tracking-tight text-theme">
                {p.title}
              </h3>
              <p className="text-base leading-relaxed text-theme-muted">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
