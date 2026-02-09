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

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6 opacity-0 animate-fade-in" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
            Cuide da sua saúde mental com quem entende você
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-white/90 font-light leading-relaxed mb-8 max-w-xl opacity-0 animate-fade-in" style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
            Psicoterapia online especializada em ansiedade, autoestima, relacionamentos e dependência emocional para mulheres que buscam uma vida mais significativa.
          </p>

          {/* Trust points */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10 opacity-0 animate-fade-in" style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}>
            {["Atendimento 100% online", "Terapia do Esquema", "CRP 06/157739"].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-white/85">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in" style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}>
            <a
              href="https://www.doctoralia.com.br/larissa-ruza/psicologo/santo-andre3"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-4 text-base font-medium rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-lg"
            >
              Agendar Minha Sessão
            </a>
            <a
              href="#sobre"
              className="inline-flex items-center justify-center border-2 border-white/50 text-white px-8 py-4 text-base font-light rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              Conheça a Larissa
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
