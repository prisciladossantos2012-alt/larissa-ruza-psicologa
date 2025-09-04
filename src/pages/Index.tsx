import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TherapyFor from "@/components/TherapyFor";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import DoctoraliaWidget from "@/components/DoctoraliaWidget";
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
        <Contact />
        <section className="py-16 sm:py-20 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-playfair text-primary mb-4">
                Agende Online
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Use o widget abaixo para agendar sua consulta diretamente pelo Doctoralia
              </p>
            </div>
            <div className="flex justify-center">
              <DoctoraliaWidget />
            </div>
          </div>
        </section>
        <ContactForm />
      </main>
      <FloatingWhatsApp />
    </div>
  );
};

export default Index;