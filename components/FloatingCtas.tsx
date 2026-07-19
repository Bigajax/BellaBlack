"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/data/site.config";
import { waGeneral } from "@/lib/whatsapp";
import { HomeIcon, SearchIcon, TagIcon, WhatsAppIcon } from "./icons";

/** Botão flutuante de WhatsApp — desktop e mobile (acima da tab bar). */
export function WhatsAppFloat() {
  return (
    <a
      href={waGeneral}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Falar com a ${site.name} no WhatsApp`}
      className="fixed bottom-24 right-4 z-40 grid size-14 place-items-center rounded-full bg-volt text-ink shadow-[0_8px_30px_rgba(255,229,0,0.35)] transition-transform hover:scale-105 lg:bottom-8 lg:right-8"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}

const tabs = [
  { href: "/", label: "Início", icon: HomeIcon },
  { href: "/catalogo", label: "Catálogo", icon: TagIcon },
  { href: "/catalogo#busca", label: "Buscar", icon: SearchIcon },
];

/** Barra inferior mobile: Início • Catálogo • Buscar • WhatsApp */
export function MobileTabBar() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Navegação rápida"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-white/10 bg-coal/95 backdrop-blur lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {tabs.map((tab) => {
        const active = pathname === tab.href.split("#")[0] && tab.label !== "Buscar";
        return (
          <Link
            key={tab.label}
            href={tab.href}
            className={`flex flex-col items-center gap-1 py-2.5 font-cond text-[11px] font-semibold uppercase tracking-wider ${
              active ? "text-volt" : "text-bone/60"
            }`}
          >
            <tab.icon className="size-5" />
            {tab.label}
          </Link>
        );
      })}
      <a
        href={waGeneral}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-1 py-2.5 font-cond text-[11px] font-semibold uppercase tracking-wider text-bone/60"
      >
        <WhatsAppIcon className="size-5" />
        WhatsApp
      </a>
    </nav>
  );
}
