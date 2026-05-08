import { useTranslation } from "react-i18next";
import { Globe, ArrowRight } from "lucide-react";

const ExteriorBanner = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-background py-10 sm:py-12 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-muted rounded-2xl border border-border p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <Globe className="w-7 h-7 text-primary" strokeWidth={1.5} />
          </div>
          <div className="flex-1">
            <p className="text-xs uppercase tracking-widest text-primary font-medium mb-1">
              {t("exteriorBanner.badge")}
            </p>
            <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1">
              {t("exteriorBanner.title")}
            </h3>
            <p className="text-sm text-muted-foreground font-light">
              {t("exteriorBanner.text")}
            </p>
          </div>
          <a
            href="/brasileiros-no-exterior"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg text-sm font-medium hover:bg-primary/90 transition-all uppercase whitespace-nowrap"
          >
            {t("exteriorBanner.cta")}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ExteriorBanner;