"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

const STEPS = [
  {
    title: "Diagnóstico",
    body: "Entendemos tu operación, tus números y lo que realmente necesitas, antes de proponer cualquier cosa. Sin compromiso y con total confidencialidad.",
    img: "/images/step-diagnostico.jpg",
    alt: "Análisis de indicadores financieros de la empresa",
  },
  {
    title: "Estructura",
    body: "Ordenamos tu información financiera y construimos una solicitud sólida: la historia completa que una institución necesita ver para decir que sí.",
    img: "/images/step-estructura.jpg",
    alt: "Asesores armando el expediente financiero de la empresa",
  },
  {
    title: "Conexión",
    body: "Llevamos tu solicitud únicamente a las instituciones correctas, entre más de 20 bancos y fintechs, y negociamos las condiciones a tu favor.",
    img: "/images/step-conexion.jpg",
    alt: "Reunión de negociación con una institución financiera",
  },
  {
    title: "Acompañamiento",
    body: "Estamos contigo en cada requerimiento, cada firma y cada duda, hasta que el dinero está en tu cuenta. Y seguimos ahí después.",
    img: "/images/step-acompanamiento.jpg",
    alt: "Equipo de trabajo comprometido con el proyecto",
  },
];

export default function Method() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const steps = gsap.utils.toArray<HTMLElement>(".method-step");
      steps.forEach((step, i) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => {
            if (self.isActive) setActive(i);
          },
        });

        if (!reduced) {
          gsap.fromTo(
            step,
            { opacity: 0, y: 36 },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: { trigger: step, start: "top 82%" },
            }
          );
        }
      });

      if (!reduced) {
        gsap.fromTo(
          ".method-heading",
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 75%" },
          }
        );
      }
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="metodo" className="py-[14vh] scroll-mt-20">
      <div className="container-x">
        <div className="method-heading mb-20 max-w-2xl">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.26em] text-ember">
            El método
          </p>
          <h2 className="font-display text-[clamp(1.7rem,3.4vw,2.9rem)] font-bold leading-[1.08] tracking-tight text-theme">
            Cuatro pasos entre tu empresa y su financiamiento.
          </h2>
        </div>

        <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:gap-20">
          {/* Sticky numeral */}
          <div className="hidden md:block">
            <div className="sticky top-[22vh]">
              <div className="relative h-[7.5rem] overflow-hidden font-display text-[7.5rem] font-extrabold leading-none tracking-tight">
                {STEPS.map((_, i) => (
                  <span
                    key={i}
                    className="absolute inset-0 text-ember transition-all duration-500"
                    style={{
                      opacity: active === i ? 1 : 0,
                      transform: `translateY(${(i - active) * 30}%)`,
                    }}
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                ))}
              </div>
              <div className="mt-8 h-px w-40 bg-(--hairline)">
                <div
                  className="h-px bg-ember transition-all duration-500"
                  style={{ width: `${((active + 1) / STEPS.length) * 100}%` }}
                />
              </div>
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.28em] text-theme-muted">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(STEPS.length).padStart(2, "0")} · {STEPS[active].title}
              </p>
            </div>
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-[14vh] pb-[8vh]">
            {STEPS.map((s, i) => (
              <article key={i} className="method-step max-w-xl">
                <p className="mb-5 font-mono text-sm tracking-[0.28em] text-ember md:hidden">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <div className="relative mb-8 aspect-[16/10] w-full max-w-md overflow-hidden rounded-2xl">
                  <Image
                    src={s.img}
                    alt={s.alt}
                    fill
                    sizes="(min-width: 768px) 28rem, 100vw"
                    className={`object-cover transition-all duration-700 ${
                      active === i
                        ? "scale-[1.03] grayscale-0"
                        : "scale-100 grayscale"
                    }`}
                  />
                </div>
                <h3 className="mb-4 font-display text-2xl font-bold tracking-tight text-theme md:text-3xl">
                  {s.title}
                </h3>
                <p className="text-base leading-relaxed text-theme-muted md:text-lg">
                  {s.body}
                </p>
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
