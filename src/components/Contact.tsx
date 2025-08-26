const Contact = () => {
  return <section className="py-20 relative" style={{
    backgroundImage: `url(/lovable-uploads/da1797b2-5f44-4420-a0ce-bd12e53f7aaa.png)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center">
            {/* Content - Centered */}
            <div className="text-white max-w-4xl animate-zoom-in">
            <h2 className="text-4xl md:text-5xl font-normal mb-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Autocuidado aonde você estiver.
            </h2>
            
            <div className="mb-8 animate-slide-up" style={{animationDelay: '0.4s'}}>
              <p className="text-lg leading-relaxed">
                <span className="bg-white text-gray-800 px-2 py-1">
                  As sessões de terapia tem duração de 50 min e
                </span><br />
                <span className="bg-white text-gray-800 px-2 py-1">
                  acontecem 100% online, com total sigilo e segurança.
                </span>
              </p>
            </div>
            
            <div className="mb-8 animate-bounce-in" style={{animationDelay: '0.6s'}}>
              <a href="http://bit.ly/psilariruza" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-3 text-white text-lg font-bold hover:opacity-80 transition-all duration-300 underline">
                <span>PARA AGENDAR CLIQUE AQUI</span>
                <div className="bg-white text-gray-800 rounded-full p-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </a>
            </div>
            
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Contact;