
import lariPortrait from "@/assets/lari-professional.jpg";

const Services = () => {
  const services = [
    "Psicoterapia online para brasileiros no mundo inteiro (adolescentes e adultos).",
    "Psicodiagnóstico e tratamento terapêutico para transtornos de humor e personalidade.",
    "Mentoria e orientação de carreira.",
    "Mentoria preparatória para imigração."
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Images */}
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square bg-gray-200 rounded-lg grayscale">
                  <img 
                    src={lariPortrait}
                    alt="Workspace" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="aspect-square bg-gray-200 rounded-lg grayscale">
                  <img 
                    src={lariPortrait}
                    alt="Lari Ruza"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-normal text-blue-600 mb-12">
                Meu trabalho é<br />
                dedicado em:
              </h2>
              
              <div className="space-y-6">
                {services.map((service, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {service}
                    </p>
                  </div>
                ))}
              </div>
              
              {/* Associações */}
              <div className="mt-16">
                <p className="text-gray-600 mb-6 italic">
                  Atualmente sou membro das seguintes associações:
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">ACBS</span>
                    </div>
                    <span className="text-sm text-gray-600">ACBS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
