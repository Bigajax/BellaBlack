"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { activeProducts, allSizes } from "@/data/products";
import { categories, categoryNames } from "@/data/categories";
import type { CategoryId, Fit } from "@/data/types";
import { ProductCard } from "@/components/ProductCard";
import { CloseIcon, FilterIcon, SearchIcon } from "@/components/icons";
import { TribalGlow } from "@/components/TribalArt";

type SortKey = "destaques" | "recentes" | "procurados" | "menor" | "maior";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "destaques", label: "Destaques" },
  { key: "recentes", label: "Mais recentes" },
  { key: "procurados", label: "Mais procurados" },
  { key: "menor", label: "Menor preço" },
  { key: "maior", label: "Maior preço" },
];

const fits: { key: Fit; label: string }[] = [
  { key: "oversized", label: "Oversized" },
  { key: "baggy", label: "Baggy" },
  { key: "regular", label: "Regular" },
  { key: "slim", label: "Slim" },
];

const priceRanges = [
  { key: "ate-150", label: "Até R$ 150", min: 0, max: 150 },
  { key: "150-250", label: "R$ 150 a R$ 250", min: 150, max: 250 },
  { key: "250-350", label: "R$ 250 a R$ 350", min: 250, max: 350 },
  { key: "acima-350", label: "Acima de R$ 350", min: 350, max: Infinity },
];

/** Cores dos produtos agrupadas em famílias filtráveis. */
const colorGroups = [
  { key: "preto", label: "Preto", match: ["Preto", "Preto estonado", "Preto acid", "Grafite"] },
  { key: "cinza", label: "Cinza", match: ["Cinza estonado", "Cinza acid", "Cinza claro", "Cinza mescla", "Cinza"] },
  { key: "branco", label: "Branco / Off-white", match: ["Branco", "Off-white"] },
  { key: "azul", label: "Azul", match: ["Azul lavado", "Azul claro"] },
  { key: "verde", label: "Verde", match: ["Verde-oliva", "Verde-musgo"] },
  { key: "caramelo", label: "Caramelo", match: ["Caramelo"] },
];

interface Props {
  initialCategory: string | null;
  initialNewOnly: boolean;
  initialQuery: string;
}

export function CatalogClient({ initialCategory, initialNewOnly, initialQuery }: Props) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<CategoryId | null>(
    categories.some((c) => c.id === initialCategory)
      ? (initialCategory as CategoryId)
      : null,
  );
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [fit, setFit] = useState<Fit | null>(null);
  const [price, setPrice] = useState<string | null>(null);
  const [newOnly, setNewOnly] = useState(initialNewOnly);
  const [sort, setSort] = useState<SortKey>(initialNewOnly ? "recentes" : "destaques");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  // foco na busca quando a página é aberta via /catalogo#busca
  useEffect(() => {
    if (window.location.hash === "#busca") searchRef.current?.focus();
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const filtered = useMemo(() => {
    let list = activeProducts.filter((p) => p.inStock);

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.brand ?? "").toLowerCase().includes(q) ||
          categoryNames[p.category].toLowerCase().includes(q) ||
          p.code.toLowerCase().includes(q),
      );
    }
    if (category) list = list.filter((p) => p.category === category);
    if (sizes.length) list = list.filter((p) => sizes.some((s) => p.sizes.includes(s)));
    if (colors.length) {
      const wanted = colorGroups
        .filter((g) => colors.includes(g.key))
        .flatMap((g) => g.match);
      list = list.filter((p) => p.colors.some((c) => wanted.includes(c)));
    }
    if (fit) list = list.filter((p) => p.fit === fit);
    if (price) {
      const range = priceRanges.find((r) => r.key === price)!;
      list = list.filter((p) => {
        const value = p.promoPrice ?? p.price;
        return value >= range.min && value < range.max;
      });
    }
    if (newOnly) list = list.filter((p) => p.isLaunch);

    switch (sort) {
      case "recentes":
        list = [...list].sort(
          (a, b) => Number(b.isLaunch) - Number(a.isLaunch) || b.order - a.order,
        );
        break;
      case "procurados":
        list = [...list].sort(
          (a, b) =>
            Number(b.badges.includes("Mais vendido")) -
              Number(a.badges.includes("Mais vendido")) || a.order - b.order,
        );
        break;
      case "menor":
        list = [...list].sort(
          (a, b) => (a.promoPrice ?? a.price) - (b.promoPrice ?? b.price),
        );
        break;
      case "maior":
        list = [...list].sort(
          (a, b) => (b.promoPrice ?? b.price) - (a.promoPrice ?? a.price),
        );
        break;
      default:
        list = [...list].sort(
          (a, b) => Number(b.isFeatured) - Number(a.isFeatured) || a.order - b.order,
        );
    }
    return list;
  }, [query, category, sizes, colors, fit, price, newOnly, sort]);

  const chips: { label: string; clear: () => void }[] = [
    ...(category
      ? [{ label: categoryNames[category], clear: () => setCategory(null) }]
      : []),
    ...sizes.map((s) => ({
      label: `Tamanho ${s}`,
      clear: () => setSizes((prev) => prev.filter((x) => x !== s)),
    })),
    ...colors.map((c) => ({
      label: colorGroups.find((g) => g.key === c)?.label ?? c,
      clear: () => setColors((prev) => prev.filter((x) => x !== c)),
    })),
    ...(fit ? [{ label: fits.find((f) => f.key === fit)!.label, clear: () => setFit(null) }] : []),
    ...(price
      ? [{ label: priceRanges.find((r) => r.key === price)!.label, clear: () => setPrice(null) }]
      : []),
    ...(newOnly ? [{ label: "Novidades", clear: () => setNewOnly(false) }] : []),
  ];

  const clearAll = () => {
    setCategory(null);
    setSizes([]);
    setColors([]);
    setFit(null);
    setPrice(null);
    setNewOnly(false);
    setQuery("");
  };

  const filterPanel = (
    <div className="space-y-7">
      <FilterGroup label="Categoria">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Pill
              key={c.id}
              active={category === c.id}
              onClick={() => setCategory(category === c.id ? null : c.id)}
            >
              {c.name}
            </Pill>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Novidades">
        <Pill active={newOnly} onClick={() => setNewOnly(!newOnly)}>
          Só lançamentos
        </Pill>
      </FilterGroup>

      <FilterGroup label="Tamanho">
        <div className="flex flex-wrap gap-2">
          {allSizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
                )
              }
              aria-pressed={sizes.includes(s)}
              className={`min-w-10 border px-2 py-1.5 font-cond text-sm font-semibold transition-colors ${
                sizes.includes(s)
                  ? "border-volt bg-volt text-ink"
                  : "border-white/20 text-bone/70 hover:border-bone/50"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Cor">
        <div className="flex flex-wrap gap-2">
          {colorGroups.map((g) => (
            <Pill
              key={g.key}
              active={colors.includes(g.key)}
              onClick={() =>
                setColors((prev) =>
                  prev.includes(g.key)
                    ? prev.filter((x) => x !== g.key)
                    : [...prev, g.key],
                )
              }
            >
              {g.label}
            </Pill>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Modelagem">
        <div className="flex flex-wrap gap-2">
          {fits.map((f) => (
            <Pill
              key={f.key}
              active={fit === f.key}
              onClick={() => setFit(fit === f.key ? null : f.key)}
            >
              {f.label}
            </Pill>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Faixa de preço">
        <div className="flex flex-wrap gap-2">
          {priceRanges.map((r) => (
            <Pill
              key={r.key}
              active={price === r.key}
              onClick={() => setPrice(price === r.key ? null : r.key)}
            >
              {r.label}
            </Pill>
          ))}
        </div>
      </FilterGroup>

      {chips.length > 0 && (
        <button
          type="button"
          onClick={clearAll}
          className="w-full border border-white/20 py-3 font-cond text-sm font-bold uppercase tracking-wider text-bone/70 transition-colors hover:border-volt hover:text-volt"
        >
          Limpar filtros
        </button>
      )}
    </div>
  );

  return (
    <div className="relative mx-auto max-w-7xl overflow-x-clip px-4 pb-24 pt-28 sm:px-6 lg:pt-32">
      <TribalGlow className="absolute -right-24 -top-10 w-72 rotate-[140deg] opacity-[0.08]" />
      <p className="inline-block bg-graphite px-3 py-1 font-cond text-xs font-bold uppercase tracking-[0.25em] text-volt">
        {activeProducts.length} peças no catálogo
      </p>
      <h1 className="mt-4 font-display text-4xl uppercase leading-none text-bone sm:text-6xl">
        Catálogo <span className="text-volt">Bella Black</span>
      </h1>
      <p className="mt-4 max-w-2xl text-base text-bone/60">
        Peças escolhidas para quem não passa despercebido. Achou a sua? Chama a
        gente no WhatsApp que separamos o seu tamanho.
      </p>

      {/* busca + ordenação */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row" id="busca">
        <label className="relative flex-1">
          <span className="sr-only">Buscar produto</span>
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-bone/40" />
          <input
            ref={searchRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por peça, marca ou código…"
            className="w-full border border-white/15 bg-coal py-3.5 pl-12 pr-4 text-base text-bone placeholder:text-bone/35 focus:border-volt focus:outline-none"
          />
        </label>
        <label className="sm:w-56">
          <span className="sr-only">Ordenar por</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="w-full appearance-none border border-white/15 bg-coal px-4 py-3.5 font-cond text-sm font-semibold uppercase tracking-wider text-bone focus:border-volt focus:outline-none"
          >
            {sortOptions.map((o) => (
              <option key={o.key} value={o.key}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="flex items-center justify-center gap-2 border border-white/15 bg-coal px-5 py-3.5 font-cond text-sm font-bold uppercase tracking-wider text-bone lg:hidden"
        >
          <FilterIcon className="size-5" />
          Filtros{chips.length > 0 && ` (${chips.length})`}
        </button>
      </div>

      {/* chips de filtros ativos */}
      {chips.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {chips.map((chip) => (
            <button
              key={chip.label}
              type="button"
              onClick={chip.clear}
              className="flex items-center gap-1.5 bg-volt px-3 py-1.5 font-cond text-xs font-bold uppercase tracking-wider text-ink"
            >
              {chip.label}
              <CloseIcon className="size-3.5" />
            </button>
          ))}
          <button
            type="button"
            onClick={clearAll}
            className="font-cond text-xs font-bold uppercase tracking-wider text-bone/50 underline-offset-4 hover:text-volt hover:underline"
          >
            Limpar filtros
          </button>
        </div>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-[250px_1fr]">
        {/* filtros — lateral no desktop */}
        <aside className="hidden lg:block" aria-label="Filtros">
          <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto border border-white/10 bg-coal p-5">
            {filterPanel}
          </div>
        </aside>

        <div>
          <p className="font-cond text-sm uppercase tracking-wider text-bone/45">
            {filtered.length} {filtered.length === 1 ? "peça encontrada" : "peças encontradas"}
          </p>
          {filtered.length > 0 ? (
            <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-3 2xl:grid-cols-4">
              {filtered.map((product, i) => (
                <ProductCard key={product.slug} product={product} priority={i < 4} />
              ))}
            </div>
          ) : (
            <div className="stitch mt-4 border border-white/15 bg-coal p-10 text-center">
              <p className="font-display text-2xl uppercase text-bone">
                Nenhuma peça com esses filtros
              </p>
              <p className="mt-2 text-sm text-bone/60">
                Tente remover algum filtro — ou chama no WhatsApp que a gente
                busca a peça para você.
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="mt-6 bg-volt px-6 py-3 font-cond text-sm font-bold uppercase tracking-wider text-ink"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </div>
      </div>

      {/* painel de filtros mobile */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-label="Filtros">
          <button
            type="button"
            aria-label="Fechar filtros"
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[82vh] overflow-y-auto border-t-2 border-volt bg-coal p-5 pb-10">
            <div className="mb-5 flex items-center justify-between">
              <p className="font-display text-xl uppercase text-bone">Filtros</p>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Fechar"
                className="grid size-10 place-items-center text-bone"
              >
                <CloseIcon className="size-5" />
              </button>
            </div>
            {filterPanel}
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="mt-6 w-full bg-volt py-4 font-cond text-sm font-bold uppercase tracking-wider text-ink"
            >
              Ver {filtered.length} {filtered.length === 1 ? "peça" : "peças"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset>
      <legend className="mb-3 font-cond text-xs font-bold uppercase tracking-[0.22em] text-bone/45">
        {label}
      </legend>
      {children}
    </fieldset>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`border px-3 py-1.5 font-cond text-sm font-semibold transition-colors ${
        active
          ? "border-volt bg-volt text-ink"
          : "border-white/20 text-bone/70 hover:border-bone/50"
      }`}
    >
      {children}
    </button>
  );
}
