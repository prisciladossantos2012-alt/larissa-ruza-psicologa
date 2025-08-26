import { useState } from "react";
const Header = () => {
  return <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
      <div className="absolute inset-x-0 top-4 flex justify-between items-center px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="text-white">
          <div className="text-center">
            <div className="font-sans text-lg sm:text-xl lg:text-2xl text-white tracking-wide" style={{fontWeight: '100'}}>Larissa Ruza</div>
            <div className="font-sans text-xs font-extralight uppercase tracking-[0.3em] text-white/80 mt-1">PSICOLOGIA</div>
          </div>
        </div>

        {/* CTA Button */}
        <div>
          <a href="https://www.doctoralia.com.br/larissa-ruza/psicologo/santo-andre3" target="_blank" rel="noopener noreferrer" className="inline-block bg-transparent border border-white text-white px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm uppercase tracking-wide hover:bg-white hover:text-black transition-all duration-300">
            <span className="hidden sm:inline">agende sua<br />sessão</span>
            <span className="sm:hidden">agendar</span>
          </a>
        </div>
      </div>
    </header>;
};
export default Header;