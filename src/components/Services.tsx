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
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-8">
            Meu trabalho é
          </h2>
          <p className="text-2xl md:text-3xl text-gray-700 font-light">
            dedicado em:
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-8">
            {services.map((service, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-3"></div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {service}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Associações */}
        <div className="text-center mt-20">
          <p className="text-lg text-gray-600 mb-8">
            Atualmente sou membro das seguintes associações:
          </p>
          <div className="flex justify-center space-x-8">
            {/* Placeholder para logos das associações */}
            <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-xs text-gray-500">Logo 1</span>
            </div>
            <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-xs text-gray-500">Logo 2</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;