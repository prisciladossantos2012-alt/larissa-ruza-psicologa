import { Star } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const testimonials = [
  {
    name: "Erica",
    rating: 5,
    comment: "Foi a minha primeira consulta, e ja amei! O posicionamento dela, o olhar de atenção a empatia e os insights de visão sobre os assuntos. Ela é maravilhosa e indico desde ja!",
    date: "30 de julho de 2025",
    location: "Terapia Presencial - Santo André (ABC)"
  },
  {
    name: "LP",
    rating: 5,
    comment: "Ter a habilidade de escutar e acolher, é um diferencial para quem sofre, e senti isso por parte da Larissa, me senti acolhida e segura.",
    date: "7 de julho de 2025",
    location: "Terapia Online - São Paulo"
  },
  {
    name: "Joana",
    rating: 5,
    comment: "Adoro a Lari, ela me ajuda muito! Me sinto acolhida e sem julgamentos, as consultas são leves",
    date: "31 de maio de 2025",
    location: "Terapia Online - São Paulo"
  },
  {
    name: "Marina Reis",
    rating: 5,
    comment: "A Larissa é uma profissional super acolhedora, com escuta ativa e perguntas que ajudam no processo de imigração que estou passando. Me sinto confortável durante toda a sessão.",
    date: "7 de maio de 2025",
    location: "Terapia Online - Brasil e exterior"
  },
  {
    name: "Julia a",
    rating: 5,
    comment: "A Larissa tem uma escuta que acolhe de verdade, sabe olhar pro outro com empatia e sem julgamentos. É o tipo de profissional que faz a gente se sentir à vontade logo de cara — e isso, pra mim, faz toda a diferença. Indico demais de olhos fechados.",
    date: "2 de maio de 2025",
    location: "Atendimento Online Psicóloga Larissa Ruza"
  },
  {
    name: "Michelli",
    rating: 5,
    comment: "Muito atenciosa, carismática amei o atendimento, hiper recomendo!",
    date: "30 de abril de 2025",
    location: "Atendimento Online Psicóloga Larissa Ruza"
  },
  {
    name: "Renata F.",
    rating: 5,
    comment: "A Larissa me ajudou a encontrar caminhos pra entender coisas que eu nem sabia que precisava. Ela tem uma gentileza ímpar, delicada, firme e é super dedicada.",
    date: "30 de abril de 2025",
    location: "Atendimento Online Psicóloga Larissa Ruza"
  },
  {
    name: "Fernanda Luz",
    rating: 5,
    comment: "Me sinto vista, acolhida. Obrigada, Larissa pela ajuda!",
    date: "30 de abril de 2025",
    location: "Atendimento Online Psicóloga Larissa Ruza"
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
            <span className="text-gray-500">• Baseado em feedbacks verificados</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;