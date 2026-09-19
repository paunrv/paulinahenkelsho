import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Hero } from "@/components/sections/Hero";
import { Philosophy } from "@/components/sections/Philosophy";
import { FieldDesk } from "@/components/sections/FieldDesk";
import { DigitalArtEngineer } from "@/components/sections/DigitalArtEngineer";
import { CurrentFocus } from "@/components/sections/CurrentFocus";
import { Building } from "@/components/sections/Building";
import { Notes } from "@/components/sections/Notes";
import { getFeaturedNotes } from "@/lib/notes";
import { LifetimeProvider } from "@/components/timeline/LifetimeContext";

export default function Home() {
  const featuredNotes = getFeaturedNotes();

  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Philosophy />
        <LifetimeProvider>
          <FieldDesk />
          <DigitalArtEngineer />
        </LifetimeProvider>
        <CurrentFocus />
        <Building />
        <Notes notes={featuredNotes} />
      </main>
      <SiteFooter />
    </>
  );
}
