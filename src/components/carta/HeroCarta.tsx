import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { trackAndRedirectWhatsApp } from "@/lib/analytics";
import portrait from "@/assets/lari-portrait-color.jpg";

const MothParticles = lazy(() => import("./MothParticles"));

/** Editorial hero: large serif headline, the portrait in a Sevillian arch, a handwritten note and the stippled moth. */
const HeroCarta = () => {
  const { t } = useTranslation();

  const primary = () =>
    trackAndRedirectWhatsApp(
      "hero_cta_click",
      t("hero.primaryCta"),
      "Olá, Larissa. Li sobre seu trabalho no site e gostaria de entender melhor como funciona o processo terapêutico."
    );
  const secondary = () =>
    trackAndRedirectWhatsApp(
      "hero_secondary_cta_click",
      t("hero.secondaryCta"),
      "Olá, Larissa. Vi no seu site e gostaria de conhecer mais sobre sua formação e abordagem terapêutica."
    );

  return (
    <section id="inicio" className="carta-hero">
      <div className="carta-wrap carta-hero__grid">
        <div className="carta-hero__text">
          <p className="carta-kicker">
            <b>★ 5.0</b> Doctoralia <span aria-hidden="true" /> {t("hero.role")} · {t("hero.trust.crp")}
          </p>
          <h1 className="carta-h1" dangerouslySetInnerHTML={{ __html: t("mind.heroTitle", { defaultValue: t("hero.title") }) }} />
          <p className="carta-lede">{t("hero.subtitle")}</p>
          <div className="carta-ctas">
            <button type="button" className="carta-btn" onClick={primary}>{t("hero.primaryCta")}</button>
            <button type="button" className="carta-link" onClick={secondary}>{t("hero.secondaryCta")} →</button>
          </div>
          <ul className="carta-trust">
            <li>{t("hero.trust.online")}</li>
            <li>{t("hero.trust.couples")}</li>
          </ul>
        </div>

        <div className="carta-hero__art">
          <div className="carta-arch">
            <img src={portrait} alt="Larissa Ruza, psicóloga clínica, CRP 06/157739" />
          </div>
          <div className="carta-stamp" aria-hidden="true">
            <span>{t("socialProof.online")}</span>
            <small>{t("socialProof.onlineLabel")}</small>
          </div>
          <p className="carta-note">
            {t("carta.note")}
            <svg width="64" height="40" viewBox="0 0 64 40" aria-hidden="true">
              <path d="M2 4 C20 30 42 34 58 28" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
              <path d="M47 20 L59 28 L47 35" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
          </p>
          <Suspense fallback={null}>
            <MothParticles className="carta-moth" />
          </Suspense>
          <p className="carta-psyche" dangerouslySetInnerHTML={{ __html: t("mind.psyche") }} />
        </div>
      </div>
    </section>
  );
};

export default HeroCarta;
