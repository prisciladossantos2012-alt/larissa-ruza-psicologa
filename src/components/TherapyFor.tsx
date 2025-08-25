const TherapyFor = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-8">
            A terapia serve
          </h2>
          <p className="text-2xl md:text-3xl text-gray-700 font-light">
            para você que...
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 text-center">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium text-gray-800 mb-4">
                quer mudar (hábitos,
              </h3>
              <p className="text-lg text-gray-700 mb-3">
                carreira, país, vida...)
              </p>
              <p className="text-gray-600">
                e não sabe por onde começar
              </p>
            </div>
            
            {/* Card 2 */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium text-gray-800 mb-4">
                tem se sentido triste,
              </h3>
              <p className="text-lg text-gray-700 mb-3">
                cansado, irritado ou ansioso
              </p>
              <p className="text-gray-600">
                com frequência
              </p>
            </div>
            
            {/* Card 3 */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium text-gray-800 mb-4">
                sente dificuldade em
              </h3>
              <p className="text-lg text-gray-700 mb-3">
                entender seus
              </p>
              <p className="text-gray-600">
                sentimentos
              </p>
            </div>
            
            {/* Card 4 */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium text-gray-800 mb-4">
                quer melhorar a
              </h3>
              <p className="text-lg text-gray-700 mb-3">
                qualidade dos seus
              </p>
              <p className="text-gray-600">
                relacionamentos
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              ou apenas precisa ter um momento seu, para se conhecer, (re)descobrir 
              e trilhar o caminho de <span className="font-medium">uma vida mais significativa</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TherapyFor;