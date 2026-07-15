import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Hero } from "@/components/sections/Hero";
import { Philosophy } from "@/components/sections/Philosophy";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { About } from "@/components/sections/About";
import { Process } from "@/components/sections/Process";
import { Writing } from "@/components/sections/Writing";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Philosophy />
        <SelectedWork />
        <About />
        <Process />
        <Writing />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
