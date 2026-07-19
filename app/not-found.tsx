import Link from "next/link";
import { TribalGlow } from "@/components/TribalArt";

export default function NotFound() {
  return (
    <div className="grain relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4 pt-20 text-center">
      <TribalGlow className="absolute -left-20 top-20 w-64 rotate-12 opacity-[0.12]" />
      <p className="font-display text-8xl uppercase text-volt">404</p>
      <h1 className="mt-4 font-display text-3xl uppercase text-bone">
        Essa peça não está na arara
      </h1>
      <p className="mt-3 max-w-sm text-sm text-bone/60">
        O endereço que você procurou não existe ou saiu de linha. O catálogo
        completo continua no lugar de sempre.
      </p>
      <Link
        href="/catalogo"
        className="clip-tag mt-8 bg-volt py-4 pl-7 pr-10 font-cond text-sm font-bold uppercase tracking-wider text-ink"
      >
        Ir para o catálogo
      </Link>
    </div>
  );
}
