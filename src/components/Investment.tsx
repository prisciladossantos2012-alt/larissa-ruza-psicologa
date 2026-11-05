import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { trackAndRedirectWhatsApp } from "@/lib/analytics";
import { Package, Globe, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";

const Investment = () => {
  const { t } = useTranslation();
  const { ref: titleRef, inView: titleInView } = useScrollAnimation();

  const handleCta = () => {
    trackAndRedirectWhatsApp(
      "investimento_cta_click",
      t("investment.cta"),
      "Olá, Larissa. Gostaria de saber mais sobre os pacotes mensais e verificar disponibilidade."
    );
  };

  return (
    <section id="investimento" className="py-16 sm:py-20 lg:py-24 bg-muted/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div ref={titleRef} className={`text-center mb-12 sm:mb-16 ${titleInView ? "animate-fade-in" : "opacity-0"}`}>
            <p className="text-sm uppercase tracking-widest text-primary font-medium mb-3">{t("investment.eyebrow")}</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground">
              {t("investment.title")}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-background rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Package className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{t("investment.monthly.title")}</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                {t("investment.monthly.desc")}
              </p>
            </div>

            <div className="bg-background rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{t("investment.international.title")}</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                {t("investment.international.desc")}
              </p>
            </div>

            <div className="bg-background rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{t("investment.social.title")}</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                {t("investment.social.desc")}
              </p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={handleCta}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-all duration-300 cursor-pointer"
            >
              {t("investment.cta")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Investment;
