import lariPortrait from "@/assets/lari-about.png";
import therapyIcons from "@/assets/therapy-icons.png";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const About = () => {
  const { ref: sectionRef, inView: sectionInView } = useScrollAnimation();
  const { ref: titleRef, inView: titleInView } = useScrollAnimation();
  const { ref: textRef, inView: textInView } = useScrollAnimation();

  return <section ref={sectionRef} className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start max-w-7xl mx-auto">
          {/* Content */}
          <div className={`order-2 lg:order-1 ${sectionInView ? 'animate-fade-in-left' : 'opacity-0'}`}>
            <h2 ref={titleRef} className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-primary mb-6 sm:mb-8 ${titleInView ? 'animate-slide-up' : 'opacity-0'}`} style={{animationDelay: titleInView ? '0.2s' : '0s'}}>
              Conheça sua psicóloga
            </h2>
            
            <div ref={textRef} className={`space-y-4 sm:space-y-6 text-gray-800 text-sm sm:text-base leading-relaxed ${textInView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{animationDelay: textInView ? '0.4s' : '0s'}}>
              <p>
                Eu sou <strong>Lari Ruza (CRP 06/157739)</strong>, uma psicóloga nômade que já viveu 
                e aprendeu em diferentes cantos do mundo — do Brasil à Espanha, 
                Irlanda e além. Essa trajetória sem fronteiras aumenta minha percepção 
                sobre as <strong>possibilidades que surgem a cada novo passo</strong>.
              </p>
              
              <p>
                Formada em <strong>Terapia do Esquema</strong> pelo Wainer e NJ/NYC Institute for Schema Therapy, 
                em formação em <strong>Terapias de Terceira Geração</strong> pela Universidad Europea Miguel de Cervantes (Espanha) 
                e pós graduanda em <strong>Terapias Contextuais</strong> pela PUC-PR, desenvolvo um espaço de acolhimento 
                onde integro essas abordagens. Também trago comigo uma bagagem de <strong>11 anos de experiência em RH, 
                mentoria de carreira e liderança</strong>, onde reúno prática e sensibilidade 
                para potencializar cada etapa da sua transformação.
              </p>
              
              <p>
                Acredito que toda <strong>mudança</strong> — geográfica, profissional ou de alma, 
                abre espaço para reescrever sua história e revelar novos sentidos. 
                E eu posso te apoiar nesse caminho.
              </p>
            </div>
          </div>
          
          {/* Image */}
          <div className={`order-1 lg:order-2 ${sectionInView ? 'animate-fade-in-right' : 'opacity-0'}`}>
            <div className="relative mb-8">
              <img src={lariPortrait} alt="Larissa Ruza - Psicóloga" className="w-full h-auto object-cover rounded-lg grayscale" />
            </div>
            
            {/* Therapy Icons */}
            <div className="flex justify-center">
              
            </div>
          </div>
        </div>
      </div>
    </section>;
};

export default About;