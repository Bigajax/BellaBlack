import type { Metadata } from "next";
import { StoreSection } from "@/components/StoreSection";
import { FinalCta } from "@/components/home/FinalCta";
import { site } from "@/data/site.config";

export const metadata: Metadata = {
  title: "Loja Física",
  description: `Visite a ${site.name}: ${site.address.street}, ${site.address.city} — ${site.address.stateFull}. Confira horários, mapa e fale com a loja pelo WhatsApp.`,
};

export default function StorePage() {
  return (
    <div className="pt-16 lg:pt-20">
      <StoreSection />
      <FinalCta />
    </div>
  );
}
