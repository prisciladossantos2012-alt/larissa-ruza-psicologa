import { Instagram, Mail, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const links = [
    { label: t("header.home"), href: "#inicio" },
    { label: t("header.about"), href: "#sobre" },
    { label: t("header.specialties"), href: "#especialidades" },
    { label: t("header.services"), href: "#servicos" },
    { label: t("header.testimonials"), href: "#depoimentos" },
    { label: t("header.contact"), href: "#contato" },
  ];
  return (
    <footer className="bg-foreground text-background py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="mb-4">
                <span className="text-xl font-light tracking-wide">Larissa Ruza</span>
                <p className="text-xs uppercase tracking-[0.3em] text-background/60 mt-1">Psicologia</p>
              </div>
              <p className="text-sm text-background/60 font-light">
                CRP 06/157739<br />
                {t("footer.role")}<br />
                {t("footer.address")}
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-sm font-medium mb-4 uppercase tracking-wider">{t("footer.navTitle")}</h4>
              <nav className="flex flex-col gap-2">
                {links.map((link) => (
                  <a key={link.href} href={link.href} className="text-sm text-background/60 hover:text-background transition-colors font-light">
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-medium mb-4 uppercase tracking-wider">{t("footer.contactTitle")}</h4>
              <div className="flex flex-col gap-3">
                <a href="tel:+34657907439" className="flex items-center gap-2 text-sm text-background/60 hover:text-background transition-colors font-light">
                  <Phone className="w-4 h-4" /> +34 657 907 439
                </a>
                <a href="mailto:psilariruza@gmail.com" className="flex items-center gap-2 text-sm text-background/60 hover:text-background transition-colors font-light">
                  <Mail className="w-4 h-4" /> psilariruza@gmail.com
                </a>
                <a href="https://www.instagram.com/lariruza.psi" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-background/60 hover:text-background transition-colors font-light">
                  <Instagram className="w-4 h-4" /> @lariruza.psi
                </a>
              </div>
            </div>

            {/* CTA */}
            <div>
              <h4 className="text-sm font-medium mb-4 uppercase tracking-wider">{t("footer.scheduleTitle")}</h4>
              <p className="text-sm text-background/60 font-light mb-4">
                {t("footer.schedulePrompt")}
              </p>
              <a
                href="/agendar"
                className="inline-flex items-center bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-all"
              >
                {t("footer.schedule")}
              </a>
            </div>
          </div>

          <div className="border-t border-background/10 pt-6 text-center">
            <p className="text-xs text-background/40 font-light">
              © {new Date().getFullYear()} Larissa Ruza Psicologia. {t("footer.rights")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
