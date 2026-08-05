import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Hero } from "@/components/sections/Hero";
import { Philosophy } from "@/components/sections/Philosophy";
import { CurrentFocus } from "@/components/sections/CurrentFocus";
import { Building } from "@/components/sections/Building";
import { Notes } from "@/components/sections/Notes";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Philosophy />
        <CurrentFocus />
        <Building />
        <Notes />
      </main>
      <SiteFooter />
    </>
  );
}
