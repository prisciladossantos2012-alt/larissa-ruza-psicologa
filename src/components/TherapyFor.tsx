import { RotateCcw, Heart, Brain, Users } from "lucide-react";

const TherapyFor = () => {
  return (
    <section className="py-20 bg-[#2c4186] text-white font-sans">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-sans">
              A terapia serve
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold font-sans">
              para você que...
            </h3>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Card 1 - Mudança/Direção */}
            <div className="text-center">
               <div className="mb-6 flex justify-center">
                 <div className="w-20 h-20 flex items-center justify-center">
                   <RotateCcw className="w-16 h-16 text-white" strokeWidth={1.5} />
                 </div>
               </div>
              <p className="text-lg leading-relaxed font-light font-sans">
                quer mudar (hábitos,<br />carreira, país, vida...)<br />e não sabe por onde<br />começar
              </p>
            </div>
            
            {/* Card 2 - Sentimentos negativos */}
            <div className="text-center">
               <div className="mb-6 flex justify-center">
                 <div className="w-20 h-20 flex items-center justify-center">
                   <Heart className="w-16 h-16 text-white" strokeWidth={1.5} />
                 </div>
               </div>
              <p className="text-lg leading-relaxed font-light font-sans">
                tem se sentido triste,<br />cansado, irritado ou ansioso<br />com frequência
              </p>
            </div>
            
            {/* Card 3 - Autoconhecimento */}
            <div className="text-center">
               <div className="mb-6 flex justify-center">
                 <div className="w-20 h-20 flex items-center justify-center">
                   <Brain className="w-16 h-16 text-white" strokeWidth={1.5} />
                 </div>
               </div>
              <p className="text-lg leading-relaxed font-light font-sans">
                sente dificuldade em<br />entender seus<br />sentimentos
              </p>
            </div>
            
            {/* Card 4 - Relacionamentos */}
            <div className="text-center">
               <div className="mb-6 flex justify-center">
                 <div className="w-20 h-20 flex items-center justify-center">
                   <Users className="w-16 h-16 text-white" strokeWidth={1.5} />
                 </div>
               </div>
              <p className="text-lg leading-relaxed font-light font-sans">
                quer melhorar a<br />qualidade dos seus<br />relacionamentos
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-xl leading-relaxed max-w-4xl mx-auto font-light font-sans">
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