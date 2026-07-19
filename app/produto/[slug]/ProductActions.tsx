"use client";

import { useState } from "react";
import type { Product } from "@/data/types";
import { categoryNames } from "@/data/categories";
import { site } from "@/data/site.config";
import { formatPrice, installments } from "@/lib/format";
import { waProduct } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons";

const fitLabels: Record<Product["fit"], string> = {
  oversized: "Oversized",
  baggy: "Baggy",
  regular: "Regular",
  slim: "Slim",
};

export function ProductActions({ product }: { product: Product }) {
  const needsSize = product.sizes.length > 1;
  const [size, setSize] = useState<string | null>(needsSize ? null : product.sizes[0]);
  const [color, setColor] = useState<string>(product.colors[0]);
  const price = product.promoPrice ?? product.price;
  const ready = !needsSize || size !== null;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {product.badges.map((badge) => (
          <span
            key={badge}
            className="clip-tag bg-volt py-1 pl-2.5 pr-4 font-cond text-[11px] font-bold uppercase tracking-wider text-ink"
          >
            {badge}
          </span>
        ))}
        <span className="font-cond text-xs uppercase tracking-[0.2em] text-bone/40">
          Cód. {product.code}
        </span>
      </div>

      <h1 className="mt-4 font-display text-4xl uppercase leading-[0.95] text-bone sm:text-5xl">
        {product.name}
      </h1>
      <p className="mt-2 font-cond text-sm font-semibold uppercase tracking-[0.18em] text-bone/50">
        {product.brand ? `${product.brand} · ` : ""}
        {categoryNames[product.category]} · {fitLabels[product.fit]}
      </p>

      <div className="stitch mt-6 inline-block border border-white/15 bg-coal px-5 py-4">
        <div className="flex items-baseline gap-3">
          <span className="font-display text-4xl text-volt">{formatPrice(price)}</span>
          {product.promoPrice && (
            <span className="text-lg text-bone/40 line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-bone/55">{installments(price)}</p>
      </div>

      <p className="mt-6 max-w-lg leading-relaxed text-bone/70">{product.description}</p>

      {/* cores */}
      {product.colors.length > 1 && (
        <fieldset className="mt-7">
          <legend className="font-cond text-xs font-bold uppercase tracking-[0.22em] text-bone/45">
            Cor: <span className="text-bone">{color}</span>
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.colors.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                aria-pressed={color === c}
                className={`border px-4 py-2 font-cond text-sm font-semibold transition-colors ${
                  color === c
                    ? "border-volt bg-volt text-ink"
                    : "border-white/20 text-bone/70 hover:border-bone/50"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {/* tamanhos */}
      <fieldset className="mt-6">
        <legend className="font-cond text-xs font-bold uppercase tracking-[0.22em] text-bone/45">
          Tamanho{needsSize && !size && (
            <span className="ml-2 normal-case text-volt">— selecione para continuar</span>
          )}
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              aria-pressed={size === s}
              className={`min-w-12 border px-3 py-2.5 font-cond text-base font-semibold transition-colors ${
                size === s
                  ? "border-volt bg-volt text-ink"
                  : "border-white/20 text-bone/70 hover:border-bone/50"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </fieldset>

      {/* CTA */}
      <a
        href={ready ? waProduct(product, { size: size ?? undefined, color }) : undefined}
        target="_blank"
        rel="noopener noreferrer"
        aria-disabled={!ready}
        tabIndex={ready ? undefined : -1}
        onClick={(e) => {
          if (!ready) e.preventDefault();
        }}
        className={`clip-tag mt-8 flex w-full items-center justify-center gap-3 py-5 pl-4 pr-8 font-cond text-lg font-bold uppercase tracking-wider transition-all ${
          ready
            ? "bg-volt text-ink hover:-translate-y-0.5"
            : "cursor-not-allowed bg-graphite text-bone/35"
        }`}
      >
        <WhatsAppIcon className="size-6" />
        Quero esta peça
      </a>

      <ul className="mt-4 space-y-1.5 text-xs text-bone/50">
        <li>• Compra segura pelo atendimento da loja.</li>
        <li>• Confirme o estoque antes de realizar o pagamento.</li>
        <li>• Retirada na loja ou entrega conforme disponibilidade.</li>
      </ul>

      {/* ficha técnica */}
      <dl className="mt-8 divide-y divide-white/10 border-y border-white/10">
        {[
          ["Material", product.material],
          ["Modelagem", fitLabels[product.fit]],
          ["Cores", product.colors.join(", ")],
          ["Disponibilidade", product.inStock ? "Pronta entrega" : "Sob consulta"],
          ["Conservação", "Lavar do avesso com água fria. Não usar alvejante. Secar à sombra."],
          ["Medidas", "Consulte a tabela de medidas pelo WhatsApp — enviamos na hora."],
          ["Retirada e entrega", `Retire na ${site.address.street} ou combine a entrega pelo WhatsApp.`],
        ].map(([label, value]) => (
          <div key={label} className="grid grid-cols-[120px_1fr] gap-4 py-3 text-sm">
            <dt className="font-cond font-bold uppercase tracking-wider text-bone/45">
              {label}
            </dt>
            <dd className="text-bone/75">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
