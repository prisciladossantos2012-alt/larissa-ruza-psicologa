import { Star } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Erica",
    rating: 5,
    comment: "Foi a minha primeira consulta, e ja amei! O posicionamento dela, o olhar de atenção a empatia e os insights de visão sobre os assuntos. Ela é maravilhosa e indico desde ja!",
    date: "30 de julho de 2025",
  },
  {
    name: "LP",
    rating: 5,
    comment: "Ter a habilidade de escutar e acolher, é um diferencial para quem sofre, e senti isso por parte da Larissa, me senti acolhida e segura.",
    date: "7 de julho de 2025",
  },
  {
    name: "Joana",
    rating: 5,
    comment: "Adoro a Lari, ela me ajuda muito! Me sinto acolhida e sem julgamentos, as consultas são leves",
    date: "31 de maio de 2025",
  },
  {
    name: "Marina Reis",
    rating: 5,
    comment: "A Larissa é uma profissional super acolhedora, com escuta ativa e perguntas que ajudam no processo de imigração que estou passando. Me sinto confortável durante toda a sessão.",
    date: "7 de maio de 2025",
  },
  {
    name: "Julia a",
    rating: 5,
    comment: "A Larissa tem uma escuta que acolhe de verdade, sabe olhar pro outro com empatia e sem julgamentos. É o tipo de profissional que faz a gente se sentir à vontade logo de cara.",
    date: "2 de maio de 2025",
  },
  {
    name: "Michelli",
    rating: 5,
    comment: "Muito atenciosa, carismática amei o atendimento, hiper recomendo!",
    date: "30 de abril de 2025",
  },
  {
    name: "Renata F.",
    rating: 5,
    comment: "A Larissa me ajudou a encontrar caminhos pra entender coisas que eu nem sabia que precisava. Ela tem uma gentileza ímpar, delicada, firme e é super dedicada.",
    date: "30 de abril de 2025",
  },
  {
    name: "Fernanda Luz",
    rating: 5,
    comment: "Me sinto vista, acolhida. Obrigada, Larissa pela ajuda!",
    date: "30 de abril de 2025",
  },
];

const Testimonials = () => {
  const { ref: sectionRef, inView: sectionVisible } = useScrollAnimation();
  const { ref: titleRef, inView: titleVisible } = useScrollAnimation();

  return (
    <section
      id="depoimentos"
      ref={sectionRef}
      className={`py-16 sm:py-20 lg:py-24 bg-muted transition-all duration-1000 ${
        sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className={`text-center mb-12 sm:mb-16 transition-all duration-700 delay-200 ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-sm uppercase tracking-widest text-primary font-medium mb-3">Depoimentos</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-4">
            O que dizem nossos pacientes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Depoimentos reais de quem transformou sua vida através da terapia
          </p>
        </div>

        <Carousel opts={{ align: "start", loop: true }} className="w-full max-w-6xl mx-auto">
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="bg-background rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-border h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-0.5">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">{testimonial.date}</span>
                  </div>
                  <p className="text-muted-foreground mb-4 font-light leading-relaxed text-sm">
                    "{testimonial.comment}"
                  </p>
                  <div className="border-t border-border pt-3">
                    <p className="font-medium text-primary text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">Paciente verificado</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <div className="text-center mt-10">
          <a
            href="https://www.doctoralia.com.br/larissa-ruza/psicologo/santo-andre3"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-background rounded-full px-6 py-3 shadow-sm border border-border hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-foreground font-medium text-sm">5.0</span>
            <span className="text-muted-foreground text-sm">• Ver todos no Doctoralia</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
