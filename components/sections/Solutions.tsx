"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const CARDS = [
  {
    title: "Estructuración financiera",
    body: "Diagnóstico completo, revisión de estados financieros, armado de expediente profesional y estrategia ante fondeadores.",
    span: "md:col-span-7",
    // Expediente ordenado con visto bueno
    icon: (
      <svg viewBox="0 0 32 32" className="size-9" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M11 4 h13 a2 2 0 0 1 2 2 v20 a2 2 0 0 1 -2 2 H11 a2 2 0 0 1 -2 -2 V6 a2 2 0 0 1 2 -2 Z" />
        <path d="M13 10 h9 M13 14 h9 M13 18 h5" />
        <circle cx="21.5" cy="21.5" r="4" />
        <path d="M19.8 21.5 l1.3 1.3 2.2 -2.6" />
        <path d="M6 8 v18 a2 2 0 0 0 2 2" strokeDasharray="2 3" />
      </svg>
    ),
  },
  {
    title: "Crédito simple y líneas revolventes",
    body: "Capital de trabajo y crecimiento con la estructura y los plazos que tu operación necesita.",
    span: "md:col-span-5",
    // Billete con signo de pesos y flujo revolvente
    icon: (
      <svg viewBox="0 0 32 32" className="size-9" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="3" y="9" width="22" height="14" rx="2" />
        <circle cx="14" cy="16" r="4" />
        <path d="M14 13.4 v5.2 M12.6 14.6 h2.1 a1.2 1.2 0 0 1 0 2.4 h-1.4 a1.2 1.2 0 0 0 0 2.4 h2.1" strokeWidth="1.1" />
        <path d="M29 13 v6 a4 4 0 0 1 -4 4 h-2 M25 25 l-2 -2 2 -2" />
      </svg>
    ),
  },
  {
    title: "Factoraje nacional e internacional",
    body: "Convierte tus cuentas por cobrar en liquidez inmediata, sin esperar los plazos de tus clientes.",
    span: "md:col-span-5",
    // Factura que se convierte en dinero ya
    icon: (
      <svg viewBox="0 0 32 32" className="size-9" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M4 4 h11 l4 4 v11 H4 Z M15 4 v4 h4" />
        <path d="M7 12 h8 M7 16 h5" />
        <path d="M12 25 h7 M16 22 l3.5 3 -3.5 3" />
        <circle cx="25.5" cy="25" r="4.5" />
        <path d="M25.5 22.6 v4.8 M24.2 23.7 h2 a1.1 1.1 0 0 1 0 2.2 h-1.4 a1.1 1.1 0 0 0 0 2.2 h2" strokeWidth="1" />
      </svg>
    ),
  },
  {
    title: "Arrendamiento financiero",
    body: "Equipo, maquinaria y flotillas trabajando para ti, sin descapitalizar tu empresa.",
    span: "md:col-span-7",
    // Camión de flotilla
    icon: (
      <svg viewBox="0 0 32 32" className="size-9" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="3" y="10" width="15" height="11" rx="1" />
        <path d="M18 13 h6 l5 5 v3 h-3" />
        <path d="M18 21 h-2 M6 21 h-1" />
        <circle cx="10" cy="23" r="2.6" />
        <circle cx="24" cy="23" r="2.6" />
        <path d="M13 23 h8" />
      </svg>
    ),
  },
  {
    title: "Crédito puente e inmobiliario",
    body: "Financiamiento estructurado para desarrollo y proyectos inmobiliarios, de principio a fin.",
    span: "md:col-span-6",
    // Edificio en desarrollo con grúa
    icon: (
      <svg viewBox="0 0 32 32" className="size-9" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M6 28 V12 h10 v16" />
        <path d="M9 15 h1.6 M13 15 h1.6 M9 19 h1.6 M13 19 h1.6 M9 23 h1.6 M13 23 h1.6" />
        <path d="M16 20 h8 v8" />
        <path d="M11 12 V7 h14 M25 7 v4 M25 13 v1.5" />
        <path d="M3 28 H29" />
      </svg>
    ),
  },
  {
    title: "Consolidación y reestructura",
    body: "Reordena tus pasivos en una sola estructura con mejores condiciones y recupera el control de tu flujo.",
    span: "md:col-span-6",
    // Varias deudas se unen en una sola
    icon: (
      <svg viewBox="0 0 32 32" className="size-9" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M4 7 h6 M4 16 h6 M4 25 h6" />
        <path d="M10 7 c6 0 4 9 9 9 M10 16 h9 M10 25 c6 0 4 -9 9 -9" />
        <path d="M19 16 h8 M23.5 12.5 L27 16 l-3.5 3.5" />
      </svg>
    ),
  },
];

export default function Solutions() {
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
        ".sol-heading",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 75%" },
        }
      );

      gsap.fromTo(
        ".sol-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: { trigger: ".sol-grid", start: "top 78%" },
        }
      );
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="soluciones" className="py-[14vh] scroll-mt-20">
      <div className="container-x">
        <div className="sol-heading mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.26em] text-ember">
              Soluciones
            </p>
            <h2 className="font-display text-[clamp(1.7rem,3.4vw,2.9rem)] font-bold leading-[1.08] tracking-tight text-theme">
              El instrumento correcto para cada necesidad.
            </h2>
          </div>
          <p className="max-w-xs text-base leading-relaxed text-theme-muted md:pb-2">
            No empujamos productos. Encontramos la figura que mejor se acomoda
            a tu caso.
          </p>
        </div>

        <div className="sol-grid grid grid-cols-1 gap-4 md:grid-cols-12">
          {CARDS.map((c, i) => (
            <a
              key={i}
              href="#contacto"
              className={`sol-card group relative flex min-h-[240px] flex-col justify-between rounded-2xl border border-hairline p-7 transition-all duration-300 hover:-translate-y-1 hover:border-ember md:min-h-[280px] md:p-9 ${c.span}`}
            >
              <div className="flex items-start justify-between text-theme">
                <span className="text-theme-muted transition-colors duration-300 group-hover:text-ember">
                  {c.icon}
                </span>
                <span
                  aria-hidden
                  className="translate-y-1 font-mono text-lg text-ember opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  ↗
                </span>
              </div>
              <div>
                <h3 className="mb-3 max-w-[18ch] font-display text-2xl font-semibold leading-tight tracking-tight text-theme md:text-3xl">
                  {c.title}
                </h3>
                <p className="max-w-md text-base leading-relaxed text-theme-muted">
                  {c.body}
                </p>
              </div>
            </a>
          ))}

          <div className="sol-card flex flex-col justify-between gap-6 rounded-2xl bg-carbon p-7 md:col-span-12 md:flex-row md:items-center md:p-9">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.26em] text-ember">
                Y todo lo demás
              </p>
              <h3 className="mb-3 max-w-[26ch] font-display text-2xl font-bold leading-tight tracking-tight text-paper md:text-3xl">
                Soluciones a la medida.
              </h3>
              <p className="max-w-xl text-base leading-relaxed text-ash">
                No nos limitamos a estas figuras. Si tu caso necesita otra
                estructura, o una combinación de varias, la diseñamos
                contigo, con las instituciones correctas.
              </p>
            </div>
            <a
              href="#contacto"
              className="inline-block shrink-0 rounded-full border border-white/30 px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:border-ember hover:text-ember"
            >
              Cuéntanos tu caso
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
