import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TherapyFor from "@/components/TherapyFor";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const Index = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <TherapyFor />
        <Services />
        <Contact />
      </main>
      <FloatingWhatsApp />
    </>
  );
};

export default Index;