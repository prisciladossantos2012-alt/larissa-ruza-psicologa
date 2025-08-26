import { ArrowRight } from "lucide-react";
import servicesImage1 from "@/assets/services-image1.png";
import servicesImage2 from "@/assets/services-image2.png";
import associationsImage from "@/assets/associations.png";
const Services = () => {
  const services = ["Psicoterapia online para brasileiros no mundo inteiro (adolescentes e adultos).", "Psicodiagnóstico e tratamento terapêutico para transtornos de humor e personalidade.", "Mentoria e orientação de carreira.", "Mentoria preparatória para imigração."];
  return <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
            {/* Images */}
            <div className="order-2 lg:order-1 animate-fade-in-left">
              <div className="space-y-4">
                <div className="bg-gray-200 rounded-lg animate-bounce-in" style={{animationDelay: '0.3s'}}>
                  <img src={servicesImage2} alt="Psicoterapia online" className="w-full h-auto object-cover rounded-lg" />
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="order-1 lg:order-2 animate-fade-in-right">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-primary mb-8 sm:mb-10 lg:mb-12 animate-slide-up" style={{animationDelay: '0.2s'}}>
                Meu trabalho é dedicado em:
              </h2>
              
              <div className="space-y-4 sm:space-y-6 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                {services.map((service, index) => <div key={index} className="flex items-start space-x-4">
                    <ArrowRight className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <p className="text-gray-800 text-base sm:text-lg leading-relaxed">
                      {service}
                    </p>
                  </div>)}
              </div>
              
              <div className="mt-12">
                <p className="text-gray-800 text-base mb-6">
                  Atualmente sou membro das seguintes associações:
                </p>
                
                <div>
                  <img src={servicesImage1} alt="Serviços de terapia" className="w-1/2 h-auto object-cover rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    {/* Seção de Agendamento */}
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center animate-zoom-in">
          <a 
            href="https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20agendar%20uma%20sessão%20de%20terapia"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center cursor-pointer hover:opacity-90 transition-opacity duration-300"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-6 sm:mb-8 text-gray-800 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Autocuidado aonde você estiver.
            </h2>
            
            <div className="bg-white text-gray-800 px-4 sm:px-6 py-3 sm:py-4 mb-8 sm:mb-12 inline-block rounded-lg shadow-sm animate-scale-in" style={{animationDelay: '0.4s'}}>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed">
                As sessões de terapia tem duração de 50 min e<br className="hidden sm:block" />
                <span className="sm:hidden"> </span>acontecem 100% online, com total sigilo e segurança.
              </p>
            </div>
            
            <div className="bg-primary text-white px-6 sm:px-8 py-3 text-base sm:text-lg font-medium hover:bg-primary/90 transition-colors duration-300 flex items-center gap-3 mx-auto rounded-lg inline-flex animate-bounce-in" style={{animationDelay: '0.6s'}}>
              PARA AGENDAR CLIQUE AQUI
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </section>;
};
export default Services;