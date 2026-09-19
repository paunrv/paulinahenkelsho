import { SiteHeader } from "@/components/layout/SiteHeader";
import { Hero } from "@/components/sections/Hero";
import { FieldDesk } from "@/components/sections/FieldDesk";
import { DigitalArtEngineer } from "@/components/sections/DigitalArtEngineer";
import { Building } from "@/components/sections/Building";
import { Notes } from "@/components/sections/Notes";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <FieldDesk />
        <DigitalArtEngineer />
        <Building />
        <Notes />
      </main>
    </>
  );
}
