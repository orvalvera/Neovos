/**
 * Datos de contacto de Neovos.
 * ⚠️ Reemplaza estos valores con los reales antes de publicar.
 */
export const SITE = {
  /** Número de WhatsApp en formato internacional, solo dígitos (52 + 10 dígitos) */
  whatsappNumber: "5215500000000",
  whatsappMessage:
    "Hola Neovos, me interesa explorar opciones de financiamiento para mi empresa.",
  contactEmail: "contacto@neovos.com.mx",
  /** Clave de acceso de Web3Forms (https://web3forms.com) ligada al correo */
  web3formsKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "",
} as const;

export const whatsappUrl = () =>
  `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(SITE.whatsappMessage)}`;
