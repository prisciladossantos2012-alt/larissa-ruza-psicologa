const TherapyFor = () => {
  return (
    <section className="py-20 bg-[#2c4186] text-white font-sans">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6 font-sans">
              A terapia serve
            </h2>
            <h3 className="text-3xl md:text-4xl font-light font-sans">
              para você que...
            </h3>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Card 1 - Mudança/Direção */}
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M8 3l4 8 5-4-5 8 3 5-9-6-2 4 3-5z" strokeWidth={1.5}/>
                    <circle cx="7" cy="7" r="1.5" fill="currentColor"/>
                    <path d="M15 10l4-4m0 0h-3m3 0v3" strokeWidth={1.5}/>
                    <path d="M19 19H5a2 2 0 01-2-2V7a2 2 0 012-2h4" strokeWidth={1.5}/>
                  </svg>
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
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth={1.5}/>
                    <path d="M8 15s1.5-2 4-2 4 2 4 2" strokeWidth={1.5} transform="rotate(180 12 12)"/>
                    <circle cx="9" cy="9" r="1" fill="currentColor"/>
                    <circle cx="15" cy="9" r="1" fill="currentColor"/>
                    <path d="M9 17l1-1 1 1 1-1 1 1 1-1 1 1" strokeWidth={1.5}/>
                  </svg>
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
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" strokeWidth={1.5}/>
                    <path d="M12 3v6l4 2" strokeWidth={1.5}/>
                    <circle cx="12" cy="12" r="3" strokeWidth={1.5}/>
                    <path d="M8.5 8.5l7 7" strokeWidth={1}/>
                    <path d="M15.5 8.5l-7 7" strokeWidth={1}/>
                    <circle cx="8.5" cy="8.5" r="1" fill="currentColor"/>
                    <circle cx="15.5" cy="15.5" r="1" fill="currentColor"/>
                  </svg>
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
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeWidth={1.5}/>
                    <circle cx="9" cy="7" r="4" strokeWidth={1.5}/>
                    <path d="M23 21v-2a4 4 0 00-3-3.87" strokeWidth={1.5}/>
                    <path d="M16 3.13a4 4 0 010 7.75" strokeWidth={1.5}/>
                    <path d="M9 11l3 3 6-6" strokeWidth={1.5}/>
                  </svg>
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