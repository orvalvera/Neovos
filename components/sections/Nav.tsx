"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

const LINKS = [
  { href: "#nosotros-intro", label: "Nosotros" },
  { href: "#metodo", label: "Método" },
  { href: "#soluciones", label: "Soluciones" },
];

export default function Nav() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const hide = gsap
        .to(el, {
          yPercent: -110,
          duration: 0.45,
          ease: "power3.out",
          paused: true,
        })
        .progress(0);

      ScrollTrigger.create({
        start: "top top-=120",
        end: "max",
        onUpdate: (self) => {
          if (self.direction === 1) hide.play();
          else hide.reverse();
        },
        onLeaveBack: () => hide.reverse(),
      });

      ScrollTrigger.create({
        start: "top top-=60",
        end: "max",
        toggleClass: { targets: el, className: "nav-scrolled" },
      });
    },
    { scope: ref }
  );

  return (
    <header
      ref={ref}
      className="group/nav fixed inset-x-0 top-0 z-50 transition-colors duration-500 [&.nav-scrolled]:backdrop-blur-md [&.nav-scrolled]:[background:color-mix(in_srgb,var(--bg)_80%,transparent)] [&.nav-scrolled]:border-b [&.nav-scrolled]:border-(--hairline)"
    >
      <nav className="container-x flex items-center justify-between py-4">
        <a href="#hero" aria-label="Neovos — inicio" className="flex items-center">
          <Image
            src="/images/neovos-logo.png"
            alt="Neovos"
            width={48}
            height={51}
            priority
            className="h-11 w-auto brightness-0 invert transition-[filter] duration-500 group-[.nav-scrolled]/nav:brightness-100 group-[.nav-scrolled]/nav:invert-0"
          />
        </a>

        <div className="flex items-center gap-8">
          <div className="hidden items-center gap-8 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[15px] font-medium text-white/90 transition-colors duration-300 hover:text-ember group-[.nav-scrolled]/nav:text-theme group-[.nav-scrolled]/nav:hover:text-ember"
              >
                {l.label}
              </a>
            ))}
          </div>

          <a
            href="#contacto"
            className="rounded-full bg-ember px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-ember-deep"
          >
            Hablemos
          </a>
        </div>
      </nav>
    </header>
  );
}
