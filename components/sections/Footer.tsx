import Image from "next/image";
import { SITE, whatsappUrl } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="px-3 pb-4 pt-6 md:px-4">
      <div className="mx-auto max-w-[1760px] rounded-[2.5rem] bg-carbon px-6 pb-10 pt-14 md:px-14 md:pt-16">
        {/* Info top (Styler layout) */}
        <div className="mb-6 flex flex-col justify-between gap-12 md:flex-row">
          <div className="max-w-sm">
            <Image
              src="/images/neovos-logo.png"
              alt="Neovos"
              width={48}
              height={51}
              className="mb-6 h-11 w-auto brightness-0 invert"
            />
            <p className="text-[15px] leading-relaxed text-ash">
              Asesores financieros independientes. Conectamos a tu empresa con
              el financiamiento correcto: analizando, estructurando y
              acompañando hasta el desembolso.
            </p>
          </div>

          <div className="flex flex-col gap-8 text-[15px] sm:flex-row sm:gap-16">
            <div className="flex flex-col gap-2.5">
              <span className="mb-1 font-mono text-xs uppercase tracking-[0.24em] text-paper/45">
                Explora
              </span>
              <a href="#nosotros-intro" className="text-ash transition-colors hover:text-ember">
                Nosotros
              </a>
              <a href="#metodo" className="text-ash transition-colors hover:text-ember">
                Método
              </a>
              <a href="#soluciones" className="text-ash transition-colors hover:text-ember">
                Soluciones
              </a>
              <a href="#contacto" className="text-ash transition-colors hover:text-ember">
                Contacto
              </a>
            </div>
            <div className="flex flex-col gap-2.5">
              <span className="mb-1 font-mono text-xs uppercase tracking-[0.24em] text-paper/45">
                Contacto
              </span>
              <a
                href={`mailto:${SITE.contactEmail}`}
                className="text-ash transition-colors hover:text-ember"
              >
                {SITE.contactEmail}
              </a>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ash transition-colors hover:text-ember"
              >
                WhatsApp
              </a>
              <span className="text-ash">Ciudad de México</span>
            </div>
          </div>
        </div>

        {/* Giant slogan bottom (like the reference) */}
        <p className="py-10 text-center font-display text-[clamp(2.4rem,6.4vw,5.6rem)] font-extrabold leading-[1.05] tracking-tight text-paper md:py-14">
          Capital para crecer.
          <br />
          <span className="text-ember">Estrategia para conseguirlo.</span>
        </p>

        <div className="flex flex-col justify-between gap-3 border-t border-white/10 pt-6 md:flex-row">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/40">
            © {new Date().getFullYear()} Grupo Neovos · Asesoría financiera
            independiente
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/40">
            Financiamiento empresarial en México y el extranjero
          </p>
        </div>
      </div>
    </footer>
  );
}
