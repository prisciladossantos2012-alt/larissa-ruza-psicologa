import { ArrowRight, Video, Users, Briefcase, Globe } from "lucide-react";
import servicesImage2 from "@/assets/services-image2.png";
import servicesImage1 from "@/assets/services-image1.png";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const services = [
  {
    icon: Video,
    title: "Psicoterapia Online",
    description: "Atendimento 100% online para brasileiros no mundo inteiro. Sessões de 50 minutos com total sigilo e segurança.",
  },
  {
    icon: Users,
    title: "Terapia do Esquema",
    description: "Psicodiagnóstico e tratamento terapêutico para transtornos de humor e personalidade.",
  },
  {
    icon: Briefcase,
    title: "Mentoria de Carreira",
    description: "Orientação profissional para quem busca clareza e direção na carreira.",
  },
  {
    icon: Globe,
    title: "Mentoria para Imigração",
    description: "Preparação emocional e prática para quem está planejando morar fora.",
  },
];

const Services = () => {
  const { ref: titleRef, inView: titleInView } = useScrollAnimation();

  return (
    <>
      <section id="servicos" className="py-16 sm:py-20 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div ref={titleRef} className={`text-center mb-12 sm:mb-16 ${titleInView ? "animate-fade-in" : "opacity-0"}`}>
              <p className="text-sm uppercase tracking-widest text-primary font-medium mb-3">Serviços</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-4">
                Como posso te ajudar
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-6 bg-muted rounded-xl hover:shadow-md transition-all duration-300 border border-border"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <service.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground mb-1">{service.title}</h3>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Associations */}
            <div className="text-center">
              <p className="text-muted-foreground text-sm mb-4">Membro das seguintes associações:</p>
              <img src={servicesImage1} alt="Associações profissionais" className="mx-auto h-16 object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-primary py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-primary-foreground mb-4">
            Autocuidado aonde você estiver
          </h2>
          <p className="text-primary-foreground/80 text-lg font-light mb-8 max-w-xl mx-auto">
            Sessões de 50 minutos, 100% online, com total sigilo e segurança.
          </p>
          <a
            href="https://www.doctoralia.com.br/larissa-ruza/psicologo/santo-andre3"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-background text-foreground px-8 py-3.5 rounded-lg text-sm font-medium hover:bg-background/90 transition-all duration-300"
          >
            Agendar Minha Sessão
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </>
  );
};

export default Services;
