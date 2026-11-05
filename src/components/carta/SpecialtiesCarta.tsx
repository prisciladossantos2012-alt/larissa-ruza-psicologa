import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { trackAndRedirectWhatsApp } from "@/lib/analytics";

const ThreadLine = lazy(() => import("./ThreadLine"));

const KEYS = ["anxiety", "personality", "selfEsteem", "compulsions", "transitions", "selfKnowledge", "couples"];

/** Specialties as an editorial index, with a tangled thread that untangles as you read down the list. */
const SpecialtiesCarta = () => {
  const { t } = useTranslation();
  const cta = () =>
    trackAndRedirectWhatsApp(
      "identificacao_cta_click",
      t("therapyFor.cta"),
      "Olá, Larissa. Me identifiquei com as situações descritas no site e gostaria de conversar sobre iniciar acompanhamento."
    );

  return (
    <section id="especialidades" className="carta-section">
      <div className="carta-wrap carta-spec">
        <div className="carta-spec__head">
          <p className="carta-kicker">{t("therapyFor.eyebrow")}</p>
          <h2 className="carta-h2" dangerouslySetInnerHTML={{ __html: t("carta.specTitle", { defaultValue: t("therapyFor.title") }) }} />
          <p className="carta-lede">{t("therapyFor.subtitle")}</p>
          <Suspense fallback={null}>
            <ThreadLine className="carta-thread" sectionId="especialidades" />
          </Suspense>
          <p className="carta-hint">{t("carta.threadHint")}</p>
          <button type="button" className="carta-btn" onClick={cta}>{t("therapyFor.cta")}</button>
        </div>
        <ul className="carta-list">
          {KEYS.map((k) => (
            <li key={k} className="carta-row">
              <h3>{t(`therapyFor.items.${k}.title`)}</h3>
              <p>{t(`therapyFor.items.${k}.desc`)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SpecialtiesCarta;
