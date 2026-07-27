import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Journey } from "@/components/Journey";
// import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Journey />
      {/* Projetos: descomente o import acima e a linha abaixo quando houver
          trabalhos para mostrar. A lista fica em components/Projects.tsx e o
          item do menu, em lib/site.ts. */}
      {/* <Projects /> */}
      <Contact />
    </>
  );
}
