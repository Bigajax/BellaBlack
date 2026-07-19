"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { looks } from "@/data/looks";
import { getProduct } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { SectionTitle } from "@/components/SectionTitle";
import { Reveal } from "@/components/Reveal";
import { ArrowRightIcon } from "@/components/icons";

export function Looks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
      <Reveal>
        <SectionTitle
          eyebrow="Editorial"
          title="Monte o look"
          description="Combinações completas montadas na loja. Toque nos pontos para ver cada peça."
          tribal
        />
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {looks.map((look, i) => (
          <Reveal key={look.id} delay={i * 80}>
            <LookCard look={look} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function LookCard({ look }: { look: (typeof looks)[number] }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="border border-white/10 bg-coal">
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={look.image}
          alt={`Look ${look.title} com peças da Bella Black`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />

        {/* pontos interativos — desktop */}
        {look.items.map((item) => {
          const product = getProduct(item.slug);
          if (!product) return null;
          const isOpen = active === item.slug;
          return (
            <div
              key={item.slug}
              className="absolute hidden md:block"
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
            >
              <button
                type="button"
                onClick={() => setActive(isOpen ? null : item.slug)}
                aria-label={`Ver ${item.label}`}
                aria-expanded={isOpen}
                className={`relative grid size-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 transition-colors ${
                  isOpen
                    ? "border-volt bg-volt text-ink"
                    : "border-bone/80 bg-ink/60 text-bone backdrop-blur"
                }`}
              >
                <span className="text-sm font-bold leading-none">+</span>
              </button>
              {isOpen && (
                <div className="absolute left-1/2 top-3 z-10 w-48 -translate-x-1/2 border border-volt/50 bg-ink/95 p-3 backdrop-blur">
                  <p className="font-cond text-sm font-semibold uppercase leading-tight text-bone">
                    {product.name}
                  </p>
                  <p className="mt-1 font-display text-lg text-volt">
                    {formatPrice(product.promoPrice ?? product.price)}
                  </p>
                  <Link
                    href={`/produto/${product.slug}`}
                    className="mt-2 inline-flex items-center gap-1.5 font-cond text-xs font-bold uppercase tracking-wider text-volt"
                  >
                    Ver produto
                    <ArrowRightIcon className="size-3.5" />
                  </Link>
                </div>
              )}
            </div>
          );
        })}

        <p className="absolute left-3 top-3 bg-ink/80 px-3 py-1 font-cond text-xs font-bold uppercase tracking-[0.2em] text-volt backdrop-blur">
          {look.title}
        </p>
      </div>

      {/* mobile: lista das peças abaixo da foto */}
      <ul className="divide-y divide-white/10 md:hidden">
        {look.items.map((item) => {
          const product = getProduct(item.slug);
          if (!product) return null;
          return (
            <li key={item.slug}>
              <Link
                href={`/produto/${product.slug}`}
                className="flex items-center justify-between gap-3 p-3.5"
              >
                <div>
                  <p className="font-cond text-sm font-semibold uppercase text-bone">
                    {product.name}
                  </p>
                  <p className="font-display text-base text-volt">
                    {formatPrice(product.promoPrice ?? product.price)}
                  </p>
                </div>
                <ArrowRightIcon className="size-4 shrink-0 text-volt" />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
