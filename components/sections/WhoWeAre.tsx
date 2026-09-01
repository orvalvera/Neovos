"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";

const PILLARS = [
  {
    title: "Buscamos en todo el mercado",
    body: "Bancos, fondos y fintechs en México y el extranjero, no un solo catálogo.",
    icon: (
      <svg viewBox="0 0 32 32" className="size-7" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="14" cy="14" r="8" />
        <path d="M20 20 L27 27" />
      </svg>
    ),
  },
  {
    title: "Comparamos cada propuesta",
    body: "Tasas, plazos, garantías y condiciones, lado a lado y con total transparencia.",
    icon: (
      <svg viewBox="0 0 32 32" className="size-7" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M16 5 v22 M5 27 h22" />
        <path d="M8 20 v4 M12 14 v10 M20 10 v14 M24 16 v8" />
      </svg>
    ),
  },
  {
    title: "Negociamos a tu favor",
    body: "Nuestro compromiso es contigo, no con las financieras. Cerramos el mejor deal posible.",
    icon: (
      <svg viewBox="0 0 32 32" className="size-7" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 16 l6 -6 6 6 M28 16 l-6 6 -6 -6" />
        <path d="M10 10 v12 M22 22 V10" />
      </svg>
    ),
  },
];

export default function WhoWeAre() {
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
        ".who-item",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 72%" },
        }
      );
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="nosotros-intro" className="pt-[12vh] pb-[6vh] scroll-mt-20">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <p className="who-item mb-5 font-mono text-xs uppercase tracking-[0.26em] text-ember">
              Quiénes somos
            </p>
            <h2 className="who-item mb-8 max-w-[18ch] font-display text-[clamp(1.7rem,3.4vw,2.9rem)] font-bold leading-[1.1] tracking-tight text-theme">
              Impulsamos el crecimiento de tu empresa con financiamiento a la
              medida.
            </h2>
            <p className="who-item mb-5 max-w-xl text-base leading-relaxed text-theme-muted md:text-lg">
              Grupo Neovos es una firma de{" "}
              <span className="font-semibold text-theme">
                asesoría financiera independiente
              </span>{" "}
              especializada en financiamiento empresarial. Analizamos tu
              necesidad real y te conectamos con las mejores opciones de
              fondeo en México y el extranjero.
            </p>
            <p className="who-item max-w-xl text-base leading-relaxed text-theme-muted md:text-lg">
              <span className="font-semibold text-theme">
                No somos un banco.
              </span>{" "}
              A diferencia de una institución que solo ofrece sus propios
              productos, trabajamos del lado de tu empresa para encontrar y
              negociar la mejor propuesta del mercado.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="who-item relative h-56 overflow-hidden rounded-3xl md:h-64">
              <Image
                src="/images/hero-meeting.jpg"
                alt="Asesor y cliente revisando una propuesta de financiamiento"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="grid gap-3">
              {PILLARS.map((p) => (
                <div
                  key={p.title}
                  className="who-item flex items-start gap-4 rounded-2xl border border-hairline p-5"
                >
                  <span className="mt-0.5 shrink-0 text-ember">{p.icon}</span>
                  <div>
                    <p className="mb-1 font-display text-base font-bold text-theme">
                      {p.title}
                    </p>
                    <p className="text-sm leading-relaxed text-theme-muted">
                      {p.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
