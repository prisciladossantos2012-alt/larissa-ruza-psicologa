import Header from "@/components/Header";
import ExteriorBanner from "@/components/ExteriorBanner";
import SocialProof from "@/components/SocialProof";
import About from "@/components/About";
import Services from "@/components/Services";
import Investment from "@/components/Investment";
import SocialValues from "@/components/SocialValues";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import BreatheGuide from "@/components/mind/BreatheGuide";
import HeroCarta from "@/components/carta/HeroCarta";
import SpecialtiesCarta from "@/components/carta/SpecialtiesCarta";
import { lazy, Suspense } from "react";
import "@/components/carta/carta-theme.css";

// three.js only loads in the chunks of the interactive pieces, after the page renders
const EmbroideredHeart = lazy(() => import("@/components/carta/EmbroideredHeart"));

const Index = () => {
  return (
    <div className="min-h-screen carta-theme">
      <Header />
      <main>
        <HeroCarta />
        <SocialProof />
        <ExteriorBanner />
        <About />
        <SpecialtiesCarta />
        <Services />
        <Investment />
        <SocialValues />
        <Testimonials />
        <FAQ />
        <div className="relative">
          <ContactForm />
          <Suspense fallback={null}>
            <EmbroideredHeart className="hidden lg:block absolute left-[max(24px,calc(50%-600px))] bottom-6 w-[260px] h-[260px] pointer-events-auto" />
          </Suspense>
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
      <BreatheGuide />
    </div>
  );
};

export default Index;
