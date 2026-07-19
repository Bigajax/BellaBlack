import Image from "next/image";
import Link from "next/link";
import { SealSince } from "@/components/Tribal";
import { TribalGlow } from "@/components/TribalArt";
import { Reveal } from "@/components/Reveal";
import { ArrowRightIcon } from "@/components/icons";

export function About() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-graphite">
      <TribalGlow className="absolute -right-20 top-6 w-72 rotate-45 opacity-[0.08]" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
        <Reveal>
          <div>
            <p className="inline-block bg-ink px-3 py-1 font-cond text-xs font-bold uppercase tracking-[0.25em] text-volt">
              Sobre a Bella Black
            </p>
            <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] text-bone sm:text-5xl lg:text-6xl">
              Das ruas para
              <br />o seu <span className="text-volt">estilo.</span>
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-bone/70">
              A Bella Black nasceu em 2018, transformando uma paixão pelo
              streetwear em uma loja feita para quem usa a roupa como forma de
              expressão. Aqui, cada peça é escolhida para unir estilo, conforto,
              qualidade e personalidade.
            </p>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-bone/70">
              Mais do que seguir tendências, queremos ajudar você a construir a
              sua própria identidade.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/sobre"
                className="group inline-flex items-center gap-2 font-cond text-sm font-bold uppercase tracking-[0.18em] text-volt"
              >
                Conhecer a história
                <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/loja"
                className="stitch inline-flex items-center border border-white/25 px-5 py-2.5 font-cond text-sm font-bold uppercase tracking-wider text-bone transition-colors hover:border-volt hover:text-volt"
              >
                Visitar a loja física
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative mx-auto max-w-md">
            <div className="relative aspect-[3/4] overflow-hidden border border-white/10">
              <Image
                src="/images/catalog/bb-31.jpg"
                alt="Cliente vestindo conjunto da Bella Black na loja"
                fill
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover"
              />
            </div>
            <SealSince
              size={110}
              className="absolute -bottom-8 -left-8 animate-spin-slow text-volt"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
