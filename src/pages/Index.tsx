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
import { lazy, Suspense } from "react";
import BreatheGuide from "@/components/mind/BreatheGuide";
import "@/components/psyche/psyche-theme.css";

// three.js loads in its own chunk after the page renders, so it never delays the first paint
const StippleField = lazy(() => import("@/components/psyche/StippleField"));

// data-room picks the stippled drawing: 0 moth · 1 her wooden chair · 2 tangled thread · 3 ensō breath · 4 old key · 5 crochet heart · 6 arch of Seville
const Index = () => {
  return (
    <div className="min-h-screen psyche-theme">
      <Suspense fallback={null}><StippleField /></Suspense>
      <div className="psyche-grain" aria-hidden="true" />
      <Header />
      <main className="relative z-10">
        <div data-room="0"><Hero /></div>
        <ExteriorBanner />
        <SocialProof />
        <div data-room="1"><About /></div>
        <div data-room="2"><TherapyFor /></div>
        <div data-room="3"><Services /></div>
        <div data-room="4"><Investment /><SocialValues /></div>
        <div data-room="5"><Testimonials /><FAQ /></div>
        <div data-room="6"><ContactForm /></div>
      </main>
      <div className="relative z-10 isolate [--background:0_0%_100%] [--foreground:0_0%_15%]"><Footer /></div>
      <FloatingWhatsApp />
      <BreatheGuide />
    </div>
  );
};

export default Index;
