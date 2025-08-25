import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TherapyFor from "@/components/TherapyFor";
import Services from "@/components/Services";
import Autocuidado from "@/components/Autocuidado";
import Contact from "@/components/Contact";
import ContactForm from "@/components/ContactForm";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <TherapyFor />
        <Services />
        <Autocuidado />
        <Contact />
        <ContactForm />
      </main>
      <FloatingWhatsApp />
    </div>
  );
};

export default Index;