import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Hero } from "@/components/sections/Hero";
import { Approach } from "@/components/sections/Approach";
import { FeaturedProject } from "@/components/sections/FeaturedProject";
import { Systems } from "@/components/sections/Systems";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <FeaturedProject />
        <Systems />
        <Approach />
        <About />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
