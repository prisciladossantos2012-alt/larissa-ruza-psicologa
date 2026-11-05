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

// three.js loads in its own chunk after the page renders, so it never delays the first paint
const MindField = lazy(() => import("@/components/mind/MindField"));

// data-mind chapters: 0 butterfly (psyché) · 1 Ψ · 2 the knot · 3 breath · 4 chrysalis · 5 Rorschach · 6 the world
const Index = () => {
  return (
    <div className="min-h-screen">
      <Suspense fallback={null}><MindField /></Suspense>
      <Header />
      <main className="relative z-10">
        <div data-mind="0"><Hero /></div>
        <ExteriorBanner />
        <SocialProof />
        <div data-mind="1"><About /></div>
        <div data-mind="2"><TherapyFor /></div>
        <div data-mind="3"><Services /></div>
        <div data-mind="4"><Investment /><SocialValues /></div>
        <div data-mind="5"><Testimonials /><FAQ /></div>
        <div data-mind="6"><ContactForm /></div>
      </main>
      <div className="relative z-10"><Footer /></div>
      <FloatingWhatsApp />
      <BreatheGuide />
    </div>
  );
};

export default Index;
