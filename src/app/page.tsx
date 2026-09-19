import { SiteHeader } from "@/components/layout/SiteHeader";
import { Hero } from "@/components/sections/Hero";
import { FieldDesk } from "@/components/sections/FieldDesk";
import { DigitalArtEngineer } from "@/components/sections/DigitalArtEngineer";
import { Building } from "@/components/sections/Building";
import { Notes } from "@/components/sections/Notes";
<<<<<<< HEAD
=======
import { getFeaturedNotes } from "@/lib/notes";
import { LifetimeProvider } from "@/components/timeline/LifetimeContext";
>>>>>>> 8580108 (Make the lifetime readable before anyone plays with it.)

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
<<<<<<< HEAD
        <FieldDesk />
        <DigitalArtEngineer />
=======
        <Philosophy />
        <LifetimeProvider>
          <FieldDesk />
          <DigitalArtEngineer />
        </LifetimeProvider>
        <CurrentFocus />
>>>>>>> 8580108 (Make the lifetime readable before anyone plays with it.)
        <Building />
        <Notes />
      </main>
    </>
  );
}
