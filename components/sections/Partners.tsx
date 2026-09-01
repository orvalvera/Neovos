"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Logo = { src?: string; name: string; h?: string };

/* Logos normalized to monochrome via .logo-item; heights tuned for optical balance.
   Items without src render as typographic chips (drop a file in /logos to upgrade them). */
const ROW_A: Logo[] = [
  { src: "/logos/klar.svg", name: "Klar", h: "h-10 md:h-12" },
  { src: "/logos/xepelin.svg", name: "Xepelin", h: "h-14 md:h-16" },
  { src: "/logos/aspiria.png", name: "Aspiria", h: "h-9 md:h-11" },
  { src: "/logos/summar.svg", name: "Summar", h: "h-14 md:h-16" },
  { src: "/logos/expocredit.png", name: "ExpoCredit", h: "h-11 md:h-14" },
  { name: "Mundi" },
  { src: "/logos/hey.svg", name: "Hey Banco", h: "h-10 md:h-12" },
  { src: "/logos/finsus.svg", name: "Finsus", h: "h-10 md:h-12" },
  { src: "/logos/kettera.png", name: "Kettera", h: "h-14 md:h-[4.5rem]" },
  { src: "/logos/haycash.svg", name: "HayCash", h: "h-16 md:h-[4.5rem]" },
  { src: "/logos/konfio.svg", name: "Konfío", h: "h-10 md:h-12" },
  { src: "/logos/cualli.png", name: "Cualli", h: "h-14 md:h-16" },
  { src: "/logos/aklara.png", name: "Aklara", h: "h-[4.5rem] md:h-24" },
  { name: "Kontempo" },
];

const ROW_B: Logo[] = [
  { src: "/logos/procap.svg", name: "Procap", h: "h-10 md:h-12" },
  { src: "/logos/afirme.png", name: "Afirme", h: "h-9 md:h-11" },
  { name: "Kapitalizer" },
  { src: "/logos/fairplay.svg", name: "Fairplay", h: "h-10 md:h-12" },
  { src: "/logos/finamo.svg", name: "Finamo", h: "h-10 md:h-12" },
  { name: "Moskalti" },
  { src: "/logos/finkargo.svg", name: "Finkargo", h: "h-10 md:h-12" },
  { src: "/logos/jeeves.svg", name: "Jeeves", h: "h-8 md:h-10" },
  { name: "KuCapital" },
  { name: "Active Leasing" },
  { src: "/logos/harbortrade.png", name: "Harbor Trade Credit", h: "h-10 md:h-12" },
  { src: "/logos/finantah.png", name: "Finantah", h: "h-9 md:h-11" },
  { src: "/logos/plus.png", name: "Plus Corp", h: "h-12 md:h-14" },
  { src: "/logos/covalto.png", name: "Covalto", h: "h-14 md:h-16" },
  { src: "/logos/loanco.png", name: "LoanCo", h: "h-8 md:h-10" },
  { name: "BH CrossBorder" },
];

function Row({ logos }: { logos: Logo[] }) {
  return (
    <div className="flex shrink-0 items-center">
      {logos.map((l, i) => (
        <div key={i} className="flex items-center px-9 md:px-12">
          {l.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={l.src}
              alt={l.name}
              className={`logo-item w-auto ${l.h ?? "h-10"}`}
              loading="eager"
              decoding="async"
            />
          ) : (
            <span className="logo-item whitespace-nowrap font-display text-xl font-bold tracking-tight md:text-2xl">
              {l.name}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export default function Partners() {
  const ref = useRef<HTMLElement>(null);
  // The CSS loop translates -50% of the track width; if images load mid-animation
  // the width changes and the loop visibly jumps. Start scrolling only once every
  // logo has real dimensions.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const imgs = Array.from(el.querySelectorAll("img"));
    let alive = true;
    Promise.allSettled(
      imgs.map((img) =>
        img.complete && img.naturalWidth > 0 ? Promise.resolve() : img.decode()
      )
    ).then(() => {
      if (alive) setReady(true);
    });
    const fallback = window.setTimeout(() => alive && setReady(true), 3000);
    return () => {
      alive = false;
      window.clearTimeout(fallback);
    };
  }, []);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduced) return;
      gsap.fromTo(
        ".partners-head",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%" },
        }
      );
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="py-16 md:py-20">
      <p className="partners-head container-x mb-12 text-center font-mono text-sm uppercase tracking-[0.28em] text-theme-muted">
        Algunas de las instituciones con las que trabajamos
      </p>
      <div
        className="flex flex-col gap-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        aria-label="Logotipos de instituciones aliadas"
      >
        <div className={ready ? "marquee-track" : "flex w-max"}>
          <Row logos={ROW_A} />
          <Row logos={ROW_A} />
        </div>
        <div className={ready ? "marquee-track marquee-reverse" : "flex w-max"}>
          <Row logos={ROW_B} />
          <Row logos={ROW_B} />
        </div>
      </div>
    </section>
  );
}
