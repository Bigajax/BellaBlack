import Image from "next/image";
import { site } from "@/data/site.config";
import { SectionTitle } from "@/components/SectionTitle";
import { Reveal } from "@/components/Reveal";
import { InstagramIcon } from "@/components/icons";

const shots = [
  { src: "/images/catalog/bb-28.jpg", alt: "Cliente com camiseta graffiti da Bella Black" },
  { src: "/images/catalog/bb-24.jpg", alt: "Look de rua com calça baggy web da Bella Black" },
  { src: "/images/catalog/bb-27.jpg", alt: "Cliente de costas com camiseta estampada Bella Black" },
  { src: "/images/catalog/bb-30.jpg", alt: "Cliente com conjunto zipper cinza da Bella Black" },
];

const quotes = [
  {
    text: "Atendimento diferenciado e as peças chegam antes de todo mundo. Virei cliente fixo.",
    author: "Cliente via Instagram",
  },
  {
    text: "Qualidade das baggys é outro nível. Fit pesado sem pagar preço de importado.",
    author: "Cliente via WhatsApp",
  },
];

export function SocialProof() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
      <Reveal>
        <SectionTitle
          eyebrow="Prova social"
          title="Quem usa, representa."
          description={`Looks reais direto do ${site.instagramHandle}. Publicou com a peça? A gente reposta.`}
          tribal
        />
      </Reveal>

      <div className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {shots.map((shot, i) => (
          <Reveal key={shot.src} delay={i * 70}>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative block overflow-hidden border border-white/10 ${
                i % 2 === 1 ? "lg:translate-y-6" : ""
              }`}
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 grid place-items-center bg-ink/0 transition-colors group-hover:bg-ink/50">
                  <InstagramIcon className="size-8 text-bone opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      <div className="mt-14 grid gap-4 md:grid-cols-2">
        {quotes.map((quote, i) => (
          <Reveal key={quote.author + i} delay={i * 80}>
            <figure className="stitch h-full border border-white/15 bg-coal p-6">
              <blockquote className="text-base leading-relaxed text-bone/80">
                “{quote.text}”
              </blockquote>
              <figcaption className="mt-4 font-cond text-xs font-bold uppercase tracking-[0.2em] text-volt">
                {quote.author}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <Reveal delay={100}>
        <a
          href={site.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 flex items-center justify-center gap-3 border border-volt/50 py-5 font-cond text-sm font-bold uppercase tracking-[0.2em] text-volt transition-colors hover:bg-volt hover:text-ink"
        >
          <InstagramIcon className="size-5" />
          Marque a Bella Black no seu look — {site.instagramHandle}
        </a>
      </Reveal>
    </section>
  );
}
