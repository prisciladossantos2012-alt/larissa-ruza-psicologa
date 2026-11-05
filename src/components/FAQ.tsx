import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { trackAndRedirectWhatsApp } from "@/lib/analytics";
import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const { t } = useTranslation();
  const faqs = (t("faq.items", { returnObjects: true }) as Array<{ q: string; a: string }>) || [];
  const { ref: titleRef, inView: titleInView } = useScrollAnimation();

  const handleCta = () => {
    trackAndRedirectWhatsApp(
      "faq_cta_click",
      t("faq.cta"),
      "Olá, Larissa. Li as informações do site e ainda tenho algumas dúvidas sobre o processo terapêutico."
    );
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div ref={titleRef} className={`text-center mb-12 ${titleInView ? "animate-fade-in" : "opacity-0"}`}>
            <p className="text-sm uppercase tracking-widest text-primary font-medium mb-3">{t("faq.eyebrow")}</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground">
              {t("faq.title")}
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="bg-muted rounded-xl border border-border px-6"
              >
                <AccordionTrigger className="text-left font-medium text-foreground text-base hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-light leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-12">
            <button
              onClick={handleCta}
              className="inline-flex items-center gap-2 border-2 border-primary text-primary px-8 py-3.5 rounded-lg text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-pointer"
            >
              {t("faq.cta")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
