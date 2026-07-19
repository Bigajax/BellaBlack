import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site.config";
import { Marquee } from "@/components/Marquee";
import { StoreSection } from "@/components/StoreSection";
import { Reveal } from "@/components/Reveal";
import { SealSince } from "@/components/Tribal";
import { TribalGlow } from "@/components/TribalArt";
import { ArrowRightIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Sobre a Bella Black",
  description:
    "A Bella Black nasceu em 2018 em Maringá, transformando a paixão pelo streetwear em uma loja feita para quem usa a roupa como forma de expressão.",
};

const values = [
  {
    title: "Personalidade",
    text: "Peças escolhidas a dedo para quem quer se vestir como é — não como mandam.",
  },
  {
    title: "Qualidade acessível",
    text: "Streetwear estiloso e confortável sem preço de importado. Estilo não precisa custar caro.",
  },
  {
    title: "Cultura urbana",
    text: "A loja nasceu dentro da cena de rua de Maringá e segue vivendo ela todos os dias.",
  },
  {
    title: "Lançamentos diários",
    text: "O estoque gira rápido: toda semana chega peça nova — e as boas não ficam paradas.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="grain relative overflow-hidden pt-28 lg:pt-36">
        <TribalGlow className="absolute -right-24 top-16 w-80 rotate-[30deg] opacity-[0.1]" />
        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
          <Reveal>
            <p className="inline-block bg-graphite px-3 py-1 font-cond text-xs font-bold uppercase tracking-[0.25em] text-volt">
              Sobre a Bella Black
            </p>
            <h1 className="mt-5 max-w-3xl font-display text-5xl uppercase leading-[0.92] text-bone sm:text-7xl">
              Das ruas para o seu <span className="text-volt">estilo.</span>
            </h1>
          </Reveal>

          <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
            <Reveal>
              <div className="space-y-5 text-lg leading-relaxed text-bone/75">
                <p>
                  A Bella Black nasceu em {site.since}, transformando uma paixão
                  pelo streetwear em uma loja feita para quem usa a roupa como
                  forma de expressão. Aqui, cada peça é escolhida para unir
                  estilo, conforto, qualidade e personalidade.
                </p>
                <p>
                  A gente não vende só roupa. Vende a peça que deixa você
                  confortável para ser quem é nas ruas — com identidade,
                  atitude e autenticidade.
                </p>
                <p>
                  Mais do que seguir tendências, queremos ajudar você a
                  construir a sua própria identidade.
                </p>
                <Link
                  href="/catalogo"
                  className="group inline-flex items-center gap-2 pt-2 font-cond text-sm font-bold uppercase tracking-[0.18em] text-volt"
                >
                  Ver o catálogo completo
                  <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="relative mx-auto w-full max-w-sm">
                <div className="relative aspect-[3/4] overflow-hidden border border-white/10">
                  <Image
                    src="/images/catalog/bb-27.jpg"
                    alt="Cliente vestindo camiseta estampada da Bella Black na loja"
                    fill
                    sizes="(max-width: 1024px) 90vw, 35vw"
                    className="object-cover"
                  />
                </div>
                <SealSince
                  size={104}
                  className="absolute -right-6 -top-6 animate-spin-slow text-volt"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Marquee variant="ink" />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, i) => (
            <Reveal key={value.title} delay={i * 70}>
              <div className="stitch h-full border border-white/15 bg-coal p-6">
                <h2 className="font-display text-xl uppercase text-volt">
                  {value.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-bone/65">{value.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <StoreSection />
    </>
  );
}
