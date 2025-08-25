import lariPortrait from "@/assets/lari-portrait.jpg";

const About = () => {
  return (
    <section id="sobre" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-light text-primary mb-8">
              Conheça sua psicóloga
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-foreground leading-relaxed mb-6">
                Eu sou <strong>Lari Ruza (CRP 06/157739)</strong>, uma psicóloga nômade que já viveu 
                e aprendeu em diferentes cantos do mundo — do Brasil à Espanha, 
                Irlanda e além. Essa trajetória sem fronteiras aumenta minha percepção 
                sobre as <strong>possibilidades que surgem a cada novo passo</strong>.
              </p>
              
              <p className="text-foreground leading-relaxed mb-6">
                Formada em <strong>Terapia do Esquema</strong> pelo Wainer e NJ/NYC Institute for Schema Therapy, 
                em formação em <strong>Terapias de Terceira Geração</strong> pela Universidad Europea Miguel de Cervantes (Espanha) 
                e pós graduanda em <strong>Terapias Contextuais</strong> pela PUC-PR, desenvolvo um espaço de acolhimento 
                onde integro essas abordagens.
              </p>
              
              <p className="text-foreground leading-relaxed mb-6">
                Também trago comigo uma bagagem de <strong>11 anos de experiência em RH, 
                mentoria de carreira e liderança</strong>, onde reúno prática e sensibilidade 
                para potencializar cada etapa da sua transformação.
              </p>
              
              <p className="text-primary font-medium">
                Acredito que toda mudança — geográfica, profissional ou de alma, 
                abre espaço para reescrever sua história e revelar novos sentidos. 
                E eu posso te apoiar nesse caminho.
              </p>
            </div>
          </div>
          
          {/* Image */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-sage-green/20 to-deep-sage/20 rounded-2xl transform rotate-3" />
              <img 
                src={lariPortrait} 
                alt="Larissa Ruza - Psicóloga" 
                className="relative rounded-2xl shadow-elegant w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;