import heroImage from "@/assets/hero-main.jpg";
import { Star, CheckCircle } from "lucide-react";

const Hero = () => {
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
      {/* Overlay */}
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
            Um espaço seguro
          </p>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6 opacity-0 animate-fade-in" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
            Cuide da sua saúde mental com quem entende você
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-white/90 font-light leading-relaxed mb-4 max-w-xl opacity-0 animate-fade-in" style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}>
            <strong className="text-white font-medium">Psicoterapia online e presencial</strong> especializada no tratamento de ansiedade, TOC, compulsões comportamentais, borderline, terapia de casal, vícios, autoestima e dependência emocional.
          </p>
          <p className="text-sm sm:text-base text-white/75 font-light leading-relaxed mb-8 max-w-xl opacity-0 animate-fade-in" style={{ animationDelay: "0.55s", animationFillMode: "forwards" }}>
            Abordagens baseadas em evidências para compreender padrões emocionais profundos e construir mudanças reais.
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
          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in" style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}>
            <a
              href="/agendar"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-4 text-base font-medium rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-lg"
            >
              Agendar Minha Sessão
            </a>
            <a
              href="#sobre"
              className="inline-flex items-center justify-center border-2 border-white/50 text-white px-8 py-4 text-base font-light rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              Conheça a psicóloga
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
