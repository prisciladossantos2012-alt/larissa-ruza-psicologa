import { Clock, Globe, Award } from "lucide-react";
import { useTranslation } from "react-i18next";

const SocialProof = () => {
  const { t } = useTranslation();
  const stats = [
    { icon: Clock, value: t("socialProof.flexible"), label: t("socialProof.flexibleLabel") },
    { icon: Globe, value: t("socialProof.online"), label: t("socialProof.onlineLabel") },
    { icon: Award, value: t("socialProof.rating"), label: t("socialProof.ratingLabel") },
  ];
  return (
    <section className="bg-primary py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center text-primary-foreground">
              <stat.icon className="w-6 h-6 mx-auto mb-2 opacity-80" strokeWidth={1.5} />
              <div className="text-2xl sm:text-3xl font-semibold">{stat.value}</div>
              <div className="text-sm text-primary-foreground/75 font-light">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
