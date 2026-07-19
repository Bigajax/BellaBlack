import type { ReactNode } from "react";
import { TribalGlow } from "./TribalArt";

/** Título de seção com eyebrow etiquetado e grafismo tribal discreto. */
export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  tribal = false,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  tribal?: boolean;
}) {
  return (
    <div
      className={`relative ${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-3xl"}`}
    >
      {tribal && (
        <TribalGlow
          className={`absolute -top-16 w-40 rotate-[65deg] opacity-[0.13] ${
            align === "center" ? "left-1/2 -translate-x-1/2" : "-left-10"
          }`}
        />
      )}
      <p
        className={`inline-block bg-graphite px-3 py-1 font-cond text-xs font-bold uppercase tracking-[0.25em] text-volt`}
      >
        {eyebrow}
      </p>
      <h2 className="relative mt-4 font-display text-4xl uppercase leading-[0.95] text-bone sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base leading-relaxed text-bone/60`}>{description}</p>
      )}
    </div>
  );
}
