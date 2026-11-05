import { Heart, Brain, Users, RotateCcw, Flame, Shield, HeartCrack } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { trackAndRedirectWhatsApp } from "@/lib/analytics";
import { useTranslation } from "react-i18next";

const TherapyFor = () => {
  const { t } = useTranslation();
  const items = [
    { icon: Heart, key: "anxiety" },
    { icon: Shield, key: "personality" },
    { icon: HeartCrack, key: "selfEsteem" },
    { icon: Flame, key: "compulsions" },
    { icon: RotateCcw, key: "transitions" },
    { icon: Brain, key: "selfKnowledge" },
    { icon: Users, key: "couples" },
  ];
  const { ref: titleRef, inView: titleInView } = useScrollAnimation();

  const handleCta = () => {
    trackAndRedirectWhatsApp(
      "identificacao_cta_click",
      t("therapyFor.cta"),
      "Olá, Larissa. Me identifiquei com as situações descritas no site e gostaria de conversar sobre iniciar acompanhamento."
    );
  };

  return (
    <section id="especialidades" className="py-16 sm:py-20 lg:py-24 bg-muted/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div ref={titleRef} className={`text-center mb-12 sm:mb-16 ${titleInView ? "animate-fade-in" : "opacity-0"}`}>
            <p className="text-sm uppercase tracking-widest text-primary font-medium mb-3">{t("therapyFor.eyebrow")}</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-4">
              {t("therapyFor.title")}
            </h2>
            <p className="text-muted-foreground text-lg font-light max-w-2xl mx-auto mb-8">
              {t("therapyFor.subtitle")}
            </p>
            <button
              onClick={handleCta}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-all duration-300 cursor-pointer"
            >
              {t("therapyFor.cta")}
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
            {items.map((item, index) => (
              <div
                key={index}
                className="bg-background rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-border text-center group w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{t(`therapyFor.items.${item.key}.title`)}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">{t(`therapyFor.items.${item.key}.desc`)}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default TherapyFor;
