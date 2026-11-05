import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Wind, X } from "lucide-react";
import { breathBus, guidedBreath, type Phase } from "./breath";
import { trackEvent } from "@/lib/analytics";

const LABEL: Record<Phase, string> = { inhale: "mind.inhale", holdIn: "mind.hold", exhale: "mind.exhale", holdOut: "mind.hold" };

/** "Breathe with me": a one-minute box-breathing guide that the particle field follows. */
const BreatheGuide = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState(false);
  const [state, setState] = useState(() => guidedBreath(0));

  useEffect(() => {
    if (!active) return;
    breathBus.start = performance.now();
    const id = window.setInterval(() => {
      const s = guidedBreath(performance.now() - (breathBus.start ?? 0));
      setState(s);
      if (s.done) setActive(false);
    }, 200);
    return () => { window.clearInterval(id); breathBus.start = null; };
  }, [active]);

  const start = () => { setState(guidedBreath(0)); setActive(true); trackEvent("breathe_start"); };

  return (
    <div className="fixed bottom-6 left-6 z-50" style={{ marginBottom: "env(safe-area-inset-bottom, 0px)" }}>
      {active ? (
        <div className="flex items-center gap-4 rounded-full bg-white/90 backdrop-blur-md border border-border shadow-lg pl-5 pr-2 py-2" role="status" aria-live="polite">
          <span className="relative flex items-center justify-center w-9 h-9">
            <span
              className="absolute inset-0 rounded-full bg-primary/15 transition-transform duration-[4000ms] ease-in-out"
              style={{ transform: `scale(${state.phase === "inhale" || state.phase === "holdIn" ? 1.25 : 0.7})` }}
            />
            <span className="relative font-medium text-primary tabular-nums">{state.secondsLeft}</span>
          </span>
          <span className="text-foreground font-medium min-w-[7.5rem]">{t(LABEL[state.phase])}</span>
          <button
            type="button"
            onClick={() => setActive(false)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label={t("mind.stop")}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={start}
          title={t("mind.hint")}
          className="group flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-md border border-border shadow-lg px-4 py-3 text-sm font-medium text-primary hover:bg-white transition-colors"
        >
          <Wind className="w-4 h-4" strokeWidth={1.75} />
          <span>{t("mind.cta")}</span>
        </button>
      )}
    </div>
  );
};

export default BreatheGuide;
