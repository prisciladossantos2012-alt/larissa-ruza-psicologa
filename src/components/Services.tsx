import { Video, Users, Briefcase } from "lucide-react";
import servicesImage1 from "@/assets/services-image1.png";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { trackAndRedirectWhatsApp } from "@/lib/analytics";
import { useTranslation } from "react-i18next";

const Services = () => {
  const { t } = useTranslation();
  const services = [
    { icon: Video, key: "s1" },
    { icon: Users, key: "s2" },
    { icon: Briefcase, key: "s3" },
  ];
  const { ref: titleRef, inView: titleInView } = useScrollAnimation();

  const handleCta = () => {
    trackAndRedirectWhatsApp(
      "funcionamento_cta_click",
      t("services.cta"),
      "Olá, Larissa. Gostaria de agendar uma sessão e saber sobre a disponibilidade de horários."
    );
  };

  return (
    <section id="servicos" className="py-16 sm:py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div ref={titleRef} className={`text-center mb-12 sm:mb-16 ${titleInView ? "animate-fade-in" : "opacity-0"}`}>
            <p className="text-sm uppercase tracking-widest text-primary font-medium mb-3">{t("services.eyebrow")}</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-4">
              {t("services.title")}
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-6 bg-muted rounded-xl hover:shadow-md transition-all duration-300 border border-border w-full sm:w-[calc(50%-12px)]"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <service.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-1">{t(`services.${service.key}.title`)}</h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">{t(`services.${service.key}.desc`)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Associations */}
          <div className="text-center mb-12">
            <p className="text-muted-foreground text-sm mb-4">{t("services.associations")}</p>
            <img src={servicesImage1} alt="Associações profissionais" className="mx-auto h-16 object-contain" />
          </div>

          <div className="text-center">
            <button
              onClick={handleCta}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-all duration-300 cursor-pointer uppercase"
            >
              {t("services.cta")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
