import { RefreshCw, Heart, Eye, Users } from "lucide-react";

const TherapyFor = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-blue-600 to-blue-800 text-white">
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
                <RefreshCw size={48} className="text-white" />
              </div>
              <p className="text-lg leading-relaxed">
                <strong>quer mudar</strong> (hábitos, carreira, país, vida...) <strong>e não sabe por onde começar</strong>
              </p>
            </div>
            
            {/* Card 2 */}
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <Heart size={48} className="text-white" />
              </div>
              <p className="text-lg leading-relaxed">
                <strong>tem se sentido triste, cansado, irritado ou ansioso</strong> com frequência
              </p>
            </div>
            
            {/* Card 3 */}
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <Eye size={48} className="text-white" />
              </div>
              <p className="text-lg leading-relaxed">
                <strong>sente dificuldade em entender seus sentimentos</strong>
              </p>
            </div>
            
            {/* Card 4 */}
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <Users size={48} className="text-white" />
              </div>
              <p className="text-lg leading-relaxed">
                <strong>quer melhorar a qualidade dos seus relacionamentos</strong>
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-xl leading-relaxed max-w-4xl mx-auto">
              ou apenas precisa ter um momento seu, para se <strong>conhecer</strong>, <strong>(re)descobrir</strong> 
              e trilhar o caminho de uma <strong>vida mais significativa</strong>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TherapyFor;