import Image from "next/image";
import Link from "next/link";
import { waGeneral } from "@/lib/whatsapp";
import { getProduct } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { SealSince } from "@/components/Tribal";
import { TribalGlow } from "@/components/TribalArt";
import { ArrowRightIcon, WhatsAppIcon } from "@/components/icons";

export function Hero() {
  const heroProduct = getProduct("jaqueta-puffer");

  return (
    <section className="grain relative overflow-hidden bg-ink pt-24 lg:pt-20">
      {/* arte tribal da marca ao fundo */}
      <TribalGlow className="absolute -left-24 top-16 w-72 rotate-[24deg] opacity-[0.16] lg:w-[26rem]" />
      <TribalGlow className="absolute -right-28 -bottom-24 w-64 -rotate-[150deg] opacity-[0.09] lg:w-80" />

      {/* linhas diagonais estilo stories da marca */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 opacity-[0.06] lg:block"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-55deg, transparent 0 26px, #ffe500 26px 30px)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto grid max-w-7xl items-end px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
        {/* texto à esquerda — o headline invade a foto */}
        <div className="relative z-10 pb-10 pt-10 lg:pb-24 lg:pt-14">
          <p className="inline-flex items-center gap-2 border border-volt/50 px-3 py-1.5 font-cond text-xs font-bold uppercase tracking-[0.25em] text-volt">
            Desde 2018 · Maringá — PR
          </p>

          <h1 className="mt-6 font-display text-[17vw] uppercase leading-[0.88] text-bone sm:text-7xl lg:w-[130%] lg:max-w-none lg:text-[7rem]">
            Seu estilo
            <br />
            faz{" "}
            <span className="relative inline-block text-volt drop-shadow-[0_4px_24px_rgba(5,5,5,0.9)]">
              barulho.
              <svg
                viewBox="0 0 220 12"
                className="absolute -bottom-4 left-0 w-full text-volt lg:-bottom-5"
                aria-hidden="true"
              >
                <path
                  d="M2 9c40-6 90-7 216-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="7 6"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-7 max-w-md text-lg leading-relaxed text-bone/70">
            Streetwear para quem não nasceu para passar despercebido.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
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
              Falar com a Bella
            </a>
          </div>

          <p className="mt-6 font-cond text-sm uppercase tracking-[0.2em] text-bone/45">
            Loja física em Maringá • Enviamos para outras regiões
          </p>
        </div>

        {/* modelo à direita — foto real do IG, cortina preta funde com o fundo */}
        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="relative aspect-[3/4] w-full">
            <Image
              src="/images/catalog/bb-00.jpg"
              alt="Modelo vestindo jaqueta puffer preta e calça baggy da Bella Black"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="object-cover object-top [mask-image:linear-gradient(to_bottom,black_78%,transparent)]"
            />

            {/* etiqueta de peça pendurada na foto — hero comprável */}
            {heroProduct && (
              <Link
                href={`/produto/${heroProduct.slug}`}
                className="group absolute bottom-24 right-2 block rotate-3 transition-transform hover:rotate-0 sm:right-6"
              >
                <span className="stitch-volt block bg-bone px-4 pb-3 pt-5 text-ink shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
                  <span className="absolute left-1/2 top-1.5 size-2 -translate-x-1/2 rounded-full border border-ink/40 bg-ink/10" />
                  <span className="block font-cond text-[11px] font-bold uppercase tracking-[0.18em] text-ink/50">
                    No look · {heroProduct.code}
                  </span>
                  <span className="block font-cond text-sm font-bold uppercase leading-tight">
                    {heroProduct.name}
                  </span>
                  <span className="mt-0.5 flex items-center gap-2 font-display text-lg">
                    {formatPrice(heroProduct.promoPrice ?? heroProduct.price)}
                    <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </span>
              </Link>
            )}
          </div>
          <SealSince
            size={116}
            className="absolute -left-10 bottom-16 hidden animate-spin-slow text-volt lg:block"
          />
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap font-cond text-xs uppercase tracking-[0.3em] text-bone/50 lg:left-auto lg:right-4 lg:translate-x-0">
            Role para descobrir ↓
          </p>
        </div>
      </div>
    </section>
  );
}
