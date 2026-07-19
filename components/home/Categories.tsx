import Image from "next/image";
import Link from "next/link";
import { categories, countByCategory } from "@/data/categories";
import { SectionTitle } from "@/components/SectionTitle";
import { Reveal } from "@/components/Reveal";
import { ArrowRightIcon } from "@/components/icons";
import { TribalInk } from "@/components/TribalArt";

export function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
      <Reveal>
        <SectionTitle
          eyebrow="Categorias"
          title="Encontre o seu estilo"
          description="Do fit all black ao acid wash: navegue pelo catálogo do jeito que você monta o look."
          tribal
        />
      </Reveal>

      {/* mobile: carrossel horizontal com card seguinte visível */}
      <div className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 md:hidden">
        {categories.map((cat) => (
          <CategoryCard key={cat.id} {...catProps(cat.id)} className="w-[72vw] shrink-0 snap-start" />
        ))}
      </div>

      {/* desktop: colagem editorial com proporções mistas */}
      <div className="mt-12 hidden auto-rows-[220px] grid-cols-4 gap-3 md:grid">
        {categories.map((cat, i) => (
          <Reveal key={cat.id} delay={i * 60} className={cat.span || ""}>
            <CategoryCard {...catProps(cat.id)} className="h-full" />
          </Reveal>
        ))}
        <Link
          href="/catalogo?novidades=1"
          className="group relative flex flex-col justify-between overflow-hidden bg-volt p-5 text-ink"
        >
          <TribalInk className="absolute -right-10 -top-6 w-36 rotate-[30deg] opacity-20 transition-transform duration-500 group-hover:rotate-[38deg]" />
          <span className="relative font-cond text-xs font-bold uppercase tracking-[0.25em]">
            Acabou de chegar
          </span>
          <span className="font-display text-3xl uppercase leading-none">
            Novidades
            <ArrowRightIcon className="mt-3 size-7 transition-transform group-hover:translate-x-2" />
          </span>
        </Link>
      </div>
    </section>
  );
}

function catProps(id: (typeof categories)[number]["id"]) {
  const cat = categories.find((c) => c.id === id)!;
  return { cat, count: countByCategory(id) };
}

function CategoryCard({
  cat,
  count,
  className = "",
}: {
  cat: (typeof categories)[number];
  count: number;
  className?: string;
}) {
  return (
    <Link
      href={`/catalogo?categoria=${cat.id}`}
      className={`group relative block overflow-hidden border border-white/10 bg-bone ${className}`}
    >
      <div className="relative aspect-[4/5] h-full w-full md:aspect-auto">
        <Image
          src={cat.image}
          alt={`Categoria ${cat.name}`}
          fill
          sizes="(max-width: 768px) 72vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
        <div>
          <p className="font-display text-2xl uppercase text-bone">{cat.name}</p>
          <p className="font-cond text-xs font-semibold uppercase tracking-[0.2em] text-bone/60">
            {count} {count === 1 ? "peça" : "peças"}
          </p>
        </div>
        <span className="border-b border-volt pb-0.5 font-cond text-xs font-bold uppercase tracking-wider text-volt opacity-0 transition-opacity group-hover:opacity-100">
          Ver produtos
        </span>
      </div>
    </Link>
  );
}
