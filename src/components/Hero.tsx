import heroImage from "@/assets/hero-hands-butterfly.jpg";

const Hero = () => {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center text-white"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight mb-12 tracking-wide">
          Entre o que somos e o que desejamos ser, há uma ponte chamada coragem.
        </h1>
        
        <p className="text-lg md:text-xl tracking-[0.2em] uppercase mb-12 opacity-90">
          PSICOLOGIA
        </p>
        
        <a 
          href="https://www.doctoralia.com.br/larissa-ruza/psicologo/santo-andre3"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-3 bg-transparent border border-white text-white px-8 py-4 text-sm uppercase tracking-wide hover:bg-white hover:text-black transition-all duration-300"
        >
          <span>AGENDE SUA SESSÃO</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Hero;