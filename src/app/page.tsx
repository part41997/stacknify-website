import dynamic from "next/dynamic";

import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Services } from "@/components/sections/services";
import { Solutions } from "@/components/sections/solutions";
import { Testimonials } from "@/components/sections/testimonials";

const FinalCta = dynamic(() =>
  import("@/components/sections/final-cta").then((module) => module.FinalCta),
);

export default function Home() {
  return (
    <>
      <Hero />
      <Solutions />
      <Services />
      <Projects />
      <Testimonials />
      <FinalCta />
      <Contact />
    </>
  );
}
