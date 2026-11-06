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

// three.js loads in its own chunk after the page renders
const ScrollArt = lazy(() => import("@/components/carta/ScrollArt"));

// data-room picks the stippled drawing for each theme:
// 0 moth (psyché) · 1 route Brazil–Spain–Ireland · 2 head with a tangle of thoughts
// 3 two armchairs · 4 old key · 5 embroidered heart · 6 door left ajar
const Index = () => {
  return (
    <div className="min-h-screen carta-theme">
      <Suspense fallback={null}><ScrollArt /></Suspense>
      <Header />
      <main className="relative z-10">
        <div data-room="0"><HeroCarta /></div>
        <SocialProof />
        <div data-room="1"><ExteriorBanner /><About /></div>
        <div data-room="2"><SpecialtiesCarta /></div>
        <div data-room="3"><Services /></div>
        <div data-room="4"><Investment /><SocialValues /></div>
        <div data-room="5"><Testimonials /><FAQ /></div>
        <div data-room="6" className="relative">
          <ContactForm />
          {/* the door drawing settles under the contact details on large screens */}
          <div className="carta-contact-art hidden lg:block" data-art-anchor aria-hidden="true" />
        </div>
      </main>
      <div className="relative z-10"><Footer /></div>
      <FloatingWhatsApp />
      <BreatheGuide />
    </div>
  );
};

export default Index;
