"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";

type Status = "idle" | "sending" | "success" | "error";

const GIROS = [
  "Manufactura",
  "Comercio",
  "Servicios",
  "Logística y transporte",
  "Construcción / Inmobiliario",
  "Otro",
];
const ANIOS = ["Menos de 2 años", "2 a 5 años", "5 a 10 años", "Más de 10 años"];
const EMPLEADOS = ["1 a 10", "11 a 50", "51 a 250", "Más de 250"];
const FACTURACION = [
  "Menos de $500,000",
  "$500,000 a $2 millones",
  "$2 a $10 millones",
  "$10 a $50 millones",
  "Más de $50 millones",
];
const HISTORIAL = ["Bueno", "Regular", "Complicado", "No estoy seguro"];
const TIPOS = [
  "Crédito simple / Revolvente",
  "Factoraje",
  "Arrendamiento",
  "Crédito puente / Inmobiliario",
  "Reestructura de deuda",
  "No estoy seguro",
];
const MONTOS = [
  "Menos de $1 millón",
  "$1 a $5 millones",
  "$5 a $20 millones",
  "$20 a $50 millones",
  "Más de $50 millones",
];
const URGENCIA = [
  "Urgente (0-30 días)",
  "Pronto (1-3 meses)",
  "Planificando (3-6 meses)",
  "Solo estoy explorando",
];

function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-1 mt-8 font-mono text-xs uppercase tracking-[0.24em] text-ember first:mt-0 sm:col-span-2">
      {children}
    </p>
  );
}

function Select({
  name,
  placeholder,
  options,
  required,
}: {
  name: string;
  placeholder: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <label>
      <span className="sr-only">{placeholder}</span>
      <select
        name={name}
        required={required}
        defaultValue=""
        className="field"
      >
        <option value="" disabled>
          {placeholder}
          {required ? " *" : ""}
        </option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

function buildWhatsAppSummary(data: FormData, tipos: FormDataEntryValue[]) {
  const lines = [
    "Hola Neovos, acabo de enviar mi solicitud desde el sitio. Resumen:",
    "",
    `Nombre: ${data.get("nombre")}`,
    `Empresa: ${data.get("empresa")}`,
    `Cargo: ${data.get("cargo")}`,
    `Correo: ${data.get("correo")}`,
    `Teléfono: ${data.get("telefono")}`,
    `Giro: ${data.get("giro")}`,
    `Facturación mensual: ${data.get("facturacion")}`,
    `Tipo de financiamiento: ${tipos.join(", ")}`,
    `Monto: ${data.get("monto")}`,
    `Urgencia: ${data.get("urgencia")}`,
  ];
  const destino = data.get("destino");
  if (destino) lines.push(`Destino: ${destino}`);
  return lines.join("\n");
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [tipoError, setTipoError] = useState(false);
  const [waLink, setWaLink] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (data.get("website")) return; // honeypot

    const tipos = data.getAll("tipo");
    if (tipos.length === 0) {
      setTipoError(true);
      return;
    }
    setTipoError(false);

    setWaLink(
      `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(
        buildWhatsAppSummary(data, tipos)
      )}`
    );

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: SITE.web3formsKey,
          subject: "Nueva solicitud de financiamiento (neovos.com.mx)",
          from_name: "Sitio Neovos",
          // Contacto
          nombre: data.get("nombre"),
          email: data.get("correo"),
          telefono: data.get("telefono"),
          cargo: data.get("cargo"),
          // Empresa
          empresa: data.get("empresa"),
          giro: data.get("giro"),
          anios_operando: data.get("anios"),
          empleados: data.get("empleados"),
          facturacion_mensual: data.get("facturacion"),
          // Situación crediticia
          historial_crediticio: data.get("historial") || "No especificado",
          creditos_vigentes: data.get("vigentes") || "No especificado",
          cuales_creditos: data.get("cuales") || "—",
          // Necesidad
          tipo_financiamiento: tipos.join(", "),
          monto: data.get("monto"),
          urgencia: data.get("urgencia"),
          destino: data.get("destino") || "—",
        }),
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex min-h-[420px] flex-col items-start justify-center rounded-3xl border border-ink/10 p-8 md:p-10">
        <span className="mb-6 inline-block size-3 rounded-full bg-ember" />
        <h3 className="mb-4 font-display text-3xl font-bold tracking-tight text-ink">
          Recibido.
        </h3>
        <p className="mb-8 max-w-sm text-lg leading-relaxed text-stone">
          Gracias por tu confianza. Un asesor analiza tu información y te
          contacta en menos de 24 horas hábiles.
        </p>
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-stone">
          ¿Quieres respuesta más rápida?
        </p>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 rounded-full bg-ember px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-ember-deep"
        >
          <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
            <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm5.4 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.4-.7-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5s.8 1.9.8 2c.1.1.1.3 0 .5l-.4.6c-.1.2-.3.3-.1.6.2.3.8 1.4 1.8 2.2 1.3 1.1 2.3 1.5 2.6 1.6.3.1.5.1.7-.1l1-1.2c.2-.3.4-.2.7-.1l2 .9c.3.2.5.2.6.4 0 .1 0 .8-.3 1.4Z" />
          </svg>
          Enviar mi solicitud también por WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2"
    >
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <GroupLabel>Datos de contacto</GroupLabel>
      <input required name="nombre" placeholder="Nombre completo *" className="field" />
      <input
        required
        type="email"
        name="correo"
        placeholder="Correo electrónico *"
        className="field"
      />
      <input
        required
        type="tel"
        name="telefono"
        placeholder="Teléfono / WhatsApp *"
        className="field"
      />
      <input required name="cargo" placeholder="Cargo en la empresa *" className="field" />

      <GroupLabel>Datos de la empresa</GroupLabel>
      <input
        required
        name="empresa"
        placeholder="Nombre de la empresa *"
        className="field sm:col-span-2"
      />
      <Select name="giro" placeholder="Giro" options={GIROS} required />
      <Select name="anios" placeholder="Años operando" options={ANIOS} required />
      <Select name="empleados" placeholder="Número de empleados" options={EMPLEADOS} required />
      <Select
        name="facturacion"
        placeholder="Facturación mensual aproximada"
        options={FACTURACION}
        required
      />

      <GroupLabel>Situación crediticia</GroupLabel>
      <fieldset className="sm:col-span-2">
        <legend className="mb-3 text-sm text-ink/70">
          ¿Cómo describirías tu historial crediticio?
        </legend>
        <div className="flex flex-wrap gap-2">
          {HISTORIAL.map((h) => (
            <label key={h} className="cursor-pointer">
              <input type="radio" name="historial" value={h} className="peer sr-only" />
              <span className="inline-block rounded-full border border-ink/25 px-4 py-2 text-sm text-ink/75 transition-colors peer-checked:border-ember peer-checked:bg-ember peer-checked:text-paper hover:border-ink/50">
                {h}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset className="mt-4 sm:col-span-2">
        <legend className="mb-3 text-sm text-ink/70">
          ¿Tienes créditos vigentes actualmente?
        </legend>
        <div className="flex flex-wrap gap-2">
          {["Sí", "No"].map((v) => (
            <label key={v} className="cursor-pointer">
              <input type="radio" name="vigentes" value={v} className="peer sr-only" />
              <span className="inline-block rounded-full border border-ink/25 px-5 py-2 text-sm text-ink/75 transition-colors peer-checked:border-ember peer-checked:bg-ember peer-checked:text-paper hover:border-ink/50">
                {v}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <input
        name="cuales"
        placeholder="Si tienes créditos vigentes, ¿cuáles son?"
        className="field sm:col-span-2"
      />

      <GroupLabel>Necesidades de financiamiento</GroupLabel>
      <fieldset className="sm:col-span-2">
        <legend className="mb-3 text-sm text-ink/70">
          Tipo de financiamiento que buscas *
        </legend>
        <div className="flex flex-wrap gap-2">
          {TIPOS.map((t) => (
            <label key={t} className="cursor-pointer">
              <input
                type="checkbox"
                name="tipo"
                value={t}
                className="peer sr-only"
                onChange={() => setTipoError(false)}
              />
              <span className="inline-block rounded-full border border-ink/25 px-4 py-2 text-sm text-ink/75 transition-colors peer-checked:border-ember peer-checked:bg-ember peer-checked:text-paper hover:border-ink/50">
                {t}
              </span>
            </label>
          ))}
        </div>
        {tipoError && (
          <p className="mt-3 text-sm text-ember">
            Selecciona al menos un tipo de financiamiento.
          </p>
        )}
      </fieldset>
      <Select name="monto" placeholder="Monto aproximado que buscas" options={MONTOS} required />
      <Select name="urgencia" placeholder="¿Qué tan urgente es?" options={URGENCIA} required />
      <label className="sm:col-span-2">
        <span className="sr-only">¿Para qué necesitas el financiamiento?</span>
        <textarea
          name="destino"
          rows={3}
          placeholder="¿Para qué necesitas el financiamiento? (opcional)"
          className="field resize-none"
        />
      </label>

      <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm text-ink/75 sm:col-span-2">
        <input
          required
          type="checkbox"
          name="consentimiento"
          className="mt-0.5 size-4 accent-ember"
        />
        Acepto ser contactado por Grupo Neovos para dar seguimiento a mi
        solicitud. *
      </label>

      <div className="mt-6 sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full rounded-full bg-ember px-8 py-4 text-base font-semibold text-paper transition-colors hover:bg-ember-deep disabled:opacity-60 sm:w-auto"
        >
          {status === "sending" ? "Enviando…" : "Enviar solicitud"}
        </button>

        {status === "error" && (
          <p className="mt-4 text-sm leading-relaxed text-stone">
            No pudimos enviar tu solicitud. Escríbenos directo a{" "}
            <a
              href={`mailto:${SITE.contactEmail}`}
              className="text-ink underline decoration-ember underline-offset-4"
            >
              {SITE.contactEmail}
            </a>{" "}
            o por WhatsApp.
          </p>
        )}

        <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-stone/80">
          Confidencial. Sin costo y sin compromiso.
        </p>
      </div>
    </form>
  );
}
