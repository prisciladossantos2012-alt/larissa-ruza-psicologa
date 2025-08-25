import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-butterfly.jpg";

const Hero = () => {
  return (
    <section 
      id="inicio" 
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-sage-green/90 to-deep-sage/90 text-white"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-sage-green/80 to-deep-sage/80" />
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-light mb-2 opacity-90">
              Larissa Ruza
            </h1>
            <div className="w-16 h-px bg-white/60 mx-auto mb-8" />
          </div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight mb-12">
            <span className="block mb-2">Entre o que somos</span>
            <span className="block mb-2">e o que desejamos</span>
            <span className="block mb-2">ser, há uma ponte</span>
            <span className="block">chamada coragem.</span>
          </h2>
          
          <div className="mb-12">
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              PSICOLOGIA
            </p>
          </div>
          
          <Button 
            variant="hero" 
            size="lg"
            className="bg-white/10 border border-white/30 hover:bg-white/20 backdrop-blur-sm text-white text-lg px-8 py-4 rounded-lg transition-all duration-300"
          >
            AGENDE SUA SESSÃO
          </Button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-px h-12 bg-white/40 animate-pulse" />
      </div>
    </section>
  );
};

export default Hero;