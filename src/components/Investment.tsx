import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { trackAndRedirectWhatsApp } from "@/lib/analytics";

const Investment = () => {
  const { ref: titleRef, inView: titleInView } = useScrollAnimation();

  const handleCta = () => {
    trackAndRedirectWhatsApp(
      "investimento_cta_click",
      "Estou de acordo com o investimento",
      "Olá, Larissa. Estou de acordo com o investimento de R$ 175 por sessão e gostaria de verificar horários disponíveis."
    );
  };

  return (
    <section id="investimento" className="py-16 sm:py-20 lg:py-24 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div ref={titleRef} className={`${titleInView ? "animate-fade-in" : "opacity-0"}`}>
            <p className="text-sm uppercase tracking-widest text-primary font-medium mb-3">Investimento</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-8">
              Investimento por sessão
            </h2>
          </div>

          <div className="bg-background rounded-2xl border border-border p-8 sm:p-10 shadow-sm mb-8">
            <p className="text-muted-foreground text-base font-light mb-2">Sessão individual</p>
            <p className="text-4xl sm:text-5xl font-semibold text-foreground mb-1">R$ 175</p>
            <p className="text-muted-foreground text-sm font-light">50 minutos · Encontros semanais</p>
          </div>

          <p className="text-muted-foreground text-base font-light leading-relaxed mb-10 max-w-lg mx-auto">
            Se estiver de acordo com o investimento informado, você pode verificar disponibilidade abaixo.
          </p>

          <button
            onClick={handleCta}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-all duration-300 cursor-pointer"
          >
            Estou de acordo com o investimento
          </button>
        </div>
      </div>
    </section>
  );
};

export default Investment;
