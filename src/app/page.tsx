import { About } from "@/components/portfolio/About";
import { Hero } from "@/components/portfolio/Hero";
import { Projects } from "@/components/portfolio/Projects";
import { SiteFooter } from "@/components/portfolio/SiteFooter";
import { SiteNav } from "@/components/portfolio/SiteNav";

export default function HomePage() {
  return (
    <main>
      <SiteNav />
      <Hero />
      <About />
      <Projects />
      <SiteFooter />
    </main>
  );
}
