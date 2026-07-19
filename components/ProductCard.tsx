import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/types";
import { categoryNames } from "@/data/categories";
import { formatPrice, installments } from "@/lib/format";
import { waProduct } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons";

const badgeStyle: Record<string, string> = {
  Novo: "bg-volt text-ink",
  Lançamento: "bg-volt text-ink",
  Oferta: "bg-volt text-ink",
  "Últimas unidades": "bg-bone text-ink",
  Exclusivo: "bg-ink text-volt border border-volt/60",
};

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const price = product.promoPrice ?? product.price;
  return (
    <article className="group relative flex flex-col border border-white/10 bg-coal transition-colors hover:border-volt/70">
      <Link
        href={`/produto/${product.slug}`}
        className="relative block aspect-[3/4] overflow-hidden bg-bone"
        aria-label={product.name}
      >
        <Image
          src={product.images[0]}
          alt={`${product.name} — ${categoryNames[product.category]}`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt=""
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}
        <div className="absolute left-2 top-2 flex flex-col items-start gap-1.5">
          {product.badges.slice(0, 2).map((badge) => (
            <span
              key={badge}
              className={`clip-tag py-1 pl-2.5 pr-4 font-cond text-[11px] font-bold uppercase tracking-wider ${
                badgeStyle[badge] ?? "bg-graphite text-bone"
              }`}
            >
              {badge}
            </span>
          ))}
        </div>
        {product.promoPrice && (
          <span className="absolute right-2 top-2 bg-volt px-2 py-1 font-cond text-[11px] font-bold uppercase text-ink">
            −{Math.round((1 - product.promoPrice / product.price) * 100)}%
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-1 p-3.5">
        <p className="font-cond text-[11px] font-semibold uppercase tracking-[0.18em] text-bone/45">
          {product.brand ?? categoryNames[product.category]} · {product.code}
        </p>
        <Link href={`/produto/${product.slug}`} className="outline-offset-4">
          <h3 className="font-cond text-lg font-semibold uppercase leading-tight text-bone transition-colors group-hover:text-volt">
            {product.name}
          </h3>
        </Link>

        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-display text-xl text-volt">{formatPrice(price)}</span>
          {product.promoPrice && (
            <span className="text-sm text-bone/40 line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
        <p className="text-xs text-bone/50">{installments(price)}</p>

        <div className="mt-2 flex flex-wrap items-center gap-1">
          {product.sizes.map((size) => (
            <span
              key={size}
              className="border border-white/15 px-1.5 py-0.5 font-cond text-[11px] font-semibold text-bone/70"
            >
              {size}
            </span>
          ))}
        </div>
        <p className="mt-1 font-cond text-[11px] uppercase tracking-wider text-bone/40">
          {product.colors.length > 1
            ? `${product.colors.length} cores`
            : product.colors[0]}
        </p>

        <div className="mt-auto grid grid-cols-[1fr_auto] gap-2 pt-3">
          <Link
            href={`/produto/${product.slug}`}
            className="stitch grid place-items-center border border-white/20 py-2.5 text-center font-cond text-sm font-bold uppercase tracking-wider text-bone transition-colors hover:border-volt hover:text-volt"
          >
            Ver detalhes
          </Link>
          <a
            href={waProduct(product)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Comprar ${product.name} pelo WhatsApp`}
            className="grid w-11 place-items-center bg-volt text-ink transition-transform hover:-translate-y-0.5"
          >
            <WhatsAppIcon className="size-5" />
          </a>
        </div>
      </div>
    </article>
  );
}
