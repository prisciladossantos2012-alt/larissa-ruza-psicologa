import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ExteriorBanner from "@/components/ExteriorBanner";
import SocialProof from "@/components/SocialProof";
import About from "@/components/About";
import TherapyFor from "@/components/TherapyFor";
import Services from "@/components/Services";
import Investment from "@/components/Investment";
import SocialValues from "@/components/SocialValues";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ExteriorBanner />
        <SocialProof />
        <About />
        <TherapyFor />
        <Services />
        <Investment />
        <SocialValues />
        <Testimonials />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Index;
