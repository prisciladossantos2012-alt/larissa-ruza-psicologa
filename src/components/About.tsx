import lariPortrait from "@/assets/lari-about.png";
import servicesImage1 from "@/assets/services-image1.png";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { trackAndRedirectWhatsApp } from "@/lib/analytics";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
  const { ref: sectionRef, inView: sectionInView } = useScrollAnimation();
  const { ref: titleRef, inView: titleInView } = useScrollAnimation();
  const { ref: textRef, inView: textInView } = useScrollAnimation();

  const handleCta = () => {
    trackAndRedirectWhatsApp(
      "sobre_cta_click",
      t("about.cta"),
      "Olá, Larissa. Li sobre você no site e gostaria de agendar uma sessão."
    );
  };

  return (
    <section id="sobre" ref={sectionRef} className="py-16 sm:py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Image */}
          <div className={`${sectionInView ? "animate-fade-in-left" : "opacity-0"}`}>
            <div className="relative">
              <img
                src={lariPortrait}
                alt="Larissa Ruza - Psicóloga CRP 06/157739"
                className="w-full h-auto object-cover rounded-2xl grayscale"
              />
              <div className="absolute bottom-4 left-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium shadow-lg">
                CRP 06/157739
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className={`text-sm uppercase tracking-widest text-primary font-medium mb-3 ${titleInView ? "animate-fade-in" : "opacity-0"}`}>
              {t("about.eyebrow")}
            </p>
            <h2
              ref={titleRef}
              className={`text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-6 ${
                titleInView ? "animate-slide-up" : "opacity-0"
              }`}
            >
              {t("about.title")} <span className="text-primary">{t("about.name")}</span>
            </h2>

            <div
              ref={textRef}
              className={`space-y-4 text-muted-foreground text-base leading-relaxed ${
                textInView ? "animate-fade-in-up" : "opacity-0"
              }`}
            >
              <p>
                {t("about.p1Pre")}<strong className="text-foreground">{t("about.p1Strong")}</strong>{t("about.p1Post")}
              </p>
              <p>
                {t("about.p2Pre")}<strong className="text-foreground">{t("about.p2Strong")}</strong>{t("about.p2Post")}
              </p>

              <div className="mt-4">
                <p className="font-medium text-foreground mb-2">{t("about.formationTitle")}</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>{t("about.f1")}</li>
                  <li>{t("about.f2")}</li>
                  <li>{t("about.f3")}</li>
                </ul>
              </div>

              <p className="mt-4">
                {t("about.p3Pre")}<strong className="text-foreground">{t("about.p3Strong")}</strong>{t("about.p3Post")}
              </p>

              <div className="mt-6 flex items-center gap-4 p-4 bg-muted rounded-xl border border-border">
                <img src={servicesImage1} alt="ACBS - Association for Contextual Behavioral Science" className="h-12 object-contain" />
                <div>
                  <p className="text-sm font-medium text-foreground">{t("about.acbsMember")}</p>
                  <p className="text-xs text-muted-foreground">{t("about.acbsName")}</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleCta}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg text-sm font-medium hover:bg-primary/90 transition-all duration-300 mt-8 cursor-pointer uppercase"
            >
              {t("about.cta")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
