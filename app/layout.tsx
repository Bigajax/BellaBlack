import type { Metadata, Viewport } from "next";
import { Anton, Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileTabBar, WhatsAppFloat } from "@/components/FloatingCtas";
import { site } from "@/data/site.config";

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const barlow = Barlow_Condensed({
  variable: "--font-barlow",
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Bella Black — Streetwear em Maringá",
    template: "%s | Bella Black",
  },
  description:
    "Streetwear para quem não nasceu para passar despercebido. Camisetas, baggys, moletons, conjuntos e jaquetas na Avenida Mauá, 3133 — Maringá. Peça pelo WhatsApp.",
  openGraph: {
    title: "Bella Black — Streetwear em Maringá",
    description:
      "Seu estilo faz barulho. Vitrine digital da Bella Black: catálogo completo, lançamentos diários e pedido direto pelo WhatsApp.",
    type: "website",
    locale: "pt_BR",
    siteName: site.name,
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  name: site.name,
  description: "Loja de streetwear em Maringá — camisetas, baggys, moletons e conjuntos.",
  url: site.url,
  foundingDate: String(site.since),
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    addressCountry: "BR",
  },
  sameAs: [site.instagram],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${anton.variable} ${barlow.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <MobileTabBar />
      </body>
    </html>
  );
}
