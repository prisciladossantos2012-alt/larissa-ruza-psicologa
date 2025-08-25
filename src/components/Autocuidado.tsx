const Autocuidado = () => {
  return (
    <section 
      className="relative py-20 flex flex-col items-center justify-center text-white overflow-hidden min-h-[500px]"
      style={{
        backgroundImage: `url(/lovable-uploads/088605ac-a600-4692-8e95-3941d6446075.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <a 
          href="https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20agendar%20uma%20sessão%20de%20terapia"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center cursor-pointer hover:opacity-80 transition-opacity duration-300"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-8">
            Autocuidado aonde você estiver.
          </h2>
          
          <div className="bg-white text-gray-800 px-6 py-4 mb-12 inline-block">
            <p className="text-lg md:text-xl leading-relaxed">
              As sessões de terapia tem duração de 50 min e<br />
              acontecem 100% online, com total sigilo e segurança.
            </p>
          </div>
          
          <div className="bg-transparent border-2 border-white text-white px-8 py-3 text-lg font-medium hover:bg-white hover:text-gray-800 transition-colors duration-300 flex items-center gap-3 mx-auto">
            PARA AGENDAR CLIQUE AQUI
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </a>
      </div>
    </section>
  );
};

export default Autocuidado;