
import { Bird, Brain, Heart, Users } from "lucide-react";

const TherapyFor = () => {
  return (
    <section className="py-20" style={{ background: 'linear-gradient(135deg, #4a67a8 0%, #5b7bb8 100%)' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-normal text-white mb-4">
            A terapia serve
          </h2>
          <p className="text-3xl md:text-4xl text-white font-light">
            para você que...
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white mb-16">
            {/* Card 1 */}
            <div className="flex flex-col items-center">
              <div className="mb-6">
                <Bird className="w-16 h-16 text-white" strokeWidth={1} />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-light leading-relaxed">
                  quer mudar (hábitos,<br />
                  carreira, país, vida...)<br />
                  e não sabe por onde<br />
                  começar
                </p>
              </div>
            </div>
            
            {/* Card 2 */}
            <div className="flex flex-col items-center">
              <div className="mb-6">
                <div className="w-16 h-16 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
                  </svg>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-lg font-light leading-relaxed">
                  tem se sentido triste,<br />
                  cansado, irritado ou ansioso<br />
                  com frequência
                </p>
              </div>
            </div>
            
            {/* Card 3 */}
            <div className="flex flex-col items-center">
              <div className="mb-6">
                <Brain className="w-16 h-16 text-white" strokeWidth={1} />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-light leading-relaxed">
                  sente dificuldade em<br />
                  entender seus<br />
                  sentimentos
                </p>
              </div>
            </div>
            
            {/* Card 4 */}
            <div className="flex flex-col items-center">
              <div className="mb-6">
                <Users className="w-16 h-16 text-white" strokeWidth={1} />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-light leading-relaxed">
                  quer melhorar a<br />
                  qualidade dos seus<br />
                  relacionamentos
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-xl md:text-2xl text-white leading-relaxed max-w-4xl mx-auto font-light">
              ou apenas precisa ter um momento <strong>seu</strong>, para se conhecer, (re)descobrir 
              e trilhar o caminho de <strong>uma vida mais significativa</strong>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TherapyFor;
