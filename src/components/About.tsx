import lariPortrait from "@/assets/lari-about.png";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight } from "lucide-react";

const About = () => {
  const { ref: sectionRef, inView: sectionInView } = useScrollAnimation();
  const { ref: titleRef, inView: titleInView } = useScrollAnimation();
  const { ref: textRef, inView: textInView } = useScrollAnimation();

  return (
    <section id="sobre" ref={sectionRef} className="py-16 sm:py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Image */}
          <div className={`${sectionInView ? "animate-fade-in-left" : "opacity-0"}`}>
            <div className="relative">
              <img
                src={lariPortrait}
                alt="Larissa Ruza - Psicóloga CRP 06/157739"
                className="w-full h-auto object-cover rounded-2xl grayscale"
              />
              {/* Credential badge */}
              <div className="absolute bottom-4 left-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium shadow-lg">
                CRP 06/157739
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className={`text-sm uppercase tracking-widest text-primary font-medium mb-3 ${titleInView ? "animate-fade-in" : "opacity-0"}`}>
              Sobre mim
            </p>
            <h2
              ref={titleRef}
              className={`text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-6 ${
                titleInView ? "animate-slide-up" : "opacity-0"
              }`}
            >
              Olá, eu sou a <span className="text-primary">Lari Ruza</span>
            </h2>

            <div
              ref={textRef}
              className={`space-y-4 text-muted-foreground text-base leading-relaxed ${
                textInView ? "animate-fade-in-up" : "opacity-0"
              }`}
            >
              <p>
                Psicóloga que já viveu e aprendeu em diferentes cantos do mundo: Brasil, Espanha e Irlanda. Essa trajetória aumenta minha percepção sobre as <strong className="text-foreground">possibilidades que surgem a cada novo passo</strong>.
              </p>
              <p>
                Sou especializada em <strong className="text-foreground">ansiedade, traumas, TOC, transtornos de personalidade e terapia de casal</strong>.
              </p>

              <div className="mt-4">
                <p className="font-medium text-foreground mb-2">Formação:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Terapia do Esquema — Wainer Psicologia Cognitiva e NJ/NYC Schema Therapy Institute</li>
                  <li>Pós-graduação em Terapias Contextuais — PUC-PR</li>
                  <li>Formação em Terapia Cognitivo-Comportamental (Artmed)</li>
                </ul>
              </div>

              <p className="mt-4">
                Além da clínica, trabalho com <strong className="text-foreground">mentoria de carreira e acompanhamento psicológico</strong> de futuros e atuais imigrantes brasileiros. São mais de 8 anos de experiência ajudando pessoas a navegarem entre transições de carreira, mudanças de país e os desafios emocionais que vêm com recomeços.
              </p>
            </div>

            <a
              href="/agendar"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg text-sm font-medium hover:bg-primary/90 transition-all duration-300 mt-8"
            >
              Agendar com a Larissa
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
