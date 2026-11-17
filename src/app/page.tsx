import { About, Approach, Contact, Faq, Footer, Header, Hero, Macros, PlateModel, Recipes, Ribbon, Services } from "@/components/site";
import { DayFlow, Myths, Seasons, Water } from "@/components/extra";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Ribbon />
        <Approach />
        <PlateModel />
        <DayFlow />
        <Macros />
        <Seasons />
        <Services />
        <Recipes />
        <Myths />
        <Water />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />

    </>
  );
}
