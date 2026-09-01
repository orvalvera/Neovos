import Preloader from "@/components/sections/Preloader";
import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import WhoWeAre from "@/components/sections/WhoWeAre";
import Partners from "@/components/sections/Partners";
import Manifesto from "@/components/sections/Manifesto";
import Problem from "@/components/sections/Problem";
import Method from "@/components/sections/Method";
import Solutions from "@/components/sections/Solutions";
import TrackRecord from "@/components/sections/TrackRecord";
import ContactCTA from "@/components/sections/ContactCTA";
import Footer from "@/components/sections/Footer";
import ThemeZone from "@/components/ThemeZone";

export default function Home() {
  return (
    <>
      <Preloader />
      <Nav />
      <main>
        <Hero />
        <WhoWeAre />
        <Partners />
        <ThemeZone>
          <Manifesto />
          <Problem />
        </ThemeZone>
        <TrackRecord />
        <Method />
        <Solutions />
        <ContactCTA />
        <Footer />
      </main>
    </>
  );
}
