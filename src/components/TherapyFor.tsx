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
            {/* Card 1 */}
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M8 12l4-4 4 4" strokeWidth={1.5}/>
                    <path d="M12 8v12" strokeWidth={1.5}/>
                    <circle cx="12" cy="4" r="2" strokeWidth={1.5}/>
                    <path d="M6 20h12" strokeWidth={1.5}/>
                    <path d="M9 16l1.5-1.5L12 16l1.5-1.5L15 16" strokeWidth={1.5}/>
                  </svg>
                </div>
              </div>
              <p className="text-lg leading-relaxed font-light font-sans">
                quer mudar (hábitos,<br />carreira, país, vida...)<br />e não sabe por onde<br />começar
              </p>
            </div>
            
            {/* Card 2 */}
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth={1.5}/>
                    <path d="M8 15s1.5-2 4-2 4 2 4 2" strokeWidth={1.5} transform="rotate(180 12 12)"/>
                    <circle cx="9" cy="9" r="1" fill="currentColor"/>
                    <circle cx="15" cy="9" r="1" fill="currentColor"/>
                    <path d="M7 17c2-1 3-2 5-2s3 1 5 2" strokeWidth={1.5}/>
                  </svg>
                </div>
              </div>
              <p className="text-lg leading-relaxed font-light font-sans">
                tem se sentido triste,<br />cansado, irritado ou ansioso<br />com frequência
              </p>
            </div>
            
            {/* Card 3 */}
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2a10 10 0 00-10 10c0 3 1.5 5.5 4 7l6-6 6 6c2.5-1.5 4-4 4-7a10 10 0 00-10-10z" strokeWidth={1.5}/>
                    <circle cx="9" cy="10" r="1" fill="currentColor"/>
                    <circle cx="15" cy="10" r="1" fill="currentColor"/>
                    <path d="M9 13h6" strokeWidth={1.5}/>
                    <path d="M10 16l1-1 1 1 1-1 1 1" strokeWidth={1.5}/>
                  </svg>
                </div>
              </div>
              <p className="text-lg leading-relaxed font-light font-sans">
                sente dificuldade em<br />entender seus<br />sentimentos
              </p>
            </div>
            
            {/* Card 4 */}
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="9" cy="12" r="3" strokeWidth={1.5}/>
                    <circle cx="15" cy="12" r="3" strokeWidth={1.5}/>
                    <path d="M12 9v6" strokeWidth={1.5}/>
                    <path d="M7.5 8.5l9 7" strokeWidth={1.5}/>
                    <path d="M7.5 15.5l9-7" strokeWidth={1.5}/>
                    <circle cx="6" cy="6" r="2" strokeWidth={1.5}/>
                    <circle cx="18" cy="18" r="2" strokeWidth={1.5}/>
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