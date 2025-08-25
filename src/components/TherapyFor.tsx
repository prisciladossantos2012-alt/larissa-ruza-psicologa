import { User, UserX, Brain, Heart } from "lucide-react";

const TherapyFor = () => {
  return (
    <section className="py-20 bg-[#5470a3] text-white font-sans">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-normal mb-6">
              A terapia serve
            </h2>
            <h3 className="text-3xl md:text-4xl font-normal">
              para você que...
            </h3>
          </div>
          
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Card 1 */}
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 flex items-center justify-center border-2 border-white rounded-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 11l-3 3-3-3" />
                  </svg>
                </div>
              </div>
              <p className="text-lg leading-relaxed font-light">
                quer mudar (hábitos,<br />carreira, país, vida...)<br />e não sabe por onde<br />começar
              </p>
            </div>
            
            {/* Card 2 */}
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 flex items-center justify-center">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth={1.5}/>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" strokeWidth={1.5}/>
                    <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth={1.5}/>
                    <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth={1.5}/>
                  </svg>
                </div>
              </div>
              <p className="text-lg leading-relaxed font-light">
                tem se sentido triste,<br />cansado, irritado ou ansioso<br />com frequência
              </p>
            </div>
            
            {/* Card 3 */}
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 flex items-center justify-center">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 0c3 3 3 7 0 10-3-3-3-7 0-10z"/>
                    <circle cx="12" cy="8" r="2" strokeWidth={1.5}/>
                  </svg>
                </div>
              </div>
              <p className="text-lg leading-relaxed font-light">
                sente dificuldade em<br />entender seus<br />sentimentos
              </p>
            </div>
            
            {/* Card 4 */}
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 flex items-center justify-center">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2L2 7h10l10-5-10 5zM2 17h20M6 12v6h12v-6"/>
                    <circle cx="9" cy="15" r="1" strokeWidth={1.5}/>
                    <circle cx="15" cy="15" r="1" strokeWidth={1.5}/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </div>
              </div>
              <p className="text-lg leading-relaxed font-light">
                quer melhorar a<br />qualidade dos seus<br />relacionamentos
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-xl leading-relaxed max-w-4xl mx-auto font-light">
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