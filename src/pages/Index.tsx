import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TherapyFor from "@/components/TherapyFor";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Testimonials from "@/components/Testimonials";
import DoctoraliaWidget from "@/components/DoctoraliaWidget";
import ContactForm from "@/components/ContactForm";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
const Index = () => {
  return <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <TherapyFor />
        <Services />
        <Testimonials />
        <Contact />
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              
              
            </div>
            <div className="flex justify-center">
              <DoctoraliaWidget />
            </div>
          </div>
        </section>
        <ContactForm />
      </main>
      <FloatingWhatsApp />
    </div>;
};
export default Index;