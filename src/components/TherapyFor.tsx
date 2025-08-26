import { RotateCcw, Heart, Brain, Users } from "lucide-react";

const TherapyFor = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#2c4186] text-white font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-6 font-sans">
              A terapia serve
            </h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold font-sans">
              para você que...
            </h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {/* Card 1 - Mudança/Direção */}
            <div className="text-center animate-scale-in" style={{animationDelay: '0.2s'}}>
               <div className="mb-4 sm:mb-6 flex justify-center">
                 <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                   <RotateCcw className="w-12 h-12 sm:w-16 sm:h-16 text-white" strokeWidth={1.5} />
                 </div>
               </div>
              <p className="text-base sm:text-lg leading-relaxed font-light font-sans px-2">
                quer mudar (hábitos,<br />carreira, país, vida...)<br />e não sabe por onde<br />começar
              </p>
            </div>
            
            {/* Card 2 - Sentimentos negativos */}
            <div className="text-center animate-scale-in" style={{animationDelay: '0.4s'}}>
               <div className="mb-4 sm:mb-6 flex justify-center">
                 <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                   <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-white" strokeWidth={1.5} />
                 </div>
               </div>
              <p className="text-base sm:text-lg leading-relaxed font-light font-sans px-2">
                tem se sentido triste,<br />cansado, irritado ou ansioso<br />com frequência
              </p>
            </div>
            
            {/* Card 3 - Autoconhecimento */}
            <div className="text-center animate-scale-in" style={{animationDelay: '0.6s'}}>
               <div className="mb-4 sm:mb-6 flex justify-center">
                 <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                   <Brain className="w-12 h-12 sm:w-16 sm:h-16 text-white" strokeWidth={1.5} />
                 </div>
               </div>
              <p className="text-base sm:text-lg leading-relaxed font-light font-sans px-2">
                sente dificuldade em<br />entender seus<br />sentimentos
              </p>
            </div>
            
            {/* Card 4 - Relacionamentos */}
            <div className="text-center animate-scale-in" style={{animationDelay: '0.8s'}}>
               <div className="mb-4 sm:mb-6 flex justify-center">
                 <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                   <Users className="w-12 h-12 sm:w-16 sm:h-16 text-white" strokeWidth={1.5} />
                 </div>
               </div>
              <p className="text-base sm:text-lg leading-relaxed font-light font-sans px-2">
                quer melhorar a<br />qualidade dos seus<br />relacionamentos
              </p>
            </div>
          </div>
          
          <div className="text-center animate-fade-in" style={{animationDelay: '1s'}}>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed max-w-4xl mx-auto font-semibold font-sans px-4">
              ou apenas precisa ter um momento seu, para se conhecer, (re)descobrir 
              e trilhar o caminho de uma vida mais significativa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TherapyFor;