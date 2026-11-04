import { Hero } from "../sections/Hero";
import { Services } from "../sections/Services";
import { Projects } from "../sections/Projects";
import { Process } from "../sections/Process";
import { About } from "../sections/About";
import { Faq } from "../sections/Faq";
export function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Projects />
      <Process />
      <About />
      <Faq />
    </>
  );
}
