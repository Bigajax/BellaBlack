import Image from "next/image";
import Link from "next/link";
import { site, mapsUrl } from "@/data/site.config";
import { waGeneral } from "@/lib/whatsapp";
import { TribalGlow } from "./TribalArt";

const nav = [
  { href: "/", label: "Início" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/catalogo?novidades=1", label: "Lançamentos" },
  { href: "/sobre", label: "Sobre a Bella Black" },
  { href: "/loja", label: "Loja física" },
];

const policies = [
  { href: "/politicas#trocas", label: "Política de trocas" },
  { href: "/politicas#privacidade", label: "Política de privacidade" },
  { href: "/politicas#termos", label: "Termos de uso" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink pb-28 lg:pb-10">
      <TribalGlow className="absolute -right-16 -top-16 w-64 rotate-[130deg] opacity-[0.07]" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/images/logo.jpg"
            alt="Logo Bella Black"
            width={64}
            height={64}
            className="size-16 rounded-full border border-volt/40"
          />
          <p className="mt-4 font-display text-3xl uppercase text-bone">
            Bella <span className="text-volt">Black</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-bone/60">
            {site.tagline}
          </p>
          <p className="mt-6 inline-block border border-volt/60 px-3 py-1 font-cond text-xs font-semibold uppercase tracking-[0.2em] text-volt">
            Desde {site.since}
          </p>
        </div>

        <nav aria-label="Rodapé">
          <p className="font-cond text-sm font-bold uppercase tracking-[0.2em] text-bone/40">
            Navegação
          </p>
          <ul className="mt-4 space-y-2.5">
            {nav.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-sm text-bone/75 transition-colors hover:text-volt"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-cond text-sm font-bold uppercase tracking-[0.2em] text-bone/40">
            Atendimento
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-bone/75">
            <li>
              <a
                href={waGeneral}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-volt"
              >
                WhatsApp da loja
              </a>
            </li>
            <li>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-volt"
              >
                Instagram {site.instagramHandle}
              </a>
            </li>
            {site.hours.map((h) => (
              <li key={h.days} className="text-bone/50">
                {h.days}: {h.time}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-cond text-sm font-bold uppercase tracking-[0.2em] text-bone/40">
            Endereço
          </p>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block text-sm leading-relaxed text-bone/75 transition-colors hover:text-volt"
          >
            {site.address.street}
            <br />
            {site.address.city} — {site.address.stateFull}
          </a>
          <ul className="mt-6 space-y-2.5">
            {policies.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-xs text-bone/45 transition-colors hover:text-volt"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center font-cond text-xs uppercase tracking-[0.25em] text-bone/40">
        <p>Bella Black — Desde {site.since}. Todos os direitos reservados.</p>
        <p className="mt-2 text-[10px] tracking-[0.2em]">
          <a
            href="https://rafaelrazeira.com.br/vitrine-digital"
            target="_blank"
            rel="noopener"
            className="transition-colors hover:text-bone/70"
          >
            vitrine por Rafael Razeira Estúdio
          </a>
        </p>
      </div>
    </footer>
  );
}
