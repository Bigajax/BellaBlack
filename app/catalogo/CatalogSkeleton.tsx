/** Skeleton exibido enquanto o catálogo carrega. */
export function CatalogSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-32 sm:px-6">
      <div className="h-4 w-28 animate-pulse bg-graphite" />
      <div className="mt-4 h-12 w-72 max-w-full animate-pulse bg-graphite" />
      <div className="mt-8 h-12 w-full animate-pulse bg-graphite" />
      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="border border-white/10">
            <div className="aspect-[3/4] animate-pulse bg-graphite" />
            <div className="space-y-2 p-3.5">
              <div className="h-3 w-1/2 animate-pulse bg-graphite" />
              <div className="h-4 w-3/4 animate-pulse bg-graphite" />
              <div className="h-5 w-1/3 animate-pulse bg-graphite" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
