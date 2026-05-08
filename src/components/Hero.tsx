import heroImage from "@/assets/hero-main.jpg";
import { Star, CheckCircle } from "lucide-react";
import { trackAndRedirectWhatsApp } from "@/lib/analytics";

const Hero = () => {
  const handlePrimaryCta = () => {
    trackAndRedirectWhatsApp(
      "hero_cta_click",
      "Quero entender como a terapia pode me ajudar",
      "Olá, Larissa. Li sobre seu trabalho no site e gostaria de entender melhor como funciona o processo terapêutico."
    );
  };

  const handleSecondaryCta = () => {
    trackAndRedirectWhatsApp(
      "hero_secondary_cta_click",
      "Ver como funcionam as sessões",
      "Olá, Larissa. Gostaria de receber mais detalhes sobre como acontecem as sessões."
    );
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center text-white overflow-hidden pt-20"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 mb-6 opacity-0 animate-fade-in" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-sm font-light">Nota 5.0 no Doctoralia</span>
          </div>

          {/* Subtitle */}
          <p className="text-sm uppercase tracking-widest text-white/70 font-medium mb-4 opacity-0 animate-fade-in" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
            Psicóloga Clínica
          </p>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6 opacity-0 animate-fade-in" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
            Um espaço seguro para cuidar do que não pode mais ser adiado.
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-white/90 font-light leading-relaxed mb-8 max-w-xl opacity-0 animate-fade-in" style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}>
            Psicoterapia online e presencial especializada no tratamento de ansiedade, TOC, compulsões comportamentais, transtornos de personalidade e traumas. Abordagens baseadas em evidências para compreender padrões emocionais profundos e construir mudanças reais.
          </p>

          {/* Trust points */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10 opacity-0 animate-fade-in" style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}>
            {["Online e presencial em Santo André", "Terapia do Esquema", "CRP 06/157739", "Adultos e casais"].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-white/85">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pb-12 sm:pb-0 opacity-0 animate-fade-in" style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}>
            <button
              onClick={handlePrimaryCta}
              className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-4 text-base font-medium rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-lg cursor-pointer"
            >
              Quero entender como a terapia pode me ajudar
            </button>
            <button
              onClick={handleSecondaryCta}
              className="inline-flex items-center justify-center border-2 border-white/50 text-white px-8 py-4 text-base font-light rounded-lg hover:bg-white/10 transition-all duration-300 cursor-pointer"
            >
              Ver como funcionam as sessões
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
