import { Heart, Brain, Users, RotateCcw, Flame, Shield, HeartCrack } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const items = [
  {
    icon: Heart,
    title: "Ansiedade e estresse",
    description: "Crises de ansiedade, pânico, preocupação excessiva e estresse constante.",
  },
  {
    icon: Shield,
    title: "Transtornos de personalidade",
    description: "Instabilidade emocional, medo do abandono, padrões emocionais e relacionais persistentes, que geram sofrimento e dificuldades nos vínculos.",
  },
  {
    icon: HeartCrack,
    title: "Autoestima e dependência emocional",
    description: "Autoconhecimento, valorização pessoal e relações mais saudáveis.",
  },
  {
    icon: Flame,
    title: "Vícios e compulsões",
    description: "Compulsões comportamentais, comportamentos compulsivos, vícios e comportamentos repetitivos, como compras, jogos, uso excessivo de internet, alimentação emocional e compulsões ligadas à sexualidade.",
  },
  {
    icon: RotateCcw,
    title: "Mudanças e transições",
    description: "Carreira, imigração, luto e recomeços que precisam de suporte emocional.",
  },
  {
    icon: Brain,
    title: "Autoconhecimento",
    description: "Valores pessoais, sentido de vida e escolhas.",
  },
  {
    icon: Users,
    title: "Terapia de Casal",
    description: "Fortalecimento do vínculo entre parceiros.",
  },
];

const TherapyFor = () => {
  const { ref: titleRef, inView: titleInView } = useScrollAnimation();

  return (
    <section id="especialidades" className="py-16 sm:py-20 lg:py-24 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div ref={titleRef} className={`text-center mb-12 sm:mb-16 ${titleInView ? "animate-fade-in" : "opacity-0"}`}>
            <p className="text-sm uppercase tracking-widest text-primary font-medium mb-3">Especialidades</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Especialidades atendidas na psicoterapia
            </h2>
            <p className="text-muted-foreground text-lg font-light max-w-2xl mx-auto">
              Se você se identifica com alguma dessas situações, vamos conversar.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
            {items.map((item, index) => (
              <div
                key={index}
                className="bg-background rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-border text-center group w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/agendar"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-all duration-300"
            >
              Quero Começar Minha Terapia
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TherapyFor;
