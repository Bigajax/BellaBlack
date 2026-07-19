"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { waGeneral } from "@/lib/whatsapp";
import { site } from "@/data/site.config";
import {
  CloseIcon,
  InstagramIcon,
  MenuIcon,
  SearchIcon,
  WhatsAppIcon,
} from "./icons";

const links = [
  { href: "/", label: "Início" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/catalogo?novidades=1", label: "Lançamentos" },
  { href: "/sobre", label: "Sobre" },
  { href: "/loja", label: "Loja Física" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/90 backdrop-blur transition-all ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <Image
            src="/images/logo.jpg"
            alt=""
            width={40}
            height={40}
            className="size-10 rounded-full border border-volt/50 transition-transform group-hover:-rotate-6"
          />
          <span className="flex items-baseline gap-1.5">
            <span className="font-display text-2xl uppercase leading-none tracking-wide text-bone">
              Bella
            </span>
            <span className="font-display text-2xl uppercase leading-none tracking-wide text-volt">
              Black
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Principal">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`font-cond text-sm font-semibold uppercase tracking-[0.18em] transition-colors hover:text-volt ${
                pathname === link.href.split("?")[0] &&
                (link.label !== "Lançamentos" || false)
                  ? "text-volt"
                  : "text-bone/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/catalogo#busca"
            aria-label="Buscar no catálogo"
            className="grid size-10 place-items-center text-bone/80 transition-colors hover:text-volt"
          >
            <SearchIcon className="size-5" />
          </Link>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram da Bella Black"
            className="hidden size-10 place-items-center text-bone/80 transition-colors hover:text-volt sm:grid"
          >
            <InstagramIcon className="size-5" />
          </a>
          <a
            href={waGeneral}
            target="_blank"
            rel="noopener noreferrer"
            className="clip-tag hidden items-center gap-2 bg-volt py-2.5 pl-4 pr-6 font-cond text-sm font-bold uppercase tracking-wider text-ink transition-transform hover:-translate-y-0.5 md:flex"
          >
            <WhatsAppIcon className="size-4" />
            Falar no WhatsApp
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Abrir menu"
            className="grid size-10 place-items-center text-bone lg:hidden"
          >
            <MenuIcon className="size-6" />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-ink lg:hidden">
          <div className="flex items-center justify-between px-4 py-4">
            <span className="font-display text-2xl uppercase text-bone">
              Bella <span className="text-volt">Black</span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fechar menu"
              className="grid size-10 place-items-center text-bone"
            >
              <CloseIcon className="size-6" />
            </button>
          </div>
          <nav className="flex flex-1 flex-col justify-center gap-2 px-6" aria-label="Menu mobile">
            {links.map((link, i) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/10 py-4 font-display text-4xl uppercase text-bone transition-colors hover:text-volt"
              >
                <span className="mr-3 font-cond text-sm text-volt">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex gap-3 px-6 pb-10">
            <a
              href={waGeneral}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 bg-volt py-4 font-cond font-bold uppercase tracking-wider text-ink"
            >
              <WhatsAppIcon className="size-5" />
              WhatsApp
            </a>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid size-14 place-items-center border border-white/20 text-bone"
            >
              <InstagramIcon className="size-6" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
