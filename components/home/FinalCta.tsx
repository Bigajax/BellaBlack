import Link from "next/link";
import { waGeneral } from "@/lib/whatsapp";
import { TribalGlow } from "@/components/TribalArt";
import { Reveal } from "@/components/Reveal";
import { ArrowRightIcon, WhatsAppIcon } from "@/components/icons";

export function FinalCta() {
  return (
    <section className="grain relative overflow-hidden bg-ink">
      <TribalGlow className="absolute -left-24 top-1/2 w-72 -translate-y-1/2 rotate-[18deg] opacity-[0.14]" />
      <TribalGlow className="absolute -right-24 top-1/2 w-72 -translate-y-1/2 -scale-x-100 -rotate-[18deg] opacity-[0.14]" />
      <div className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:py-32">
        <Reveal>
          <h2 className="font-display text-5xl uppercase leading-[0.92] text-bone sm:text-6xl lg:text-7xl">
            Não siga o movimento.
            <br />
            <span className="text-volt">Crie o seu.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-lg text-bone/60">
            Seu próximo look começa aqui.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/catalogo"
              className="clip-tag inline-flex items-center justify-center gap-3 bg-volt py-4 pl-7 pr-10 font-cond text-base font-bold uppercase tracking-wider text-ink transition-transform hover:-translate-y-0.5"
            >
              Explorar catálogo
              <ArrowRightIcon className="size-5" />
            </Link>
            <a
              href={waGeneral}
              target="_blank"
              rel="noopener noreferrer"
              className="stitch inline-flex items-center justify-center gap-2.5 border border-white/25 px-7 py-4 font-cond text-base font-bold uppercase tracking-wider text-bone transition-colors hover:border-volt hover:text-volt"
            >
              <WhatsAppIcon className="size-5" />
              Chamar no WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
