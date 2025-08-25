import servicesImage1 from "@/assets/services-image1.png";
import servicesImage2 from "@/assets/services-image2.png";
import associationsImage from "@/assets/associations.png";

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
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Images */}
            <div className="order-2 lg:order-1">
              <div className="space-y-4">
                <div className="bg-gray-200 rounded-lg">
                  <img 
                    src={servicesImage1}
                    alt="Serviços de terapia" 
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </div>
                <div className="bg-gray-200 rounded-lg">
                  <img 
                    src={servicesImage2}
                    alt="Psicoterapia online"
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-normal text-blue-600 mb-12">
                Meu trabalho é dedicado em:
              </h2>
              
              <div className="space-y-6">
                {services.map((service, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0" />
                    <p className="text-gray-800 text-lg leading-relaxed">
                      {service}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="mt-12">
                <p className="text-gray-800 text-base mb-6">
                  Atualmente sou membro das seguintes associações:
                </p>
                
                <div>
                  <img 
                    src={associationsImage} 
                    alt="Associações profissionais" 
                    className="max-w-full h-auto"
                  />
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