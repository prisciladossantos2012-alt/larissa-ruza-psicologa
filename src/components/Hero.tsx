import { Star, CheckCircle } from "lucide-react";
import { trackAndRedirectWhatsApp } from "@/lib/analytics";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();
  const handlePrimaryCta = () => {
    trackAndRedirectWhatsApp(
      "hero_cta_click",
      t("hero.primaryCta"),
      "Olá, Larissa. Li sobre seu trabalho no site e gostaria de entender melhor como funciona o processo terapêutico."
    );
  };

  const handleSecondaryCta = () => {
    trackAndRedirectWhatsApp(
      "hero_secondary_cta_click",
      t("hero.secondaryCta"),
      "Olá, Larissa. Vi no seu site e gostaria de conhecer mais sobre sua formação e abordagem terapêutica."
    );
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center text-white overflow-hidden pt-20"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#f3eadb]/85 via-[#f3eadb]/35 to-transparent pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 mb-6 opacity-0 animate-fade-in" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-sm font-light">{t("hero.rating")}</span>
          </div>

          {/* Subtitle */}
          <p className="text-sm uppercase tracking-widest text-white/70 font-medium mb-4 opacity-0 animate-fade-in" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
            {t("hero.role")}
          </p>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.05] mb-6 opacity-0 animate-fade-in" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
            <span dangerouslySetInnerHTML={{ __html: t("mind.heroTitle", { defaultValue: t("hero.title") }) }} />
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-white/90 font-light leading-relaxed mb-8 max-w-xl opacity-0 animate-fade-in" style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}>
            {t("hero.subtitle")}
          </p>

          {/* Trust points */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10 opacity-0 animate-fade-in" style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}>
            {[t("hero.trust.online"), t("hero.trust.couples"), t("hero.trust.crp"), t("hero.trust.audience")].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-white/85">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch gap-4 pb-12 sm:pb-0 opacity-0 animate-fade-in" style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}>
            <button
              onClick={handlePrimaryCta}
              className="inline-flex items-center justify-center text-center leading-tight flex-1 sm:basis-0 sm:max-w-xs bg-primary text-primary-foreground px-6 py-4 text-base font-medium rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-lg cursor-pointer"
            >
              {t("hero.primaryCta")}
            </button>
            <button
              onClick={handleSecondaryCta}
              className="inline-flex items-center justify-center text-center leading-tight flex-1 sm:basis-0 sm:max-w-xs border-2 border-white/50 text-white px-6 py-4 text-base font-light rounded-lg hover:bg-white/10 transition-all duration-300 cursor-pointer"
            >
              {t("hero.secondaryCta")}
            </button>
          </div>
        </div>
      </div>

      <p
        className="psyche-note hidden lg:block absolute z-10 right-10 bottom-10 max-w-xs text-xs leading-relaxed text-[#1F2340]/70 [&_em]:not-italic [&_em]:text-sm [&_em]:text-[#C24E30]"
        dangerouslySetInnerHTML={{ __html: t("mind.psyche") }}
      />
    </section>
  );
};

export default Hero;
