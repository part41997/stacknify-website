import dynamic from "next/dynamic";

import { About } from "@/components/sections/about";
import { AiDevelopment } from "@/components/sections/ai-development";
import { Contact } from "@/components/sections/contact";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Insights } from "@/components/sections/insights";
import { ProblemSolution } from "@/components/sections/problem-solution";
import { Process } from "@/components/sections/process";
import { Projects } from "@/components/sections/projects";
import { Services } from "@/components/sections/services";
import { Solutions } from "@/components/sections/solutions";
import { Stats } from "@/components/sections/stats";
import { Technology } from "@/components/sections/technology";
import { Testimonials } from "@/components/sections/testimonials";
import { Why } from "@/components/sections/why";
import { JsonLd } from "@/components/seo";
import { faqJsonLd } from "@/lib/json-ld";

const FinalCta = dynamic(() =>
  import("@/components/sections/final-cta").then((module) => module.FinalCta),
);

export default function Home() {
  return (
    <>
      <JsonLd data={faqJsonLd()} />
      <Hero />
      <Solutions />
      <Services />
      <ProblemSolution />
      <Technology />
      <AiDevelopment />
      <Projects />
      <About />
      <Why />
      <Process />
      <Stats />
      <Insights />
      <Testimonials />
      <Faq />
      <FinalCta />
      <Contact />
    </>
  );
}
