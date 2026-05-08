import { useTranslation } from "react-i18next";
import { Globe, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { SUPPORTED_LANGS } from "@/i18n/config";

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const current = SUPPORTED_LANGS.find((l) => l.code === i18n.language.split("-")[0]) ?? SUPPORTED_LANGS[0];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-sm text-foreground/70 hover:text-primary transition-colors font-light px-2 py-1.5 rounded-md"
        aria-label={t("header.language")}
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline uppercase">{current.code}</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-border rounded-lg shadow-lg overflow-hidden z-50">
          {SUPPORTED_LANGS.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                i18n.changeLanguage(lang.code);
                setOpen(false);
              }}
              className="w-full flex items-center justify-between gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors text-left font-light"
            >
              <span className="flex items-center gap-2">
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </span>
              {current.code === lang.code && <Check className="w-3.5 h-3.5 text-primary" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;