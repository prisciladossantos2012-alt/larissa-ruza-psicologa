import heroImage from "@/assets/hero-main.jpg";
const Hero = () => {
  return <section className="relative h-[85vh] flex items-center justify-center text-white overflow-hidden" style={{
    backgroundImage: `url(${heroImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light leading-tight mb-12 tracking-wide animate-fade-in-up">
          <span className="block font-light opacity-0 animate-fade-in" style={{animationDelay: '0.2s', animationFillMode: 'forwards'}}>Entre o que somos</span>
          <span className="block font-light opacity-0 animate-fade-in" style={{animationDelay: '0.4s', animationFillMode: 'forwards'}}>e o que desejamos</span>
          <span className="block font-light opacity-0 animate-fade-in" style={{animationDelay: '0.6s', animationFillMode: 'forwards'}}>ser, há uma ponte</span>
          <span className="block font-light opacity-0 animate-fade-in" style={{animationDelay: '0.8s', animationFillMode: 'forwards'}}>chamada coragem.</span>
        </h1>
        
        
      </div>
    </section>;
};
export default Hero;