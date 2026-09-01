"use client";

import { useRef } from "react";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";
import ContactForm from "@/components/ContactForm";
import Magnetic from "@/components/Magnetic";
import { whatsappUrl } from "@/lib/site";

const BULLETS = [
  {
    text: "Respuesta en menos de 24 horas hábiles",
    icon: (
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7 v5 l3.5 2" />
      </svg>
    ),
  },
  {
    text: "Confidencial, tu información no se comparte",
    icon: (
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 3 L20 6 v5 c0 5 -3.5 8.5 -8 10 c-4.5 -1.5 -8 -5 -8 -10 V6 Z" />
        <path d="M9 12 l2 2 4 -4" />
      </svg>
    ),
  },
  {
    text: "Sin costo y sin compromiso",
    icon: (
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 12 a8 8 0 1 0 16 0 a8 8 0 1 0 -16 0" strokeDasharray="3 3" />
        <path d="M9.5 12.5 l2 2 3.5 -4" />
      </svg>
    ),
  },
];

export default function ContactCTA() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduced) return;

      SplitText.create(".cta-title", {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) =>
          gsap.fromTo(
            self.lines,
            { yPercent: 110 },
            {
              yPercent: 0,
              duration: 1,
              stagger: 0.08,
              ease: "power4.out",
              scrollTrigger: { trigger: el, start: "top 70%" },
            }
          ),
      });

      gsap.fromTo(
        ".cta-side",
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 62%" },
        }
      );
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="contacto" className="py-[12vh] scroll-mt-20">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div className="lg:pt-6">
            <p className="cta-side mb-6 font-mono text-xs uppercase tracking-[0.26em] text-ember">
              Contacto
            </p>
            <h2 className="cta-title mb-8 max-w-[14ch] font-display text-[clamp(1.9rem,4.2vw,3.4rem)] font-bold leading-[1.08] tracking-tight text-ink">
              Hablemos de tu financiamiento.
            </h2>
            <p className="cta-side mb-10 max-w-md text-lg leading-relaxed text-stone">
              Completa el formulario y un asesor analizará tu caso
              personalmente.
            </p>

            <ul className="cta-side mb-12 flex max-w-md flex-col divide-y divide-ink/8 border-y border-ink/8">
              {BULLETS.map((b) => (
                <li
                  key={b.text}
                  className="flex items-center gap-4 py-4 text-[15px] font-medium text-ink/80"
                >
                  <span className="shrink-0 text-ember">{b.icon}</span>
                  {b.text}
                </li>
              ))}
            </ul>

            <div className="cta-side">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.24em] text-stone">
                ¿Prefieres escribirnos directo?
              </p>
              <Magnetic>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-full border border-ink/20 px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-ember hover:text-ember"
                >
                  <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
                    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm5.4 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.4-.7-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5s.8 1.9.8 2c.1.1.1.3 0 .5l-.4.6c-.1.2-.3.3-.1.6.2.3.8 1.4 1.8 2.2 1.3 1.1 2.3 1.5 2.6 1.6.3.1.5.1.7-.1l1-1.2c.2-.3.4-.2.7-.1l2 .9c.3.2.5.2.6.4 0 .1 0 .8-.3 1.4Z" />
                  </svg>
                  Escríbenos por WhatsApp
                </a>
              </Magnetic>
            </div>
          </div>

          <div className="cta-side rounded-[2rem] border border-ink/10 bg-white p-6 shadow-[0_24px_60px_-24px_rgba(15,14,12,0.22)] md:p-10">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
