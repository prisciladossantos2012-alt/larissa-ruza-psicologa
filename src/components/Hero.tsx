import heroImage from "@/assets/hero-main.jpg";

const Hero = () => {
  return (
    <section 
      className="relative h-screen flex items-center justify-center text-white overflow-hidden"
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
          <span className="block">Entre o que somos</span>
          <span className="block">e o que desejamos</span>
          <span className="block">ser, há uma ponte</span>
          <span className="block">chamada coragem.</span>
        </h1>
        
        <p className="text-lg md:text-xl tracking-[0.2em] uppercase mb-12 opacity-90">
          Psicologia
        </p>
      </div>
    </section>
  );
};

export default Hero;