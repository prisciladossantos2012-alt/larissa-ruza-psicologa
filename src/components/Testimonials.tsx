import { Star } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const testimonials = [
  {
    name: "Maria S.",
    rating: 5,
    comment: "A Larissa me ajudou muito a lidar com minha ansiedade. Suas técnicas são eficazes e ela tem uma escuta muito acolhedora. Recomendo demais!",
    date: "há 2 meses"
  },
  {
    name: "João P.",
    rating: 5,
    comment: "Excelente profissional! Me senti muito à vontade desde a primeira sessão. A terapia online funcionou perfeitamente e consegui grandes avanços.",
    date: "há 1 mês"
  },
  {
    name: "Ana L.",
    rating: 5,
    comment: "Larissa é uma psicóloga excepcional. Sua abordagem humanizada e técnica me ajudaram a superar momentos difíceis. Muito grata!",
    date: "há 3 semanas"
  },
  {
    name: "Carlos M.",
    rating: 5,
    comment: "Processo terapêutico transformador. A Larissa soube conduzir as sessões com muito profissionalismo e empatia. Recomendo a todos!",
    date: "há 1 semana"
  },
  {
    name: "Fernanda R.",
    rating: 5,
    comment: "Terapia online de excelente qualidade. A Larissa é muito atenciosa e suas técnicas realmente funcionam. Muito satisfeita com o resultado.",
    date: "há 2 semanas"
  },
  {
    name: "Roberto C.",
    rating: 5,
    comment: "Profissional incrível! Me ajudou a desenvolver ferramentas para lidar melhor com o stress do trabalho. Sessões muito produtivas.",
    date: "há 1 mês"
  }
];

const Testimonials = () => {
  const { ref: sectionRef, inView: sectionVisible } = useScrollAnimation();
  const { ref: titleRef, inView: titleVisible } = useScrollAnimation();

  return (
    <section 
      ref={sectionRef}
      className={`py-16 sm:py-20 bg-gradient-to-br from-primary/5 to-primary/10 transition-all duration-1000 ${
        sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 delay-200 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-playfair text-primary mb-4">
            O que dizem nossos pacientes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Depoimentos reais de pessoas que transformaram suas vidas através da terapia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in border border-gray-100`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-gray-500">{testimonial.date}</span>
              </div>
              
              <p className="text-gray-700 mb-4 font-light leading-relaxed">
                "{testimonial.comment}"
              </p>
              
              <div className="border-t pt-4">
                <p className="font-medium text-primary">{testimonial.name}</p>
                <p className="text-sm text-gray-500">Paciente verificado</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-md">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-gray-700 font-medium">5.0</span>
            <span className="text-gray-500">• Baseado em 150+ avaliações</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;