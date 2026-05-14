import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Hero } from "@/components/sections/Hero";
import { Approach } from "@/components/sections/Approach";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { ExperienceSystems } from "@/components/sections/ExperienceSystems";
import { HumiSection } from "@/components/sections/HumiSection";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <SelectedWork />
        <HumiSection />
        <Approach />
        <ExperienceSystems />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
