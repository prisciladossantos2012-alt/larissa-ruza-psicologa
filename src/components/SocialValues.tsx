import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { trackAndRedirectWhatsApp } from "@/lib/analytics";
import { Heart } from "lucide-react";

const SocialValues = () => {
  const { ref: titleRef, inView: titleInView } = useScrollAnimation();

  const handleCta = () => {
    trackAndRedirectWhatsApp(
      "valores_sociais_cta_click",
      "Quero conversar sobre valores sociais",
      "Olá, Larissa. Vi que você trabalha com valores sociais e gostaria de conversar sobre minha situação."
    );
  };

  return (
    <section id="valores-sociais" className="py-16 sm:py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div ref={titleRef} className={`${titleInView ? "animate-fade-in" : "opacity-0"}`}>
            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Heart className="w-7 h-7 text-primary" strokeWidth={1.5} />
            </div>
            <p className="text-sm uppercase tracking-widest text-primary font-medium mb-3">Valores sociais</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-6">
              Psicoterapia acessível
            </h2>
            <p className="text-muted-foreground text-base font-light leading-relaxed mb-4">
              Acredito que o acesso à saúde mental é um direito. Por isso, disponibilizo vagas com valores diferenciados para pessoas em situação de vulnerabilidade socioeconômica.
            </p>
            <p className="text-muted-foreground text-base font-light leading-relaxed mb-10">
              Se você está passando por dificuldades financeiras e precisa de acompanhamento psicológico, entre em contato para conversarmos sobre sua situação.
            </p>
          </div>

          <button
            onClick={handleCta}
            className="inline-flex items-center gap-2 border-2 border-primary text-primary px-8 py-3.5 rounded-lg text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-pointer"
          >
            Quero conversar sobre valores sociais
          </button>
        </div>
      </div>
    </section>
  );
};

export default SocialValues;
