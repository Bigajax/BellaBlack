import Image from "next/image";
import Link from "next/link";
import { launches } from "@/data/products";
import { formatPrice, installments } from "@/lib/format";
import { ProductCard } from "@/components/ProductCard";
import { SectionTitle } from "@/components/SectionTitle";
import { Reveal } from "@/components/Reveal";
import { ArrowRightIcon } from "@/components/icons";

export function NewArrivals() {
  const [feature, ...rest] = launches;
  const items = rest.slice(0, 6);

  return (
    <section className="border-y border-white/10 bg-coal">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <SectionTitle
              eyebrow="Lançamentos diários"
              title="Acabou de chegar"
              description="Chegou novo. Pode não durar muito."
              tribal
            />
          </Reveal>
          <Link
            href="/catalogo?novidades=1"
            className="group hidden items-center gap-2 font-cond text-sm font-bold uppercase tracking-[0.18em] text-volt sm:flex"
          >
            Ver todos os lançamentos
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {/* peça em destaque — card editorial grande */}
          {feature && (
            <Reveal className="col-span-2 row-span-2">
              <Link
                href={`/produto/${feature.slug}`}
                className="group relative flex h-full min-h-[420px] overflow-hidden border border-white/10 bg-bone lg:min-h-full"
              >
                <Image
                  src={feature.images[0]}
                  alt={feature.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/15 to-transparent" />
                <span className="clip-tag absolute left-4 top-4 bg-volt py-1.5 pl-3 pr-5 font-cond text-xs font-bold uppercase tracking-wider text-ink">
                  Destaque da semana
                </span>
                <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-5 sm:p-7">
                  <div>
                    <p className="font-cond text-xs font-semibold uppercase tracking-[0.2em] text-bone/60">
                      {feature.code}
                    </p>
                    <h3 className="mt-1 max-w-sm font-display text-3xl uppercase leading-[0.95] text-bone sm:text-4xl">
                      {feature.name}
                    </h3>
                    <p className="mt-2 font-display text-2xl text-volt">
                      {formatPrice(feature.promoPrice ?? feature.price)}
                      <span className="ml-2 font-cond text-xs font-semibold uppercase tracking-wider text-bone/55">
                        {installments(feature.promoPrice ?? feature.price)}
                      </span>
                    </p>
                  </div>
                  <span className="stitch inline-flex items-center gap-2 border border-bone/40 px-5 py-3 font-cond text-sm font-bold uppercase tracking-wider text-bone transition-colors group-hover:border-volt group-hover:text-volt">
                    Ver peça
                    <ArrowRightIcon className="size-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          )}

          {items.map((product, i) => (
            <Reveal key={product.slug} delay={(i % 2) * 70}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>

        <Link
          href="/catalogo?novidades=1"
          className="mt-8 flex w-full items-center justify-center gap-2 border border-white/20 py-4 font-cond text-sm font-bold uppercase tracking-[0.18em] text-bone transition-colors hover:border-volt hover:text-volt sm:hidden"
        >
          Ver todos os lançamentos
          <ArrowRightIcon className="size-4" />
        </Link>
      </div>
    </section>
  );
}
