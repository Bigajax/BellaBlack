import type { SVGProps } from "react";

/**
 * Grafismos tribais desenhados a partir das estampas das calças da loja —
 * espinhos afiados com curvas orgânicas. Usados como marca d'água, atrás
 * de títulos e nas divisões de seção.
 */
export function TribalSwash(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 320 96" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M0 88c34-4 58-14 76-38-2 20 4 26 16 20 16-9 26-28 34-52-1 24 6 30 18 22 14-10 22-24 28-40 2 22 10 26 22 18 13-9 21-20 27-32 4 18 12 22 24 16 12-7 19-16 25-26-2 26-14 44-34 56 12 2 20-2 30-10-8 20-24 32-48 36 8 6 18 6 30 2-14 14-32 20-56 18 4 8 12 12 24 12-20 8-38 6-54-6-2 10 2 16 10 22-22-2-36-10-44-24-6 8-6 16-2 26-14-8-22-18-24-32-8 6-11 12-12 20Z" />
    </svg>
  );
}

export function TribalSpike(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 240" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M60 0c6 38 22 62 48 78-20 2-32-2-44-12 4 26 16 44 38 56-18 4-32 0-44-10 2 28 12 48 32 62-16 2-28-4-38-14 0 30 8 52 26 68-26-10-42-30-48-58-6 24-4 44 8 62C14 218 4 192 8 156c-8 10-10 22-8 36C-8 164-2 136 16 116 4 112-2 116 0 124 2 92 18 70 44 58 32 52 24 54 16 60 30 34 46 16 60 0Z" />
    </svg>
  );
}

/** Selo circular giratório — "vitrine viva" do hero e da seção sobre. */
export function SealSince({
  className,
  size = 120,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <path
          id="seal-circle"
          d="M50 50 m -36 0 a 36 36 0 1 1 72 0 a 36 36 0 1 1 -72 0"
        />
      </defs>
      <circle cx="50" cy="50" r="49" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 4" />
      <text
        fontSize="10.5"
        letterSpacing="2.6"
        fill="currentColor"
        style={{ fontFamily: "var(--font-cond)", fontWeight: 600 }}
      >
        <textPath href="#seal-circle">BELLA BLACK • DESDE 2018 • STREETWEAR •</textPath>
      </text>
      <text
        x="50"
        y="57"
        textAnchor="middle"
        fontSize="22"
        fill="currentColor"
        style={{ fontFamily: "var(--font-display)" }}
      >
        BB
      </text>
    </svg>
  );
}
