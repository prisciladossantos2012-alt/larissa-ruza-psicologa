const TherapyFor = () => {
  return (
    <section className="py-20 bg-[#3d5aa0] text-white font-sans">
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
                <div className="w-20 h-20 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth={1}/>
                    <circle cx="9" cy="9" r="2" strokeWidth={1}/>
                    <path d="M21 15l-3.086-3.086a2 2 0 00-2.828 0L6 21" strokeWidth={1}/>
                    <path d="M3 7v10a2 2 0 002 2h10" strokeWidth={1}/>
                    <path d="M17 7L7 17" strokeWidth={1}/>
                  </svg>
                </div>
              </div>
              <p className="text-lg leading-relaxed font-normal">
                quer mudar (hábitos,<br />carreira, país, vida...)<br />e não sabe por onde<br />começar
              </p>
            </div>
            
            {/* Card 2 */}
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth={1}/>
                    <path d="M8 15s1.5-2 4-2 4 2 4 2" strokeWidth={1}/>
                    <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth={2}/>
                    <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth={2}/>
                    <path d="M7 18s.5-1 2-1 2 1 2 1" strokeWidth={1}/>
                  </svg>
                </div>
              </div>
              <p className="text-lg leading-relaxed font-normal">
                tem se sentido triste,<br />cansado, irritado ou ansioso<br />com frequência
              </p>
            </div>
            
            {/* Card 3 */}
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="3" strokeWidth={1}/>
                    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" strokeWidth={0.8}/>
                    <path d="M8.5 8.5L15.5 15.5" strokeWidth={1}/>
                    <path d="M15.5 8.5L8.5 15.5" strokeWidth={1}/>
                  </svg>
                </div>
              </div>
              <p className="text-lg leading-relaxed font-normal">
                sente dificuldade em<br />entender seus<br />sentimentos
              </p>
            </div>
            
            {/* Card 4 */}
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="8" cy="8" r="4" strokeWidth={1}/>
                    <circle cx="16" cy="16" r="4" strokeWidth={1}/>
                    <path d="M12 8c0-2.21-1.79-4-4-4s-4 1.79-4 4 1.79 4 4 4" strokeWidth={1}/>
                    <path d="M12 16c0-2.21-1.79-4-4-4s-4 1.79-4 4 1.79 4 4 4" strokeWidth={1}/>
                    <path d="M20 8c0-2.21-1.79-4-4-4s-4 1.79-4 4 1.79 4 4 4" strokeWidth={1}/>
                    <path d="M20 16c0-2.21-1.79-4-4-4s-4 1.79-4 4 1.79 4 4 4" strokeWidth={1}/>
                    <path d="M8 12h8" strokeWidth={1.5}/>
                  </svg>
                </div>
              </div>
              <p className="text-lg leading-relaxed font-normal">
                quer melhorar a<br />qualidade dos seus<br />relacionamentos
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-xl leading-relaxed max-w-4xl mx-auto font-normal">
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