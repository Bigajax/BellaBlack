import Image from "next/image";

/**
 * Arte tribal oficial da marca (fornecida pela loja), usada como marca
 * d'água espalhada pelos fundos das seções. Sempre decorativa:
 * aria-hidden, sem eventos de ponteiro e com opacidade baixa via className.
 */
export function TribalGlow({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/images/tribal-glow.png"
      alt=""
      aria-hidden
      width={800}
      height={1200}
      className={`pointer-events-none select-none ${className}`}
    />
  );
}

/** Versão preta — para fundos amarelos ou claros. */
export function TribalInk({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/images/tribal-ink.png"
      alt=""
      aria-hidden
      width={800}
      height={1200}
      className={`pointer-events-none select-none ${className}`}
    />
  );
}
