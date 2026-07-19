import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { activeProducts, getProduct, getRelated } from "@/data/products";
import { categoryNames } from "@/data/categories";
import { site } from "@/data/site.config";
import { formatPrice } from "@/lib/format";
import { ProductCard } from "@/components/ProductCard";
import { SectionTitle } from "@/components/SectionTitle";
import { Reveal } from "@/components/Reveal";
import { ProductActions } from "./ProductActions";

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return activeProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: `${product.name} por ${formatPrice(product.promoPrice ?? product.price)} na Bella Black, streetwear em Maringá. ${product.description}`,
    openGraph: {
      title: `${product.name} | Bella Black`,
      description: product.description,
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = getRelated(product);
  const price = product.promoPrice ?? product.price;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.code,
    description: product.description,
    image: `${site.url}${product.images[0]}`,
    brand: { "@type": "Brand", name: product.brand ?? site.name },
    offers: {
      "@type": "Offer",
      priceCurrency: "BRL",
      price: price.toFixed(2),
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: site.name },
    },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-6 lg:pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <nav aria-label="Caminho" className="font-cond text-xs uppercase tracking-[0.18em] text-bone/45">
        <Link href="/catalogo" className="transition-colors hover:text-volt">
          Catálogo
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/catalogo?categoria=${product.category}`}
          className="transition-colors hover:text-volt"
        >
          {categoryNames[product.category]}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-bone/70">{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        {/* galeria */}
        <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 lg:mx-0 lg:grid lg:snap-none lg:gap-4 lg:overflow-visible lg:px-0">
          {product.images.map((src, i) => (
            <div
              key={src}
              className="relative aspect-[3/4] w-[85vw] shrink-0 snap-center overflow-hidden border border-white/10 bg-bone lg:w-full"
            >
              <Image
                src={src}
                alt={`${product.name} — foto ${i + 1}`}
                fill
                priority={i === 0}
                sizes="(max-width: 1024px) 85vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* informações */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <ProductActions product={product} />
        </div>
      </div>

      {/* relacionados */}
      {related.length > 0 && (
        <section className="mt-24">
          <Reveal>
            <SectionTitle
              eyebrow="Complete o look"
              title="Você também pode gostar"
              tribal
            />
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
