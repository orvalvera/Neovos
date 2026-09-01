import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Analytics from "@/components/Analytics";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.neovos.com.mx"),
  title: "Neovos | Financiamiento empresarial estructurado para ser aprobado",
  description:
    "Asesores financieros independientes. Analizamos tu necesidad y te conectamos con las mejores opciones de fondeo en México y el extranjero, con más de 20 bancos y fintechs aliados.",
  alternates: { canonical: "https://www.neovos.com.mx" },
  openGraph: {
    title: "Neovos | Financiamiento empresarial estructurado para ser aprobado",
    description:
      "No somos un pasapapeles. Estructuramos tus finanzas para construir la solicitud perfecta.",
    url: "https://www.neovos.com.mx",
    siteName: "Grupo Neovos",
    locale: "es_MX",
    type: "website",
    images: ["/images/hero-towers.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: "Grupo Neovos",
  description:
    "Asesores financieros independientes. Financiamiento empresarial en México y el extranjero: crédito, factoraje, arrendamiento, crédito puente y reestructura.",
  url: "https://www.neovos.com.mx",
  logo: "https://www.neovos.com.mx/images/neovos-logo.png",
  areaServed: "MX",
  knowsLanguage: "es-MX",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX" className={`${jakarta.variable} ${jetbrains.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
