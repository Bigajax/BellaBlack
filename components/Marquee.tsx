import { TribalInk } from "./TribalArt";

const WORDS = [
  "Streetwear",
  "Personalidade",
  "Conforto",
  "Atitude",
  "Cultura urbana",
  "Desde 2018",
  "Maringá — PR",
];

/** Faixa de identidade — amarelo com texto preto, movimento contínuo. */
export function Marquee({ variant = "volt" }: { variant?: "volt" | "ink" }) {
  const items = [...WORDS, ...WORDS];
  const isVolt = variant === "volt";
  return (
    <div
      className={`relative -rotate-1 overflow-hidden border-y py-3 ${
        isVolt
          ? "border-ink/20 bg-volt text-ink"
          : "border-graphite bg-coal text-bone"
      }`}
      aria-hidden="true"
    >
      {isVolt && (
        <>
          <TribalInk className="absolute -top-6 left-[12%] w-24 rotate-90 opacity-15" />
          <TribalInk className="absolute -top-7 left-[55%] w-28 -rotate-90 opacity-10" />
          <TribalInk className="absolute -top-6 right-[6%] w-24 rotate-[100deg] opacity-15" />
        </>
      )}
      <div className="relative flex w-max animate-marquee items-center gap-8 whitespace-nowrap">
        {items.map((word, i) => (
          <span
            key={i}
            className={`flex items-center gap-8 font-cond text-lg font-semibold uppercase tracking-[0.25em] ${
              !isVolt && i % 2 === 1 ? "text-volt" : ""
            }`}
          >
            {word}
            <span className="text-sm">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
