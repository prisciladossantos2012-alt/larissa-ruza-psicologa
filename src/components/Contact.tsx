
import contactBg from "@/assets/contact-bg.jpg";

const Contact = () => {
  return (
    <section 
      className="py-20 relative"
      style={{
        backgroundImage: `url(${contactBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Content */}
          <div className="text-white">
            <h2 className="text-4xl md:text-5xl font-normal mb-8">
              Autocuidado aonde você estiver.
            </h2>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg mb-8 inline-block">
              <p className="text-lg leading-relaxed mb-4">
                As sessões de terapia tem duração de 50 min e acontecem 100% online, 
                com total sigilo e segurança.
              </p>
            </div>
            
            <div className="mb-8">
              <a 
                href="http://bit.ly/psilariruza"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 bg-transparent border-2 border-white text-white px-8 py-4 text-lg font-medium hover:bg-white hover:text-black transition-all duration-300 rounded"
              >
                <span>Para agendar clique aqui</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-normal mb-8 text-white">
                Se você sentiu que é a hora de olhar para si e caminhar em direção 
                ao que realmente importa, só me chamar.
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">📅</span>
                  </div>
                  <a href="http://bit.ly/psilariruza" className="text-white hover:underline">
                    Agende pelo Doctoralia
                  </a>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">📞</span>
                  </div>
                  <span className="text-white">+55 (11) 93020-2069</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✉️</span>
                  </div>
                  <span className="text-white">larissaruza@gmail.com</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">📱</span>
                  </div>
                  <a href="https://www.instagram.com/lariruza.psi" className="text-white hover:underline">Instagram</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
