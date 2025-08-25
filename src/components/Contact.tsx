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
            <div className="text-white max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-normal mb-8">
              Autocuidado aonde você estiver.
            </h2>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg mb-8 mx-auto max-w-lg">
              <p className="text-lg leading-relaxed mb-4">
                As sessões de terapia tem duração de 50 min e acontecem 100% online, 
                com total sigilo e segurança.
              </p>
            </div>
            
            <div className="mb-8">
              <a href="http://bit.ly/psilariruza" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-3 bg-transparent border-2 border-white text-white px-8 py-4 text-lg font-medium hover:bg-white hover:text-black transition-all duration-300 rounded">
                <span>Para agendar clique aqui</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
            
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Contact;