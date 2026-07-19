import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/Marquee";
import { Categories } from "@/components/home/Categories";
import { NewArrivals } from "@/components/home/NewArrivals";
import { Looks } from "@/components/home/Looks";
import { About } from "@/components/home/About";
import { SocialProof } from "@/components/home/SocialProof";
import { StoreSection } from "@/components/StoreSection";
import { FinalCta } from "@/components/home/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Categories />
      <NewArrivals />
      <Looks />
      <About />
      <SocialProof />
      <StoreSection />
      <FinalCta />
    </>
  );
}
