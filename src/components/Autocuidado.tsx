import associationsImage from "@/assets/associations.png";

const Autocuidado = () => {
  return (
    <section 
      className="relative py-20 flex items-center justify-center text-white overflow-hidden"
      style={{
        backgroundImage: `url(${associationsImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-8">
          Autocuidado aonde você estiver.
        </h2>
        
        <p className="text-lg md:text-xl leading-relaxed opacity-90">
          As sessões de terapia tem duração de 50 min e acontecem 100% online, 
          com total sigilo e segurança.
        </p>
      </div>
    </section>
  );
};

export default Autocuidado;