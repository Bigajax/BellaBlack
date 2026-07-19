import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogClient } from "./CatalogClient";
import { CatalogSkeleton } from "./CatalogSkeleton";

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "Catálogo completo da Bella Black: camisetas oversized, calças baggy, moletons, conjuntos, jaquetas e acessórios. Peça pelo WhatsApp.",
};

interface SearchParams {
  categoria?: string;
  novidades?: string;
  busca?: string;
}

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  return (
    <Suspense fallback={<CatalogSkeleton />}>
      <CatalogClient
        initialCategory={params.categoria ?? null}
        initialNewOnly={params.novidades === "1"}
        initialQuery={params.busca ?? ""}
      />
    </Suspense>
  );
}
