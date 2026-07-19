import { site, mapsEmbedUrl, mapsUrl } from "@/data/site.config";
import { waLocation } from "@/lib/whatsapp";
import { SectionTitle } from "@/components/SectionTitle";
import { Reveal } from "@/components/Reveal";
import { InstagramIcon, MapPinIcon, WhatsAppIcon } from "@/components/icons";

/** Seção de localização — usada na home e na página Loja Física. */
export function StoreSection() {
  return (
    <section className="border-y border-white/10 bg-coal">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <Reveal>
          <SectionTitle
            eyebrow="Loja física"
            title="Encontre a Bella Black"
            description="Passa na loja para provar as peças, conhecer os lançamentos antes de todo mundo e retirar seu pedido na hora."
            tribal
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="flex h-full flex-col justify-between gap-8 border border-white/10 bg-graphite p-6 sm:p-8">
              <div>
                <p className="flex items-start gap-3">
                  <MapPinIcon className="mt-1 size-5 shrink-0 text-volt" />
                  <span className="text-lg leading-snug text-bone">
                    {site.address.street}
                    <br />
                    <span className="text-bone/60">
                      {site.address.city} — {site.address.stateFull}
                    </span>
                  </span>
                </p>
                <dl className="mt-6 space-y-1.5 border-t border-white/10 pt-6">
                  {site.hours.map((h) => (
                    <div key={h.days} className="flex justify-between gap-4 text-sm">
                      <dt className="text-bone/55">{h.days}</dt>
                      <dd className="font-cond font-semibold uppercase tracking-wider text-bone">
                        {h.time}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="grid gap-3">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clip-tag flex items-center justify-center gap-2 bg-volt py-3.5 pl-4 pr-7 font-cond text-sm font-bold uppercase tracking-wider text-ink transition-transform hover:-translate-y-0.5"
                >
                  <MapPinIcon className="size-4" />
                  Abrir no Google Maps
                </a>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={waLocation}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="stitch flex items-center justify-center gap-2 border border-white/25 py-3.5 font-cond text-sm font-bold uppercase tracking-wider text-bone transition-colors hover:border-volt hover:text-volt"
                  >
                    <WhatsAppIcon className="size-4" />
                    WhatsApp
                  </a>
                  <a
                    href={site.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="stitch flex items-center justify-center gap-2 border border-white/25 py-3.5 font-cond text-sm font-bold uppercase tracking-wider text-bone transition-colors hover:border-volt hover:text-volt"
                  >
                    <InstagramIcon className="size-4" />
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative min-h-[320px] overflow-hidden border border-white/10 lg:h-full">
              <iframe
                src={mapsEmbedUrl}
                title={`Mapa — ${site.name}, ${site.address.street}, ${site.address.city}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full contrast-[1.05] grayscale invert-[0.92]"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
