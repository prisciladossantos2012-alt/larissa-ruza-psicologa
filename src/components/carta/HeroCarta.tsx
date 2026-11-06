import { useTranslation } from "react-i18next";
import { trackAndRedirectWhatsApp } from "@/lib/analytics";

/** Editorial hero: large serif headline, a large stippled moth, a stamp and the psyché note. */
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
          {/* the stippled moth (ScrollArt) lands here, large: psyché, soul and butterfly */}
          <div className="carta-moth" data-art-anchor aria-hidden="true" />
          <div className="carta-stamp" aria-hidden="true">
            <span>{t("socialProof.online")}</span>
            <small>{t("socialProof.onlineLabel")}</small>
          </div>
          <p className="carta-psyche" dangerouslySetInnerHTML={{ __html: t("mind.psyche") }} />
        </div>
      </div>
    </section>
  );
};

export default HeroCarta;
